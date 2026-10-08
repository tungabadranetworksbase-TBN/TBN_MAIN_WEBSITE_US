"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type Campaign, fmtClassesStart, fmtDate, fmtTime, isRegistrationClosed } from "@/lib/demo";
import { site } from "@/lib/site";

/**
 * Up to three upcoming free demo sessions under the hero CTAs, ported from the
 * .in homepage's HeroCampaignSlot. Renders nothing until there is a US
 * campaign, so the hero is unchanged the rest of the time.
 */

function countdown(ms: number) {
  if (ms <= 0) return "Started";
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (h >= 48) return `${Math.floor(h / 24)}d ${h % 24}h`;
  if (h >= 1) return `${h}h ${m}m`;
  return `${m}m ${Math.floor((ms % 60_000) / 1000)}s`;
}

export default function HeroDemoSlot({ className = "" }: { className?: string }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [now, setNow] = useState(0);

  useEffect(() => {
    fetch("/api/demo/campaigns")
      .then((r) => r.json())
      .then((res: { data?: Campaign[] }) => setCampaigns(Array.isArray(res?.data) ? res.data.slice(0, 3) : []))
      .catch(() => {});
  }, []);

  // One clock for every row's countdown.
  useEffect(() => {
    if (campaigns.length === 0) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [campaigns.length]);

  if (campaigns.length === 0 || now === 0) return null;

  return (
    <div className={`flex w-full max-w-[520px] flex-col gap-2 text-left ${className}`}>
      <p className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.08em] text-[#fcc000]">
        Free demo classes · times in your time zone
      </p>
      {campaigns.map((c) => {
        const closed = isRegistrationClosed(c);
        const left = new Date(c.demo_datetime).getTime() - now;
        const urgent = !closed && left > 0 && left < 86_400_000;
        const starts = fmtClassesStart(c.classes_start_date);
        return (
          <div
            key={c.slug}
            className={`flex items-center gap-3 rounded-[12px] border bg-[rgba(255,255,255,0.03)] py-2.5 pl-3 pr-2.5 backdrop-blur-sm transition-colors ${
              urgent ? "border-[#fcc000]" : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(252,192,0,0.4)]"
            }`}
          >
            <span className="hidden shrink-0 rounded-[8px] bg-[#fcc000] px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[10px] font-semibold uppercase tracking-[0.06em] text-[#08080a] sm:inline">
              {c.course_name}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold leading-tight text-white">{c.title}</p>
              <p className="mt-0.5 truncate text-[11px] text-[rgba(255,255,255,0.6)]">
                {closed
                  ? starts
                    ? `Classes start ${starts}`
                    : "Demo closed"
                  : `${fmtDate(c.demo_datetime)} · ${fmtTime(c.demo_datetime)}`}
              </p>
            </div>
            {!closed && left > 0 && (
              <span
                className={`hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold sm:inline ${
                  urgent ? "bg-[rgba(252,192,0,0.14)] text-[#fcc000]" : "text-[rgba(255,255,255,0.55)]"
                }`}
              >
                {countdown(left)}
              </span>
            )}
            {closed ? (
              <a
                href={site.contact.enroll}
                className="shrink-0 rounded-[8px] border border-[rgba(255,255,255,0.16)] px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:border-[#fcc000] hover:text-[#fcc000]"
              >
                Enroll
              </a>
            ) : (
              <Link
                href={`/demo/${c.slug}`}
                className="shrink-0 rounded-[8px] bg-[#fcc000] px-3 py-1.5 text-[12px] font-semibold text-[#08080a] transition-colors hover:bg-[#fcd80c]"
              >
                Register free
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
