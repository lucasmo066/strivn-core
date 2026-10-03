"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

type ScrollProgressProps = {
  className?: string;
  /** Scroll distance (px) before the bar leaves zero. */
  startAt?: number;
};

export function ScrollProgress({ className, startAt = 0 }: ScrollProgressProps) {
  const startAtRef = useRef(startAt);
  useLayoutEffect(() => { startAtRef.current = startAt; }, [startAt]);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (latest) => {
    if (typeof window === "undefined") return 0;

    const start = startAtRef.current;
    const max = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0
    );
    const range = max - start;
    if (range <= 0) return latest > start ? 1 : 0;
    return Math.min(1, Math.max(0, (latest - start) / range));
  });
  const scaleX = useSpring(progress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-full h-0.5 origin-left bg-gradient-to-r from-orange to-[color-mix(in_srgb,var(--orange)_48%,white)]",
        className
      )}
      style={{ scaleX }}
    />
  );
}
