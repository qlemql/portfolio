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
            ? "Ria MVP 출발선. Workspace 기반 모노레포 위에 AI 견적 생성을 \"POST + 스트리밍 응답\"으로 묶기 위해 Server-Sent Events를 채택했습니다. 재연결(exponential backoff)·메모리 관리·Suspense·Error Boundary로 안정성을 잡고, AI 엔지니어와 공동 정의한 5+ 응답 타입을 Strategy Pattern으로 분기해 컴포넌트의 분기 폭발을 막았습니다."
            : "Day one of Ria's MVP. On a Workspace-based monorepo, AI quote generation needed \"POST + streamed response\" — so I chose Server-Sent Events. Backed it with exponential-backoff reconnection, memory management, Suspense, and Error Boundary. A Strategy Pattern routes the 5+ response types co-defined with the AI engineer, so component-level branching never explodes."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "Ria의 첫 화면은 \"여행 조건을 입력하면 AI가 견적서 초안을 만들어 준다\"는 것. 즉, 클라이언트가 POST로 조건을 보내고 서버가 응답을 \"스트림\"으로 흘려야 했습니다. 팀은 3명(CTO·AI·FE) — 전선이 좁아서 인프라 결정 하나가 한 달의 일정에 영향을 줄 수 있는 단계였습니다."
            : "Ria's first screen: \"give us your trip constraints, AI drafts the quote\". So the client POSTs the constraints and the server streams the response back. The team had 3 engineers (CTO / AI / FE) — at this size one infra call could swing a month's schedule."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 핵심 의사결정" : "2. Key decisions"}
        </h2>

        <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-4 dark:bg-zinc-900/60">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "1) WebSocket이 아니라 SSE — \"필요한 만큼만\" 양방향" : "1) SSE, not WebSocket — bidirectional only as needed"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "요구는 단방향(서버 → 클라) 스트리밍 + 클라가 시작점만 POST로 보내면 끝. WebSocket의 양방향 능력은 안 쓰는데 운영·보안 비용은 더 큼."
                : "Requirement: server → client streaming, with the client only POSTing the start. WebSocket's bidirectional power is unused but its ops + security cost is higher."}
            </li>
            <li>
              {isKo
                ? "결정: HTTP POST로 시작 → SSE로 응답 수신. 표준 HTTP 위에 얹혀 프록시·로드밸런서·캐시 정책이 그대로 통함."
                : "Decision: HTTP POST to start → SSE for response. Sits on standard HTTP, so proxies / load balancers / cache policy all just work."}
            </li>
            <li>
              {isKo
                ? "재연결은 exponential backoff로 — 같은 generation에 같은 요청이 두 번 가지 않도록 idempotency 키를 시작 페이로드에 넣음."
                : "Reconnection: exponential backoff — with an idempotency key in the start payload so the same generation never gets sent twice."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2) Strategy Pattern — 5+ AI 응답 타입을 분기 폭발 없이" : "2) Strategy Pattern — handle 5+ response types without branch explosion"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "AI 응답은 \"견적 후보\" / \"확정 안내\" / \"부족 정보 요청\" / \"에러 분류\" / \"진행 메시지\" 등 5종 이상. 컴포넌트 안에 if 분기로 처리하면 한 컴포넌트가 5+ 책임을 가짐."
                : "AI emits 5+ types — quote candidates / confirmation / missing-info request / classified errors / progress message. Handling these with in-component ifs gives one component 5+ responsibilities."}
            </li>
            <li>
              {isKo
                ? "AI 엔지니어와 응답 스펙을 공동 정의 후, FE에서 각 타입마다 Strategy를 두고 매퍼가 \"이 메시지는 어느 Strategy로\"만 결정. 컴포넌트는 Strategy 출력을 그대로 렌더."
                : "Co-defined the response spec with the AI engineer, then put one Strategy per type on the FE; a mapper only routes \"this message → which Strategy\". Components render the Strategy's output."}
            </li>
            <li>
              {isKo
                ? "이후 새 응답 타입 추가는 \"Strategy 1개 추가\" 작업이 됨. 컴포넌트 수정 0."
                : "Adding a new response type later was just \"add one Strategy\". Component changes: zero."}
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
                ? "Workspace 기반 모노레포에 Shared 패키지를 두고 \"AI 응답 타입\"·\"견적 도메인 모델\"·\"공통 유틸\"을 한 곳에 둠. FE·BE·AI 어느 쪽에서 변경해도 컴파일이 깨져서 잡힘."
                : "Workspace monorepo with a Shared package holding AI response types, the quote domain model, and common utilities. A change on any side (FE / BE / AI) breaks compilation everywhere — caught instantly."}
            </li>
            <li>
              {isKo
                ? "Suspense + Error Boundary로 스트리밍 중 끊김·부분 응답을 UI에서 명시적으로 분리."
                : "Suspense + Error Boundary isolate streaming interruptions and partial responses cleanly in the UI."}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. 결과" : "3. Outcomes"}
        </h2>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
          <li>{isKo ? "AI 견적 생성: POST + SSE 스트리밍으로 첫 토큰까지 체감 지연 최소화" : "AI quote generation: POST + SSE streaming — minimum perceived delay to first token"}</li>
          <li>{isKo ? "5+ 응답 타입을 Strategy로 분리해 이후 신규 타입 추가가 컴포넌트 수정 없이 끝남" : "5+ response types split into Strategies — adding new types later required zero component changes"}</li>
          <li>{isKo ? "Shared 패키지가 이후 디자인 시스템·B2C 확장의 토대가 됨" : "The Shared package became the foundation for the later design system + B2C extension"}</li>
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
              ? "프로토콜은 \"가능한 능력\"이 아니라 \"실제로 쓰는 능력\"에 맞춰 고른다. WebSocket의 양방향 능력을 안 쓰는데 양방향을 택한 비용은 보이지 않는다."
              : "Pick the protocol that matches the capability you'll *use*, not the capability you could. The cost of choosing WebSocket without using its bidirectional power doesn't show up directly."}
          </li>
          <li>
            {isKo
              ? "응답 타입이 늘어날 영역엔 분기를 컴포넌트가 아닌 매퍼 / Strategy에 둔다. 한 컴포넌트가 책임을 5개씩 가지지 않게."
              : "Where response types will multiply, put the branch in the mapper / Strategy, not in components. Don't give one component five responsibilities."}
          </li>
          <li>
            {isKo
              ? "모노레포 Shared의 가치는 \"단일 출처\"다. 같은 도메인 타입이 두 곳에 살면 결국 두 곳이 서로 어긋나고, 컴파일 타임에 안 잡힌다."
              : "The value of a Shared package is single source of truth. If the same domain type lives in two places, the two diverge — and compilation won't catch it."}
          </li>
        </ul>
      </section>
    </div>
  );
}
