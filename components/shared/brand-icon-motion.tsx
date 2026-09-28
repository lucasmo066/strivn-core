import type { ReactNode } from "react";

type BrandIconMotionProps = {
  children: ReactNode;
};

export function BrandIconMotion({ children }: BrandIconMotionProps) {
  return <div className="inline-flex">{children}</div>;
}
