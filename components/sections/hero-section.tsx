import Image from "next/image";
import Link from "next/link";

import { HeroHudOverlay } from "@/components/sections/hero-hud-plate";
import { Container } from "@/components/shared/container";
import { HeadlinePeriod } from "@/components/shared/headline-period";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { HERO_MEDIA, TAGLINES } from "@/lib/constants";

const copyShadow =
  "[text-shadow:0_1px_2px_rgba(242,241,239,0.95),0_6px_28px_rgba(242,241,239,0.7)]";

export function HeroSection() {
  return (
    <section className="relative flex min-h-svh flex-col justify-start overflow-hidden pt-24 md:pt-28 lg:pt-32">
      {/* Plate — full bleed */}
      <Image
        src={HERO_MEDIA.still}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover"
      />

      {/* Swap in when video lands:
      <video
        src="/assets/hero/alpine-lakeside.mp4"
        poster={HERO_MEDIA.still}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 z-0 size-full object-cover"
      />
      */}

      {/* Soft wash behind top-left copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_15%_20%,color-mix(in_srgb,var(--paper)_60%,transparent)_0%,transparent_55%)]"
      />

      {/* Middle: pixel HUD */}
      <HeroHudOverlay />

      {/* Top-left copy */}
      <Container className="relative z-20 w-full pb-16 md:pb-24">
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
  );
}
