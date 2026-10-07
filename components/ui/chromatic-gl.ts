type ChromaticGlOptions = {
  container: HTMLDivElement;
  canvas: HTMLCanvasElement;
  textureUrl: string;
  backgroundColor: string;
  zoom: number;
  displacement: number;
  chromaticShift: number;
  tilt: number;
  objectPosition: string;
  animateOnReveal: boolean;
  touchEnabled: boolean;
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

/** Pointer-driven WebGL treatment. Loaded only after the still is on screen. */
export function attachChromaticGl({
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
}: ChromaticGlOptions) {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    premultipliedAlpha: false,
  });
  if (!gl) return () => {};

  const vertex = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertex || !fragment) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return () => {};
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return () => {};
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return () => {};
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
  gl.uniform2f(
    uniforms.objectPosition,
    Number.isFinite(positionValues[0]) ? positionValues[0] : 0.5,
    Number.isFinite(positionValues[1]) ? positionValues[1] : 0.5,
  );

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
  let contextFailed = false;
  let revealReady = false;
  let revealPlayed = false;
  let revealTimer = 0;
  let pulseTimer = 0;

  const resize = () => {
    if (contextFailed || gl.isContextLost()) return;
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
    if (disposed || contextFailed || !visible || document.hidden || gl.isContextLost()) {
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
    if (isRendering || disposed || contextFailed || !visible || document.hidden || gl.isContextLost()) return;
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
    window.clearTimeout(pulseTimer);
    pointerTarget.x = 0.5;
    pointerTarget.y = 0.5;
    progressTarget = 0;
    requestRender();
  };

  const pulse = (event?: PointerEvent) => {
    if (!visible || !imageLoaded || disposed) return;
    window.clearTimeout(pulseTimer);
    const bounds = container.getBoundingClientRect();
    pointerTarget.x = event ? (event.clientX - bounds.left) / bounds.width : 0.76;
    pointerTarget.y = event ? 1 - (event.clientY - bounds.top) / bounds.height : 0.62;
    if (Math.abs(pointerTarget.x - 0.5) + Math.abs(pointerTarget.y - 0.5) < 0.2) {
      pointerTarget.x = 0.76;
      pointerTarget.y = 0.62;
    }
    progressTarget = 1;
    requestRender();
    pulseTimer = window.setTimeout(resetPointer, 480);
  };

  const reveal = () => {
    if (!animateOnReveal || !revealReady || !imageLoaded || revealPlayed) return;
    revealPlayed = true;
    revealTimer = window.setTimeout(() => pulse(), 550);
  };

  const onPointerDown = (event: PointerEvent) => {
    if (!touchEnabled || event.pointerType === "mouse") return;
    window.clearTimeout(revealTimer);
    revealPlayed = true;
    pulse(event);
  };
  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType !== "touch") resetPointer();
  };

  const image = new window.Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    if (disposed || contextFailed || gl.isContextLost()) return;
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
    reveal();
  };
  image.onerror = () => { canvas.style.opacity = "0"; };
  image.src = textureUrl;

  const suspend = () => {
    window.clearTimeout(revealTimer);
    window.clearTimeout(pulseTimer);
    cancelAnimationFrame(frame);
    isRendering = false;
    progress = progressTarget = 0;
    pointer.x = pointer.y = pointerTarget.x = pointerTarget.y = 0.5;
    canvas.style.opacity = "0";
    canvas.style.transform = "";
  };
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    revealReady = entry.intersectionRatio >= 0.65;
    if (visible) {
      requestRender();
      reveal();
    } else {
      revealPlayed = false;
      suspend();
    }
  }, { threshold: [0, 0.65] });
  intersectionObserver.observe(container);
  const onVisibilityChange = () => {
    if (document.hidden) suspend();
    else requestRender();
  };
  const onContextLost = (event: Event) => {
    event.preventDefault();
    contextFailed = true;
    suspend();
  };
  const onContextRestored = () => {
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
  container.addEventListener("pointerdown", onPointerDown, { passive: true });
  container.addEventListener("pointerleave", onPointerLeave, { passive: true });
  container.addEventListener("pointercancel", resetPointer, { passive: true });
  resize();
  requestRender();

  return () => {
    disposed = true;
    window.clearTimeout(revealTimer);
    window.clearTimeout(pulseTimer);
    cancelAnimationFrame(frame);
    image.onload = image.onerror = null;
    intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    canvas.removeEventListener("webglcontextrestored", onContextRestored);
    resizeObserver.disconnect();
    container.removeEventListener("pointermove", updatePointer);
    container.removeEventListener("pointerdown", onPointerDown);
    container.removeEventListener("pointerleave", onPointerLeave);
    container.removeEventListener("pointercancel", resetPointer);
    canvas.style.transform = "";
    canvas.style.opacity = "0";
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
  };
}
