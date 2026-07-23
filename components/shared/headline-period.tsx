import { cn } from "@/lib/utils";

type HeadlinePeriodProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  /** Animated orange gradient fill (hero Aceternity-style). */
  gradient?: boolean;
};

/** Renders a headline and paints a trailing period orange (brand punctuation). */
export function HeadlinePeriod({
  children,
  className,
  as: Tag = "h1",
  gradient = false,
}: HeadlinePeriodProps) {
  const trimmed = children.trimEnd();
  const endsWithPeriod = trimmed.endsWith(".");
  const body = endsWithPeriod ? trimmed.slice(0, -1) : trimmed;

  return (
    <Tag
      className={cn(
        "font-display font-normal tracking-wide text-foreground",
        className
      )}
    >
      {gradient ? (
        <span className="animate-gradient bg-[linear-gradient(to_right,#ffb347,var(--orange),#ff3d00,var(--orange))] bg-size-[200%_auto] bg-clip-text text-transparent">
          {body}
        </span>
      ) : (
        body
      )}
      {endsWithPeriod ? <span className="text-orange">.</span> : null}
    </Tag>
  );
}
