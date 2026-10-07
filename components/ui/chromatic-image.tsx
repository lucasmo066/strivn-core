"use client";

// Adapted from Aceternity UI's official chromatic-image registry component.
// https://ui.aceternity.com/components/chromatic-image
import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type ChromaticImageProps = {
  src: string;
  alt: string;
  children?: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  zoom?: number;
  displacement?: number;
  chromaticShift?: number;
  tilt?: number;
  sizes?: string;
  objectPosition?: string;
  onError?: () => void;
  animateOnReveal?: boolean;
  touchEnabled?: boolean;
};

const INTERACTION_QUERY = "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";
const getServerInteraction = () => false;

export function ChromaticImage({
  src,
  alt,
  children,
  className,
  backgroundColor = "#111111",
  zoom = 0.2,
  displacement = 0.05,
  chromaticShift = 0.01,
  tilt = 0.3,
  sizes = "100vw",
  objectPosition = "50% 50%",
  onError,
  animateOnReveal = false,
  touchEnabled = false,
}: ChromaticImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImage, setLoadedImage] = useState<{ src: string; url: string } | null>(null);
  const interactionQuery = touchEnabled ? "(prefers-reduced-motion: no-preference)" : INTERACTION_QUERY;
  const interactive = useSyncExternalStore(
    (callback) => {
      const query = window.matchMedia(interactionQuery);
      query.addEventListener("change", callback);
      return () => query.removeEventListener("change", callback);
    },
    () => window.matchMedia(interactionQuery).matches,
    getServerInteraction,
  );
  const textureUrl = loadedImage?.src === src ? loadedImage.url : null;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !interactive || !textureUrl) return;

    let disposed = false;
    let detach = () => {};

    void import("./chromatic-gl").then((mod) => {
      if (disposed) return;
      detach = mod.attachChromaticGl({
        container,
        canvas,
        textureUrl,
        backgroundColor,
        zoom,
        displacement,
        chromaticShift,
        tilt,
        objectPosition,
        animateOnReveal,
        touchEnabled,
      });
    });

    return () => {
      disposed = true;
      detach();
    };
  }, [backgroundColor, displacement, chromaticShift, textureUrl, tilt, zoom, objectPosition, interactive, animateOnReveal, touchEnabled]);

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor }}
      className={cn(
        "relative isolate overflow-hidden bg-neutral-100 dark:bg-neutral-900",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        draggable={false}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition }}
        onLoad={(event) => setLoadedImage({ src, url: event.currentTarget.currentSrc })}
        onError={onError}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full opacity-0"
      />
      {children}
    </div>
  );
}
