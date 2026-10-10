import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import styles from "./shine-border.module.css";

export function ShineBorder({ shineColor = "var(--orange)", duration = 14, borderWidth = 1, className, style }: {
  shineColor?: string | string[];
  duration?: number;
  borderWidth?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const colors = Array.isArray(shineColor) ? shineColor.join(", ") : shineColor;
  return <span aria-hidden="true" className={cn(styles.shine, className)} style={{
    "--shine-duration": `${duration}s`,
    padding: borderWidth,
    backgroundImage: `radial-gradient(transparent, transparent, ${colors}, transparent, transparent)`,
    ...style,
  } as CSSProperties} />;
}
