"use client";

import { useState } from "react";

import { Container } from "@/components/shared/container";

import { AddOnsGrid } from "./pricing/add-ons-grid";
import { BuildPackages } from "./pricing/build-packages";
import { EditSizesTable } from "./pricing/edit-sizes-table";
import { OverageAndQuickRef } from "./pricing/overage-quick-ref";
import { RetainerPlans } from "./pricing/retainer-plans";

export function PricingSection() {
  const [yearlyBilling, setYearlyBilling] = useState(false);

  return (
    <section id="pricing" className="section-y border-t border-border">
      <Container className="space-y-12">
        <h2 className="max-w-xl font-display text-[var(--text-h2)]">
          Clear pricing. No surprises.
        </h2>

        <BuildPackages />
        <RetainerPlans
          yearlyBilling={yearlyBilling}
          onYearlyBillingChange={setYearlyBilling}
        />
        <EditSizesTable />
        <AddOnsGrid />
        <OverageAndQuickRef />
      </Container>
    </section>
  );
}
