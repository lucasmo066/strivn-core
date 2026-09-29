import { ChevronDown } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { OVERAGE_RATE, PRICING_QUICK_REF } from "@/lib/constants";
import styles from "./pricing.module.css";

export function OverageAndQuickRef() {
  return (
    <BlurFade className={styles.terms} inViewAmount={0.55}>
      <div className={styles.overage}>
        <div>
          <h3 className="text-sm font-medium">Out-of-scope work</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Quoted and approved before we start. No surprise invoices.
          </p>
        </div>
        <p className="shrink-0 font-display text-xl text-orange tabular-nums">{OVERAGE_RATE}</p>
      </div>
      <details className={styles.termsDisclosure}>
        <summary>Billing &amp; project terms <ChevronDown className="size-4" aria-hidden /></summary>
        <dl className={styles.quickRef}>
          {PRICING_QUICK_REF.map((item) => (
            <div key={item.label}>
              <dt className="text-xs text-muted-foreground">{item.label}</dt>
              <dd className="mt-2 text-sm font-medium">
                {item.value}{item.suffix ? " " + item.suffix : ""}
              </dd>
            </div>
          ))}
        </dl>
      </details>
    </BlurFade>
  );
}
