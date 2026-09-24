import type { MetadataRoute } from "next";
import { allRoutes, lastModified } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

/** Dynamic XML sitemap, generated from the route registry in lib/routes.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: lastModified(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
