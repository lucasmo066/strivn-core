import Image from "next/image";

import { BRAND_ASSETS } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

type BrandIconProps = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "black" | "white";
  priority?: boolean;
};

const sizeClass = {
  sm: "h-8 w-auto",
  md: "h-12 w-auto",
  lg: "h-40 w-auto md:h-52",
  xl: "h-48 w-auto md:h-64",
} as const;

/** Official cube mark from the Strivn brand asset pack. */
export function BrandIcon({
  className,
  size = "lg",
  tone = "black",
  priority = false,
}: BrandIconProps) {
  const src =
    tone === "white" ? BRAND_ASSETS.cube.white : BRAND_ASSETS.cube.black;

  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={187}
      height={208}
      priority={priority}
      className={cn(sizeClass[size], className)}
    />
  );
}
