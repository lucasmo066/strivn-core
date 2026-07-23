"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { HERO_HUD } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Keep HUD clear of the top-left copy block. */
const SLOT_CLASS = [
  "right-[8%] top-[28%] md:right-[12%] md:top-[26%]",
  "right-[6%] top-[42%] md:right-[18%] md:top-[40%]",
  "right-[14%] top-[56%] md:right-[10%] md:top-[54%]",
  "left-[48%] top-[48%] md:left-[52%] md:top-[36%]",
] as const;

const CAUSE_DELAY_MS = 400;
const EFFECT_STAGGER_MS = 700;
const HOLD_MS = 2800;
const CLEAR_MS = 500;
const CYCLE_GAP_MS = 900;

type Popup = {
  id: string;
  label: string;
  tone: "cause" | "effect";
  slot: number;
};

function buildCycle(cycle: number): Popup[] {
  const cause = HERO_HUD.causes[cycle % HERO_HUD.causes.length];
  const effectStart = (cycle * 3) % HERO_HUD.effects.length;

  const popups: Popup[] = [
    {
      id: `cause-${cycle}`,
      label: cause,
      tone: "cause",
      slot: 0,
    },
  ];

  for (let i = 0; i < 3; i++) {
    popups.push({
      id: `effect-${cycle}-${i}`,
      label: HERO_HUD.effects[(effectStart + i) % HERO_HUD.effects.length],
      tone: "effect",
      slot: i + 1,
    });
  }

  return popups;
}

/** Middle layer: pixel HUD floaters over the plate, under hero copy. */
export function HeroHudOverlay() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState<Popup[]>([]);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setVisible([
        {
          id: "static-cause",
          label: HERO_HUD.causes[0],
          tone: "cause",
          slot: 0,
        },
      ]);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const popups = buildCycle(cycle);
    let cancelled = false;

    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    schedule(() => {
      if (cancelled) return;
      setVisible([popups[0]]);
    }, CAUSE_DELAY_MS);

    for (let i = 1; i < popups.length; i++) {
      schedule(() => {
        if (cancelled) return;
        setVisible((prev) => [...prev, popups[i]]);
      }, CAUSE_DELAY_MS + i * EFFECT_STAGGER_MS);
    }

    const clearAt =
      CAUSE_DELAY_MS + (popups.length - 1) * EFFECT_STAGGER_MS + HOLD_MS;

    schedule(() => {
      if (cancelled) return;
      setVisible([]);
    }, clearAt);

    schedule(() => {
      if (cancelled) return;
      setCycle((c) => c + 1);
    }, clearAt + CLEAR_MS + CYCLE_GAP_MS);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [cycle, reduceMotion]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence>
        {visible.map((popup) => (
          <motion.p
            key={popup.id}
            className={cn(
              "absolute font-pixel text-[10px] uppercase tracking-[0.12em] md:text-xs",
              "drop-shadow-[0_1px_0_rgba(242,241,239,0.85)]",
              popup.tone === "cause"
                ? "text-orange"
                : "text-[var(--status-ok)]",
              SLOT_CLASS[popup.slot]
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {popup.label}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}
