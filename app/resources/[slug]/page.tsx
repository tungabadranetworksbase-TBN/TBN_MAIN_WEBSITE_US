import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { ResourceCard } from "@/components/cards";
import { AnswerBox, Breadcrumbs, CtaBand } from "@/components/ui";
import BrandPageHero from "@/components/brand/PageHero";
import { ArrowRight } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import {
  formatDate,
  getRelatedResources,
  getResource,
  readingMinutes,
  resources,
  type Block,
} from "@/lib/resources";
import { getCourse } from "@/lib/courses";
import { getInternship } from "@/lib/internships";
import styles from "../../detail.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return { title: "Article not found", robots: { index: false, follow: false } };

  return buildMetadata({
    title: resource.title,
    description: resource.description.slice(0, 158),
    path: `/resources/${resource.slug}`,
    type: "article",
    publishedTime: resource.publishedAt,
    modifiedTime: resource.updatedAt,
    authors: [resource.author],
  });
}

/** Stable slug for an h2, so the table of contents links resolve. */
const anchor = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={index}
          id={anchor(block.text)}
          style={{ scrollMarginTop: "calc(var(--header-h) + 20px)" }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 key={index}>{block.text}</h3>;
    case "p":
      return <p key={index}>{block.text}</p>;
    case "ul":
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        // A pull-quote, set larger and in the brand face rather than tagged
        // with a coloured edge stripe. It also referenced --accent, a token
        // that no longer exists.
        <blockquote key={index} className="pullquote">
          {block.text}
        </blockquote>
      );
    case "table":
      return (
        <div key={index} className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={h + i} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={cell + i} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={cell + i}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function ResourcePage({ params }: Params) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const related = getRelatedResources(resource);
  const minutes = readingMinutes(resource);
  const headings = resource.body.filter(
    (b): b is Extract<Block, { type: "h2" }> => b.type === "h2",
  );
  const ctaCourses = (resource.ctaCourses ?? []).map(getCourse).filter(Boolean);
  const ctaInternships = (resource.ctaInternships ?? []).map(getInternship).filter(Boolean);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources" },
    { name: resource.title, href: `/resources/${resource.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: `/resources/${resource.slug}`,
            name: resource.title,
            description: resource.description,
          }),
          breadcrumbSchema(crumbs),
          articleSchema(resource),
        )}
      />

      

      <BrandPageHero
        titleTop={resource.title}
        titleBottom=""
        subtitle={resource.description}
        statOneValue={String(minutes)}
        statOneLabel="Min read"
        statTwoValue={resource.category}
        statTwoLabel="Category"
        ctaLabel="Book a Demo"
        ctaHref="/contact"
      />

      <div className="container">
        <Breadcrumbs items={crumbs} />

        <div className={styles.layout}>
          <article className={styles.main} style={{ gap: 24 }}>

            {/* The direct answer, before the article body, for answer engines. */}
            <AnswerBox>
              <strong>In short: </strong>
              {resource.keyTakeaway}
            </AnswerBox>

            <div className="prose">{resource.body.map(renderBlock)}</div>

            {(ctaCourses.length > 0 || ctaInternships.length > 0) && (
              <section className={styles.block} aria-labelledby="article-next">
                <h2 className={styles.blockTitle} id="article-next">
                  Where to go next
                </h2>
                <div className={styles.duo}>
                  {ctaCourses.map(
                    (course) =>
                      course && (
                        <article key={course.slug} className={styles.miniCard}>
                          <p className="card__meta">Course</p>
                          <h3 className={styles.miniTitle}>
                            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                          </h3>
                          <p className={styles.miniBody}>{course.shortDescription}</p>
                          <Link href={`/courses/${course.slug}`} className="link-arrow">
                            View course <ArrowRight size={16} />
                          </Link>
                        </article>
                      ),
                  )}
                  {ctaInternships.map(
                    (internship) =>
                      internship && (
                        <article key={internship.slug} className={styles.miniCard}>
                          <p className="card__meta">Internship</p>
                          <h3 className={styles.miniTitle}>
                            <Link href={`/internships/${internship.slug}`}>{internship.title}</Link>
                          </h3>
                          <p className={styles.miniBody}>{internship.shortDescription}</p>
                          <Link href={`/internships/${internship.slug}`} className="link-arrow">
                            View internship <ArrowRight size={16} />
                          </Link>
                        </article>
                      ),
                  )}
                </div>
              </section>
            )}
          </article>

          <aside className={styles.aside} aria-label="Article contents">
            {headings.length > 0 && (
              <nav className={styles.toc} aria-label="On this page">
                <h2 className={styles.tocTitle}>On this page</h2>
                <ul className={styles.tocList}>
                  {headings.map((h) => (
                    <li key={h.text}>
                      <a href={`#${anchor(h.text)}`}>{h.text}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className={styles.asideCard}>
              <h2 className="h5">Questions about your own situation?</h2>
              <p className="card__body">
                Guides generalize. If you want an answer specific to your background and target
                role, send us the details.
              </p>
              <Link href="/contact" className="btn btn--primary btn--block">
                Talk to Us
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section--tight" aria-labelledby="related-resources">
          <div className="container">
            <h2 className="h3" id="related-resources" style={{ marginBottom: 28 }}>
              Related guides
            </h2>
            <div className="grid grid--3">
              {related.map((r) => (
                <ResourceCard key={r.slug} resource={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Turn the reading into something you can show"
        lede="Courses end in graded projects and internships end in documented deliverables, both give you something concrete to talk about."
        primary={{ label: "Explore Courses", href: "/courses" }}
        secondary={{ label: "Find an Internship", href: "/internships" }}
      />
    </>
  );
}
