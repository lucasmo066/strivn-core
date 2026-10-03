"use client";

import Link from "next/link";

import { StrivnButton } from "@/components/shared/strivn-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS, TAGLINES } from "@/lib/constants";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[min(100%,18rem)] p-0">
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
                className="rounded-xl px-3 py-3 text-base font-medium text-muted-foreground transition-hairline hover:bg-card hover:text-foreground"
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
