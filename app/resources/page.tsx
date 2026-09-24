import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { ResourceCard } from "@/components/cards";
import { CtaBand, PageHead, SectionHead } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { resourceCategories, resources } from "@/lib/resources";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resources", href: "/resources" },
];

export const metadata: Metadata = buildMetadata({
  title: "Resources: Career and Technology Guides",
  description:
    "Career guides and technology explainers: starting in network engineering, choosing a certification, picking a cloud platform and passing technical interviews.",
  path: "/resources",
});

export default function ResourcesPage() {
  const byCategory = resourceCategories
    .map((category) => ({ category, items: resources.filter((r) => r.category === category) }))
    .filter((g) => g.items.length > 0);
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/resources",
            name: "Resources: Career and Technology Guides",
            description:
              "Career guides, technology explainers and program guidance from Tungabadra Networks.",
            type: "CollectionPage",
          }),
          breadcrumbSchema(crumbs),
          {
            "@type": "ItemList",
            name: "Tungabadra Networks resources",
            numberOfItems: resources.length,
            itemListElement: resources.map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: r.title,
              url: `/resources/${r.slug}`,
            })),
          },
        )}
      />
      <PageHead
        eyebrow="Resources"
        title="Career and technology guides"
        lede="Practical guidance on choosing a path, picking between certifications, deciding which cloud to learn, and getting through technical interviews. Written to be useful whether or not you ever enroll."
        crumbs={crumbs}
      />
      {byCategory.map((group, index) => (
        <section
          key={group.category}
          className={`section ${index === 0 ? "section--flush-top section--tight" : "section--tight"}`}
          aria-labelledby={`res-${group.category.replace(/\W+/g, "-").toLowerCase()}`}
        >
          <div className="container">
            <SectionHead
              id={`res-${group.category.replace(/\W+/g, "-").toLowerCase()}`}
              eyebrow={`${group.items.length} ${group.items.length === 1 ? "article" : "articles"}`}
              title={group.category}
            />
            <div className="grid grid--3">
              {group.items.map((resource) => (
                <ResourceCard key={resource.slug} resource={resource} />
              ))}
            </div>
          </div>
        </section>
      ))}{" "}
      <CtaBand
        title="Have a question a guide did not answer?"
        lede="Send it over. If it comes up often enough it becomes the next guide."
        primary={{ label: "Talk to Us", href: "/contact" }}
        secondary={{ label: "Explore Courses", href: "/courses" }}
      />
    </>
  );
}
