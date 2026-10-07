import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Minus } from "lucide-react";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BlurFade } from "@/components/ui/blur-fade";
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
  active: boolean;
  delay: number;
};

export function RetainerCard({ plan, yearlyBilling, selected, active, delay }: RetainerCardProps) {
  const annualTotal = plan.yearly * 12;
  const annualSavings = plan.monthly * 12 - annualTotal;
  const formatPrice = (price: number) => price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const items = plan.sections.flatMap((section) => section.items);
  const included = items.filter((item) => item.included);
  const excluded = items.filter((item) => !item.included);
  const id = "care-plan-" + plan.name.toLowerCase();

  return (
    <BlurFade
      as="article"
      id={id}
      className={styles.planCard}
      data-selected={selected}
      data-featured={plan.featured || undefined}
      aria-labelledby={id + "-title"}
      active={active}
      direction="up"
      delay={delay}
      duration={1.02}
      offset={10}
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
          <li key={item.text}><Check aria-hidden stroke="url(#strivn-orange-gradient)" className="size-4 shrink-0" /><span>{item.text}</span></li>
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
      <StrivnButton
        variant="outline"
        className={plan.featured ? `${styles.planCta} strivn-3d--white` : styles.planCta}
        aria-label={"Get started with " + plan.name + " care"}
        asChild
      >
        <Link scroll={false} href="/#contact">
          Get started <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </StrivnButton>
    </BlurFade>
  );
}
