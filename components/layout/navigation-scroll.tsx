"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type NavigationIntent = {
  destination: URL;
  samePage: boolean;
};

/** Apply one scroll rule to internal links, including linked 3D buttons. */
export function NavigationScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const [intent, setIntent] = useState<NavigationIntent | null>(null);

  useEffect(() => {
    function captureLink(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute("download") || (link.target && link.target !== "_self") || link.closest('[aria-disabled="true"]')) return;
      const destination = new URL(link.href);
      if (destination.origin !== window.location.origin || !["http:", "https:"].includes(destination.protocol)) return;

      // Observe the click without cancelling it, so routing, menu closing, and
      // the brief touch feedback on hero buttons keep their normal behavior.
      setIntent({
        destination,
        samePage: destination.pathname === window.location.pathname && destination.search === window.location.search,
      });
    }

    const cancel = () => setIntent(null);
    const cancelForKey = (event: KeyboardEvent) => {
      if (["Tab", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) cancel();
    };
    // Capture above React's root so delayed touch links are recorded before
    // their press-feedback handler temporarily prevents the native click.
    window.addEventListener("click", captureLink, true);
    window.addEventListener("popstate", cancel);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("pointerdown", cancel, { passive: true });
    window.addEventListener("keydown", cancelForKey);
    return () => {
      window.removeEventListener("click", captureLink, true);
      window.removeEventListener("popstate", cancel);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("keydown", cancelForKey);
    };
  }, []);

  useEffect(() => {
    if (!intent || intent.destination.pathname !== pathname || intent.destination.searchParams.toString() !== search) return;

    let hash: string;
    try {
      hash = decodeURIComponent(intent.destination.hash.slice(1));
    } catch {
      return;
    }
    const toTop = !hash || hash.toLowerCase() === "top";
    let frame = 0;
    let settleTimer = 0;
    let disposed = false;
    let lastTop: number | undefined;
    let resizeObserver: ResizeObserver | undefined;
    const finish = () => setIntent((current) => current === intent ? null : current);
    const waitingTimer = window.setTimeout(finish, 5000);

    function align() {
      if (disposed) return;
      const target = toTop ? document.querySelector("main") : document.getElementById(hash);
      if (!target) return;
      const content = target.querySelector<HTMLElement>("[data-scroll-content]") ?? target;
      const headerBottom = document.querySelector("body > header")?.getBoundingClientRect().bottom ?? 64;
      const inset = Math.max(0, headerBottom) + 16;
      const available = Math.max(0, window.innerHeight - inset);
      const bounds = content.getBoundingClientRect();
      const top = toTop ? 0 : Math.max(0, window.scrollY + bounds.top - inset - Math.max(0, (available - bounds.height) / 2));
      const firstAlignment = lastTop === undefined;

      if (firstAlignment) {
        mutations.disconnect();
        clearTimeout(waitingTimer);
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        resizeObserver = new ResizeObserver(queueAlignment);
        resizeObserver.observe(document.body);
        resizeObserver.observe(content);
        // Allow fonts and newly mounted content to settle, then release control.
        settleTimer = window.setTimeout(finish, 1200);
      }
      if (lastTop === undefined || Math.abs(top - lastTop) > 1) {
        window.scrollTo({
          top,
          behavior: firstAlignment && intent?.samePage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant",
        });
        lastTop = top;
      }
    }

    function queueAlignment() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(align);
    }

    const mutations = new MutationObserver(queueAlignment);
    mutations.observe(document.body, { childList: true, subtree: true });
    // Wait for the new page and the header's layout to commit before scrolling.
    frame = requestAnimationFrame(queueAlignment);
    void document.fonts.ready.then(() => { if (!disposed) queueAlignment(); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(waitingTimer);
      clearTimeout(settleTimer);
      mutations.disconnect();
      resizeObserver?.disconnect();
    };
  }, [intent, pathname, search]);

  return null;
}
