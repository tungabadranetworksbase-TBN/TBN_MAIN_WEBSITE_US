import { NextResponse } from "next/server";
import { esc, notifySlack } from "@/lib/slack";
import { CONSENT_TEXT, SMS_PHONE, idempotencyKey, smsCall, usingSms } from "@/lib/crm";

/**
 * Inquiry endpoint.
 *
 * Validation runs here as well as in the browser, because the client check is a
 * convenience and this is the trust boundary.
 *
 * Where a submission goes depends on CRM_BACKEND.
 *
 *   sms  SMS 2.0 is the record. Chatwoot is attempted afterwards as a
 *        best-effort copy and can never fail the request - once SMS 2.0 is
 *        the single CRM, a Chatwoot outage must not turn a captured lead into
 *        an error for the person who filled the form in.
 *   in   (default) Chatwoot is the record, exactly as before.
 *
 * Chatwoot can be dropped entirely after go-live by removing its block below.
 *
 * Configure these in .env.local (never commit them - the API token is an agent
 * credential with full access to the account):
 *
 *   CHATWOOT_BASE_URL    https://chat.tungabadranetworks.in
 *   CHATWOOT_API_TOKEN   Profile settings -> Access Token
 *   CHATWOOT_ACCOUNT_ID  the number in /app/accounts/<id>/ in the dashboard
 *   CHATWOOT_INBOX_ID    an API-channel inbox, not the website one
 *
 * With any of them missing the handler still validates and logs, so local
 * development works without credentials.
 */

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 120, email: 254, phone: 40, subject: 200, message: 5000, source: 300 } as const;

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  subject?: unknown;
  message?: unknown;
  consent?: unknown;
  source?: unknown;
  company_website?: unknown;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: silently accept so bots do not learn they were caught.
  if (str(body.company_website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: str(body.name, MAX.name),
    email: str(body.email, MAX.email),
    phone: str(body.phone, MAX.phone),
    interest: str(body.interest, 40) || "other",
    subject: str(body.subject, MAX.subject),
    message: str(body.message, MAX.message),
    consent: body.consent === true,
    source: str(body.source, MAX.source),
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Enter your full name.";
  if (!EMAIL.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.message.length < 10) errors.message = "Message is too short.";
  // Optional here, unlike the other forms, so only checked when given.
  if (data.phone && !SMS_PHONE.test(data.phone)) errors.phone = "Enter a valid phone number.";
  if (!data.consent) errors.consent = "Consent is required.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // SMS 2.0 first when it is the record, so a Chatwoot failure afterwards
  // cannot cost us the lead.
  let smsStored: boolean | null = null;
  if (usingSms()) {
    const res = await smsCall<{ id?: string }>("/contact", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        message: data.message,
        pageUrl: data.source || undefined,
        // The form's "Program or topic" field. SMS 2.0 has no subject, and
        // courseInterest is the nearest thing it does have.
        courseInterest: data.subject || undefined,
        metadata: {
          form: data.interest,
          // SMS 2.0 has no consent column, so the flag and the exact wording
          // shown travel as form answers. Consent only means something
          // alongside what the person was actually asked.
          consent: data.consent,
          consent_text: CONSENT_TEXT,
        },
      }),
      idempotencyKey: await idempotencyKey("contact", [data.email, data.subject, data.source]),
    });
    smsStored = res.ok;
  }

  const outcome = await deliverToChatwoot(data);

  // Every valid submission, whatever Chatwoot did. When Chatwoot refused,
  // this is the only surviving signal that a lead arrived, so it is exactly
  // when the notification matters most. Awaited rather than left to run
  // after the response: a serverless function can be frozen the moment it
  // returns, and an un-awaited call is not reliably delivered.
  await notifySlack(`📩 New enquiry · ${data.interest}`, [
    `*${esc(data.name)}* · ${esc(data.email)}${data.phone ? ` · ${esc(data.phone)}` : ""}`,
    data.subject ? `Topic: ${esc(data.subject)}` : null,
    data.source ? `From: \`${esc(data.source)}\`` : null,
    smsStored === false
      ? "⚠️ *Not recorded in SMS 2.0* — recover from the logs."
      : smsStored === null && outcome === "failed"
        ? "⚠️ *Not recorded in Chatwoot* — recover from the logs."
        : null,
    smsStored === true && outcome === "failed" ? "Chatwoot copy failed; the lead is in SMS 2.0." : null,
    "",
    `>${esc(data.message).replace(/\n/g, "\n>")}`,
  ]);

  if (smsStored !== null) {
    if (!smsStored) {
      console.error("[inquiry] NOT RECORDED IN SMS 2.0, recover from this line", {
        at: new Date().toISOString(),
        chatwootCopy: outcome,
        ...data,
      });
      return NextResponse.json(
        { error: "We could not record your inquiry. Please email us instead." },
        { status: 502 },
      );
    }
    // Stored. A failed Chatwoot copy is logged, never surfaced: it is a copy.
    if (outcome === "failed") {
      console.warn("[inquiry] chatwoot copy failed; the lead is in SMS 2.0", {
        at: new Date().toISOString(),
        email: data.email,
      });
    }
    return NextResponse.json({ ok: true });
  }

  if (outcome === "unconfigured") {
    // No credentials: log that an inquiry arrived, never the message body, and
    // accept it so local development is not blocked.
    console.info("[inquiry] chatwoot not configured", {
      at: new Date().toISOString(),
      interest: data.interest,
      email: data.email,
    });
    return NextResponse.json({ ok: true });
  }

  if (outcome === "failed") {
    // Deliberately not a silent success. A lead that vanishes because Chatwoot
    // was unreachable is worse than telling the visitor to email instead, and
    // the full payload is logged so it can be recovered either way.
    console.error("[inquiry] DELIVERY FAILED, recover from this line", {
      at: new Date().toISOString(),
      ...data,
    });
    return NextResponse.json(
      { error: "We could not record your inquiry. Please email us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

type Inquiry = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  subject: string;
  message: string;
  /** The page the form was submitted from. */
  source: string;
};

/**
 * Creates a contact, a conversation and the first message in Chatwoot.
 *
 * Three calls rather than one, because Chatwoot has no endpoint that takes a
 * whole inquiry. A contact whose email already exists returns 422, which is
 * expected on a second submission from the same person, so that case falls
 * back to a search rather than being treated as a failure.
 */
async function deliverToChatwoot(data: Inquiry): Promise<"sent" | "failed" | "unconfigured"> {
  const base = process.env.CHATWOOT_BASE_URL?.replace(/\/+$/, "");
  const token = process.env.CHATWOOT_API_TOKEN;
  const account = process.env.CHATWOOT_ACCOUNT_ID;
  const inbox = process.env.CHATWOOT_INBOX_ID;
  if (!base || !token || !account || !inbox) return "unconfigured";

  const api = `${base}/api/v1/accounts/${account}`;
  const headers = { "Content-Type": "application/json", api_access_token: token };

  /**
   * Records why Chatwoot refused a step.
   *
   * Without this a failure is indistinguishable from any other - the endpoint
   * returns 502 and the operator has nothing to act on. The body is truncated
   * because Chatwoot errors are short and a full HTML error page is noise.
   */
  const refused = async (step: string, res: Response) => {
    const body = await res.text().catch(() => "");
    console.error("[inquiry] chatwoot refused", {
      step,
      status: res.status,
      body: body.slice(0, 300),
    });
    return "failed" as const;
  };
  const post = (path: string, payload: unknown) =>
    fetch(`${api}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

  try {
    let contactId: number | undefined;
    let sourceId: string | undefined;

    const created = await post("/contacts", {
      inbox_id: Number(inbox),
      name: data.name,
      email: data.email,
      phone_number: data.phone || undefined,
      custom_attributes: {
        interest: data.interest,
        subject: data.subject,
        source_page: data.source,
      },
    });

    if (created.ok) {
      const json = await created.json();
      contactId = json?.payload?.contact?.id ?? json?.payload?.id;
      sourceId = json?.payload?.contact_inbox?.source_id;
    } else if (created.status === 422) {
      // Already known to Chatwoot; find them rather than failing.
      const found = await fetch(`${api}/contacts/search?q=${encodeURIComponent(data.email)}`, {
        headers,
        signal: AbortSignal.timeout(10_000),
      });
      if (!found.ok) return refused("contacts.search", found);
      const hit = (await found.json())?.payload?.[0];
      contactId = hit?.id;
      sourceId = hit?.contact_inboxes?.find(
        (ci: { inbox?: { id?: number } }) => ci?.inbox?.id === Number(inbox),
      )?.source_id;
    } else {
      return refused("contacts.create", created);
    }

    if (!contactId) {
      console.error("[inquiry] chatwoot returned no contact id");
      return "failed";
    }

    const convo = await post("/conversations", {
      inbox_id: Number(inbox),
      contact_id: contactId,
      source_id: sourceId,
      status: "open",
      additional_attributes: { interest: data.interest, source_page: data.source },
    });
    if (!convo.ok) return refused("conversations", convo);
    const conversationId = (await convo.json())?.id;
    if (!conversationId) {
      console.error("[inquiry] chatwoot returned no conversation id");
      return "failed";
    }

    // Subject and interest go in the body: Chatwoot messages have no subject.
    const lines = [
      data.subject ? `Topic: ${data.subject}` : null,
      `Interested in: ${data.interest}`,
      data.phone ? `Phone: ${data.phone}` : null,
      data.source ? `Submitted from: ${data.source}` : null,
      "",
      data.message,
    ].filter((line): line is string => line !== null);

    const message = await post(`/conversations/${conversationId}/messages`, {
      content: lines.join("\n"),
      message_type: "incoming",
    });
    return message.ok ? "sent" : refused("messages", message);
  } catch (err) {
    // Never reached Chatwoot at all: DNS, TLS, a timeout, or a firewall in
    // front of the instance that does not admit Vercel. Worth naming, because
    // it looks identical to a rejected request from the outside.
    console.error("[inquiry] chatwoot unreachable", {
      host: base,
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    });
    return "failed";
  }
}
