"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type BrandIconMotionProps = {
  children: ReactNode;
};

export function BrandIconMotion({ children }: BrandIconMotionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}
