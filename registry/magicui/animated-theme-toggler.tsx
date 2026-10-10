"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";

const themeStorageKey = "strivn-theme";

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
}

export function AnimatedThemeToggler({ className, duration = 400 }: { className?: string; duration?: number }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitioning = useRef(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const shouldUseDark = document.documentElement.classList.contains("dark");

    const frame = window.requestAnimationFrame(() => {
      setIsDark(shouldUseDark);
      applyTheme(shouldUseDark);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  async function toggleTheme() {
    if (transitioning.current) return;
    const nextTheme = !document.documentElement.classList.contains("dark");
    const update = () => {
      flushSync(() => setIsDark(nextTheme));
      applyTheme(nextTheme);
      try { window.localStorage.setItem(themeStorageKey, nextTheme ? "dark" : "light"); } catch { /* Theme still works when storage is unavailable. */ }
    };
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      update();
      return;
    }
    const bounds = buttonRef.current?.getBoundingClientRect();
    if (!bounds) { update(); return; }
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    transitioning.current = true;
    document.documentElement.classList.add("theme-transition");
    try {
      const transition = document.startViewTransition(update);
      // Both promises may reject when another transition interrupts this one.
      const finished = transition.finished.catch(() => undefined);
      try {
        await transition.ready;
        document.documentElement.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] }, {
          duration, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)",
        });
      } catch { /* The theme update remains applied if the reveal is skipped. */ }
      await finished;
    } finally {
      document.documentElement.classList.remove("theme-transition");
      transitioning.current = false;
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn("inline-flex size-10 items-center justify-center rounded-[var(--radius-button)] border border-transparent text-foreground transition-hairline hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40", className)}
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden />
      ) : (
        <Moon className="size-4" aria-hidden />
      )}
      <span className="sr-only">
        {isDark ? "Dark theme active" : "Light theme active"}
      </span>
    </button>
  );
}
