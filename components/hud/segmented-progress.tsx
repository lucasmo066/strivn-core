import { cn } from "@/lib/utils";
import type { SegmentedProgressProps } from "@/types/design-system";

export function SegmentedProgress({
  total,
  value,
  className,
}: SegmentedProgressProps) {
  const segments = Array.from({ length: total }, (_, index) => index < value);

  return (
    <div
      className={cn("flex gap-1", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      {segments.map((filled, index) => (
        <span
          key={index}
          className={cn(
            "h-1.5 w-6 font-pixel text-[8px] leading-none",
            filled ? "bg-orange" : "bg-border"
          )}
        />
      ))}
    </div>
  );
}
