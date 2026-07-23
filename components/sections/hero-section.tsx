import Link from "next/link";

import { BrandIcon } from "@/components/shared/brand-icon";
import { BrandIconMotion } from "@/components/shared/brand-icon-motion";
import { Container } from "@/components/shared/container";
import { HeadlinePeriod } from "@/components/shared/headline-period";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { TAGLINES } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_auto] lg:gap-20">
          <div className="max-w-2xl space-y-6 text-center md:text-left">
            <Logo
              variant="wordmark"
              tone="black"
              priority
              className="mx-auto h-12 w-auto md:mx-0 md:h-16 lg:h-20"
            />

            <HeadlinePeriod className="text-[clamp(1.75rem,4.2vw,2.75rem)] font-semibold leading-[1.1]">
              {TAGLINES.primary}
            </HeadlinePeriod>

            <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg">
              {TAGLINES.heroSub}
            </p>

            <div className="flex flex-col justify-center gap-3 pt-1 sm:flex-row md:justify-start">
              <StrivnButton
                variant="primary"
                arrow
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/#contact">{TAGLINES.heroCta}</Link>
              </StrivnButton>
              <StrivnButton
                variant="outline"
                className="w-full border-ink/12 bg-card sm:w-auto"
                asChild
              >
                <Link href="/#pricing">See pricing</Link>
              </StrivnButton>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <BrandIconMotion>
              <BrandIcon size="xl" tone="black" priority />
            </BrandIconMotion>
          </div>
        </div>
      </Container>
    </section>
  );
}
