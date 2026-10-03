import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { ProjectGallery } from "@/components/sections/work/project-gallery";
import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { SAHARA_CASE_STUDY } from "@/lib/constants";
import { SAHARA_CAPTURES, saharaSiteUrl } from "@/lib/sahara";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: `${SAHARA_CASE_STUDY.title} — Strivn`,
  description: SAHARA_CASE_STUDY.summary,
};

const priorities = [
  { number: "01", title: "Start with the food.", description: "Put the menu at the center of the experience, so visitors can quickly get a feel for the restaurant and find their next order." },
  { number: "02", title: "Make the next step clear.", description: "Give ordering, hours, and location a clear place in the journey. The essentials should be easy to find when someone is ready to visit." },
  { number: "03", title: "Think phone first.", description: "Keep navigation focused and content easy to scan for diners deciding where to eat while they’re on the move." },
];

export default function SaharaGrillCaseStudyPage() {
  const siteUrl = saharaSiteUrl(process.env.SAHARA_SITE_URL);
  return (
    <main className="pt-28 sm:pt-36">
      <Container>
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden /> All work
        </Link>
        <section className="pt-12 pb-10 sm:pt-16 sm:pb-14">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <MonoLabel className="text-orange">Selected work / 01</MonoLabel>
              <h1 className="mt-5 font-display text-[clamp(2.75rem,7vw,6rem)] leading-none tracking-tight">Sahara Grill</h1>
            </div>
            <div className="space-y-5">
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">A digital front door<br className="hidden md:block" /> with the menu at its heart.</p>
              {siteUrl && <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium hover:text-orange">Visit the website <ArrowUpRight className="size-4" aria-hidden /></a>}
            </div>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6 sm:mt-14 sm:grid-cols-4">
            {[["Client", "Sahara Grill"], ["Industry", "Restaurant"], ["Focus", "Menu & ordering"], ["Services", "Web design & development"]].map(([label, value]) => (
              <div key={label}><dt className="font-pixel text-micro text-muted-foreground">{label}</dt><dd className="mt-2 text-sm font-medium">{value}</dd></div>
            ))}
          </dl>
        </section>
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted sm:aspect-[16/9]">
            <Image src="/assets/work/sahara-grill-sign.webp" alt="Sahara Grill’s red and green storefront sign above a Fresh Mediterranean banner" fill priority sizes="(min-width: 1280px) 1152px, 94vw" className="object-cover" />
          </div>
          <figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground"><span>Sahara Grill / Fresh Mediterranean</span><span>The restaurant behind the project.</span></figcaption>
        </figure>
        <section className="grid gap-8 py-16 sm:py-24 md:grid-cols-[0.65fr_1.35fr] md:gap-20">
          <MonoLabel className="text-muted-foreground">The brief</MonoLabel>
          <div>
            <h2 className="max-w-2xl font-display text-[var(--text-h1)] leading-tight">From “what’s on the menu?”<br />to “let’s eat here.”</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{SAHARA_CASE_STUDY.summary} The design centers on the decisions a diner needs to make: what to eat, where to find the restaurant, and how to order.</p>
          </div>
        </section>
        <section className="border-t border-border py-12 sm:py-16" aria-label="Design priorities">
          <div className="grid gap-10 md:grid-cols-3 md:gap-10">
            {priorities.map((item) => <div key={item.number}><MonoLabel className="text-orange">{item.number} / Design priority</MonoLabel><h2 className="mt-5 font-display text-xl">{item.title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p></div>)}
          </div>
        </section>
        <ProjectGallery captures={SAHARA_CAPTURES} />
        <section className="mb-16 mt-4 flex flex-col justify-between gap-8 rounded-2xl border border-border bg-muted/40 p-7 sm:mb-24 sm:p-12 md:flex-row md:items-center">
          <div><MonoLabel className="text-muted-foreground">Your business, next.</MonoLabel><h2 className="mt-4 font-display text-[var(--text-h2)]">Make a better first impression.</h2><p className="mt-3 text-sm text-muted-foreground">Let’s build a site that makes the next step feel easy.</p></div>
          <StrivnButton variant="primary" arrow asChild><Link href="/book">Book a call</Link></StrivnButton>
        </section>
      </Container>
    </main>
  );
}
