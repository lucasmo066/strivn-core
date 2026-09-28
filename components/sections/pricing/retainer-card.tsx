import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Minus } from "lucide-react";
import type { RetainerSection } from "@/lib/constants";
import styles from "./pricing.module.css";

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
  selected: boolean;
};

export function RetainerCard({ plan, yearlyBilling, selected }: RetainerCardProps) {
  const annualTotal = plan.yearly * 12;
  const annualSavings = plan.monthly * 12 - annualTotal;
  const formatPrice = (price: number) => price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const items = plan.sections.flatMap((section) => section.items);
  const included = items.filter((item) => item.included);
  const excluded = items.filter((item) => !item.included);
  const id = "care-plan-" + plan.name.toLowerCase();

  return (
    <article
      id={id}
      className={styles.planCard}
      data-selected={selected}
      data-featured={plan.featured ?? false}
      aria-labelledby={id + "-title"}
    >
      <div className={styles.planHeader}>
        <div className={styles.nameRow}>
          <h4 id={id + "-title"} className="text-base font-semibold">{plan.name}</h4>
        </div>
        <div className={styles.carePrice}>
          <p className={styles.price}>{"$" + formatPrice(yearlyBilling ? annualTotal : plan.monthly)}</p>
          <span className={styles.priceSuffix}>{yearlyBilling ? "/year" : "/mo"}</span>
        </div>
        <p className={styles.priceNote}>
          {yearlyBilling
            ? "Billed yearly. Save $" + formatPrice(annualSavings) + " vs monthly."
            : "Billed monthly."}
        </p>
      </div>
      <ul className={styles.features}>
        {included.map((item) => (
          <li key={item.text}><Check aria-hidden className="size-4 shrink-0 text-orange" /><span>{item.text}</span></li>
        ))}
      </ul>
      {excluded.length > 0 && (
        <details className={styles.exclusions}>
          <summary>Not included <ChevronDown aria-hidden className="size-3.5" /></summary>
          <ul className={styles.features}>
            {excluded.map((item) => (
              <li key={item.text}><Minus aria-hidden className="size-4 shrink-0" /><span>{item.text}</span></li>
            ))}
          </ul>
        </details>
      )}
      <Link href="/#contact" className={styles.planCta} aria-label={"Get started with " + plan.name + " care"}>
        Get started <ArrowUpRight aria-hidden className="size-4" />
      </Link>
    </article>
  );
}
