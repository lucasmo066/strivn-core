"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BrandArrow } from "@/components/shared/brand-arrow";
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
          "fixed inset-x-0 top-0 z-50 border-b border-border bg-paper/92 backdrop-blur-md transition-[transform,box-shadow] duration-300 ease-out",
          atTop
            ? "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
            : "shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)]",
          visible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <Container className="flex h-14 items-center justify-between gap-4 md:gap-6">
          <Link href="/" className="shrink-0" aria-label="Strivn home">
            <BrandArrow
              variant="orange"
              filled
              className="size-7 md:hidden"
            />
            <Logo
              variant="wordmark"
              className="hidden text-xl font-bold md:inline"
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-ui text-sm font-semibold text-muted-foreground transition-hairline hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <StrivnButton
            variant="primary"
            size="sm"
            arrow
            className="font-bold md:font-semibold"
          >
            {TAGLINES.navCta}
          </StrivnButton>
        </Container>
      </header>
      <div className="h-14 shrink-0" aria-hidden="true" />
    </>
  );
}
