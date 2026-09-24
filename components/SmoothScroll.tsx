"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide smooth scrolling (darkroomengineering/lenis).
 *
 * Lenis drives the real scroll position rather than transforming a wrapper, so
 * everything already on the page keeps working: the fixed nav stays pinned, and
 * the IntersectionObserver in ScrollReveal still fires.
 *
 * Two things are deliberately handled here rather than left to defaults:
 *
 *   - `prefers-reduced-motion` disables it outright. Smoothing is exactly the
 *     kind of motion that setting exists to suppress, and hijacked scrolling is
 *     a common accessibility and motion-sickness complaint.
 *   - CSS `scroll-behavior: smooth` is switched off while Lenis is running.
 *     Native smooth scrolling and Lenis both animate the same anchor jump and
 *     fight each other, which reads as a stutter.
 *
 * In-page anchors are routed through Lenis so `scroll-padding-top` is respected
 * and a target does not land under the fixed nav.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    root.classList.add("lenis-active");

    const lenis = new Lenis({
      duration: 1.05,
      // gentle ease-out; overshoot reads as sloppy on a content site
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Leave touch alone. Native momentum on mobile is better than anything
      // re-implemented, and overriding it breaks pull-to-refresh.
      syncTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
      autoRaf: true,
    });

    /** Send same-page anchor clicks through Lenis so the offset is honoured. */
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href*="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || url.hash.length < 2) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      const offset = parseInt(getComputedStyle(root).scrollPaddingTop, 10) || 0;
      lenis.scrollTo(target as HTMLElement, { offset: -offset });
      history.pushState(null, "", url.hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
      root.classList.remove("lenis-active");
      root.style.scrollBehavior = previousBehavior;
    };
  }, []);

  return null;
}
