"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { preload } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import { HeroHudOverlay } from "@/components/sections/hero-hud-plate";
import { Container } from "@/components/shared/container";
import { HeadlinePeriod } from "@/components/shared/headline-period";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { HERO_MEDIA, TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const copyShadow =
  "[text-shadow:0_1px_2px_rgba(242,241,239,0.95),0_6px_28px_rgba(242,241,239,0.7)]";

const BOOT_TIMEOUT_MS = 8000;

type HeroSectionProps = {
  onReady?: () => void;
};

export function HeroSection({ onReady }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const revealed = ready || !!reduceMotion;

  preload(HERO_MEDIA.video, { as: "video" });

  const markReady = useCallback(() => {
    setReady((prev) => {
      if (prev) return prev;
      return true;
    });
  }, []);

  useEffect(() => {
    if (revealed) onReady?.();
  }, [revealed, onReady]);

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
    <>
      {/* Boot cover — holds the site until the plate is ready */}
      <div
        aria-hidden={revealed}
        className={cn(
          "fixed inset-0 z-100 bg-paper transition-opacity duration-500 ease-out",
          revealed ? "pointer-events-none opacity-0" : "opacity-100"
        )}
      >
        <Image
          src={HERO_MEDIA.still}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <section className="relative flex min-h-svh flex-col justify-start overflow-hidden pt-24 md:pt-28 lg:pt-32">
        {/* Still under video — paints immediately, covers gaps */}
        <Image
          src={HERO_MEDIA.still}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover"
        />

        {!reduceMotion ? (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 z-0 size-full object-cover transition-opacity duration-700 ease-out",
              ready ? "opacity-100" : "opacity-0"
            )}
            src={HERO_MEDIA.video}
            poster={HERO_MEDIA.still}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden
          />
        ) : null}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_15%_20%,color-mix(in_srgb,var(--paper)_60%,transparent)_0%,transparent_55%)]"
        />

        {revealed ? <HeroHudOverlay /> : null}

        <Container
          className={cn(
            "relative z-20 w-full pb-16 transition-opacity duration-500 md:pb-24",
            revealed ? "opacity-100" : "opacity-0"
          )}
        >
          <div className={`max-w-xl space-y-6 text-left ${copyShadow}`}>
            <Logo
              variant="wordmark"
              tone="black"
              priority
              className="h-12 w-auto drop-shadow-[0_4px_18px_rgba(242,241,239,0.85)] md:h-16 lg:h-20"
            />

            <HeadlinePeriod
              gradient
              className="text-[clamp(2.25rem,8vw,4rem)] leading-[1.05] tracking-tight drop-shadow-[0_2px_14px_rgba(242,241,239,0.9)]"
            >
              {TAGLINES.primary}
            </HeadlinePeriod>

            <p className="max-w-md text-base leading-relaxed text-ink/80 md:text-lg">
              {TAGLINES.heroSub}
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
              <StrivnButton
                variant="primary"
                arrow
                className="w-full shadow-soft sm:w-auto"
                asChild
              >
                <Link href="/#contact">{TAGLINES.heroCta}</Link>
              </StrivnButton>
              <StrivnButton
                variant="outline"
                className="w-full border-ink/15 bg-paper/75 shadow-soft backdrop-blur-sm sm:w-auto"
                asChild
              >
                <Link href="/#pricing">See pricing</Link>
              </StrivnButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
