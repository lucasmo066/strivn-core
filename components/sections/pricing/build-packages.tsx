"use client";

import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { BUILD_PACKAGES, EXTRA_PAGE_PRICE } from "@/lib/constants";
import { PlanSelector } from "./plan-selector";
import styles from "./pricing.module.css";

export function BuildPackages() {
  const [selectedPlan, setSelectedPlan] = useState<string>(BUILD_PACKAGES[0].name);

  return (
    <section aria-labelledby="build-plans-heading">
      <div className={styles.sectionHeader}>
        <h3 id="build-plans-heading" className="font-display text-xl">Website builds</h3>
        <p className={styles.sectionDescription}>One-time project fees. A clear scope for every stage.</p>
      </div>
      <PlanSelector
        kind="build"
        label="Choose a website build"
        names={BUILD_PACKAGES.map((pkg) => pkg.name)}
        selected={selectedPlan}
        onChange={setSelectedPlan}
      />
      <div className={styles.buildGrid}>
        {BUILD_PACKAGES.map((pkg) => {
          const featured = "featured" in pkg && pkg.featured;
          const id = "build-plan-" + pkg.name.toLowerCase();
          return (
            <article
              id={id}
              key={pkg.name}
              className={styles.planCard}
              data-selected={selectedPlan === pkg.name}
              data-featured={featured}
              aria-labelledby={id + "-title"}
            >
              <div className={styles.planHeader}>
                <div className={styles.nameRow}>
                  <h4 id={id + "-title"} className="text-base font-semibold">{pkg.name}</h4>
                  {"badge" in pkg && <span className={styles.badge}>{pkg.badge}</span>}
                </div>
                <p className={styles.scope}>{pkg.pages}</p>
                <p className={styles.price}>{pkg.price}</p>
                <p className={styles.priceNote}>{pkg.priceNote}</p>
              </div>
              <ul className={styles.features}>
                {pkg.includes.map((item) => (
                  <li key={item}><Check aria-hidden className="size-4 shrink-0 text-orange" /><span>{item}</span></li>
                ))}
              </ul>
              <Link href="/#contact" className={styles.planCta} aria-label={"Get started with " + pkg.name}>
                Get started <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            </article>
          );
        })}
      </div>
      <div className={styles.note}>
        <p>Extra pages: {EXTRA_PAGE_PRICE} each. 50% deposit, 50% at launch.</p>
      </div>
    </section>
  );
}
