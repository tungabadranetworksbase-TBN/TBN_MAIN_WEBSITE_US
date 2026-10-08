"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Calendar, Clock, Close } from "@/components/Icons";
import {
  type Campaign,
  REGISTERED_KEY,
  SEEN_KEY,
  fmtClassesStart,
  fmtDate,
  fmtTime,
  initials,
  isRegistrationClosed,
  loadCampaigns,
} from "@/lib/demo";
import { site } from "@/lib/site";
import styles from "./DemoPopup.module.css";

/**
 * Site-wide popup listing the free live demo sessions, ported from the .in
 * site. Same storage keys and timing: shown once per browser, never to someone
 * who already registered, never on the /demo pages themselves, and only when
 * there is at least one US campaign to show.
 */

const SHOW_DELAY_MS = 3500;
const SLIDE_INTERVAL = 3000;

export default function DemoPopup() {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/demo")) return;
    try {
      if (localStorage.getItem(SEEN_KEY) || localStorage.getItem(REGISTERED_KEY)) return;
    } catch {
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    loadCampaigns()
      .then((camps) => {
        if (cancelled || camps.length === 0) return;
        setCampaigns(camps);
        timer = setTimeout(() => {
          setOpen(true);
          try {
            localStorage.setItem(SEEN_KEY, "1");
          } catch {
            /* ignore */
          }
        }, SHOW_DELAY_MS);
      })
      .catch(() => {
        /* non-critical */
      });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  // Esc closes; focus starts on the close button so keyboard users land inside.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const banners = campaigns.filter((c) => c.banner_url);
  useEffect(() => {
    if (!open || reduce || banners.length <= 1) return;
    const id = setInterval(() => setSlide((i) => (i + 1) % banners.length), SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [open, reduce, banners.length]);

  const register = (slug: string) => {
    setOpen(false);
    router.push(`/demo/${slug}`);
  };

  const current = banners[slide % Math.max(banners.length, 1)];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.backdrop} onClick={() => setOpen(false)} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-popup-title"
            className={styles.card}
            data-lenis-prevent
            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <button ref={closeRef} className={styles.close} onClick={() => setOpen(false)} aria-label="Close">
              <Close size={18} />
            </button>

            {current ? (
              <div className={styles.banner}>
                {/* eslint-disable-next-line @next/next/no-img-element -- remote CDN banner uploaded in the .in admin */}
                <img key={current.slug} src={current.banner_url!} alt="" className={styles.bannerImg} />
                <div className={styles.bannerLabel}>
                  <span className={styles.chip}>{current.course_name}</span>
                  <span className={styles.bannerTitle}>{current.title}</span>
                </div>
                {banners.length > 1 && (
                  <div className={styles.dots}>
                    {banners.map((b, i) => (
                      <button
                        key={b.slug}
                        className={styles.dot}
                        data-active={i === slide % banners.length || undefined}
                        onClick={() => setSlide(i)}
                        aria-label={`Show ${b.title}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            <div className={styles.head}>
              <p className={styles.eyebrow}>Live sessions</p>
              <h2 id="demo-popup-title" className={styles.title}>
                Free live demo sessions
              </h2>
              <p className={styles.sub}>No payment, no commitment. Times shown in your time zone.</p>
            </div>

            <ul className={styles.list}>
              {campaigns.map((c) => {
                const closed = isRegistrationClosed(c);
                const starts = fmtClassesStart(c.classes_start_date);
                return (
                  <li key={c.slug} className={styles.item}>
                    {c.banner_url && (
                      // eslint-disable-next-line @next/next/no-img-element -- remote CDN banner uploaded in the .in admin
                      <img src={c.banner_url} alt="" className={styles.thumb} />
                    )}
                    <div className={styles.badges}>
                      <span className={styles.chip}>{c.course_name}</span>
                      {c.meet_link && <span className={styles.open}>Online</span>}
                      {!closed && <span className={styles.open}>Open</span>}
                    </div>
                    <p className={styles.itemTitle}>{c.title}</p>
                    <div className={styles.meta}>
                      <span>
                        <Calendar size={16} /> {fmtDate(c.demo_datetime)}
                      </span>
                      <span>
                        <Clock size={16} /> {fmtTime(c.demo_datetime)}
                      </span>
                    </div>
                    <div className={styles.foot}>
                      <span className={styles.trainer}>
                        <span className={styles.avatar} aria-hidden="true">
                          {initials(c.trainer_name)}
                        </span>
                        {c.trainer_name}
                      </span>
                      {closed ? (
                        <a className="btn btn--ghost btn--sm" href={site.contact.enroll}>
                          {starts ? `Classes start ${starts} · Enroll` : "Enroll"}
                        </a>
                      ) : (
                        <button className="btn btn--gold btn--sm" onClick={() => register(c.slug)}>
                          Register free <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <button className={styles.later} onClick={() => setOpen(false)}>
              Maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
