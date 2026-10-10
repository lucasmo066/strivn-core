"use client";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/registry/magicui/grid-pattern";

export function GridPatternLinearGradient() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "text-border opacity-50 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
        )}
      />
    </div>
  );
}
