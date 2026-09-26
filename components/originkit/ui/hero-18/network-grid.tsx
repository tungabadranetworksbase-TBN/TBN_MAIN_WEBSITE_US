/**
 * Spine-leaf topology, drawn behind the vortex.
 *
 * Static inline SVG on purpose. This hero already runs a WebGL canvas for the
 * tornado and a second one for the flare further down the page; a third
 * animated layer would cost frames for something the eye reads as texture.
 * Everything here is one paint, with the only movement a CSS opacity pulse on
 * four nodes that a compositor handles and reduced-motion switches off.
 *
 * The coordinates are computed, not authored, so the mesh stays regular and
 * the file stays short - but they are deterministic, so server and client
 * render identically and hydration has nothing to reconcile.
 */

const VIEW = { w: 1440, h: 900 };

/** Four spine switches across the top. */
const SPINE = [0, 1, 2, 3].map((i) => ({ x: 300 + i * 260, y: 172 }));

/** Six leaf switches, every one homed to every spine. */
const LEAF = [0, 1, 2, 3, 4, 5].map((i) => ({ x: 195 + i * 210, y: 432 }));

/** Two access nodes hanging off each leaf. */
const ACCESS = LEAF.flatMap((l, i) => [
  { x: l.x - 62, y: 664, leaf: i },
  { x: l.x + 62, y: 664, leaf: i },
]);

/** The nodes that pulse. Spread out, so it never reads as a row blinking. */
const LIVE = new Set([1, 2]);

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
          {/* Dissolves the mesh into the ground rather than cutting it off at
              the frame, and keeps it clear of the headline on the left. */}
          <radialGradient id="ng-fade" cx="52%" cy="42%" r="62%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="58%" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="ng-mask">
            <rect width={VIEW.w} height={VIEW.h} fill="url(#ng-fade)" />
          </mask>
        </defs>

        <g mask="url(#ng-mask)" fill="none" stroke="#fcc000">
          {/* Spine to leaf: the full mesh, which is the point of the design. */}
          <g strokeOpacity="0.085" strokeWidth="1">
            {SPINE.map((s, si) =>
              LEAF.map((l, li) => (
                <line key={`s${si}-l${li}`} x1={s.x} y1={s.y} x2={l.x} y2={l.y} />
              )),
            )}
          </g>

          {/* Leaf to access, drawn as elbows the way a rack diagram would. */}
          <g strokeOpacity="0.13" strokeWidth="1">
            {ACCESS.map((a, i) => (
              <polyline
                key={`a${i}`}
                points={`${LEAF[a.leaf].x},${LEAF[a.leaf].y} ${LEAF[a.leaf].x},${a.y - 46} ${a.x},${a.y - 46} ${a.x},${a.y}`}
              />
            ))}
          </g>

          {/* An uplink pair leaving the fabric, so it reads as a real estate
              rather than a closed diagram. */}
          <g strokeOpacity="0.1" strokeWidth="1">
            <polyline points={`${SPINE[0].x},${SPINE[0].y} ${SPINE[0].x},60 120,60`} />
            <polyline points={`${SPINE[3].x},${SPINE[3].y} ${SPINE[3].x},60 1340,60`} />
          </g>
        </g>

        <g mask="url(#ng-mask)" stroke="none">
          {ACCESS.map((a, i) => (
            <circle key={`ac${i}`} cx={a.x} cy={a.y} r="2.5" fill="#fcc000" fillOpacity="0.22" />
          ))}

          {LEAF.map((l, i) => (
            <g key={`lf${i}`}>
              <circle cx={l.x} cy={l.y} r="4.5" fill="#fcc000" fillOpacity="0.3" />
              <circle cx={l.x} cy={l.y} r="9" fill="none" stroke="#fcc000" strokeOpacity="0.16" />
            </g>
          ))}

          {SPINE.map((s, i) => (
            <g key={`sp${i}`} className={LIVE.has(i) ? "ng-pulse" : undefined}>
              <circle cx={s.x} cy={s.y} r="6" fill="#fcc000" fillOpacity="0.42" />
              <circle cx={s.x} cy={s.y} r="13" fill="none" stroke="#fcc000" strokeOpacity="0.2" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
