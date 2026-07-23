import Image from "next/image";

import { BRAND_ASSETS } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";
import type { LogoProps } from "@/types/design-system";

const WORDMARK = {
  black: BRAND_ASSETS.wordmark.black,
  white: BRAND_ASSETS.wordmark.white,
} as const;

const LOCKUP = {
  black: BRAND_ASSETS.lockup.black,
  white: BRAND_ASSETS.lockup.white,
} as const;

export function Logo({
  className,
  variant = "lockup",
  tone = "black",
  priority = false,
}: LogoProps) {
  if (variant === "wordmark") {
    return (
      <Image
        src={WORDMARK[tone]}
        alt="strivn"
        width={415}
        height={195}
        priority={priority}
        className={cn("h-7 w-auto", className)}
      />
    );
  }

  return (
    <Image
      src={LOCKUP[tone]}
      alt="Strivn"
      width={549}
      height={218}
      priority={priority}
      className={cn("h-8 w-auto", className)}
    />
  );
}
