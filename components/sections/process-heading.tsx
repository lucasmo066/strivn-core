"use client";

import { useCallback, useEffect, useRef } from "react";
import { useInView } from "motion/react";

import { Confetti, type ConfettiRef } from "@/components/ui/confetti";

export function ProcessHeading() {
  const headingRef = useRef<HTMLDivElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const canvasFrameRef = useRef<HTMLSpanElement>(null);
  const confettiRef = useRef<ConfettiRef>(null);
  const lastBurstRef = useRef(-Infinity);
  const isInView = useInView(headingRef, { once: true, amount: 0.9 });

  const celebrate = useCallback(() => {
    if (!launchRef.current || !canvasFrameRef.current) return;
    const now = performance.now();
    if (now - lastBurstRef.current < 700) return;
    lastBurstRef.current = now;

    const text = launchRef.current.getBoundingClientRect();
    const canvas = canvasFrameRef.current.getBoundingClientRect();
    confettiRef.current?.fire({
      particleCount: 65,
      spread: 80,
      startVelocity: 22,
      gravity: 0.8,
      ticks: 180,
      scalar: 0.85,
      origin: {
        x: (text.left + text.width / 2 - canvas.left) / canvas.width,
        y: (text.top + text.height / 2 - canvas.top) / canvas.height,
      },
    });
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = window.setTimeout(celebrate, 700);
    return () => window.clearTimeout(timer);
  }, [celebrate, isInView]);

  return (
    <div ref={headingRef} className="relative mt-5">
      <h1 className="font-display text-[clamp(2.15rem,7vw,4.5rem)] leading-[1.08]">
        From first hello<br />to{" "}
        <button
          ref={launchRef}
          type="button"
          className="text-orange-gradient cursor-pointer rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          title="Replay confetti"
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") celebrate();
          }}
          onClick={celebrate}
        >
          launch day.
        </button>
      </h1>
      <span
        ref={canvasFrameRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-0 z-10 h-[calc(100%+10rem)] w-full"
      >
        <Confetti ref={confettiRef} manualstart className="block size-full" />
      </span>
    </div>
  );
}
