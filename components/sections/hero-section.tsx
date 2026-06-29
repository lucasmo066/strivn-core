import Link from "next/link";

import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BRAND, TAGLINES } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="section-y border-b border-border">
      <Container>
        <div className="mx-auto max-w-3xl space-y-8 text-center md:space-y-10 md:text-left">
          <MonoLabel className="inline-block">{BRAND.location}</MonoLabel>

          <h1 className="font-display text-[clamp(2.25rem,8vw,4rem)] leading-[1.05] font-bold tracking-tight bg-[linear-gradient(to_right,#ffb347,var(--orange),#ff3d00,var(--orange))] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
            {TAGLINES.primary}
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg">
            {TAGLINES.heroSub}
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <StrivnButton variant="primary" arrow className="w-full sm:w-auto">
              {TAGLINES.heroCta}
            </StrivnButton>
            <StrivnButton
              variant="outline"
              className="w-full sm:w-auto"
              asChild
            >
              <Link href="#work">View work</Link>
            </StrivnButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
