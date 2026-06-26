import { cn } from "@/lib/utils";
import type { StatusChipProps } from "@/types/design-system";

const statusStyles = {
  active: "text-orange border-orange/30",
  idle: "text-muted-foreground border-border",
  ok: "text-[var(--status-ok)] border-[var(--status-ok)]/30",
  warn: "text-[var(--status-warn)] border-[var(--status-warn)]/30",
  danger: "text-[var(--status-danger)] border-[var(--status-danger)]/30",
} as const;

export function StatusChip({
  children,
  className,
  status = "active",
}: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-pixel text-[10px] uppercase tracking-wider",
        statusStyles[status],
        className
      )}
    >
      {children}
    </span>
  );
}
