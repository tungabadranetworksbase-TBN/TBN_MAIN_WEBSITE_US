/**
 * Free demo campaigns, served by the .in site's backend.
 *
 * Campaigns, registrations, seat limits and the Google Calendar invite all
 * live in the .in app and its Supabase project - this site holds no copy. The
 * .in API sends no CORS headers, so the browser never calls it directly: our
 * own route handlers under app/api/demo proxy it server-to-server.
 *
 * Only campaigns whose `audience` is "us" or "both" are shown here. The .in
 * admin sets that per campaign.
 */

export const IN_API = (process.env.TBN_IN_API_URL ?? "https://www.tungabadranetworks.in").replace(/\/+$/, "");

/** localStorage keys, shared with the .in site's popup so behaviour matches. */
export const SEEN_KEY = "tbn_demo_popup_seen";
export const REGISTERED_KEY = "tbn_demo_registered";

/** Sent as the `branch` on every registration, which is how US leads are told apart in the .in admin. */
export const US_BRANCH = "Online (USA)";

export type Campaign = {
  slug: string;
  title: string;
  description?: string | null;
  course_name: string;
  trainer_name: string;
  demo_datetime: string;
  meet_link?: string | null;
  banner_url?: string | null;
  status?: string | null;
  classes_start_date?: string | null;
  audience?: string | null;
};

export const isForUs = (c: Campaign) => c.audience === "us" || c.audience === "both";

/**
 * A demo's start as an instant. The .in API stores UTC and normally sends an
 * offset ("...+00:00" or "...Z"); a value without one is read as UTC too,
 * because `new Date()` would otherwise take it as the viewer's local time and
 * move the session by their whole UTC offset.
 */
export const demoTime = (dt: string) =>
  new Date(/(?:[zZ]|[+-]\d{2}:?\d{2})$/.test(dt.trim()) ? dt : `${dt.trim().replace(" ", "T")}Z`);

/** Same rule as the .in site: closed once the demo time has passed or it is no longer active. */
export function isRegistrationClosed(c: Campaign) {
  if (c.status && c.status !== "active") return true;
  const t = demoTime(c.demo_datetime).getTime();
  return Number.isFinite(t) && t < Date.now();
}

/**
 * In the viewer's own time zone (the browser's), always in US English so a
 * visitor gets "Thu, Oct 30" and "6:00 AM PDT" whatever language their browser
 * is set to; other locales print "18:00" and "GMT-7". Call from the browser,
 * not on the server, whose zone is UTC.
 */
export const fmtDate = (dt: string) =>
  new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(demoTime(dt));

export const fmtTime = (dt: string) =>
  new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZoneName: "short" }).format(
    demoTime(dt),
  );

/** A date-only "YYYY-MM-DD" is read as local midnight so the day does not shift. */
export function fmtClassesStart(date?: string | null) {
  if (!date) return null;
  const d = new Date(date.length <= 10 ? `${date}T00:00:00` : date);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(d);
}

/** Fetches from the .in API. Never throws; resolves to null on any failure. */
export async function fetchIn<T>(path: string, init?: RequestInit & { next?: { revalidate?: number } }) {
  try {
    const res = await fetch(`${IN_API}${path}`, { ...init, signal: AbortSignal.timeout(8000) });
    return { status: res.status, body: (await res.json()) as T };
  } catch (err) {
    console.error("[demo] .in API unreachable", {
      path,
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    });
    return null;
  }
}

/** Accent per course family, the same mapping as the .in site. Brand gold for anything else. */
export function courseColor(name: string) {
  const n = name.toUpperCase();
  if (/PALO ?ALTO|PALALTO|NGFW|PA-220/.test(n)) return "#dc2626";
  if (n.includes("CCNA")) return "#2563eb";
  if (n.includes("CCNP")) return "#4f46e5";
  if (n.includes("JNCIA")) return "#059669";
  return "#fcc000";
}

export const initials = (name: string) =>
  name
    .replace(/^(Mr|Ms|Mrs|Dr)\.?\s*/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

let pending: Promise<Campaign[]> | undefined;
/** The US campaign list, fetched once per page load and shared by the popup, hero and homepage section. Browser only. */
export function loadCampaigns() {
  pending ??= fetch("/api/demo/campaigns")
    .then((r) => r.json())
    .then((res: { data?: Campaign[] }) => (Array.isArray(res?.data) ? res.data : []))
    .catch(() => []);
  return pending;
}
