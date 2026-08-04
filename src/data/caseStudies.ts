import type { Localized } from "./resume";

/**
 * 상세 하단 사실 표. 전 항목 옵셔널이고, 근거 없는 항목은 넣지 않는다 —
 * 6행을 채우려고 값을 만들면 표가 사실 표이기를 그만둔다.
 * 근거는 resume.ts(기간·역할·팀)와 케이스 본문(스택·상태·지표)에 있다.
 */
export type CaseSpec = {
  period?: string;
  role?: Localized;
  /**
   * tags와 다르다 — tags는 카드 분류용 성격 라벨(UX, Conversion)이고,
   * stack은 본문에 실제로 등장하는 기술명이다. 재사용하지 않는다.
   */
  stack?: string[];
  team?: Localized;
  status?: Localized;
  metric?: Localized;
};

export type CaseStudyMeta = {
  slug: string;
  title: Localized;
  /**
   * 카드 전용 한 줄. summary(상세용 3–4문장)를 자르지 않기 위한 별도 필드다.
   * 규칙 셋: ① 지표 열의 숫자를 반복하지 않는다 ② 제목의 주제부를 반복하지
   * 않는다 ③ "무엇을 만들었나"를 쓴다. ko 기준 55자 이내 — 카드 폭에서 2줄.
   */
  oneLiner: Localized;
  summary: Localized;
  tags: string[];
  publishedAt: string;
  /**
   * 표시용 작업 기간. 정렬은 publishedAt이 계속 담당한다.
   * resume.ts에 명시된 프로젝트 기간만 채운다 — publishedAt에서 역산하거나
   * 재직 기간으로 대신하지 않는다. 없으면 생략하는 쪽이 틀리는 쪽보다 낫다.
   */
  period?: string;
  /**
   * 카드 좌측 지표 열과 상단 스트립이 함께 읽는 값. "무엇을 얼마나 움직였나"
   * 슬롯이므로 label에는 측정 대상이 온다(가입 전환 · 견적 확인율 · 결제 전환).
   * 배포 여부·버전 같은 상태는 여기가 아니라 spec.status의 몫이다 — 상태가
   * 섞이면 홈에서 62%·3.2× 옆에 층위가 다른 값이 나란히 선다.
   * 숫자가 없는 건은 범위·개수로 채워 열을 비우지 않는다. 전부 본문에 근거가 있어야 한다.
   */
  headline: { value: string; label: Localized };
  spec?: CaseSpec;
};

