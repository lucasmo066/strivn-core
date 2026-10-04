import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { after, before, beforeEach, test } from 'node:test';
import { PGlite } from '@electric-sql/pglite';
import { POST } from '../app/api/contact/route.ts';
import { drainAfter, pendingAfter } from './next-server.mjs';
import { calendlyUrl } from '../lib/booking.ts';
import { saharaSiteUrl } from '../lib/sahara.ts';

const db = new PGlite();
const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
const rpc = 'select public.submit_website_lead($1::uuid, $2, $3, $4, $5, $6) as result';
let databaseDown = false;
let emailFails = false;
let emailCalls = [];
const valid = (extra = {}) => ({
  requestId: randomUUID(), name: 'Test Prospect', email: 'test@example.com',
  business: 'Example Company', details: 'A test website inquiry.', source: 'contact_form', ...extra,
});
const args = (lead) => [lead.requestId, lead.name, lead.email, lead.business, lead.details, lead.source];
async function submit(lead, options = {}) {
  return POST(new Request('https://strivn.test/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': randomUUID(), ...options.headers },
    body: options.raw ?? JSON.stringify(lead),
  }));
}
async function rows() { return (await db.query('select * from public.website_leads')).rows; }

before(async () => {
  await db.exec('create role anon; create role authenticated; create role service_role bypassrls; grant usage on schema public to anon, authenticated, service_role;');
  await db.exec(await readFile(new URL('../supabase/migrations/202610030001_website_leads.sql', import.meta.url), 'utf8'));
  globalThis.fetch = async (input, init) => {
    const url = new URL(input);
    if (url.hostname === 'api.resend.com') {
      emailCalls.push(JSON.parse(init.body));
      return Response.json(emailFails ? { name: 'application_error', message: 'Test failure' } : { id: 'email-test' }, { status: emailFails ? 500 : 200 });
    }
    assert.equal(url.origin, 'https://database.test');
    assert.equal(init.headers.apikey, 'sb_secret_test');
    assert.equal(init.headers.Authorization, undefined, 'New secret keys must not be sent as JWTs');
    if (databaseDown) return Response.json({}, { status: 503 });
    if (url.pathname.endsWith('/rpc/submit_website_lead')) {
      const p = JSON.parse(init.body);
      try {
        const result = await db.query(rpc, [p.p_request_id, p.p_name, p.p_email, p.p_business, p.p_details, p.p_source]);
        return Response.json(result.rows[0].result);
      } catch (error) {
        return Response.json({}, { status: error.code === 'PT429' ? 429 : error.code === 'PT409' ? 409 : 500 });
      }
    }
    assert.equal(init.method, 'PATCH');
    const p = JSON.parse(init.body);
    await db.query('update public.website_leads set email_status = $1, notion_status = $2 where id = $3', [p.email_status, p.notion_status, url.searchParams.get('id').slice(3)]);
    return new Response(null, { status: 204 });
  };
});
beforeEach(async () => {
  await drainAfter();
  await db.exec('truncate public.website_leads');
  databaseDown = false; emailFails = false; emailCalls = [];
  process.env.SUPABASE_URL = 'https://database.test';
  process.env.SUPABASE_SECRET_KEY = 'sb_secret_test';
  for (const key of ['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL', 'NOTION_TOKEN', 'NOTION_PIPELINE_DATABASE_ID', 'SUPABASE_SERVICE_ROLE_KEY']) delete process.env[key];
});
after(async () => {
  globalThis.fetch = originalFetch;
  process.env = originalEnv;
  await db.close();
});

test('success means the inquiry is saved before notifications run', async () => {
  assert.equal((await submit(valid())).status, 200);
  const leads = await rows();
  assert.equal(leads.length, 1);
  assert.equal(leads[0].status, 'new');
  assert.equal(leads[0].email_status, 'pending');
  assert.equal(pendingAfter(), 1);
  await drainAfter();
  assert.equal((await rows())[0].email_status, 'not_configured');
});

test('accepts the Data API URL copied from the Supabase dashboard', async () => {
  process.env.SUPABASE_URL = 'https://database.test/rest/v1/';
  assert.equal((await submit(valid())).status, 200);
  assert.equal((await rows()).length, 1);
});

test('the migration is safe after the SQL Editor has already applied it', async () => {
  const migration = await readFile(
    new URL('../supabase/migrations/202610030001_website_leads.sql', import.meta.url),
    'utf8',
  );
  await db.exec(migration);
  assert.equal((await rows()).length, 0);
});

test('database outage or missing configuration never reports success', async () => {
  databaseDown = true;
  assert.equal((await submit(valid())).status, 503);
  databaseDown = false;
  delete process.env.SUPABASE_SECRET_KEY;
  assert.equal((await submit(valid())).status, 503);
  assert.equal((await rows()).length, 0);
  assert.equal(pendingAfter(), 0);
});

