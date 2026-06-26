import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CornerBrackets } from "@/components/hud/corner-brackets";
import { cn } from "@/lib/utils";
import type { HairlineCardProps } from "@/types/design-system";

export function HairlineCard({
  className,
  brackets = false,
  accentBrackets = false,
  children,
  ...props
}: HairlineCardProps) {
  return (
    <Card
      className={cn(
        "relative rounded-lg border border-border bg-card shadow-none ring-0 transition-hairline hover:border-[var(--line-strong)]",
        className
      )}
      {...props}
    >
      {brackets ? (
        <CornerBrackets accent={accentBrackets} />
      ) : null}
      {children}
    </Card>
  );
}

export {
  CardHeader as HairlineCardHeader,
  CardTitle as HairlineCardTitle,
  CardDescription as HairlineCardDescription,
  CardContent as HairlineCardContent,
  CardFooter as HairlineCardFooter,
};
