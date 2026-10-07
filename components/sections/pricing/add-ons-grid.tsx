"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ADD_ONS, PRICING_COPY } from "@/lib/constants";
import styles from "./pricing.module.css";

const addOnGroups = Object.entries(
  ADD_ONS.reduce<Record<string, Array<(typeof ADD_ONS)[number]>>>((groups, addOn) => {
    groups[addOn.category] ??= [];
    groups[addOn.category].push(addOn);
    return groups;
  }, {})
);

export function AddOnsGrid() {
  const [expanded, setExpanded] = useState<string | null>(addOnGroups[0][0]);

  return (
    <section id="add-ons" className={styles.addonsSection} aria-labelledby="addons-heading">
      <BlurFade className={styles.sectionHeader} direction="left" inViewAmount={0.7}>
        <h3 id="addons-heading" className="font-display text-xl">Add-ons</h3>
        <p className={styles.sectionDescription}>{PRICING_COPY.addonSub}</p>
      </BlurFade>
      <div className={styles.addonGrid}>
        {addOnGroups.map(([category, addOns], index) => {
          const id = "addons-" + category.toLowerCase().replace(/[^a-z]+/g, "-");
          const isOpen = expanded === category;
          return (
            <BlurFade
              as="section"
              key={category}
              className={styles.addonGroup}
              aria-labelledby={id + "-title"}
              direction="left"
              delay={index * 0.08}
              duration={0.98}
              inViewAmount={0.45}
            >
              <h4 id={id + "-title"}>
                <button
                  type="button"
                  className={styles.addonToggle}
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setExpanded(isOpen ? null : category)}
                >
                  {category}<ChevronDown className="size-4" aria-hidden />
                </button>
                <span className={styles.addonDesktopTitle}>{category}</span>
              </h4>
              <div id={id} className={styles.addonContent} data-expanded={isOpen}>
                <ul>
                  {addOns.map((addon) => (
                    <li key={addon.name} className={styles.addonItem}>
                      <div>
                        <p className="text-sm leading-snug text-foreground">{addon.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{addon.description}</p>
                      </div>
                      <span className={styles.addonPrice}>{addon.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
