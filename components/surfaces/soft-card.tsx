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
        "relative rounded-2xl border-0 bg-card shadow-soft ring-0",
        lift &&
          "transition-lift hover:-translate-y-0.5 hover:shadow-soft-hover",
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
