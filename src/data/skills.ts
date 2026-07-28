import type { Locale, Localized } from "./resume";

/** 고유명사·기술명은 문자열 그대로, 번역이 필요한 항목만 { ko, en }. */
export type SkillItem = string | Localized;

export type SkillGroup = {
  groupKey: string;
  items: SkillItem[];
};

export const SKILLS: SkillGroup[] = [
  { groupKey: "g1", items: ["React 18/19", "TypeScript", "Zustand", "React Query", "SSE"] },
  {
    groupKey: "g2",
    items: [
      { ko: "PR 리뷰", en: "PR review" },
      { ko: "테크 스펙", en: "Tech specs" },
      "Storybook",
      { ko: "실험 문화", en: "Experimentation" },
    ],
  },
  {
    groupKey: "g3",
    items: ["OAuth", { ko: "Stripe / 토스", en: "Stripe / Toss" }, "Google / Naver Maps", "Datadog"],
  },
  { groupKey: "g4", items: ["Tailwind", "styled-components", "Webpack", "AWS Amplify"] },
  {
    groupKey: "g5",
    items: ["Claude Code", "MCP", "Custom Skill / Hook", "Task Agent", "Verification Loop"],
  },
];

export function skillLabel(item: SkillItem, locale: Locale): string {
  return typeof item === "string" ? item : item[locale];
}
