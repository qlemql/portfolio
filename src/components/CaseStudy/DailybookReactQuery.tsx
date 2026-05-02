import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function DailybookReactQuery({ locale }: Props) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">TL;DR</h2>
        <p className="text-sm leading-7">
          {isKo
            ? "장애인 주간보호센터 알림장 + ERP 서비스인 \"데일리북\"에서 규모 확장 과정에 누적된 마찰 — 컴포넌트 중복, Redux Saga 보일러플레이트, 이미지 다량 로딩 — 을 Atomic Design 도입, Saga → React Query 마이그레이션, 코드 분할로 풀었습니다. 결과: API 호출 70% 감소, 개발 시간 40% 단축, 번들 사이즈 17% 감소(1.78MB → 1.47MB)."
            : "Dailybook — a notice-board + ERP for caregivers at adult day-care centers — accumulated friction as it grew: component duplication, Redux Saga boilerplate, slow image-heavy loads. I addressed each with Atomic Design, a Saga → React Query migration, and code splitting. Outcomes: 70% fewer API calls, 40% faster delivery, 17% smaller bundle (1.78MB → 1.47MB)."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "\"데일리북\"은 보호자 대상 알림장과 시설 운영 ERP가 한 화면에 공존하는 서비스입니다. 초기에는 빠르게 짠 만큼 컴포넌트가 중복되고, 서버 상태 처리는 Redux Saga로 통일되어 있었습니다. 사용자가 늘면서 알림장 이미지 다량 로딩이 초기 로딩 시간을 끌어내렸고, 신규 페이지 추가는 매번 비슷한 컴포넌트를 다시 만드는 식이 됐습니다."
            : "Dailybook combines a caregiver-facing notice board with an operations ERP in the same shell. The initial codebase shipped fast — at the cost of duplicated components, with server state handled uniformly through Redux Saga. As traffic grew, image-heavy notice posts dragged initial load down, and shipping new pages meant rebuilding similar components from scratch."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. Atomic Design 도입" : "2. Adopting Atomic Design"}
        </h2>
        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              <strong>{isKo ? "왜: " : "Why: "}</strong>
              {isKo
                ? "컴포넌트 재사용성과 UI 일관성. 신규 페이지 개발 속도가 \"기존 컴포넌트 위에 합치는 비용\" 만큼만 들도록 만들기."
                : "Component reuse and UI consistency. Make new-page delivery cost only the work of composing existing pieces."}
            </li>
            <li>
              <strong>{isKo ? "구조: " : "Structure: "}</strong>
              {isKo
                ? "Atoms (Button, Input) → Molecules (FormField) → Organisms (DataTable, Modal) → Templates → Pages."
                : "Atoms (Button, Input) → Molecules (FormField) → Organisms (DataTable, Modal) → Templates → Pages."}
            </li>
            <li>
              <strong>{isKo ? "실행: " : "Execution: "}</strong>
              {isKo
                ? "작은 단위부터 체계적으로 설계, Storybook 기반 문서화."
                : "Build bottom-up systematically, document with Storybook."}
            </li>
            <li>
              <strong>{isKo ? "결과: " : "Outcome: "}</strong>
              {isKo
                ? "프로젝트 전반에 일관된 디자인, 신규 페이지 평균 작업 시간 단축."
                : "Consistent design across the project; faster delivery on new pages."}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. Redux Saga → React Query 마이그레이션" : "3. Redux Saga → React Query migration"}
        </h2>

        <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-4 dark:bg-zinc-900/60">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "왜 마이그레이션?" : "Why migrate?"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "알림장은 보호자가 자주 다시 들어와서 보는 화면이라 서버 호출이 반복적으로 발생했습니다. Saga로 캐싱을 직접 구현하면 액션 / 리듀서 / 셀렉터를 매번 짜야 했고, 5분 캐시 + 백그라운드 갱신 같은 \"가져온 직후 너무 자주 다시 가져오지 마라\"는 정책이 코드에 명시적으로 안 박혔습니다. React Query는 그 정책을 1줄(staleTime, refetchOnWindowFocus 등)로 표현 가능합니다."
              : "Caregivers revisit the notice board often, so the same server calls fire repeatedly. Implementing caching by hand on top of Saga meant rewriting action/reducer/selector each time, and policies like \"don't refetch within 5 minutes\" weren't explicit in code. React Query expresses those policies in one line (staleTime, refetchOnWindowFocus, etc.)."}
          </p>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "어떻게 점진적으로?" : "How — incrementally"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "서버 상태 vs 클라이언트 상태 경계를 먼저 그었습니다. 서버 상태(API 응답 캐시)만 Query로, 사용자 입력 / UI 토글은 그대로 Redux."
                : "First drew the server-vs-client state boundary. Server state (API response cache) → React Query; user input / UI toggles stayed in Redux."}
            </li>
            <li>
              {isKo
                ? "큰 모듈부터 마이그레이션하지 않고, \"방문 빈도 높은 알림장\"부터 작은 슬라이스 단위로 옮겼습니다."
                : "Didn't start with the biggest module — migrated by slice, beginning with the high-traffic notice board."}
            </li>
            <li>
              {isKo
                ? "5분 캐시 + 백그라운드 갱신을 기본 설정으로, 페이지 진입 시 즉시 보이고 stale인 경우만 백그라운드 fetch."
                : "Set 5-min cache + background refetch as defaults — instant render on entry, background fetch only when stale."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "결과" : "Outcomes"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>{isKo ? "API 호출 70% 감소" : "70% fewer API calls"}</li>
            <li>
              {isKo
                ? "신규 화면 1개 만드는 데 평균 3개 파일(action / saga / reducer)에서 1개 hook으로 — 개발 시간 40% 단축"
                : "From avg 3 files (action / saga / reducer) per new screen to a single hook — 40% faster delivery"}
            </li>
            <li>{isKo ? "보일러플레이트 제거로 코드 가독성 향상" : "Less boilerplate, more readable code"}</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 성능 최적화 — 번들 17% 감소" : "4. Performance — 17% bundle reduction"}
        </h2>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
          <li>
            {isKo
              ? "Route-based Code Splitting + React.lazy + Suspense로 초기 로딩에 필요한 청크만 다운로드."
              : "Route-based code splitting + React.lazy + Suspense — only ship chunks needed for initial render."}
          </li>
          <li>
            {isKo
              ? "이미지 Lazy Loading (IntersectionObserver) — 알림장 이미지가 뷰포트에 들어왔을 때만 로드."
              : "Image lazy loading (IntersectionObserver) — only fetch notice images once they enter the viewport."}
          </li>
          <li>
            {isKo
              ? "Webpack Bundle Analyzer로 큰 의존성 식별 및 동적 import로 분할."
              : "Used Webpack Bundle Analyzer to find heavy dependencies and split via dynamic import."}
          </li>
          <li>
            <strong>{isKo ? "결과: " : "Outcome: "}</strong>
            {isKo ? "1.78MB → 1.47MB (−17%), 사용자 체감 초기 로딩 단축." : "1.78MB → 1.47MB (−17%); users perceive a faster initial load."}
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "5. 프론트엔드 팀 리드" : "5. Leading the frontend team"}
        </h2>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
          <li>{isKo ? "코드 컨벤션 문서화 + 코드 리뷰 문화 도입." : "Documented code conventions and introduced a code-review culture."}</li>
          <li>{isKo ? "라이브러리 버전 관리 문서화로 팀 내 기술 공유." : "Library version-management doc to share decisions across the team."}</li>
          <li>{isKo ? "React 공식 문서 기반 사내 스터디 주관." : "Ran an internal study group on the React docs."}</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "6. 무엇을 배웠나" : "6. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "라이브러리 교체는 \"무엇을\"이 아니라 \"어떤 정책을 코드에 명시할 것인가\"의 문제다. Saga → Query는 라이브러리 교체가 아니라 캐싱 정책 명시화의 결과."
              : "Library swaps aren't \"what\" — they're \"which policy to make explicit\". Saga → Query wasn't really a library swap; it was making caching policy explicit."}
          </li>
          <li>
            {isKo
              ? "마이그레이션은 큰 모듈이 아니라 방문 빈도 높은 슬라이스부터. 동작 검증이 빨리 누적된다."
              : "Migrate the high-traffic slice first, not the biggest module. Validation accumulates faster that way."}
          </li>
          <li>
            {isKo
              ? "디자인 시스템(Atomic)은 \"같은 모양 다른 코드\"를 줄이는 도구지, 미적 통일이 목적이 아니다."
              : "A design system (Atomic) is a tool to remove \"same look, different code\", not an aesthetic-unification goal."}
          </li>
        </ul>
      </section>
    </div>
  );
}
