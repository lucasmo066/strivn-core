"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/** Section positioning is coordinated by NavigationScroll after navigation. */
export function SectionLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} scroll={false} />;
}
