import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { HeroHeading } from "@/components/sections/hero-heading";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { HERO_MEDIA, TAGLINES } from "@/lib/constants";

import styles from "./hero-section.module.css";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-dvh overflow-hidden bg-paper dark:bg-void">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src={HERO_MEDIA.still}
          alt=""
          fill
          priority
          quality={100}
          placeholder="blur"
          blurDataURL={HERO_MEDIA.blur}
          sizes="(min-width: 1920px) 1920px, 100vw"
          className="object-cover object-[62%_center]"
        />
      </div>

      <div aria-hidden className={`${styles.overlay} z-1`}>
        <div className={styles.shadow} />
        <div className={styles.stipple} />
      </div>

      <Container className="relative z-20 flex min-h-[90dvh] items-center pt-28 pb-10 sm:pt-32 sm:pb-12 lg:min-h-[100dvh] lg:pt-36 lg:pb-20">
        <div className="w-full max-w-[39rem] space-y-5 text-left sm:space-y-6 xl:max-w-[46rem] xl:space-y-7">
          <Logo
            variant="wordmark"
            tone="black"
            loading="eager"
            fetchPriority="low"
            className="h-14 w-auto dark:invert sm:h-16 md:h-20 lg:h-24"
          />

          <HeroHeading>{TAGLINES.primary}</HeroHeading>

          <p className="max-w-md text-[1.0625rem] font-medium leading-relaxed text-ink [text-shadow:0_0_16px_var(--paper),0_1px_0_var(--paper)] md:text-lg xl:max-w-lg xl:text-xl dark:text-white dark:[text-shadow:0_0_16px_var(--void),0_1px_0_var(--void)]">
            {TAGLINES.heroSub}
          </p>

          <div className="flex w-full flex-col items-center gap-5 pt-2 sm:flex-row sm:items-center sm:justify-start sm:gap-6">
            <StrivnButton
              variant="primary"
              arrow
              className="w-3/4 sm:w-auto sm:min-w-[10.75rem]"
              asChild
            >
              <Link href="/book">{TAGLINES.heroCta}</Link>
            </StrivnButton>
            <StrivnButton
              variant="outline"
              className="w-3/4 sm:w-auto sm:min-w-[10.75rem]"
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
