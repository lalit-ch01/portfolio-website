import type { MetadataRoute } from "next";

const SITE_URL = "https://lalitchaudhari.dev";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: Date;
};

const ROUTES: Route[] = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/work", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },

  {
    path: "/sfmc-custom-activity-tutorial",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: new Date("2026-05-01"),
  },
  {
    path: "/creating-sfmc-journey-builder-custom-activity",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: new Date("2026-05-01"),
  },
  {
    path: "/sfmc-journey-builder-custom-activity",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: new Date("2026-05-01"),
  },
  {
    path: "/sfmc-journey-builder-custom-activity-for-slack",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: new Date("2026-05-01"),
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: r.lastModified ?? buildDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
