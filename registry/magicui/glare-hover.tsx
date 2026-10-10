import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./glare-hover.module.css";

export function GlareHover({ children, className, duration = 600, revealDelay = 0, overlay = false }: {
  children?: ReactNode;
  className?: string;
  duration?: number;
  revealDelay?: number;
  overlay?: boolean;
}) {
  return (
    <div data-glare-host={overlay ? undefined : ""} className={cn(overlay ? styles.overlay : styles.surface, className)}
      style={{ "--glare-duration": `${duration}ms`, "--glare-delay": `${revealDelay}s` } as CSSProperties}>
      {children}
      <span aria-hidden="true" className={styles.reveal} />
      <span aria-hidden="true" className={styles.hover} />
    </div>
  );
}
