import { Plus } from "@phosphor-icons/react/dist/ssr";
import { homeFaqs } from "@/lib/faqs";
import type { Faq as FaqItem } from "@/lib/courses";
import styles from "./Faq.module.css";

/**
 * FAQ accordion, on native details/summary.
 *
 * No JavaScript, correct keyboard and screen-reader behaviour for free, and
 * the answers sit in the DOM where answer engines can read them.
 */
export default function Faq({
  items = homeFaqs,
  title = "Questions we get asked",
}: {
  items?: FaqItem[];
  title?: string;
}) {
  return (
    <section className="section shell" aria-labelledby="faq-band">
      <h2 className="h2" id="faq-band" style={{ marginBottom: "clamp(24px, 3vw, 38px)" }}>
        {title}
      </h2>
      <div className={styles.list}>
        {items.map((f) => (
          <details key={f.question} className={styles.item}>
            <summary className={styles.summary}>
              <h3 style={{ font: "inherit", margin: 0 }}>{f.question}</h3>
              <Plus size={17} weight="bold" className={styles.icon} />
            </summary>
            <div className={styles.answer}>{f.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
