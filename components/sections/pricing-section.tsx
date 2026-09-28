import { Container } from "@/components/shared/container";
import { PRICING_COPY } from "@/lib/constants";

import { AddOnsGrid } from "./pricing/add-ons-grid";
import { BuildPackages } from "./pricing/build-packages";
import { OverageAndQuickRef } from "./pricing/overage-quick-ref";
import { RetainerPlans } from "./pricing/retainer-plans";
import styles from "./pricing/pricing.module.css";

export function PricingSection() {
  return (
    <section id="pricing" className="section-y border-t border-border" aria-labelledby="pricing-heading">
      <Container>
        <div className={styles.shell}>
          <header className={styles.intro}>
            <h2 id="pricing-heading" className="font-display text-[var(--text-h2)]">
              Clear pricing. No surprises.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {PRICING_COPY.intro}
            </p>
          </header>
          <BuildPackages />
          <RetainerPlans />
          <OverageAndQuickRef />
          <AddOnsGrid />
        </div>
      </Container>
    </section>
  );
}
