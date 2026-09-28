"use client";

import Image from "next/image";
import { useState } from "react";

import { MediaSlot } from "@/components/shared/media-slot";
import type { WorkMedia } from "@/lib/constants";

import styles from "./work-carousel.module.css";

/**
 * Replace this image layer when an approved ChromaticImage implementation is
 * available. Keep the reserved geometry and missing-image fallback intact.
 */
export function ProjectMedia({
  title,
  media,
}: {
  title: string;
  media: WorkMedia | null;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  return (
    <div className={styles.media}>
      {media && media.src !== failedSrc ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 1152px) 480px, (min-width: 1024px) 44vw, (min-width: 640px) 72vw, calc(100vw - 76px)"
          className={styles.image}
          style={{ objectPosition: media.objectPosition ?? "50% 50%" }}
          onError={() => setFailedSrc(media.src)}
        />
      ) : (
        <MediaSlot
          alt={`${title} preview`}
          label={`${title} preview`}
          description="Project imagery coming soon"
          className="h-full w-full rounded-none border-0 bg-transparent"
        />
      )}
    </div>
  );
}
