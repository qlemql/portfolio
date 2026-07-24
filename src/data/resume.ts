export type Locale = "ko" | "en";
export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type Metric = {
  value: Localized;
  label: Localized;
};

export type ProjectSection = {
  title: Localized;
  paragraphs?: LocalizedList;
  bullets?: LocalizedList;
};

export type ProjectItem = {
  variant: "highlight" | "regular";
  name: Localized;
  sections?: ProjectSection[];
  bullets?: LocalizedList;
};

export type ExperienceItem = {
  company: Localized;
  period: string;
  role: Localized;
  meta: Localized;
  summary: Localized;
  metrics?: Metric[];
  metricsLayout?: "grid" | "inline";
  projects: ProjectItem[];
  techContributions?: LocalizedList;
  portfolioHref?: string;
};

export const SUMMARY: Localized = {
  ko: "5년차 프론트엔드 엔지니어로, 무엇을 왜 만드는지부터 짚어 0→1을 출시까지 끝까지 끌고 가는 게 강점입니다. B2B/B2C 통합 플랫폼에서 가입 전환 3.2배·결제 전환 62%를 만들었고, 모노레포 아키텍처·디자인 시스템·성능 최적화까지 프론트엔드 전체를 주도해 왔습니다. 최근에는 그 방식을 AI로 확장해 — 팀에는 모노레포에 맞춘 AI 협업 인프라를 설계하고, 개인적으로는 앱을 기획부터 출시·운영까지 직접 하고 있습니다.",
  en: "A frontend engineer with 5 years of experience. My strength is nailing down what to build and why, then driving products from 0 to 1 all the way to launch. Across B2B/B2C platforms I've delivered 3.2× signup and 62% payment conversion while leading the frontend end-to-end — monorepo architecture, design systems, and performance. Lately I've extended that approach with AI: designing AI-collaboration infrastructure for the team's monorepo, and building and running my own apps end to end.",
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: { ko: "티오더 (T-order)", en: "T-order" },
    period: "2026.03 - 재직 중",
    role: { ko: "프론트엔드 엔지니어", en: "Frontend Engineer" },
    meta: { ko: "정규직", en: "Full-time" },
    summary: {
      ko: "오더(Vue3) ↔ 광고 송출 모듈(React) 크로스 코드베이스 인터페이스와 오더 태블릿 진단·개선을 담당. 티오더AI 매장 연동 웹뷰(신규 0→1) 구축·배포, 릴리스 자동화·AI 협업 인프라 등 팀 개발 기반 정비를 병행.",
      en: "Owns the cross-codebase interface between Order (Vue3) and the ad-display module (React) plus diagnostics and improvements on the order tablet. Also shipped the T-order AI store-linking webview (new, 0→1) and team infrastructure — release automation and AI collaboration tooling.",
    },
    projects: [
      {
        variant: "regular",
        name: {
          ko: "1. 오더 ↔ 광고 송출 모듈 크로스 코드베이스 인터페이스",
          en: "1. Cross-codebase interface — Order ↔ ad-display module",
        },
        bullets: {
          ko: [
            "별도 레포의 오더(Vue3)와 광고 송출 모듈(React)을 잇는 postMessage 인터페이스 담당 — 반복되던 직렬화 오류를 개별 버그가 아닌 경계 문제로 정리하고, 직렬화 규칙을 인터페이스 전반에 일관 적용",
            "iframe 노출 전 수신 확인(ACK)을 받는 핸드셰이크를 설계·구현해 이벤트 유실 차단, 해외망 회귀까지 수정해 정기 배포 반영",
            "소켓 유실·모듈 버전 불일치 등 신뢰 기반 이벤트 송수신의 구조적 한계를 정리해 공유하고, 이 경험을 신규 동시 송출 광고 인터페이스 설계에 적용 중",
          ],
          en: [
            "Own the postMessage interface joining Order (Vue3) and the ad-display module (React) across repos — turned recurring serialization failures into a boundary rule applied consistently across the interface, instead of one-off fixes.",
            "Designed and shipped an ACK handshake before the iframe reveal to stop dropped events, closing an overseas-network regression along the way.",
            "Documented the structural limits of trust-based event delivery (socket loss, module version drift) and am applying those lessons to the design of a new simulcast-ad interface.",
          ],
        },
      },
      {
        variant: "regular",
        name: {
          ko: "2. 오더 태블릿 진단·개선 (자발적 발굴)",
          en: "2. Order-tablet diagnostics & improvement (self-initiated)",
        },
        bullets: {
          ko: [
            "get_cart_list 호출량 급증을 자발적으로 조사 — 자기순환 루프를 발견하고 가설을 하나씩 반증하며 원인 범위를 좁혀 개선 에픽으로 전환·완료",
            "결제·주문 상태 갱신에도 영향을 주던 19개월 방치 소켓 재연결 버그(room 재가입 갭 최대 30분)를 코드 추적으로 규명",
            "실기기 성능 계측(perfMark 15곳)으로 병목이 Vue 재렌더(JS 87%)임을 특정하고 개선 티켓으로 체계화",
          ],
          en: [
            "Investigated a get_cart_list call-volume spike on my own initiative — found a self-perpetuating loop, refuted hypotheses one by one to narrow the cause, and converted it into an improvement epic, now closed.",
            "Traced a socket-reconnection bug left unnoticed for 19 months (up to a 30-minute room-rejoin gap) that also affected payment and order-status updates.",
            "Instrumented real devices (15 perfMark probes) to pin the bottleneck on Vue re-render (87% JS time), then organized the findings into improvement tickets.",
          ],
        },
      },
      {
        variant: "regular",
        name: { ko: "3. 그 외 주요 작업", en: "3. Other key work" },
        bullets: {
          ko: [
            "티오더AI 매장 연동 웹뷰(신규 레포) 0→1 구축 — API 레이어·도메인 타입·TanStack Query·MSW 스택 구성, v1.5.x 정식 배포·운영",
            "광고 어드민 안정화 — 30+ 파일 도메인 상수화 7단계 리팩토링(회귀 0건), 정기 배포 직접 주도",
            "오더 코드베이스 정비 — 미사용 코드·레거시 테마 −17,500줄 제거, Node 22 통일, 크로스레포 CI 결함 근본 해결",
            "/release 워크플로우 구축 — 릴리스 노트 생성·cherry-pick 후보 추출·Jira 연동 자동화, v2.1.0~v2.2.0 릴리스 주도(70+ 커밋 cherry-pick)",
            "AI 협업 인프라 — 계층형 Claude Code 설정(공통/FE/BE)·MCP 4종 통합, 업무일지·독립 코드리뷰·PR 스킬로 반복 작업 자동화",
            "FE 온보딩 Confluence 문서 체계 0→1 구축(23페이지)",
          ],
          en: [
            "Built the T-order AI store-linking webview (new repo) 0→1 — API layer, domain types, TanStack Query, MSW — shipped and operating at v1.5.x.",
            "Stabilized the ad admin — a 7-step domain-constant refactor across 30+ files with zero regressions, plus hands-on regular deploys.",
            "Cleaned up the order codebase — removed 17,500 lines of dead code and legacy themes, unified on Node 22, and root-caused cross-repo CI defects.",
            "Built the /release workflow — automated release notes, cherry-pick candidate extraction, and Jira linking; drove v2.1.0–v2.2.0 releases (70+ commits cherry-picked).",
            "AI collaboration infra — layered Claude Code config (shared/FE/BE) with 4 MCP integrations; work-log, independent code-review, and PR skills automate recurring work.",
            "Built the FE onboarding Confluence system 0→1 (23 pages).",
          ],
        },
      },
    ],
  },
  {
    company: { ko: "Riad Corporation - Ria", en: "Riad Corporation - Ria" },
    period: "2024.03 - 2025.09 (1년 6개월)",
    role: { ko: "Frontend Engineer → Product Engineer", en: "Frontend Engineer → Product Engineer" },
    meta: {
      ko: "정규직 | 개발 3명 (CTO, AI, FE) / 전체 5명 (+ PO, PD)",
      en: "Full-time | 3 engineers (CTO, AI, FE) / 5 total (+ PO, PD)",
    },
    summary: {
      ko: "B2B 단체 여행 견적 플랫폼 'Ria'를 B2C OTA 서비스로 확장하며, 프론트엔드 전체 구축 및 성장 주도.",
      en: "Extended the B2B group-travel quote platform 'Ria' into a B2C OTA service. Built and led the entire frontend.",
    },
    metricsLayout: "grid",
    metrics: [
      { value: { ko: "가입 전환 3.2×", en: "Signup 3.2×" }, label: { ko: "0.93% → 3.00%", en: "0.93% → 3.00%" } },
      { value: { ko: "결제 전환 62%", en: "Payment 62%" }, label: { ko: "이중 결제 시스템", en: "Dual payment system" } },
      { value: { ko: "견적 시간 −70%", en: "Quote time −70%" }, label: { ko: "12 필드 → 3 카테고리", en: "12 fields → 3 categories" } },
      { value: { ko: "빌드 시간 −75%", en: "Build time −75%" }, label: { ko: "4분 → 1분", en: "4min → 1min" } },
    ],
    projects: [
      {
        variant: "highlight",
        name: {
          ko: "1. B2C OTA 서비스 확장 프로젝트 (2024.11 - 2025.03)",
          en: "1. B2C OTA expansion project (2024.11 - 2025.03)",
        },
        sections: [
          {
            title: { ko: "배경 및 목적", en: "Context & goal" },
            paragraphs: {
              ko: [
                "기존 B2B 서비스를 유지하면서 개인 고객(B2C)도 동일한 조건으로 이용할 수 있도록 서비스 확장. B2B와 B2C 모두에게 즉시 예약·결제 기능을 제공하여 고객층 확보.",
              ],
              en: [
                "Extend the existing B2B service so individual (B2C) customers can use it on equal terms. Goal: instant reservation and payment for both audiences to widen the customer base.",
              ],
            },
          },
          {
            title: { ko: "핵심 의사결정 및 실행", en: "Key decisions & execution" },
            paragraphs: {
              ko: [
                "1) 이중 결제 시스템: 토스 정책 승인 지연 → Stripe 병행 (수수료 2.9%, 3일 연동) → 국내(토스) + 해외(Stripe)로 일정 준수, 결제 전환 62%",
                "2) 모바일 웹 우선: 375px 반응형, 터치 최적화, 모바일 결제 플로우 개선 → 모바일 이탈 감소",
                "3) Google Maps 4:6 분할 뷰: 클러스터링 + 커스텀 마커 → 상세 진입률 23% 향상",
                "4) Datadog RUM 도입: 결제 플로우 커스텀 이벤트로 실시간 모니터링 및 빠른 이슈 대응",
              ],
              en: [
                "1) Dual payment system: Toss approval delays → adopt Stripe in parallel (2.9% fee, 3-day integration) → met launch schedule with Toss (domestic) + Stripe (international); 62% payment conversion.",
                "2) Mobile-web first: 375px responsive, touch optimization, refined mobile payment flow → reduced mobile drop-off.",
                "3) Google Maps 4:6 split view: clustering + custom markers → 23% lift on detail-page entry.",
                "4) Datadog RUM: custom events on the payment flow for real-time monitoring and faster triage.",
              ],
            },
          },
        ],
      },
      {
        variant: "regular",
        name: { ko: "2. 그 외 주요 작업", en: "2. Other key work" },
        bullets: {
          ko: [
            "소셜 로그인 3종을 8일에 출시 — OAuth 플로우를 프론트부터 백엔드(Go) 콜백·토큰 교환 엔드포인트까지 직접 구현 → 가입 전환 0.93% → 3.00% (3.2×), 소셜 가입 비중 75.83%",
            "데이터 기반 UX 일일 실험(PO·PD 합동) → 견적 확인 58→90%, 견적→결제 전환 0→50%, 비회원 견적 53→62%",
            "견적 플로우 간소화(12 필드 → 3 카테고리) + 디자인 시스템 전면 도입 → 견적 생성 시간 −70%",
            "MVP 구축 — Workspace 모노레포, AI 응답을 SSE 실시간 스트리밍으로 처리(끊겨도 자동 재연결), 5가지 이상 응답 유형을 Strategy Pattern으로 정리",
            "성능·표준화 — 빌드 4분→1분(−75%), 코드 분할·지연 로딩, TypeScript 타입 체계 표준화(Generics·Type Guard), 다국어 지원(i18n, 한/영), GA4·Clarity·Datadog 연동",
          ],
          en: [
            "Shipped 3 social logins in 8 days — built the OAuth flow end to end, from frontend to the Go backend's callback/token-exchange endpoints → signup 0.93% → 3.00% (3.2×), 75.83% via social.",
            "Data-driven UX with daily PO/PD experiments → quote views 58→90%, quote→payment conversion 0→50%, guest quote-request 53→62%.",
            "Simplified the quote flow (12 fields → 3 categories) plus a full design system → −70% quote-creation time.",
            "MVP — Workspace monorepo; streamed AI responses over SSE with auto-reconnect, and unified 5+ response types under a Strategy Pattern.",
            "Perf & standards — build 4min→1min (−75%), code splitting + lazy loading, standardized TypeScript typing (generics, type guards), i18n (ko/en), GA4/Clarity/Datadog.",
          ],
        },
      },
    ],
    portfolioHref: "/projects",
  },
  {
    company: { ko: "라이트하우스", en: "Lighthouse" },
    period: "2021.12 - 2024.01 (2년 1개월)",
    role: { ko: "Frontend Engineer", en: "Frontend Engineer" },
    meta: { ko: "정규직 | 개발팀", en: "Full-time | Engineering" },
    summary: {
      ko: "장기요양/돌봄 서비스 플랫폼의 웹 프론트엔드 운영 및 개발.",
      en: "Web frontend ops and development for a long-term care / caregiving platform.",
    },
    metricsLayout: "inline",
    metrics: [
      { value: { ko: "API 호출 −70%", en: "API calls −70%" }, label: { ko: "React Query 캐시", en: "React Query cache" } },
      { value: { ko: "번들 사이즈 −17%", en: "Bundle −17%" }, label: { ko: "1.78 → 1.47MB", en: "1.78 → 1.47MB" } },
      { value: { ko: "워크플로우 −30%", en: "CI workflow −30%" }, label: { ko: "7분 → 5분", en: "7min → 5min" } },
    ],
    projects: [
      {
        variant: "regular",
        name: {
          ko: "1. 패밀리케어 - 키즈노트 협업 (2023.03 - 2024.01)",
          en: "1. FamilyCare — partnership with KidsNote (2023.03 - 2024.01)",
        },
        bullets: {
          ko: [
            "키즈노트(타사)와 협업해 장기요양 기관 운영 시스템 개발 — 팀 리드로 업무 분배·일정·PR 리뷰 문화·테크 스펙 담당",
            "JS 코드베이스에 TypeScript 도입을 주도 — Utility Types·제네릭으로 컴포넌트 타입을 표준화해 오류를 런타임이 아닌 컴파일 타임에 차단",
            "GitHub Actions 최적화로 CI 7분→5분(−30%), 관심사 분리 + Compound Component 패턴 도입",
            "Canvas 전자서명, 사용자 타입별 메뉴 권한, 타사 CMS 연동 (React·TypeScript·Canvas)",
          ],
          en: [
            "Built a long-term-care operations system with KidsNote (external) — as team lead I ran task allocation, scheduling, PR-review culture, and tech specs.",
            "Led the JS → TypeScript migration — standardized component types with utility types and generics, catching errors at compile time instead of runtime.",
            "GitHub Actions optimization cut CI 7→5min (−30%); separated concerns and introduced the Compound Component pattern.",
            "Canvas e-signature, role-based menu permissions, third-party CMS integration (React, TypeScript, Canvas).",
          ],
        },
      },
      {
        variant: "regular",
        name: {
          ko: "2. 데일리북 - 알림장 서비스 (2022.05 - 2024.01)",
          en: "2. Dailybook — notice-board service (2022.05 - 2024.01)",
        },
        bullets: {
          ko: [
            "장애인 주간보호센터 알림장·ERP 서비스 — 규모 확대로 생긴 컴포넌트 중복·상태관리 부담·이미지 로딩 지연을 구조 개선으로 해결",
            "Redux Saga → React Query로 서버 상태 분리(5분 캐시·중복 요청 제거) → API 호출 −70%, 보일러플레이트 3파일→1훅",
            "Atomic Design + Storybook, 코드 스플리팅·lazy 로딩으로 번들 1.78→1.47MB(−17%), FE 리드로 컨벤션·리뷰 문화 주도",
          ],
          en: [
            "Notice-board + ERP for day-care centers for people with disabilities — resolved duplicated components, state-management overhead, and slow image loading as scope grew.",
            "Migrated server state from Redux Saga to React Query (5-min cache + request dedup) → −70% API calls, boilerplate cut from 3 files to 1 hook.",
            "Atomic Design + Storybook, code splitting + lazy loading → bundle 1.78→1.47MB (−17%); as FE lead, drove conventions and review culture.",
          ],
        },
      },
      {
        variant: "regular",
        name: { ko: "3. 그 외 주요 작업", en: "3. Other key work" },
        bullets: {
          ko: [
            "장지헬프콜 — 장지 매칭 반응형 웹을 단독 구현·실서비스 배포 (Naver Maps, React Query)",
            "오늘케어 — 알림장 웹 MPA→SPA 전환, Sentry로 안정성 개선, Webpack 최적화 (Atomic Design·TypeScript)",
          ],
          en: [
            "Jangji-Helpcall — built a responsive funeral-home matching web solo and shipped to production (Naver Maps, React Query).",
            "TodayCare — migrated a notice-board web app from MPA to SPA, added Sentry for stability, optimized Webpack (Atomic Design, TypeScript).",
          ],
        },
      },
    ],
  },
];

export type EducationItem = {
  title: Localized;
  detail: Localized;
};

export const EDUCATION: EducationItem[] = [
  {
    title: { ko: "항해99 React 멘토링", en: "Hanghae99 — React mentoring" },
    detail: { ko: "스파르타 코딩클럽 | 2022.11 - 2022.12", en: "Sparta Coding Club | 2022.11 - 2022.12" },
  },
  {
    title: { ko: "항해99 부트캠프", en: "Hanghae99 — bootcamp" },
    detail: { ko: "스파르타 코딩클럽 | 2021.06 - 2021.09", en: "Sparta Coding Club | 2021.06 - 2021.09" },
  },
  {
    title: { ko: "가톨릭관동대학교", en: "Catholic Kwandong University" },
    detail: { ko: "학사", en: "Bachelor's degree" },
  },
];
