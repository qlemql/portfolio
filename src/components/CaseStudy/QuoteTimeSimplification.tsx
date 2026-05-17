import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function QuoteTimeSimplification({ locale }: Props) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">TL;DR</h2>
        <p className="text-sm leading-7">
          {isKo
            ? "Ria MVP의 견적 생성은 12개의 자유 입력 필드를 채워야 시작됐고, 디자이너가 없어서 PO가 직접 만든 UX가 품질을 갉아먹고 있었습니다. 입력을 \"3개 카테고리 + 선택지 UI\"로 압축하고, 일정·지역 기반 호텔 자동 추천을 더하고, 디자이너가 합류한 시점에 인증·견적·조회·마이페이지 전체 플로우를 디자인 시스템으로 재설계해 견적 생성 시간 70% 단축."
            : "Ria's MVP made users fill 12 open-ended fields just to start a quote, and with no designer the PO-built UX kept dragging quality. I compressed the input into 3 category-driven choices, added auto-suggest hotels by date + region, and — once a designer joined — redesigned auth / quote / view / my-page through a unified design system. Quote creation: 70% faster."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "MVP 출시 후 두 가지가 동시에 보였습니다. (a) 견적서 한 건을 만들기까지 입력 폼 12개를 모두 채워야 했고, (b) 디자이너가 없어 PO가 직접 만든 화면이 누적되면서 일관성·접근성·우선순위가 흔들리고 있었습니다. 처음에는 \"폼만 줄이자\"는 작업으로 시작했지만, 디자이너가 합류한 시점에 \"폼 + 전체 플로우\"로 범위가 확장됐습니다."
            : "Two things showed up after MVP launch. (a) Creating a single quote required filling all 12 form fields. (b) With no designer, PO-built screens kept accumulating — consistency, accessibility, and priority drifted. It started as \"shrink the form\"; once a designer joined, the scope expanded to \"form + the whole flow\"."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 핵심 의사결정" : "2. Key decisions"}
        </h2>

        <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-4 dark:bg-zinc-900/60">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "1) 12 필드 → 3 카테고리 + 선택지 UI" : "1) 12 fields → 3 categories + choice-driven UI"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "기존 12개 자유 입력 필드를 \"언제(일정) · 어디(지역) · 어떻게(스타일)\" 3개 카테고리로 묶음. 사용자가 \"입력\"이 아니라 \"선택\"하도록."
                : "Collapsed 12 open-ended fields into 3 categories — when (date) · where (region) · how (style). The user picks instead of typing."}
            </li>
            <li>
              {isKo
                ? "일정·지역만 정해지면 다음 단계의 호텔 후보를 자동 추천 — 사용자가 빈 입력칸 앞에서 멈춰서 \"뭘 적어야 하지?\"를 묻는 마찰을 제거."
                : "Once date + region are set, the next step auto-suggests hotels — removing the \"what should I write?\" pause in front of a blank field."}
            </li>
            <li>
              {isKo
                ? "결과적으로 견적 생성 시간 70% 단축. \"채워야 할 양\"이 아니라 \"고를 양\"이 줄어든 효과."
                : "Outcome: 70% faster quote creation. The win came from reducing what to *choose*, not what to *type*."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2) 디자인 시스템 — 디자이너 합류 시점 전면 재설계" : "2) Design system — full redesign once a designer joined"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "Why: 화면이 누적될수록 컴포넌트가 비슷한데 다른 \"방언\"이 되어 갔고, 디자이너 합류 시점이 통합 비용을 가장 낮게 치를 수 있는 순간."
                : "Why: as screens piled up, similar components diverged into \"dialects\". A designer's arrival was the cheapest moment to consolidate."}
            </li>
            <li>
              {isKo
                ? "재설계 범위: 인증 / 견적 / 조회 / 마이페이지 4개 플로우 전체 + 디자인 토큰 + 일관된 컴포넌트 시스템."
                : "Scope: auth / quote / view / my-page — four flows end-to-end, plus design tokens and a unified component system."}
            </li>
            <li>
              {isKo
                ? "결과: 이후 신규 화면 추가가 \"새로 그리기\"가 아니라 \"기존 컴포넌트 조합\"으로 끝남."
                : "Outcome: new screens after this point were composition, not from-scratch design."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "3) 모노레포 — Shared 패키지로 공통 자산 정리" : "3) Monorepo — shared package for common assets"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "Workspace 기반 모노레포에서 공통 로직 / 타입 / 유틸리티를 Shared 패키지로 분리. 견적 도메인 모델이 인증과 마이페이지에서 어긋나지 않도록 보장."
                : "Workspace-based monorepo: common logic / types / utilities in a Shared package. Keeps the quote-domain model identical across auth and my-page."}
            </li>
            <li>
              {isKo
                ? "디자인 시스템과 도메인 타입을 함께 Shared에 두니, 이후 B2C 확장 작업이 동일한 토대 위에서 빠르게 시작됨."
                : "Design system + domain types co-located in Shared. The later B2C extension launched on top of the same foundation."}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. 결과" : "3. Outcomes"}
        </h2>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
          <li>{isKo ? "견적서 생성 시간 70% 단축" : "Quote creation time −70%"}</li>
          <li>
            {isKo
              ? "전체 4개 플로우(인증·견적·조회·마이페이지) 디자인 시스템 위에 재배치"
              : "All 4 flows (auth, quote, view, my-page) replatformed on the design system"}
          </li>
          <li>
            {isKo
              ? "이후 B2C 확장이 동일한 컴포넌트·도메인 토대 위에서 시작 가능해짐"
              : "Subsequent B2C extension launched on the same components + domain foundation"}
          </li>
          <li>{isKo ? "스택: React, TypeScript, Workspace 모노레포, Shared 패키지" : "Stack: React, TypeScript, Workspace monorepo, Shared package"}</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 무엇을 배웠나" : "4. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "폼 단축의 본질은 \"필드 수\"가 아니라 \"빈 칸 앞 멈춤\". 12 → 3은 입력 갯수가 아니라 사용자의 인지 부하를 줄인 것."
              : "Shortening a form isn't about field count — it's about removing the pause in front of a blank field. 12 → 3 cut cognitive load, not input count."}
          </li>
          <li>
            {isKo
              ? "디자인 시스템 도입의 타이밍은 \"필요해진 시점\"이 아니라 \"도입 비용이 가장 낮은 시점\"이다. 디자이너 합류는 그 비용의 최저점."
              : "The right time to adopt a design system isn't \"when it's needed\" — it's \"when the cost of adopting is lowest\". A designer arriving is that low point."}
          </li>
          <li>
            {isKo
              ? "모노레포의 Shared 패키지는 미적 통일이 아니라 도메인 모델의 단일 출처를 보장하는 도구다. 견적 타입이 두 곳에 살면 결국 두 곳이 서로 어긋난다."
              : "The Shared package isn't about aesthetic unity — it's a single source of truth for the domain model. If the quote type lives in two places, the two places eventually diverge."}
          </li>
        </ul>
      </section>
    </div>
  );
}
