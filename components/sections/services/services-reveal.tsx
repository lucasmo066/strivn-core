"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function ServicesReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      // Keep the server-rendered content visible, even before hydration.
      initial={false}
      whileInView={reduceMotion ? undefined : { opacity: [0.65, 1], y: [12, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
