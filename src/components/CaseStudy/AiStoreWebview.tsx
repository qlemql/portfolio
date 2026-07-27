import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function AiStoreWebview({ locale }: Props) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">TL;DR</h2>
        <p className="text-sm leading-7">
          {isKo
            ? "티오더AI(매장 운영자용 AI 서비스)를 매장 계정과 연결하는 웹뷰를 새로 만들었습니다. 백엔드가 여러 시스템이 겹친 구조라 어디에 무엇을 요청해야 할지부터 불분명했고, 먼저 구조를 조사해 프론트엔드는 서버 하나(core-service)만 바라보고 비밀값은 서버에 두는 연동안을 만들어 백엔드와 합의했습니다. 그 위에 API 레이어부터 타입·TanStack Query·MSW 모킹까지 0에서 만들었습니다."
            : "I built a new webview that links T-order AI — an AI service for store operators — to store accounts. The backend was several systems deep, so it wasn't even clear which host should receive what. I mapped the structure first and agreed an integration spec with the backend team: the frontend talks to a single host (core-service), and secrets stay on the server. On top of that I built everything from zero: the API layer, types, TanStack Query, and MSW mocking."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 문제 — 다층 백엔드" : "1. Problem — a layered backend"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "연동 대상이 하나가 아니었습니다. 여러 AI 백엔드 서비스를 묶은 ai-agent 시스템 뒤에 레거시 PHP 프록시가 한 겹 더 있었고, 어느 host에 무엇을 요청해야 하는지가 분명하지 않았습니다. 여기서 프론트엔드가 여러 host와 비밀값을 직접 다루기 시작하면 클라이언트가 복잡해지고 보안 표면도 넓어집니다."
            : "There wasn't a single integration target. Behind ai-agent — a bundle of several AI backend services — sat one more layer, a legacy PHP proxy, and it wasn't obvious which host should receive what. If the frontend started juggling multiple hosts and secrets directly, the client would grow complex and the security surface would widen."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 경계 설계 — single host + session-id" : "2. Boundary design — single host + session-id"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "조사 결과를 바탕으로, 프론트엔드는 core-service 단일 host에만 요청하고 인증은 세션 식별자(session-id) 기반으로 정리하는 스펙을 제안해 백엔드 팀과 합의했습니다. 토큰 같은 비밀값은 서버가 보관하고, 프론트엔드는 session-id만 주고받습니다. 어디에 무엇을 맡길지를 먼저 정하고 나니 그 뒤 구현이 단순해졌습니다."
            : "Based on what I found, I proposed — and agreed with the backend team — a spec where the frontend talks only to a single core-service host, with auth riding on a session identifier (session-id). Secrets like tokens stay with the server; the frontend carries only the session-id. Once I'd decided what to delegate where, the implementation that followed got simpler."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. 0→1 스택 구성" : "3. Building the stack 0→1"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "빈 상태에서 API 레이어, 도메인 타입, TanStack Query, MSW 모킹, react-router를 차례로 올렸습니다. core-service 호출을 담당하는 HTTP 클라이언트(CoreClient)에 session-id를 자동으로 붙이는 request interceptor를 두니, API 함수마다 인증을 신경 쓰지 않아도 돼서 시그니처가 단순해졌습니다."
            : "From an empty state I layered in the API layer, domain types, TanStack Query, MSW mocking, and react-router. A request interceptor in CoreClient — the HTTP client fronting core-service — attaches the session-id, so individual API functions no longer had to think about auth and their signatures stayed simple."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 기준은 백엔드 소스" : "4. The backend source as the baseline"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "타입과 에러코드는 문서 대신 실제 백엔드 소스를 기준으로 맞췄습니다. 예를 들어 '이미 연동된 매장' 에러는 문서에 적힌 추상적인 이름이 아니라 백엔드가 실제로 반환하는 에러코드 값에 맞춰 분기했습니다. 백엔드가 없어도 화면을 돌릴 수 있도록 브라우저 MSW 모킹 모드(dev:mock)도 함께 만들었습니다."
            : "I aligned types and error codes against the backend source as the source of truth, not the docs. The \"store already linked\" error, for instance, was branched on the code the backend actually returns, not the abstract name written in the docs. I also built a browser MSW mocking mode (dev:mock) so the screens run even without the backend."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "5. 출시와 운영" : "5. Launch and operation"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "이 웹뷰는 정식 배포되어 v1.5.x까지 버전을 거듭하며 운영 중입니다. 초기에 확정한 single host + session-id 경계와 API 레이어 구조는 버전이 올라가는 동안에도 그대로 유지되고 있습니다."
            : "The webview shipped as an official release and has iterated to v1.5.x in production. The single-host + session-id boundary and the API-layer structure settled at the start have held unchanged across those versions."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "6. 무엇을 배웠나" : "6. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "0에서 시작할 때 먼저 정할 것은 라이브러리가 아니라 경계였습니다. 무엇을 서버에 맡기고 무엇을 클라이언트가 가질지 정하고 나면 나머지는 따라왔고, 그렇게 잡은 경계는 v1.5.x까지 바뀌지 않았습니다."
              : "Starting from zero, the first thing to settle wasn't a library but the boundary. Once I'd decided what to delegate to the server and what the client carries, the rest followed — and that boundary has held through v1.5.x."}
          </li>
          <li>
            {isKo
              ? "타입의 실제 정의는 문서가 아니라 응답을 만드는 코드에 있었습니다. 거기에 맞춰야 런타임에서 값이 틀어지지 않았습니다."
              : "The truth of a type lives in the code that actually produces the response, not in the docs. Aligning to that is what keeps runtime from drifting."}
          </li>
          <li>
            {isKo
              ? "모킹 모드를 처음부터 만들어 두니 백엔드 일정과 무관하게 화면 작업을 이어갈 수 있었습니다."
              : "Building a mocking mode from the start kept UI work decoupled from the backend schedule, so it never had to stop."}
          </li>
        </ul>
      </section>
    </div>
  );
}
