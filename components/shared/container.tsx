import { cn } from "@/lib/utils";
import type { ContainerProps } from "@/types/design-system";

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={cn("container-hairline", className)}>
      {children}
    </Component>
  );
}
