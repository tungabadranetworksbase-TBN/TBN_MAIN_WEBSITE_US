"use client";

import { useEffect, useId, useRef, useState } from "react";
import { type Campaign, REGISTERED_KEY, fmtDate, fmtTime } from "@/lib/demo";
import styles from "./InquiryForm.module.css";

type Field = "first_name" | "last_name" | "email" | "mobile" | "experience_level";
type Errors = Partial<Record<Field, string>>;

type Result = {
  success?: boolean;
  error?: string;
  already_registered?: boolean;
  google_invite_sent?: boolean;
  campaign?: { meet_link?: string | null };
};

/** Client-side mirror of the checks in app/api/demo/register/route.ts. */
function validate(d: Record<Field, string>): Errors {
  const e: Errors = {};
  if (!d.first_name.trim()) e.first_name = "Enter your first name.";
  if (!d.last_name.trim()) e.last_name = "Enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Enter a valid email address.";
  const digits = d.mobile.replace(/\D/g, "").length;
  if (!/^[+\d\s().-]+$/.test(d.mobile.trim()) || digits < 7 || digits > 15) e.mobile = "Enter a valid phone number.";
  if (!d.experience_level) e.experience_level = "Choose one.";
  return e;
}

/** When the session runs, in the viewer's time zone. Rendered after mount so the server's zone never shows. */
export function SessionTime({ at }: { at: string }) {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => setText(`${fmtDate(at)} · ${fmtTime(at)}`), [at]);
  return <>{text ?? " "}</>;
}

export default function DemoRegistrationForm({ campaign }: { campaign: Campaign }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [result, setResult] = useState<Result | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");
    const fields = {
      first_name: get("first_name"),
      last_name: get("last_name"),
      email: get("email"),
      mobile: get("mobile"),
      experience_level: get("experience_level"),
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
      const res = await fetch("/api/demo/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          campaign_slug: campaign.slug,
          company_website: get("company_website"),
        }),
      });
      const body: Result = await res.json().catch(() => ({}));
      setResult(body);
      if (!body.success) throw new Error(body.error);
      try {
        localStorage.setItem(REGISTERED_KEY, "1");
      } catch {
        /* ignore */
      }
      setState("done");
    } catch {
      setState("failed");
    } finally {
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  if (state === "done") {
    const meet = result?.campaign?.meet_link ?? campaign.meet_link;
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className={styles.form}>
        <h2 className="h4">{result?.already_registered ? "You're already registered" : "You're registered"}</h2>
        <p>
          {campaign.title} · <SessionTime at={campaign.demo_datetime} />
        </p>
        <p className={styles.hint}>
          {result?.google_invite_sent || result?.already_registered
            ? "A Google Calendar invite with the joining link is on its way to your email."
            : "We'll email you the joining link before the session."}
        </p>
        {meet && (
          <a className="btn btn--primary" href={meet} target="_blank" rel="noopener noreferrer">
            Save the Google Meet link
          </a>
        )}
      </div>
    );
  }

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
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <h2 className="h4">Register for the free demo</h2>

      <div className={`${styles.row} ${styles["row--2"]}`}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("first_name")}>
            First name
          </label>
          <input className={styles.control} id={id("first_name")} name="first_name" autoComplete="given-name" {...aria("first_name")} />
          {err("first_name")}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("last_name")}>
            Last name
          </label>
          <input className={styles.control} id={id("last_name")} name="last_name" autoComplete="family-name" {...aria("last_name")} />
          {err("last_name")}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={id("email")}>
          Email address
        </label>
        <input className={styles.control} id={id("email")} name="email" type="email" autoComplete="email" {...aria("email")} />
        <p className={styles.hint}>The Google Meet invite is sent here.</p>
        {err("email")}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={id("mobile")}>
          Phone
        </label>
        <input
          className={styles.control}
          id={id("mobile")}
          name="mobile"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(555) 000-0000"
          {...aria("mobile")}
        />
        {err("mobile")}
      </div>

      <fieldset className={styles.field} style={{ border: 0, padding: 0, margin: 0 }} {...aria("experience_level")}>
        <legend className={styles.label}>I am</legend>
        <div style={{ display: "flex", gap: 20, marginTop: 7 }}>
          <label className={styles.consent}>
            <input type="radio" name="experience_level" value="fresher" /> A fresher
          </label>
          <label className={styles.consent}>
            <input type="radio" name="experience_level" value="experienced" /> Experienced
          </label>
        </div>
        {err("experience_level")}
      </fieldset>

      {/* Honeypot - visually and programmatically hidden from real users. */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor={id("company_website")}>Company website</label>
        <input id={id("company_website")} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn--primary" disabled={state === "sending"}>
        {state === "sending" ? "Registering..." : "Register for free"}
      </button>

      {state === "failed" && (
        <div ref={statusRef} tabIndex={-1} role="status" className={styles.status} data-tone="error">
          {result?.error ?? "Something went wrong. Please check your connection and try again."}
        </div>
      )}
    </form>
  );
}
