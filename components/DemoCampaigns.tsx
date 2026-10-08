"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  type Campaign,
  courseColor,
  fmtClassesStart,
  fmtDate,
  fmtTime,
  isRegistrationClosed,
  loadCampaigns,
} from "@/lib/demo";
import { site } from "@/lib/site";

/**
 * The upcoming free demo sessions, ported from the .in homepage: the compact
 * rows under the hero CTAs (HeroCampaignSlot there) and the full-width
 * "Upcoming free demo classes" section further down (DemoCampaignSection).
 * Both render nothing until there is a US campaign.
 */

function countdown(ms: number) {
  if (ms <= 0) return "Started";
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (h >= 48) return `${Math.floor(h / 24)}d ${h % 24}h`;
  if (h >= 1) return `${h}h ${m}m`;
  return `${m}m ${Math.floor((ms % 60_000) / 1000)}s`;
}

/** The campaigns plus a one-second clock. `now` stays 0 until mounted, so nothing time-based renders on the server. */
function useCampaigns(limit?: number) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [now, setNow] = useState(0);
  useEffect(() => {
    loadCampaigns().then((c) => setCampaigns(limit ? c.slice(0, limit) : c));
  }, [limit]);
  useEffect(() => {
    if (campaigns.length === 0) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [campaigns.length]);
  return { campaigns: now ? campaigns : [], now };
}

const mono = "font-[family-name:var(--font-geist-mono)]";

function Row({ c, now, full }: { c: Campaign; now: number; full?: boolean }) {
  const closed = isRegistrationClosed(c);
  const left = new Date(c.demo_datetime).getTime() - now;
  const urgent = !closed && left > 0 && left < 86_400_000;
  const starts = fmtClassesStart(c.classes_start_date);
  const color = courseColor(c.course_name);

  return (
    <div
      className={`group flex items-stretch overflow-hidden rounded-[12px] border bg-[rgba(255,255,255,0.03)] backdrop-blur-sm transition-colors ${
        urgent
          ? "border-[#f87171] ring-1 ring-[#f87171] motion-safe:animate-pulse"
          : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(252,192,0,0.4)]"
      }`}
    >
      {/* Course accent bar */}
      <span aria-hidden className={`shrink-0 ${full ? "w-1.5" : "w-1"}`} style={{ background: color }} />

      <div className={`flex min-w-0 flex-1 items-center gap-3 ${full ? "py-3 pl-3 pr-3" : "py-2.5 pl-2.5 pr-2.5"}`}>
        <span
          className={`${mono} hidden shrink-0 rounded-[8px] px-2 py-0.5 font-semibold uppercase tracking-[0.06em] text-white sm:inline ${full ? "text-[11px]" : "text-[10px]"}`}
          style={{ background: color, color: color === "#fcc000" ? "#08080a" : "#fff" }}
        >
          {c.course_name}
        </span>

        <div className="min-w-0 flex-1">
          <p className={`truncate font-semibold leading-tight text-white ${full ? "text-[15px]" : "text-[13px]"}`}>{c.title}</p>
          <p className={`mt-0.5 truncate text-[rgba(255,255,255,0.6)] ${full ? "text-[12px]" : "text-[11px]"}`}>
            {closed && starts
              ? `Classes start ${starts}`
              : full
                ? `by ${c.trainer_name}`
                : `${fmtDate(c.demo_datetime)} · ${fmtTime(c.demo_datetime)}`}
          </p>
        </div>

        {full && !closed && (
          <div className="hidden shrink-0 flex-col items-end border-l border-[rgba(255,255,255,0.08)] pl-4 text-[12px] md:flex">
            <span className="font-semibold text-white">{fmtDate(c.demo_datetime)}</span>
            <span className="text-[rgba(255,255,255,0.6)]">{fmtTime(c.demo_datetime)}</span>
          </div>
        )}
        {full && !closed && c.meet_link && (
          <span className="hidden shrink-0 items-center gap-1.5 border-l border-[rgba(255,255,255,0.08)] pl-4 text-[11px] text-[rgba(255,255,255,0.6)] lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" /> Online
          </span>
        )}

        <div className="flex shrink-0 flex-col items-end gap-1">
          {closed ? (
            <span className="rounded-full border border-[rgba(252,192,0,0.35)] px-2 py-0.5 text-[10px] font-semibold text-[#fcc000]">
              Demo closed
            </span>
          ) : (
            left > 0 && (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums ${
                  urgent ? "bg-[rgba(248,113,113,0.15)] text-[#fca5a5]" : "text-[rgba(255,255,255,0.55)]"
                }`}
              >
                {countdown(left)}
              </span>
            )
          )}
          {closed ? (
            <a
              href={site.contact.enroll}
              className="rounded-[8px] bg-[#fcc000] px-3 py-1.5 text-[12px] font-semibold text-[#08080a] transition-colors hover:bg-[#fcd80c]"
            >
              Enroll
            </a>
          ) : (
            <Link
              href={`/demo/${c.slug}`}
              className="rounded-[8px] bg-[#fcc000] px-3 py-1.5 text-[12px] font-semibold text-[#08080a] transition-colors hover:bg-[#fcd80c]"
            >
              Register free
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/** Up to three sessions under the hero CTAs. */
export function HeroDemoSlot() {
  const { campaigns, now } = useCampaigns(3);
  if (campaigns.length === 0) return null;
  return (
    <div className="flex w-full max-w-[540px] flex-col gap-2 text-left">
      <p className="flex items-center gap-2 text-[11px]">
        <span className={`${mono} uppercase tracking-[0.08em] text-[#fcc000]`}>Free demo classes</span>
        <span className="text-[rgba(255,255,255,0.5)]">No cost · times in your time zone</span>
      </p>
      {campaigns.map((c) => (
        <Row key={c.slug} c={c} now={now} />
      ))}
    </div>
  );
}

/** Every session, as its own homepage section. */
export function DemoSessionsSection() {
  const { campaigns, now } = useCampaigns();
  if (campaigns.length === 0) return null;
  return (
    <section className="section section--tight shell" aria-labelledby="demos-h">
      <p className={`${mono} text-[12px] uppercase tracking-[0.08em] text-[#fcc000]`}>Live sessions</p>
      <h2 className="d2" id="demos-h" style={{ marginTop: 8 }}>
        Upcoming free demo classes
      </h2>
      <p className="lede" style={{ marginTop: 12 }}>
        Sit in on a live session before you enroll. No cost, no commitment. Times are shown in your time zone.
      </p>
      <div className="mt-8 flex flex-col gap-2.5">
        {campaigns.map((c) => (
          <Row key={c.slug} c={c} now={now} full />
        ))}
      </div>
    </section>
  );
}
