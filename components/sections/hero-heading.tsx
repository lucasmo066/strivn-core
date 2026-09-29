import type { ReactNode } from "react";

const headingClassName =
  "max-w-[20ch] font-pixel text-[clamp(2.125rem,5.4vw,2.95rem)] leading-[1.1] tracking-[0.015em] xl:text-[3.5rem]";

export function HeroHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className={headingClassName}>
      <span className="bg-gradient-to-r from-[#b93a00] via-[#df5107] to-[#ed6b28] bg-clip-text text-transparent dark:from-[#ffbf9f] dark:via-[#ff914f] dark:to-[#ff7227]">
        {children}
      </span>
    </h1>
  );
}
