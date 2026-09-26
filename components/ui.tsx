import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ChevronDown } from "./Icons";
import BrandPageHero from "./brand/PageHero";
import type { Faq } from "@/lib/courses";
import type { Crumb } from "@/lib/schema";
import { site } from "@/lib/site";
import styles from "./ui.module.css";

/**
 * An absolute http(s) href leaves the site, so it opens in a new tab with the
 * opener severed. Detected from the href rather than declared per call site,
 * so every external link on the site behaves the same without each component
 * growing a prop for it.
 */
const isExternal = (href: string) => /^https?:\/\//i.test(href);

/**
 * Attributes for a link, decided from its href.
 *
 * The booking link is special-cased: Cal.com's embed watches for
 * `data-cal-link` and opens the booking flow in a modal over the page,
 * calling preventDefault itself, so the href stays as the fallback for when
 * the embed has not loaded. Every other absolute link leaves the site and
 * opens in a new tab with the opener severed.
 */
export const extProps = (href: string) => {
  if (href === site.contact.consultation) {
    return {
      "data-cal-link": site.contact.consultationPath,
      "data-cal-config": '{"layout":"month_view"}',
    } as const;
  }
  return isExternal(href) ? ({ target: "_blank", rel: "noopener noreferrer" } as const) : {};
};


/* ------------------------------------------------------------------ hero -- */

type HeroProps = {
  eyebrow?: string;
  title: string;
  lede: string;
  /** Rendered above the title so breadcrumbs stay in the dark hero. */
  crumbs?: Crumb[];
  actions?: { label: string; href: string; variant?: "primary" | "on-dark" | "ghost-dark" }[];
  image?: string;
  align?: "center" | "left";
  children?: ReactNode;
};

/**
 * Every route's header.
 *
 * This used to render a hand-built band; it now delegates to Fintra's actual
 * hero markup so the site has one header instead of the four it had grown.
 * The prop shape is unchanged, so the pages using it needed no edits - the
 * breadcrumbs and any extra children render beneath the hero.
 */
export function Hero({ eyebrow, title, lede, crumbs, actions = [], children }: HeroProps) {
  const cta = actions[0];
  return (
    <>
      <BrandPageHero
        titleTop={title}
        titleBottom=""
        subtitle={lede}
        statOneValue={stats(eyebrow)[0]}
        statOneLabel={stats(eyebrow)[1]}
        statTwoValue="3,000+"
        statTwoLabel="Trained"
        ctaLabel={cta ? cta.label : "Book a Consultation"}
        ctaHref={cta ? cta.href : site.contact.consultation}
      />
      {(crumbs || children) && (
        <div className="container" style={{ paddingBlock: 20 }}>
          {crumbs && <Breadcrumbs items={crumbs} />}
          {children}
        </div>
      )}
    </>
  );
}

/**
 * The hero pill states two facts. Where a page only passes an eyebrow, show
 * the catalog counts rather than inventing a second claim.
 */
/** The eyebrow becomes the first fact; the second is a published figure. */
function stats(eyebrow?: string): [string, string] {
  return eyebrow ? [eyebrow, "Section"] : ["12", "Courses"];
}

/**
 * Header for lower-level pages (policies, sitemap, resource index).
 *
 * Delegates to the same Fintra hero as `Hero` so these routes stop being the
 * odd ones out - two of them previously rendered no header at all.
 */
export function PageHead({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <>
      <BrandPageHero
        titleTop={title}
        titleBottom=""
        subtitle={lede}
        statOneValue={stats(eyebrow)[0]}
        statOneLabel={stats(eyebrow)[1]}
        statTwoValue="3,000+"
        statTwoLabel="Trained"
        ctaLabel="Book a Consultation"
        ctaHref={site.contact.consultation}
      />
      <div className="container" style={{ paddingBlock: 20 }}>
        <Breadcrumbs items={crumbs} />
        {children}
      </div>
    </>
  );
}

/* ----------------------------------------------------------- breadcrumbs -- */

export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`${styles.crumbs} ${dark ? styles["crumbs--dark"] : ""}`}
    >
      <ol className={styles.crumbsList}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href}>
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <Link href={item.href}>{item.name}</Link>
                  <span className={styles.sep} aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------- faq -- */

/**
 * FAQ accordion built on native <details>/<summary>: no JavaScript, correct
 * keyboard behaviour and screen reader semantics for free, and the answers are
 * present in the DOM so answer engines can read them.
 */
export function FaqList({ faqs, headingLevel = 3 }: { faqs: Faq[]; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className={styles.faq}>
      {faqs.map((faq) => (
        <details key={faq.question} className={styles.item}>
          <summary className={styles.summary}>
            <H style={{ font: "inherit", margin: 0 }}>{faq.question}</H>
            <ChevronDown size={20} className={styles.summaryIcon} />
          </summary>
          <div className={styles.answer}>{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- cta band -- */

export function CtaBand({
  title,
  lede,
  primary = { label: "Explore Courses", href: "/courses" },
  secondary = { label: "Talk to Us", href: "/contact" },
  image = "/images/cta-bg.png",
}: {
  title: string;
  lede: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  image?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className={`${styles.cta} on-dark`}>
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1170px) 1170px, 100vw"
            className={styles.ctaArt}
            aria-hidden="true"
          />
          <div className={styles.ctaScrim} aria-hidden="true" />
          <div className={styles.ctaInner}>
            <h2 className="h2" style={{ color: "#fff" }}>
              {title}
            </h2>
            <p className="lede">{lede}</p>
            <div className={styles.ctaActions}>
              <Link href={primary.href} {...extProps(primary.href)} className="btn btn--on-dark">
                {primary.label}
                <ArrowRight size={17} />
              </Link>
              <Link href={secondary.href} {...extProps(secondary.href)} className="btn btn--ghost-dark">
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ fact table -- */

export function FactGrid({
  facts,
  columns = 2,
}: {
  facts: { label: string; value: string }[];
  columns?: 2 | 3;
}) {
  return (
    <dl className={`${styles.facts} ${columns === 3 ? styles["facts--3"] : ""}`}>
      {facts.map((f) => (
        <div key={f.label} className={styles.fact}>
          <dt className={styles.factLabel}>{f.label}</dt>
          <dd className={styles.factValue}>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The direct answer to the page's primary question, placed before any
 * elaboration so featured snippets and answer engines have a clean extract.
 */
export function AnswerBox({ children }: { children: ReactNode }) {
  return <div className={styles.answerBox}>{children}</div>;
}

/* --------------------------------------------------------- section header -- */

export function SectionHead({
  id,
  eyebrow,
  title,
  lede,
  center = false,
  as = "h2",
}: {
  /** Set this and point the section's aria-labelledby at it. */
  id?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  center?: boolean;
  as?: "h2" | "h3";
}) {
  const H = as;
  return (
    <div className={`section-head ${center ? "section-head--center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H className={as === "h2" ? "h2" : "h3"} id={id}>
        {title}
      </H>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}

/* --------------------------------------------------------- sticky mobile -- */

export function StickyCta({
  primary,
  secondary,
}: {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  return (
    <div className={styles.stickyCta}>
      <Link href={primary.href} {...extProps(primary.href)} className="btn btn--primary btn--sm">
        {primary.label}
      </Link>
      <Link href={secondary.href} {...extProps(secondary.href)} className="btn btn--ghost btn--sm">
        {secondary.label}
      </Link>
    </div>
  );
}

export const stickyPadClass = styles.stickyPad;
