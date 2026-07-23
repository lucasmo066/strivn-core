"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

import { HeroSection } from "@/components/sections/hero-section";

type HomeExperienceProps = {
  children: ReactNode;
};

/** Holds below-the-fold content until the hero plate is ready to show. */
export function HomeExperience({ children }: HomeExperienceProps) {
  const [ready, setReady] = useState(false);

  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    document.body.classList.add("hero-booting");
    if (ready) {
      document.body.classList.remove("hero-booting");
    }
    return () => {
      document.body.classList.remove("hero-booting");
    };
  }, [ready]);

  return (
    <>
      <HeroSection onReady={onReady} />
      {ready ? children : null}
    </>
  );
}
