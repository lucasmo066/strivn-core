"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type NumberTickerProps = ComponentPropsWithoutRef<"span"> & {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
};

/** Spring-driven number reveal, using the NumberTicker API from Magic UI. */
export function NumberTicker({ value, startValue = 0, direction = "up", delay = 0, decimalPlaces = 0, ...props }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const initial = direction === "up" ? startValue : value;
  const target = direction === "up" ? value : startValue;
  const motionValue = useMotionValue(initial);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 });

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const format = (number: number) => number.toLocaleString("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
    if (ref.current) ref.current.textContent = format(initial);
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = format(latest);
    });
    const timer = setTimeout(() => motionValue.set(target), delay * 1000);
    return () => { clearTimeout(timer); unsubscribe(); };
  }, [inView, reducedMotion, initial, target, decimalPlaces, delay, motionValue, spring]);

  return <span ref={ref} {...props}>{target.toLocaleString("en-US", { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })}</span>;
}
