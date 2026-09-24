import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./CardSection.module.css";

/** Section wrapper with a heading and a responsive card grid. */
export function CardSection({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  id?: string;
}) {
  const headingId = id ? `${id}-h` : undefined;
  return (
    <section className="section section--tight shell" id={id} aria-labelledby={headingId}>
      <div className={styles.head}>
        <p className={`mono ${styles.eyebrow}`}>{eyebrow}</p>
        <h2 className="h2" id={headingId}>
          {title}
        </h2>
      </div>
      <div className={styles.grid}>{children}</div>
    </section>
  );
}

export function Card({ title, body, href }: { title: string; body: string; href?: string }) {
  return (
    <article className={`card ${href ? "card--link" : ""}`}>
      <h3 className="h4">
        {href ? (
          <Link href={href} className="stretched">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p className="card__body">{body}</p>
      {href && (
        <span className={`link-arrow ${styles.more}`} aria-hidden="true">
          Read more <ArrowRight size={14} weight="bold" />
        </span>
      )}
    </article>
  );
}

export default CardSection;
