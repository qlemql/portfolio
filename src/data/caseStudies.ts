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
    slug: "ai-collab-infra",
    titleKey: "c3Title",
    summaryKey: "c3Summary",
    tags: ["AI", "Tooling", "MCP", "Productivity"],
    publishedAt: "2026-04-30",
  },
  {
    slug: "social-login-conversion",
    titleKey: "c5Title",
    summaryKey: "c5Summary",
    tags: ["OAuth", "B2C", "Conversion"],
    publishedAt: "2025-06-30",
  },
  {
    slug: "b2c-ota-expansion",
    titleKey: "c2Title",
    summaryKey: "c2Summary",
    tags: ["B2C", "Payments", "Maps", "Observability"],
    publishedAt: "2025-03-31",
  },
  {
    slug: "dailybook-react-query",
    titleKey: "c4Title",
    summaryKey: "c4Summary",
    tags: ["Atomic Design", "Migration", "Performance"],
    publishedAt: "2024-01-31",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyMeta | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
