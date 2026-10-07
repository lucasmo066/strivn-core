import Link from "next/link";

import { BrandIcon } from "@/components/shared/brand-icon";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { ScrollGlass } from "@/components/shared/scroll-glass";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BlurFade } from "@/components/ui/blur-fade";
import { BRAND, LEGAL_LINKS, NAV_LINKS, TAGLINES } from "@/lib/constants";

// A full viewport margin lets the final legal links reveal at the page bottom.
const footerReveal = {
  inViewMargin: "0px",
  inViewAmount: 0.4,
  duration: 0.9,
} as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <ScrollGlass as="footer" atBottom id="site-footer" className="footer-glass relative overflow-hidden bg-muted/40 text-foreground">
      <BackgroundBeams className="footer-beams" />
      <div className="relative z-10">
      <div className="h-1 bg-orange" aria-hidden />
      <Container className="py-14 md:py-18">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md space-y-5">
            <BlurFade {...footerReveal} className="flex items-center gap-4">
              <BrandIcon size="md" tone="black" className="dark:invert" />
              <Logo
                variant="wordmark"
                tone="black"
                className="h-8 w-auto dark:invert"
              />
            </BlurFade>
            <BlurFade {...footerReveal} delay={0.06}>
              <p className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-tight tracking-wide text-foreground">
                {TAGLINES.closing}
              </p>
            </BlurFade>
            <BlurFade {...footerReveal} delay={0.12} className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
              <p>
                {BRAND.name} / {BRAND.location}
              </p>
              <p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-hairline hover:text-foreground"
                >
                  {BRAND.email}
                </a>
                <span aria-hidden className="mx-2 text-muted-foreground">
                  ·
                </span>
                <a
                  href={BRAND.phoneHref}
                  className="transition-hairline hover:text-foreground"
                >
                  {BRAND.phone}
                </a>
              </p>
            </BlurFade>
            <BlurFade {...footerReveal} delay={0.18}>
              <StrivnButton variant="primary" size="sm" arrow asChild>
                <Link href="/book">{TAGLINES.heroCta}</Link>
              </StrivnButton>
            </BlurFade>
          </div>

          <nav className="flex max-w-sm flex-wrap gap-x-6 gap-y-3 text-sm">
            {NAV_LINKS.map((link, index) => (
              <BlurFade key={link.href} {...footerReveal} delay={index * 0.06}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition-hairline hover:text-foreground"
                >
                  {link.label}
                </Link>
              </BlurFade>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <BlurFade {...footerReveal}>
            <p>© {year} {BRAND.name}. All rights reserved.</p>
          </BlurFade>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link, index) => (
              <BlurFade key={link.href} {...footerReveal} delay={0.06 + index * 0.06}>
                <Link
                  href={link.href}
                  className="transition-hairline hover:text-foreground"
                >
                  {link.label}
                </Link>
              </BlurFade>
            ))}
          </nav>
        </div>
      </Container>
      </div>
    </ScrollGlass>
  );
}
