"use client";

import { ChromaticImage } from "@/components/ui/chromatic-image";
import { useState } from "react";

import { MediaSlot } from "@/components/shared/media-slot";
import type { WorkMedia } from "@/lib/constants";

import styles from "./work-carousel.module.css";

/** Shared Aceternity treatment with the reserved media geometry and fallback. */
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
        <ChromaticImage
          src={media.src}
          alt={media.alt}
          sizes="(min-width: 1152px) 480px, (min-width: 1024px) 44vw, (min-width: 640px) 72vw, calc(100vw - 76px)"
          className="h-full w-full"
          objectPosition={media.objectPosition ?? "50% 50%"}
          zoom={0.12}
          displacement={0.032}
          chromaticShift={0.008}
          tilt={0.16}
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
