import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { AnswerBox, CtaBand, FaqList, Hero, SectionHead } from "@/components/ui";
import { ArrowRight, Certificate, Clock, Layers } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, programSchema, webPageSchema } from "@/lib/schema";
import { programCourses, programs } from "@/lib/programs";
import styles from "../detail.module.css";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Programs", href: "/programs" },
];

export const metadata: Metadata = buildMetadata({
  title: "Career Programs and Learning Paths",
  description: `${programs.length} sequenced career paths in networking, cloud, cybersecurity, software engineering and data, each ending in a mentored US internship placement.`,
  path: "/programs",
});

const faqs = [
  {
    question: "What is a Tungabadra Networks career path?",
    answer: `A career path is a sequence of two or three courses ordered so each builds on the last, ending with priority consideration for a matching internship. Tungabadra Networks offers ${programs.length} paths covering networking and infrastructure, cloud engineering, cybersecurity, software engineering and data analytics.`,
  },
  {
    question: "How is a career path different from taking the courses separately?",
    answer:
      "The content is the same, but the order is deliberate and the seams are covered, for example, applying Python automation to the network you configured in the previous course. Paths also include portfolio review and an internship placement step.",
  },
  {
    question: "How long does a career path take?",
    answer:
      "Between 20 and 36 weeks depending on the path, at 8 to 10 hours per week. Each path page lists its exact duration and weekly commitment.",
  },
  {
    question: "Can I start a path partway through?",
    answer:
      "Yes. If you already hold the skills a course covers, you can skip it and pay for the remainder. Tell us your background on the contact form and we will confirm the right entry point.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/programs",
            name: "Career Programs and Learning Paths",
            description: `All ${programs.length} multi-course career paths offered by Tungabadra Networks.`,
            type: "CollectionPage",
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
          ...programs.map((p) =>
            programSchema({
              slug: p.slug,
              title: p.title,
              shortDescription: p.shortDescription,
              category: p.category,
            }),
          ),
        )}
      />
      <Hero
        eyebrow="Career paths"
        title="Sequenced programs that end in applied experience"
        lede="Career paths order courses in the sequence the skills actually build on each other, then place you into a matching internship, so the program ends in reviewed work rather than a certificate alone."
        crumbs={crumbs}
        image="/images/texture-wide-3.png"
        actions={[
          { label: "Talk to an advisor", href: "/contact?interest=course" },
          { label: "Browse single courses", href: "/courses", variant: "ghost-dark" },
        ]}
      />
      <section className="section section--tight" aria-labelledby="programs-intro">
        <div className="container">
          <h2 className="h2" id="programs-intro" style={{ marginBottom: 18 }}>
            What is a Tungabadra Networks career path?
          </h2>
          <AnswerBox>
            <strong>
              A career path is a sequence of two or three Tungabadra Networks courses, ordered so
              each builds on the last, ending with priority consideration for a matching internship.
            </strong>{" "}
            Paths run 20 to 36 weeks at 8 to 10 hours per week and include portfolio review and
            interview practice alongside the course content.
          </AnswerBox>
        </div>
      </section>
      {programs.map((program) => {
        const list = programCourses(program);
        return (
          <section
            key={program.slug}
            className="section section--tight"
            id={program.slug}
            aria-labelledby={`${program.slug}-title`}
            style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}
          >
            <div className="container">
              <div className={styles.layout} style={{ paddingBlock: 0 }}>
                <div className={styles.main} style={{ gap: 24 }}>
                  <div className="stack">
                    <p className="eyebrow">{program.category} path</p>
                    <h2 className="h3" id={`${program.slug}-title`}>
                      {program.title}
                    </h2>
                    {program.overview.map((para) => (
                      <p key={para.slice(0, 30)} className="lede" style={{ maxWidth: "40em" }}>
                        {para}
                      </p>
                    ))}
                  </div>
                  <div>
                    <h3 className="h5" style={{ marginBottom: 14 }}>
                      Course sequence
                    </h3>
                    <div className={styles.modules}>
                      {list.map((course, i) => (
                        <article key={course.slug} className={styles.module}>
                          <div className={styles.moduleSummary} style={{ cursor: "default" }}>
                            <span className={styles.moduleIndex} aria-hidden="true">
                              {i + 1}
                            </span>
                            <h4 className={styles.moduleName}>
                              <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                            </h4>
                            <span className={styles.moduleHours}>{course.level}</span>
                            <ArrowRight size={17} style={{ flex: "none", color: "var(--ink-3)" }} />
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                  <div className={styles.duo}>
                    <div className={styles.miniCard}>
                      <h3 className={styles.miniTitle}>Who it is for</h3>
                      <ul className="checklist" style={{ marginTop: 4 }}>
                        {program.audience.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.miniCard}>
                      <h3 className={styles.miniTitle}>What you will be able to do</h3>
                      <ul className="checklist" style={{ marginTop: 4 }}>
                        {program.outcomes.map((o) => (
                          <li key={o}>{o}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <aside className={styles.aside} aria-label={`${program.title} details`}>
                  <div className={styles.asideCard}>
                    <div>
                      <p className={styles.price}>Free consultation</p>
                      <p className={styles.priceNote}>
                        Fees, duration and batch dates are shared on the call.
                      </p>
                    </div>
                    <dl className={styles.specs}>
                      <div className={styles.spec}>
                        <dt className={styles.specLabel}>
                          <Clock size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                          Courses
                        </dt>
                        <dd className={styles.specValue}>{program.courseSlugs.length}</dd>
                      </div>
                      <div className={styles.spec}>
                        <dt className={styles.specLabel}>
                          <Layers size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                          Level
                        </dt>
                        <dd className={styles.specValue}>{program.level}</dd>
                      </div>
                      <div className={styles.spec}>
                        <dt className={styles.specLabel}>Courses</dt>
                        <dd className={styles.specValue}>{list.length}</dd>
                      </div>
                    </dl>
                    <div>
                      <h3 className="card__meta" style={{ marginBottom: 10 }}>
                        <Certificate size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                        Includes
                      </h3>
                      <ul className="checklist">
                        {program.includes.map((inc) => (
                          <li key={inc}>{inc}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.asideActions}>
                      <Link
                        href={`/contact?interest=course&subject=${encodeURIComponent(program.title)}`}
                        className="btn btn--primary btn--block"
                      >
                        Start this path <ArrowRight size={17} />
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        );
      })}{" "}
      <section className="section" aria-labelledby="programs-faq">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Career path questions" center id="programs-faq" />
          <div style={{ maxWidth: 860, marginInline: "auto" }}>
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>
      <CtaBand
        title="Which path fits your target role?"
        lede="Send us the job title you are aiming for and your current skills. We will tell you which path fits and where you should enter it."
        primary={{ label: "Talk to Us", href: "/contact?interest=course" }}
        secondary={{ label: "Compare courses", href: "/courses" }}
      />
    </>
  );
}
