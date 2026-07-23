"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BrandIcon } from "@/components/shared/brand-icon";
import { Logo } from "@/components/shared/logo";
import { StrivnButton } from "@/components/shared/strivn-button";
import { Container } from "@/components/shared/container";
import { NAV_LINKS, TAGLINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 4);

      if (y < 64) {
        setVisible(true);
      } else if (y > lastScrollY.current + 4) {
        setVisible(false);
      } else if (y < lastScrollY.current - 4) {
        setVisible(true);
      }

      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-paper/85 backdrop-blur-xl transition-[transform,box-shadow] duration-300 ease-out",
          atTop ? "shadow-soft" : "shadow-soft-hover",
          visible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <Container className="flex h-14 items-center justify-between gap-4 md:gap-6">
          <Link href="/" className="shrink-0" aria-label="Strivn home">
            <BrandIcon size="sm" className="md:hidden" />
            <Logo
              variant="lockup"
              tone="black"
              priority
              className="hidden h-7 w-auto md:block"
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
                  className="rounded-xl px-2.5 py-1.5 transition-hairline hover:bg-card hover:text-foreground"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          <StrivnButton variant="primary" size="sm" arrow asChild>
            <Link href="/#contact">{TAGLINES.navCta}</Link>
          </StrivnButton>
        </Container>
      </header>
      <div className="h-14 shrink-0" aria-hidden="true" />
    </>
  );
}
