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
      <Container className="section-y">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <BrandIcon size="md" tone="white" />
              <Logo
                variant="wordmark"
                tone="white"
                className="h-8 w-auto"
              />
            </div>
            <p className="max-w-md font-display text-2xl font-semibold tracking-tight text-white">
              {TAGLINES.closing}
            </p>
            <div className="space-y-1 text-sm text-white/50">
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

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
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

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
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
