import type { Metadata } from "next";
import { site } from "./site";

const OG_IMAGE = "/images/hero-bg.png";

type PageSeo = {
  title: string;
  description: string;
  /** Site-root-relative path, e.g. "/courses/ccna-advanced-training". */
  path: string;
  /** Absolute or root-relative image path. Falls back to the brand image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
  keywords?: string[];
};

/** Absolute URL for a root-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

/**
 * Builds a complete Metadata object: canonical, Open Graph, Twitter and robots.
 * Every page routes through this so titles and descriptions stay unique and
 * canonicals are never forgotten.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = OG_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
  keywords,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: "en_US",
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

/** Composes a page title within the site title template. */
export function pageTitle(title: string): string {
  return `${title} | ${site.name}`;
}
