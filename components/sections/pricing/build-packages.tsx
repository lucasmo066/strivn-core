"use client";

import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

import { StrivnButton } from "@/components/shared/strivn-button";
import { BlurFade, useRevealOnScroll } from "@/components/ui/blur-fade";
import { BUILD_PACKAGES, EXTRA_PAGE_PRICE } from "@/lib/constants";
import { PlanSelector } from "./plan-selector";
import styles from "./pricing.module.css";

export function BuildPackages() {
  const gridRef = useRef<HTMLDivElement>(null);
  const shown = useRevealOnScroll(gridRef, true, 0.35, "0px 0px -12% 0px");
  const [selectedPlan, setSelectedPlan] = useState<string>(BUILD_PACKAGES[0].name);

  return (
    <section id="builds" aria-labelledby="build-plans-heading">
      <BlurFade className={styles.sectionHeader} inViewAmount={0.75}>
        <h3 id="build-plans-heading" className="font-display text-xl">Website builds</h3>
        <p className={styles.sectionDescription}>One-time project fees. A clear scope for every stage.</p>
      </BlurFade>
      <BlurFade inViewAmount={0.8}>
        <PlanSelector
          kind="build"
          label="Choose a website build"
          names={BUILD_PACKAGES.map((pkg) => pkg.name)}
          selected={selectedPlan}
          onChange={setSelectedPlan}
        />
      </BlurFade>
      <div ref={gridRef} className={styles.buildGrid}>
        {BUILD_PACKAGES.map((pkg, index) => {
          const featured = "featured" in pkg && pkg.featured;
          const id = "build-plan-" + pkg.name.toLowerCase();
          return (
            <BlurFade
              as="article"
              id={id}
              key={pkg.name}
              className={styles.planCard}
              data-selected={selectedPlan === pkg.name}
              data-featured={featured || undefined}
              aria-labelledby={id + "-title"}
              active={shown}
              direction="right"
              delay={index * 0.1}
              duration={1.02}
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
                  <li key={item}><Check aria-hidden stroke="url(#strivn-orange-gradient)" className="size-4 shrink-0" /><span>{item}</span></li>
                ))}
              </ul>
              <StrivnButton
                variant="outline"
                className={featured ? `${styles.planCta} strivn-3d--white` : styles.planCta}
                aria-label={"Get started with " + pkg.name}
                asChild
              >
                <Link href={`/start?package=${pkg.name.toLowerCase()}`}>
                  Choose {pkg.name} <ArrowUpRight aria-hidden className="size-4" />
                </Link>
              </StrivnButton>
            </BlurFade>
          );
        })}
      </div>
      <div className={styles.note}>
        <p>Extra pages: {EXTRA_PAGE_PRICE} each. 50% deposit, 50% at launch.</p>
      </div>
    </section>
  );
}
