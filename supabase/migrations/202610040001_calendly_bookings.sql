-- Store signed Calendly booking webhooks in the existing private lead inbox.
begin;

alter table public.website_leads
  add column if not exists calendly_event_uri text,
  add column if not exists calendly_invitee_uri text,
  add column if not exists scheduled_start_at timestamptz,
  add column if not exists scheduled_end_at timestamptz,
  add column if not exists invitee_timezone text,
  add column if not exists booking_status text,
  add column if not exists canceled_at timestamptz,
  add column if not exists cancel_reason text;

alter table public.website_leads drop constraint if exists website_leads_source_check;
alter table public.website_leads
  add constraint website_leads_source_check
  check (source in ('contact_form', 'call_request', 'calendly_booking'));

alter table public.website_leads drop constraint if exists website_leads_booking_status_check;
alter table public.website_leads
  add constraint website_leads_booking_status_check
  check (booking_status is null or booking_status in ('active', 'canceled'));

create unique index if not exists website_leads_calendly_invitee
  on public.website_leads (calendly_invitee_uri)
  where calendly_invitee_uri is not null;

create index if not exists website_leads_upcoming_bookings
  on public.website_leads (scheduled_start_at)
  where booking_status = 'active';

create or replace function public.sync_calendly_lead(
  p_name text,
  p_email text,
  p_business text,
  p_details text,
  p_event_uri text,
  p_invitee_uri text,
  p_start_at timestamptz,
  p_end_at timestamptz,
  p_timezone text,
  p_booking_status text,
  p_canceled_at timestamptz default null,
  p_cancel_reason text default null
) returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  prior public.website_leads%rowtype;
  lead_id uuid;
  changed boolean;
begin
  if p_booking_status not in ('active', 'canceled') then
    raise sqlstate '22023' using message = 'Invalid booking status';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_invitee_uri, 2));
  select * into prior
    from public.website_leads
    where calendly_invitee_uri = p_invitee_uri;

  if found then
    changed := prior.booking_status is distinct from p_booking_status;
    update public.website_leads set
      name = p_name,
      email = lower(p_email),
      business = p_business,
      details = p_details,
      calendly_event_uri = p_event_uri,
      scheduled_start_at = p_start_at,
      scheduled_end_at = p_end_at,
      invitee_timezone = p_timezone,
      booking_status = p_booking_status,
      canceled_at = p_canceled_at,
      cancel_reason = p_cancel_reason,
      email_status = case when changed then 'pending' else email_status end
    where id = prior.id;
    return jsonb_build_object('id', prior.id, 'created', false, 'changed', changed);
  end if;

  insert into public.website_leads (
    request_id, name, email, business, details, source,
    calendly_event_uri, calendly_invitee_uri, scheduled_start_at, scheduled_end_at,
    invitee_timezone, booking_status, canceled_at, cancel_reason,
    notion_status
  ) values (
    gen_random_uuid(), p_name, lower(p_email), p_business, p_details, 'calendly_booking',
    p_event_uri, p_invitee_uri, p_start_at, p_end_at,
    p_timezone, p_booking_status, p_canceled_at, p_cancel_reason,
    'not_configured'
  ) returning id into lead_id;

  return jsonb_build_object('id', lead_id, 'created', true, 'changed', true);
end;
$$;

revoke all on function public.sync_calendly_lead(
  text, text, text, text, text, text, timestamptz, timestamptz, text, text, timestamptz, text
) from public, anon, authenticated;
grant execute on function public.sync_calendly_lead(
  text, text, text, text, text, text, timestamptz, timestamptz, text, text, timestamptz, text
) to service_role;

commit;
