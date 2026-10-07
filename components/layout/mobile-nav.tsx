"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { StrivnButton } from "@/components/shared/strivn-button";
import { SectionLink } from "@/components/shared/section-link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS, TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function isCurrentPage(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return href === pathname || pathname.startsWith(`${href}/`);
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="nav-glass w-[min(100%,18rem)] p-0" aria-describedby={undefined}>
        <SheetHeader className="shrink-0 border-b border-border">
          <SheetTitle className="font-display tracking-wide">
            Menu
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex flex-col gap-1">
            {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link) => (
              <SheetClose key={link.href} asChild>
                <SectionLink
                  href={link.href}
                  aria-current={isCurrentPage(pathname, link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-3 text-base font-medium text-muted-foreground transition-hairline hover:bg-card hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange",
                    isCurrentPage(pathname, link.href) && "text-foreground"
                  )}
                >
                  {link.label}
                </SectionLink>
              </SheetClose>
            ))}
          </div>
          <div className="mt-4 flex shrink-0 flex-col gap-3 border-t border-border pt-5 pb-2">
            <StrivnButton
              variant="primary"
              arrow
              className="w-full"
              aria-current={pathname === "/book" ? "page" : undefined}
              onClick={() => onOpenChange(false)}
              asChild
            >
              <Link scroll={false} href="/book">{TAGLINES.navCta}</Link>
            </StrivnButton>
            <StrivnButton variant="outline" className="w-full" aria-current={pathname === "/start" ? "page" : undefined} onClick={() => onOpenChange(false)} asChild>
              <Link scroll={false} href="/start">Choose a package</Link>
            </StrivnButton>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
