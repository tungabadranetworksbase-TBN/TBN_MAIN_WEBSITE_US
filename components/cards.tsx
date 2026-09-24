import Link from "next/link";
import {
  ArrowRight,
  Book,
  Briefcase,
  Calendar,
  Certificate,
  Clock,
  Layers,
  categoryIcons,
} from "./Icons";
import type { Course } from "@/lib/courses";
import { coursePrice, formatUsd, internshipPrice } from "@/lib/pricing";
import type { Internship } from "@/lib/internships";
import type { Program } from "@/lib/programs";
import { formatDate, readingMinutes, type Resource } from "@/lib/resources";
import styles from "./cards.module.css";

/**
 * Listing cards. Each card is a single link with a stretched hit area, so the
 * whole card is clickable while only one focusable element exists per card.
 */

export function CourseCard({ course, headingLevel = 3 }: { course: Course; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const CategoryIcon = categoryIcons[course.category] ?? Book;
  const price = coursePrice(course);

  return (
    <article className="card card--link">
      <div className={styles.head}>
        <span className="icon-tile" aria-hidden="true">
          <CategoryIcon size={20} />
        </span>
        <div>
          <p className="card__meta">{course.category}</p>
          <H className={styles.title}>
            <Link href={`/courses/${course.slug}`} className="stretched">
              {course.title}
            </Link>
          </H>
        </div>
      </div>

      <p className="card__body">{course.shortDescription}</p>

      <div className={styles.foot}>
        <span className={styles.price}>
          {price ? (
            <>
              <b>{formatUsd(price.usd)}</b>
              {price.wasUsd && <s className={styles.was}>{formatUsd(price.wasUsd)}</s>}
            </>
          ) : (
            <>
              <b>{course.curriculum.length}</b> modules
            </>
          )}
        </span>
        <span className="link-arrow" aria-hidden="true">
          View course <ArrowRight size={16} />
        </span>
      </div>

      <div className={styles.meta}>
        <span>
          <Layers size={15} /> {course.level}
        </span>
        {course.certification.preparesFor.length > 0 && (
          <span>
            <Certificate size={15} /> {course.certification.preparesFor[0]}
          </span>
        )}
        <span>
          <Book size={15} /> {course.deliveryFormats.length} formats
        </span>
      </div>
    </article>
  );
}

export function InternshipCard({
  internship,
  headingLevel = 3,
}: {
  internship: Internship;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const CategoryIcon =
    categoryIcons[internship.category as keyof typeof categoryIcons] ?? Briefcase;
  const price = internshipPrice(internship);

  return (
    <article className="card card--link">
      <div className={styles.head}>
        <span className="icon-tile" aria-hidden="true">
          <CategoryIcon size={20} />
        </span>
        <div>
          <p className="card__meta">{internship.category}</p>
          <H className={styles.title}>
            <Link href={`/internships/${internship.slug}`} className="stretched">
              {internship.title}
            </Link>
          </H>
        </div>
      </div>

      <p className="card__body">{internship.shortDescription}</p>

      <div className={styles.tags}>
        {internship.technologies.slice(0, 4).map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>

      {price && (
        <div className={styles.foot}>
          <span className={styles.price}>
            <b>{formatUsd(price.usd)}</b>
            {price.wasUsd && <s className={styles.was}>{formatUsd(price.wasUsd)}</s>}
          </span>
          {price.discountPct && <span className="tag tag--accent">{price.discountPct}% off</span>}
        </div>
      )}

      <div className={styles.meta}>
        <span>
          <Briefcase size={15} /> {internship.format}
        </span>
        <span>
          <Certificate size={15} /> Certificate on completion
        </span>
      </div>
    </article>
  );
}

export function ProgramCard({
  program,
  courseTitles,
}: {
  program: Program;
  courseTitles: string[];
}) {
  return (
    <article className="card card--link" id={program.slug}>
      <p className="card__meta">{program.category} path</p>
      <h3 className={styles.title}>
        <Link href={`/programs#${program.slug}`} className="stretched">
          {program.title}
        </Link>
      </h3>
      <p className="card__body">{program.shortDescription}</p>

      <ol className={styles.steps}>
        {courseTitles.map((title, i) => (
          <li key={title} className={styles.step}>
            <span className={styles.stepNum} aria-hidden="true">
              {i + 1}
            </span>
            {title}
          </li>
        ))}
      </ol>

      <div className={styles.foot}>
        <span className={styles.price}>
          <b>{program.courseSlugs.length}</b> courses
        </span>
        <span className={styles.price}>{program.level}</span>
      </div>
    </article>
  );
}

export function ResourceCard({
  resource,
  headingLevel = 3,
}: {
  resource: Resource;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as "h2" | "h3";

  return (
    <article className="card card--link">
      <p className="card__meta">{resource.category}</p>
      <H className={styles.title}>
        <Link href={`/resources/${resource.slug}`} className="stretched">
          {resource.title}
        </Link>
      </H>
      <p className="card__body">{resource.description}</p>

      <div className={styles.meta}>
        <span className={styles.resourceMeta}>
          <time dateTime={resource.updatedAt}>Updated {formatDate(resource.updatedAt)}</time>
          <span className={styles.dot} aria-hidden="true">
            &middot;
          </span>
          {readingMinutes(resource)} min read
        </span>
      </div>
    </article>
  );
}

export function CertificationCard({
  exam,
  vendor,
  summary,
  courses,
}: {
  exam: string;
  vendor: string;
  summary: string;
  courses: { slug: string; title: string }[];
}) {
  return (
    <article className="card">
      <div className={styles.head}>
        <span className="icon-tile" aria-hidden="true">
          <Certificate size={20} />
        </span>
        <div>
          <p className="card__meta">{vendor}</p>
          <h3 className={styles.title}>{exam}</h3>
        </div>
      </div>

      <p className="card__body">{summary}</p>

      <div className={styles.foot}>
        <div className={styles.tags}>
          {courses.map((c) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} className="tag tag--accent">
              {c.title}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
