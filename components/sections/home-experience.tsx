import type { ReactNode } from "react";

import { HeroSection } from "@/components/sections/hero-section";

type HomeExperienceProps = {
  children: ReactNode;
};

/** Keeps the video enhancement independent from the rest of the page. */
export function HomeExperience({ children }: HomeExperienceProps) {
  return (
    <>
      <HeroSection />
      <div className="relative z-10 bg-background">{children}</div>
    </>
  );
}
