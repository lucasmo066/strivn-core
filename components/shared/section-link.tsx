"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/** Center the destination below the fixed header, even when it is already visible. */
export function SectionLink({ href, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link href={href} {...props} onClick={(event) => {
      props.onClick?.(event);
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (typeof href !== "string" || !href.startsWith("/#") || window.location.pathname !== "/") return;
      const section = document.getElementById(href.slice(2));
      if (!section) return;
      event.preventDefault();
      const content = section.querySelector("[data-scroll-content]") ?? section;
      const rect = content.getBoundingClientRect();
      const availableHeight = window.innerHeight - 80;
      const inset = 80 + Math.max(0, (availableHeight - rect.height) / 2);
      window.history.pushState(null, "", href);
      window.scrollTo({
        top: Math.max(0, window.scrollY + rect.top - inset),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
      section.focus({ preventScroll: true });
    }}>{children}</Link>
  );
}
