import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, UtensilsCrossed } from "lucide-react";

import { ProjectGallery } from "@/components/sections/work/project-gallery";
import { ProjectDeviceFrame } from "@/components/sections/work/project-device-frame";
import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { Macbook } from "@/components/ui/macbook";
import { SAHARA_CASE_STUDY } from "@/lib/constants";
import { SAHARA_CAPTURES, SAHARA_SITE_URL, saharaSiteUrl } from "@/lib/sahara";

import "./sahara.css";

export const metadata: Metadata = {
  title: "The Sahara Grill — Restaurant Website & Sanity CMS | Strivn",
  description: "A closer look at The Sahara Grill’s custom restaurant website: a responsive menu, clear ordering and visit information, and menu management with Sanity CMS."
};

const priorities = [
  { number: "01", title: "Let the food lead.", description: "Real photography, clear categories and readable prices make the menu easy to explore." },
  { number: "02", title: "Make the next step easy.", description: "Delivery, takeout, directions and catering each have a clear place in the experience." },
  { number: "03", title: "Put updates in their hands.", description: "A Sanity-powered menu lets the team keep their content current without a code change." },
];

export default function SaharaGrillCaseStudyPage() {
  const siteUrl = saharaSiteUrl(process.env.SAHARA_SITE_URL) ?? SAHARA_SITE_URL;
  return (
    <main className="sahara-case pt-8 pb-20 sm:pt-12 sm:pb-28">
      <Container>
        <Link scroll={false} href="/#work" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-orange">
          <ArrowLeft className="size-4" aria-hidden /> All work
        </Link>
        <header className="pt-7 pb-8 sm:pt-10 sm:pb-12">
          <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
            <div>
              <MonoLabel className="text-orange">Selected work / Restaurant</MonoLabel>
              <h1 className="mt-4 font-display text-[clamp(3.25rem,7.5vw,7rem)] leading-[0.95] tracking-tight">The Sahara Grill<span className="text-orange">.</span></h1>
            </div>
            <div>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl">A warm welcome. A menu worth exploring. An easy way to order.</p>
              <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium hover:text-orange">Visit the live website <ArrowUpRight className="size-4 text-orange" aria-hidden /></a>
            </div>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:mt-10 sm:grid-cols-4">
            {[["Client", SAHARA_CASE_STUDY.title], ["Location", "Woodstock, Georgia"], ["Scope", "Design & development"], ["Content", "Sanity menu CMS"]].map(([label, value]) => (
              <div key={label}><dt className="font-mono text-micro text-muted-foreground">{label}</dt><dd className="mt-2 text-sm font-medium">{value}</dd></div>
            ))}
          </dl>
        </header>

        <figure>
          <div className="sahara-hero-stage">
            <div className="sahara-hero-macbook">
              <Macbook>
                <ProjectDeviceFrame device="desktop">
                  <Image src="/assets/work/sahara-grill/homepage-desktop.webp" alt="The Sahara Grill homepage in Safari on a MacBook, with food photography and clear menu and ordering links" width={1440} height={765} priority sizes="(min-width: 1536px) 900px, 72vw" className="h-auto w-full" />
                </ProjectDeviceFrame>
              </Macbook>
            </div>
            <div className="sahara-hero-tablet">
              <ProjectDeviceFrame device="tablet">
                <Image src="/assets/work/sahara-grill/homepage-tablet-full.webp" alt="The Sahara Grill homepage adapted to a tablet" width={834} height={1112} sizes="(min-width: 1536px) 340px, 25vw" className="h-auto w-full" />
              </ProjectDeviceFrame>
            </div>
            <div className="sahara-hero-phone">
              <ProjectDeviceFrame device="mobile">
                <Image src="/assets/work/sahara-grill/homepage-phone-full.webp" alt="The Sahara Grill homepage in an iPhone frame" width={390} height={844} sizes="(min-width: 1280px) 230px, 19vw" className="h-auto w-full" />
              </ProjectDeviceFrame>
            </div>
          </div>
          <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>One website. Desktop, tablet and phone.</span>
            <Link scroll={false} href="/work/sahara-grill#screens" className="inline-flex min-h-11 items-center gap-2 hover:text-orange">Explore the screens <ArrowDown className="size-3.5" aria-hidden /></Link>
          </figcaption>
        </figure>

        <section className="sahara-section" aria-labelledby="sahara-brief">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14 lg:gap-24">
            <BlurFade inViewAmount={0.2}>
              <MonoLabel className="text-orange">The brief</MonoLabel>
              <h2 id="sahara-brief" className="mt-4 font-display text-[var(--text-h1)] leading-tight">A local favorite.<br /><span className="text-orange-gradient">An easier way in.</span></h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">The Sahara Grill is a family-owned Mediterranean restaurant in Woodstock, Georgia. The website brings its food and hospitality online, with the details diners need to choose a meal, place an order or plan a visit.</p>
              <div className="mt-7 flex items-center gap-4">
                <Image src="/assets/work/sahara-grill-sign.webp" alt="The Sahara Grill’s storefront sign in Woodstock, Georgia" width={144} height={108} sizes="96px" className="h-20 w-24 rounded-lg object-cover" />
                <p className="max-w-48 text-xs leading-relaxed text-muted-foreground">Fresh Mediterranean food.<br />A real neighborhood restaurant.</p>
              </div>
            </BlurFade>
            <div className="divide-y divide-border border-y border-border">
              {priorities.map((item, index) => (
                <BlurFade key={item.number} inViewAmount={0.2} delay={index * 0.06} className="grid grid-cols-[2rem_1fr] gap-4 py-6 first:pt-6">
                  <span className="pt-1 font-pixel text-sm text-orange" aria-hidden>{item.number}</span>
                  <div><h3 className="font-display text-xl">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p></div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section id="screens" className="sahara-section border-t border-border" aria-labelledby="sahara-screens-heading">
          <div className="mb-8 grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-end md:gap-16">
            <div><MonoLabel className="text-orange">The experience</MonoLabel><h2 id="sahara-screens-heading" className="mt-4 font-display text-[var(--text-h1)] leading-tight">A full menu.<br /><span className="text-orange-gradient">On any screen.</span></h2></div>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">Food and drinks are organized for easy browsing, with photography, descriptions and prices together. Explore the actual site at three screen sizes, and select any image for a closer look.</p>
          </div>
          <ProjectGallery captures={SAHARA_CAPTURES} />
        </section>

        <section className="sahara-section border-t border-border" aria-labelledby="sahara-mobile-heading">
          <div className="sahara-visit-layout">
            <div>
              <MonoLabel className="text-orange">From browsing to visiting</MonoLabel>
              <h2 id="sahara-mobile-heading" className="mt-4 max-w-lg font-display text-[var(--text-h1)] leading-tight">The next step,<br /><span className="text-orange-gradient">right where it belongs.</span></h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">Someone looking for lunch shouldn’t have to hunt for the essentials. Ordering links stay in the navigation, while the homepage brings location, hours and catering together.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {["Delivery and takeout links to Toast", "A map, address and directions in one place", "Hours and a clear route to catering inquiries"].map((item) => <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden />{item}</li>)}
              </ul>
              <div className="mt-8 flex max-w-lg items-start gap-4 border-t border-border pt-5">
                <span className="font-pixel text-3xl text-orange-gradient">82%</span>
                <div><p className="text-sm">of visitors were browsing on mobile.</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Vercel Web Analytics · September 7–October 7, 2026.<br />Audience context that makes the phone experience a priority.</p></div>
              </div>
            </div>
            <figure className="sahara-detail-stage">
              <ProjectDeviceFrame device="mobile" className="sahara-detail-phone"><Image src="/assets/work/sahara-grill/visit-mobile.webp" alt="The Sahara Grill mobile location card showing the map, Woodstock address and Get Directions button" width={390} height={844} sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 80vw" className="h-auto w-full" /></ProjectDeviceFrame>
              <figcaption className="mt-5 text-center font-mono text-micro text-muted-foreground">Find it. Order it. Make a plan.</figcaption>
            </figure>
          </div>
        </section>

        <section className="sahara-section border-t border-border" aria-labelledby="sahara-cms-heading">
          <div className="sahara-cms-layout">
            <div className="sahara-cms-copy">
              <MonoLabel className="text-orange">Built to be kept current</MonoLabel>
              <h2 id="sahara-cms-heading" className="mt-4 font-display text-[var(--text-h1)] leading-tight">Their menu.<br /><span className="text-orange-gradient">Their hands.</span></h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">Sanity gives the team a dedicated place to manage the menu. They can edit prices and descriptions, change photos, reorder sections and hide unavailable items—without editing code.</p>
              <ol className="mt-7 divide-y divide-border border-y border-border">
                {[["Edit", "Update the menu in Sanity Studio."], ["Publish", "Keep drafts private until the changes are ready."], ["Serve", "Published changes refresh the website’s menu without a new deployment."]].map(([title, body], index) => <li key={title} className="grid grid-cols-[1.5rem_5rem_1fr] items-baseline gap-2 py-4 text-sm"><span className="font-mono text-xs text-orange">0{index + 1}</span><span className="font-medium">{title}</span><span className="leading-relaxed text-muted-foreground">{body}</span></li>)}
              </ol>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">A client guide supports the handoff, so everyday menu updates can stay with the restaurant.</p>
              <div className="mt-8 flex max-w-lg items-start gap-4 border-t border-border pt-5">
                <span className="font-pixel text-3xl text-orange-gradient">85%</span>
                <div><p className="text-sm">of users clicked a menu link on the site.</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Vercel Web Analytics · September 7–October 7, 2026.<br />Most visits go straight to the menu.</p></div>
              </div>
            </div>
            <figure className="sahara-detail-stage sahara-cms-visual">
              <div className="mb-5 flex items-center justify-center gap-2 text-sm text-muted-foreground"><UtensilsCrossed className="size-4 text-orange" aria-hidden />The menu their guests see</div>
              <ProjectDeviceFrame device="mobile" className="sahara-detail-phone"><Image src="/assets/work/sahara-grill/menu-items-mobile.webp" alt="The Sahara Grill menu items as published, with editable names, descriptions and prices shown to guests on mobile" width={390} height={844} sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 80vw" className="h-auto w-full" /></ProjectDeviceFrame>
              <figcaption className="mt-5 text-center font-mono text-micro text-muted-foreground">Content managed with Sanity</figcaption>
            </figure>
          </div>
        </section>

        <section className="sahara-next nav-glass" aria-labelledby="sahara-next-heading">
          <div><MonoLabel className="text-orange">Your business, next</MonoLabel><h2 id="sahara-next-heading" className="mt-4 max-w-2xl font-display text-[var(--text-h1)] leading-tight">Make the next step<br />feel this simple.</h2><p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">A website built around your customers, with the tools to keep it working for your business.</p></div>
          <div className="flex flex-col items-start gap-4"><StrivnButton variant="primary" arrow asChild><Link scroll={false} href="/book">Book a call</Link></StrivnButton><a href={siteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-orange">Explore The Sahara Grill <ArrowUpRight className="size-4" aria-hidden /></a></div>
        </section>
      </Container>
    </main>
  );
}
