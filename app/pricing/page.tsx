import type { Metadata } from "next";
import Link from "next/link";

import { AddOnsGrid } from "@/components/sections/pricing/add-ons-grid";
import { BuildPackages } from "@/components/sections/pricing/build-packages";
import { OverageAndQuickRef } from "@/components/sections/pricing/overage-quick-ref";
import styles from "@/components/sections/pricing/pricing.module.css";
import { RetainerPlans } from "@/components/sections/pricing/retainer-plans";
import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BRAND, PRICING_COPY, PRICING_PROCESS, TAGLINES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing — Strivn",
  description:
    "How Strivn prices a website: fixed packages, a 50% deposit, a typical 2–4 week launch, and optional care after launch.",
};

export default function PricingPage() {
  return (
    <main className="pt-28 sm:pt-36">
      <section className="pb-16 sm:pb-20" aria-labelledby="pricing-page-heading">
        <Container className="space-y-10">
          <div className="mx-auto max-w-2xl space-y-4 text-center md:mx-0 md:text-left">
            <MonoLabel>{BRAND.basedIn}</MonoLabel>
            <h1
              id="pricing-page-heading"
              className="font-display text-[clamp(1.65rem,6.5vw,2.5rem)] leading-[1.15]"
            >
              How pricing works
            </h1>
            <p className="font-ui text-muted-foreground">
              {PRICING_COPY.intro} Here is how a project is scoped, paid, and launched.
            </p>
          </div>

          <ol className="divide-y divide-border border-y border-border">
            {PRICING_PROCESS.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-2 py-6 sm:grid-cols-[4.5rem_1fr] sm:items-start sm:gap-6"
              >
                <span className="font-mono text-micro text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-lg tracking-wide text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
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
            <OverageAndQuickRef />
            <AddOnsGrid />
          </div>

          <div className="mt-10 flex flex-col items-start gap-5 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Ready to start? Book a call and tell us about the project.
            </p>
            <StrivnButton variant="primary" arrow className="w-full sm:w-auto" asChild>
              <Link href="/book">{TAGLINES.heroCta}</Link>
            </StrivnButton>
          </div>
        </Container>
      </section>
    </main>
  );
}
