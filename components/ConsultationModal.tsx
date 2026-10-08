"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Close } from "@/components/Icons";
import { site } from "@/lib/site";
import popup from "./DemoPopup.module.css";
import styles from "./InquiryForm.module.css";

/**
 * The Book a Consultation form, over the page.
 *
 * Mounted once in the root layout. Any link whose href is exactly
 * `site.contact.consultation` opens it, wherever that link is rendered, so the
 * buttons need no wiring of their own. Without JavaScript the same link lands
 * on the contact form instead.
 */

type Field = "consultation_type" | "name" | "email" | "phone" | "country" | "date" | "window" | "requirement";
type Errors = Partial<Record<Field, string>>;

export const TYPES = [
  { value: "course", label: "About a course" },
  { value: "one_on_one", label: "1:1 discussion" },
  { value: "other", label: "Something else" },
] as const;

const COUNTRIES = [
  "United States", "Canada", "India", "United Kingdom", "Australia", "United Arab Emirates",
  "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain", "Singapore", "Germany", "Ireland",
  "Netherlands", "New Zealand", "South Africa", "Nigeria", "Other",
];

const WINDOWS = ["Morning (9 AM–12 PM)", "Afternoon (12–5 PM)", "Evening (5–8 PM)", "Any time"];

/** Today as YYYY-MM-DD in the visitor's own zone, for the date picker's minimum. */
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** Client-side mirror of app/api/consultation/route.ts. */
function validate(d: Record<Field, string>): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Enter a valid email address.";
  const digits = d.phone.replace(/\D/g, "").length;
  if (!/^[+\d\s().-]+$/.test(d.phone.trim()) || digits < 7 || digits > 15) e.phone = "Enter a valid phone number.";
  if (!d.consultation_type) e.consultation_type = "Choose what you would like to discuss.";
  if (!d.country) e.country = "Choose your country.";
  if (!d.date) e.date = "Pick a day that suits you.";
  else if (d.date < today()) e.date = "Pick today or a later day.";
  if (!d.window) e.window = "Pick a time window.";
  if (d.requirement.trim().length < 5) e.requirement = "Tell us a little about what you need.";
  return e;
}

