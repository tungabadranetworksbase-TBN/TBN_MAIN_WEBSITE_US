import Link from "next/link";
import { extProps } from "../ui";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./PageHero.module.css";

/**
 * Interior-page header.
 *
 * Keeps the prop shape of the Fintra component it replaces so the pages using
 * it needed no edits, but renders in the brand system: gold rule, Geist
 * display, two facts set in mono. Sized for an interior page, not a landing
 * hero, so it never eats a whole viewport.
 */
export type PageHeroProps = {
  titleTop: string;
  titleBottom: string;
  subtitle: string;
  statOneValue: string;
  statOneLabel: string;
  statTwoValue: string;
  statTwoLabel: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function PageHero({
  titleTop,
  titleBottom,
  subtitle,
  statOneValue,
  statOneLabel,
  statTwoValue,
  statTwoLabel,
  ctaLabel,
  ctaHref,
}: PageHeroProps) {
  return (
    <header className={styles.hero}>
      <div className={`shell ${styles.inner}`}>
        <hr className={styles.rule} />

        <h1 className={`d1 ${styles.title}`}>
          {titleTop} {titleBottom}
        </h1>

        <p className="lede">{subtitle}</p>

        <div className={styles.foot}>
          <Link href={ctaHref} {...extProps(ctaHref)} className="btn btn--gold">
            {ctaLabel}
            <ArrowRight size={15} weight="bold" />
          </Link>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>{statOneLabel}</dt>
              <dd className={`mono ${styles.statValue}`}>{statOneValue}</dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>{statTwoLabel}</dt>
              <dd className={`mono ${styles.statValue}`}>{statTwoValue}</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  );
}
