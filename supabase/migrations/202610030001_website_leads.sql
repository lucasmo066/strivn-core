-- Website intake is server-only. Future portal access needs explicit tenant policies.
begin;

create table if not exists public.website_leads (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique,
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  business text not null check (char_length(btrim(business)) between 1 and 120),
  details text not null check (char_length(btrim(details)) between 1 and 2000),
  source text not null check (source in ('contact_form', 'call_request')),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'closed')),
  follow_up_at timestamptz,
  notes text not null default '',
  email_status text not null default 'pending' check (email_status in ('pending', 'sent', 'failed', 'not_configured')),
  notion_status text not null default 'pending' check (notion_status in ('pending', 'sent', 'failed', 'not_configured'))
);

create index if not exists website_leads_inbox on public.website_leads (status, created_at desc);
create index if not exists website_leads_email_recent on public.website_leads (lower(email), created_at desc);

alter table public.website_leads enable row level security;
revoke all on public.website_leads from anon, authenticated;
grant select, insert, update, delete on public.website_leads to service_role;

create or replace function public.submit_website_lead(
  p_request_id uuid, p_name text, p_email text, p_business text, p_details text, p_source text
) returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  prior public.website_leads%rowtype;
  lead_id uuid;
begin
  -- Serialize retries across workers and concurrent requests before checking the key.
  perform pg_advisory_xact_lock(hashtextextended(p_request_id::text, 0));
  select * into prior from public.website_leads where request_id = p_request_id;
  if found then
    if (prior.name, prior.email, prior.business, prior.details, prior.source)
       is distinct from (p_name, lower(p_email), p_business, p_details, p_source) then
      raise sqlstate 'PT409' using message = 'Request key already used';
    end if;
    return jsonb_build_object('id', prior.id, 'created', false);
  end if;

  -- Durable per-email limiting supplements the route's inexpensive per-worker IP guard.
  perform pg_advisory_xact_lock(hashtextextended(lower(p_email), 1));
  if (select count(*) from public.website_leads
      where lower(email) = lower(p_email) and created_at > now() - interval '10 minutes') >= 5 then
    raise sqlstate 'PT429' using message = 'Too many requests';
  end if;

  insert into public.website_leads (request_id, name, email, business, details, source)
  values (p_request_id, p_name, lower(p_email), p_business, p_details, p_source)
  returning id into lead_id;
  return jsonb_build_object('id', lead_id, 'created', true);
end;
$$;

revoke all on function public.submit_website_lead(uuid, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.submit_website_lead(uuid, text, text, text, text, text) to service_role;

commit;
