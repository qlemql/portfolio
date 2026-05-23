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
            ? "장애인 주간보호센터의 알림장과 ERP를 합친 서비스 데일리북에서, 규모가 커지며 쌓인 문제들을 풀었습니다. 컴포넌트가 중복되고, Redux Saga 보일러플레이트가 많고, 이미지가 많아 로딩이 느린 상황이었습니다. 각각 Atomic Design 도입, Saga에서 React Query로의 마이그레이션, 코드 분할로 대응했습니다. 그 결과 API 호출이 70% 줄고, 개발 시간이 40% 짧아졌으며, 번들 사이즈가 17% 줄었습니다(1.78MB에서 1.47MB)."
            : "Dailybook is a notice board and ERP rolled into one, for caregivers at adult day-care centers. As it grew, problems piled up: duplicated components, Redux Saga boilerplate, and slow image-heavy loads. I tackled each with Atomic Design, a Saga-to-React-Query migration, and code splitting. The result: 70% fewer API calls, 40% faster delivery, and a 17% smaller bundle (1.78MB to 1.47MB)."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "데일리북은 보호자용 알림장과 시설 운영 ERP가 한 화면에 같이 있는 서비스입니다. 초기에 빠르게 만든 만큼 컴포넌트가 중복돼 있었고, 서버 상태는 전부 Redux Saga로 처리하고 있었습니다. 사용자가 늘면서 알림장 이미지가 많아 초기 로딩이 느려졌고, 새 페이지를 추가할 때마다 비슷한 컴포넌트를 다시 만드는 일이 반복됐습니다."
            : "Dailybook puts a caregiver-facing notice board and an operations ERP in the same shell. The early codebase shipped fast, which left duplicated components and server state handled entirely through Redux Saga. As traffic grew, image-heavy notice posts slowed the initial load, and every new page meant rebuilding similar components from scratch."}
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
                ? "컴포넌트를 재사용하고 UI를 일관되게 하기 위해서였습니다. 새 페이지를 만들 때 기존 컴포넌트를 조합하는 만큼만 시간이 들도록 하는 것이 목표였습니다."
                : "For component reuse and UI consistency. The goal was for new-page work to cost only the effort of composing pieces we already had."}
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
                ? "작은 단위부터 차근차근 설계하고 Storybook으로 문서화했습니다."
                : "Built it bottom-up and documented with Storybook."}
            </li>
            <li>
              <strong>{isKo ? "결과: " : "Outcome: "}</strong>
              {isKo
                ? "프로젝트 전반의 디자인이 일관돼졌고, 새 페이지 작업 시간이 줄었습니다."
                : "Consistent design across the project, and faster delivery on new pages."}
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
              ? "알림장은 보호자가 자주 다시 들어와 보는 화면이라 같은 서버 호출이 반복됐습니다. Saga 위에 캐싱을 직접 구현하면 액션과 리듀서, 셀렉터를 매번 짜야 했고, 가져온 직후엔 너무 자주 다시 가져오지 말라는 정책, 가령 5분 캐시나 백그라운드 갱신 같은 게 코드에 잘 드러나지 않았습니다. React Query는 그런 정책을 staleTime이나 refetchOnWindowFocus처럼 한 줄로 표현할 수 있습니다."
              : "Caregivers come back to the notice board often, so the same server calls fired again and again. Hand-rolling a cache on top of Saga meant rewriting action, reducer, and selector each time, and policies like \"don't refetch within 5 minutes\" never showed up clearly in the code. React Query lets you state those policies in one line, such as staleTime or refetchOnWindowFocus."}
          </p>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "어떻게 점진적으로?" : "How — incrementally"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "먼저 서버 상태와 클라이언트 상태의 경계를 그었습니다. API 응답 캐시 같은 서버 상태만 React Query로 옮기고, 사용자 입력이나 UI 토글은 Redux에 그대로 뒀습니다."
                : "First I drew the line between server and client state. Server state like the API response cache went to React Query, while user input and UI toggles stayed in Redux."}
            </li>
            <li>
              {isKo
                ? "큰 모듈부터 손대지 않고, 방문이 잦은 알림장부터 작은 슬라이스 단위로 옮겼습니다."
                : "Instead of starting with the biggest module, I migrated slice by slice, beginning with the high-traffic notice board."}
            </li>
            <li>
              {isKo
                ? "5분 캐시와 백그라운드 갱신을 기본값으로 두어, 페이지에 들어가면 바로 보이고 stale일 때만 백그라운드에서 다시 가져오게 했습니다."
                : "I set a 5-minute cache and background refetch as defaults, so a page renders instantly on entry and only refetches in the background when stale."}
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
                ? "새 화면 하나를 만들 때 평균 3개 파일(action, saga, reducer)이 hook 하나로 줄어 개발 시간이 40% 짧아졌습니다."
                : "A new screen went from an average of 3 files (action, saga, reducer) to a single hook, cutting delivery time by 40%."}
            </li>
            <li>{isKo ? "보일러플레이트가 줄어 코드 가독성이 좋아졌습니다." : "Less boilerplate, more readable code."}</li>
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
              ? "Route 기반 코드 분할에 React.lazy와 Suspense를 더해 초기 로딩에 필요한 청크만 내려받게 했습니다."
              : "Route-based code splitting with React.lazy and Suspense, so we only ship the chunks needed for the initial render."}
          </li>
          <li>
            {isKo
              ? "이미지는 IntersectionObserver로 지연 로딩해, 알림장 이미지가 뷰포트에 들어왔을 때만 불러왔습니다."
              : "Images lazy-loaded with IntersectionObserver, fetched only once a notice image enters the viewport."}
          </li>
          <li>
            {isKo
              ? "Webpack Bundle Analyzer로 큰 의존성을 찾아 동적 import로 나눴습니다."
              : "Used Webpack Bundle Analyzer to find heavy dependencies and split them via dynamic import."}
          </li>
          <li>
            <strong>{isKo ? "결과: " : "Outcome: "}</strong>
            {isKo ? "1.78MB에서 1.47MB로 17% 줄었고, 사용자가 체감하는 초기 로딩도 빨라졌습니다." : "1.78MB to 1.47MB, down 17%, and users feel a faster initial load."}
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "5. 프론트엔드 팀 리드" : "5. Leading the frontend team"}
        </h2>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
          <li>{isKo ? "코드 컨벤션을 문서화하고 코드 리뷰 문화를 도입했습니다." : "Documented code conventions and introduced a code-review culture."}</li>
          <li>{isKo ? "라이브러리 버전 관리를 문서로 정리해 팀 안에서 공유했습니다." : "Wrote a library version-management doc to share decisions across the team."}</li>
          <li>{isKo ? "React 공식 문서를 바탕으로 사내 스터디를 진행했습니다." : "Ran an internal study group on the React docs."}</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "6. 무엇을 배웠나" : "6. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "라이브러리를 바꾸는 일은 무엇으로 바꾸느냐보다 어떤 정책을 코드에 드러낼 거냐의 문제였습니다. Saga에서 Query로 옮긴 것도 라이브러리 교체라기보다 캐싱 정책을 코드에 드러낸 일에 가깝습니다."
              : "Swapping a library was less about what you swap to and more about which policy you make explicit in code. Moving from Saga to Query was really making the caching policy explicit, not just changing a library."}
          </li>
          <li>
            {isKo
              ? "마이그레이션은 가장 큰 모듈이 아니라 방문이 잦은 슬라이스부터 했습니다. 그래야 동작 검증이 빨리 쌓입니다."
              : "I migrated the high-traffic slice first, not the biggest module, because that way you validate the change faster."}
          </li>
          <li>
            {isKo
              ? "Atomic 같은 디자인 시스템은 모양이 같은데 코드가 다른 경우를 줄이는 도구였습니다. 미적 통일이 목적은 아니었습니다."
              : "A design system like Atomic is a tool for removing \"same look, different code\". Aesthetic unity was never the goal."}
          </li>
        </ul>
      </section>
    </div>
  );
}