test('invalid, oversized, cross-origin and honeypot requests create no lead', async () => {
  const invalid = await submit(valid({ email: 'invalid', business: '' }));
  assert.equal(invalid.status, 400);
  assert.ok((await invalid.json()).fieldErrors.email);
  assert.equal((await submit(valid(), { raw: '{' })).status, 400);
  assert.equal((await submit(valid(), { raw: 'x'.repeat(17000) })).status, 413);
  assert.equal((await submit(valid(), { headers: { origin: 'https://unrelated.test' } })).status, 403);
  assert.equal((await submit(valid(), { headers: { 'content-type': 'text/plain' } })).status, 415);
  assert.equal((await submit(valid({ website: 'spam' }))).status, 200);
  assert.equal((await rows()).length, 0);
});

test('identical retries save once; changed payload with same key is rejected', async () => {
  const lead = valid();
  assert.equal((await submit(lead)).status, 200);
  assert.equal((await submit(lead)).status, 200);
  assert.equal((await rows()).length, 1);
  assert.equal(pendingAfter(), 1);
  assert.equal((await submit({ ...lead, details: 'Changed message' })).status, 409);
  assert.equal((await rows())[0].details, lead.details);
});

test('same-site submissions work behind the hosting reverse proxy', async () => {
  const request = new Request('http://localhost:3001/api/contact', {
    method: 'POST', headers: {
      'content-type': 'application/json', origin: 'https://strivn.test',
      host: 'strivn.test', 'x-forwarded-proto': 'https',
      'x-forwarded-for': randomUUID(),
    }, body: JSON.stringify(valid()),
  });
  assert.equal((await POST(request)).status, 200);
  assert.equal((await rows()).length, 1);
});

test('database rate limit persists across route clients and allows safe replay', async () => {
  const first = valid();
  assert.equal((await submit(first)).status, 200);
  for (let i = 0; i < 4; i++) assert.equal((await submit(valid())).status, 200);
  const blocked = await submit(valid());
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get('retry-after'), '600');
  assert.equal((await submit(first)).status, 200);
  assert.equal((await rows()).length, 5);
});

test('email failure preserves a call request and records actionable delivery status', async () => {
  process.env.RESEND_API_KEY = 're_test';
  process.env.CONTACT_TO_EMAIL = 'owner@example.com';
  process.env.CONTACT_FROM_EMAIL = 'leads@example.com';
  emailFails = true;
  assert.equal((await submit(valid({ source: 'call_request' }))).status, 200);
  await drainAfter();
  const [lead] = await rows();
  assert.equal(lead.email_status, 'failed');
  assert.equal(lead.source, 'call_request');
  assert.match(emailCalls[0].subject, /^Call request:/);
  assert.equal(emailCalls[0].reply_to, 'test@example.com');
});

test('owner email succeeds without needing Notion', async () => {
  process.env.RESEND_API_KEY = 're_test';
  process.env.CONTACT_TO_EMAIL = 'owner@example.com';
  process.env.CONTACT_FROM_EMAIL = 'leads@example.com';
  await submit(valid());
  await drainAfter();
  assert.equal((await rows())[0].email_status, 'sent');
  assert.equal((await rows())[0].notion_status, 'not_configured');
});

test('anonymous and client roles cannot access intake; service role can', async () => {
  const rls = await db.query("select relrowsecurity from pg_class where oid = 'public.website_leads'::regclass");
  assert.equal(rls.rows[0].relrowsecurity, true);
  for (const role of ['anon', 'authenticated']) {
    await db.exec(`set role ${role}`);
    try {
      await assert.rejects(db.query('select * from public.website_leads'), { code: '42501' });
      await assert.rejects(db.query(rpc, args(valid())), { code: '42501' });
      await assert.rejects(db.query("update public.website_leads set status = 'won'"), { code: '42501' });
    } finally { await db.exec('reset role'); }
  }
  await db.exec('set role service_role');
  try { await db.query(rpc, args(valid())); } finally { await db.exec('reset role'); }
  assert.equal((await rows()).length, 1);
});

test('scheduling and portfolio URLs reject unsafe destinations', () => {
  assert.equal(calendlyUrl(undefined), null);
  assert.equal(calendlyUrl('https://calendly.com'), null);
  assert.equal(calendlyUrl('javascript:alert(1)'), null);
  assert.equal(calendlyUrl('https://calendly.com.evil.test/event'), null);
  assert.equal(calendlyUrl('https://user:password@calendly.com/event'), null);
  assert.equal(calendlyUrl('https://calendly.com/studio/intro'), 'https://calendly.com/studio/intro');
  assert.equal(saharaSiteUrl('javascript:alert(1)'), null);
  assert.equal(saharaSiteUrl('https://example.com'), 'https://example.com/');
});
