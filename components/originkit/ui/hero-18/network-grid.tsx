/**
 * Isometric rack elevation, drawn behind the vortex.
 *
 * Line-art racks receding into the dark, with status LEDs. It sits behind the
 * tornado deliberately: the vortex is a mass of curves, so the background has
 * to be architectural to read as anything other than more of the same.
 *
 * Static inline SVG. This hero already runs a WebGL canvas and the offer
 * section runs a second; a third animated layer would cost frames for
 * something the eye reads as texture. The only movement is a CSS opacity
 * pulse on a handful of LEDs, which stays on the compositor and switches off
 * under prefers-reduced-motion.
 *
 * Geometry is computed from a real isometric projection rather than authored
 * as parallelograms, so the racks actually agree with each other - and it is
 * deterministic, so server and client render identically.
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
const UH = 13; // one rack unit

type Rack = { ox: number; oz: number; units: number };

/** Two rows, the back one offset so it reads as depth rather than a wall. */
const RACKS: Rack[] = [
  { ox: 0, oz: 0, units: 13 },
  { ox: 86, oz: 0, units: 11 },
  { ox: 172, oz: 0, units: 14 },
  { ox: 43, oz: 118, units: 10 },
  { ox: 129, oz: 118, units: 13 },
  { ox: 215, oz: 118, units: 9 },
];

/** Deterministic, so hydration has nothing to reconcile. */
const hasGear = (r: number, u: number) => (r * 7 + u * 5) % 4 !== 0;
const isLit = (r: number, u: number) => (r * 3 + u * 11) % 9 === 0;

/** The plane the racks stand on. Without it they read as boxes floating in
 *  space rather than a room, which was the whole problem with the mesh. */
function Floor() {
  const X0 = -70;
  const X1 = 330;
  const Z0 = -70;
  const Z1 = 260;
  const STEP = 55;
  const lines: [number, number][][] = [];
  for (let x = X0; x <= X1; x += STEP) lines.push([iso(x, 0, Z0), iso(x, 0, Z1)]);
  for (let z = Z0; z <= Z1; z += STEP) lines.push([iso(X0, 0, z), iso(X1, 0, z)]);
  return (
    <g stroke="#fcc000" strokeOpacity="0.09">
      {lines.map(([a2, b2], i) => (
        <line key={i} x1={a2[0]} y1={a2[1]} x2={b2[0]} y2={b2[1]} />
      ))}
    </g>
  );
}

function RackBox({ rack, index }: { rack: Rack; index: number }) {
  const { ox, oz, units } = rack;
  const h = units * UH;

  // The two faces meeting at the near vertical edge, plus the top.
  const front = poly(
    iso(ox, 0, oz + D),
    iso(ox + W, 0, oz + D),
    iso(ox + W, h, oz + D),
    iso(ox, h, oz + D),
  );
  const side = poly(
    iso(ox + W, 0, oz),
    iso(ox + W, 0, oz + D),
    iso(ox + W, h, oz + D),
    iso(ox + W, h, oz),
  );
  const top = poly(
    iso(ox, h, oz),
    iso(ox + W, h, oz),
    iso(ox + W, h, oz + D),
    iso(ox, h, oz + D),
  );

  return (
    <g>
      <polygon points={top} fill="#fcc000" fillOpacity="0.07" stroke="#fcc000" strokeOpacity="0.26" />
      <polygon points={side} fill="#000" fillOpacity="0.45" stroke="#fcc000" strokeOpacity="0.18" />
      <polygon points={front} fill="#000" fillOpacity="0.28" stroke="#fcc000" strokeOpacity="0.32" />

      {Array.from({ length: units }, (_, u) => {
        if (!hasGear(index, u)) return null;
        const y = u * UH;
        const a = iso(ox + 3, y + UH * 0.5, oz + D);
        const b = iso(ox + W - 3, y + UH * 0.5, oz + D);
        // Two LEDs sit at the left of each populated unit, as they do on a
        // real front panel.
        const l1 = iso(ox + 8, y + UH * 0.5, oz + D);
        const l2 = iso(ox + 15, y + UH * 0.5, oz + D);
        const lit = isLit(index, u);
        return (
          <g key={u}>
            <line
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
              stroke="#fcc000"
              strokeOpacity="0.17"
            />
            <circle cx={l1[0]} cy={l1[1]} r="1.5" fill="#fcc000" fillOpacity={lit ? 0.85 : 0.25} />
            <circle
              cx={l2[0]}
              cy={l2[1]}
              r="1.5"
              fill="#fcc000"
              fillOpacity={lit ? 0.4 : 0.18}
              className={lit ? "ng-led" : undefined}
              style={lit ? { animationDelay: `${((index * 5 + u) % 7) * 0.6}s` } : undefined}
            />
          </g>
        );
      })}
    </g>
  );
}

export default function NetworkGrid() {
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
          {/* Dissolves the cluster into the ground and keeps it away from the
              headline on the left, which is the only thing that must stay
              legible. */}
          <radialGradient id="ng-fade" cx="66%" cy="46%" r="52%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ng-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" />
            <stop offset="34%" stopColor="#000" />
            <stop offset="56%" stopColor="#fff" />
          </linearGradient>
          <mask id="ng-mask">
            <rect width={VIEW.w} height={VIEW.h} fill="url(#ng-fade)" />
            <rect width={VIEW.w} height={VIEW.h} fill="url(#ng-left)" style={{ mixBlendMode: "multiply" }} />
          </mask>
        </defs>

        <g mask="url(#ng-mask)">
          {/* Sorted so nearer racks paint over further ones. */}
          <g transform="translate(895, 318) scale(1.34)">
            <Floor />
            {RACKS.map((r, i) => ({ r, i }))
              .sort((a, b) => a.r.ox + a.r.oz - (b.r.ox + b.r.oz))
              .map(({ r, i }) => (
                <RackBox key={i} rack={r} index={i} />
              ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
