"use client";

import { useRef, useState } from "react";
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
    <section className={styles.careSection} aria-labelledby="care-plans-heading">
      <BlurFade className={styles.sectionHeader} direction="up" inViewAmount={0.6}>
        <h3 id="care-plans-heading" className="font-display text-xl">Monthly care plans</h3>
        <p className={styles.sectionDescription}>Hosting, maintenance, and growth support after launch.</p>
        <div className={styles.billingRow}>
          <div className={styles.billingToggle} role="group" aria-label="Billing frequency">
            <button type="button" aria-pressed={!yearlyBilling} onClick={() => setYearlyBilling(false)}>Monthly</button>
            <button type="button" aria-pressed={yearlyBilling} onClick={() => setYearlyBilling(true)}>Yearly</button>
          </div>
          <span className={styles.savings}>Save 15% yearly</span>
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
        <p>Billed on the 1st. Medium and large edits are billed separately.</p>
        <EditSizesInfo />
      </div>
      <p className="sr-only" role="status">
        {yearlyBilling ? "Yearly billing selected. Prices show annual totals with a 15% saving." : "Monthly billing selected. Prices show monthly totals."}
      </p>
    </section>
  );
}
