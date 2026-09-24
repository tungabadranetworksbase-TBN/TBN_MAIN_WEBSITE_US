import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { CtaBand, PageHead } from "@/components/ui";
import { ArrowRight } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { allRoutes, routeGroups } from "@/lib/routes";
import styles from "../detail.module.css";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Sitemap", href: "/sitemap" },
];

export const metadata: Metadata = buildMetadata({
  title: "Sitemap",
  description: `All ${allRoutes.length} pages on the Tungabadra Networks website: courses, internships, career paths, certifications, corporate training, services and resources.`,
  path: "/sitemap",
});

export default function SitemapPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/sitemap",
            name: "Sitemap",
            description: `All ${allRoutes.length} pages on the Tungabadra Networks website.`,
            type: "CollectionPage",
          }),
          breadcrumbSchema(crumbs),
        )}
      />
      <PageHead
        eyebrow="Sitemap"
        title="Every page on this site"
        lede={`All ${allRoutes.length} pages, grouped by section. The machine-readable version is at /sitemap.xml.`}
        crumbs={crumbs}
      >
        <p className="row">
          <a href="/sitemap.xml" className="link-arrow">
            View sitemap.xml <ArrowRight size={16} />
          </a>
        </p>
      </PageHead>
      <div className="container">
        <div
          className={styles.main}
          style={{ paddingBottom: "clamp(40px, 5vw, 72px)", gap: "clamp(32px, 4vw, 48px)" }}
        >
          {routeGroups.map((group) => (
            <section
              key={group.title}
              className={styles.block}
              aria-labelledby={`sm-${group.title.replace(/\W+/g, "-").toLowerCase()}`}
            >
              <h2
                className={styles.blockTitle}
                id={`sm-${group.title.replace(/\W+/g, "-").toLowerCase()}`}
              >
                {group.title}
              </h2>
              <ul className="grid grid--2" style={{ listStyle: "none" }}>
                {group.routes.map((route) => (
                  <li key={route.path}>
                    <article className="card card--link" style={{ gap: 6 }}>
                      <h3 className="h5">
                        <Link href={route.path} className="stretched">
                          {route.label}
                        </Link>
                      </h3>
                      <p className="card__body">{route.description}</p>
                      <p className="card__meta">{route.path}</p>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <CtaBand
        title="Looking for something specific?"
        lede="If a page you expected is not listed, tell us what you were looking for."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}
