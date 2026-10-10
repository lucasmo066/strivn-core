"use client";

import { useId, type SVGProps } from "react";

import { cn } from "@/lib/utils";

type GridPatternProps = SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
};

export function GridPattern({
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  className,
  ...props
}: GridPatternProps) {
  const patternId = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full stroke-current", className)}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} stroke="none" />
    </svg>
  );
}
