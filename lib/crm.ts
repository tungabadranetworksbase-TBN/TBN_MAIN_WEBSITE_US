/**
 * SMS 2.0 intake client.
 *
 * SMS 2.0 is becoming the single CRM: leads, follow-ups, campaigns and batches
 * all live there. This site writes to it instead of the .in backend and
 * Chatwoot, but the switch is staged rather than cut over.
 *
 *   CRM_BACKEND=in   (default) every route behaves exactly as it does today.
 *   CRM_BACKEND=sms            the same routes talk to SMS 2.0 instead.
 *
 * Defaulting to "in" means deploying this change alters nothing until the
 * variable is set, and setting it back is the whole rollback.
 *
 * Config, none of which belongs in a commit:
 *   SMS_INTAKE_URL   https://api.tungabadranetworks.in/api/intake in production
 *   SMS_SITE_KEY     SMS 2.0 -> Developer -> Integrations -> Website intake
 *                    keys, code "us". A secret: it authorises writes.
 */

/** Which backend the lead routes talk to. Anything but "sms" means today's behaviour. */
export const crmBackend = (): "sms" | "in" =>
  (process.env.CRM_BACKEND ?? "in").trim().toLowerCase() === "sms" ? "sms" : "in";

export const usingSms = () => crmBackend() === "sms";

const base = () => (process.env.SMS_INTAKE_URL ?? "").replace(/\/+$/, "");

/** SMS 2.0 wraps everything in this envelope. */
export type SmsEnvelope<T> = {
  success?: boolean;
  data?: T;
  error?: { code?: string; message?: string };
};

export type SmsResult<T> = {
  /** HTTP status, or 0 when the request never completed. */
  status: number;
  ok: boolean;
  data?: T;
  /** Set when the envelope reported a failure, or the call did not complete. */
  error?: { code?: string; message?: string };
};

/**
 * One call to SMS 2.0. Never throws.
 *
 * A network failure, a timeout and a 500 all resolve to `ok: false` with a
 * status, so each route decides what the visitor sees rather than having an
 * exception decide for it.
 *
 * @param idempotencyKey Sent as `Idempotency-Key` so a retried submission does
 *   not create a second lead. Optional in the contract; always sent for writes
 *   here, because every write path is one a visitor can double-submit.
 */
export async function smsCall<T>(
  path: string,
  init: RequestInit & { idempotencyKey?: string; next?: { revalidate?: number } } = {},
): Promise<SmsResult<T>> {
  const url = base();
  const key = process.env.SMS_SITE_KEY;

  if (!url || !key) {
    console.error("[crm] SMS_INTAKE_URL or SMS_SITE_KEY is not set while CRM_BACKEND=sms");
    return { status: 0, ok: false, error: { code: "unconfigured", message: "CRM is not configured." } };
  }

  const { idempotencyKey, ...rest } = init;
  try {
    const res = await fetch(`${url}${path}`, {
      ...rest,
      headers: {
        ...(rest.body ? { "Content-Type": "application/json" } : {}),
        "x-site-key": key,
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
        ...(rest.headers ?? {}),
      },
      signal: AbortSignal.timeout(10_000),
    });

    let body: SmsEnvelope<T> | undefined;
    try {
      body = (await res.json()) as SmsEnvelope<T>;
    } catch {
      // A non-JSON body is itself the failure; the status still tells us what
      // happened, so fall through rather than throwing.
    }

    const ok = res.ok && body?.success !== false;
    if (!ok) {
      console.error("[crm] SMS 2.0 refused", {
        path,
        status: res.status,
        code: body?.error?.code,
        message: body?.error?.message?.slice(0, 200),
      });
    }
    return { status: res.status, ok, data: body?.data, error: body?.error };
  } catch (err) {
    // Never reached SMS 2.0: DNS, TLS, a timeout, or a firewall. Worth naming,
    // because from the outside it looks identical to a rejection.
    console.error("[crm] SMS 2.0 unreachable", {
      path,
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    });
    return { status: 0, ok: false, error: { code: "unreachable", message: "CRM unreachable." } };
  }
}

/**
 * A stable key for one logical submission.
 *
 * Derived from the payload rather than random, so the retry a visitor causes
 * by double-clicking carries the same key as the first attempt. Hashed so no
 * email address travels in a header.
 */
export async function idempotencyKey(kind: string, parts: (string | undefined)[]) {
  const seed = [kind, ...parts.filter(Boolean)].join("|");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(seed));
  return `${kind}-${Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")}`;
}

/**
 * Phone format required by SMS 2.0 intake.
 *
 * A leading "+" or digit, then 6 to 20 digits, spaces, parentheses, dots or
 * hyphens. The dot was added on the SMS side after this site pointed out that
 * rejecting it would invalidate numbers already stored in the .in records.
 *
 * Note this counts characters, not digits, where the old check on this site
 * counted 7 to 15 digits. A short number with spacing can therefore pass the
 * length test here and still not be dialable.
 */
export const SMS_PHONE = /^[+\d][\d\s().-]{6,20}$/;

/**
 * The consent wording shown beside the checkbox, stored with the lead.
 *
 * SMS 2.0 has no consent column, so it travels as metadata.consent plus
 * metadata.consent_text and shows under "Form answers" on the lead. Keeping
 * the exact wording matters: consent is only meaningful alongside what the
 * person was actually shown.
 */
export const CONSENT_TEXT =
  "I agree to be contacted about this inquiry and have read the Privacy Policy.";
