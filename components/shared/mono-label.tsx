import { cn } from "@/lib/utils";
import type { MonoLabelProps } from "@/types/design-system";

export function MonoLabel({ children, className }: MonoLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-micro text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
