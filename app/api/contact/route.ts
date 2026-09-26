import { NextResponse } from "next/server";

/**
 * Inquiry endpoint.
 *
 * Validation runs here as well as in the browser, because the client check is a
 * convenience and this is the trust boundary.
 *
 * Submissions are delivered into Chatwoot as a real conversation, so they land
 * in the same inbox as the live chat rather than in a separate mailbox.
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
const MAX = { name: 120, email: 254, phone: 40, subject: 200, message: 5000 } as const;

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  subject?: unknown;
  message?: unknown;
  consent?: unknown;
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
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Enter your full name.";
  if (!EMAIL.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.message.length < 10) errors.message = "Message is too short.";
  if (!data.consent) errors.consent = "Consent is required.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const outcome = await deliverToChatwoot(data);

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
      custom_attributes: { interest: data.interest, subject: data.subject },
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
      if (!found.ok) return "failed";
      const hit = (await found.json())?.payload?.[0];
      contactId = hit?.id;
      sourceId = hit?.contact_inboxes?.find(
        (ci: { inbox?: { id?: number } }) => ci?.inbox?.id === Number(inbox),
      )?.source_id;
    } else {
      return "failed";
    }

    if (!contactId) return "failed";

    const convo = await post("/conversations", {
      inbox_id: Number(inbox),
      contact_id: contactId,
      source_id: sourceId,
      status: "open",
      additional_attributes: { interest: data.interest },
    });
    if (!convo.ok) return "failed";
    const conversationId = (await convo.json())?.id;
    if (!conversationId) return "failed";

    // Subject and interest go in the body: Chatwoot messages have no subject.
    const lines = [
      data.subject ? `Topic: ${data.subject}` : null,
      `Interested in: ${data.interest}`,
      data.phone ? `Phone: ${data.phone}` : null,
      "",
      data.message,
    ].filter((line): line is string => line !== null);

    const message = await post(`/conversations/${conversationId}/messages`, {
      content: lines.join("\n"),
      message_type: "incoming",
    });
    return message.ok ? "sent" : "failed";
  } catch {
    // Network error, timeout, or a malformed response. The caller logs the
    // payload, so nothing is lost by not distinguishing them here.
    return "failed";
  }
}
