export type CaseStudyMeta = {
  slug: string;
  titleKey: string;
  summaryKey: string;
  tags: string[];
  publishedAt: string;
};

export const CASE_STUDIES: CaseStudyMeta[] = [
  {
    slug: "ad-admin-stabilization",
    titleKey: "c1Title",
    summaryKey: "c1Summary",
    tags: ["Refactoring", "Automation", "Onboarding"],
    publishedAt: "2026-04-30",
  },
  {
    slug: "b2c-ota-expansion",
    titleKey: "c2Title",
    summaryKey: "c2Summary",
    tags: ["B2C", "Payments", "Maps", "Observability"],
    publishedAt: "2025-03-31",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyMeta | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
