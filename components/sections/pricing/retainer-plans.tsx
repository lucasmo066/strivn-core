"use client";

import { useRef, useState } from "react";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BlurFade, useRevealOnScroll } from "@/components/ui/blur-fade";
import { RETAINER_PLANS } from "@/lib/constants";

import { EditSizesInfo } from "./edit-sizes-info";
import { RetainerCard } from "./retainer-card";
import { PlanSelector } from "./plan-selector";
import styles from "./pricing.module.css";

export function RetainerPlans() {
  const gridRef = useRef<HTMLDivElement>(null);
  const shown = useRevealOnScroll(gridRef, true, 0.3, "0px 0px -12% 0px");
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(RETAINER_PLANS[0].name);

  return (
    <section id="care" className={styles.careSection} aria-labelledby="care-plans-heading">
      <BlurFade className={styles.sectionHeader} direction="up" inViewAmount={0.6}>
        <h3 id="care-plans-heading" className="font-display text-xl">Your website deserves an ongoing partner.</h3>
        <p className={styles.sectionDescription}>We monitor uptime, perform routine maintenance, and check forms and booking links monthly, even when you have no edits to request. Each plan also includes time for content changes you ask us to make.</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Choose Essential Care for upkeep and one editing hour per quarter, or Seasonal Care for three total editing hours, a quarterly review, and faster response. An included content editor lets your team make agreed updates yourselves; it is separate from the time we spend editing for you. Larger additions are scoped and priced before work starts.</p>
        <div className={styles.billingRow}>
          <div className={styles.billingToggle} role="group" aria-label="Billing frequency">
            {yearlyBilling ? (
              <button type="button" aria-pressed={false} onClick={() => setYearlyBilling(false)}>
                Quarterly
              </button>
            ) : (
              <StrivnButton
                variant="outline"
                className={styles.billingSelected}
                aria-pressed
                onClick={() => setYearlyBilling(false)}
              >
                Quarterly
              </StrivnButton>
            )}
            {yearlyBilling ? (
              <StrivnButton
                variant="outline"
                className={styles.billingSelected}
                aria-pressed
                onClick={() => setYearlyBilling(true)}
              >
                Yearly
              </StrivnButton>
            ) : (
              <button type="button" aria-pressed={false} onClick={() => setYearlyBilling(true)}>
                Yearly
              </button>
            )}
          </div>
          <span className={styles.savings}>Save 10% yearly</span>
        </div>
      </BlurFade>
      <PlanSelector
        kind="care"
        label="Choose a care plan"
        names={RETAINER_PLANS.map((plan) => plan.name)}
        selected={selectedPlan}
        onChange={setSelectedPlan}
      />
      <div ref={gridRef} className={styles.careGrid}>
        {RETAINER_PLANS.map((plan, index) => (
          <RetainerCard
            key={plan.name}
            plan={plan}
            yearlyBilling={yearlyBilling}
            selected={selectedPlan === plan.name}
            active={shown}
            delay={index * 0.1}
          />
        ))}
      </div>
      <div className={styles.note}>
        <p>Care is optional, billed quarterly or yearly in advance. Editing hours are pooled within each quarter and expire at its end; annual billing keeps the same quarterly allowances. Routine maintenance and scheduled reviews do not use editing hours.</p>
        <p>Response targets mean acknowledgment, not completion. Domains and external subscriptions are separate. Major fixes, new features, and vendor-caused failures are quoted separately. Prefer occasional help? Choose client-managed hosting and approved work at $100/hour, without reserved support priority.</p>
        <EditSizesInfo />
      </div>
      <p className="sr-only" role="status">
        {yearlyBilling ? "Yearly billing selected. Prices show annual totals with a 10% saving." : "Quarterly billing selected. Prices show quarterly totals."}
      </p>
    </section>
  );
}
