import type { MetadataRoute } from "next";

const SITE_URL = "https://lalitchaudhari.dev";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: Date;
};

const ROUTES: Route[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/work", changeFrequency: "weekly", priority: 0.8 },
  { path: "/services", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about", changeFrequency: "weekly", priority: 0.6 },
  { path: "/contact", changeFrequency: "weekly", priority: 0.5 },

  { path: "/work/n8n-ai-sales-pipeline-hubspot-automation", changeFrequency: "weekly", priority: 0.9 },
  { path: "/sfmc-custom-activity-tutorial", changeFrequency: "weekly", priority: 0.9 },
  { path: "/creating-sfmc-journey-builder-custom-activity", changeFrequency: "weekly", priority: 0.7 },
  { path: "/sfmc-journey-builder-custom-activity", changeFrequency: "weekly", priority: 0.7 },
  { path: "/sfmc-journey-builder-custom-activity-for-slack", changeFrequency: "weekly", priority: 0.7 },
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
