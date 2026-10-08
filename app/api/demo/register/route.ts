import { NextResponse } from "next/server";
import { esc, notifySlack } from "@/lib/slack";
import { fetchIn, US_BRANCH } from "@/lib/demo";

/**
 * Demo registration, forwarded to the .in backend.
 *
 * The .in route is the system of record: it checks seats, de-duplicates by
 * email, writes the lead and the registration, and sends the calendar invite.
 * This handler adds the honeypot, pins the branch so US leads are
 * recognisable there, and pings Slack like every other form on this site.
 */

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

type InResponse = {
  success?: boolean;
  error?: string;
  already_registered?: boolean;
  google_invite_sent?: boolean;
  campaign?: { title?: string; demo_datetime?: string; meet_link?: string | null };
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: silently accept so bots do not learn they were caught.
  if (str(body.company_website, 200)) return NextResponse.json({ success: true });

  const data = {
    campaign_slug: str(body.campaign_slug, 120),
    first_name: str(body.first_name, 60),
    last_name: str(body.last_name, 60),
    email: str(body.email, 254).toLowerCase(),
    mobile: str(body.mobile, 30),
    branch: US_BRANCH,
    experience_level: str(body.experience_level, 20),
  };

  const digits = data.mobile.replace(/\D/g, "").length;
  if (
    !data.campaign_slug ||
    !data.first_name ||
    !data.last_name ||
    !EMAIL.test(data.email) ||
    digits < 7 ||
    digits > 15 ||
    !["fresher", "experienced"].includes(data.experience_level)
  ) {
    return NextResponse.json({ success: false, error: "Please fill in every field correctly." }, { status: 422 });
  }

  const res = await fetchIn<InResponse>("/api/demo/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res) {
    console.error("[demo] REGISTRATION NOT RECORDED, recover from this line", { at: new Date().toISOString(), ...data });
    return NextResponse.json(
      { success: false, error: "We could not record your registration. Please try again in a minute." },
      { status: 502 },
    );
  }

  if (res.body?.success && !res.body.already_registered) {
    await notifySlack(`🎓 Demo registration (US) · ${esc(res.body.campaign?.title ?? data.campaign_slug)}`, [
      `*${esc(`${data.first_name} ${data.last_name}`)}* · ${esc(data.email)} · ${esc(data.mobile)}`,
      `Experience: ${data.experience_level}`,
      res.body.google_invite_sent ? null : "⚠️ Calendar invite not sent — add them manually in the .in admin.",
    ]);
  }

  return NextResponse.json(res.body, { status: res.status });
}
