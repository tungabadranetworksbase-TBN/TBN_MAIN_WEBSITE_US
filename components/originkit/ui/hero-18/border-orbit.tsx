// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import { useEffect, useRef, useState } from "react";

/** The band shape, as a mask rather than a clip: the full rounded box minus the
 *  content box, composited with `exclude`, leaves exactly the padding ring —
 *  and it confines a composited (blurred) child reliably, which a rounded
 *  `overflow: hidden` does not. */
const BAND_MASK: React.CSSProperties = {
  maskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
  maskClip: "border-box, content-box",
  maskComposite: "exclude",
  WebkitMaskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
  WebkitMaskClip: "border-box, content-box",
  WebkitMaskComposite: "xor",
} as React.CSSProperties;

// Matches the reference component's speed dial: seconds-per-orbit = this / speed.
const SECONDS_AT_SPEED_1 = 10;

export default function BorderOrbit({
  color = "#fcc000",
  bandWidth = 1.5,
  arcPercent = 20,
  speed = 3,
  direction = "ccw",
}: {
  color?: string;
  bandWidth?: number;
  arcPercent?: number;
  speed?: number;
  direction?: "cw" | "ccw";
}) {
  const cometRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [side, setSide] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const measure = () =>
      setSide(Math.ceil(Math.hypot(el.offsetWidth, el.offsetHeight) * 1.02));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const loopSec = Math.max(0.5, SECONDS_AT_SPEED_1 / Math.max(1, speed));
    const degPerSec = (360 / loopSec) * (direction === "cw" ? 1 : -1);
    let raf = 0;
    let last = 0;
    let angle = 0;
    const tick = (t: number) => {
      if (!last) last = t;
      angle = (angle + (degPerSec * (t - last)) / 1000) % 360;
      last = t;
      const el = cometRef.current;
      if (el) el.style.transform = `rotate(${angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, direction]);

  const arcDeg = (Math.max(0, Math.min(100, arcPercent)) / 100) * 360;
  // THE COMET HAS A FRONT: a conic-gradient runs clockwise from 12 o'clock, so
  // the ramp is mirrored per direction to keep the bright head leading the
  // motion instead of dragging behind it.
  const cometBackground =
    direction === "cw"
      ? `conic-gradient(from 0deg, rgba(0,0,0,0) 0deg, rgba(0,0,0,0) calc(360deg - ${arcDeg}deg), ${color} 360deg)`
      : `conic-gradient(from 0deg, ${color} 0deg, rgba(0,0,0,0) ${arcDeg}deg, rgba(0,0,0,0) 360deg)`;

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
      style={{ boxSizing: "border-box", padding: bandWidth, ...BAND_MASK }}
    >
      <div
        ref={cometRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: side,
          height: side,
          marginTop: -side / 2,
          marginLeft: -side / 2,
          transformOrigin: "center",
        }}
      >
        <div
          style={{ position: "absolute", inset: 0, background: cometBackground, filter: "blur(6px)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: cometBackground, opacity: 0.6 }} />
      </div>
    </div>
  );
}
