"use client";

import {
  forwardRef,
  isValidElement,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Button3D } from "react-3d-button";

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
      children,
      disabled,
      type: buttonType,
      onClick,
      ...props
    },
    ref
  ) {
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
