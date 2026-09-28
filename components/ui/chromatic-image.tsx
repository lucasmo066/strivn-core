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
};

const VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D uImage;
uniform vec2 uPointer;
uniform float uImageAspect;
uniform float uCanvasAspect;
uniform float uProgress;
uniform float uZoom;
uniform float uWarp;
uniform float uChromatic;
uniform vec2 uObjectPosition;
varying vec2 vUv;

vec2 cover(vec2 uv) {
  if (uImageAspect > uCanvasAspect) {
    float ratio = uCanvasAspect / uImageAspect;
    uv.x = uv.x * ratio + uObjectPosition.x * (1.0 - ratio);
  } else {
    float ratio = uImageAspect / uCanvasAspect;
    uv.y = uv.y * ratio + (1.0 - uObjectPosition.y) * (1.0 - ratio);
  }
  return uv;
}

void main() {
  float strength = uProgress;
  vec2 movement = (uPointer - vec2(0.5)) * vec2(uCanvasAspect, 1.0);
  vec2 direction = movement / max(length(movement), 0.2);

  vec2 baseUv = mix(vUv, vec2(0.5), uZoom * uProgress * 0.28);
  float band = sin(vUv.y * 24.0 + uPointer.x * 5.0);
  float fineBand = sin(vUv.y * 71.0 - uPointer.y * 4.0);
  baseUv.x += (band * 0.72 + fineBand * 0.28) * uWarp * strength * 0.16;
  baseUv.y += direction.y * uWarp * strength * 0.12;
  baseUv = cover(baseUv);

  vec2 split = direction * uChromatic * strength;
  split.x += band * uChromatic * strength * 0.35;
  float red = texture2D(uImage, clamp(baseUv + split, 0.0, 1.0)).r;
  float green = texture2D(uImage, clamp(baseUv, 0.0, 1.0)).g;
  float blue = texture2D(uImage, clamp(baseUv - split, 0.0, 1.0)).b;
  float alpha = texture2D(uImage, clamp(baseUv, 0.0, 1.0)).a;

  gl_FragColor = vec4(red, green, blue, alpha);
}
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function approach(current: number, target: number, speed: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-speed * delta));
}

function parseColor(color: string): [number, number, number] {
  const value = color.startsWith("#") ? color.slice(1) : "111111";
  const hex = value.length === 3
    ? value
        .split("")
        .map((character) => character + character)
        .join("")
    : value;
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
}

