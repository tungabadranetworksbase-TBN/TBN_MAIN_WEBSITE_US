import { NextResponse } from "next/server";

/**
 * Inquiry endpoint.
 *
 * Validation runs here as well as in the browser, because the client check is a
 * convenience and this is the trust boundary.
 *
 * EDIT ME: this handler currently validates and logs. Wire the marked section
 * to your email provider, CRM or ticketing system before launch - nothing is
 * persisted or delivered as it stands.
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

  // --- EDIT ME: deliver the inquiry -------------------------------------
  // Replace this log with your provider call, e.g.:
  //   await resend.emails.send({ ... })
  //   await crm.leads.create({ ... })
  console.info("[inquiry]", {
    at: new Date().toISOString(),
    interest: data.interest,
    subject: data.subject,
    email: data.email,
  });
  // ----------------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
