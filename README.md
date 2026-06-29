# Strivn

Marketing site and internal build system for **Strivn** — a Denver & Boulder web studio focused on fast, custom sites for local businesses.

> **Pre-launch.** The public site is still in active development. Details on positioning, pricing, and go-to-market are intentionally light here.

## What we're building

A conversion-focused marketing site with a shared design system ("Hairline OS"), structured content in code, and room to grow into industry-specific landing pages over time.

### Recent updates

- **Industries page** — `/industries` with tier-one verticals and anchor links from the homepage
- **Industry data layer** — centralized `lib/industries.ts` (replacing hardcoded vertical tags on the homepage)
- **Social proof section** — homepage industry pills now link through to the industries page
- **Homepage polish** — hero gradient, section structure, and button refinements
- **Design system** — Geist typography, Tailwind v4 tokens, shared layout primitives

### In progress

- Homepage sections (hero, services, work, pricing, contact)
- Industry vertical expansion and deeper per-vertical pages
- Pre-launch content and copy pass
- Contact / lead capture flow

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- React 19, TypeScript
- Tailwind CSS v4
- [Geist](https://vercel.com/font) via `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Project structure

```
app/              # Routes (homepage, industries, …)
components/
  sections/       # Page sections
  shared/         # Layout primitives, buttons, labels
lib/
  constants.ts    # Brand copy, services, pricing data
  industries.ts   # Industry verticals and helpers
```

## License

Private — not for redistribution.
