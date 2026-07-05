import type { MetadataRoute } from "next";
import { publishedProjects } from "@/data/projects";
import { SITE_URL } from "@/constants/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/projects`, priority: 0.8 },
    ...publishedProjects.map((p) => ({
      url: `${SITE_URL}/projects/${p.id}`,
      priority: 0.6,
    })),
  ];
}
