import Link from "next/link";

import { BrandIcon } from "@/components/shared/brand-icon";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BRAND, LEGAL_LINKS, NAV_LINKS, TAGLINES } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="void">
      <div className="h-1 bg-orange" aria-hidden />
      <Container className="py-14 md:py-18">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md space-y-5">
            <div className="flex items-center gap-4">
              <BrandIcon size="md" tone="white" />
              <Logo
                variant="wordmark"
                tone="white"
                className="h-8 w-auto"
              />
            </div>
            <p className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-tight tracking-wide text-white">
              {TAGLINES.closing}
            </p>
            <div className="space-y-1.5 text-sm leading-relaxed text-white/60">
              <p>
                {BRAND.name} / {BRAND.location}
              </p>
              <p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-hairline hover:text-white"
                >
                  {BRAND.email}
                </a>
                <span aria-hidden className="mx-2 text-white/25">
                  ·
                </span>
                <a
                  href={BRAND.phoneHref}
                  className="transition-hairline hover:text-white"
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
                className="text-white/50 transition-hairline hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-hairline hover:text-white"
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
