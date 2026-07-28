import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/data/caseStudies";
import { SIDE_PROJECTS } from "@/data/sideProjects";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/siteUrl";

const staticRoutes = ["", "/resume", "/projects"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const locales = routing.locales;

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );

  // 상세 페이지를 갖는 slug는 케이스 스터디 + detail이 있는 개인 프로젝트다.
  // [slug]/page.tsx의 generateStaticParams와 같은 기준을 써야 sitemap이 어긋나지 않는다.
  const detailSlugs = [
    ...CASE_STUDIES.map((cs) => cs.slug),
    ...SIDE_PROJECTS.filter((p) => p.detail).map((p) => p.slug),
  ];

  const detailEntries = locales.flatMap((locale) =>
    detailSlugs.map((slug) => ({
      url: `${SITE_URL}/${locale}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...detailEntries];
}
