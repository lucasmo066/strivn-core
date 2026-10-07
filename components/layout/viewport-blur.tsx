"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import styles from "./viewport-blur.module.css";

/** Decorative viewport edge, below the header/dialog layer and never interactive. */
export function ViewportBlur() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || !("IntersectionObserver" in window)) return;

    const work = document.getElementById("work");
    const intersections = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => intersections.set(entry.target, entry.isIntersecting));
      setVisible(!Array.from(intersections.values()).some(Boolean));
    });
    observer.observe(footer);
    if (work) observer.observe(work);
    return () => observer.disconnect();
  }, [pathname]);

  return <div aria-hidden="true" className={styles.blur} data-visible={visible} />;
}
