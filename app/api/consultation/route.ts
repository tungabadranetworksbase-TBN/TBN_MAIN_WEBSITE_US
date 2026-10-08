import { NextResponse } from "next/server";
import { esc, notifySlack } from "@/lib/slack";
import { fetchIn } from "@/lib/demo";

/**
 * Book a Consultation requests.
 *
 * Stored in the .in backend, which shows them under Consultations in its
 * admin panel, then posted to Slack. Validated here as well as in the browser,
 * because this is the trust boundary.
 */

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const TYPES: Record<string, string> = { course: "About a course", one_on_one: "1:1 discussion", other: "Something else" };

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: silently accept so bots do not learn they were caught.
  if (str(body.company_website, 200)) return NextResponse.json({ ok: true });

  const data = {
    consultation_type: str(body.consultation_type, 20),
    country: str(body.country, 80),
    available_time: str(body.available_time, 200),
    name: str(body.name, 100),
    email: str(body.email, 254).toLowerCase(),
    phone: str(body.phone, 30),
    requirement: str(body.requirement, 2000),
    source_page: str(body.source_page, 300),
    site: "us",
  };

  const digits = data.phone.replace(/\D/g, "").length;
  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Enter your full name.";
  if (!EMAIL.test(data.email)) errors.email = "Enter a valid email address.";
  if (!/^[+\d\s().-]+$/.test(data.phone) || digits < 7 || digits > 15) errors.phone = "Enter a valid phone number.";
  if (!TYPES[data.consultation_type]) errors.consultation_type = "Choose what you would like to discuss.";
  if (!data.country) errors.country = "Choose your country.";
  if (!data.available_time) errors.window = "Pick a day and time window.";
  if (data.requirement.length < 5) errors.requirement = "Tell us a little about what you need.";
  // The .in backend rejects markup outright; say so here rather than after a round trip.
  for (const k of ["name", "requirement", "country", "available_time"] as const) if (/[<>]/.test(data[k])) errors[k] = "Please remove < and > characters.";
  if (Object.keys(errors).length > 0) return NextResponse.json({ errors }, { status: 422 });

  const res = await fetchIn<{ success?: boolean; error?: string }>("/api/consultations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const stored = Boolean(res?.body?.success);

  // Awaited for the same reason as the contact route: a serverless function
  // can be frozen the moment it returns.
  await notifySlack(`📅 Consultation request · ${TYPES[data.consultation_type]} · ${esc(data.name)}`, [
    `*${esc(data.name)}* · ${esc(data.email)} · ${esc(data.phone)}`,
    `Type: ${TYPES[data.consultation_type]} · Country: ${esc(data.country)}`,
    `Available: ${esc(data.available_time)}`,
    data.source_page ? `From: \`${esc(data.source_page)}\`` : null,
    stored ? null : "⚠️ *Not saved in the admin panel* — recover from this message or the logs.",
    "",
    `>${esc(data.requirement).replace(/\n/g, "\n>")}`,
  ]);

  if (!stored) {
    console.error("[consultation] NOT STORED, recover from this line", {
      at: new Date().toISOString(),
      status: res?.status,
      error: res?.body?.error,
      ...data,
    });
    return NextResponse.json(
      { error: "We could not record your request. Please email or call us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
