"use client";

import { useEffect, useState } from "react";

import styles from "./viewport-blur.module.css";

/** Decorative viewport edge, below the header/dialog layer and never interactive. */
export function ViewportBlur() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting);
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return <div aria-hidden="true" className={styles.blur} data-visible={visible} />;
}
