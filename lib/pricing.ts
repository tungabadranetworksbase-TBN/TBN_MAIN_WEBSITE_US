/**
 * Course and internship pricing: India total -> USD.
 *
 * SOURCE OF THESE NUMBERS
 * -----------------------
 * Every figure below is the fee published on tungabadranetworks.in, read from
 * the individual course pages (/courses/ccna, /courses/palo-alto, ...) and the
 * internship page (/internship). They are not estimates.
 *
 * The India pages quote a base fee plus a statutory tax component, and print
 * the combined total. `TAX_MULTIPLIER` reproduces that total exactly - checked
 * against the totals those pages publish, e.g. 18,000 -> 21,240 for CCNP and
 * 49,000 -> 57,820 for DevNet. The USD price is that final total converted, so
 * what a buyer sees here is the all-in figure with nothing added at checkout.
 *
 * Where the India page shows a struck-through "was" price, `wasInr` carries it
 * so the discount shown is the real one rather than an invented one.
 */

import type { Course } from "./courses";
import type { Internship } from "./internships";

/* ----------------------------- edit these ------------------------------- */

/**
 * INR per 1 USD.
 *
 * A published price is a commitment, so this is a rate you set and control
 * rather than a live feed, and it is shown to the buyer with its date.
 * VERIFY THIS BEFORE LAUNCH and re-check it whenever you revise prices.
 */
export const INR_PER_USD = 88;
export const FX_AS_OF = "2026-08-28";

/**
 * Multiplier that turns a published base fee into the published India total.
 * Verified against the totals printed on the course pages themselves.
 */
const TAX_MULTIPLIER = 1.18;

/** Round USD to this granularity, so the output reads as a price. */
const USD_ROUNDING = 5;

/** Base fees exactly as published on the India site, in rupees. */
type Fee = { inr: number; wasInr?: number };

export const COURSE_FEES: Record<string, Fee> = {
  "cloud-lab-access": { inr: 3000, wasInr: 5000 },
  "aws-cloud-practitioner": { inr: 5000 },
  "linux-for-network-engineers": { inr: 7000, wasInr: 9000 },
  "aruba-certified-associate": { inr: 8000, wasInr: 10000 },
  "juniper-jncia": { inr: 8500, wasInr: 10625 },
  "python-for-network-automation": { inr: 11000 },
  "palo-alto-ngfw": { inr: 15000 },
  "real-time-automation-projects": { inr: 15000 },
  "ccna-advanced-training": { inr: 16000 },
  "ccnp-enterprise-service-provider": { inr: 18000 },
  "real-time-networking-projects": { inr: 22000 },
  "cisco-devnet-network-automation": { inr: 49000 },
};

/**
 * Internship fees, from the six priced programmes on /internship.
 *
 * These are the published rupee figures for the programmes themselves, so the
 * mapping is exact - no programme is matched by level or subject any more.
 * The Non-IT to IT Transition page carries no price on the India site and
 * carries none here.
 */
export const INTERNSHIP_FEES: Record<string, Fee> = {
  "network-fresher-internship": { inr: 36000, wasInr: 56050 },
  "devnet-associate-internship": { inr: 51000, wasInr: 83780 },
  "advanced-fresher-internship": { inr: 56000, wasInr: 86730 },
  "it-core-internship": { inr: 57000, wasInr: 99710 },
  "advanced-core-internship": { inr: 70000, wasInr: 126850 },
  "network-automation-internship": { inr: 105000, wasInr: 157530 },
};

/* ------------------------------ derived -------------------------------- */

export type Price = {
  /** The base India fee this was converted from, in rupees. */
  inr: number;
  /** Converted, rounded USD price. */
  usd: number;
  /** Undiscounted USD price, when the India page shows one. */
  wasUsd?: number;
  /** Whole-percent saving, when discounted. */
  discountPct?: number;
};

const toUsd = (inr: number) =>
  Math.round((inr * TAX_MULTIPLIER) / INR_PER_USD / USD_ROUNDING) * USD_ROUNDING;

function build(fee: Fee | undefined): Price | null {
  if (!fee || INR_PER_USD <= 0) return null;
  const usd = toUsd(fee.inr);
  const wasUsd = fee.wasInr ? toUsd(fee.wasInr) : undefined;
  return {
    inr: fee.inr,
    usd,
    wasUsd,
    // Taken from the rupee figures, not the rounded dollars, so the percentage
    // matches what the India page advertises.
    discountPct: fee.wasInr ? Math.round((1 - fee.inr / fee.wasInr) * 100) : undefined,
  };
}

export function priceFor(slug: string): Price | null {
  return build(COURSE_FEES[slug] ?? INTERNSHIP_FEES[slug]);
}

export function coursePrice(course: Pick<Course, "slug">): Price | null {
  return build(COURSE_FEES[course.slug]);
}

export function internshipPrice(internship: Pick<Internship, "slug">): Price | null {
  return build(INTERNSHIP_FEES[internship.slug]);
}

const usdFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatUsd = (n: number) => usdFmt.format(n);

/** Lowest course price, for "from $X" copy. */
export const lowestCourseUsd = Math.min(
  ...Object.values(COURSE_FEES).map((f) => toUsd(f.inr)),
);
