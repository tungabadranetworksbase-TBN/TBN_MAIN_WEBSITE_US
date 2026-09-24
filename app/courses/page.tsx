import type { Metadata } from "next";
import PageHero from "@/components/brand/PageHero";
import CardSection from "@/components/brand/CardSection";
import { CourseCard } from "@/components/cards";
import Faq from "@/components/brand/Faq";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { courses } from "@/lib/courses";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
];

export const metadata: Metadata = buildMetadata({
  title: "Technology Courses",
  description: `Browse ${courses.length} project-based technology courses in networking, cloud, cybersecurity, software development, data, DevOps and Linux, for US learners.`,
  path: "/courses",
});

export default function CoursesPage() {

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/courses",
            name: "Technology Courses",
            description: `All ${courses.length} technology courses offered by Tungabadra Networks.`,
            type: "CollectionPage",
          }),
          breadcrumbSchema(crumbs),
          {
            "@type": "ItemList",
            name: "Tungabadra Networks courses",
            numberOfItems: courses.length,
            itemListElement: courses.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.title,
              url: `/courses/${c.slug}`,
            })),
          },
        )}
      />

      <PageHero
        titleTop="Courses built around"
        titleBottom="graded projects"
        subtitle={`${courses.length} instructor-led courses. Every one lists its prerequisites, weekly hours and full curriculum before you enroll.`}
        statOneValue={String(courses.length)}
        statOneLabel="Courses"
        statTwoValue="78"
        statTwoLabel="Modules"
        ctaLabel="Talk to Us"
        ctaHref="/contact"
      />

      {/* One index rather than seven category bands: several categories hold a
          single course, which left near-empty sections down the page. */}
      <CardSection eyebrow="Full catalog" title="Every course we teach" id="catalog">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </CardSection>

      <Faq />
    </>
  );
}
