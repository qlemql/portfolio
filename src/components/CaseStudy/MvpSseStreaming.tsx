import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function MvpSseStreaming({ locale }: Props) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">TL;DR</h2>
        <p className="text-sm leading-7">
          {isKo
            ? "Ria MVP의 출발선이었습니다. Workspace 기반 모노레포 위에서 AI 견적 생성을 POST와 스트리밍 응답으로 묶기 위해 Server-Sent Events를 골랐습니다. 재연결은 exponential backoff로, 거기에 메모리 관리와 Suspense, Error Boundary로 안정성을 잡았습니다. AI 엔지니어와 함께 정의한 5종 이상의 응답 타입은 Strategy 패턴으로 나눠, 컴포넌트 안에서 분기가 폭발하지 않게 했습니다."
            : "This was day one of Ria's MVP. On a Workspace-based monorepo, AI quote generation needed POST plus a streamed response, so I chose Server-Sent Events. I backed it with exponential-backoff reconnection, memory management, Suspense, and Error Boundary. The 5-plus response types I defined together with the AI engineer were routed through a Strategy pattern, so branching never exploded inside the components."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "Ria의 첫 화면은 여행 조건을 입력하면 AI가 견적서 초안을 만들어 주는 것이었습니다. 그러려면 클라이언트가 POST로 조건을 보내고 서버가 응답을 스트림으로 흘려 줘야 했습니다. 팀은 CTO와 AI, FE 세 명으로 작아, 인프라 결정 하나가 한 달 일정을 좌우할 수 있는 단계였습니다."
            : "Ria's first screen took the user's trip constraints and had the AI draft a quote. That meant the client POSTs the constraints and the server streams the response back. With only three engineers (CTO, AI, FE), the team was small enough that a single infrastructure decision could swing a month's schedule."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 핵심 의사결정" : "2. Key decisions"}
        </h2>

        <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-4 dark:bg-zinc-900/60">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "1) WebSocket이 아니라 SSE — 필요한 만큼만 양방향" : "1) SSE, not WebSocket — bidirectional only as needed"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "요구사항은 서버에서 클라이언트로 가는 단방향 스트리밍이었고, 클라이언트는 시작점만 POST로 보내면 됐습니다. WebSocket의 양방향 기능은 쓰지도 않는데 운영과 보안 비용은 더 컸습니다."
                : "The requirement was server-to-client streaming, with the client only POSTing the start. We wouldn't use WebSocket's bidirectional power, yet it costs more in ops and security."}
            </li>
            <li>
              {isKo
                ? "그래서 HTTP POST로 시작하고 SSE로 응답을 받기로 했습니다. 표준 HTTP 위에 얹혀 프록시와 로드밸런서, 캐시 정책이 그대로 통합니다."
                : "So we start with an HTTP POST and receive the response over SSE. It sits on standard HTTP, so proxies, load balancers, and cache policy all just work."}
            </li>
            <li>
              {isKo
                ? "재연결은 exponential backoff로 처리하고, 같은 generation에 같은 요청이 두 번 가지 않도록 idempotency 키를 시작 페이로드에 넣었습니다."
                : "Reconnection uses exponential backoff, with an idempotency key in the start payload so the same generation never gets sent twice."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2) Strategy 패턴 — 5종 이상의 AI 응답을 분기 폭발 없이" : "2) Strategy Pattern — handle 5+ response types without branch explosion"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "AI 응답은 견적 후보, 확정 안내, 부족 정보 요청, 에러 분류, 진행 메시지처럼 다섯 종류가 넘었습니다. 이걸 컴포넌트 안에서 if로 처리하면 한 컴포넌트가 다섯 가지 책임을 떠안게 됩니다."
                : "The AI emitted more than five types: quote candidates, confirmation, missing-info requests, classified errors, progress messages. Handling these with in-component ifs would have given one component five-plus responsibilities."}
            </li>
            <li>
              {isKo
                ? "AI 엔지니어와 응답 스펙을 함께 정의한 다음, FE에서는 타입마다 Strategy를 하나씩 두고 매퍼가 이 메시지는 어느 Strategy로 갈지만 정하게 했습니다. 컴포넌트는 Strategy의 출력을 그대로 렌더합니다."
                : "After defining the response spec with the AI engineer, I put one Strategy per type on the FE, and a mapper just decides which Strategy a given message goes to. Components render whatever the Strategy outputs."}
            </li>
            <li>
              {isKo
                ? "그 뒤로 새 응답 타입을 추가하는 일은 Strategy를 하나 더 만드는 작업이 됐습니다. 컴포넌트는 손댈 게 없었습니다."
                : "After that, adding a new response type just meant adding one more Strategy. The components needed no changes."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "3) 모노레포 + Shared — 도메인 타입의 단일 출처" : "3) Monorepo + Shared — single source for domain types"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "Workspace 기반 모노레포에 Shared 패키지를 두고 AI 응답 타입과 견적 도메인 모델, 공통 유틸을 한곳에 모았습니다. FE, BE, AI 어느 쪽에서 바꿔도 컴파일이 깨지면서 잡힙니다."
                : "A Workspace monorepo with a Shared package holding the AI response types, the quote domain model, and common utilities. A change on any side (FE, BE, AI) breaks compilation and gets caught."}
            </li>
            <li>
              {isKo
                ? "스트리밍 중에 끊기거나 응답이 일부만 오는 경우는 Suspense와 Error Boundary로 UI에서 명확히 구분했습니다."
                : "Streaming interruptions and partial responses were cleanly separated in the UI with Suspense and Error Boundary."}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. 결과" : "3. Outcomes"}
        </h2>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
          <li>{isKo ? "AI 견적 생성을 POST와 SSE 스트리밍으로 처리해 첫 토큰까지의 체감 지연을 최소화했습니다." : "AI quote generation over POST and SSE streaming, minimizing perceived delay to the first token"}</li>
          <li>{isKo ? "5종 이상의 응답을 Strategy로 나눠, 이후 새 타입 추가가 컴포넌트 수정 없이 끝났습니다." : "5+ response types split into Strategies, so later additions needed no component changes"}</li>
          <li>{isKo ? "이때 만든 Shared 패키지가 이후 디자인 시스템과 B2C 확장의 토대가 됐습니다." : "The Shared package built here became the foundation for the later design system and B2C extension"}</li>
          <li>{isKo ? "스택: React 18, TypeScript, Zustand, SSE, Suspense, Error Boundary, Workspace 모노레포" : "Stack: React 18, TypeScript, Zustand, SSE, Suspense, Error Boundary, Workspace monorepo"}</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 무엇을 배웠나" : "4. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "프로토콜은 쓸 수 있는 기능이 아니라 실제로 쓸 기능에 맞춰 골랐습니다. WebSocket의 양방향 기능을 안 쓰면서 양방향을 택했을 때 드는 비용은 눈에 잘 안 보입니다."
              : "I picked the protocol by the capability I'd actually use, not the one it could offer. The cost of choosing WebSocket without using its bidirectional power doesn't show up directly."}
          </li>
          <li>
            {isKo
              ? "응답 타입이 늘어날 영역에서는 분기를 컴포넌트가 아니라 매퍼나 Strategy에 뒀습니다. 한 컴포넌트가 다섯 가지 책임을 갖지 않게 하기 위해서였습니다."
              : "Where response types will multiply, I keep the branching in the mapper or Strategy, not in the components, so that no single component ends up with five responsibilities."}
          </li>
          <li>
            {isKo
              ? "모노레포 Shared의 가치는 단일 출처라는 데 있었습니다. 같은 도메인 타입이 두 곳에 살면 결국 서로 어긋나고, 그 어긋남은 컴파일 타임에 잡히지 않습니다."
              : "The value of a Shared package is being the single source of truth. If the same domain type lives in two places, the two eventually diverge, and that divergence won't be caught at compile time."}
          </li>
        </ul>
      </section>
    </div>
  );
}
