import { cn } from "@/lib/utils";
import type { RetainerSection } from "@/lib/constants";

type RetainerPlan = {
  name: string;
  monthly: number;
  yearly: number;
  featured?: boolean;
  sections: RetainerSection[];
};

type RetainerCardProps = {
  plan: RetainerPlan;
  yearlyBilling: boolean;
};

export function RetainerCard({ plan, yearlyBilling }: RetainerCardProps) {
  const featured = plan.featured ?? false;
  const annualTotal = plan.yearly * 12;
  const annualSavings = plan.monthly * 12 - annualTotal;
  const displayedPrice = yearlyBilling ? annualTotal : plan.monthly;
  const priceSuffix = yearlyBilling ? "/year" : "/mo";
  const formatPrice = (price: number) =>
    price.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-transparent transition-lift hover:border-[var(--line-strong)] hover:bg-white/35 hover:shadow-soft-hover",
        featured && "border-orange/60"
      )}
    >
      <div
        className={cn(
          "border-b border-border px-5 py-5",
          featured && "void border-[var(--line-dark)]"
        )}
      >
        <p
          className={cn(
            "font-display text-sm",
            featured ? "text-white" : "text-foreground"
          )}
        >
          {plan.name}
        </p>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-display text-3xl tracking-wide tabular-nums",
              featured ? "text-orange" : "text-foreground"
            )}
          >
            ${formatPrice(displayedPrice)}
          </span>
          <span
            className={cn(
              "font-ui text-[10px]",
              featured ? "text-white/50" : "text-muted-foreground"
            )}
          >
            {priceSuffix}
          </span>
        </div>
        <p
          className={cn(
            "mt-1 font-ui text-[11px] tabular-nums",
            featured ? "text-white/50" : "text-muted-foreground"
          )}
        >
          {yearlyBilling
            ? `Annual commitment. Save $${formatPrice(annualSavings)} versus monthly.`
            : "Pay yearly to save 15%."}
        </p>
      </div>

      <div className="space-y-4 px-5 py-5">
        {plan.sections.map((section) => (
          <div key={section.label}>
            <p className="mb-2 font-ui text-[10px] font-semibold tracking-wide text-orange uppercase">
              {section.label}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li
                  key={item.text}
                  className={cn(
                    "relative pl-4 font-ui text-xs leading-relaxed",
                    item.included
                      ? "text-muted-foreground"
                      : "text-muted-foreground/45"
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0 text-[10px]",
                      item.included ? "text-orange" : "text-border"
                    )}
                  >
                    {item.included ? "+" : "-"}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
