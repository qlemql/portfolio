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
            ? "외부 파트너인 키즈노트와 함께 장기요양 기관 운영 시스템을 만들면서, 그 과정에서 우리 팀의 협업 표준도 잡았습니다. 업무 분배와 PR 코드 리뷰 문화, 테크 스펙 작성으로 신규 개발자 온보딩을 50% 줄였고, Utility Types와 제네릭을 표준화해 타입 에러를 90% 줄였으며, GitHub Actions를 손봐 CI 워크플로우를 30% 단축했습니다(7분에서 5분). 외부 협업이 내부 표준화를 밀어붙이는 압력으로 작동한 사례입니다."
            : "Working with an external partner, KidsNote, on a long-term-care operations system, I also got our team's collaboration standards in place along the way. Task allocation, a PR-review culture, and tech specs cut new-joiner onboarding by 50%; standardizing utility types and generics cut type errors by 90%; and tuning GitHub Actions cut CI by 30% (7 minutes to 5). The external partnership ended up being the thing that forced our internal standards into place."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "라이트하우스의 패밀리케어는 장기요양 기관 운영을 디지털화하는 시스템입니다. 외부 회사인 키즈노트와 협업으로 진행했고, 두 팀이 같은 코드베이스에서 일했습니다. 외부 협업이 시작되자마자, 우리 팀에 익숙하던 것들이 정작 문서로는 적혀 있지 않다는 사실이 드러났습니다. 이것이 표준화의 출발점이 됐습니다."
            : "Lighthouse's FamilyCare digitizes long-term-care operations. We built it together with KidsNote, an external company, with two teams sharing one codebase. As soon as the partnership started, it became clear that what felt familiar to our team had never actually been written down. That was where standardization began."}
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
                ? "업무 분배와 일정 관리: 두 회사가 같은 코드를 다루다 보니, 누가 어디까지 맡는지 경계가 모호하면 충돌이 쌓였습니다. 그 경계를 문서로 정해 뒀습니다."
                : "Task allocation and scheduling: when two companies touch the same code, fuzzy boundaries pile up conflicts. I pinned those boundaries down in a doc."}
            </li>
            <li>
              {isKo
                ? "PR 코드 리뷰 문화 도입: 코드를 합치는 자리가 의사결정을 맞추는 자리가 되도록 했습니다. 외부 팀 PR도 같은 기준으로 리뷰했습니다."
                : "Introduced a PR-review culture so that the place where code merges became the place where decisions get aligned. External PRs were reviewed by the same bar."}
            </li>
            <li>
              {isKo
                ? "테크 스펙 작성을 표준화: 큰 작업 전에 왜, 무엇을, 어떻게를 한두 장 문서로 남겨, 외부 팀도 우리 의사결정을 따라올 수 있게 했습니다."
                : "Standardized tech specs: a one-to-two-page \"why, what, how\" before larger work, so the external team could follow our reasoning."}
            </li>
            <li>
              {isKo
                ? "결과: 신규 개발자 온보딩이 50% 줄었습니다. 누군가에게 물어봐야 알 수 있던 것들이 문서에 적힌 것으로 옮겨갔습니다."
                : "Outcome: onboarding for new joiners dropped by 50%. Knowledge that used to require asking someone moved into documents."}
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
                ? "문제: 같은 도메인 객체를 두고 두 회사가 비슷하지만 다른 타입을 정의했습니다. 런타임에서 필드가 없다는 식의 에러가 쌓였습니다."
                : "Problem: the two companies defined similar but different types for the same domain object, and runtime errors like a missing field kept piling up."}
            </li>
            <li>
              {isKo
                ? "표준: 도메인 원형 타입에서 Utility Types(Pick, Omit, Partial)로 파생만 하도록 하고, 반복되는 패턴은 제네릭 컴포넌트(DataTable&lt;T&gt;, FormField&lt;T&gt;)로 정형화했습니다."
                : "Standard: derive only via utility types (Pick, Omit, Partial) from the canonical domain type, and formalize the repeats with generic components (DataTable<T>, FormField<T>)."}
            </li>
            <li>
              {isKo
                ? "결과: 타입 에러가 90% 줄었습니다. 도메인 모델을 한 곳에서만 정의하니 두 팀 사이의 방언이 사라졌습니다."
                : "Outcome: 90% fewer type errors. Defining the domain model in one place erased the dialects between the two teams."}
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
                ? "비즈니스 로직은 hook과 도메인 모듈로 빼고, UI 컴포넌트는 렌더링만 맡게 했습니다. 두 팀이 같은 UI에 다른 비즈니스 로직을 붙여도 충돌하지 않습니다."
                : "Business logic went into hooks and domain modules; UI components just render. The two teams can attach different logic to the same UI without colliding."}
            </li>
            <li>
              {isKo
                ? "Compound Component 패턴: 권한별 메뉴나 단계별 폼 같은 복합 UI를 껍데기와 내부 슬롯으로 나눠, 외부 팀이 슬롯만 채우면 되도록 했습니다."
                : "Compound Component pattern: composite UI like role-based menus or multi-step forms split into a shell and named slots, so the external team only fills the slots."}
            </li>
            <li>
              {isKo
                ? "Canvas 기반 전자서명, 사용자 타입별 메뉴 권한, 타사 CMS 연동 같은 기능 모듈도 이 패턴 위에 얹었습니다."
                : "Feature modules like Canvas-based e-signature, role-based menu permissions, and third-party CMS integration all sat on top of this pattern."}
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
                ? "GitHub Actions에서 캐시와 병렬 실행을 쓰고 불필요한 step을 덜어내, 평균 빌드 시간을 7분에서 5분으로 줄였습니다."
                : "With GitHub Actions caching, parallel jobs, and dropping unneeded steps, the average build dropped from 7 to 5 minutes."}
            </li>
            <li>
              {isKo
                ? "두 팀이 같은 코드베이스를 만질 때는 CI 1분이 곧 리뷰가 한 번 도는 데 드는 1분이라, 30% 단축이 협업 속도에 바로 영향을 줬습니다."
                : "When two teams share a codebase, a minute of CI is a minute of review turnaround, so cutting 30% directly sped up the collaboration."}
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
              ? "외부 협업은 우리만 알던 것을 누구나 알 수 있는 것으로 옮기게 만드는 가장 강한 압력이었습니다. 내부 표준화의 동기를 밖에서 얻을 수도 있다는 걸 알았습니다."
              : "An external partnership was the strongest pressure to turn what only we knew into what anyone could know. The motivation for internal standards can come from outside."}
          </li>
          <li>
            {isKo
              ? "도메인 모델은 한 곳에서만 정의해야 합니다. 같은 객체에 두 회사가 비슷하지만 다른 타입을 두면, 그 차이를 결국 사용자 화면에서 런타임이 다 드러냅니다."
              : "Define the domain model in one place. If two companies keep similar-but-different types for the same object, the runtime ends up surfacing every difference on the user's screen."}
          </li>
          <li>
            {isKo
              ? "리드의 일은 코드를 더 쓰는 게 아니라 같은 결정을 두 번 하지 않게 만드는 것이었습니다. PR 리뷰와 테크 스펙, 온보딩 표준화는 모두 그걸 위한 도구였습니다."
              : "A lead's job isn't writing more code; it's making sure the same decision doesn't get made twice. PR review, tech specs, and onboarding standards were all ways to do that."}
          </li>
        </ul>
      </section>
    </div>
  );
}
