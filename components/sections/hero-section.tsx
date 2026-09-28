import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { HeroHeading } from "@/components/sections/hero-heading";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { HERO_MEDIA, TAGLINES } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-paper dark:bg-void">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src={HERO_MEDIA.still}
          alt=""
          fill
          priority
          quality={60}
          placeholder="blur"
          blurDataURL={HERO_MEDIA.blur}
          sizes="(min-width: 1920px) 1920px, 100vw"
          className="object-cover object-[62%_center]"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-r from-paper via-paper/90 via-42% to-paper/15 dark:from-void dark:via-void/90 dark:to-void/25"
      />

      <Container className="relative z-20 flex min-h-[calc(90dvh-4rem)] items-center py-10 sm:py-12 lg:min-h-[calc(100dvh-4rem)] lg:py-20">
        <div className="max-w-[39rem] space-y-5 text-left sm:space-y-6">
          <Logo
            variant="wordmark"
            tone="black"
            loading="eager"
            fetchPriority="low"
            className="h-9 w-auto dark:invert md:h-11 lg:h-12"
          />

          <HeroHeading>{TAGLINES.primary}</HeroHeading>

          <p className="max-w-md text-[1.0625rem] leading-relaxed text-ink/80 dark:text-white/75 md:text-lg">
            {TAGLINES.heroSub}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <StrivnButton
              variant="primary"
              arrow
              className="w-full px-7 shadow-soft sm:w-auto sm:min-w-[10.75rem]"
              asChild
            >
              <Link href="/#contact">{TAGLINES.heroCta}</Link>
            </StrivnButton>
            <StrivnButton
              variant="outline"
              className="w-full border-ink/20 bg-paper/85 px-7 shadow-soft backdrop-blur-sm dark:border-white/20 dark:bg-void/80 dark:text-white sm:w-auto sm:min-w-[10.75rem]"
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
