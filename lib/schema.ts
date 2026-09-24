import { site } from "./site";
import { absoluteUrl } from "./seo";
import { priceFor } from "./pricing";

/**
 * Schema.org JSON-LD builders.
 *
 * Rule enforced here: only describe what is actually rendered on the page.
 * No aggregateRating, no review, no award and no offer price is emitted
 * anywhere, because none of those are verified facts about the organization.
 */

export const ORG_ID = `${site.url}/#organization`;
export const SITE_ID = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    legalName: site.legalName,
    url: site.url,
    description: site.definition,
    email: site.contact.email,
    telephone: site.contact.phone,
    areaServed: { "@type": "Country", name: "United States" },
    // The company is Indian and sells into the US, so the founding facts and
    // the served area are deliberately different. Stating both stops an answer
    // engine inferring a US founding from areaServed alone.
    foundingDate: site.founded.year,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.founded.city,
        addressRegion: site.founded.region,
        addressCountry: site.founded.country,
      },
    },
    knowsLanguage: "en-US",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.city,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.country,
    },
    sameAs: Object.values(site.social),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";
}) {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en-US",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function courseSchema(course: {
  slug: string;
  title: string;
  shortDescription: string;
  level: string;
  deliveryFormats: string[];
}) {
  // Only emitted once a real fee is configured. Publishing an Offer without a
  // price, or with an invented one, is worse than publishing no Offer at all.
  const price = priceFor(course.slug);
  return {
    "@type": "Course",
    "@id": `${absoluteUrl(`/courses/${course.slug}`)}#course`,
    name: course.title,
    description: course.shortDescription,
    url: absoluteUrl(`/courses/${course.slug}`),
    provider: { "@id": ORG_ID },
    educationalLevel: course.level,
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price: price.usd,
            priceCurrency: "USD",
            category: "Tuition",
            url: absoluteUrl(`/courses/${course.slug}`),
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    inLanguage: "en-US",
    availableLanguage: "en-US",
    // hasCourseInstance describes the delivery pattern shown on the page.
    hasCourseInstance: course.deliveryFormats.map((format) => ({
      "@type": "CourseInstance",
      courseMode: /self-paced/i.test(format) ? "online" : "blended",
      name: `${course.title} - ${format}`,
      location: { "@type": "Country", name: "United States" },
    })),
  };
}

export function programSchema(program: {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
}) {
  return {
    "@type": "EducationalOccupationalProgram",
    "@id": `${absoluteUrl(`/programs#${program.slug}`)}`,
    name: program.title,
    description: program.shortDescription,
    provider: { "@id": ORG_ID },
    programType: program.category,
    educationalProgramMode: "online",
    occupationalCategory: program.category,
    inLanguage: "en-US",
  };
}

export function articleSchema(article: {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
}) {
  const url = absoluteUrl(`/resources/${article.slug}`);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: article.author, url: site.url },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    mainEntityOfPage: { "@id": `${url}#webpage` },
  };
}

/** Wraps any set of node objects into one @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
