"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeService = SERVICES[activeIndex];

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-6">
      <motion.aside
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[var(--radius-lg)] border border-border bg-muted/45 p-6 sm:p-8"
      >
        <p className="font-mono text-[10px] font-semibold tracking-[0.12em] text-orange uppercase">
          The site&apos;s job
        </p>
        <h3 className="mt-4 max-w-[15ch] font-display text-[clamp(1.4rem,2.5vw,2rem)] leading-tight tracking-wide text-foreground">
          Make the next call easy to take.
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Each decision serves a simple path: show up when intent is high,
          make the business feel credible, then make action clear.
        </p>

        <ol className="mt-7 grid gap-3 border-t border-border pt-5 text-sm">
          {[
            "Search intent meets a clear local offer.",
            "Proof and structure reduce hesitation.",
            "A focused next step turns interest into a lead.",
          ].map((step, index) => (
            <li key={step} className="flex gap-3 text-muted-foreground">
              <span className="font-pixel text-xs text-orange">0{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <p className="mt-7 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          Optional AI inquiry recovery turns after-hours interest into a planned
          follow-up instead of a missed opportunity.
        </p>
      </motion.aside>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-4"
      >
        <div
          aria-label="Website service focus"
          className="grid grid-cols-2 gap-2"
        >
          {SERVICES.map((service, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={service.title}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "min-h-20 rounded-[var(--radius-md)] border px-4 py-4 text-left transition-hairline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40",
                  isActive
                    ? "border-orange bg-orange text-white"
                    : "border-border bg-transparent text-foreground hover:border-[var(--line-strong)] hover:bg-card"
                )}
              >
                <span className="block font-display text-sm tracking-wide">
                  {service.title}
                </span>
                <span
                  className={cn(
                    "mt-2 block text-xs",
                    isActive ? "text-white/75" : "text-muted-foreground"
                  )}
                >
                  {isActive ? "Selected" : "Explore"}
                </span>
              </button>
            );
          })}
        </div>

        <motion.article
          key={activeService.title}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-48 rounded-[var(--radius-lg)] border border-border bg-card p-6 sm:p-8"
          aria-live="polite"
        >
          <p className="font-mono text-[10px] font-semibold tracking-[0.12em] text-orange uppercase">
            {String(activeIndex + 1).padStart(2, "0")} / {SERVICES.length}
          </p>
          <h3 className="mt-5 font-display text-2xl tracking-wide text-foreground">
            {activeService.title}
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            {activeService.description}
          </p>
        </motion.article>
      </motion.div>
    </div>
  );
}
