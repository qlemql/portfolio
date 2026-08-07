import type { Locale, Localized } from "./resume";

/** 고유명사·기술명은 문자열 그대로, 번역이 필요한 항목만 { ko, en }. */
export type SkillItem = string | Localized;

export type SkillGroup = {
  groupKey: string;
  items: SkillItem[];
};

// 각 그룹의 순서 = 프로덕션 사용 근거의 강도. 읽는 사람은 앞자리를 "자신 있는 순서"로
// 읽으므로, 경력 본문에 근거가 없는 항목을 앞에 두면 갭이 아니라 불일치로 읽힌다.
// Next.js가 뒤로 간 이유: 실무 근거가 없다(개인 포트폴리오 + 프로덕션 SSR PR 리뷰만 —
// career-claims 3절). 목록에서 빼지는 않는다 — 키워드 스캔에는 걸려야 하고,
// 자리만 정직하게 둔다. 실제로 최근 쓰는 것만 남기고 레거시는 뺐다.
export const SKILLS: SkillGroup[] = [
  {
    groupKey: "g1",
    items: ["React 18/19", "TypeScript", "Vue 3", "React Native / Expo", "Zustand", "Next.js"],
  },
  { groupKey: "g2", items: ["TanStack Query", "SSE", "Vitest", "MSW"] },
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
