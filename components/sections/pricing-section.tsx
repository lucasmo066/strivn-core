import Link from "next/link";

import { Container } from "@/components/shared/container";
import dots from "@/components/shared/dotted-section.module.css";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { PRICING_COPY } from "@/lib/constants";

import { AddOnsGrid } from "./pricing/add-ons-grid";
import { BuildPackages } from "./pricing/build-packages";
import { OverageAndQuickRef } from "./pricing/overage-quick-ref";
import { RetainerPlans } from "./pricing/retainer-plans";
import styles from "./pricing/pricing.module.css";

export function PricingSection() {
  return (
    <section id="pricing" className={`section-y border-t border-border ${dots.section}`} aria-labelledby="pricing-heading">
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
          <BlurFade as="header" className={styles.intro} inViewAmount={0.7}>
            <h2 id="pricing-heading" className="font-display text-[var(--text-h2)]">
              Clear pricing. No surprises.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {PRICING_COPY.intro}
            </p>
            <StrivnButton variant="outline" className="mt-6" asChild>
              <Link href="/pricing">How pricing works</Link>
            </StrivnButton>
          </BlurFade>
          <BuildPackages />
          <RetainerPlans />
          <OverageAndQuickRef />
          <AddOnsGrid />
        </div>
      </Container>
    </section>
  );
}
