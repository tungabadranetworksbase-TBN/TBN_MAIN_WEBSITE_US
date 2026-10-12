"use client";

import { useEffect, useRef, useState } from "react";
import { lms } from "@/lib/site";
import styles from "./EnrollFrame.module.css";

/**
 * The LMS registration form, framed into this site.
 *
 * The LMS owns the form, the submission and the payment. In its embed mode it
 * hides its own header and footer and talks to this page by postMessage:
 *
 *   height    - its content height, so the frame never scrolls on its own
 *   checkout  - a Stripe Checkout URL. Stripe will not load inside a frame,
 *               so this page sends the whole tab there; Stripe returns the
 *               visitor to /enroll, which re-embeds the form in its paid state
 *   submitted, paid - moments worth bringing the top of the form into view
 *
 * Messages are accepted only from the LMS origin, and checkout only to
 * Stripe's own host, so nothing else can use this page to redirect a visitor.
 */

type Message =
  | { type: "tbn-form"; event: "height"; height: number }
  | { type: "tbn-form"; event: "checkout"; url: string }
  | { type: "tbn-form"; event: "submitted" | "paid" };

const isStripeCheckout = (raw: string) => {
  try {
    const u = new URL(raw);
    return u.protocol === "https:" && u.hostname === "checkout.stripe.com";
  } catch {
    return false;
  }
};

/** How long a loaded frame has to announce its embed mode before we stop framing it. */
const HANDSHAKE_MS = 5000;

export default function EnrollFrame({ src }: { src: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  // The same form, opened directly rather than framed.
  const direct = (() => {
    const u = new URL(src);
    u.searchParams.delete("embed");
    return u.toString();
  })();

  /**
   * The first height message is the LMS saying it is in embed mode. A frame
   * that loads but never says so is a version of the form whose Pay step would
   * try to open Stripe inside the frame, which Stripe refuses. Rather than
   * leave a visitor to find that out at payment, hand them the form directly.
   */
  const [unembeddable, setUnembeddable] = useState(false);
  useEffect(() => {
    if (!loaded || height !== null) return;
    const t = setTimeout(() => setUnembeddable(true), HANDSHAKE_MS);
    return () => clearTimeout(t);
  }, [loaded, height]);
  // The frame is created only after hydration, so onLoad is always attached
  // before it can fire; a server-rendered frame could finish first and stay hidden.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (
        e.origin !== lms.origin ||
        e.source !== frameRef.current?.contentWindow
      )
        return;
      const m = e.data as Message;
      if (!m || m.type !== "tbn-form") return;
      if (m.event === "height" && Number.isFinite(m.height)) {
        setHeight(Math.max(320, Math.min(Math.ceil(m.height), 20000)));
      } else if (
        m.event === "checkout" &&
        typeof m.url === "string" &&
        isStripeCheckout(m.url)
      ) {
        window.location.assign(m.url);
      } else if (m.event === "submitted" || m.event === "paid") {
        frameRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (unembeddable) {
    return (
      <div className={styles.handoff}>
        <p className={styles.handoffTitle}>Continue to the registration form</p>
        <p className={styles.handoffText}>
          The form opens on our enrollment portal. You can register and pay there; it takes a few minutes.
        </p>
        <a className="btn btn--gold" href={direct}>
          Continue to registration
        </a>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {!loaded && (
        <div className={styles.loading} aria-hidden="true">
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>
      )}
      {mounted && (
        <iframe
          ref={frameRef}
          src={src}
          title="Enrollment form"
          allow="payment"
          className={styles.frame}
          onLoad={() => setLoaded(true)}
          // Until the form reports its height, give it room so it is usable
          // even if messaging fails; after that it is exactly as tall as it is.
          style={{ height: height ?? 1100, opacity: loaded ? 1 : 0 }}
        />
      )}
      <p className={styles.fallback}>
        Trouble loading the form?{" "}
        <a href={direct} target="_blank" rel="noopener noreferrer">
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}
