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
];

export function getCaseStudyBySlug(slug: string): CaseStudyMeta | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
