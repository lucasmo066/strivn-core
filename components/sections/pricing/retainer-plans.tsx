import { MonoLabel } from "@/components/shared/mono-label";
import { Switch } from "@/components/ui/switch";
import { PRICING_COPY, RETAINER_PLANS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { RetainerCard } from "./retainer-card";

type RetainerPlansProps = {
  yearlyBilling: boolean;
  onYearlyBillingChange: (value: boolean) => void;
};

export function RetainerPlans({
  yearlyBilling,
  onYearlyBillingChange,
}: RetainerPlansProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <MonoLabel>02 — Retainer</MonoLabel>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
            Monthly retainer plans
          </h3>
          <p className="mt-2 max-w-2xl font-ui text-sm text-muted-foreground">
            {PRICING_COPY.retainerSub}
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
            onCheckedChange={onYearlyBillingChange}
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

      <div className="grid gap-3 lg:grid-cols-3">
        {RETAINER_PLANS.map((plan) => (
          <RetainerCard
            key={plan.name}
            plan={plan}
            yearlyBilling={yearlyBilling}
          />
        ))}
      </div>
    </div>
  );
}
