import { NextResponse } from "next/server";
import { type Campaign, fetchIn, isForUs } from "@/lib/demo";

/**
 * The open demo campaigns flagged for the US, for the site-wide popup.
 *
 * Fails quiet: an empty list just means the popup never opens.
 */
export async function GET() {
  const res = await fetchIn<{ success?: boolean; data?: Campaign[] }>("/api/campaigns?site=us", {
    next: { revalidate: 60 },
  });
  // Filtered here as well, because a .in deploy that ignores `site` would
  // otherwise put every India-only campaign on this site.
  const data = Array.isArray(res?.body?.data) ? res.body.data.filter(isForUs) : [];
  return NextResponse.json({ data }, { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } });
}
