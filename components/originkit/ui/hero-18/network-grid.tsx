/**
 * Isometric rack hall — the hero's subject now that the vortex is off.
 *
 * Static inline SVG. The offer section further down runs a WebGL canvas, and
 * this is meant to be read rather than watched, so it is one paint: the only
 * movement is a CSS opacity step on a handful of LEDs, off under
 * prefers-reduced-motion.
 *
 * Two things carry it. The faces are opaque, so racks occlude each other and
 * read as objects rather than the glass wireframes they were; and depth drives
 * brightness, so the hall recedes instead of sitting flat. Geometry comes from
 * a real isometric projection, and every choice is deterministic, so server
 * and client render identically.
 */

const VIEW = { w: 1440, h: 900 };

/** True isometric: x recedes right-and-down, z left-and-down, y straight up. */
const K = Math.cos(Math.PI / 6);
const iso = (x: number, y: number, z: number): [number, number] => [
  (x - z) * K,
  (x + z) * 0.5 - y,
];
const pt = (p: [number, number]) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
const poly = (...ps: [number, number][]) => ps.map(pt).join(" ");

const W = 58; // rack width
const D = 74; // rack depth
const UH = 11; // one rack unit

/** A quad on a rack's front face, in face-local (across, up) coordinates. */
const faceQuad = (ox: number, oz: number, u0: number, v0: number, u1: number, v1: number) =>
  poly(
    iso(ox + u0, v0, oz + D),
    iso(ox + u1, v0, oz + D),
    iso(ox + u1, v1, oz + D),
    iso(ox + u0, v1, oz + D),
  );

type Rack = { ox: number; oz: number; units: number };

/** Three rows, each offset, so the hall reads as depth and not a wall. */
const RACKS: Rack[] = [
  { ox: 0, oz: 0, units: 17 },
  { ox: 86, oz: 0, units: 14 },
  { ox: 172, oz: 0, units: 18 },
  { ox: 43, oz: 122, units: 15 },
  { ox: 129, oz: 122, units: 18 },
  { ox: 215, oz: 122, units: 13 },
  { ox: 86, oz: 244, units: 16 },
  { ox: 172, oz: 244, units: 12 },
  { ox: 258, oz: 244, units: 15 },
];

const NEAR = Math.max(...RACKS.map((r) => r.ox + r.oz));
const FAR = Math.min(...RACKS.map((r) => r.ox + r.oz));

/** 0 at the back of the hall, 1 at the front. Atmospheric perspective: the
 *  further racks dim, which is what makes the depth legible at a glance. */
const depthOf = (r: Rack) => (r.ox + r.oz - FAR) / (NEAR - FAR || 1);

type Kind = "switch" | "patch" | "server" | "blank";

/** Deterministic kit layout. A real rack is mixed and part empty, and that
 *  irregularity is most of what makes it look like equipment. */
function kindOf(rack: number, unit: number): Kind {
  const h = (rack * 31 + unit * 17) % 11;
  if (h < 2) return "blank";
  if (h < 5) return "patch";
  if (h < 8) return "switch";
  return "server";
}
const isLit = (r: number, u: number) => (r * 3 + u * 11) % 7 === 0;

/** Two circles rather than a blur filter: a filter region over the whole hall
 *  is real paint cost, and at this size the cheap version is the same picture. */
function LED({ p, lit, delay }: { p: [number, number]; lit: boolean; delay: number }) {
  return (
    <g
      className={lit ? "ng-led" : undefined}
      style={lit ? { animationDelay: `${delay}s` } : undefined}
    >
      {lit && <circle cx={p[0]} cy={p[1]} r="4" fill="#fcc000" fillOpacity="0.16" />}
      <circle cx={p[0]} cy={p[1]} r="1.3" fill="#fce418" fillOpacity={lit ? 0.95 : 0.22} />
    </g>
  );
}

function Unit({ rack, index, unit }: { rack: Rack; index: number; unit: number }) {
  const { ox, oz } = rack;
  const kind = kindOf(index, unit);
  if (kind === "blank") return null;

  const v0 = unit * UH + 1.6;
  const v1 = v0 + UH - 3.2;
  const mid = (v0 + v1) / 2;

  if (kind === "patch") {
    // A dense run of ports: the single most recognisable thing on a rack
    // front, and the reason the hall reads as equipment rather than boxes.
    return (
      <g>
        <polygon points={faceQuad(ox, oz, 4, v0, W - 4, v1)} fill="#fcc000" fillOpacity="0.05" />
        {Array.from({ length: 12 }, (_, i) => (
          <polygon
            key={i}
            points={faceQuad(ox, oz, 6 + i * 3.9, v0 + 1.6, 6 + i * 3.9 + 2.6, v1 - 1.6)}
            fill="#fcc000"
            fillOpacity={(index * 5 + unit * 7 + i) % 5 === 0 ? 0.5 : 0.17}
          />
        ))}
      </g>
    );
  }

  if (kind === "switch") {
    return (
      <g>
        <polygon
          points={faceQuad(ox, oz, 4, v0, W - 4, v1)}
          fill="#fcc000"
          fillOpacity="0.07"
          stroke="#fcc000"
          strokeOpacity="0.22"
        />
        {Array.from({ length: 8 }, (_, i) => (
          <polygon
            key={i}
            points={faceQuad(ox, oz, 8 + i * 5.4, mid - 1.4, 8 + i * 5.4 + 3.4, mid + 1.4)}
            fill="#fcc000"
            fillOpacity={(index + unit + i) % 3 === 0 ? 0.55 : 0.2}
          />
        ))}
        <LED
          p={iso(ox + W - 7, mid, oz + D)}
          lit={isLit(index, unit)}
          delay={((index * 5 + unit) % 7) * 0.55}
        />
      </g>
    );
  }

  // server: a vent band and two drive lights
  return (
    <g>
      <polygon
        points={faceQuad(ox, oz, 4, v0, W - 4, v1)}
        fill="#fcc000"
        fillOpacity="0.035"
        stroke="#fcc000"
        strokeOpacity="0.16"
      />
      <polygon
        points={faceQuad(ox, oz, 18, v0 + 2, W - 12, v1 - 2)}
        fill="#fcc000"
        fillOpacity="0.06"
      />
      <LED
        p={iso(ox + 9, mid, oz + D)}
        lit={isLit(index, unit)}
        delay={((index + unit) % 6) * 0.7}
      />
      <LED p={iso(ox + 13.5, mid, oz + D)} lit={false} delay={0} />
    </g>
  );
}

