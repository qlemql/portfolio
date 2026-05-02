export type Locale = "ko" | "en";
export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type SideProjectLink = {
  type: "github" | "website" | "app-store" | "play-store";
  url: string;
};

export type SideProject = {
  slug: string;
  name: Localized;
  tagline: Localized;
  tags: string[];
  bullets: LocalizedList;
  links: SideProjectLink[];
  publishedAt: string;
};

export const SIDE_PROJECTS: SideProject[] = [
  {
    slug: "morning-briefing",
    name: {
      ko: "Morning Briefing — 일일 AI 브리핑",
      en: "Morning Briefing — Daily AI briefing",
    },
    tagline: {
      ko: "공유 캐시 아키텍처로 API 비용을 사용자 수와 무관하게 평탄하게 유지하는 일일 AI 브리핑.",
      en: "A daily AI briefing whose API cost stays flat regardless of user count, thanks to a shared-cache architecture.",
    },
    tags: ["Next.js 16", "Claude API", "Cost Engineering", "Capacitor"],
    bullets: {
      ko: [
        "Per-user 생성 대신 일별·카테고리별 1회 서버 캐시 + 클라이언트 localStorage. API 비용을 사용자 수와 무관하게 fixed로 유지.",
        "App Store iOS 출시 (Capacitor 8). 5가지 명시 에러 상태, 페이월 블러 + 스켈레톤으로 perceived performance 향상.",
        "스택: Next.js 16 · React 19 · TypeScript 5 · Tailwind 4 · Claude API · Vercel.",
      ],
      en: [
        "Replaced per-user generation with one-per-day-per-category server cache + client localStorage — API cost stays fixed regardless of user count.",
        "Shipped to the App Store via Capacitor 8. Five distinct error states; paywall blur + skeletons for perceived performance.",
        "Stack: Next.js 16 · React 19 · TypeScript 5 · Tailwind 4 · Claude API · Vercel.",
      ],
    },
    links: [
      { type: "github", url: "https://github.com/qlemql/morning-briefing" },
      { type: "website", url: "https://morning-briefing-mocha.vercel.app" },
    ],
    publishedAt: "2026-04-01",
  },
  {
    slug: "minimal-habit-tracker",
    name: {
      ko: "Ssak — 미니멀 습관 트래커",
      en: "Ssak — Minimal Habit Tracker",
    },
    tagline: {
      ko: "3가지 습관만, 5초로 기록. 하루 빠져도 흐름은 이어집니다.",
      en: "Three habits. Five seconds. A missed day is a comma, not a full stop.",
    },
    tags: ["React Native", "Expo", "iOS Widgets", "Mobile"],
    bullets: {
      ko: [
        "App Store + Google Play 출시. 3개 습관 제한 + 관용적 streak(\"Flow\")로 행동과학 인사이트를 제품 결정에 반영.",
        "Expo 환경에서 iOS 위젯 구현 (`@bacons/apple-targets` + custom config plugin). App Group defaults로 native ↔ JS 데이터 동기화.",
        "스택: React Native · Expo · react-native-reanimated 4 worklets.",
      ],
      en: [
        "Shipped on App Store + Google Play. The 3-habit cap and forgiving streak (\"Flow\") translate behavioral research into product decisions.",
        "iOS widgets inside an Expo app via `@bacons/apple-targets` and a custom config plugin; App Group defaults for native ↔ JS sync.",
        "Stack: React Native · Expo · react-native-reanimated 4 worklets.",
      ],
    },
    links: [{ type: "github", url: "https://github.com/qlemql/minimal-habit-tracker" }],
    publishedAt: "2026-04-12",
  },
  {
    slug: "f1-instagram",
    name: {
      ko: "F1 Instagram — 기자회견 카드뉴스 자동화",
      en: "F1 Instagram — Press conference card-news automation",
    },
    tagline: {
      ko: "F1 기자회견을 한국어 인스타그램 카드뉴스로 자동화. 월 $10 Claude API 예산 안에서 운영.",
      en: "Turns F1 press conferences into Korean Instagram carousels — under a $10/month Claude API budget.",
    },
    tags: ["Python", "Claude Haiku", "Cost Engineering", "GitHub Actions"],
    bullets: {
      ko: [
        "Sonnet → Haiku 전환 + 결정적 코드(`textwrap.wrap`)로 expensive 연산 대체. 17 LLM call이 1 코드 호출로 압축.",
        "CostGuard 모듈로 SDK 경계에서 비용 hard cap 강제. 월 $10 초과 시 BudgetExceededError + 후속 호출 차단.",
        "GitHub Actions cron으로 23 GP/year 트리거. 서버 없는 자동화.",
        "스택: Python 3.12 · Claude Haiku 4.5 · Pillow · BeautifulSoup4 · GitHub Actions.",
      ],
      en: [
        "Switched Sonnet → Haiku and replaced expensive operations with deterministic code (`textwrap.wrap`). 17 LLM calls collapsed into one code call.",
        "CostGuard enforces a hard $10/month cap at the SDK boundary; raises `BudgetExceededError` and blocks subsequent calls.",
        "GitHub Actions cron triggers ~23 GPs per year. Serverless automation.",
        "Stack: Python 3.12 · Claude Haiku 4.5 · Pillow · BeautifulSoup4 · GitHub Actions.",
      ],
    },
    links: [{ type: "github", url: "https://github.com/qlemql/f1-instagram" }],
    publishedAt: "2026-03-01",
  },
  {
    slug: "gooding",
    name: {
      ko: "구딩 — 구독 서비스 스케줄러",
      en: "Gooding — Subscription scheduler",
    },
    tagline: {
      ko: "7일 구글 스프린트로 기획부터 배포까지. 프론트엔드 7명 협업.",
      en: "Concept-to-deploy in a 7-day Google Sprint with 7 frontend engineers.",
    },
    tags: ["Next.js", "Recoil", "Tailwind", "Sprint"],
    bullets: {
      ko: [
        "7일 구글 스프린트 방식 — 기획부터 배포까지.",
        "협업 프로세스: 코드 컨벤션, PR 템플릿, 코드 리뷰.",
        "스택: Next.js (SSR), Recoil, Tailwind CSS.",
      ],
      en: [
        "7-day Google Sprint — concept to deploy.",
        "Process: code conventions, PR templates, code reviews.",
        "Stack: Next.js (SSR), Recoil, Tailwind CSS.",
      ],
    },
    links: [
      { type: "github", url: "https://github.com/Princess-Teo-And-The-Seven-Frontend/gooding" },
    ],
    publishedAt: "2022-08-01",
  },
];

export function getLinkLabel(type: SideProjectLink["type"], locale: Locale): string {
  if (locale === "ko") {
    switch (type) {
      case "github":
        return "GitHub";
      case "website":
        return "사이트";
      case "app-store":
        return "App Store";
      case "play-store":
        return "Play Store";
    }
  }
  switch (type) {
    case "github":
      return "GitHub";
    case "website":
      return "Website";
    case "app-store":
      return "App Store";
    case "play-store":
      return "Play Store";
  }
}
