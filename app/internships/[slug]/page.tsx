import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { InternshipCard } from "@/components/cards";
import { AnswerBox, CtaBand, FaqList, Hero, StickyCta, stickyPadClass } from "@/components/ui";
import InquiryForm from "@/components/InquiryForm";
import { ArrowRight, Certificate, Users } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { getInternship, getRelatedInternships, internships } from "@/lib/internships";
import { formatUsd, internshipPrice } from "@/lib/pricing";
import styles from "../../detail.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return internships.map((internship) => ({ slug: internship.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const internship = getInternship(slug);
  if (!internship)
    return { title: "Internship not found", robots: { index: false, follow: false } };

  return buildMetadata({
    title: `${internship.title} (US, Remote)`,
    description: internship.shortDescription.slice(0, 158),
    path: `/internships/${internship.slug}`,
    keywords: [
      internship.title,
      `${internship.category} internship`,
      "US internship",
      ...internship.technologies.slice(0, 5),
    ],
  });
}

export default async function InternshipPage({ params }: Params) {
  const { slug } = await params;
  const internship = getInternship(slug);
  if (!internship) notFound();

  const related = getRelatedInternships(internship);

  const price = internshipPrice(internship);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Internships", href: "/internships" },
    { name: internship.title, href: `/internships/${internship.slug}` },
  ];

  return (
    <div className={stickyPadClass}>
      <JsonLd
        data={graph(
          webPageSchema({
            path: `/internships/${internship.slug}`,
            name: internship.title,
            description: internship.shortDescription,
          }),
          breadcrumbSchema(crumbs),
          faqSchema(internship.faqs),
        )}
      />

      <Hero
        eyebrow={`${internship.category} internship`}
        title={internship.title}
        lede={internship.shortDescription}
        crumbs={crumbs}
        align="left"
        image="/images/texture-wide-1.png"
        actions={[
          { label: "Apply Now", href: "#apply" },
          { label: "Check eligibility", href: "#eligibility", variant: "ghost-dark" },
        ]}
      />

      <div className="container">
        <div className={styles.layout}>
          <div className={styles.main}>
            <section className={styles.block} aria-labelledby="overview">
              <h2 className={styles.blockTitle} id="overview">
                About this internship
              </h2>
              <AnswerBox>
                <strong>
                  The {internship.title} is a mentored {internship.format.toLowerCase()} placement
                  with the Tungabadra Networks engineering team.
                </strong>{" "}
                {internship.commitment} Work is reviewed by a named engineer, and a completion
                certificate is issued at the end.
              </AnswerBox>
              {internship.overview.map((para) => (
                <p key={para.slice(0, 40)} className="lede" style={{ maxWidth: "40em" }}>
                  {para}
                </p>
              ))}
            </section>

            <section className={styles.block} id="eligibility" aria-labelledby="eligibility-title">
              <h2 className={styles.blockTitle} id="eligibility-title">
                Eligibility
              </h2>
              <ul className="checklist">
                {internship.eligibility.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </section>

            <section className={styles.block} aria-labelledby="skills-required">
              <h2 className={styles.blockTitle} id="skills-required">
                Skills required
              </h2>
              <p className="lede" style={{ maxWidth: "40em" }}>
                You should already be comfortable with the following before you start:
              </p>
              <ul className={styles.chips}>
                {internship.skillsRequired.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.block} aria-labelledby="technologies">
              <h2 className={styles.blockTitle} id="technologies">
                Technologies you will use
              </h2>
              <ul className={styles.chips}>
                {internship.technologies.map((t) => (
                  <li key={t} className="tag tag--accent">
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.block} aria-labelledby="courses-included">
              <h2 className={styles.blockTitle} id="courses-included">
                Courses included
              </h2>
              <ul className="checklist">
                {internship.coursesIncluded.map((c) => (
                  <li key={c.title}>
                    {c.title}
                    {c.free ? <span className={styles.freeTag}> Included</span> : null}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.block} aria-labelledby="phases">
              <h2 className={styles.blockTitle} id="phases">
                Programme outline
              </h2>
              <div className={styles.duo}>
                {internship.phases.map((p, i) => (
                  <article key={p.title} className={styles.miniCard}>
                    <p className={`mono ${styles.phaseIndex}`}>
                      Phase {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className={styles.miniTitle}>{p.title}</h3>
                    <ul className={styles.phaseTopics}>
                      {p.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.block} aria-labelledby="projects">
              <h2 className={styles.blockTitle} id="projects">
                Projects
              </h2>
              <div className={styles.duo}>
                {internship.projects.map((p) => (
                  <article key={p.title} className={styles.miniCard}>
                    <h3 className={styles.miniTitle}>{p.title}</h3>
                    <p className={styles.miniBody}>{p.summary}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.block} aria-labelledby="outcomes">
              <h2 className={styles.blockTitle} id="outcomes">
                Learning outcomes
              </h2>
              <p className="lede" style={{ maxWidth: "40em" }}>
                By the end of the internship you will be able to:
              </p>
              <ul className="checklist">
                {internship.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </section>

            <section className={styles.block} aria-labelledby="career-roles">
              <h2 className={styles.blockTitle} id="career-roles">
                Roles this leads to
              </h2>
              <ul className={styles.chips}>
                {internship.careerRoles.map((r) => (
                  <li key={r} className="tag">
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.block} aria-labelledby="mentorship">
              <h2 className={styles.blockTitle} id="mentorship">
                Mentorship and certificate
              </h2>
              <div className={styles.duo}>
                <article className={styles.miniCard}>
                  <h3 className={styles.miniTitle}>
                    <Users size={18} style={{ verticalAlign: "-3px", marginRight: 8 }} />
                    Mentorship
                  </h3>
                  <p className={styles.miniBody}>{internship.mentorship}</p>
                </article>
                <article className={styles.miniCard}>
                  <h3 className={styles.miniTitle}>
                    <Certificate size={18} style={{ verticalAlign: "-3px", marginRight: 8 }} />
                    Certificate
                  </h3>
                  <p className={styles.miniBody}>{internship.certificate}</p>
                </article>
              </div>
            </section>

            <section className={styles.block} aria-labelledby="internship-faq">
              <h2 className={styles.blockTitle} id="internship-faq">
                Frequently asked questions
              </h2>
              <FaqList faqs={internship.faqs} />
            </section>

            <section className={styles.block} id="apply" aria-labelledby="apply-title">
              <h2 className={styles.blockTitle} id="apply-title">
                Apply for this internship
              </h2>
              <p className="lede" style={{ maxWidth: "40em" }}>
                Tell us where your skills are today and why this track interests you. Applications
                are reviewed on a rolling basis.
              </p>
              <InquiryForm
                defaultInterest="internship"
                defaultSubject={internship.title}
                heading={`Apply: ${internship.title}`}
              />
            </section>
          </div>

          <aside className={styles.aside} aria-label="Internship details and application">
            <div className={styles.asideCard}>
              {price && (
                <div>
                  <p className={styles.price}>
                    {formatUsd(price.usd)}
                    {price.wasUsd && (
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
                </div>
              )}

              <dl className={styles.specs}>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Projects</dt>
                  <dd className={styles.specValue}>{internship.projects.length}</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Format</dt>
                  <dd className={styles.specValue}>{internship.format}</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Category</dt>
                  <dd className={styles.specValue}>{internship.category}</dd>
                </div>
                <div className={styles.spec}>
                  <dt className={styles.specLabel}>Duration</dt>
                  <dd className={styles.specValue}>Agreed at the start</dd>
                </div>
              </dl>

              <div className={styles.asideActions}>
                <Link href="#apply" className="btn btn--primary btn--block">
                  Apply Now
                  <ArrowRight size={17} />
                </Link>
                <Link href="/contact" className="btn btn--ghost btn--block">
                  Ask a question first
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section--tight" aria-labelledby="related-internships">
          <div className="container">
            <h2 className="h3" id="related-internships" style={{ marginBottom: 28 }}>
              Related internships
            </h2>
            <div className="grid grid--3">
              {related.map((r) => (
                <InternshipCard key={r.slug} internship={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Need to build the prerequisites first?"
        lede="If you do not yet meet the skill requirements, the matching course covers them, and course graduates get priority consideration for this track."
        primary={{ label: "Browse courses", href: "/courses" }}
        secondary={{ label: "All internships", href: "/internships" }}
        image="/images/texture-wide-2.png"
      />

      <StickyCta
        primary={{ label: "Apply Now", href: "#apply" }}
        secondary={{ label: "Eligibility", href: "#eligibility" }}
      />
    </div>
  );
}
