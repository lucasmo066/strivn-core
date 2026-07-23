"use client";

import { useState } from "react";

import { Container } from "@/components/shared/container";
import { PRICING_COPY } from "@/lib/constants";

import { AddOnsGrid } from "./pricing/add-ons-grid";
import { BuildPackages } from "./pricing/build-packages";
import { OverageAndQuickRef } from "./pricing/overage-quick-ref";
import { RetainerPlans } from "./pricing/retainer-plans";

export function PricingSection() {
  const [yearlyBilling, setYearlyBilling] = useState(false);

  return (
    <section id="pricing" className="section-y border-t border-border">
      <Container className="space-y-12">
        <div className="max-w-xl space-y-3">
          <h2 className="font-display text-[var(--text-h2)]">
            Clear pricing. No surprises.
          </h2>
          <p className="text-base text-muted-foreground">
            {PRICING_COPY.intro}
          </p>
        </div>

        <BuildPackages />
        <RetainerPlans
          yearlyBilling={yearlyBilling}
          onYearlyBillingChange={setYearlyBilling}
        />
        <AddOnsGrid />
        <OverageAndQuickRef />
      </Container>
    </section>
  );
}
