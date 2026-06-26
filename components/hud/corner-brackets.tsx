import { cn } from "@/lib/utils";
import type { CornerBracketsProps } from "@/types/design-system";

export function CornerBrackets({
  className,
  accent = false,
  size = 12,
}: CornerBracketsProps) {
  const color = accent ? "var(--orange)" : "var(--border)";

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ color }}
    >
      <span
        className="absolute top-0 left-0 border-t border-l"
        style={{ width: size, height: size, borderColor: color }}
      />
      <span
        className="absolute top-0 right-0 border-t border-r"
        style={{ width: size, height: size, borderColor: color }}
      />
      <span
        className="absolute bottom-0 left-0 border-b border-l"
        style={{ width: size, height: size, borderColor: color }}
      />
      <span
        className="absolute bottom-0 right-0 border-b border-r"
        style={{ width: size, height: size, borderColor: color }}
      />
    </div>
  );
}
