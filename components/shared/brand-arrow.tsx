import Image from "next/image";

import { BRAND_ASSETS } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";
import type { BrandArrowProps } from "@/types/design-system";

const ARROW_PATHS = {
  black: {
    outline: BRAND_ASSETS.arrow.black,
    filled: BRAND_ASSETS.arrow.blackFilled,
  },
  white: {
    outline: BRAND_ASSETS.arrow.white,
    filled: BRAND_ASSETS.arrow.white,
  },
  orange: {
    outline: BRAND_ASSETS.arrow.orange,
    filled: BRAND_ASSETS.arrow.orangeFilled,
  },
} as const;

export function BrandArrow({
  className,
  variant = "black",
  filled = false,
}: BrandArrowProps) {
  const src = ARROW_PATHS[variant][filled ? "filled" : "outline"];

  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={128}
      height={128}
      className={cn("size-4 shrink-0", className)}
    />
  );
}