export default function ConsultationModal() {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [failMessage, setFailMessage] = useState<string | null>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // One listener for every Book a Consultation link on the site.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.getAttribute("href") !== site.contact.consultation) return;
      e.preventDefault();
      triggerRef.current = a;
      setState("idle");
      setErrors({});
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Focus in on open, Esc to close, focus back to the button on close.
  useEffect(() => {
    if (!open) return;
    firstRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");
    const fields: Record<Field, string> = {
      consultation_type: get("consultation_type"),
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      country: get("country"),
      date: get("date"),
      window: get("window"),
      requirement: get("requirement"),
    };

    const found = validate(fields);
    setErrors(found);
    const firstBad = (Object.keys(fields) as Field[]).find((k) => found[k]);
    if (firstBad) {
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultation_type: fields.consultation_type,
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          country: fields.country,
          // One readable line for the admin panel: the day, the window and the
          // zone those times are in, e.g. "Tue, Oct 14 · Evening (5–8 PM) · America/Chicago".
          available_time: [
            new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(
              new Date(`${fields.date}T12:00:00`),
            ),
            fields.window,
            Intl.DateTimeFormat().resolvedOptions().timeZone,
          ].join(" · "),
          requirement: fields.requirement,
          source_page: window.location.pathname + window.location.search,
          company_website: get("company_website"),
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        if (body?.errors) setErrors(body.errors);
        setFailMessage(typeof body?.error === "string" ? body.error : null);
        throw new Error(String(res.status));
      }
      setState("sent");
      form.reset();
    } catch {
      setState("failed");
    } finally {
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  if (!open) return null;

  const err = (f: Field) =>
    errors[f] && (
      <p className={styles.error} id={id(`${f}-error`)}>
        {errors[f]}
      </p>
    );
  const aria = (f: Field) => ({
    "aria-invalid": errors[f] ? ("true" as const) : undefined,
    "aria-describedby": errors[f] ? id(`${f}-error`) : undefined,
  });

  return (
    <div className={popup.overlay}>
      <div className={popup.backdrop} onClick={() => setOpen(false)} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-labelledby={id("title")} className={`${popup.card} ${popup.cardWide}`} data-lenis-prevent>
        <button className={popup.close} onClick={() => setOpen(false)} aria-label="Close">
          <Close size={18} />
        </button>

        <div className={popup.head}>
          <p className={popup.eyebrow}>Free consultation</p>
          <h2 id={id("title")} className={popup.title}>
            Book a consultation
          </h2>
          <p className={popup.sub}>Tell us what you need and we&rsquo;ll get back to you within one business day.</p>
        </div>

        {state === "sent" ? (
          <div ref={statusRef} tabIndex={-1} role="status" style={{ padding: "16px 20px 24px" }}>
            <p className={styles.status} data-tone="ok">
              Thank you, your request has been received. Our team will contact you within one business day.
            </p>
            <button className="btn btn--ghost-dark btn--block" style={{ marginTop: 16 }} onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className={styles.modalForm}>
            <fieldset className={styles.fieldset} {...aria("consultation_type")}>
              <legend className={styles.label}>What would you like to discuss?</legend>
              <div className={styles.choices}>
                {TYPES.map((t, i) => (
                  <label key={t.value} className={styles.choice}>
                    <input ref={i === 0 ? firstRef : undefined} type="radio" name="consultation_type" value={t.value} />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
              {err("consultation_type")}
            </fieldset>

            <div className={`${styles.row} ${styles["row--2"]}`}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={id("name")}>
                  Full name
                </label>
                <input className={styles.control} id={id("name")} name="name" autoComplete="name" {...aria("name")} />
                {err("name")}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor={id("email")}>
                  Email address
                </label>
                <input className={styles.control} id={id("email")} name="email" type="email" autoComplete="email" {...aria("email")} />
                {err("email")}
              </div>
            </div>

            <div className={`${styles.row} ${styles["row--2"]}`}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={id("phone")}>
                  Phone number
                </label>
                <input
                  className={styles.control}
                  id={id("phone")}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(555) 000-0000"
                  {...aria("phone")}
                />
                {err("phone")}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor={id("country")}>
                  Country
                </label>
                <select className={styles.control} id={id("country")} name="country" defaultValue="United States" autoComplete="country-name" {...aria("country")}>
                  {COUNTRIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                {err("country")}
              </div>
            </div>

            <div className={`${styles.row} ${styles["row--2"]}`}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={id("date")}>
                  Preferred day
                </label>
                <input className={styles.control} id={id("date")} name="date" type="date" min={today()} {...aria("date")} />
                {err("date")}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor={id("window")}>
                  Available time
                </label>
                <select className={styles.control} id={id("window")} name="window" defaultValue="" {...aria("window")}>
                  <option value="" disabled>
                    Choose a time window
                  </option>
                  {WINDOWS.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
                {err("window")}
              </div>
            </div>
            <p className={styles.hint} style={{ marginTop: -8 }}>
              Times are in your own time zone.
            </p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={id("requirement")}>
                Your requirement
              </label>
              <textarea
                className={styles.control}
                id={id("requirement")}
                name="requirement"
                placeholder="e.g. I want to move into network engineering and am looking at CCNA. Or: training for a team of six."
                {...aria("requirement")}
              />
              {err("requirement")}
            </div>

            {/* Honeypot - visually and programmatically hidden from real users. */}
            <div className="visually-hidden" aria-hidden="true">
              <label htmlFor={id("company_website")}>Company website</label>
              <input id={id("company_website")} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button type="submit" className="btn btn--gold btn--block" disabled={state === "sending"}>
              {state === "sending" ? "Sending..." : "Request a consultation"}
            </button>

            <p className={styles.hint}>
              We use these details only to respond to you. See the{" "}
              <Link href="/privacy-policy" onClick={() => setOpen(false)} style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>
                Privacy Policy
              </Link>
              .
            </p>

            {state === "failed" && (
              <div ref={statusRef} tabIndex={-1} role="status" className={styles.status} data-tone="error">
                {failMessage ?? "Something went wrong sending your request."}{" "}
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> · <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
