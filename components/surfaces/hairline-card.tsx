import {
  SoftCard,
  SoftCardContent,
  SoftCardDescription,
  SoftCardFooter,
  SoftCardHeader,
  SoftCardTitle,
} from "@/components/surfaces/soft-card";
import type { HairlineCardProps } from "@/types/design-system";

/** @deprecated Prefer SoftCard. Kept as a thin alias for older imports. */
export function HairlineCard({
  brackets: _brackets,
  accentBrackets,
  ...props
}: HairlineCardProps) {
  return <SoftCard accent={accentBrackets} {...props} />;
}

export {
  SoftCardHeader as HairlineCardHeader,
  SoftCardTitle as HairlineCardTitle,
  SoftCardDescription as HairlineCardDescription,
  SoftCardContent as HairlineCardContent,
  SoftCardFooter as HairlineCardFooter,
};
