"use client";

import Image from "next/image";
import { Mountain } from "lucide-react";
import { useState } from "react";

import styles from "./services-bento.module.css";

type FrontRangeMediaProps = {
  src: string | null;
  alt: string;
  objectPosition?: string;
};

/**
 * Central services-bento image, not a WebGL/chromatic-rendering implementation.
 * Supply the finished Higgsfield still via SERVICES_MEDIA in lib/constants.ts.
 * Ideal source: 4:5 portrait, 1200 x 1500 WebP or AVIF. Desktop shows 4:5;
 * tablet/mobile crop to 16:9. Keep the focal subject within the central 50%.
 * The reserved geometry is shared by the placeholder, loading, and error states.
 */
export function FrontRangeMedia({
  src,
  alt,
  objectPosition = "50% 50%",
}: FrontRangeMediaProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src && src !== failedSrc);

  return (
    <div className={styles.media}>
      {showImage && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1152px) 390px, (min-width: 1024px) 36vw, (min-width: 768px) 88vw, calc(100vw - 56px)"
          className="object-cover"
          style={{ objectPosition }}
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label="Front Range image placeholder">
          <Mountain className="size-10" strokeWidth={1} aria-hidden />
          <p className="mt-4 text-sm font-medium">Front Range visual</p>
          <p className="mt-1 text-xs text-muted-foreground">Image coming soon</p>
        </div>
      )}
    </div>
  );
}
