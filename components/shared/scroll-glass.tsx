"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function ScrollGlass({ children, className, as: Tag = "div", atBottom = false, id }: {
  children: ReactNode;
  className?: string;
  as?: "div" | "footer";
  atBottom?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (atBottom) {
        setActive(rect.bottom <= viewport + 2 && rect.bottom > 0);
      } else {
        const visible = Math.max(0, Math.min(rect.bottom, viewport) - Math.max(rect.top, 72));
        // Tall mobile forms qualify once they fill the available viewport.
        const fullyPresented = visible >= Math.min(rect.height, viewport - 72) - 4;
        setActive((previous) => fullyPresented || (previous && visible > 0));
      }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(queue);
    observer.observe(element);
    observer.observe(document.body);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    queue();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [atBottom, pathname]);

  return <Tag ref={(element) => { ref.current = element; }} id={id} data-glass={active} className={cn("scroll-glass", className)}>{children}</Tag>;
}
