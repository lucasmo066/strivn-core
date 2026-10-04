# Lead intake and booking

## Connect Supabase

1. Create or choose the Strivn Supabase project.
2. Apply `supabase/migrations/202610030001_website_leads.sql` using the Supabase SQL Editor or your migration deployment process. Run it once on a new database; it creates the table and intake function together.
3. Copy `.env.example` to `.env.local`. Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` from that project. A legacy server-side `SUPABASE_SERVICE_ROLE_KEY` also works. Keep these values out of source control and never use `NEXT_PUBLIC_` for either key.
4. Set the same variables in the hosting environment and restart/redeploy the app.
5. Submit a clearly labeled test inquiry and verify its row in **Table Editor → website_leads**. Until this step passes against your project, production intake is not verified.

## Take action on inquiries

Use the Supabase Table Editor as the private lead inbox until the admin portal exists. Sort by `created_at` descending, filter `status = new`, and move a lead through `new → contacted → qualified → won` (or `closed`). Use `follow_up_at` for the next action date and `notes` for context. `call_request` identifies people waiting to arrange a call; a form submission does not confirm a meeting.

Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (a verified sender), and `CONTACT_TO_EMAIL` to receive owner notifications. Replying addresses the prospect. Set `CONTACT_LEADS_URL` to the private Supabase table or Notion inbox you want linked in those emails. No prospective-client confirmation email is sent automatically.

Saving a lead is the success condition. Email and Notion run after the response; failure cannot erase the lead. Inspect `email_status` and `notion_status`: `sent`, `failed`, `not_configured`, or `pending`. Notifications are best effort, with no scheduled retry worker yet. A long-running `pending` status can mean the process stopped; handle the lead from the inbox. A browser retry reuses the request ID and does not create a second lead or resend notifications.

## Optional Notion mirror

The existing Notion integration can also receive new leads. Set `NOTION_TOKEN` and `NOTION_PIPELINE_DATABASE_ID`, share the database with the integration, and confirm these property types and options:

- `Business Name`: title
- `Contact`: rich text
- `Stage`: select with `New`
- `Source`: select with `Website form`
- `Notes`: rich text

Notion is an optional copy. The Supabase row remains the source of truth. Call requests include their origin in Notes. Status edits in Notion do not sync back automatically.

## Calendar setup

The `/book` page embeds the configured Calendly event so visitors can select a date and finish booking without leaving Strivn. `CALENDLY_URL` can override the default public event link for a deployment. The page also provides a direct Calendly link as a fallback. If no valid URL is available, it clearly offers a call request instead.

Bookings made directly in Calendly are managed in Calendly and its connected calendar. They are not automatically copied into Supabase. Add a verified Calendly webhook when the future admin dashboard needs a unified booking view; never treat a browser event as a confirmed booking.

## Verify before launch

- A real form submission appears once in Supabase; a retry of the same request ID creates no duplicate.
- Empty/invalid data, cross-origin requests, and oversized bodies are rejected; the honeypot creates no row.
- Database downtime returns an error with an email alternative, preserving the visitor’s fields.
- Notification errors still leave a saved lead, with delivery status available to the owner.
- Anonymous and authenticated client API keys cannot read or write leads or call the intake function.
- A real Calendly test booking reaches the correct connected calendar and appears in Calendly, then cancel that test through Calendly.

The route has an in-memory IP guard and a durable database limit of five saved inquiries per email per ten minutes. The IP guard is per process and depends on a trusted hosting proxy; it is not global bot protection. Add hosting-level rate limits or a verified challenge if traffic warrants it.

## Later: admin and client portals

Keep intake server-only. This migration deliberately grants no client access. Use Supabase Auth for identity, then add organization memberships with explicit admin/client roles and tenant-scoped row policies. The owner dashboard can manage leads, clients, bookings, and onboarding. A client dashboard should expose only its own onboarding checklist, project status, files, and requests. Convert qualified leads into client records after review; never grant client access based only on a submitted email address. The planned `strivn-portal` can share the database after these authorization boundaries exist.

## Sahara Grill

Set `SAHARA_SITE_URL` after confirming the live project URL. Add actual desktop/menu/mobile captures under `public/assets/work/sahara/` and populate `SAHARA_CAPTURES` in `lib/sahara.ts` with their real dimensions, alt text, title, and caption. The gallery supports full-image viewing by mouse or keyboard. Until those assets exist, the case study shows the existing restaurant photo and no fabricated website screenshots or performance figures.
