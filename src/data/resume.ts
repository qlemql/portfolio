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
};

export const SUMMARY: Localized = {
  ko: "B2B/B2C 통합 플랫폼에서 4년. 가입 전환 3.2배·결제 전환 62% 같은 지표를 만들었고, 모노레포 아키텍처와 디자인 시스템부터 성능 최적화까지 전체 프론트엔드를 주도해 왔습니다. 현재는 티오더 광고 플랫폼팀에서 광고 어드민 안정화와 모노레포 단위 AI 협업 인프라 설계를 맡고 있습니다.",
  en: "Four years on B2B/B2C platforms. Delivered outcomes like 3.2× signup conversion and 62% payment conversion while leading the frontend end-to-end — monorepo architecture, design systems, and performance. Currently at T-order's Ad Platform team — stabilizing the ad admin and designing monorepo-wide AI collaboration infrastructure.",
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: { ko: "티오더 (T-order)", en: "T-order" },
    period: "2026.03 - 재직 중",
    role: { ko: "프론트엔드 엔지니어", en: "Frontend Engineer" },
    meta: { ko: "정규직 | 광고 플랫폼팀", en: "Full-time | Ad Platform Team" },
    summary: {
      ko: "광고 플랫폼 어드민(광고 어드민) 안정화 및 신규 기능 개발. 모노레포 단위 AI 협업 인프라 설계로 팀 생산성 향상에 기여.",
      en: "Stabilizing the ad admin of the ad platform and developing new features. Contributing to team productivity by designing AI collaboration infrastructure across the monorepo.",
    },
    projects: [
      {
        variant: "highlight",
        name: {
          ko: "1. /release 워크플로우 구축",
          en: "1. Building the /release workflow",
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
                "1) 초안: /release 스킬로 PR 메타데이터 기반 릴리스 노트 자동 생성 (cherry-pick은 수작업)",
                "2) 보완: 초안 운영 중 발견한 마찰점을 기반으로 cherry-pick 후보 자동 추출 + 충돌 검증 통합",
                "3) 통합: PR 본문에서 Jira 키 자동 추출, 배포 공지에 자동 삽입",
              ],
              en: [
                "1) Draft: /release skill auto-generates release notes from PR metadata (cherry-pick still manual).",
                "2) Refinement: friction surfaced while operating the draft drove auto-extraction of cherry-pick candidates plus conflict checks.",
                "3) Integration: Jira keys parsed from PR bodies and auto-inserted into deploy announcements.",
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
          ko: "2. 광고 어드민 안정화 및 리팩토링",
          en: "2. Stabilizing and refactoring the ad admin",
        },
        bullets: {
          ko: [
            "30+ 파일에 하드코딩된 도메인 문자열을 7단계에 걸쳐 상수로 리팩토링. \"렌더링 UI 텍스트 바이트 단위 동일성\"을 불변 조건으로 설정해 회귀 0건 유지",
            "버전 히스토리 버그, 인벤토리 체크박스 이슈, 광고 소재 업로드 payload 타입 등 다수 결함 수정",
            "DEV/QA 환경용 프리뷰 브랜치 배포 전략 수립 및 CI 디버깅 (CloudFront ETag 충돌 등)",
            "AI 제안을 그대로 수용하지 않고 계층 경계 보존 관점에서 반박/수정한 의사결정 기록 유지",
          ],
          en: [
            "Refactored hardcoded domain strings across 30+ files in 7 staged steps; held \"byte-level identity of rendered UI text\" as the invariant — zero regressions.",
            "Fixed version history bug, inventory checkbox issue, ad creative upload payload typing, and other defects.",
            "Set up preview branch deploy strategy for DEV/QA and debugged CI (CloudFront ETag conflicts, etc.).",
            "Pushed back on AI suggestions when they violated layer boundaries — kept a decision log of overrides.",
          ],
        },
      },
      {
        variant: "highlight",
        name: {
          ko: "3. 모노레포 단위 AI 협업 인프라 설계",
          en: "3. Designing AI collaboration infrastructure across the monorepo",
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
        ],
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
      { value: { ko: "타입 에러 −90%", en: "Type errors −90%" }, label: { ko: "Generics + Type Guards", en: "Generics + Type Guards" } },
      { value: { ko: "빌드 시간 −75%", en: "Build time −75%" }, label: { ko: "4분 → 1분", en: "4min → 1min" } },
      { value: { ko: "번들 −17%", en: "Bundle −17%" }, label: { ko: "1.78MB → 1.47MB", en: "1.78MB → 1.47MB" } },
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
        name: {
          ko: "2. 소셜 로그인 개발 → 가입 전환율 3.2배 향상 (2025.06, 8일 완성)",
          en: "2. Social login → 3.2× signup conversion (2025.06, shipped in 8 days)",
        },
        bullets: {
          ko: [
            "배경: B2C 가입 전환율 개선(0.93%) 목표",
            "실행: Google/Kakao/Naver OAuth 클라이언트, 필수 정보 부족 시 추가 입력 페이지로 리다이렉트",
            "기술 선택: OAuth 2.0 표준 준수, type-safe 인증 플로우, 에러 핸들링 강화",
            "성과: 소셜 가입 75.83%, 가입 전환율 0.93% → 3.00% (3.2배), 결제 진입 허들 제거",
            "스택: OAuth 2.0, REST API, TypeScript, Zustand",
          ],
          en: [
            "Context: PO target — improve B2C signup conversion (baseline 0.93%).",
            "Build: Google/Kakao/Naver OAuth clients; redirect to a follow-up form when required fields are missing.",
            "Tech choice: OAuth 2.0 compliant, type-safe auth flow, hardened error handling.",
            "Outcome: 75.83% social signups, 0.93% → 3.00% conversion (3.2×), removed payment entry friction.",
            "Stack: OAuth 2.0, REST API, TypeScript, Zustand.",
          ],
        },
      },
      {
        variant: "regular",
        name: { ko: "3. 데이터 기반 UX 개선 (2025.06 - 07)", en: "3. Data-driven UX improvements (2025.06 - 07)" },
        bullets: {
          ko: [
            "일일 실험 사이클: PO/PD/개발 협업으로 매일 아침 전날 데이터 리뷰 후 당일 실험 결정",
            "성과: 견적 확인율 58% → 90%, 결제 전환율 0% → 50%, 비회원 견적 요청 전환율 53% → 62%",
            "분석 도구: GA4, Clarity, Datadog",
            "개선 사례: CTA 위치 변경, 입력 폼 순서 최적화, 로딩 상태 개선",
          ],
          en: [
            "Daily experiment cadence: PO/PD/eng aligned each morning on prior-day data, decided same-day experiments.",
            "Outcomes: quote view 58% → 90%, payment conversion 0% → 50%, guest quote-request conversion 53% → 62%.",
            "Stack: GA4, Clarity, Datadog.",
            "Examples: CTA placement, form-field ordering, loading-state polish.",
          ],
        },
      },
      {
        variant: "regular",
        name: {
          ko: "4. 서비스 UX 전면 개선 → 견적 생성 시간 70% 단축 (2024.09 - 10)",
          en: "4. End-to-end UX overhaul → 70% faster quote creation (2024.09 - 10)",
        },
        bullets: {
          ko: [
            "배경: MVP 입력 폼 12개로 견적서 생성 리드타임 과다, 디자이너 부재 → PO 디자인으로 UX 품질 저하",
            "입력 플로우 간소화: 12 필드 → 3 카테고리 + 선택지 UI, 일정/지역 기반 호텔 자동 추천",
            "디자인 시스템: 디자이너 합류 후 인증/견적/조회/마이페이지 전체 플로우 재설계, 일관된 컴포넌트 시스템",
            "모노레포 구조: Shared 패키지로 공통 로직/타입/유틸리티 관리",
            "성과: 견적서 생성 시간 70% 단축",
          ],
          en: [
            "Context: 12 input fields in the MVP made quote creation slow; no designer, so PO did UX — quality suffered.",
            "Simplified input flow: 12 fields → 3 categories with choice-driven UI, auto-suggest hotels by date/region.",
            "Design system: redesigned auth / quote / view / my-page flows once a designer joined; unified component system.",
            "Monorepo: shared package for common logic/types/utilities.",
            "Outcome: 70% faster quote creation.",
          ],
        },
      },
      {
        variant: "regular",
        name: { ko: "5. MVP 개발 (2024.03)", en: "5. MVP build (2024.03)" },
        bullets: {
          ko: [
            "모노레포 아키텍처: Workspace 기반 모노레포, Shared 패키지로 공통 로직/타입/유틸리티 재사용",
            "AI 실시간 통신: Server-Sent Events(SSE)로 POST 요청 + 스트리밍 응답, 재연결(exponential backoff), 메모리 관리",
            "협업: AI 엔지니어와 API 응답 스펙 공동 정의, Strategy Pattern으로 5+ AI 응답 타입 처리",
            "스택: React 18, TypeScript, Zustand, SSE, Suspense, Error Boundary",
          ],
          en: [
            "Monorepo: Workspace-based, shared package for reusable logic/types/utilities.",
            "AI streaming: Server-Sent Events for POST + streamed response, reconnection with exponential backoff, memory management.",
            "Collaboration: co-defined API response spec with AI engineer; Strategy Pattern for 5+ response types.",
            "Stack: React 18, TypeScript, Zustand, SSE, Suspense, Error Boundary.",
          ],
        },
      },
    ],
    techContributions: {
      ko: [
        "성능 최적화: AWS Amplify 빌드 4분 → 1분대 (75% ↓), Code Splitting + Lazy Loading으로 번들 1.78MB → 1.47MB (17% ↓)",
        "TypeScript 표준화: Generics + Type Guard 표준화로 타입 에러 90% 감소",
        "테스트 도입: Jest, React Testing Library 핵심 로직 테스트",
        "다국어 시스템 (한/영) 구축",
        "테크 스펙 문서화 주도로 프로덕트팀과 원활한 소통",
        "GA4, Clarity, Datadog 연동 체계 구축으로 데이터 기반 의사결정",
      ],
      en: [
        "Perf: AWS Amplify build 4min → ~1min (−75%); code splitting + lazy loading 1.78MB → 1.47MB (−17%).",
        "TypeScript standardization: generics + type guards reduced type errors by 90%.",
        "Testing: Jest + React Testing Library on core logic.",
        "Built i18n system (ko/en).",
        "Drove tech-spec documentation for smoother product alignment.",
        "Wired GA4 / Clarity / Datadog for data-informed decisions.",
      ],
    },
  },
  {
    company: { ko: "라이트하우스", en: "Lighthouse" },
    period: "2021.12 - 2024.01 (2년 2개월)",
    role: { ko: "Frontend Engineer", en: "Frontend Engineer" },
    meta: { ko: "정규직 | 개발팀", en: "Full-time | Engineering" },
    summary: {
      ko: "장기요양/돌봄 서비스 플랫폼의 웹 프론트엔드 운영 및 개발.",
      en: "Web frontend ops and development for a long-term care / caregiving platform.",
    },
    metricsLayout: "inline",
    metrics: [
      { value: { ko: "타입 에러 −90%", en: "Type errors −90%" }, label: { ko: "", en: "" } },
      { value: { ko: "온보딩 시간 −50%", en: "Onboarding time −50%" }, label: { ko: "", en: "" } },
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
            "프로젝트: 키즈노트(타사)와 협업하여 장기요양 기관 운영 시스템 개발",
            "팀 리드: 업무 분배, 일정 관리, PR 코드 리뷰 문화 도입, 테크 스펙 작성 → 신규 개발자 온보딩 시간 50% 단축",
            "TypeScript 표준화: Utility Types + 제네릭으로 컴포넌트 표준화 → 타입 에러 90% 감소",
            "성능 개선: GitHub Actions 워크플로우 최적화 (7분 → 5분, 30% 단축)",
            "아키텍처: 비즈니스 로직과 UI 관심사 분리, Compound Component Pattern 도입",
            "기능 구현: Canvas 기반 전자서명, 사용자 타입별 메뉴 권한 관리, 타사 CMS 연동",
            "스택: React, TypeScript, Context API, Canvas API",
          ],
          en: [
            "Built a long-term-care operations system in partnership with KidsNote (external company).",
            "Led the team: task split, schedule, introduced PR-review culture, wrote tech specs → 50% faster onboarding for new joiners.",
            "TypeScript standardization with utility types + generics → 90% fewer type errors.",
            "GitHub Actions workflow optimization (7min → 5min, −30%).",
            "Architecture: separated business logic from UI; introduced Compound Component Pattern.",
            "Features: Canvas-based e-signature, role-based menu permissions, third-party CMS integration.",
            "Stack: React, TypeScript, Context API, Canvas API.",
          ],
        },
      },
      {
        variant: "highlight",
        name: {
          ko: "2. 데일리북 - 알림장 서비스 (2022.05 - 2024.01)",
          en: "2. Dailybook — notice-board service (2022.05 - 2024.01)",
        },
        sections: [
          {
            title: { ko: "배경 및 문제", en: "Context & problem" },
            paragraphs: {
              ko: [
                "장애인 주간보호센터 입소 이용인의 보호자 대상 알림장·ERP 서비스. 프로젝트 규모 확대 과정에서 컴포넌트 중복 발생, Redux Saga 보일러플레이트로 생산성 저하, 알림장 이미지 로딩 시간 증가.",
              ],
              en: [
                "Notice-board + ERP service for caregivers of clients at day-care centers for people with disabilities. As scope grew: duplicated components, Redux Saga boilerplate dragged productivity down, notice-board image loading slowed.",
              ],
            },
          },
          {
            title: { ko: "핵심 의사결정 및 실행", en: "Key decisions & execution" },
            paragraphs: {
              ko: [
                "1) Atomic Design 도입: Atoms → Molecules → Organisms → Templates → Pages, Storybook 기반 문서화 → 일관된 디자인 + 개발 효율 향상",
                "2) Redux Saga → React Query: 서버 상태를 React Query로 분리, 5분 캐시 + 백그라운드 갱신 → API 호출 70% 감소, 개발 시간 40% 단축 (3 파일 → 1 hook)",
                "3) 성능 최적화: Route-based Code Splitting, React.lazy + Suspense, 이미지 Lazy Loading → 번들 1.78MB → 1.47MB (17% 감소)",
                "4) 프론트엔드 팀 리드: 코드 컨벤션 + 코드 리뷰 문화, 라이브러리 버전 관리 문서화, 사내 React 공식 문서 스터디 주관",
              ],
              en: [
                "1) Atomic Design: Atoms → Molecules → Organisms → Templates → Pages with Storybook docs → consistent design + faster delivery.",
                "2) Redux Saga → React Query: server state migrated to React Query (5-minute cache + background refetch) → 70% fewer API calls, 40% faster delivery (3 files → 1 hook).",
                "3) Perf: route-based code splitting, React.lazy + Suspense, image lazy loading → 1.78MB → 1.47MB (−17%).",
                "4) FE lead: code conventions + review culture, library-version doc, ran an internal study group on the React docs.",
              ],
            },
          },
          {
            title: { ko: "기술 스택", en: "Stack" },
            paragraphs: {
              ko: ["React, TypeScript, Redux → React Query, styled-components, Webpack, Atomic Design Pattern"],
              en: ["React, TypeScript, Redux → React Query, styled-components, Webpack, Atomic Design Pattern"],
            },
          },
        ],
      },
      {
        variant: "regular",
        name: {
          ko: "3. 장지헬프콜 - 장지 검색 및 요청서 플랫폼 (2022.11 - 2022.12)",
          en: "3. Jangji-Helpcall — funeral-home search and request platform (2022.11 - 2022.12)",
        },
        bullets: {
          ko: [
            "서비스: 장지를 찾는 고객과 장지 업체를 매칭하는 반응형 웹",
            "React Query 도입: Redux 보일러플레이트 제거, 컴포넌트 내부에서 간단한 API 사용",
            "지도 검색: 화면 이동 시 자동 재검색, Naver Maps 인포창 React 컴포넌트 커스터마이징",
            "코드 품질: Media Query 모듈화 (styled-components css 유틸리티)로 중복 방지",
            "스택: React, TypeScript, React Query, Naver Maps API, styled-components",
          ],
          en: [
            "Service: responsive web matching customers seeking funeral homes with providers.",
            "React Query: removed Redux boilerplate, called APIs from components directly.",
            "Map search: auto re-query on viewport pan; customized Naver Maps info windows as React components.",
            "Code quality: modularized media queries via styled-components css utility to remove duplication.",
            "Stack: React, TypeScript, React Query, Naver Maps API, styled-components.",
          ],
        },
      },
      {
        variant: "regular",
        name: {
          ko: "4. 오늘케어 - MPA → SPA 전환 (2022.02 - 2023.01)",
          en: "4. TodayCare — MPA → SPA migration (2022.02 - 2023.01)",
        },
        bullets: {
          ko: [
            "서비스: 노인장기요양시설 입소 수급자의 보호자 대상 알림장 웹",
            "Atomic Design 도입: atom부터 templates까지 구성, 디자인 재사용성 향상",
            "TypeScript 도입: 런타임 에러 방지, Utility Type으로 반복 코드 제거",
            "Sentry 도입: 에러 추적 및 신속한 대응으로 안정성 향상",
            "Webpack 최적화: DotEnv 환경 분리, HtmlWebpackPlugin SEO, BundleAnalyzerPlugin",
            "스택: React, TypeScript, Redux, Webpack, Sentry",
          ],
          en: [
            "Service: notice-board web app for caregivers of long-term-care residents.",
            "Atomic Design: from atoms to templates → reusable visual language.",
            "TypeScript: prevent runtime errors; Utility Types removed repetition.",
            "Sentry: error tracking and faster response → service stability.",
            "Webpack: dotenv per environment, HtmlWebpackPlugin for SEO, BundleAnalyzerPlugin.",
            "Stack: React, TypeScript, Redux, Webpack, Sentry.",
          ],
        },
      },
      {
        variant: "regular",
        name: {
          ko: "5. 회사 소개 Landing Site (2021.12 - 2022.01)",
          en: "5. Company landing site (2021.12 - 2022.01)",
        },
        bullets: {
          ko: [
            "SEO를 위한 시맨틱 마크업 준수",
            "XMLHttpRequest로 라이브러리 없이 HTTP 통신 구현",
            "Styled-Components 글로벌 스타일/theme 활용",
          ],
          en: [
            "Semantic markup for SEO.",
            "HTTP communication via raw XMLHttpRequest (no library).",
            "Used styled-components global styles + theme.",
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
