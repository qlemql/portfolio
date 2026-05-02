export type SkillGroup = {
  groupKey: string;
  items: string[];
};

export const SKILLS: SkillGroup[] = [
  { groupKey: "g1", items: ["React 18/19", "TypeScript", "Zustand", "React Query"] },
  { groupKey: "g2", items: ["PR 리뷰", "테크 스펙", "Storybook", "실험 문화"] },
  { groupKey: "g3", items: ["OAuth", "Stripe / 토스", "Google / Naver Maps", "SSE", "Datadog"] },
  { groupKey: "g4", items: ["Tailwind", "styled-components", "Webpack", "AWS Amplify"] },
];
