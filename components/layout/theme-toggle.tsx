"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const themeStorageKey = "strivn-theme";

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    const shouldUseDark =
      savedTheme === "dark" ||
      (savedTheme === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    const frame = window.requestAnimationFrame(() => {
      setIsDark(shouldUseDark);
      applyTheme(shouldUseDark);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(themeStorageKey, nextTheme ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex size-10 items-center justify-center rounded-[var(--radius-button)] border border-transparent text-foreground transition-hairline hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40"
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
