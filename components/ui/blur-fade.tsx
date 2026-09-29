"use client";

import { type AriaAttributes, type ReactNode } from "react";
import { motion, type UseInViewOptions, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

type MarginType = UseInViewOptions["margin"];
type Direction = "up" | "down" | "left" | "right";
type BlurFadeTag = "div" | "li" | "figure" | "article" | "section" | "header";

const motionTags = {
  div: motion.div,
  li: motion.li,
  figure: motion.figure,
  article: motion.article,
  section: motion.section,
  header: motion.header,
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

type BlurFadeProps = AriaAttributes & {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: BlurFadeTag;
  variant?: Variants;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: Direction;
  inView?: boolean;
  inViewMargin?: MarginType;
  inViewAmount?: UseInViewOptions["amount"];
  blur?: string;
  /** Plays with sibling items when a parent reports the group is in view. */
  active?: boolean;
  [key: `data-${string}`]: string | boolean | undefined;
};

function shift(direction: Direction, offset: number) {
  return direction === "right" || direction === "down" ? -offset : offset;
}

function blurFadeVariants(
  direction: Direction,
  offset: number,
  blur: string,
): Variants {
  const axis = direction === "left" || direction === "right" ? "x" : "y";

  return {
    hidden: {
      [axis]: shift(direction, offset),
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [axis]: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
  };
}

const getFilter = (variant: Variants[string]) =>
  typeof variant === "function" ? undefined : variant.filter;

export function BlurFade({
  children,
  className,
  as = "div",
  variant,
  duration = 0.7,
  delay = 0,
  offset = 8,
  direction = "up",
  inView = true,
  inViewMargin = "0px",
  inViewAmount = 0.65,
  blur = "6px",
  active,
  id,
  ...props
}: BlurFadeProps) {
  const MotionTag = motionTags[as] as typeof motion.div;
  const combinedVariants = variant ?? blurFadeVariants(direction, offset, blur);
  const hiddenFilter = getFilter(combinedVariants.hidden);
  const visibleFilter = getFilter(combinedVariants.visible);
  const shouldTransitionFilter =
    hiddenFilter != null &&
    visibleFilter != null &&
    hiddenFilter !== visibleFilter;
  const controlled = active !== undefined;

  return (
    <MotionTag
      id={id}
      data-blur-fade=""
      className={cn(className)}
      initial="hidden"
      animate={
        controlled ? (active ? "visible" : "hidden") : inView ? undefined : "visible"
      }
      whileInView={!controlled && inView ? "visible" : undefined}
      viewport={{ once: true, amount: inViewAmount, margin: inViewMargin }}
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: EASE,
        ...(shouldTransitionFilter ? { filter: { duration, ease: EASE } } : {}),
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
