import Link from "next/link";

import { BrandIcon } from "@/components/shared/brand-icon";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BRAND, NAV_LINKS, TAGLINES } from "@/lib/constants";

export function SiteFooter() {
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
            <p className="text-sm text-white/50">
              {BRAND.name} / {BRAND.location}
            </p>
            <StrivnButton variant="primary" size="sm" arrow asChild>
              <Link href="#contact">{TAGLINES.heroCta}</Link>
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
      </Container>
    </footer>
  );
}
