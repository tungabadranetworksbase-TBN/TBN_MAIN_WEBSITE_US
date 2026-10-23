import { NextResponse } from "next/server";
import { readCampaigns } from "@/lib/demo";

/**
 * The open demo campaigns flagged for the US, for the site-wide popup.
 *
 * Reads from SMS 2.0 or the .in backend depending on CRM_BACKEND; the
 * difference is handled in readCampaigns. The "us" intake key already filters
 * to us/both, and readCampaigns filters again anyway, because a backend that
 * ignores the scope would otherwise put every India-only campaign on this site.
 *
 * Fails quiet: an empty list just means the popup never opens.
 */
export async function GET() {
  const data = await readCampaigns();
  return NextResponse.json(
    { data },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
  );
}
