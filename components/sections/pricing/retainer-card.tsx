import { MonoLabel } from "@/components/shared/mono-label";
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
  const price = yearlyBilling ? plan.yearly : plan.monthly;
  const featured = plan.featured ?? false;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card transition-hairline hover:border-orange/40",
        featured && "border-orange"
      )}
    >
      <div
        className={cn(
          "border-b border-border px-5 py-4",
          featured && "void border-[var(--line-dark)]"
        )}
      >
        <p
          className={cn(
            "font-display text-sm font-bold",
            featured ? "text-white" : "text-foreground"
          )}
        >
          {plan.name}
        </p>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-display text-3xl font-bold tracking-tight tabular-nums",
              featured ? "text-orange" : "text-foreground"
            )}
          >
            ${price}
          </span>
          <span
            className={cn(
              "font-ui text-[10px]",
              featured ? "text-white/50" : "text-muted-foreground"
            )}
          >
            /mo
          </span>
        </div>
        <p
          className={cn(
            "mt-1 font-ui text-[11px] tabular-nums",
            featured ? "text-white/50" : "text-muted-foreground"
          )}
        >
          ${plan.yearly}/mo billed yearly
        </p>
      </div>

      <div className="space-y-4 px-5 py-4">
        {plan.sections.map((section) => (
          <div key={section.label}>
            <MonoLabel className="mb-2 block text-[9px] text-orange">
              {section.label}
            </MonoLabel>
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
                    {item.included ? "✓" : "—"}
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
