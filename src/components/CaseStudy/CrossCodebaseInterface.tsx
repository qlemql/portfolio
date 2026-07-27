import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function CrossCodebaseInterface({ locale }: Props) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">TL;DR</h2>
        <p className="text-sm leading-7">
          {isKo
            ? "매장 테이블의 주문 태블릿 앱인 오더(Vue3)와, 같은 태블릿 화면에 광고를 띄우는 광고 송출 모듈(React)은 서로 다른 레포에 있고, 둘 사이는 postMessage로만 오갑니다. 테이블에서 바로 결제하는 '자리에서 결제하기'와 주문 완료 화면을 광고 모듈로 옮기는 '주문 완료 광고 이관'을 잇는 인터페이스를 맡으면서, 처음엔 개별 버그로 보였던 직렬화 오류를 경계 설계 문제로 다시 정의했고, 이벤트가 유실되지 않도록 iframe 노출 전에 ACK를 받는 핸드셰이크를 넣었습니다."
            : "Order (Vue3) — the ordering app on each table's tablet — and the ad-display module (React) that shows ads on the same screen sit in different repos, and everything between them goes over postMessage. While building the interface joining in-seat checkout and the order-complete ad handoff, I reframed what first looked like an isolated serialization bug as a boundary-design problem, and added a handshake that waits for an ACK before revealing the iframe so events don't get lost."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 문제 정의" : "1. Problem definition"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "두 코드베이스가 별도 레포로 나뉘어 있어서, 한쪽 상태를 다른 쪽에 넘기려면 postMessage 직렬화를 거쳐야 합니다. 그런데 Vue 쪽에서 만든 객체를 그대로 넘기면 DataCloneError가 났습니다. 처음엔 특정 페이로드의 문제로 보였지만, 두 앱 사이의 다른 메시지들에서도 같은 오류가 반복됐습니다."
            : "Because the two codebases live in separate repos, handing state from one to the other means going through postMessage serialization. Passing a Vue-side object across as-is threw a DataCloneError. At first it looked like a problem with one payload, but the same error kept recurring across the other messages between the two apps."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 직렬화 경계 — 개별 버그에서 경계 설계로" : "2. Serialization boundary — from a bug to a contract"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "원인은 Vue의 반응형 객체였습니다. toRaw는 top-level만 얕게 unwrap하기 때문에, 중첩된 reactive가 Proxy로 남은 채 postMessage의 구조화 복제(structured clone)에 걸렸습니다. 이걸 페이로드마다 다른 버그로 다루는 대신, 문제가 확인된 송신 지점들을 '경계를 넘는 데이터는 평범한 객체로 정규화한다'는 하나의 규칙으로 수정했습니다. 공용 유틸이나 타입으로 자동 강제하는 단계까지는 가지 않았고, 그 과제는 신규 동시 송출 인터페이스 설계로 넘겼습니다."
            : "The cause was Vue's reactive objects. toRaw only shallow-unwraps the top level, so nested reactives stayed as Proxies and tripped postMessage's structured clone. Instead of treating each payload as its own bug, I fixed every affected send site under one rule: data crossing the boundary is normalized to a plain object. I stopped short of enforcing the rule with a shared utility or types — that task carries over into the new simulcast interface design."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. ACK 핸드셰이크 — 신뢰 기반 메시징의 한계" : "3. ACK handshake — the limits of trust-based messaging"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "postMessage는 보낸 쪽이 받는 쪽의 준비 상태를 알 수 없습니다. 송출 모듈이 아직 iframe을 띄울 준비가 안 된 사이에 이벤트를 보내면 그대로 사라집니다. 그래서 iframe을 화면에 띄우기 전에 송출 모듈의 ACK를 먼저 받고 진행하는 핸드셰이크를 설계했습니다. 보내고 끝내는 대신, 받았다는 신호를 확인한 뒤에 다음으로 넘어가도록 바꿨습니다."
            : "With postMessage, the sender can't tell whether the receiver is ready. If an event goes out while the display module isn't yet ready to mount the iframe, it just disappears. So I designed a handshake that waits for the display module's ACK before the reveal. The model shifted from 'I sent it, so we're fine' to 'I proceed only after confirming it was received.'"}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 마무리한 것들" : "4. Loose ends I closed"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "준비 순서 경합(race) 수정 — ACK를 기다리는 리스너가 등록되기 전에 상대편이 먼저 신호를 보내면 유실되던 경합을 정리했습니다."
              : "Fixed a readiness race — events were lost when the other side signaled before the ACK listener was registered."}
          </li>
          <li>
            {isKo
              ? "해외 매장 회귀 — 해외 매장 환경에서만 재현되던 회귀를 오리진별 분기 플래그로 격리해 수정했습니다."
              : "Closed a regression reproducing only in overseas stores — isolated the path behind a per-origin flag."}
          </li>
          <li>
            {isKo
              ? "정리 작업 — 주문 완료 통보에서 특정 매장만 예외 처리하던 분기를 제거하고, 광고 재생 호출(playAdMedia)의 페이로드를 단일 JSON 객체로 통일했습니다."
              : "Cleanup — removed per-store exception branches from order-complete notifications and unified the ad-playback call (playAdMedia) around a single JSON payload."}
          </li>
        </ul>
        <p className="text-sm leading-7 text-zinc-500 dark:text-zinc-400">
          {isKo
            ? "이 작업들은 해외망 회귀 수정까지 포함해 정기 배포에 반영되어 운영 중입니다."
            : "All of this — including the overseas-network fix — went out in a regular release and is running in production."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "5. 구조적 한계 정리 — 다음 인터페이스 설계로" : "5. Structural limits — feeding the next interface design"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "핸드셰이크로 노출 시점의 유실은 막았지만, postMessage 기반 통신에는 그걸로 다 덮이지 않는 한계가 남습니다. 주문 이벤트는 서버와의 소켓 연결을 타고 들어오는데 이 연결이 끊긴 사이의 이벤트는 애초에 도달하지 않고, 두 레포가 독립적으로 배포되다 보니 모듈 버전 불일치로 양쪽이 서로 다른 스키마를 기대하는 순간이 생깁니다. 이런 신뢰 기반 이벤트 송수신의 구조적 한계를 문서로 정리해 팀에 공유했고, 지금은 이 경험을 여러 태블릿에 같은 광고를 동시에 내보내는 신규 동시 송출 인터페이스 설계에 적용하고 있습니다."
            : "The handshake stops losses at reveal time, but postMessage-based messaging has limits it can't cover. Order events arrive over a socket connection to the server, so events during a dropped connection never arrive at all; and because the two repos deploy independently, module-version drift means the two sides can momentarily expect different schemas. I documented these structural limits of trust-based event delivery, shared them with the team, and am now applying those lessons to the design of a new simulcast interface that plays the same ad across multiple tablets at once."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "6. 무엇을 배웠나" : "6. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "같은 모양의 버그가 계속 나온다는 건, 경계가 덜 잡혔다는 뜻에 가까웠습니다."
              : "When a bug recurs in the same shape, it isn't an isolated defect — it's a sign the boundary is under-defined."}
          </li>
          <li>
            {isKo
              ? "서로 다른 코드베이스를 잇는 일은 결국 그 사이의 계약을 얼마나 분명히 적어 두느냐에 달려 있었습니다."
              : "Joining two codebases came down to writing the contract between them, not the code on either side."}
          </li>
          <li>
            {isKo
              ? "신뢰 기반 메시징에선 보냈다고 도착한 게 아니어서, 정합성이 중요한 곳엔 받았다는 확인을 설계에 넣어 뒀습니다."
              : "In trust-based messaging, 'sent' and 'arrived' are different. When consistency matters, the acknowledgment has to be part of the design."}
          </li>
        </ul>
      </section>
    </div>
  );
}
