import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SoftCardProps } from "@/types/design-system";

export function SoftCard({
  className,
  accent = false,
  lift = true,
  children,
  ...props
}: SoftCardProps) {
  return (
    <Card
      className={cn(
        "relative rounded-[var(--radius-button)] border border-border bg-transparent shadow-none ring-0",
        lift &&
          "transition-lift hover:border-[var(--line-strong)] hover:bg-white/35 hover:shadow-soft-hover",
        className
      )}
      {...props}
    >
      {accent ? (
        <span
          aria-hidden
          className="absolute inset-y-4 left-0 w-1 rounded-full bg-orange"
        />
      ) : null}
      {children}
    </Card>
  );
}

export {
  CardHeader as SoftCardHeader,
  CardTitle as SoftCardTitle,
  CardDescription as SoftCardDescription,
  CardContent as SoftCardContent,
  CardFooter as SoftCardFooter,
};
