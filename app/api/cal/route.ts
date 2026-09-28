import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { esc, notifySlack } from "@/lib/slack";

/**
 * Cal.com webhook receiver.
 *
 * Posts to Slack when a consultation call is booked or cancelled, so the two
 * things worth acting on - a call to prepare for, and a freed slot - are seen
 * without anyone watching Cal's own email.
 *
 * Set up in Cal: Settings -> Developer -> Webhooks -> New.
 *   Subscriber URL  https://www.tungabadranetworks.us/api/cal
 *   Events          BOOKING_CREATED, BOOKING_CANCELLED
 *   Secret          the same string as CAL_WEBHOOK_SECRET
 *
 * This endpoint is public and unauthenticated, so the signature check is not
 * optional: without it, anyone who learns the URL can post whatever they like
 * into the channel.
 */

export const runtime = "nodejs";

/** Cal sends the HMAC in this header, hex encoded. */
const SIG_HEADER = "x-cal-signature-256";

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    // Deliberately not "accept it unverified". An open endpoint that posts to
    // Slack is a spam relay, so refuse until it can be checked.
    console.error("[cal] CAL_WEBHOOK_SECRET is not set; refusing the delivery");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  // The HMAC is over the raw bytes, and request.json() discards them, so the
  // body has to be read as text first and parsed afterwards.
  const raw = await request.text();
  if (!verify(raw, request.headers.get(SIG_HEADER), secret)) {
    console.warn("[cal] rejected a delivery with a bad or missing signature");
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let event: CalEvent;
  try {
    event = JSON.parse(raw) as CalEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const trigger = event?.triggerEvent;
  const p = event?.payload ?? {};

  // Cal retries anything that is not 2xx, so events we do not act on still
  // have to be acknowledged rather than refused.
  if (trigger !== "BOOKING_CREATED" && trigger !== "BOOKING_CANCELLED") {
    return NextResponse.json({ ok: true, ignored: trigger ?? "unknown" });
  }

  const booked = trigger === "BOOKING_CREATED";
  const who = p.attendees?.[0];
  const zone = p.organizer?.timeZone || who?.timeZone;

  await notifySlack(booked ? "📅 Consultation booked" : "❌ Consultation cancelled", [
    who?.name || who?.email
      ? `*${esc(who.name || "")}*${who.email ? ` · ${esc(who.email)}` : ""}`
      : null,
    p.startTime ? `${booked ? "" : "Was: "}${esc(formatWhen(p.startTime, zone))}` : null,
    p.title ? `${esc(p.title)}` : null,
    booked ? notesOf(p) : p.cancellationReason ? `Reason: ${esc(p.cancellationReason)}` : null,
  ]);

  return NextResponse.json({ ok: true });
}

/* ------------------------------------------------------------------ types */

/**
 * Only the fields used here, all optional.
 *
 * Cal's payload shape is not guaranteed across versions and every read below
 * is defensive on purpose: a missing field should cost a line of the message,
 * never the whole notification. Confirm the real shape with the Ping button
 * on Cal's webhook settings page.
 */
type CalEvent = {
  triggerEvent?: string;
  payload?: {
    title?: string;
    startTime?: string;
    cancellationReason?: string;
    attendees?: { name?: string; email?: string; timeZone?: string }[];
    organizer?: { name?: string; email?: string; timeZone?: string };
    responses?: Record<string, { value?: unknown } | unknown>;
    additionalNotes?: string;
  };
};

/* ---------------------------------------------------------------- helpers */

/** Constant-time compare of the hex HMAC Cal sends against our own. */
function verify(raw: string, header: string | null, secret: string) {
  if (!header) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(header.trim().toLowerCase(), "utf8");
  // timingSafeEqual throws on a length mismatch, which is itself a leak of
  // sorts; check length first and fail the same way either way.
  return a.length === b.length && timingSafeEqual(a, b);
}

/** The booking time in the organizer's zone, with the zone named so nobody
 *  mis-reads it. Falls back to UTC when Cal sends no zone. */
function formatWhen(iso: string, zone?: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const tz = zone || "UTC";
  try {
    // Component options rather than dateStyle/timeStyle: the two sets are
    // mutually exclusive, and combining them with timeZoneName throws for
    // every zone, including UTC.
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
      timeZoneName: "short",
    }).format(d);
  } catch {
    // An unknown zone string from Cal should not lose us the whole message.
    return `${d.toISOString()} (UTC)`;
  }
}

/** Whatever the attendee typed when booking, wherever Cal put it. */
function notesOf(p: NonNullable<CalEvent["payload"]>): string | null {
  const direct = p.additionalNotes;
  if (typeof direct === "string" && direct.trim()) return `>${esc(direct)}`;

  const notes = (p.responses as Record<string, unknown> | undefined)?.notes;
  const value =
    typeof notes === "string"
      ? notes
      : typeof (notes as { value?: unknown })?.value === "string"
        ? ((notes as { value?: string }).value as string)
        : "";

  return value.trim() ? `>${esc(value)}` : null;
}