const INTERACTION_QUERY = "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";
function subscribeInteraction(callback: () => void) {
  const query = window.matchMedia(INTERACTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getInteraction = () => window.matchMedia(INTERACTION_QUERY).matches;
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
}: ChromaticImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImage, setLoadedImage] = useState<{ src: string; url: string } | null>(null);
  const interactive = useSyncExternalStore(subscribeInteraction, getInteraction, getServerInteraction);
  const textureUrl = loadedImage?.src === src ? loadedImage.url : null;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !interactive || !textureUrl) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vertex = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) {
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.useProgram(program);

    const position = gl.getAttribLocation(program, "aPosition");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      image: gl.getUniformLocation(program, "uImage"),
      pointer: gl.getUniformLocation(program, "uPointer"),
      imageAspect: gl.getUniformLocation(program, "uImageAspect"),
      canvasAspect: gl.getUniformLocation(program, "uCanvasAspect"),
      progress: gl.getUniformLocation(program, "uProgress"),
      zoom: gl.getUniformLocation(program, "uZoom"),
      warp: gl.getUniformLocation(program, "uWarp"),
      chromatic: gl.getUniformLocation(program, "uChromatic"),
      objectPosition: gl.getUniformLocation(program, "uObjectPosition"),
    };

    gl.uniform1i(uniforms.image, 0);
    gl.uniform1f(uniforms.zoom, zoom);
    gl.uniform1f(uniforms.warp, displacement);
    gl.uniform1f(uniforms.chromatic, chromaticShift);
    const positionValues = objectPosition.split(/\s+/).map((value) => Number.parseFloat(value) / 100);
    gl.uniform2f(uniforms.objectPosition, positionValues[0] || 0, positionValues[1] ?? 0.5);

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const [red, green, blue] = parseColor(backgroundColor);
    gl.clearColor(red, green, blue, 1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    const pointer = { x: 0.5, y: 0.5 };
    const pointerTarget = { x: 0.5, y: 0.5 };
    let progress = 0;
    let progressTarget = 0;
    let imageLoaded = false;
    let disposed = false;
    let frame = 0;
    let isRendering = false;
    let previousTime = performance.now();
    let visible = false;

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const renderWidth = Math.round(width * pixelRatio);
      const renderHeight = Math.round(height * pixelRatio);
      if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
        canvas.width = renderWidth;
        canvas.height = renderHeight;
        gl.viewport(0, 0, renderWidth, renderHeight);
      }
      gl.uniform1f(uniforms.canvasAspect, width / height);
    };

    const render = (time: number) => {
      if (disposed || !visible || document.hidden || gl.isContextLost()) {
        isRendering = false;
        return;
      }
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      progress = approach(progress, progressTarget, 10, delta);
      pointer.x = approach(pointer.x, pointerTarget.x, 30, delta);
      pointer.y = approach(pointer.y, pointerTarget.y, 30, delta);

      gl.uniform1f(uniforms.progress, progress);
      gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (imageLoaded) {
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        canvas.style.opacity = "1";
      }

      const rotateX = (0.5 - pointer.y) * tilt * 18 * progress;
      const rotateY = (pointer.x - 0.5) * tilt * 18 * progress;
      canvas.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${1 + 0.025 * progress})`;

      const isSettled =
        Math.abs(progress - progressTarget) < 0.001 &&
        Math.abs(pointer.x - pointerTarget.x) < 0.001 &&
        Math.abs(pointer.y - pointerTarget.y) < 0.001;
      if (isSettled) {
        isRendering = false;
      } else {
        frame = requestAnimationFrame(render);
      }
    };

    const requestRender = () => {
      if (isRendering || disposed || !visible || document.hidden || gl.isContextLost()) return;
      isRendering = true;
      previousTime = performance.now();
      frame = requestAnimationFrame(render);
    };

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = container.getBoundingClientRect();
      pointerTarget.x = (event.clientX - bounds.left) / bounds.width;
      pointerTarget.y = 1 - (event.clientY - bounds.top) / bounds.height;
      progressTarget = 1;
      requestRender();
    };

    const resetPointer = () => {
      pointerTarget.x = 0.5;
      pointerTarget.y = 0.5;
      progressTarget = 0;
      requestRender();
    };

    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      if (disposed) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      try {
        gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image,
      );
      } catch {
        canvas.style.opacity = "0";
        return;
      }
      gl.uniform1f(uniforms.imageAspect, image.naturalWidth / image.naturalHeight);
      imageLoaded = true;
      requestRender();
    };
    image.onerror = () => { canvas.style.opacity = "0"; };
    // Reuse Next's already-loaded same-origin optimized URL for a CORS-safe texture.
    image.src = textureUrl;

    const suspend = () => {
      cancelAnimationFrame(frame);
      isRendering = false;
      progress = progressTarget = 0;
      pointer.x = pointer.y = pointerTarget.x = pointerTarget.y = 0.5;
      canvas.style.opacity = "0";
      canvas.style.transform = "";
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestRender();
      else suspend();
    });
    intersectionObserver.observe(container);
    const onVisibilityChange = () => {
      if (document.hidden) suspend();
      else requestRender();
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      suspend();
    };
    const onContextRestored = () => {
      // Leave the accessible fallback visible after GPU context loss.
      imageLoaded = false;
      suspend();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      requestRender();
    });
    resizeObserver.observe(container);
    container.addEventListener("pointermove", updatePointer, { passive: true });
    container.addEventListener("pointerleave", resetPointer, { passive: true });
    resize();
    requestRender();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      image.onload = image.onerror = null;
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", updatePointer);
      container.removeEventListener("pointerleave", resetPointer);
      canvas.style.transform = "";
      canvas.style.opacity = "0";
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [backgroundColor, displacement, chromaticShift, textureUrl, tilt, zoom, objectPosition, interactive]);

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
