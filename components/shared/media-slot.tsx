import { ImagePlus } from "lucide-react";

import { cn } from "@/lib/utils";

type MediaSlotProps = {
  alt: string;
  className?: string;
  label: string;
};

/**
 * TODO: Replace with an approved case-study photo or screenshot.
 *
 * This deliberately stays an honest media slot instead of imitating product UI.
 * Keep the 4:3 crop when replacing it so work cards retain their rhythm.
 */
export function MediaSlot({ alt, className, label }: MediaSlotProps) {
  return (
    <figure
      aria-label={`${alt}. Image placeholder.`}
      className={cn(
        "relative grid aspect-4/3 place-items-center overflow-hidden rounded-xl border border-border bg-muted/70 p-5 text-center",
        className
      )}
    >
      <div className="space-y-3">
        <ImagePlus className="mx-auto size-6 text-orange" aria-hidden />
        <figcaption className="text-xs font-medium text-foreground">
          {label}
        </figcaption>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Add approved 4:3 media here
        </p>
      </div>
    </figure>
  );
}
