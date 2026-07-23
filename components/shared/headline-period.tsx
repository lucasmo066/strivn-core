import { cn } from "@/lib/utils";

type HeadlinePeriodProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "p";
};

/** Renders a headline and paints a trailing period orange (brand punctuation). */
export function HeadlinePeriod({
  children,
  className,
  as: Tag = "h1",
}: HeadlinePeriodProps) {
  const trimmed = children.trimEnd();
  const endsWithPeriod = trimmed.endsWith(".");
  const body = endsWithPeriod ? trimmed.slice(0, -1) : trimmed;

  return (
    <Tag
      className={cn(
        "font-display font-bold tracking-tight text-foreground",
        className
      )}
    >
      {body}
      {endsWithPeriod ? <span className="text-orange">.</span> : null}
    </Tag>
  );
}
