"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { HERO_MEDIA, TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const BOOT_TIMEOUT_MS = 8000;

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const markReady = useCallback(() => {
    setReady((prev) => {
      if (prev) return prev;
      return true;
    });
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      void video.play().catch(() => {
        /* Autoplay may be blocked; still reveal once buffered. */
      });
      markReady();
    };

    if (video.readyState >= 3) {
      tryPlay();
      return;
    }

    const onCanPlay = () => tryPlay();
    const onError = () => markReady();

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);

    const timeout = window.setTimeout(markReady, BOOT_TIMEOUT_MS);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
      window.clearTimeout(timeout);
    };
  }, [reduceMotion, markReady]);

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-start overflow-hidden bg-paper pt-24 md:pt-28 lg:pt-32">
        {/* Media plate — clipped to this section only */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <Image
            src={HERO_MEDIA.still}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {!reduceMotion ? (
            <video
              ref={videoRef}
              className={cn(
                "absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out",
                ready ? "opacity-100" : "opacity-0"
              )}
              src={HERO_MEDIA.video}
              poster={HERO_MEDIA.still}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
            />
          ) : null}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(90deg,rgba(250,249,247,0.68)_0%,rgba(250,249,247,0.28)_45%,rgba(250,249,247,0.05)_72%)]"
        />

        <Container
          className="relative z-20 w-full pb-16 md:pb-24"
        >
          <div className="max-w-xl space-y-6 text-left">
            <Logo
              variant="wordmark"
              tone="black"
              priority
              className="h-12 w-auto drop-shadow-[0_4px_18px_rgba(242,241,239,0.85)] md:h-16 lg:h-20"
            />

            <h1 className="max-w-[11ch] font-sans text-[var(--text-display)] font-semibold leading-[1.03] tracking-[-0.045em] text-orange">
              {TAGLINES.primary}
            </h1>

            <p className="max-w-md text-base leading-relaxed text-ink/80 md:text-lg">
              {TAGLINES.heroSub}
            </p>

            <div className="flex flex-col items-center gap-5 pt-2 sm:flex-row sm:items-center sm:justify-start sm:gap-4">
              <StrivnButton
                variant="primary"
                arrow
                className="min-w-[12.5rem] px-8"
                asChild
              >
                <Link href="/#contact">{TAGLINES.heroCta}</Link>
              </StrivnButton>
              <StrivnButton
                variant="outline"
                className="min-w-[12.5rem] border-ink/20 bg-paper/75 px-8 backdrop-blur-sm"
                asChild
              >
                <Link href="/#pricing">See pricing</Link>
              </StrivnButton>
            </div>
          </div>
        </Container>
    </section>
  );
}
