import type { ReactNode } from "react";

import Text3DFlip from "@/components/ui/text-3d-flip";

const headingClassName =
  "max-w-[20ch] font-pixel text-[clamp(2.125rem,5.4vw,2.95rem)] leading-[1.1] tracking-[0.015em] perspective-normal xl:text-[3.5rem]";

const faceClassName =
  "bg-gradient-to-r from-[#7a2606] via-[#9a340c] to-[#c44a10] bg-clip-text text-transparent dark:from-[#e85a12] dark:via-[#ff7428] dark:to-[#ff8a3d]";

export function HeroHeading({ children }: { children: ReactNode }) {
  return (
    <Text3DFlip
      as="h1"
      className={headingClassName}
      textClassName={faceClassName}
      flipTextClassName={faceClassName}
      rotateDirection="top"
      staggerDuration={0.03}
      spanGradient
      staggerFrom="first"
      transition={{ type: "spring", damping: 25, stiffness: 160 }}
      playDelay={1500}
    >
      {children}
    </Text3DFlip>
  );
}
