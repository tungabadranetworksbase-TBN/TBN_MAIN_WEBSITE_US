/**
 * Anamorphic lens flare on a fullscreen quad.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WRITTEN HERE, NOT SHIPPED WITH THE COMPONENT.
 *
 * `nextjs-flare.tsx` imports `createRenderer` from this path, but the file was
 * not part of the component drop. This is a stand-in built to the exact call
 * the component makes — `createRenderer({ canvas })` returning `{ ready,
 * dispose }` — so the original can replace this file on its own, with no edit
 * to the component or to anything that mounts it.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Raw WebGL2 rather than three: this is one quad and one fragment shader, and
 * three is a scene graph for things that have a scene. The whole effect lives
 * in the shader below.
 */

export interface FlareRendererOptions {
  canvas: HTMLCanvasElement;
}

export interface FlareRenderer {
  /** Resolves once the first frame is on screen, or rejects if WebGL is out. */
  ready: Promise<void>;
  dispose(): void;
}

/** The flare's colour, linear-ish RGB. Brand gold, sampled from the logo. */
const TINT: [number, number, number] = [1.0, 0.76, 0.05];

/** Backing-store cap. Past this the flare is all gradient and no detail, so the
 *  extra pixels buy nothing but fill rate. */
const MAX_PIXEL_RATIO = 1.5;

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec3  uTint;

out vec4 fragColor;

