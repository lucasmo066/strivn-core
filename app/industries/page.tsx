import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BRAND } from "@/lib/constants";
import { getIndustriesByTier } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries — Strivn",
  description:
    "Custom websites for Denver and Boulder businesses in med spas, dental, law, real estate, home remodeling, financial services, and more.",
};

export default function IndustriesPage() {
  const tierOneIndustries = getIndustriesByTier(1);

  return (
    <main>
      <section className="section-y border-b border-border">
        <Container className="space-y-10">
          <div className="mx-auto max-w-2xl space-y-4 text-center md:mx-0 md:text-left">
            <MonoLabel>{BRAND.location}</MonoLabel>
            <h1 className="font-display text-[var(--text-h2)]">
              Industries we build for
            </h1>
            <p className="font-ui text-muted-foreground">
              We specialize in {BRAND.location} businesses where a fast,
              credible website directly drives leads, bookings, and trust.
            </p>
            <StrivnButton variant="primary" arrow className="w-full sm:w-auto" asChild>
              <Link href="/#contact">Start your project</Link>
            </StrivnButton>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {tierOneIndustries.map((industry) => (
              <li
                key={industry.slug}
                id={industry.slug}
                className="scroll-mt-20 py-6 first:pt-6 last:pb-6"
              >
                <h2 className="font-display text-lg font-semibold tracking-tight">
                  {industry.name}
                </h2>
                <p className="mt-2 max-w-2xl font-ui text-sm text-muted-foreground">
                  {industry.tagline}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
