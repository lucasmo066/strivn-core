"use client";

import { type AriaAttributes, type CSSProperties, type ReactNode, type RefObject, useEffect, useRef, useState } from "react";
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
  duration: number,
  delay: number,
): Variants {
  const axis = direction === "left" || direction === "right" ? "x" : "y";

  return {
    hidden: {
      ...(axis === "x" ? { x: shift(direction, offset) } : { y: shift(direction, offset) }),
      opacity: 0,
      filter: `blur(${blur})`,
      transition: {
        delay: 0,
        duration: duration * 0.85,
        ease: EASE,
        filter: { duration: duration * 0.85, ease: EASE },
      },
    },
    visible: {
      ...(axis === "x" ? { x: 0 } : { y: 0 }),
      opacity: 1,
      filter: "blur(0px)",
      transitionEnd: { filter: "none" },
      transition: {
        delay: 0.04 + delay,
        duration,
        ease: EASE,
        filter: { duration, ease: EASE },
      },
    },
  };
}

const getFilter = (variant: Variants[string]) =>
  typeof variant === "function" ? undefined : variant.filter;

function enterAmount(amount: UseInViewOptions["amount"]) {
  if (amount === "all") return 1;
  if (typeof amount === "number") return amount;
  return 0;
}

/** Shows once enough of the element is in view, and hides only after it leaves. */
export function useRevealOnScroll(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  amount: UseInViewOptions["amount"],
  margin?: string,
) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const enterAt = enterAmount(amount);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setShown(false);
          return;
        }
        if (entry.intersectionRatio + 0.001 >= enterAt) setShown(true);
      },
      {
        rootMargin: margin,
        threshold: enterAt <= 0 ? [0] : [0, Math.min(enterAt, 1)],
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, enabled, amount, margin]);

  return shown;
}

export function BlurFade({
  children,
  className,
  as = "div",
  variant,
  duration = 1.05,
  delay = 0,
  offset = 8,
  direction = "up",
  inView = true,
  inViewMargin = "0px 0px -12% 0px",
  inViewAmount = 0.65,
  blur = "6px",
  active,
  id,
  ...props
}: BlurFadeProps) {
  const MotionTag = motionTags[as] as typeof motion.div;
  const combinedVariants =
    variant ?? blurFadeVariants(direction, offset, blur, duration, delay);
  const hiddenFilter = getFilter(combinedVariants.hidden);
  const visibleFilter = getFilter(combinedVariants.visible);
  const shouldTransitionFilter =
    hiddenFilter != null &&
    visibleFilter != null &&
    hiddenFilter !== visibleFilter;
  const controlled = active !== undefined;
  const ref = useRef<HTMLElement>(null);
  const revealed = useRevealOnScroll(
    ref,
    !controlled && inView,
    inViewAmount,
    typeof inViewMargin === "string" ? inViewMargin : undefined,
  );
  const visible = controlled ? active : inView ? revealed : true;

  return (
    <MotionTag
      ref={(element) => { ref.current = element; }}
      id={id}
      data-blur-fade=""
      data-revealed={visible}
      style={{ "--reveal-delay": `${0.04 + delay}s` } as CSSProperties}
      className={cn(className)}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={
        variant
          ? {
              delay: 0.04 + delay,
              duration,
              ease: EASE,
              ...(shouldTransitionFilter ? { filter: { duration, ease: EASE } } : {}),
            }
          : undefined
      }
      {...props}
    >
      {children}
    </MotionTag>
  );
}
