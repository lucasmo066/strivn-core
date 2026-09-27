"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandIcon } from "@/components/shared/brand-icon";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { Container } from "@/components/shared/container";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY < 4);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-md transition-shadow duration-200 ease-out",
          atTop ? "shadow-none" : "shadow-soft",
          menuOpen && "shadow-soft"
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 md:gap-6">
          <Link href="/" className="shrink-0" aria-label="Strivn home">
            <BrandIcon size="sm" className="h-9 md:hidden" />
            <Logo
              variant="lockup"
              tone="black"
              priority
              className="hidden h-8 w-auto md:block"
            />
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-medium text-muted-foreground md:flex">
            {NAV_LINKS.map((link, index) => (
              <span key={link.href} className="flex items-center">
                {index > 0 ? (
                  <span aria-hidden className="mx-1 text-border">
                    /
                  </span>
                ) : null}
                <Link
                  href={link.href}
                  className="rounded-xl px-2.5 py-1.5 transition-hairline hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <StrivnButton
              variant="primary"
              size="sm"
              arrow
              className="hidden sm:inline-flex"
              asChild
            >
              <Link href="/#contact">{TAGLINES.navCta}</Link>
            </StrivnButton>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                className="inline-flex size-10 items-center justify-center rounded-xl text-foreground transition-hairline hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </SheetTrigger>
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
                      <Link href="/#contact">{TAGLINES.navCta}</Link>
                    </StrivnButton>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </header>
      <div className="h-16 shrink-0" aria-hidden="true" />
    </>
  );
}
