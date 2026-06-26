import Link from "next/link";

import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StatusChip } from "@/components/hud/status-chip";
import { BRAND, TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className={cn("void scanlines border-t border-[var(--line-dark)]")}>
      <Container className="section-y">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <StatusChip status="active">[ ONLINE ]</StatusChip>
            <p className="font-display text-2xl font-semibold tracking-tight">
              {TAGLINES.closing}
            </p>
            <p className="font-ui text-sm text-muted-foreground">
              {BRAND.name} · {BRAND.location}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <MonoLabel>Command bar</MonoLabel>
            <div className="flex flex-wrap gap-4 font-ui text-sm">
              <Link
                href="#contact"
                className="text-muted-foreground transition-hairline hover:text-foreground"
              >
                Contact
              </Link>
              <Link
                href="#pricing"
                className="text-muted-foreground transition-hairline hover:text-foreground"
              >
                Pricing
              </Link>
              <Link
                href="#work"
                className="text-muted-foreground transition-hairline hover:text-foreground"
              >
                Work
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
