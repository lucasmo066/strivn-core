# Strivn Core Roadmap

This is the practical sequence for making Strivn Core the primary public site and lead path. Keep this document current when priorities change so Cursor and Codex work from the same plan.

## 1. Finish launch readiness

- Replace the user-requested Aceternity demo images in the Recent Work carousel with approved 4:3 portfolio media, ideally 1600 x 1200 WebP/AVIF. Start with Sahara Grill, then add previews for Iconic Stripes and the vertical template when available. Put images under `public/assets/work/` and set each `WORK_ITEMS[].media` to `{ src, alt, objectPosition? }` in `lib/constants.ts`, removing `isDemo: true` only for actual project imagery. Missing images retain a labelled slot at the same aspect ratio.
- Supply the services bento's central Front Range image from Higgsfield: a 4:5 portrait still, ideally 1200 x 1500 WebP or AVIF, without text or UI. Keep its focal subject in the central 50% for the 16:9 mobile/tablet crop. Place it at `public/assets/services/front-range-chromatic.webp` and set `SERVICES_MEDIA.src`, `alt`, and optional `objectPosition` in `lib/constants.ts`. The slot includes a missing-image fallback; no WebGL effect is installed.
- Capture Sahara Grill as a full-site or menu-scroll preview before replacing its homepage media slot. A static approved capture can feed the current optimized image layer; a future ChromaticImage treatment belongs in `components/sections/work/project-media.tsx`, without changing the carousel.
- Complete Iconic Stripes and the main vertical-template site before launch. Both now appear as non-linked, explicitly planned carousel entries. Add case-study destinations only when real project pages are ready, then change the relevant status to `Live`.
- Consider a Colorado-pinned globe only after selecting a real asset or component that makes local coverage clearer; it should orient visitors, not act as decoration.
- Apply the Supabase lead migration and set production credentials. The form saves to `website_leads` before optional Resend/Notion notifications. Use the private Table Editor inbox for lead statuses and follow-up dates until the admin portal exists. Complete a real submission using [the setup guide](docs/lead-intake.md).
- `/book` now handles all booking CTAs with a call-request form. Create the Calendly event and connect your calendar, then set `CALENDLY_URL` to enable the embedded calendar. Confirm an actual booking reaches your calendar.
- Verify metadata, favicon, social preview image, canonical URLs, privacy page, and terms page on the production domain.
- Run a final mobile, desktop, keyboard, and reduced-motion pass before publishing.

## 2. Turn the homepage into a credible sales path

- The Sahara Grill case-study layout now uses the existing restaurant photo and supports a full-size screenshot gallery. Supply its confirmed URL (`SAHARA_SITE_URL`) and real page captures (`SAHARA_CAPTURES`) to finish the live-site link and gallery. Add results only when verified.
- Write one concise proof point for each priority industry: med spas, dental practices, law firms, real estate teams, home remodeling, and financial advisors.
- Add only verified testimonials, metrics, and client logos. Do not use placeholder social proof.
- Decide which call-to-action destination converts best: calendar, form, or both with a distinct job for each.

## 3. Build the local discovery engine

- Create focused service and industry pages from the existing industry data, starting with the two verticals most likely to close first.
- Set up Google Business Profile, Search Console, Analytics, and conversion events for completed contact submissions and booked calls.
- Publish useful local pages only when they contain original proof, examples, and service detail. Avoid thin location pages.
- Review search queries and contact-source data monthly, then improve the pages that already receive qualified intent.

## 4. Establish the operating rhythm

- Keep a lightweight case-study pipeline: collect goal, scope, before/after, visual assets, testimonial permission, and launch result at every client handoff.
- Use a monthly site checklist for dependency updates, broken links, form delivery, performance, and lead follow-up.
- When the first active clients need reporting or requests, start the separate `strivn-portal` project. Keep the public marketing site focused on trust and conversion.

## 5. Admin and client portals (later)

- Use Supabase Auth, with separate owner/admin and client roles. Keep the existing lead table private until explicit authorization policies are implemented.
- Build the owner dashboard around leads, follow-up, bookings, clients, and onboarding progress.
- Build a separate client dashboard with organization-scoped onboarding, project status, shared files, and requests.
- Add organization memberships and tenant-level row security before exposing client data. Invite reviewed clients; a public inquiry must never create admin or client permissions.
- Add signed Calendly webhooks when bookings need to appear in the dashboard.

## Definition of launch-ready

The site is ready to become the primary site when it has a working production lead path, real project proof, intentional media in every homepage slot, verified analytics, and a reviewed mobile experience.
