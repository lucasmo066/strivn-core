"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type ComponentPropsWithoutRef,
} from "react";
import confetti, { type CreateTypes, type Options } from "canvas-confetti";

export type ConfettiRef = {
  fire: (options?: Options) => void;
};

type ConfettiProps = ComponentPropsWithoutRef<"canvas"> & {
  options?: Options;
  manualstart?: boolean;
};

// Canvas wrapper adapted from https://magicui.design/docs/components/confetti.
export const Confetti = forwardRef<ConfettiRef, ConfettiProps>(
  function Confetti({ options, manualstart = false, ...props }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const instanceRef = useRef<CreateTypes | null>(null);
    const optionsRef = useRef(options);

    useEffect(() => {
      optionsRef.current = options;
    }, [options]);

    useEffect(() => {
      if (!canvasRef.current) return;

      instanceRef.current = confetti.create(canvasRef.current, {
        resize: true,
        disableForReducedMotion: true,
      });

      const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
      const stopForReducedMotion = () => {
        if (motionPreference.matches) instanceRef.current?.reset();
      };
      motionPreference.addEventListener("change", stopForReducedMotion);

      return () => {
        motionPreference.removeEventListener("change", stopForReducedMotion);
        instanceRef.current?.reset();
        instanceRef.current = null;
      };
    }, []);

    const fire = useCallback((overrides: Options = {}) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      void instanceRef.current?.({ ...optionsRef.current, ...overrides });
    }, []);

    useImperativeHandle(ref, () => ({ fire }), [fire]);

    useEffect(() => {
      if (!manualstart) fire();
    }, [fire, manualstart]);

    return <canvas ref={canvasRef} aria-hidden="true" {...props} />;
  },
);
