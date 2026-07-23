import { Switch } from "@/components/ui/switch";
import { RETAINER_PLANS } from "@/lib/constants";
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-display text-xl font-semibold tracking-tight">
          Monthly care plans
        </h3>
        <div className="flex items-center gap-3 text-sm">
          <span
            className={cn(
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
              yearlyBilling ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Yearly
          </span>
          {yearlyBilling ? (
            <span className="rounded-lg bg-orange/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-orange uppercase">
              10% off
            </span>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
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
