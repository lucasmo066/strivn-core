"use client";

import {
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Button3D } from "react-3d-button";
import { useRouter } from "next/navigation";

import { BrandArrow } from "@/components/shared/brand-arrow";
import { cn } from "@/lib/utils";
import type { StrivnButtonProps } from "@/types/design-system";

const visualType = {
  primary: "primary",
  outline: "secondary",
  ghost: "tertiary",
} as const;

const sizeMap = {
  default: "md",
  sm: "sm",
  lg: "lg",
} as const;

export const StrivnButton = forwardRef<HTMLSpanElement, StrivnButtonProps>(
  function StrivnButton(
    {
      className,
      variant = "primary",
      size = "default",
      arrow = false,
      asChild = false,
      touchFeedback = false,
      children,
      disabled,
      type: buttonType,
      onClick,
      ...props
    },
    ref
  ) {
    const router = useRouter();
    const touchStarted = useRef<number | null>(null);
    const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => () => {
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
      if (releaseTimer.current) clearTimeout(releaseTimer.current);
    }, []);
    let href: string | undefined;
    let element: ElementType | undefined;
    let label: ReactNode = children;

    if (asChild && isValidElement<{ href?: unknown; children?: ReactNode }>(children)) {
      const childHref = children.props.href;
      href = typeof childHref === "string" ? childHref : undefined;
      label = children.props.children;
      if (href && typeof children.type !== "string") {
        element = children.type;
      }
    }

    const arrowEl = arrow ? (
      <BrandArrow
        variant={variant === "primary" ? "white" : "black"}
        className={cn("strivn-3d-arrow", variant !== "primary" && "dark:invert")}
      />
    ) : null;

    return (
      <span
        ref={ref}
        className={cn("strivn-3d-wrap inline-flex", className)}
        onClick={onClick}
        onPointerDownCapture={(event) => {
          if (disabled || event.pointerType === "mouse") return;
          touchStarted.current = performance.now();
          if (releaseTimer.current) clearTimeout(releaseTimer.current);
          event.currentTarget.dataset.touchPressed = "true";
        }}
        onPointerUpCapture={(event) => {
          const wrapper = event.currentTarget;
          releaseTimer.current = setTimeout(() => { delete wrapper.dataset.touchPressed; }, 160);
        }}
        onPointerCancelCapture={(event) => {
          touchStarted.current = null;
          delete event.currentTarget.dataset.touchPressed;
        }}
        onClickCapture={(event) => {
          const started = touchStarted.current;
          touchStarted.current = null;
          if (!touchFeedback || !href || disabled || started === null || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          const remaining = Math.max(0, 150 - (performance.now() - started));
          if (!remaining) return;
          event.preventDefault();
          if (navigationTimer.current) clearTimeout(navigationTimer.current);
          navigationTimer.current = setTimeout(() => router.push(href), remaining);
        }}
      >
        <Button3D
          type={visualType[variant]}
          size={sizeMap[size]}
          href={href}
          element={element}
          disabled={disabled}
          placeholder={false}
          className="strivn-3d"
          after={arrowEl}
          containerProps={
            {
              ...props,
              ...(href
                ? {}
                : {
                    type: buttonType ?? "button",
                    disabled,
                  }),
            } as HTMLAttributes<HTMLElement>
          }
        >
          {label}
        </Button3D>
      </span>
    );
  }
);