export const CASE_STUDIES: CaseStudyMeta[] = [
  {
    slug: "cross-codebase-interface",
    title: {
      ko: "크로스 코드베이스 인터페이스 — 오더 ↔ 광고 송출 (postMessage/ACK)",
      en: "Cross-codebase interface — Order ↔ ad-display (postMessage/ACK)",
    },
    oneLiner: {
      ko: "별도 레포의 Vue 오더와 React 광고 모듈을 잇는 메시지 경계와 ACK 핸드셰이크",
      en: "A message boundary and ACK handshake joining Vue Order and the React ad module across repos",
    },
    summary: {
      ko: "별도 레포의 오더(Vue 3)와 광고 송출 모듈(React)을 postMessage로 잇는 인터페이스를 담당. Vue Proxy 직렬화 오류를 개별 버그가 아닌 경계 설계 문제로 정리하고, iframe 노출 전 ACK 핸드셰이크를 설계·구현해 이벤트 정합성을 확보",
      en: "Owns the postMessage interface joining Order (Vue 3) and the ad-display module (React) across repos. Reframed a Vue Proxy serialization error as a boundary-design problem, and designed and shipped an ACK handshake before the iframe reveal to secure event consistency",
    },
    tags: ["postMessage", "Cross-origin", "Vue 3 ↔ React", "iframe"],
    publishedAt: "2026-06-15",
    headline: { value: "2 repos", label: { ko: "postMessage 경계", en: "postMessage boundary" } },
    spec: {
      role: {
        ko: "인터페이스 설계·구현 담당",
        en: "Interface design and implementation owner",
      },
      stack: ["Vue 3", "React", "postMessage", "iframe"],
      team: { ko: "광고플랫폼팀 · FE 2명", en: "Ad Platform team · 2 FE" },
      status: { ko: "정기 배포 반영", en: "Landed in a regular release" },
      metric: {
        ko: "레포 2개 사이 이벤트 정합성 — ACK 핸드셰이크",
        en: "Event consistency across 2 repos — ACK handshake",
      },
    },
  },
  {
    slug: "ai-store-webview",
    title: {
      ko: "티오더AI 매장 연동 웹뷰 — 신규 0→1",
      en: "T-order AI store-linking webview — new, 0→1",
    },
    oneLiner: {
      ko: "다층 백엔드를 단일 host 스펙으로 정리하고 API 레이어부터 모킹까지 새로 구축",
      en: "Settled a layered backend into one host spec, then built the API layer through mocking from scratch",
    },
    summary: {
      ko: "다층 백엔드(ai-agent 엄브렐러·legacy PHP 프록시)를 조사해 core-service 단일 host + session-id 연동 스펙을 확정. 비밀값을 FE가 들지 않는 경계로 설계하고 API 레이어·타입·TanStack Query·MSW 모킹까지 0→1로 구축, v1.5.x 정식 배포·운영",
      en: "Mapped a layered backend (ai-agent umbrella, legacy PHP proxy) and settled on a single core-service host with session-id integration. Designed a boundary that keeps secrets off the frontend, built the API layer, types, TanStack Query, and MSW mocking from 0→1 — shipped and operating at v1.5.x",
    },
    tags: ["WebView", "TanStack Query", "MSW", "0→1"],
    publishedAt: "2026-05-31",
    // 지표 열은 "무엇을 얼마나 움직였나" 슬롯이다. 라벨이 "v1.5.x 운영 중"이면
    // 측정 대상이 아니라 상태가 와서, 홈에서 가입 전환·결제 전환과 나란히 놓이면 층위가
    // 어긋난다. 버전·운영 상태는 spec.status가 계속 들고 있다.
    headline: { value: "0→1", label: { ko: "신규 구축", en: "New build" } },
    spec: {
      role: { ko: "프론트엔드 0→1 단독 구축", en: "Sole frontend engineer, 0→1" },
      stack: ["TanStack Query", "MSW", "react-router"],
      team: { ko: "광고플랫폼팀 · FE 2명", en: "Ad Platform team · 2 FE" },
      status: { ko: "정식 배포 · v1.5.x 운영 중", en: "Shipped · live at v1.5.x" },
    },
  },
  {
    slug: "ad-admin-stabilization",
    title: {
      ko: "광고 어드민 안정화 + /release 자동화",
      en: "Stabilizing the Ad Admin + automating /release",
    },
    oneLiner: {
      ko: "30여 개 파일을 단계로 나눠 옮기고, 입사 첫 주의 마찰을 워크플로우로 자동화",
      en: "Moved 30+ files in staged steps and automated first-week friction into a workflow",
    },
    summary: {
      ko: "30+ 파일 7단계 리팩토링으로 회귀 0건 유지, 그리고 신규 입사자 시점에서 본 마찰을 단계적으로 자동화한 /release 워크플로우",
      en: "30+ file 7-step refactor with zero regressions, plus a /release workflow built iteratively from a new joiner's friction",
    },
    tags: ["Refactoring", "Automation", "Onboarding"],
    publishedAt: "2026-04-30",
    headline: { value: "7단계", label: { ko: "회귀 없이 완료", en: "No regressions" } },
    spec: {
      role: {
        ko: "리팩토링 · 릴리스 자동화 담당",
        en: "Refactor and release-automation owner",
      },
      stack: ["Claude Code", "Jira"],
      team: { ko: "광고플랫폼팀 · FE 2명", en: "Ad Platform team · 2 FE" },
      status: {
        ko: "v2.1.0~v2.2.0 릴리스 주도 (70+ 커밋)",
        en: "Drove releases v2.1.0–v2.2.0 (70+ commits)",
      },
      metric: {
        ko: "30+ 파일 7단계 리팩토링 · 회귀 0건",
        en: "30+ files across 7 steps · zero regressions",
      },
    },
  },
  {
    slug: "ai-collab-infra",
    title: {
      ko: "AI 협업 인프라 — 계층형 Claude Code 설정",
      en: "AI collaboration infra — layered Claude Code config",
    },
    oneLiner: {
      ko: "모노레포 도메인 경계에 맞춰 컨텍스트와 권한을 나눈 계층형 AI 설정",
      en: "Layered AI config that splits context and permissions along monorepo domain boundaries",
    },
    summary: {
      ko: "모노레포의 도메인 경계에 맞춰 컨텍스트와 권한을 분리한 계층형 설정 아키텍처. Custom Skill·Hook·MCP 4종 통합으로 반복 작업과 외부 컨텍스트 진입을 자동화",
      en: "A layered config architecture that separates context and permissions along domain boundaries in the monorepo. Custom Skills, Hooks, and 4 MCP integrations automate repetitive workflows and external-context entry",
    },
    tags: ["AI", "Tooling", "MCP", "Productivity"],
    publishedAt: "2026-04-30",
    headline: { value: "MCP 4종", label: { ko: "계층형 설정", en: "Layered config" } },
    spec: {
      role: {
        ko: "팀 AI 협업 인프라 설계·구축",
        en: "Designed and built the team's AI collaboration infra",
      },
      stack: ["Claude Code", "MCP", "Jira", "Figma"],
      team: { ko: "프론트엔드 챕터 · 5명", en: "Frontend Chapter · 5" },
      metric: {
        ko: "계층형 설정 3층(공통 / FE / BE) · MCP 4종 통합",
        en: "3-layer config (shared / FE / BE) · 4 MCP integrations",
      },
    },
  },
  {
    slug: "data-driven-ux",
    title: {
      ko: "데이터 기반 UX 실험 — 견적 확인 58→90%, 견적→결제 0→50%",
      en: "Data-driven UX experiments — quote views 58→90%, quote→payment 0→50%",
    },
    oneLiner: {
      ko: "전날 데이터로 당일 실험을 정하는 일일 사이클을 PO·PD와 함께 운영",
      en: "Ran a daily cycle with PO and PD — prior-day data decided same-day experiments",
    },
    summary: {
      ko: "매일 아침 전날 데이터를 리뷰하고 당일 실험을 결정하는 일일 사이클로 견적 확인율 58%→90%, 견적→결제 전환율 0%→50%, 비회원 견적 요청 53%→62%를 만들어낸 PO·PD·개발 합동 실험 운영기",
      en: "A daily cadence with PO, PD, and engineering — every morning we reviewed prior-day data and decided same-day experiments. Outcomes: quote view 58→90%, quote→payment conversion 0→50%, guest quote-request 53→62%",
    },
    tags: ["Experiments", "GA4", "Clarity", "Data-driven"],
    publishedAt: "2025-07-31",
    headline: { value: "58→90%", label: { ko: "견적 확인율", en: "Quote view rate" } },
    spec: {
      role: {
        ko: "프론트엔드 단독 · PO·PD 합동 실험 운영",
        en: "Sole frontend engineer · ran the experiment cycle with PO and PD",
      },
      stack: ["GA4", "Microsoft Clarity", "Datadog RUM"],
      team: {
        ko: "개발 3명 · 전체 5명 (+ PO, PD)",
        en: "3 engineers · 5 total (+ PO, PD)",
      },
      metric: {
        ko: "견적 확인 58→90% · 견적→결제 0→50% · 비회원 견적 53→62%",
        en: "Quote views 58→90% · quote→payment 0→50% · guest quote-request 53→62%",
      },
    },
  },
  {
    slug: "social-login-conversion",
    title: {
      ko: "소셜 로그인 8일 — 가입 전환 3.2×",
      en: "Social login in 8 days — 3.2× signup conversion",
    },
    oneLiner: {
      // 카드 제목 주제부가 이미 "소셜 로그인 8일"이라 기간을 다시 쓰지 않는다.
      ko: "가입 절차 자체를 허들로 보고 OAuth 3종을 프론트부터 콜백까지 직접 구현",
      en: "Read the signup flow itself as the hurdle and built three OAuth providers end to end",
    },
    summary: {
      ko: "가입 전환 0.93%라는 수치에서 가입 절차 자체를 허들로 판단, OAuth 3종(Google·Kakao·Naver)을 8일 만에 붙여 가입 전환 0.93% → 3.00% (3.2배), 소셜 가입 비중 76% 달성",
      en: "Read 0.93% signup conversion as a verdict on the signup process itself, then shipped OAuth across Google / Kakao / Naver in 8 days — conversion 0.93% → 3.00% (3.2×) with 76% of signups via social",
    },
    tags: ["OAuth", "B2C", "Conversion"],
    publishedAt: "2025-06-30",
    headline: { value: "3.2×", label: { ko: "가입 전환", en: "Signup conversion" } },
    spec: {
      role: {
        ko: "프론트엔드 단독 — OAuth 플로우부터 Go 콜백 엔드포인트까지",
        en: "Sole frontend engineer — OAuth flow through the Go callback endpoints",
      },
      stack: ["OAuth", "TypeScript", "Zustand", "Go"],
      team: {
        ko: "개발 3명 · 전체 5명 (+ PO, PD)",
        en: "3 engineers · 5 total (+ PO, PD)",
      },
      status: { ko: "8일 만에 출시", en: "Shipped in 8 days" },
      metric: {
        ko: "가입 전환 0.93% → 3.00% · 소셜 가입 비중 76%",
        en: "Signup conversion 0.93% → 3.00% · 76% of signups via social",
      },
    },
  },
  {
    slug: "b2c-ota-expansion",
    title: {
      ko: "B2C OTA 확장 — 이중 결제 시스템",
      en: "B2C OTA expansion — dual payment system",
    },
    oneLiner: {
      ko: "정책 승인 지연을 국내·해외 PSP 분리로 우회해 일정을 지킨 결제 구조",
      en: "A payment structure that split domestic and overseas PSPs to route around approval delay",
    },
    summary: {
      ko: "정책 승인 지연 리스크를 단일 PSP 통합 대신 토스 + Stripe 분리로 풀어 일정을 지키고 결제 전환 62% 달성",
      en: "Resolved a PSP approval-timeline risk by splitting Toss (domestic) and Stripe (international), keeping the launch schedule and reaching 62% payment conversion",
    },
    tags: ["B2C", "Payments", "Maps", "Observability"],
    publishedAt: "2025-03-31",
    // resume.ts 프로젝트 1의 "(2024.11 - 2025.03)"이 근거.
    period: "2024.11 – 2025.03",
    headline: { value: "62%", label: { ko: "결제 전환", en: "Payment conversion" } },
    spec: {
      period: "2024.11 – 2025.03",
      role: { ko: "프론트엔드 단독 구축", en: "Sole frontend engineer" },
      stack: ["Toss Payments", "Stripe", "Google Maps", "Datadog RUM", "Sentry"],
      team: {
        ko: "개발 3명 · 전체 5명 (+ PO, PD)",
        en: "3 engineers · 5 total (+ PO, PD)",
      },
      metric: {
        ko: "결제 전환 62% · 상세 진입률 +23%",
        en: "Payment conversion 62% · +23% detail-page entry",
      },
    },
  },
  {
    slug: "quote-time-simplification",
    title: {
      // 주제부는 수치를 말하지 않는다 — −70%는 지표 슬롯의 것이고, 카드에서
      // 제목과 지표 열이 같은 숫자를 두 번 읽히게 했다. 제목은 "무엇을 했나"만 쓴다.
      // 대시 뒤에서도 "3 카테고리"를 빼 주제부와 겹치지 않게 했다.
      ko: "견적 폼을 3개 카테고리 선택지로 축약 — 12 필드 재설계 + 디자인 시스템 전면 도입",
      en: "Quote form compressed to 3 category choices — 12-field redesign + full design system",
    },
    oneLiner: {
      // 필드 축약은 이제 제목이 말한다. 남은 칸은 결과의 메커니즘 — 자동 추천 — 을 쓴다.
      ko: "일정·지역 조건에 맞는 호텔 후보를 다음 단계에서 자동 제시",
      en: "Surfaces hotel candidates matching the dates and region at the next step",
    },
    summary: {
      ko: "MVP의 12개 입력 필드 + 디자이너 부재로 인한 견적 리드타임을, 3 카테고리 선택지 UI + 일정/지역 기반 호텔 자동 추천 + 디자인 시스템 전면 도입으로 70% 단축",
      en: "The MVP's 12-input form plus a missing designer dragged quote lead time. Compressed to 3 category-driven inputs, auto-suggest hotels by date/region, and a unified design system — 70% faster",
    },
    tags: ["UX", "Design System", "Monorepo"],
    publishedAt: "2024-10-31",
    headline: { value: "−70%", label: { ko: "견적 시간", en: "Quote time" } },
    spec: {
      role: {
        ko: "프론트엔드 단독 · 디자인 시스템 도입 주도",
        en: "Sole frontend engineer · led the design-system rollout",
      },
      stack: ["React", "TypeScript", "pnpm workspace"],
      team: {
        ko: "개발 3명 · 전체 5명 (+ PO, PD)",
        en: "3 engineers · 5 total (+ PO, PD)",
      },
      metric: {
        // 필드 축약은 제목이 말한다 — 지표 행은 수치만 남긴다.
        ko: "견적 생성 시간 −70%",
        en: "Quote creation time −70%",
      },
    },
  },
  {
    slug: "mvp-sse-streaming",
    title: {
      ko: "Ria MVP — SSE 스트리밍 + Strategy Pattern 5+ AI 응답",
      en: "Ria MVP — SSE streaming + Strategy Pattern for 5+ AI response types",
    },
    oneLiner: {
      // 지표 열이 이미 "5+ / AI 응답 타입"이라 개수를 쓰지 않는다.
      ko: "POST 스트리밍과 재연결을 직접 구현하고 응답 유형별 처리를 패턴으로 분리",
      en: "Implemented POST streaming with reconnection and split response handling by pattern",
    },
    summary: {
      ko: "Server-Sent Events로 POST + 스트리밍 응답을 구현하고 exponential backoff 재연결을 더해, AI 엔지니어와 공동 정의한 5+ AI 응답 타입을 Strategy Pattern으로 분기 처리한 모노레포 MVP",
      en: "Server-Sent Events for POST + streamed response with exponential-backoff reconnection. A Strategy Pattern handles 5+ AI response types co-defined with the AI engineer — all inside a pnpm workspace monorepo MVP",
    },
    tags: ["SSE", "Monorepo", "AI", "Strategy Pattern"],
    publishedAt: "2024-03-31",
    headline: { value: "5+", label: { ko: "AI 응답 타입", en: "AI response types" } },
    spec: {
      role: { ko: "프론트엔드 단독 · MVP 0→1", en: "Sole frontend engineer · MVP 0→1" },
      stack: ["React", "TypeScript", "Zustand", "Server-Sent Events", "pnpm workspace"],
      team: {
        ko: "개발 3명 (CTO · AI · 프론트엔드)",
        en: "3 engineers (CTO · AI · frontend)",
      },
      metric: {
        ko: "AI 응답 타입 5종 이상을 Strategy Pattern으로 분기 · 끊겨도 자동 재연결",
        en: "5+ AI response types branched by Strategy Pattern · auto-reconnect on drop",
      },
    },
  },
  {
    slug: "familycare-kidsnote",
    title: {
      ko: "패밀리케어 — 키즈노트 협업 + 팀 리드 (협업 표준화, CI −30%)",
      en: "FamilyCare — KidsNote partnership + tech lead (collaboration standards, CI −30%)",
    },
    oneLiner: {
      ko: "외부 파트너와 함께 만들며 리뷰·스펙·온보딩을 표준화한 팀 리드 경험",
      en: "Tech-lead work building with an external partner while standardizing review, specs, onboarding",
    },
    summary: {
      ko: "키즈노트(외부 파트너)와 협업으로 장기요양 운영 시스템을 만들면서 PR 리뷰·테크 스펙·온보딩 문서를 표준화하고, 타입 정의를 단일화해 런타임 오류를 컴파일 타임으로 옮겼으며, CI를 7분→5분(−30%)으로 줄인 팀 리드 케이스",
      en: "Built a long-term-care ops system in partnership with KidsNote (external) — standardized PR review, tech specs, and onboarding docs, unified type definitions to move failures from runtime to compile time, and cut CI from 7 to 5 minutes (−30%)",
    },
    tags: ["Team Lead", "TypeScript", "Collaboration"],
    publishedAt: "2024-01-31",
    // resume.ts 라이트하우스 프로젝트 1의 "(2023.03 - 2024.01)"이 근거.
    period: "2023.03 – 2024.01",
    headline: { value: "−30%", label: { ko: "CI 7→5분", en: "CI 7→5 min" } },
    spec: {
      period: "2023.03 – 2024.01",
      role: { ko: "팀 리드", en: "Tech lead" },
      stack: ["React", "TypeScript", "Canvas", "GitHub Actions"],
      team: {
        ko: "개발팀 · 신입 2명 리드 + 외부 파트너(키즈노트)",
        en: "Engineering · led 2 junior engineers + external partner (KidsNote)",
      },
      metric: { ko: "CI 7분 → 5분 (−30%)", en: "CI 7 min → 5 min (−30%)" },
    },
  },
  {
    slug: "dailybook-react-query",
    title: {
      ko: "데일리북 — Atomic Design + Saga→Query 마이그레이션",
      en: "Dailybook — Atomic Design + Saga→Query migration",
    },
    oneLiner: {
      ko: "확장기에 쌓인 중복과 보일러플레이트를 점진 마이그레이션으로 정리",
      en: "Cleared duplication and boilerplate accumulated at scale via incremental migration",
    },
    summary: {
      ko: "규모 확장기에 누적된 컴포넌트 중복·Saga 보일러플레이트·이미지 로딩을 Atomic Design 도입과 React Query 점진 마이그레이션, 코드 분할로 풀어 API 호출 70%↓, 개발 시간 40%↓, 번들 17%↓",
      en: "At scale, accumulated component duplication, Saga boilerplate, and image-heavy loads were resolved via Atomic Design, an incremental React Query migration, and code splitting — 70% fewer API calls, 40% faster delivery, 17% smaller bundle",
    },
    tags: ["Atomic Design", "Migration", "Performance"],
    publishedAt: "2024-01-31",
    // resume.ts 라이트하우스 프로젝트 2의 "(2022.05 - 2024.01)"이 근거.
    period: "2022.05 – 2024.01",
    headline: { value: "−70%", label: { ko: "API 호출", en: "API calls" } },
    spec: {
      period: "2022.05 – 2024.01",
      role: { ko: "프론트엔드 리드", en: "Frontend lead" },
      stack: ["React", "React Query", "Redux Saga", "styled-components", "Storybook", "Webpack"],
      team: {
        ko: "개발팀 · 신입 2명 리드",
        en: "Engineering · led 2 junior engineers",
      },
      metric: {
        ko: "API 호출 −70% · 번들 1.78 → 1.47MB (−17%)",
        en: "API calls −70% · bundle 1.78 → 1.47MB (−17%)",
      },
    },
  },
];

