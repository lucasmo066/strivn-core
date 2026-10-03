import { cloneElement, isValidElement, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { BrandArrow } from "@/components/shared/brand-arrow";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { cn } from "@/lib/utils";
import type { StrivnButtonProps } from "@/types/design-system";

const variantMap = {
  primary: "default",
  outline: "outline",
  ghost: "ghost",
} as const;

export function StrivnButton({
  className,
  variant = "primary",
  size = "default",
  arrow = false,
  asChild = false,
  children,
  ...props
}: StrivnButtonProps) {
  const arrowVariant =
    variant === "primary" ? "white" : variant === "ghost" ? "black" : "black";

  const arrowEl = arrow ? (
    <BrandArrow
      variant={arrowVariant}
      className="ml-1.5 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 motion-reduce:transform-none"
    />
  ) : null;

  const stripes =
    variant === "primary" ? (
      <StripedPattern className="opacity-0 transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:opacity-100 group-focus-visible/btn:opacity-100 motion-reduce:transition-none" />
    ) : null;

  let content = children;

  if (asChild && isValidElement<{ children?: ReactNode }>(children)) {
    content = cloneElement(children, {
      children: (
        <>
          {stripes}
          {children.props.children}
          {arrowEl}
        </>
      ),
    });
  } else if (!asChild) {
    content = (
      <>
        {stripes}
        {children}
        {arrowEl}
      </>
    );
  }

  return (
    <Button
      variant={variantMap[variant]}
      size={size}
      asChild={asChild}
      className={cn(
        "group/btn rounded-[var(--radius-button)] font-sans transition-hairline",
        size === "default" && "h-11 px-5 text-sm",
        size === "sm" && "h-9 px-4",
        size === "lg" && "h-12 px-6 text-base",
        variant === "primary" &&
          "relative isolate overflow-hidden border-orange bg-orange text-white hover:border-orange hover:bg-orange/90 focus-visible:ring-orange/35",
        variant === "outline" &&
          "border-border bg-transparent hover:border-[var(--line-strong)] hover:bg-card",
        variant === "ghost" && "hover:bg-transparent hover:text-foreground",
        className
      )}
      {...props}
    >
      {content}
    </Button>
  );
}
