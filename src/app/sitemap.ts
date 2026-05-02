import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/data/caseStudies";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const locales = ["ko", "en"] as const;
const staticRoutes = ["", "/resume", "/projects"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  const caseStudyEntries = locales.flatMap((locale) =>
    CASE_STUDIES.map((cs) => ({
      url: `${siteUrl}/${locale}/projects/${cs.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...caseStudyEntries];
}