// Cheap hash for the grain. Not good randomness; good enough to break banding.
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// One lobe of the flare: a core that falls off fast, stretched along x so it
// reads as the horizontal smear an anamorphic lens gives a point source.
float lobe(vec2 uv, vec2 at, float stretch, float tight) {
  vec2 d = uv - at;
  d.x /= stretch;
  return exp(-dot(d, d) * tight);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

  // The source drifts on two slow, mismatched periods so the motion never
  // settles into a loop the eye can pick up. It is held low in the frame: when
  // something is composited over this - a logo, a title - the streak crossing
  // the middle washes straight through it, and a light that sits under the
  // subject lights it instead of erasing it.
  float t = uTime * 0.12;
  vec2 src = vec2(sin(t * 0.7) * 0.36 + 0.04, -0.62 + cos(t * 0.53) * 0.05);

  vec3 col = vec3(0.0);

  // Core, then the streak through it, then the bloom around it. The core sits
  // just below the frame: in it, it is the brightest thing on the panel and
  // whatever is composited above gets blown out from underneath. Off the
  // bottom edge, only its bloom reaches in, and the mark reads as lit rather
  // than as competing with a second light source.
  col += vec3(1.0, 0.95, 0.85) * lobe(uv, src, 1.0, 900.0) * 1.6;
  col += uTint * lobe(uv, src, 1.0, 200.0) * 0.8;
  col += uTint * lobe(uv, src, 40.0, 300.0) * 0.34;
  col += uTint * lobe(uv, src, 14.0, 26.0) * 0.10;

  // Ghosts: copies reflected through the centre, the way a real stack of
  // elements throws them, each a little cooler and weaker than the last.
  for (int i = 1; i <= 4; i++) {
    float f = float(i);
    vec2 ghost = -src * (f * 0.42);
    float g = lobe(uv, ghost, 1.0, 60.0 + f * 40.0);
    vec3 shade = mix(uTint, vec3(0.55, 0.42, 1.0), f * 0.17);
    col += shade * g * (0.16 / f);
  }

  // Halo ring around the centre, pinned to the source's distance.
  float r = length(uv);
  float ring = exp(-pow(abs(r - length(src) * 0.75) * 13.0, 2.0));
  col += mix(uTint, vec3(1.0, 0.5, 0.25), 0.4) * ring * 0.045;

  // A wash so the corners are not dead black — just enough to sit on the
  // section's ground rather than punch a hole in it.
  col += uTint * 0.012 * exp(-r * 2.4);

  // Grain, scaled by brightness: it should sit in the falloff, not speckle the
  // core, and it must fall to nothing in the dark - anything composited over
  // this with a screen blend lifts the black, and a flat grain floor turns the
  // whole dark half of the panel into visible noise.
  float grain = hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5;
  col += grain * 0.016 * (0.06 + length(col));

  // Reinhard, so the core rolls off instead of clipping to a white disc.
  col = col / (1.0 + col);
  // Approximate sRGB.
  col = pow(max(col, 0.0), vec3(1.0 / 2.2));

  fragColor = vec4(col, 1.0);
}
`;

/**
 * Marks a promise as handled without consuming it.
 *
 * The component does `void renderer.ready`, which is not a handler — so a
 * rejection here (no WebGL, shader refused to compile) would surface as an
 * unhandled rejection in the console of every browser that cannot run this.
 * Attaching a no-op catch to the same promise settles that; callers who do
 * await `ready` still see the rejection.
 */
function handled<T>(p: Promise<T>): Promise<T> {
  p.catch(() => {});
  return p;
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("could not create shader");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`shader failed to compile: ${log}`);
  }
  return shader;
}

export function createRenderer({ canvas }: FlareRendererOptions): FlareRenderer {
  let frame = 0;
  let disposed = false;
  let onScreen = true;
  let start = performance.now();
  let heldTime = 0;

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });

  if (!gl) {
    return { ready: handled(Promise.reject(new Error("WebGL2 is unavailable"))), dispose() {} };
  }

  let resolveReady: () => void;
  let rejectReady: (e: unknown) => void;
  const ready = handled(
    new Promise<void>((res, rej) => {
      resolveReady = res;
      rejectReady = rej;
    })
  );

  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let vao: WebGLVertexArrayObject | null = null;
  let uResolution: WebGLUniformLocation | null = null;
  let uTime: WebGLUniformLocation | null = null;

  try {
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    program = gl.createProgram();
    if (!program) throw new Error("could not create program");
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    // The shaders belong to the program once linked; drop our references.
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`program failed to link: ${gl.getProgramInfoLog(program)}`);
    }

    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // One triangle covering the viewport — a quad's two triangles meet on a
    // diagonal seam that some drivers shade twice.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    gl.useProgram(program);
    uResolution = gl.getUniformLocation(program, "uResolution");
    uTime = gl.getUniformLocation(program, "uTime");
    gl.uniform3fv(gl.getUniformLocation(program, "uTint"), TINT);
  } catch (err) {
    rejectReady!(err);
    return { ready, dispose() {} };
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const w = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const h = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width === w && canvas.height === h) return;
    canvas.width = w;
    canvas.height = h;
  }

  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(canvas);

  // Scrolled out of view is not a reason to keep shading every pixel of a
  // fullscreen quad sixty times a second. The loop stays alive so it resumes
  // without rebuilding, and the clock carries the gap so the drift picks up
  // where it left off instead of jumping.
  const visibility = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
    },
    { rootMargin: "150px" }
  );
  visibility.observe(canvas);

  let first = true;
  let lastAt = performance.now();

  function draw(now: number) {
    if (disposed) return;
    frame = requestAnimationFrame(draw);

    const gap = now - lastAt;
    lastAt = now;
    if (!onScreen) {
      start += gap;
      return;
    }

    resize();
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.useProgram(program);
    gl!.bindVertexArray(vao);
    gl!.uniform2f(uResolution, canvas.width, canvas.height);
    // Reduced motion gets the flare, held still — the form is the point, the
    // drift is the decoration.
    gl!.uniform1f(uTime, reduceMotion ? heldTime : (now - start) / 1000);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);

    if (first) {
      first = false;
      resolveReady!();
      // Nothing changes after the first frame under reduced motion, so stop.
      if (reduceMotion) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }
  }

  frame = requestAnimationFrame(draw);

  return {
    ready,
    dispose() {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      visibility.disconnect();
      gl!.deleteProgram(program);
      gl!.deleteBuffer(buffer);
      gl!.deleteVertexArray(vao);
      // The context is deliberately left alive. Losing it is permanent for the
      // canvas element it belongs to, and React remounts this effect onto that
      // same element — StrictMode does it on every dev mount — so forcing the
      // loss here would hand the next createRenderer a dead canvas.
    },
  };
}
