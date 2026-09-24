"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import styles from "./InquiryForm.module.css";

type Interest = "course" | "internship" | "corporate" | "services" | "other";

const INTERESTS: { value: Interest; label: string }[] = [
  { value: "course", label: "A course" },
  { value: "internship", label: "An internship" },
  { value: "corporate", label: "Corporate training for a team" },
  { value: "services", label: "Technology services" },
  { value: "other", label: "Something else" },
];

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

/** Client-side mirror of the server validation in app/api/contact/route.ts. */
function validate(data: {
  name: string;
  email: string;
  message: string;
  consent: boolean;
}): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim()))
    errors.email = "Enter a valid email address, for example name@example.com.";
  if (data.message.trim().length < 10)
    errors.message = "Tell us a little more, at least 10 characters.";
  if (!data.consent) errors.consent = "Please confirm you agree to be contacted.";
  return errors;
}

export default function InquiryForm({
  defaultInterest = "course",
  defaultSubject = "",
  heading = "Send an inquiry",
}: {
  defaultInterest?: Interest;
  defaultSubject?: string;
  heading?: string;
}) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const statusRef = useRef<HTMLParagraphElement>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      interest: String(fd.get("interest") ?? "other"),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      // Honeypot: real users never fill a hidden field.
      company_website: String(fd.get("company_website") ?? ""),
    };

    const found = validate(payload);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Focus the first invalid field. Selecting by name rather than by
      // [aria-invalid] because React has not re-rendered that attribute yet.
      const order = ["name", "email", "message", "consent"] as const;
      const firstBad = order.find((k) => found[k]);
      if (firstBad) form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      form.reset();
    } catch {
      setState("failed");
    } finally {
      // Announce the outcome to screen readers and move focus to it.
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <h2 className="h4">{heading}</h2>

      <div className={`${styles.row} ${styles["row--2"]}`}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("name")}>
            Full name
          </label>
          <input
            className={styles.control}
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? id("name-error") : undefined}
          />
          {errors.name && (
            <p className={styles.error} id={id("name-error")}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("email")}>
            Email address
          </label>
          <input
            className={styles.control}
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? id("email-error") : undefined}
          />
          {errors.email && (
            <p className={styles.error} id={id("email-error")}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={`${styles.row} ${styles["row--2"]}`}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("phone")}>
            Phone <span className={styles.optional}>(optional)</span>
          </label>
          <input
            className={styles.control}
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(555) 000-0000"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={id("interest")}>
            I&rsquo;m interested in
          </label>
          <select
            className={styles.control}
            id={id("interest")}
            name="interest"
            defaultValue={defaultInterest}
          >
            {INTERESTS.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={id("subject")}>
          Program or topic <span className={styles.optional}>(optional)</span>
        </label>
        <input
          className={styles.control}
          id={id("subject")}
          name="subject"
          type="text"
          defaultValue={defaultSubject}
          placeholder="e.g. AWS Cloud Engineering"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={id("message")}>
          How can we help?
        </label>
        <textarea
          className={styles.control}
          id={id("message")}
          name="message"
          required
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={`${id("message-hint")}${errors.message ? ` ${id("message-error")}` : ""}`}
          placeholder="Your background, what you want to learn, and your timeline."
        />
        <p className={styles.hint} id={id("message-hint")}>
          Telling us your background and timeline helps us point you to the right program.
        </p>
        {errors.message && (
          <p className={styles.error} id={id("message-error")}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot - visually and programmatically hidden from real users. */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor={id("company_website")}>Company website</label>
        <input
          id={id("company_website")}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.consent} htmlFor={id("consent")}>
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            aria-invalid={errors.consent ? "true" : undefined}
            aria-describedby={errors.consent ? id("consent-error") : undefined}
          />
          <span>
            I agree to be contacted about this inquiry and have read the{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </span>
        </label>
        {errors.consent && (
          <p className={styles.error} id={id("consent-error")}>
            {errors.consent}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn--primary" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Send inquiry"}
      </button>

      {/* role="status" announces the result without stealing focus abruptly. */}
      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={state === "sent" || state === "failed" ? styles.status : "visually-hidden"}
        data-tone={state === "sent" ? "ok" : state === "failed" ? "error" : undefined}
      >
        {state === "sent" &&
          "Thank you, your inquiry has been received. We reply to inquiries within one business day."}
        {state === "failed" &&
          "Something went wrong sending your inquiry. Please email us directly and we will pick it up from there."}
      </p>
    </form>
  );
}
