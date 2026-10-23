import { NextResponse } from "next/server";
import { esc, notifySlack } from "@/lib/slack";
import { fetchIn, US_BRANCH } from "@/lib/demo";
import { SMS_PHONE, idempotencyKey, smsCall, usingSms } from "@/lib/crm";

/**
 * Demo registration, forwarded to the .in backend.
 *
 * The backend is the system of record: it checks seats, de-duplicates by
 * email, writes the lead and the registration, and sends the calendar invite.
 * CRM_BACKEND selects which. The two take the campaign differently: the .in
 * route wants `campaign_slug` in the body, SMS 2.0 takes it in the path and
 * not in the body at all.
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

  // SMS 2.0's phone rule, applied on both backends so a registration that
  // passes today cannot start failing the moment CRM_BACKEND flips.
  if (
    !data.campaign_slug ||
    !data.first_name ||
    !data.last_name ||
    !EMAIL.test(data.email) ||
    !SMS_PHONE.test(data.mobile) ||
    !["fresher", "experienced"].includes(data.experience_level)
  ) {
    return NextResponse.json({ success: false, error: "Please fill in every field correctly." }, { status: 422 });
  }

  const { campaign_slug, ...withoutSlug } = data;
  let out: InResponse | undefined;
  let status = 200;

  if (usingSms()) {
    const res = await smsCall<InResponse>(
      `/demo-campaigns/${encodeURIComponent(campaign_slug)}/register`,
      {
        method: "POST",
        body: JSON.stringify(withoutSlug),
        idempotencyKey: await idempotencyKey("demo", [campaign_slug, data.email]),
      },
    );

    // 409 is an answer, not a fault: the session closed or filled while the
    // form was open on screen. A retry cannot fix that, so say so instead.
    if (res.status === 409) {
      return NextResponse.json(
        { success: false, error: res.error?.message ?? "This session is now closed or full." },
        { status: 409 },
      );
    }
    if (!res.ok) {
      console.error("[demo] REGISTRATION NOT RECORDED, recover from this line", {
        at: new Date().toISOString(), backend: "sms", status: res.status, code: res.error?.code, ...data,
      });
      return NextResponse.json(
        { success: false, error: "We could not record your registration. Please try again in a minute." },
        { status: 502 },
      );
    }
    out = res.data;
    status = res.status;
  } else {
    const res = await fetchIn<InResponse>("/api/demo/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res) {
      console.error("[demo] REGISTRATION NOT RECORDED, recover from this line", {
        at: new Date().toISOString(), backend: "in", ...data,
      });
      return NextResponse.json(
        { success: false, error: "We could not record your registration. Please try again in a minute." },
        { status: 502 },
      );
    }
    out = res.body;
    status = res.status;
  }

  if (out?.success !== false && !out?.already_registered) {
    await notifySlack(`🎓 Demo registration (US) · ${esc(out?.campaign?.title ?? campaign_slug)}`, [
      `*${esc(`${data.first_name} ${data.last_name}`)}* · ${esc(data.email)} · ${esc(data.mobile)}`,
      `Experience: ${data.experience_level}`,
      out?.google_invite_sent ? null : "⚠️ Calendar invite not sent — add them manually in the admin panel.",
    ]);
  }

  return NextResponse.json(out ?? { success: true }, { status });
}
