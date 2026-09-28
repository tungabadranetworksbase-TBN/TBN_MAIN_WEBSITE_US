import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { internships } from "@/lib/internships";
import { formatUsd, internshipPrice } from "@/lib/pricing";
import s from "./pricing.module.css";

/**
 * The four internship tracks, priced side by side.
 *
 * Title, track line and price all come from lib/internships.ts and
 * lib/pricing.ts, so a programme rename or a price change reaches this
 * section without anyone remembering it exists.
 *
 * The bullets below do not. They are what each tier includes as a selling
 * point - the support ladder in particular - which no page other than this
 * one renders, so they live here rather than widening the Internship type
 * with a field only this component reads.
 */
const HIGHLIGHTS: Record<string, string[]> = {
  "enterprise-networking-internship": [
    "10 courses, CCNA through CCNP ENCOR",
    "Wireless, firewall and hybrid cloud",
    "Monitoring, ticketing and SLA workflow",
    "Real-Time Project Version 2.0",
    "Group mentoring and lab reviews",
    "Project support on your build",
    "Placement support",
  ],
  "data-center-networking-internship": [
    "9 courses, including VMware ESXi",
    "Data center architecture and compute",
    "Incident handling and ticketing",
    "Real-Time Project Version 2.0",
    "1-on-1 doubt-clearing sessions",
    "Project support on your lab build",
    "Placement support",
  ],
  "data-center-automation-internship": [
    "16 courses, the widest single track",
    "Spine-leaf, VXLAN and AWS hybrid cloud",
    "Python, Ansible, REST APIs and CI/CD",
    "Real-Time Automation Project 2.0",
    "1-on-1 mentoring and code review",
    "Project support through to deployment",
    "Placement support",
  ],
  "elite-career-path-bundle": [
    "All three tracks, taken in sequence",
    "Everything in the three programmes",
    "A named mentor across all three",
    "Weekly 1-on-1 sessions",
    "Project support on every track",
    "Cross-track portfolio review",
    "Placement support",
  ],
};

/** The tier carrying a real discount, so the badge states a fact. */
const FEATURED = "elite-career-path-bundle";

export default function InternshipPricing() {
  return (
    <div className={s.grid}>
      {internships.map((i) => {
        const price = internshipPrice(i);
        const featured = i.slug === FEATURED;
        return (
          <article key={i.slug} className={`${s.card} ${featured ? s["card--feature"] : ""}`}>
            {featured && <p className={s.badge}>Best value</p>}

            <h3 className={s.name}>{i.title}</h3>
            <p className={s.track}>{i.track}</p>

            {price && (
              <>
                <p className={s.priceRow}>
                  <span className={s.price}>{formatUsd(price.usd)}</span>
                  {price.wasUsd && <span className={s.was}>{formatUsd(price.wasUsd)}</span>}
                  {price.discountPct && <span className={s.off}>{price.discountPct}% off</span>}
                </p>
                <p className={s.note}>One-time. Programme access runs for a year.</p>
              </>
            )}

            <ul className={s.features}>
              {(HIGHLIGHTS[i.slug] ?? []).map((f) => (
                <li key={f} className={s.feature}>
                  <Check size={15} weight="bold" className={s.tick} aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/internships/${i.slug}`}
              className={`btn ${featured ? "btn--gold" : "btn--ghost"} ${s.cta}`}
            >
              See the track
              <ArrowRight size={15} weight="bold" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
