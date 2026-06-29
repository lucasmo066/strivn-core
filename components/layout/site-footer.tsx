import Link from "next/link";

import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { BRAND, NAV_LINKS, TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className={cn("void scanlines border-t border-[var(--line-dark)]")}>
      <Container className="section-y">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="font-display text-2xl font-semibold tracking-tight">
              {TAGLINES.closing}
            </p>
            <p className="font-ui text-sm text-muted-foreground">
              {BRAND.name} · {BRAND.location}
            </p>
            <StrivnButton variant="primary" size="sm" arrow className="mt-2">
              {TAGLINES.heroCta}
            </StrivnButton>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <MonoLabel>Explore</MonoLabel>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 font-ui text-sm">
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
        </div>
      </Container>
    </footer>
  );
}
