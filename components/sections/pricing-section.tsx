"use client";

import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";

import { AddOnsGrid } from "./pricing/add-ons-grid";
import { BuildPackages } from "./pricing/build-packages";
import { EditSizesTable } from "./pricing/edit-sizes-table";
import { OverageAndQuickRef } from "./pricing/overage-quick-ref";
import { RetainerPlans } from "./pricing/retainer-plans";

export function PricingSection() {
  const [yearlyBilling, setYearlyBilling] = useState(false);

  return (
    <section id="pricing" className="section-y border-b border-border">
      <Container className="space-y-14">
        <div className="mx-auto max-w-2xl space-y-3 text-center md:mx-0 md:text-left">
          <MonoLabel>Pricing</MonoLabel>
          <h2 className="font-display text-[var(--text-h2)]">
            Transparent builds. Predictable support.
          </h2>
          <p className="font-ui text-muted-foreground">
            Fixed package pricing for launches. Monthly plans for everything
            after. Every edit size is defined upfront — no surprise invoices.
          </p>
        </div>

        <BuildPackages />
        <Separator />
        <RetainerPlans
          yearlyBilling={yearlyBilling}
          onYearlyBillingChange={setYearlyBilling}
        />
        <Separator />
        <EditSizesTable />
        <Separator />
        <AddOnsGrid />
        <Separator />
        <OverageAndQuickRef />
      </Container>
    </section>
  );
}
