"use client";

import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import {
  HairlineCard,
  HairlineCardContent,
  HairlineCardDescription,
  HairlineCardHeader,
  HairlineCardTitle,
} from "@/components/surfaces/hairline-card";
import {
  ADD_ONS,
  BUILD_PACKAGES,
  EDIT_SIZES,
  EXTRA_PAGE_PRICE,
  OVERAGE_RATE,
  RETAINER_PLANS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [yearlyBilling, setYearlyBilling] = useState(false);

  return (
    <section id="pricing" className="section-y border-b border-border">
      <Container className="space-y-16">
        <div className="max-w-2xl space-y-3">
          <MonoLabel>Pricing</MonoLabel>
          <h2 className="font-display text-[var(--text-h2)]">
            Clear builds. Clear retainers.
          </h2>
          <p className="font-ui text-muted-foreground">
            Fixed package pricing for launches. Monthly plans for everything
            after. No surprise scope — every edit size is defined upfront.
          </p>
        </div>

        {/* Build packages */}
        <div className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <MonoLabel>Build packages</MonoLabel>
              <p className="mt-1 font-ui text-sm text-muted-foreground">
                One-time project pricing. Custom scope quoted separately.
              </p>
            </div>
            <p className="hidden font-ui text-sm text-muted-foreground tabular-nums sm:block">
              Extra pages: {EXTRA_PAGE_PRICE} each
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BUILD_PACKAGES.map((pkg) => (
              <HairlineCard
                key={pkg.name}
                brackets
                accentBrackets={"featured" in pkg && pkg.featured}
                className={cn(
                  "featured" in pkg &&
                    pkg.featured &&
                    "border-[var(--line-strong)]"
                )}
              >
                <HairlineCardHeader>
                  <MonoLabel>{pkg.pages}</MonoLabel>
                  <HairlineCardTitle className="font-display">
                    {pkg.name}
                  </HairlineCardTitle>
                  <p className="font-ui text-2xl font-semibold tabular-nums">
                    {pkg.price}
                  </p>
                </HairlineCardHeader>
                <HairlineCardContent>
                  <StrivnButton
                    variant={"featured" in pkg && pkg.featured ? "primary" : "outline"}
                    className="w-full"
                    arrow={"featured" in pkg && pkg.featured}
                  >
                    Get started
                  </StrivnButton>
                </HairlineCardContent>
              </HairlineCard>
            ))}
          </div>
          <p className="font-ui text-sm text-muted-foreground tabular-nums sm:hidden">
            Extra pages: {EXTRA_PAGE_PRICE} each
          </p>
        </div>

        <Separator />

        {/* Add-ons */}
        <div className="space-y-6">
          <div>
            <MonoLabel>Add-ons</MonoLabel>
            <p className="mt-1 font-ui text-sm text-muted-foreground">
              Layer onto any build package as needed.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {ADD_ONS.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-between gap-4 bg-card px-4 py-3 font-ui"
              >
                <span className="text-sm">{addon.name}</span>
                <span className="shrink-0 text-sm font-medium tabular-nums">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Retainer plans */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <MonoLabel>Monthly retainer plans</MonoLabel>
              <p className="mt-1 font-ui text-sm text-muted-foreground">
                Hosting, maintenance, and ongoing support after launch.
              </p>
            </div>
            <div className="flex items-center gap-3 font-ui">
              <span
                className={cn(
                  "text-sm",
                  !yearlyBilling ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Monthly
              </span>
              <Switch
                checked={yearlyBilling}
                onCheckedChange={setYearlyBilling}
                aria-label="Toggle yearly billing"
              />
              <span
                className={cn(
                  "text-sm",
                  yearlyBilling ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Yearly
              </span>
              {yearlyBilling ? (
                <span className="font-pixel text-[10px] text-orange uppercase">
                  [ 10% off ]
                </span>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {RETAINER_PLANS.map((plan) => {
              const price = yearlyBilling ? plan.yearly : plan.monthly;

              return (
                <HairlineCard
                  key={plan.name}
                  brackets
                  accentBrackets={"featured" in plan && plan.featured}
                  className={cn(
                    "featured" in plan &&
                      plan.featured &&
                      "border-[var(--line-strong)]"
                  )}
                >
                  <HairlineCardHeader>
                    <MonoLabel>{plan.name}</MonoLabel>
                    <p className="font-ui text-3xl font-semibold tabular-nums">
                      ${price}
                      <span className="text-base font-normal text-muted-foreground">
                        /mo
                      </span>
                    </p>
                    {yearlyBilling ? (
                      <HairlineCardDescription className="tabular-nums">
                        Billed annually · ${price * 12}/yr
                      </HairlineCardDescription>
                    ) : (
                      <HairlineCardDescription className="tabular-nums">
                        ${plan.yearly}/mo on yearly billing
                      </HairlineCardDescription>
                    )}
                  </HairlineCardHeader>
                  <HairlineCardContent>
                    <ul className="space-y-2 font-ui text-sm text-muted-foreground">
                      {plan.included.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-border">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </HairlineCardContent>
                </HairlineCard>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Edit sizes */}
        <div className="space-y-6">
          <div>
            <MonoLabel>Edit sizes defined</MonoLabel>
            <p className="mt-1 font-ui text-sm text-muted-foreground">
              Small edits are included in retainer plans. Medium and large work
              is scoped before we start.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {EDIT_SIZES.map((size) => (
              <HairlineCard key={size.name}>
                <HairlineCardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <HairlineCardTitle>{size.name}</HairlineCardTitle>
                    <span className="font-pixel text-[10px] text-muted-foreground uppercase">
                      [ {size.label} ]
                    </span>
                  </div>
                  <HairlineCardDescription>{size.description}</HairlineCardDescription>
                </HairlineCardHeader>
                {size.price ? (
                  <HairlineCardContent>
                    <p className="font-ui text-sm font-medium tabular-nums">
                      {size.price}
                    </p>
                  </HairlineCardContent>
                ) : null}
              </HairlineCard>
            ))}
          </div>

          <p className="font-ui text-sm text-muted-foreground tabular-nums">
            Overage rate: {OVERAGE_RATE}
          </p>
        </div>
      </Container>
    </section>
  );
}
