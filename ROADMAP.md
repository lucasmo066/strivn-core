# Strivn Core Roadmap

This is the practical sequence for making Strivn Core the primary public site and lead path. Keep this document current when priorities change so Cursor and Codex work from the same plan.

## 1. Finish launch readiness

- Replace the two homepage media slots with approved 4:3 case-study imagery. Start with Sahara Grill, then add one representative future-project visual.
- Supply the services bento's central Front Range image from Higgsfield: a 4:5 portrait still, ideally 1200 x 1500 WebP or AVIF, without text or UI. Keep its focal subject in the central 50% for the 16:9 mobile/tablet crop. Place it at `public/assets/services/front-range-chromatic.webp` and set `SERVICES_MEDIA.src`, `alt`, and optional `objectPosition` in `lib/constants.ts`. The slot includes a missing-image fallback; no WebGL effect is installed.
- Capture Sahara Grill as a full-site or menu-scroll preview before replacing its homepage media slot. Consider a project carousel only when there are enough approved projects to make it useful.
- Add an Iconic Stripes Shopify card and a main vertical-template site before launch, once each has approved visual proof and scope detail.
- Consider a Colorado-pinned globe only after selecting a real asset or component that makes local coverage clearer; it should orient visitors, not act as decoration.
- Connect the contact form to production Resend and Notion credentials, set the public sender domain, and test a real lead end to end.
- Add the requested calendar destination or replace the form helper copy once the booking tool is chosen.
- Verify metadata, favicon, social preview image, canonical URLs, privacy page, and terms page on the production domain.
- Run a final mobile, desktop, keyboard, and reduced-motion pass before publishing.

## 2. Turn the homepage into a credible sales path

- Publish the Sahara Grill case study with real outcomes, approved photography, and a clear path back to the contact form.
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

## Definition of launch-ready

The site is ready to become the primary site when it has a working production lead path, real project proof, intentional media in every homepage slot, verified analytics, and a reviewed mobile experience.
