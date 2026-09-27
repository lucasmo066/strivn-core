import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { HERO_MEDIA, TAGLINES } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src={HERO_MEDIA.still}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-r from-paper via-paper/90 via-42% to-paper/15"
      />

      <Container className="relative z-20 flex min-h-[calc(100dvh-4rem)] items-center py-14 sm:py-16 lg:py-20">
        <div className="max-w-[39rem] space-y-6 text-left">
          <Logo
            variant="wordmark"
            tone="black"
            priority
            className="h-8 w-auto md:h-10"
          />

          <h1 className="max-w-[12.75em] font-sans text-[clamp(2.125rem,4.3vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-foreground">
            {TAGLINES.primary}
          </h1>

          <p className="max-w-md text-base leading-relaxed text-ink/80 md:text-lg">
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
              className="w-full border-ink/20 bg-paper/85 px-7 shadow-soft backdrop-blur-sm sm:w-auto sm:min-w-[10.75rem]"
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
