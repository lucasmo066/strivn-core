"use client";

import { motion, useReducedMotion } from "motion/react";

type HeroHeadingProps = {
  children: string;
};

const headingClassName =
  "max-w-[20ch] font-pixel text-[clamp(2.125rem,5.4vw,2.95rem)] leading-[1.1] tracking-[0.015em]";

export function HeroHeading({ children }: HeroHeadingProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <h1 className={headingClassName}>
        <span className="bg-gradient-to-r from-[#b93a00] via-[#df5107] to-[#ed6b28] bg-clip-text text-transparent dark:from-[#ffbf9f] dark:via-[#ff914f] dark:to-[#ff7227]">
          {children}
        </span>
      </h1>
    );
  }

  return (
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={headingClassName}
    >
      <span className="bg-gradient-to-r from-[#b93a00] via-[#df5107] to-[#ed6b28] bg-clip-text text-transparent dark:from-[#ffbf9f] dark:via-[#ff914f] dark:to-[#ff7227]">
        {children}
      </span>
    </motion.h1>
  );
}
