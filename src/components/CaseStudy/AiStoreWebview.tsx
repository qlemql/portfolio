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
            ? "티오더AI를 매장과 연동하는 웹뷰를 새로 만들었습니다. 백엔드가 ai-agent 엄브렐러와 legacy PHP 프록시로 여러 겹이라, 먼저 구조를 조사해 core-service 단일 host에 session-id로 붙는 연동 스펙을 확정했습니다. 비밀값은 프론트엔드가 갖지 않고 서버 쪽에 두도록 경계를 잡은 뒤, API 레이어부터 타입·TanStack Query·MSW 모킹까지 0에서 만들었습니다."
            : "I built a new webview that links T-order AI to stores. The backend was several layers deep — an ai-agent umbrella plus a legacy PHP proxy — so I first mapped it and settled on integrating against a single core-service host via session-id. After drawing a boundary where the server holds secrets and the frontend never does, I built everything from zero: the API layer, types, TanStack Query, and MSW mocking."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 문제 — 다층 백엔드" : "1. Problem — a layered backend"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "연동 대상이 하나가 아니었습니다. ai-agent 엄브렐러 뒤에 legacy PHP 프록시가 있었고, 어느 host에 무엇을 요청해야 하는지가 분명하지 않았습니다. 여기서 프론트엔드가 여러 host와 비밀값을 직접 다루기 시작하면 클라이언트가 복잡해지고 보안 표면도 넓어집니다."
            : "There wasn't a single integration target. Behind the ai-agent umbrella sat a legacy PHP proxy, and it wasn't obvious which host should receive what. If the frontend started juggling multiple hosts and secrets directly, the client would grow complex and the security surface would widen."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 경계 설계 — single host + session-id" : "2. Boundary design — single host + session-id"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "조사 결과를 바탕으로, 프론트엔드는 core-service 단일 host에만 붙고 인증은 session-id로 위임하는 스펙을 확정했습니다. 비밀값은 서버가 보관하고, 프론트엔드는 session-id만 주고받습니다. 어디에 무엇을 맡길지를 먼저 정하고 나니 그 뒤 구현이 단순해졌습니다."
            : "Based on what I found, I settled on a spec where the frontend talks only to a single core-service host and delegates auth via session-id. The server holds the secrets; the frontend carries only the session-id. Once I'd decided what to delegate where, the implementation that followed got simpler."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. 0→1 스택 구성" : "3. Building the stack 0→1"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "빈 상태에서 API 레이어, 도메인 타입, TanStack Query, MSW 모킹, react-router를 차례로 올렸습니다. CoreClient에 session-id를 붙이는 request interceptor를 두니, API 함수마다 인증을 신경 쓰지 않아도 돼서 시그니처가 단순해졌습니다."
            : "From an empty state I layered in the API layer, domain types, TanStack Query, MSW mocking, and react-router. A request interceptor in CoreClient that attaches the session-id meant individual API functions no longer had to think about auth, so their signatures stayed simple."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 기준은 백엔드 소스" : "4. The backend source as the baseline"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "타입과 에러코드는 문서 대신 실제 백엔드 소스를 기준으로 맞췄습니다. 예를 들어 이미 연동된 매장은 ALREADY_LINKED 같은 추상적인 이름 대신 실제 코드(ERR_AI_CORE_2003)에 맞춰 처리했습니다. 백엔드가 없어도 화면을 돌릴 수 있도록 브라우저 MSW 모킹 모드(dev:mock)도 함께 만들었습니다."
            : "I aligned types and error codes against the backend source as the source of truth, not the docs. For an already-linked store, for instance, I handled the real code (ERR_AI_CORE_2003) rather than an abstract name like ALREADY_LINKED. I also built a browser MSW mocking mode (dev:mock) so the screens run even without the backend."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "5. 무엇을 배웠나" : "5. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "처음엔 라이브러리부터 고르려 했는데, 결국 경계를 먼저 잡는 편이 맞았습니다. 무엇을 서버에 맡기고 무엇을 클라이언트가 가질지 정하고 나면 나머지는 따라왔습니다."
              : "Starting something from zero, the first thing to settle wasn't a library but the boundary. Once I'd decided what to delegate to the server and what the client carries, the rest followed."}
          </li>
          <li>
            {isKo
              ? "타입의 실제 정의는 문서가 아니라 응답을 만드는 코드에 있었습니다. 거기에 맞춰야 런타임에서 값이 틀어지지 않았습니다."
              : "The truth of a type lives in the code that actually produces the response, not in the docs. Aligning to that is what keeps runtime from drifting."}
          </li>
          <li>
            {isKo
              ? "모킹 모드를 처음부터 만들어 두니 백엔드 일정과 무관하게 화면 작업을 이어갈 수 있었습니다."
              : "Building a mocking mode from the start kept screen work decoupled from the backend schedule, so it never had to stop."}
          </li>
        </ul>
      </section>
    </div>
  );
}
