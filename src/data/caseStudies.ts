import type { Localized } from "./resume";

export type CaseStudyMeta = {
  slug: string;
  title: Localized;
  summary: Localized;
  tags: string[];
  publishedAt: string;
};

export const CASE_STUDIES: CaseStudyMeta[] = [
  {
    slug: "cross-codebase-interface",
    title: {
      ko: "크로스 코드베이스 인터페이스 — 오더 ↔ 광고 송출 (postMessage/ACK)",
      en: "Cross-codebase interface — Order ↔ ad-display (postMessage/ACK)",
    },
    summary: {
      ko: "별도 레포의 오더(Vue3)와 광고 송출 모듈(React)을 postMessage로 잇는 인터페이스를 주도. Vue Proxy 직렬화 오류를 개별 버그가 아닌 경계 설계 문제로 정리하고, iframe 노출 전 ACK 핸드셰이크로 이벤트 정합성을 확보",
      en: "Led the postMessage interface joining Order (Vue3) and the ad-display module (React) across repos. Reframed a Vue Proxy serialization error as a boundary-design problem and secured event consistency with an ACK handshake before the iframe reveal",
    },
    tags: ["postMessage", "Cross-origin", "Vue3 ↔ React", "iframe"],
    publishedAt: "2026-06-15",
  },
  {
    slug: "ai-store-webview",
    title: {
      ko: "티오더AI 매장 연동 웹뷰 — 신규 0→1",
      en: "T-order AI store-linking webview — new, 0→1",
    },
    summary: {
      ko: "다층 백엔드(ai-agent 엄브렐러·legacy PHP 프록시)를 조사해 core-service 단일 host + session-id 연동 스펙을 확정. 비밀값을 FE가 들지 않는 경계로 설계하고 API 레이어·타입·TanStack Query·MSW 모킹까지 0→1로 구축",
      en: "Mapped a layered backend (ai-agent umbrella, legacy PHP proxy) and settled on a single core-service host with session-id integration. Designed a boundary that keeps secrets off the frontend, and built the API layer, types, TanStack Query, and MSW mocking from 0→1",
    },
    tags: ["WebView", "TanStack Query", "MSW", "0→1"],
    publishedAt: "2026-05-31",
  },
  {
    slug: "ad-admin-stabilization",
    title: {
      ko: "광고 어드민 안정화 + /release 자동화",
      en: "Stabilizing the Ad Admin + automating /release",
    },
    summary: {
      ko: "30+ 파일 7단계 리팩토링으로 회귀 0건 유지, 그리고 신규 입사자 시점에서 본 마찰을 단계적으로 자동화한 /release 워크플로우",
      en: "30+ file 7-step refactor with zero regressions, plus a /release workflow built iteratively from a new joiner's friction",
    },
    tags: ["Refactoring", "Automation", "Onboarding"],
    publishedAt: "2026-04-30",
  },
  {
    slug: "ai-collab-infra",
    title: {
      ko: "AI 협업 인프라 — 계층형 Claude Code 설정",
      en: "AI collaboration infra — layered Claude Code config",
    },
    summary: {
      ko: "모노레포의 도메인 경계에 맞춰 컨텍스트와 권한을 분리한 계층형 설정 아키텍처. Custom Skill·Hook·MCP 4종 통합으로 반복 작업과 외부 컨텍스트 진입을 자동화",
      en: "A layered config architecture that separates context and permissions along domain boundaries in the monorepo. Custom Skills, Hooks, and 4 MCP integrations automate repetitive workflows and external-context entry",
    },
    tags: ["AI", "Tooling", "MCP", "Productivity"],
    publishedAt: "2026-04-30",
  },
  {
    slug: "data-driven-ux",
    title: {
      ko: "데이터 기반 UX 실험 — 견적 확인 58→90%, 견적→결제 0→50%",
      en: "Data-driven UX experiments — quote views 58→90%, quote→payment 0→50%",
    },
    summary: {
      ko: "매일 아침 전날 데이터를 리뷰하고 당일 실험을 결정하는 일일 사이클로 견적 확인율 58%→90%, 견적→결제 전환율 0%→50%, 비회원 견적 요청 53%→62%를 만들어낸 PO·PD·개발 합동 실험 운영기",
      en: "A daily cadence with PO, PD, and engineering — every morning we reviewed prior-day data and decided same-day experiments. Outcomes: quote view 58→90%, quote→payment conversion 0→50%, guest quote-request 53→62%",
    },
    tags: ["Experiments", "GA4", "Clarity", "Data-driven"],
    publishedAt: "2025-07-31",
  },
  {
    slug: "social-login-conversion",
    title: {
      ko: "소셜 로그인 8일 — 가입 전환 3.2×",
      en: "Social login in 8 days — 3.2× signup conversion",
    },
    summary: {
      ko: "이메일 가입 0.93%의 어디서 막히는지 데이터로 좁힌 다음 OAuth 3종(Google·Kakao·Naver)을 8일 만에 붙여 가입 전환 0.93% → 3.00% (3.2배), 소셜 가입 비중 75.83% 달성",
      en: "Narrowed where email signup (0.93%) was blocking users via data, then shipped OAuth across Google / Kakao / Naver in 8 days — conversion 0.93% → 3.00% (3.2×) with 75.83% of signups via social",
    },
    tags: ["OAuth", "B2C", "Conversion"],
    publishedAt: "2025-06-30",
  },
  {
    slug: "b2c-ota-expansion",
    title: {
      ko: "B2C OTA 확장 — 이중 결제 시스템",
      en: "B2C OTA expansion — dual payment system",
    },
    summary: {
      ko: "정책 승인 지연 리스크를 단일 PSP 통합 대신 토스 + Stripe 분리로 풀어 일정을 지키고 결제 전환 62% 달성",
      en: "Resolved a PSP approval-timeline risk by splitting Toss (domestic) and Stripe (international), keeping the launch schedule and reaching 62% payment conversion",
    },
    tags: ["B2C", "Payments", "Maps", "Observability"],
    publishedAt: "2025-03-31",
  },
  {
    slug: "quote-time-simplification",
    title: {
      ko: "견적 생성 시간 −70% — 12 필드 → 3 카테고리 + 디자인 시스템",
      en: "Quote creation −70% — 12 fields → 3 categories + design system",
    },
    summary: {
      ko: "MVP의 12개 입력 필드 + 디자이너 부재로 인한 견적 리드타임을, 3 카테고리 선택지 UI + 일정/지역 기반 호텔 자동 추천 + 디자인 시스템 전면 도입으로 70% 단축",
      en: "The MVP's 12-input form plus a missing designer dragged quote lead time. Compressed to 3 category-driven inputs, auto-suggest hotels by date/region, and a unified design system — 70% faster",
    },
    tags: ["UX", "Design System", "Monorepo"],
    publishedAt: "2024-10-31",
  },
  {
    slug: "mvp-sse-streaming",
    title: {
      ko: "Ria MVP — SSE 스트리밍 + Strategy Pattern 5+ AI 응답",
      en: "Ria MVP — SSE streaming + Strategy Pattern for 5+ AI response types",
    },
    summary: {
      ko: "Server-Sent Events로 POST + 스트리밍 응답을 구현하고 exponential backoff 재연결·메모리 관리를 더해, AI 엔지니어와 공동 정의한 5+ AI 응답 타입을 Strategy Pattern으로 분기 처리한 모노레포 MVP",
      en: "Server-Sent Events for POST + streamed response, exponential-backoff reconnection, and memory management. A Strategy Pattern handles 5+ AI response types co-defined with the AI engineer — all inside a Workspace monorepo MVP",
    },
    tags: ["SSE", "Monorepo", "AI", "Strategy Pattern"],
    publishedAt: "2024-03-31",
  },
  {
    slug: "familycare-kidsnote",
    title: {
      ko: "패밀리케어 — 키즈노트 협업 + 팀 리드 (온보딩 −50%, 타입 에러 −90%)",
      en: "FamilyCare — KidsNote partnership + tech lead (onboarding −50%, type errors −90%)",
    },
    summary: {
      ko: "키즈노트(외부 파트너)와 협업으로 장기요양 운영 시스템을 만들면서 PR 리뷰·테크 스펙·온보딩을 표준화해 신규 개발자 온보딩 50%·타입 에러 90%·CI 워크플로우 30%를 한꺼번에 줄인 팀 리드 케이스",
      en: "Built a long-term-care ops system in partnership with KidsNote (external) while standardizing PR review, tech specs, and onboarding — cut new-joiner onboarding by 50%, type errors by 90%, and CI workflow by 30%",
    },
    tags: ["Team Lead", "TypeScript", "Collaboration"],
    publishedAt: "2024-01-31",
  },
  {
    slug: "dailybook-react-query",
    title: {
      ko: "데일리북 — Atomic Design + Saga→Query 마이그레이션",
      en: "Dailybook — Atomic Design + Saga→Query migration",
    },
    summary: {
      ko: "규모 확장기에 누적된 컴포넌트 중복·Saga 보일러플레이트·이미지 로딩을 Atomic Design 도입과 React Query 점진 마이그레이션, 코드 분할로 풀어 API 호출 70%↓, 개발 시간 40%↓, 번들 17%↓",
      en: "At scale, accumulated component duplication, Saga boilerplate, and image-heavy loads were resolved via Atomic Design, an incremental React Query migration, and code splitting — 70% fewer API calls, 40% faster delivery, 17% smaller bundle",
    },
    tags: ["Atomic Design", "Migration", "Performance"],
    publishedAt: "2024-01-31",
  },
];

export const FEATURED_SLUGS = [
  "cross-codebase-interface",
  "ai-collab-infra",
  "ad-admin-stabilization",
  "data-driven-ux",
  "social-login-conversion",
] as const;

export const FEATURED_CASE_STUDIES: CaseStudyMeta[] = FEATURED_SLUGS.map((slug) => {
  const found = CASE_STUDIES.find((c) => c.slug === slug);
  if (!found) throw new Error(`FEATURED_SLUGS contains unknown slug: ${slug}`);
  return found;
});

export function getCaseStudyBySlug(slug: string): CaseStudyMeta | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
