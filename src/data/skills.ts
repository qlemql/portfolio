import type { Locale, Localized } from "./resume";

/** 고유명사·기술명은 문자열 그대로, 번역이 필요한 항목만 { ko, en }. */
export type SkillItem = string | Localized;

export type SkillGroup = {
  groupKey: string;
  items: SkillItem[];
};

// 각 그룹의 첫 항목이 가장 자신 있는 것. 실제로 최근 쓰는 것만 남기고 레거시는 뺐다.
export const SKILLS: SkillGroup[] = [
  {
    groupKey: "g1",
    items: ["React 18/19", "Next.js", "React Native / Expo", "TypeScript", "Vue 3"],
  },
  { groupKey: "g2", items: ["TanStack Query", "Zustand", "SSE", "MSW"] },
  {
    groupKey: "g3",
    items: ["OAuth", { ko: "Stripe / 토스", en: "Stripe / Toss" }, "Google / Naver Maps", "Sentry / Datadog"],
  },
  {
    groupKey: "g4",
    items: ["Tailwind", "Vite / Webpack", "pnpm workspace", "GitHub Actions", "Storybook"],
  },
  { groupKey: "g5", items: ["Claude Code", "MCP", "Custom Skill / Hook", "Claude API"] },
  {
    groupKey: "g6",
    items: [
      { ko: "PR 리뷰", en: "PR review" },
      { ko: "테크 스펙", en: "Tech specs" },
      { ko: "실험 문화", en: "Experimentation" },
      { ko: "온보딩 문서화", en: "Onboarding docs" },
    ],
  },
];

export function skillLabel(item: SkillItem, locale: Locale): string {
  return typeof item === "string" ? item : item[locale];
}
