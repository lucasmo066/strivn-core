import { cloneElement, isValidElement, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { BrandArrow } from "@/components/shared/brand-arrow";
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

  let content = children;

  if (asChild && arrow && isValidElement<{ children?: ReactNode }>(children)) {
    content = cloneElement(children, {
      children: (
        <>
          {children.props.children}
          {arrowEl}
        </>
      ),
    });
  } else if (!asChild) {
    content = (
      <>
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
        "group/btn rounded-xl font-sans transition-hairline",
        size === "default" && "h-11 px-5 text-sm",
        size === "sm" && "h-9 px-4",
        size === "lg" && "h-12 px-6 text-base",
        variant === "primary" &&
          "border-orange bg-orange text-white hover:border-orange hover:bg-orange/90 focus-visible:ring-orange/35",
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
