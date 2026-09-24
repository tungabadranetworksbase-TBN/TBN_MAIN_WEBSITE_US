/**
 * The single registry of every public route.
 *
 * Both the XML sitemap (`app/sitemap.ts`) and the human sitemap page
 * (`app/sitemap/page.tsx`) read from here, so a new page cannot appear in one
 * and be missing from the other.
 */

import { courses } from "./courses";
import { internships } from "./internships";
import { resources } from "./resources";

export type Route = {
  path: string;
  label: string;
  description: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
};

export type RouteGroup = { title: string; routes: Route[] };

const staticRoutes: RouteGroup[] = [
  {
    title: "Main",
    routes: [
      { path: "/", label: "Home", description: "Technology courses, internships and training for the US market.", priority: 1, changeFrequency: "weekly" },
      { path: "/about", label: "About Tungabadra Networks", description: "What the organization is, who it serves and how it teaches.", priority: 0.8, changeFrequency: "monthly" },
      { path: "/contact", label: "Contact", description: "Send a course, internship, corporate or services inquiry.", priority: 0.8, changeFrequency: "monthly" },
      { path: "/faq", label: "FAQ", description: "Answers about programs, enrollment and services.", priority: 0.7, changeFrequency: "monthly" },
    ],
  },
  {
    title: "Learn",
    routes: [
      { path: "/courses", label: "All Courses", description: "Every technology course in the catalog, by subject area.", priority: 0.9, changeFrequency: "weekly" },
      { path: "/internships", label: "All Internships", description: "Every mentored internship track available in the US.", priority: 0.9, changeFrequency: "weekly" },
      { path: "/programs", label: "Career Paths", description: "Sequenced multi-course programs ending in an internship.", priority: 0.8, changeFrequency: "monthly" },
      { path: "/certifications", label: "Certifications", description: "Preparation tracks mapped to third-party exam domains.", priority: 0.8, changeFrequency: "monthly" },
    ],
  },
  {
    title: "Business",
    routes: [
      { path: "/corporate-training", label: "Corporate Training", description: "Cohort training for US engineering and IT teams.", priority: 0.8, changeFrequency: "monthly" },
      { path: "/project-support", label: "Project Support", description: "Engineers working alongside your team on a live network project, from design review through rollout.", priority: 0.8, changeFrequency: "monthly" },
      { path: "/technology-services", label: "Technology Services", description: "Network, cloud, automation and documentation engagements.", priority: 0.8, changeFrequency: "monthly" },
    ],
  },
  {
    title: "Resources",
    routes: [
      { path: "/resources", label: "Resources", description: "Career guides, technology explainers and program guidance.", priority: 0.8, changeFrequency: "weekly" },
    ],
  },
  {
    title: "Legal",
    routes: [
      { path: "/privacy-policy", label: "Privacy Policy", description: "How personal information is collected, used and protected.", priority: 0.3, changeFrequency: "yearly" },
      { path: "/terms", label: "Terms & Conditions", description: "Terms governing site use and program enrollment.", priority: 0.3, changeFrequency: "yearly" },
      { path: "/sitemap", label: "Sitemap", description: "Every page on this website, in one list.", priority: 0.3, changeFrequency: "monthly" },
    ],
  },
];

const courseRoutes: RouteGroup = {
  title: "Courses",
  routes: courses.map((c) => ({
    path: `/courses/${c.slug}`,
    label: c.title,
    description: c.shortDescription,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
};

const internshipRoutes: RouteGroup = {
  title: "Internships",
  routes: internships.map((i) => ({
    path: `/internships/${i.slug}`,
    label: i.title,
    description: i.shortDescription,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
};

const resourceRoutes: RouteGroup = {
  title: "Guides & Articles",
  routes: resources.map((r) => ({
    path: `/resources/${r.slug}`,
    label: r.title,
    description: r.description,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  })),
};

export const routeGroups: RouteGroup[] = [
  ...staticRoutes.slice(0, 2),
  courseRoutes,
  internshipRoutes,
  ...staticRoutes.slice(2, 4),
  resourceRoutes,
  ...staticRoutes.slice(4),
];

export const allRoutes: Route[] = routeGroups.flatMap((g) => g.routes);

/** Last-modified dates for the routes that have a real one. */
export function lastModified(path: string): Date {
  const slug = path.split("/").pop() ?? "";
  const resource = resources.find((r) => r.slug === slug);
  return resource ? new Date(`${resource.updatedAt}T12:00:00Z`) : new Date();
}
