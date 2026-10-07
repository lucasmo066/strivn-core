import Link from "next/link";

import { BrandIcon } from "@/components/shared/brand-icon";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { SectionLink } from "@/components/shared/section-link";
import { ScrollGlass } from "@/components/shared/scroll-glass";
import { BlurFade } from "@/components/ui/blur-fade";
import { BRAND, FOOTER_LINK_GROUPS, LEGAL_LINKS, TAGLINES } from "@/lib/constants";

// A full viewport margin lets the final legal links reveal at the page bottom.
const footerReveal = {
  inViewMargin: "0px",
  inViewAmount: 0.4,
  duration: 0.9,
} as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <ScrollGlass as="footer" atBottom id="site-footer" className="bg-muted/40 text-foreground">
      <div className="h-1 bg-orange" aria-hidden />
      <Container className="py-14 md:py-18">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md space-y-5">
            <BlurFade {...footerReveal}>
              <Link scroll={false} href="/" aria-label="Strivn home" className="inline-flex items-center gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange">
                <BrandIcon size="md" tone="black" className="dark:invert" />
                <Logo
                  variant="wordmark"
                  tone="black"
                  className="h-8 w-auto dark:invert"
                />
              </Link>
            </BlurFade>
            <BlurFade {...footerReveal} delay={0.06}>
              <p className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-tight tracking-wide text-foreground">
                {TAGLINES.closing}
              </p>
            </BlurFade>
            <BlurFade {...footerReveal} delay={0.12} className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
              <p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-hairline hover:text-foreground"
                >
                  {BRAND.email}
                </a>
              </p>
            </BlurFade>
            <BlurFade {...footerReveal} delay={0.18}>
              <StrivnButton variant="primary" size="sm" arrow asChild>
                <Link scroll={false} href="/book">{TAGLINES.heroCta}</Link>
              </StrivnButton>
            </BlurFade>
          </div>

          <div className="grid grid-cols-2 gap-x-6 text-sm md:shrink-0 md:gap-x-10 lg:gap-x-16">
            {FOOTER_LINK_GROUPS.map((group) => (
              <nav key={group.label} aria-label={`Footer ${group.label.toLowerCase()}`}>
                <BlurFade {...footerReveal}>
                  <h2 className="mb-3 font-pixel text-xs text-orange">{group.label}</h2>
                </BlurFade>
                <ul>
                  {group.links.map((link, index) => (
                    <BlurFade as="li" key={link.href} {...footerReveal} delay={0.06 + index * 0.06}>
                      <SectionLink
                        href={link.href}
                        className="inline-flex min-h-11 items-center rounded-sm text-muted-foreground transition-hairline hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange md:min-h-9"
                      >
                        {link.label}
                      </SectionLink>
                    </BlurFade>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <BlurFade {...footerReveal}>
            <p>© {year} {BRAND.name}. All rights reserved.</p>
          </BlurFade>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link, index) => (
              <BlurFade key={link.href} {...footerReveal} delay={0.06 + index * 0.06}>
                <Link
                  scroll={false}
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
    </ScrollGlass>
  );
}
