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
            ? "Ria MVP에서는 견적을 시작하려면 자유 입력 필드 12개를 채워야 했고, 디자이너가 없어 PO가 직접 만든 UX가 품질을 갉아먹고 있었습니다. 입력을 3개 카테고리와 선택지 UI로 압축하고, 일정과 지역을 기준으로 호텔을 자동 추천하도록 했습니다. 그리고 디자이너가 합류한 시점에 인증, 견적, 조회, 마이페이지 전체 플로우를 디자인 시스템으로 다시 설계해, 견적 생성 시간을 70% 줄였습니다."
            : "Ria's MVP made you fill 12 open-ended fields just to start a quote, and with no designer, the PO-built UX kept dragging quality down. I compressed the input into 3 category-driven choices and added auto-suggested hotels based on date and region. Then, once a designer joined, I redesigned the whole flow (auth, quote, view, my-page) on a design system, cutting quote creation time by 70%."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "MVP를 출시한 뒤 두 가지가 동시에 보였습니다. 견적서 한 건을 만들려면 입력 폼 12개를 모두 채워야 했고, 디자이너가 없어 PO가 직접 만든 화면이 쌓이면서 일관성과 접근성, 우선순위가 흔들리고 있었습니다. 처음에는 폼만 줄이자는 작업으로 시작했는데, 디자이너가 합류하면서 폼과 전체 플로우로 범위가 넓어졌습니다."
            : "After the MVP launched, two things stood out. Creating a single quote required filling all 12 form fields, and with no designer, the PO-built screens kept piling up while consistency, accessibility, and priority drifted. It began as just shrinking the form, but once a designer joined, the scope grew to the form and the whole flow."}
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
                ? "기존 12개 자유 입력 필드를 언제(일정), 어디(지역), 어떻게(스타일) 세 카테고리로 묶었습니다. 사용자가 입력하는 대신 선택하도록 한 것입니다."
                : "I collapsed the 12 open-ended fields into three categories: when (date), where (region), and how (style), so the user picks instead of typing."}
            </li>
            <li>
              {isKo
                ? "일정과 지역만 정해지면 다음 단계의 호텔 후보를 자동으로 추천했습니다. 빈 입력칸 앞에서 뭘 적어야 하지 하고 멈추는 마찰을 없앤 것입니다."
                : "Once the date and region were set, the next step auto-suggested hotels, removing the pause where users stop in front of a blank field wondering what to write."}
            </li>
            <li>
              {isKo
                ? "결과적으로 견적 생성 시간이 70% 줄었습니다. 채워야 할 양이 아니라 골라야 할 양이 줄어든 효과였습니다."
                : "The result was 70% faster quote creation. The win came from reducing how much there is to choose, not how much to type."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2) 디자인 시스템 — 디자이너 합류 시점에 전면 재설계" : "2) Design system — full redesign once a designer joined"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "왜: 화면이 쌓일수록 비슷한 컴포넌트가 조금씩 다른 방언으로 갈라졌습니다. 디자이너가 합류한 시점이 그걸 통합하는 비용이 가장 낮은 순간이었습니다."
                : "Why: as screens piled up, similar components drifted into slightly different dialects. A designer's arrival was the cheapest moment to consolidate them."}
            </li>
            <li>
              {isKo
                ? "재설계 범위: 인증, 견적, 조회, 마이페이지 네 개 플로우 전체에 더해 디자인 토큰과 일관된 컴포넌트 시스템까지였습니다."
                : "Scope: the four flows end to end (auth, quote, view, my-page), plus design tokens and a unified component system."}
            </li>
            <li>
              {isKo
                ? "결과: 이후로는 새 화면을 새로 그리는 게 아니라 기존 컴포넌트를 조합하는 일로 끝났습니다."
                : "Outcome: new screens after this were a matter of composing existing components, not drawing from scratch."}
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
                ? "Workspace 기반 모노레포에서 공통 로직과 타입, 유틸리티를 Shared 패키지로 분리했습니다. 견적 도메인 모델이 인증과 마이페이지에서 어긋나지 않도록 보장하기 위해서였습니다."
                : "In the Workspace-based monorepo, I moved common logic, types, and utilities into a Shared package, to keep the quote domain model identical across auth and my-page."}
            </li>
            <li>
              {isKo
                ? "디자인 시스템과 도메인 타입을 Shared에 함께 두니, 이후 B2C 확장 작업이 같은 토대 위에서 빠르게 시작됐습니다."
                : "With the design system and domain types co-located in Shared, the later B2C extension started quickly on the same foundation."}
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
              ? "인증, 견적, 조회, 마이페이지 네 플로우 전체를 디자인 시스템 위로 재배치"
              : "All 4 flows (auth, quote, view, my-page) replatformed on the design system"}
          </li>
          <li>
            {isKo
              ? "이후 B2C 확장을 같은 컴포넌트와 도메인 토대 위에서 시작할 수 있게 됨"
              : "The later B2C extension could start on the same components and domain foundation"}
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
              ? "폼을 줄이는 일의 본질은 필드 수가 아니라 빈 칸 앞에서 멈추는 순간을 없애는 것이었습니다. 12개를 3개로 줄인 건 입력 개수가 아니라 사용자의 인지 부하를 줄인 것입니다."
              : "Shortening a form wasn't really about field count; it was about removing the moment where users pause in front of a blank field. Going from 12 to 3 cut cognitive load, not just input count."}
          </li>
          <li>
            {isKo
              ? "디자인 시스템을 도입할 타이밍은 필요해진 시점이 아니라 도입 비용이 가장 낮은 시점이었습니다. 디자이너가 합류한 때가 바로 그 지점이었습니다."
              : "The right time to adopt a design system wasn't when it became necessary, but when the cost of adopting was lowest. A designer joining was exactly that point."}
          </li>
          <li>
            {isKo
              ? "모노레포의 Shared 패키지는 미적 통일이 아니라 도메인 모델의 단일 출처를 보장하는 도구였습니다. 견적 타입이 두 곳에 살면 결국 그 두 곳이 서로 어긋납니다."
              : "The Shared package wasn't about aesthetic unity; it was a single source of truth for the domain model. If the quote type lives in two places, those two places eventually diverge."}
          </li>
        </ul>
      </section>
    </div>
  );
}
