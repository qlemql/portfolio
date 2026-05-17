import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function FamilycareKidsnote({ locale }: Props) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">TL;DR</h2>
        <p className="text-sm leading-7">
          {isKo
            ? "외부 파트너(키즈노트)와 공동으로 장기요양 기관 운영 시스템을 만들면서, 동시에 우리 팀의 협업 표준을 잡았습니다. 업무 분배·PR 코드 리뷰 문화·테크 스펙 작성으로 신규 개발자 온보딩 50% 단축, Utility Types + 제네릭 표준화로 타입 에러 90% 감소, GitHub Actions 최적화로 CI 워크플로우 30% 단축(7분 → 5분). 외부 협업이 내부 표준화의 압력으로 작동한 케이스."
            : "Built a long-term-care ops system jointly with an external partner (KidsNote), and standardized our team's collaboration along the way. Task allocation, PR-review culture, and tech specs cut new-joiner onboarding by 50%. Utility types + generics standardization cut type errors by 90%. GitHub Actions tuning cut CI by 30% (7 → 5 min). External partnership turned into the forcing function for internal standards."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "라이트하우스의 \"패밀리케어\"는 장기요양 기관 운영을 디지털화하는 시스템. 키즈노트(외부 회사)와 협업으로 진행됐고, 두 팀이 같은 코드베이스에서 일했습니다. 외부 협업이 시작되자마자 \"우리 팀에 익숙한 것\"이 \"문서로 명시되어 있지 않다\"는 사실이 드러났고, 그게 표준화의 출발점이 됐습니다."
            : "Lighthouse's \"FamilyCare\" digitizes long-term-care operations. Built jointly with KidsNote (an external company) — two teams sharing one codebase. The moment the partnership started, \"what's familiar to us\" turned out to be \"not written down\" — and that was the trigger for standardization."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 핵심 의사결정" : "2. Key decisions"}
        </h2>

        <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-4 dark:bg-zinc-900/60">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "1) 팀 리드 — 외부 협업을 표준화의 압력으로" : "1) Tech lead — make external collaboration the forcing function"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "업무 분배 + 일정 관리: 두 회사가 같은 코드를 만지는 만큼, \"누가 어디까지\"의 경계가 모호하면 충돌이 누적됨. 경계를 문서로 박음."
                : "Task allocation + scheduling: when two companies touch the same code, fuzzy boundaries accumulate conflicts. Pinned boundaries in a doc."}
            </li>
            <li>
              {isKo
                ? "PR 코드 리뷰 문화 도입: \"코드를 합치는 곳\"이 \"의사결정을 합의하는 곳\"이 되도록. 외부 팀 PR도 동일한 기준으로 리뷰."
                : "Introduced PR-review culture: \"the place code merges\" became \"the place decisions get aligned\". External PRs reviewed by the same bar."}
            </li>
            <li>
              {isKo
                ? "테크 스펙 작성을 표준화: 큰 작업 전에 \"왜·무엇을·어떻게\"를 1~2장 문서로 → 외부 팀도 우리 의사결정을 따라올 수 있게."
                : "Standardized tech specs: 1–2 pages of \"why / what / how\" before larger work — so the external team could follow our reasoning."}
            </li>
            <li>
              {isKo
                ? "결과: 신규 개발자 온보딩 50% 단축. \"누군가에게 물어봐야 알 수 있는 것\"이 \"문서에 적혀 있는 것\"으로 옮겨감."
                : "Outcome: 50% faster onboarding. \"Tribal knowledge\" → \"documented knowledge\"."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2) TypeScript 표준화 — Utility Types + 제네릭" : "2) TypeScript standardization — utility types + generics"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "문제: 동일한 도메인 객체에 두 회사가 \"비슷한데 다른\" 타입을 정의. 런타임에 \"필드가 없네\" 에러가 누적."
                : "Problem: two companies defined \"similar but different\" types for the same domain object. Runtime errors like \"field missing\" piled up."}
            </li>
            <li>
              {isKo
                ? "표준: Utility Types(Pick / Omit / Partial)로 도메인 원형 타입에서 파생만 하고, 제네릭 컴포넌트(DataTable&lt;T&gt;, FormField&lt;T&gt;)로 반복 패턴을 정형화."
                : "Standard: derive only via utility types (Pick / Omit / Partial) from the canonical domain type, and formalize repeats with generic components (DataTable<T>, FormField<T>)."}
            </li>
            <li>
              {isKo
                ? "결과: 타입 에러 90% 감소. 도메인 모델이 한 곳에서만 정의되니 두 팀 사이의 \"방언\"이 사라짐."
                : "Outcome: 90% fewer type errors. One canonical domain type erased the cross-team dialects."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "3) 아키텍처 — 비즈니스 로직 / UI 분리 + Compound Component" : "3) Architecture — split business logic from UI, adopt Compound Component"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "비즈니스 로직을 hook / 도메인 모듈로 빼고 UI 컴포넌트는 렌더링만. 두 팀이 \"같은 UI에 다른 비즈니스 로직\"을 붙여도 충돌 없음."
                : "Business logic into hooks / domain modules; UI components render only. Two teams attach different logic to the same UI without colliding."}
            </li>
            <li>
              {isKo
                ? "Compound Component Pattern: 복합 UI(예: 권한별 메뉴, 단계별 폼)에서 \"껍데기 + 내부 슬롯\"으로 분리해 외부 팀이 슬롯만 채우면 끝."
                : "Compound Component Pattern: composite UI (role-based menus, multi-step forms) split into shell + named slots. External team fills only the slots."}
            </li>
            <li>
              {isKo
                ? "Canvas 기반 전자서명, 사용자 타입별 메뉴 권한, 타사 CMS 연동 등 기능 모듈도 이 패턴 위에 얹힘."
                : "Canvas-based e-signature, role-based menu permissions, third-party CMS integration — all built on top of this pattern."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "4) CI 워크플로우 30% 단축 — 7분 → 5분" : "4) CI workflow −30% — 7 min → 5 min"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "GitHub Actions 캐시·병렬 실행·불필요한 step 제거로 평균 빌드 시간 7분 → 5분."
                : "GitHub Actions caching, parallel jobs, dropped unneeded steps → average build 7 → 5 min."}
            </li>
            <li>
              {isKo
                ? "두 팀이 같은 코드베이스를 만질 때 CI 1분이 곧 \"리뷰 회전\"의 1분이라, 30% 단축이 협업 속도에 직결됨."
                : "When two teams share a codebase, 1 minute of CI = 1 minute of review turnaround. 30% off directly accelerated collaboration."}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. 결과" : "3. Outcomes"}
        </h2>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
          <li>{isKo ? "신규 개발자 온보딩 시간 50% 단축" : "New-joiner onboarding time −50%"}</li>
          <li>{isKo ? "타입 에러 90% 감소" : "Type errors −90%"}</li>
          <li>{isKo ? "CI 워크플로우 30% 단축 (7분 → 5분)" : "CI workflow −30% (7 → 5 min)"}</li>
          <li>{isKo ? "기능: Canvas 전자서명, 사용자 타입별 메뉴 권한, 타사 CMS 연동" : "Features: Canvas e-signature, role-based menu permissions, third-party CMS integration"}</li>
          <li>{isKo ? "스택: React, TypeScript, Context API, Canvas API, GitHub Actions" : "Stack: React, TypeScript, Context API, Canvas API, GitHub Actions"}</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 무엇을 배웠나" : "4. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "외부 협업은 \"우리만 알던 것\"을 \"누구나 알 수 있는 것\"으로 옮기는 가장 강한 압력이다. 내부 표준화의 동인을 외부에서 얻을 수 있다."
              : "External partnerships are the strongest forcing function to convert \"what only we know\" into \"what anyone can know\". The pressure for internal standards can come from outside."}
          </li>
          <li>
            {isKo
              ? "도메인 모델은 한 곳에서만 정의한다. 같은 객체에 두 회사가 \"비슷한데 다른\" 타입을 두면, 런타임이 그 차이를 모두 잡아 준다 — 사용자 화면에서."
              : "Define the domain model once. If two companies define \"similar but different\" types for the same object, the runtime will catch every difference — on the user's screen."}
          </li>
          <li>
            {isKo
              ? "리드의 일은 \"코드를 더 쓰기\"가 아니라 \"같은 결정을 두 번 하지 않도록 만들기\"다. PR 리뷰·테크 스펙·온보딩 표준화는 모두 같은 결정을 두 번 안 하는 도구."
              : "A lead's job isn't writing more code — it's making sure the same decision doesn't get made twice. PR review, tech specs, onboarding standards are all instruments of that."}
          </li>
        </ul>
      </section>
    </div>
  );
}
