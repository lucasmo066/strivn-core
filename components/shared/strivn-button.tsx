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
  children,
  ...props
}: StrivnButtonProps) {
  const arrowVariant =
    variant === "primary" ? "white" : variant === "ghost" ? "black" : "black";

  return (
    <Button
      variant={variantMap[variant]}
      size={size}
      className={cn(
        "font-ui rounded-md transition-hairline",
        variant === "primary" &&
          "border-orange bg-orange text-white hover:bg-orange/90 hover:border-orange focus-visible:ring-orange/35",
        variant === "outline" &&
          "border-border bg-transparent hover:border-[var(--line-strong)] hover:bg-transparent",
        variant === "ghost" &&
          "hover:bg-transparent hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      {arrow ? <BrandArrow variant={arrowVariant} className="ml-1.5" /> : null}
    </Button>
  );
}
