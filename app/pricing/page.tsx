import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Layers, Wallet } from "lucide-react";

import { AddOnsGrid } from "@/components/sections/pricing/add-ons-grid";
import { BuildPackages } from "@/components/sections/pricing/build-packages";
import { OverageAndQuickRef } from "@/components/sections/pricing/overage-quick-ref";
import styles from "@/components/sections/pricing/pricing.module.css";
import { RetainerPlans } from "@/components/sections/pricing/retainer-plans";
import { WebsiteValue } from "@/components/sections/pricing/website-value";
import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { PRICING_COPY, PRICING_PROCESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "How Strivn prices a website: fixed packages, a 50% deposit, a typical 2–4 week launch, and optional care after launch.",
};

export default function PricingPage() {
  return (
    <main className="pt-8 sm:pt-20">
      <section className="pb-16 sm:pb-20" aria-labelledby="pricing-page-heading">
        <Container className="space-y-10">
          <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <BlurFade className="max-w-2xl space-y-6 sm:space-y-5" inViewAmount={0.2}>
            <div className="space-y-4">
              <MonoLabel className="block text-xs font-medium tracking-wide text-orange">
                Website pricing
              </MonoLabel>
              <h1
                id="pricing-page-heading"
                className="font-display text-[clamp(2.1rem,7vw,4rem)] leading-[1.18] sm:leading-[1.1]"
              >
                A clear scope.<br /><span className="text-orange-gradient">A confident start.</span>
              </h1>
            </div>
            <p className="font-ui text-muted-foreground">
              {PRICING_COPY.intro} Start with a custom build, then keep it moving with a monthly care plan and a team that stays involved.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <StrivnButton arrow className="w-full sm:w-auto" asChild><Link scroll={false} href="/start">Choose your package</Link></StrivnButton>
              <StrivnButton variant="outline" className="w-full sm:w-auto" asChild><Link scroll={false} href="/book">Talk it through</Link></StrivnButton>
            </div>
          </BlurFade>
          <BlurFade className="rounded-[var(--radius-button)] border border-border p-6 sm:p-8" direction="right" delay={0.12} inViewAmount={0.2}>
            <p className="font-pixel text-xs text-muted-foreground">YOUR WEBSITE, BUILT FOR YOU</p>
            <p className="mt-4 font-display text-4xl"><span className="mr-2 text-base text-muted-foreground">from</span><span className="text-orange-gradient">$2,000</span></p>
            <ul className="mt-6 space-y-4 border-t border-border pt-6 text-sm">
              <li className="flex items-center gap-3"><Layers className="size-4 text-orange" aria-hidden />Fixed scope, custom design</li>
              <li className="flex items-center gap-3"><Wallet className="size-4 text-orange" aria-hidden />50% to start. 50% at launch.</li>
              <li className="flex items-center gap-3"><CalendarDays className="size-4 text-orange" aria-hidden />Typical launch in 2–4 weeks</li>
            </ul>
          </BlurFade>
          </div>

          <nav aria-label="Pricing sections" className="flex flex-wrap gap-2 border-y border-border py-4">
            {[{ label: "Website builds", href: "#builds" }, { label: "Website value", href: "#website-value" }, { label: "Monthly care", href: "#care" }, { label: "Add-ons", href: "#add-ons" }].map((item) => (
              <Link scroll={false} key={item.href} href={item.href} className="inline-flex min-h-11 items-center gap-4 rounded-full border border-border px-4 text-sm hover:border-orange focus-visible:outline-2 focus-visible:outline-orange">{item.label}<ArrowUpRight className="size-4 text-orange" aria-hidden /></Link>
            ))}
          </nav>

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRICING_PROCESS.map((step, index) => (
              <BlurFade
                as="li"
                key={step.title}
                className="grid content-start gap-4 rounded-[var(--radius-button)] border border-border p-5 sm:p-6"
                delay={index * 0.1}
                duration={0.8}
                inViewAmount={0.2}
              >
                <span className="text-orange-gradient font-pixel text-xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-lg tracking-wide text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                  {index === 1 && <Link scroll={false} href="/start" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-orange underline-offset-4">Choose your package <ArrowUpRight className="size-4 text-orange" aria-hidden /></Link>}
                </div>
              </BlurFade>
            ))}
            <BlurFade as="li" className="flex flex-col justify-between gap-6 rounded-[var(--radius-button)] border border-orange/30 p-5 sm:p-6" delay={PRICING_PROCESS.length * 0.1} duration={0.8} inViewAmount={0.2}>
              <div><p className="font-display text-lg">See the whole journey.</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">From first conversation to launch day and the care that comes after.</p></div>
              <Link scroll={false} href="/process" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium">Explore the process <ArrowUpRight className="size-4 text-orange" aria-hidden /></Link>
            </BlurFade>
          </ol>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28" aria-label="Pricing">
        <Container>
          <div className={styles.shell}>
            <svg aria-hidden focusable="false" width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="strivn-orange-gradient" gradientUnits="userSpaceOnUse" x1="4" y1="17" x2="20" y2="6">
                  <stop offset="0%" stopColor="var(--orange-gradient-from)" />
                  <stop offset="50%" stopColor="var(--orange-gradient-via)" />
                  <stop offset="100%" stopColor="var(--orange-gradient-to)" />
                </linearGradient>
              </defs>
            </svg>
            <BuildPackages />
            <RetainerPlans />
            <WebsiteValue />
            <OverageAndQuickRef />
            <AddOnsGrid />
          </div>

          <div className="mt-10 flex flex-col items-start gap-5 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Know what you need? Choose a package and send your project details. Prefer a conversation? We can start there, too.
            </p>
            <StrivnButton variant="primary" arrow className="w-full sm:w-auto" asChild>
              <Link scroll={false} href="/start">Choose your package</Link>
            </StrivnButton>
          </div>
        </Container>
      </section>
    </main>
  );
}
