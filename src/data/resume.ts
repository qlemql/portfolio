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
      ko: "오더(Vue3) ↔ 광고 송출 모듈(React) 크로스 코드베이스 인터페이스와 티오더AI 매장 연동 웹뷰(신규 0→1)를 맡았고, 광고 어드민 안정화·릴리스 자동화부터 모노레포 단위 AI 협업 인프라 설계까지 담당.",
      en: "Owned the cross-codebase interface between Order (Vue3) and the ad-display module (React) and the T-order AI store-linking webview (new, 0→1); also led ad-admin stabilization, release automation, and AI collaboration infrastructure across the monorepo.",
    },
    projects: [
      {
        variant: "highlight",
        name: {
          ko: "1. 오더 ↔ 광고 송출 모듈 크로스 코드베이스 인터페이스",
          en: "1. Cross-codebase interface — Order ↔ ad-display module",
        },
        sections: [
          {
            title: { ko: "배경", en: "Context" },
            paragraphs: {
              ko: [
                "별도 레포로 나뉜 오더(Vue3)와 광고 송출 모듈(React)이 postMessage로 통신해야 하는 구간. 자리에서 결제하기, 주문 완료 광고 페이지 이관을 잇는 인터페이스 작업을 맡아 주도.",
              ],
              en: [
                "Order (Vue3) and the ad-display module (React) live in separate repos and talk over postMessage. I owned the interface wiring up in-seat checkout and the order-complete ad-page handoff.",
              ],
            },
          },
          {
            title: { ko: "직렬화 경계 설계", en: "Serialization boundary design" },
            paragraphs: {
              ko: [
                "Vue 객체를 다른 모듈로 넘길 때 생긴 직렬화 오류를 단발 버그가 아닌 '경계 설계' 문제로 재정의하고, 직렬화 규칙을 송출 인터페이스 전반에 일관 적용.",
              ],
              en: [
                "Reframed a serialization error when passing Vue objects across modules as a boundary-design problem rather than a one-off bug, and applied a consistent serialization rule across the display interface.",
              ],
            },
          },
          {
            title: { ko: "ACK 핸드셰이크", en: "ACK handshake" },
            paragraphs: {
              ko: [
                "iframe 노출 전 수신 측 확인(ACK)을 받는 핸드셰이크를 설계해 이벤트 유실을 막고, 해외망 회귀까지 마무리. 머지·내부 QA 완료(정량 지표는 배포 후 측정).",
              ],
              en: [
                "Designed a handshake that waits for the receiver's ACK before revealing the iframe, preventing dropped events, and closed an overseas-network regression. Merged and internally QA'd (quantitative metrics pending post-release).",
              ],
            },
          },
        ],
      },
      {
        variant: "highlight",
        name: {
          ko: "2. 티오더AI 매장 연동 웹뷰 (신규 0→1)",
          en: "2. T-order AI store-linking webview (new, 0→1)",
        },
        sections: [
          {
            title: { ko: "배경 및 경계 설계", en: "Context & boundary design" },
            paragraphs: {
              ko: [
                "여러 갈래의 백엔드 구조를 파악한 뒤 단일 진입점 + 세션 기반 연동으로 스펙을 확정하고, 비밀값을 프론트가 들지 않도록 서버에 위임하는 경계로 설계.",
              ],
              en: [
                "After mapping the layered backend, settled on a single entry point with session-based integration — a boundary that keeps secrets on the server, never in the frontend.",
              ],
            },
          },
          {
            title: { ko: "구현", en: "Build" },
            paragraphs: {
              ko: [
                "API 레이어·도메인 타입·React Query·MSW·라우팅으로 스택을 구성하고, 세션 인터셉터로 API 호출을 단순화. 백엔드를 기준 삼아 타입·에러코드를 맞추고, 모킹 개발 모드를 구축.",
              ],
              en: [
                "Composed the stack — API layer, domain types, React Query, MSW, routing — and simplified API calls with a session interceptor. Used the backend as the source of truth to align types and error codes, and set up a mocking dev mode.",
              ],
            },
          },
        ],
      },
      {
        variant: "highlight",
        name: {
          ko: "3. /release 워크플로우 구축",
          en: "3. Building the /release workflow",
        },
        sections: [
          {
            title: { ko: "배경", en: "Context" },
            paragraphs: {
              ko: [
                "신규 입사자 시점에서 기존 릴리스 방식이 번거로웠지만, 작업에 명확한 패턴이 보여 자동화 가능성을 발견. 초안을 먼저 만들고, 운영 중 발견한 마찰점을 단계적으로 보완.",
              ],
              en: [
                "From a new joiner's perspective, the existing release process was friction-heavy — yet a clear underlying pattern surfaced, suggesting automation was viable. I shipped a minimal draft and iteratively absorbed friction points uncovered while operating it.",
              ],
            },
          },
          {
            title: { ko: "단계적 진화", en: "Iterative evolution" },
            paragraphs: {
              ko: [
                "1) 초안: PR 메타데이터로 릴리스 노트를 자동 생성 (cherry-pick은 수작업)",
                "2) 보완: 운영 중 나온 마찰점을 반영해 cherry-pick 후보 자동 추출 + 충돌 검증 추가",
                "3) 통합: PR 본문의 Jira 키를 자동 추출하고 배포 공지에 자동 삽입까지 연결 → 릴리스 노트 생성·cherry-pick·이슈 링크가 한 번의 /release로 이어지는 자동화 완성",
              ],
              en: [
                "1) Draft: auto-generate release notes from PR metadata (cherry-pick still manual).",
                "2) Refinement: friction from operating it drove auto-extraction of cherry-pick candidates plus conflict checks.",
                "3) Integration: Jira keys parsed from PR bodies and auto-inserted into deploy announcements → release notes, cherry-pick, and issue links now flow from a single /release command.",
              ],
            },
          },
          {
            title: { ko: "결과", en: "Outcome" },
            paragraphs: {
              ko: ["v2.1.0 / v2.1.1 핫픽스 / v2.2.0 릴리스 주도 (70+ 커밋 cherry-pick)."],
              en: ["Drove v2.1.0 / v2.1.1 hotfix / v2.2.0 releases (70+ commits cherry-picked)."],
            },
          },
        ],
      },
      {
        variant: "regular",
        name: {
          ko: "4. 광고 어드민 안정화 및 리팩토링",
          en: "4. Stabilizing and refactoring the ad admin",
        },
        bullets: {
          ko: [
            "30+ 파일에 하드코딩된 도메인 문자열을 7단계에 걸쳐 상수로 리팩토링. \"렌더링 UI 텍스트 바이트 단위 동일성\"을 불변 조건으로 설정해 회귀 0건 유지",
            "버전 히스토리 버그, 인벤토리 체크박스 이슈, 광고 소재 업로드 payload 타입 등 다수 결함 수정",
            "DEV/QA 환경용 프리뷰 브랜치 배포 전략 수립 및 CI 디버깅 (CloudFront ETag 충돌 등)",
            "5월 2차 배포를 직접 주도 (GitHub Actions → AWS S3 버전 생성 → 태블릿 버전 설정 → 모니터링·태깅)",
            "AI 제안도 계층 경계를 깨면 반려하고 그 의사결정을 기록으로 남김",
          ],
          en: [
            "Refactored hardcoded domain strings across 30+ files in 7 staged steps; held \"byte-level identity of rendered UI text\" as the invariant — zero regressions.",
            "Fixed version history bug, inventory checkbox issue, ad creative upload payload typing, and other defects.",
            "Set up preview branch deploy strategy for DEV/QA and debugged CI (CloudFront ETag conflicts, etc.).",
            "Drove the May second deploy end-to-end (GitHub Actions → AWS S3 versioning → tablet version config → monitoring/tagging).",
            "Rejected AI suggestions that broke layer boundaries, and kept a decision log of those calls.",
          ],
        },
      },
      {
        variant: "highlight",
        name: {
          ko: "5. 모노레포 단위 AI 협업 인프라 설계",
          en: "5. Designing AI collaboration infrastructure across the monorepo",
        },
        sections: [
          {
            title: { ko: "접근", en: "Approach" },
            paragraphs: {
              ko: [
                "공통 / 프론트엔드 / 백엔드를 분리한 계층형 Claude Code 설정 아키텍처 설계. 도메인별 컨텍스트와 권한을 명시화하고, 반복 작업은 Custom Skill·Hook으로 자동화.",
              ],
              en: [
                "Designed a layered Claude Code config architecture: shared / frontend / backend tiers with explicit context and permissions per domain. Repetitive workflows are automated via Custom Skills and Hooks.",
              ],
            },
          },
          {
            title: { ko: "통합", en: "Integration" },
            paragraphs: {
              ko: [
                "Jira / Confluence / GitHub / Figma MCP 4종 통합으로 도메인 컨텍스트 진입 비용 절감. 다중 에이전트 워크플로우 시범 운영.",
              ],
              en: [
                "Integrated 4 MCP servers (Jira / Confluence / GitHub / Figma) to lower the cost of entering domain context. Piloted multi-agent workflows.",
              ],
            },
          },
          {
            title: { ko: "자동화 산출물", en: "Automation output" },
            paragraphs: {
              ko: [
                "반복 작업을 커스텀 스킬로 자동화 — 업무일지(일/주/월), 독립 코드리뷰, PR·릴리스 등. 검증(lint·build)을 워크플로우에 내장해 '작성자 셀프리뷰 대신 독립 리뷰어' 원칙을 정립.",
              ],
              en: [
                "Custom skills automate recurring work — work logs (daily/weekly/monthly), an independent code review, and PR/release flows. lint/build checks baked into the workflow establish an 'independent reviewer over author self-review' principle.",
              ],
            },
          },
        ],
      },
      {
        variant: "regular",
        name: {
          ko: "6. 팀 온보딩 문서 체계 + 지식 인프라 구축",
          en: "6. Team onboarding docs + knowledge infrastructure",
        },
        bullets: {
          ko: [
            "FE 온보딩 Confluence 문서 체계 0→1 구축 — 컨텍스트 다이어그램(native mermaid), 프로덕트↔스택↔Repo 매핑, BFF 구조, 소켓 채널 정합.",
            "프로젝트별 문서를 5개 병렬 에이전트로 레포 검증해 23페이지 생성·갱신.",
            "신규 도메인 온보딩(멤버십/CRM·포인트 멤버십·사장님 앱) 및 인계 이슈 진단 — 매장 프리뷰 매핑 버그 원인을 localStorage 캐싱으로 규명.",
          ],
          en: [
            "Built the FE onboarding Confluence system 0→1 — context diagrams (native mermaid), product↔stack↔repo mapping, BFF structure, socket-channel alignment.",
            "Verified per-project docs against the repos with 5 parallel agents — 23 pages created/updated.",
            "Onboarded new domains (membership/CRM, point membership, owner app) and diagnosed handover issues — traced a store-preview mapping bug to localStorage caching.",
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
            "소셜 로그인 8일 구현 → 가입 전환 0.93% → 3.00% (3.2×), 소셜 가입 비중 75.83%",
            "데이터 기반 UX 일일 실험(PO·PD 합동) → 견적 확인 58→90%, 결제 전환 0→50%, 비회원 견적 53→62%",
            "견적 플로우 간소화(12 필드 → 3 카테고리) + 디자인 시스템 전면 도입 → 견적 생성 시간 −70%",
            "MVP 구축 — Workspace 모노레포, SSE 스트리밍(exponential backoff), Strategy Pattern으로 5+ AI 응답 처리",
            "성능·표준화 — 빌드 4분→1분(−75%), 코드 분할·lazy loading, TypeScript Generics·Type Guard, 다국어(한/영), GA4·Clarity·Datadog 연동",
          ],
          en: [
            "Shipped social login in 8 days → signup 0.93% → 3.00% (3.2×), 75.83% via social.",
            "Data-driven UX with daily PO/PD experiments → quote views 58→90%, payments 0→50%, guest quote-request 53→62%.",
            "Simplified the quote flow (12 fields → 3 categories) plus a full design system → −70% quote-creation time.",
            "MVP — Workspace monorepo, SSE streaming (exponential backoff), Strategy Pattern for 5+ AI response types.",
            "Perf & standards — build 4min→1min (−75%), code splitting + lazy loading, TS generics/type guards, i18n (ko/en), GA4/Clarity/Datadog.",
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
