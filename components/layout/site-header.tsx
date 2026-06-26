import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { Container } from "@/components/shared/container";
import { NAV_LINKS, TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur-sm"
      )}
    >
      <Container className="flex h-14 items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Logo variant="wordmark" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-ui text-sm text-muted-foreground transition-hairline hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <StrivnButton variant="primary" size="sm" arrow>
          {TAGLINES.cta.split(".")[0]}.
        </StrivnButton>
      </Container>
    </header>
  );
}
