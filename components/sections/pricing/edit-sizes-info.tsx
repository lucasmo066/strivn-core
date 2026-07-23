"use client";

import { CircleHelp } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EDIT_SIZES, PRICING_COPY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const TAG_STYLES = {
  small: "text-emerald-800",
  medium: "text-amber-800",
  large: "text-rose-800",
} as const;

export function EditSizesInfo() {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "inline-flex items-center gap-1.5 text-sm text-muted-foreground",
          "transition-hairline hover:text-foreground",
          "underline decoration-border underline-offset-4 hover:decoration-foreground/40"
        )}
      >
        <CircleHelp className="size-3.5" aria-hidden />
        What counts as an edit?
      </DialogTrigger>

      <DialogContent className="max-h-[min(85vh,32rem)] gap-0 overflow-y-auto p-0 sm:max-w-md">
        <DialogHeader className="gap-1.5 border-b border-border px-5 py-4 pr-12">
          <DialogTitle className="font-display text-lg tracking-wide">
            What counts as an edit
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {PRICING_COPY.editSub}
          </DialogDescription>
        </DialogHeader>

        <ul className="divide-y divide-border">
          {EDIT_SIZES.map((size) => (
            <li key={size.name} className="space-y-1.5 px-5 py-4">
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={cn(
                    "font-mono text-[10px] font-semibold tracking-wider uppercase",
                    TAG_STYLES[size.tag]
                  )}
                >
                  {size.name}
                </span>
                <span className="shrink-0 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                  {size.time}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {size.definition}
              </p>
              <p className="text-xs text-foreground/80">{size.billing}</p>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
