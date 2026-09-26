import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { CourseCard } from "@/components/cards";
import { AnswerBox, CtaBand, FaqList, Hero, StickyCta, stickyPadClass } from "@/components/ui";
import { ArrowRight, Certificate, ChevronDown } from "@/components/Icons";
import { extProps } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { breadcrumbSchema, courseSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { courses, getCourse, getRelatedCourses } from "@/lib/courses";
import { coursePrice, formatUsd } from "@/lib/pricing";
import styles from "../../detail.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found", robots: { index: false, follow: false } };

  return buildMetadata({
    title: `${course.title} Course`,
    description: course.shortDescription.slice(0, 158),
    path: `/courses/${course.slug}`,
    keywords: [course.title, `${course.category} training`, ...course.skills.slice(0, 6)],
  });
}

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const related = getRelatedCourses(course);
  const price = coursePrice(course);
  // Readable subject in the URL keeps the contact page free of catalog imports.
  const inquiryHref = `/contact?interest=course&subject=${encodeURIComponent(course.title)}`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: course.title, href: `/courses/${course.slug}` },
  ];

  return (
    <div className={stickyPadClass}>
      <JsonLd
        data={graph(
          webPageSchema({
            path: `/courses/${course.slug}`,
            name: `${course.title} Course`,
            description: course.shortDescription,
          }),
          breadcrumbSchema(crumbs),
          courseSchema(course),
          faqSchema(course.faqs),
        )}
      />

      <Hero
        eyebrow={course.category}
        title={course.title}
        lede={course.shortDescription}
        crumbs={crumbs}
        align="left"
        image="/images/section-bg-dark.png"
        actions={[
          { label: "Enroll Now", href: site.contact.enroll },
          { label: "See curriculum", href: "#curriculum", variant: "ghost-dark" },
        ]}
      />

      <div className="container">
        <div className={styles.layout}>
          {/* ------------------------------------------------------ main --- */}
          <div className={styles.main}>
            <section className={styles.block} aria-labelledby="overview">
              <h2 className={styles.blockTitle} id="overview">
                Course overview
              </h2>
              <AnswerBox>
                <strong>
                  {course.title} is a {course.level.toLowerCase()}-level course from Tungabadra
                  Networks.
                </strong>{" "}
                It covers {course.curriculum.length} modules, is delivered{" "}
                {course.deliveryFormats.map((f) => f.toLowerCase()).join(", ")}, and includes{" "}
                {course.projects.length} applied projects.{" "}
                {course.certification.preparesFor.length > 0
                  ? `It prepares for ${course.certification.preparesFor.join(" and ")}.`
                  : "It is applied rather than exam-aligned."}
              </AnswerBox>
              {course.overview.map((para) => (
                <p key={para.slice(0, 40)} className="lede" style={{ maxWidth: "40em" }}>
                  {para}
                </p>
              ))}
            </section>

            <section className={styles.block} aria-labelledby="who-for">
              <h2 className={styles.blockTitle} id="who-for">
                Who this course is for
              </h2>
              <ul className="checklist">
                {course.audience.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>

            <section className={styles.block} aria-labelledby="outcomes">
              <h2 className={styles.blockTitle} id="outcomes">
                What you will be able to do
              </h2>
              <p className="lede" style={{ maxWidth: "40em" }}>
                By the end of {course.title}, you will be able to:
              </p>
              <ul className="checklist">
                {course.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </section>

            <section className={styles.block} aria-labelledby="skills">
              <h2 className={styles.blockTitle} id="skills">
                Skills covered
              </h2>
              <ul className={styles.chips}>
                {course.skills.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.block} id="curriculum" aria-labelledby="curriculum-title">
              <h2 className={styles.blockTitle} id="curriculum-title">
                Curriculum
              </h2>
              <p className="lede" style={{ maxWidth: "40em" }}>
                {course.curriculum.length} modules of instruction and lab work.
              </p>

              <div className={styles.modules}>
                {course.curriculum.map((module, i) => (
                  <details key={module.title} className={styles.module}>
                    <summary className={styles.moduleSummary}>
                      <span className={styles.moduleIndex} aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className={styles.moduleName}>{module.title}</h3>
                      <span className={styles.moduleHours}>
                        {module.topics.length} topics
                      </span>
                      <ChevronDown size={18} className={styles.moduleChevron} />
                    </summary>
                    <ul className={styles.moduleTopics}>
                      {module.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>

            <section className={styles.block} aria-labelledby="projects">
              <h2 className={styles.blockTitle} id="projects">
                Projects you will complete
              </h2>
              <div className={styles.duo}>
                {course.projects.map((project) => (
                  <article key={project.title} className={styles.miniCard}>
                    <h3 className={styles.miniTitle}>{project.title}</h3>
                    <p className={styles.miniBody}>{project.summary}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.block} aria-labelledby="prereqs">
              <h2 className={styles.blockTitle} id="prereqs">
                Prerequisites
              </h2>
              <ul className="checklist">
                {course.prerequisites.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>

            <section className={styles.block} aria-labelledby="certification">
              <h2 className={styles.blockTitle} id="certification">
                Certification
              </h2>
              <div className={styles.miniCard}>
                <h3 className={styles.miniTitle}>
                  <Certificate size={18} style={{ verticalAlign: "-3px", marginRight: 8 }} />
                  Course completion certificate
                </h3>
                <p className={styles.miniBody}>
                  Issued on completion. The certificate lists the modules completed and the skills
                  applied.{" "}
                  {course.certification.preparesFor.length > 0
                    ? course.certification.note
                    : course.certification.note}
                </p>
              </div>

              {course.certification.preparesFor.length > 0 && (
                <>
                  <p className="lede" style={{ maxWidth: "40em" }}>
                    This course also covers the topic areas assessed by the following third-party
                    exams:
                  </p>
                  <ul className={styles.chips}>
                    {course.certification.preparesFor.map((exam) => (
                      <li key={exam} className="tag tag--accent">
                        {exam}
                      </li>
                    ))}
                  </ul>
                  <p className="card__meta" style={{ maxWidth: "40em" }}>
                    Tungabadra Networks is not an authorized training partner of these vendors and
                    does not administer or issue their exams. Exams are registered and paid for
                    directly with the vendor. See{" "}
                    <Link href="/certifications" className="text-link">
                      certification tracks
                    </Link>
                    .
                  </p>
                </>
              )}
            </section>

            <section className={styles.block} aria-labelledby="careers">
              <h2 className={styles.blockTitle} id="careers">
                Career opportunities
              </h2>
              <p className="lede" style={{ maxWidth: "40em" }}>
                Roles this course is designed to prepare you for in the US job market:
              </p>
              <div className={styles.duo}>
                {course.careers.map((c) => (
                  <article key={c.role} className={styles.miniCard}>
                    <h3 className={styles.miniTitle}>{c.role}</h3>
                    <p className={styles.miniBody}>{c.note}</p>
                  </article>
                ))}
              </div>
              <p className="card__meta">
                Job titles vary by employer. Tungabadra Networks does not guarantee employment and
                publishes no placement or salary statistics.
              </p>
            </section>

            <section className={styles.block} aria-labelledby="course-faq">
              <h2 className={styles.blockTitle} id="course-faq">
                Frequently asked questions
              </h2>
              <FaqList faqs={course.faqs} />
            </section>
          </div>

          {/* --------------------------------------------------- sidebar --- */}
          <aside className={styles.aside} aria-label="Course details and enrollment">
            <div className={styles.asideCard}>
              <div>
                <p className={styles.price}>
                  {price ? formatUsd(price.usd) : "Free consultation"}
                  {price?.wasUsd && (
                    <s
                      style={{
                        marginLeft: 10,
                        fontSize: "0.6em",
                        fontWeight: 400,
                        color: "var(--fg-faint)",
                      }}
                    >
                      {formatUsd(price.wasUsd)}
                    </s>
                  )}
                </p>
                {!price && (
                  <p className={styles.priceNote}>
                    Fees, duration and the current batch dates are shared on the call.
                  </p>
                )}
              </div>

              <dl className={styles.specs}>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Modules</dt>
                  <dd className={styles.specValue}>{course.curriculum.length}</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Projects</dt>
                  <dd className={styles.specValue}>{course.projects.length}</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Lab access</dt>
                  <dd className={styles.specValue}>24/7</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Level</dt>
                  <dd className={styles.specValue}>{course.level}</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Format</dt>
                  <dd className={styles.specValue}>{course.deliveryFormats.join(", ")}</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Projects</dt>
                  <dd className={styles.specValue}>{course.projects.length} graded</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Language</dt>
                  <dd className={styles.specValue}>English (US)</dd>
                </div>
              </dl>

              <div className={styles.asideActions}>
                <Link
                  href={site.contact.enroll}
                  {...extProps(site.contact.enroll)}
                  className="btn btn--primary btn--block"
                >
                  Enroll Now
                  <ArrowRight size={17} />
                </Link>
                <Link href={inquiryHref} className="btn btn--ghost btn--block">
                  Ask about this course
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section--tight" aria-labelledby="related-courses">
          <div className="container">
            <h2 className="h3" id="related-courses" style={{ marginBottom: 28 }}>
              Related courses
            </h2>
            <div className="grid grid--3">
              {related.map((r) => (
                <CourseCard key={r.slug} course={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={`Questions about ${course.title}?`}
        lede="Tell us your background and we will confirm whether this course is the right level, or point you to a better starting point."
        primary={{ label: "Talk to Us", href: inquiryHref }}
        secondary={{ label: "Browse all courses", href: "/courses" }}
      />

      <StickyCta
        primary={{ label: "Enroll Now", href: site.contact.enroll }}
        secondary={{ label: "Curriculum", href: "#curriculum" }}
      />
    </div>
  );
}