function RackBox({ rack, index }: { rack: Rack; index: number }) {
  const { ox, oz, units } = rack;
  const h = units * UH;
  const d = depthOf(rack);
  const edge = 0.2 + d * 0.32;

  return (
    <g opacity={0.45 + d * 0.55}>
      {/* Opaque on purpose. Transparent faces let every rack show through
          every other one, and the depth becomes unreadable. */}
      <polygon
        points={poly(
          iso(ox + W, 0, oz),
          iso(ox + W, 0, oz + D),
          iso(ox + W, h, oz + D),
          iso(ox + W, h, oz),
        )}
        fill="#07070a"
        stroke="#fcc000"
        strokeOpacity={edge * 0.5}
      />
      <polygon
        points={poly(iso(ox, h, oz), iso(ox + W, h, oz), iso(ox + W, h, oz + D), iso(ox, h, oz + D))}
        fill="#101014"
        stroke="#fcc000"
        strokeOpacity={edge}
      />
      <polygon
        points={poly(
          iso(ox, 0, oz + D),
          iso(ox + W, 0, oz + D),
          iso(ox + W, h, oz + D),
          iso(ox, h, oz + D),
        )}
        fill="#0a0a0d"
        stroke="#fcc000"
        strokeOpacity={edge}
      />

      {Array.from({ length: units }, (_, u) => (
        <Unit key={u} rack={rack} index={index} unit={u} />
      ))}
    </g>
  );
}

/** Overhead tray with its ladder rungs. Datacenter grammar, and it ties the
 *  row tops together so they stop reading as separate towers. */
function CableTray() {
  const y = 232;
  return (
    <g fill="none" stroke="#fcc000" strokeOpacity="0.18">
      {[0, 122, 244].map((z, i) => {
        const x0 = -40 + i * 43;
        const x1 = 300 + i * 43;
        const zc = z + D / 2;
        return (
          <g key={z}>
            <polyline points={poly(iso(x0, y, zc), iso(x1, y, zc))} />
            <polyline points={poly(iso(x0, y + 9, zc), iso(x1, y + 9, zc))} />
            {Array.from({ length: 9 }, (_, k) => {
              const x = x0 + ((x1 - x0) / 8) * k;
              return (
                <polyline
                  key={k}
                  points={poly(iso(x, y, zc), iso(x, y + 9, zc))}
                  strokeOpacity="0.45"
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

function Floor() {
  const X0 = -90;
  const X1 = 390;
  const Z0 = -90;
  const Z1 = 400;
  const STEP = 61;
  const lines: [number, number][][] = [];
  for (let x = X0; x <= X1; x += STEP) lines.push([iso(x, 0, Z0), iso(x, 0, Z1)]);
  for (let z = Z0; z <= Z1; z += STEP) lines.push([iso(X0, 0, z), iso(X1, 0, z)]);
  return (
    <g stroke="#fcc000" strokeOpacity="0.1">
      {lines.map(([a, b], i) => (
        <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
      ))}
    </g>
  );
}

export default function NetworkGrid() {
  // Painter's algorithm: far racks first, so near ones occlude them.
  const ordered = RACKS.map((r, i) => ({ r, i })).sort(
    (a, b) => a.r.ox + a.r.oz - (b.r.ox + b.r.oz),
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <radialGradient id="ng-fade" cx="66%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="62%" stopColor="#fff" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          {/* Keeps the hall off the headline, the only thing that has to stay
              legible. */}
          <linearGradient id="ng-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" />
            <stop offset="30%" stopColor="#000" />
            <stop offset="52%" stopColor="#fff" />
          </linearGradient>
          <mask id="ng-mask">
            <rect width={VIEW.w} height={VIEW.h} fill="url(#ng-fade)" />
            <rect
              width={VIEW.w}
              height={VIEW.h}
              fill="url(#ng-left)"
              style={{ mixBlendMode: "multiply" }}
            />
          </mask>
          {/* Light spilling off the hall onto the floor around it. */}
          <radialGradient id="ng-spill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fcc000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#fcc000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g mask="url(#ng-mask)">
          <ellipse cx="960" cy="560" rx="440" ry="250" fill="url(#ng-spill)" />
          <g transform="translate(862, 322) scale(1.4)">
            <Floor />
            {ordered.map(({ r, i }) => (
              <RackBox key={i} rack={r} index={i} />
            ))}
            <CableTray />
          </g>
        </g>
      </svg>
    </div>
  );
}
