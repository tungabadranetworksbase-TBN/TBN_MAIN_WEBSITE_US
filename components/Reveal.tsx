"use client";

import { useEffect } from "react";

/**
 * Restores Fintra's scroll-in entrance, which the Framer JS runtime used to
 * drive. The export ships each animated element pre-hidden with an inline
 * `opacity:0.001`; the build strips that (otherwise the page renders blank),
 * so the reveal is re-applied here against section elements instead.
 *
 * Sections already in view on load are shown immediately, so nothing above the
 * fold waits on JavaScript, and the whole thing is skipped when the visitor
 * prefers reduced motion.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("#main-content > section, #main-content > div > section"),
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-revealed", "true");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.02 },
    );

    for (const el of targets) {
      // Anything already on screen is revealed without animating.
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.9) {
        el.setAttribute("data-revealed", "true");
      } else {
        el.setAttribute("data-reveal", "");
        io.observe(el);
      }
    }

    return () => io.disconnect();
  }, []);

  return null;
}
