# Strivn — PROJECT.md

## What Strivn Is
A web design and development studio that builds fast, custom websites for small businesses and retains them on monthly maintenance plans. Differentiated by vertical specialization (Denver/Boulder market), a meaningful client portal, and real AI integration that attaches to client outcomes (booked jobs, captured leads, recovered after-hours calls).

## Repos
- `strivn-core` — public agency site (this repo)
- `strivn-portal` — client portal (planned, builds in parallel after first client)

## Tech Stack
- Framework: Next.js 15 (App Router, TypeScript, Turbopack)
- Styling: Tailwind CSS v4
- Components: shadcn/ui + @base-ui/react
- Animation: motion (formerly framer-motion)
- Icons: lucide-react
- Utilities: clsx, tailwind-merge, class-variance-authority
- Particles: @tsparticles/engine + @tsparticles/react + @tsparticles/slim
- Fonts: Geist Sans + Geist Mono (Next.js font system)

## Design Language
Internal codename: "Hairline"
- Dark background (#09090b), white text, 1px low-contrast borders
- Light mode: white background, grey/black borders
- Single accent: #FF5C00 (orange) — used ONLY on primary CTA, active states, and critical headers
- No fills on surfaces; structure defined by hairline borders and whitespace
- References: Linear, Vercel, shadcn/ui, Resend
- Typography: intentional scale — h1 through p defined as reusable tokens, not ad-hoc Tailwind classes
- NO particles/glow/effects unless a specific component earns it in design review

## Folder Structure
/app                    → Next.js App Router pages and layouts
/components/ui          → shadcn primitives (auto-generated, do not hand-edit)
/components/layout      → SiteHeader, SiteFooter, Nav
/components/sections    → Homepage sections (Hero, Services, Portfolio, Pricing, Contact)
/components/shared      → Reusable non-ui components (Logo, ThemeToggle, CalendlyEmbed)
/lib                    → utils.ts, constants.ts, fonts.ts
/styles                 → Additional global styles
/public/fonts           → Self-hosted fonts (if needed)
/public/images          → Static assets and portfolio images
/types                  → Global TypeScript interfaces

## Architecture Decisions
| Date | Decision | Reason |
|------|----------|--------|
| 2026-06 | motion over framer-motion | motion is the successor; framer-motion is legacy |
| 2026-06 | lucide-react as sole icon system | eliminate dual icon dep |
| 2026-06 | shadcn CLI only, not runtime dep | it is a codegen tool, not a library |
| 2026-06 | Tailwind v4 | CSS-first config, better performance |
| 2026-06 | No src/ directory | flatter structure for an agency site of this scope |

## MVP Pages (strivn-core)
- [ ] Homepage (Hero, Services, Portfolio teaser, Social proof, Pricing, CTA)
- [ ] Portfolio (Sahara Grill case study, Summit First preview)
- [ ] Contact (form + Calendly embed)

## Coding Conventions
- Every component typed with explicit Props interface
- cn() utility for all className merging
- No inline styles
- No magic numbers — use Tailwind tokens or CSS variables
- Small, focused components — no files over ~150 lines
- Sections live in /components/sections, primitives in /components/ui
- Before adding a dependency: explain why, compare alternatives, confirm it's not already covered

## Retainer Tiers (reference)
- Basic: $200/mo
- Growth: $350/mo
- Premium: $600/mo (10% yearly discount available)
- Overages: $85/hr
