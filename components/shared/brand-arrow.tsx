import Image from "next/image";

import { cn } from "@/lib/utils";
import type { BrandArrowProps } from "@/types/design-system";

const ARROW_PATHS = {
  black: {
    outline: "/assets/icons/strivn_arrow_icon_black.svg",
    filled: "/assets/icons/strivn_arrow_icon_black_filled.svg",
  },
  white: {
    outline: "/assets/icons/strivn_arrow_icon_white.svg",
    filled: "/assets/icons/strivn_arrow_icon_white.svg",
  },
  orange: {
    outline: "/assets/icons/strivn_arrow_icon_orange.svg",
    filled: "/assets/icons/strivn_arrow_icon_orange_filled.svg",
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
      width={16}
      height={16}
      className={cn("size-4 shrink-0", className)}
    />
  );
}