/**
 * 쇼케이스 성격이라 시간순이 아니라 임팩트순 — 전체 목록(/projects)은 시간순 유지.
 * 임팩트순 상위만 고르면 전부 Ria가 되어 홈에서 현재 직장이 사라진다.
 * 그래서 개수를 줄이는 대신 구성 기준을 둔다: Ria 지표 3건 + 티오더 1건.
 * "무엇을 만들어냈는가"와 "지금 무엇을 하는가" 두 축을 모두 남긴다.
 */
export const FEATURED_SLUGS = [
  "social-login-conversion",
  "data-driven-ux",
  "b2c-ota-expansion",
  "ai-store-webview",
] as const;

export const FEATURED_CASE_STUDIES: CaseStudyMeta[] = FEATURED_SLUGS.map((slug) => {
  const found = CASE_STUDIES.find((c) => c.slug === slug);
  if (!found) throw new Error(`FEATURED_SLUGS contains unknown slug: ${slug}`);
  return found;
});

// 상단 스트립용. 목록 자체는 시간순을 유지하고, 이건 "목록"이 아니라 "픽"이라
// FEATURED_SLUGS의 임팩트순을 따른다.
const HEADLINE_ORDER = ["social-login-conversion", "b2c-ota-expansion", "quote-time-simplification"];
export const HEADLINE_CASE_STUDIES: CaseStudyMeta[] = HEADLINE_ORDER.map((slug) => {
  const found = CASE_STUDIES.find((c) => c.slug === slug && c.headline);
  if (!found) throw new Error(`HEADLINE_ORDER contains unknown or headline-less slug: ${slug}`);
  return found;
});

/** 상세 페이지 하단 이동. 목록과 같은 시간순 기준을 쓴다. */
export function getAdjacentCaseStudies(slug: string) {
  const i = CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return { prev: CASE_STUDIES[i - 1], next: CASE_STUDIES[i + 1] };
}

export function getCaseStudyBySlug(slug: string): CaseStudyMeta | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
