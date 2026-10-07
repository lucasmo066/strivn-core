"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { StrivnButton } from "@/components/shared/strivn-button";
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
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-display tracking-wide">
            Menu
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => (
            <SheetClose key={link.href} asChild>
              <Link
                href={link.href}
                aria-current={isCurrentPage(pathname, link.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3 py-3 text-base font-medium text-muted-foreground transition-hairline hover:bg-card hover:text-foreground",
                  isCurrentPage(pathname, link.href) && "text-foreground"
                )}
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <StrivnButton
              variant="primary"
              arrow
              className="mt-3 w-full"
              asChild
            >
              <Link href="/book">{TAGLINES.navCta}</Link>
            </StrivnButton>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
