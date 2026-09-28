import Link from "next/link";

import { BrandIcon } from "@/components/shared/brand-icon";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BRAND, LEGAL_LINKS, NAV_LINKS, TAGLINES } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-muted/40 text-foreground">
      <div className="h-1 bg-orange" aria-hidden />
      <Container className="py-14 md:py-18">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md space-y-5">
            <div className="flex items-center gap-4">
              <BrandIcon size="md" tone="black" className="dark:invert" />
              <Logo
                variant="wordmark"
                tone="black"
                className="h-8 w-auto dark:invert"
              />
            </div>
            <p className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-tight tracking-wide text-foreground">
              {TAGLINES.closing}
            </p>
            <div className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
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
            </div>
            <StrivnButton variant="primary" size="sm" arrow asChild>
              <Link href="/#contact">{TAGLINES.heroCta}</Link>
            </StrivnButton>
          </div>

          <nav className="flex max-w-sm flex-wrap gap-x-6 gap-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-hairline hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-hairline hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
