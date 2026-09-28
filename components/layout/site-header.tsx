"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState, type ComponentType } from "react";

import { BrandIcon } from "@/components/shared/brand-icon";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { Container } from "@/components/shared/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { NAV_LINKS, TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SiteHeader() {
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [MobileNav, setMobileNav] = useState<ComponentType<MobileNavProps> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY < 4);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    if (!query.matches) return;

    let cancelled = false;
    const load = () => {
      void import("./mobile-nav").then((mod) => {
        if (!cancelled) setMobileNav(() => mod.MobileNav);
      });
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 2500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  function loadMenu() {
    if (MobileNav) return;
    void import("./mobile-nav").then((mod) => {
      setMobileNav(() => mod.MobileNav);
    });
  }

  function openMenu() {
    if (MobileNav) {
      setMenuOpen(true);
      return;
    }

    void import("./mobile-nav").then((mod) => {
      setMobileNav(() => mod.MobileNav);
      setMenuOpen(true);
    });
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-md transition-shadow duration-200 ease-out dark:border-white/10 dark:bg-void/95",
          atTop ? "shadow-none" : "shadow-soft",
          menuOpen && "shadow-soft"
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 md:gap-6">
          <Link href="/" className="shrink-0" aria-label="Strivn home">
            <BrandIcon
              size="sm"
              loading="eager"
              fetchPriority="low"
              className="h-9 dark:invert md:hidden"
            />
            <Logo
              variant="lockup"
              tone="black"
              loading="eager"
              fetchPriority="low"
              className="hidden h-8 w-auto dark:invert md:block"
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

            <ThemeToggle />

            <button
              type="button"
              onPointerDown={loadMenu}
              onClick={openMenu}
              aria-expanded={menuOpen}
              aria-label="Open menu"
              className="inline-flex size-10 items-center justify-center rounded-xl text-foreground transition-hairline hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40 md:hidden"
            >
              <Menu className="size-5" />
            </button>
            {MobileNav ? (
              <MobileNav open={menuOpen} onOpenChange={setMenuOpen} />
            ) : null}
          </div>
        </Container>
      </header>
      <div className="h-16 shrink-0" aria-hidden="true" />
    </>
  );
}
