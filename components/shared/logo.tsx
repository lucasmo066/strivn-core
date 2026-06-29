import Image from "next/image";

import { cn } from "@/lib/utils";
import type { LogoProps } from "@/types/design-system";

export function Logo({ className, variant = "lockup" }: LogoProps) {
  if (variant === "wordmark") {
    return (
      <span
        className={cn(
          "font-display text-lg font-bold tracking-tight text-foreground",
          className
        )}
      >
        strivn
      </span>
    );
  }

  return (
    <Image
      src="/assets/logos/strivn-logo-lockup.svg"
      alt="Strivn"
      width={120}
      height={32}
      priority
      className={cn("h-7 w-auto dark:invert", className)}
    />
  );
}
