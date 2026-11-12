/**
 * Course and internship pricing.
 *
 * SOURCE OF THESE NUMBERS
 * -----------------------
 * Two kinds of figure live here, and the difference matters.
 *
 * A `usd` fee is a US price set for this market directly. Nothing is derived
 * from it and no conversion touches it.
 *
 * An `inr` fee is the fee published on tungabadranetworks.in, read from that
 * course's page there, converted here. Those pages quote a base fee plus a
 * statutory tax component and print the combined total; `TAX_MULTIPLIER`
 * reproduces that total exactly - checked against the totals those pages
 * publish, e.g. 18,000 -> 21,240 for CCNP and 49,000 -> 57,820 for CCNA
 * Automation. The USD price is that final total converted, so the buyer sees
 * the all-in figure with nothing added at checkout.
 *
 * Where the India page shows a struck-through "was" price, `wasInr` carries it
 * so the discount shown is the real one rather than an invented one.
 *
 * CHECKOUT CHARGES SEPARATELY
 * ---------------------------
 * These figures are what this site advertises. The money is taken by the LMS
 * (tblearn.com), which holds its own catalogue, so a price changed here is NOT
 * changed at checkout. Both have to move together or the buyer is quoted one
 * figure and charged another.
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

/**
 * A published fee.
 *
 * Courses are published in rupees on the India site and converted here.
 * The internships are published directly in US dollars, so they carry a
 * `usd` figure and skip the conversion entirely - running a dollar price
 * through the rupee maths would invent a number nobody published.
 */
type Fee = { inr: number; wasInr?: number } | { usd: number; wasUsd?: number };

export const COURSE_FEES: Record<string, Fee> = {
  "cloud-lab-access": { inr: 3000, wasInr: 5000 },
  // Priced for the US market directly, so no struck-through "was" price: the
  // old India-derived figures were all LOWER than these, and showing one would
  // present a price rise as a discount.
  "aws-cloud-practitioner": { usd: 120 },
  "linux-for-network-engineers": { usd: 120 },
  "aruba-certified-associate": { usd: 150 },
  "juniper-jncia": { usd: 150 },
  "python-for-network-automation": { inr: 11000 },
  "palo-alto-ngfw": { usd: 220 },
  "real-time-automation-projects": { inr: 15000 },
  "ccna-advanced-training": { usd: 220 },
  "ccnp-enterprise-service-provider": { usd: 350 },
  "real-time-networking-projects": { inr: 22000 },
  "cisco-devnet-network-automation": { inr: 49000 },
};

/**
 * Internship fees, published directly in US dollars.
 *
 * The bundle is the only one with a struck-through price: the three tracks
 * bought separately come to more than the bundle costs.
 */
export const INTERNSHIP_FEES: Record<string, Fee> = {
  "enterprise-networking-internship": { usd: 1199 },
  "data-center-networking-internship": { usd: 1499 },
  "data-center-automation-internship": { usd: 1799 },
  "elite-career-path-bundle": { usd: 2299, wasUsd: 2999 },
};

/* ------------------------------ derived -------------------------------- */

export type Price = {
  /** The base India fee this was converted from, where there was one. */
  inr?: number;
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
  if (!fee) return null;

  if ("usd" in fee) {
    return {
      usd: fee.usd,
      wasUsd: fee.wasUsd,
      discountPct: fee.wasUsd ? Math.round((1 - fee.usd / fee.wasUsd) * 100) : undefined,
    };
  }

  if (INR_PER_USD <= 0) return null;
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
  ...Object.values(COURSE_FEES).map((f) => ("usd" in f ? f.usd : toUsd(f.inr))),
);
