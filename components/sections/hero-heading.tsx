import type { ReactNode } from "react";

import Text3DFlip from "@/components/ui/text-3d-flip";

const headingClassName =
  "max-w-[20ch] font-pixel text-[clamp(2.5rem,5.4vw,3.4rem)] leading-[1.1] tracking-[0.015em] perspective-normal xl:text-[4.0rem]";

const faceClassName =
  "bg-gradient-to-r from-[#ff7540] via-[#9f3400] to-[#752200] bg-clip-text text-transparent [filter:drop-shadow(0_0_16px_var(--paper))_drop-shadow(0_1px_1px_var(--paper))] dark:from-[#ff7540] dark:via-[#c24100] dark:to-[#f06b38] dark:[filter:drop-shadow(0_0_24px_var(--void))_drop-shadow(0_4px_4px_var(--void))]";

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
