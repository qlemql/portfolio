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
            ? "오더(Vue3)와 광고 송출 모듈(React)은 서로 다른 레포에 있고, 둘 사이는 postMessage로만 오갑니다. 자리에서 결제하기와 주문 완료 광고 이관을 잇는 인터페이스를 맡으면서, 처음엔 개별 버그로 보였던 직렬화 오류를 직렬화 경계 설계 문제로 정리했고, 이벤트가 유실되지 않도록 iframe 노출 전에 ACK를 받는 핸드셰이크를 넣었습니다."
            : "Order (Vue3) and the ad-display module (React) sit in different repos, and everything between them goes over postMessage. While building the interface for in-seat checkout and the order-complete ad handoff, I reframed what first looked like an isolated serialization bug as a serialization-boundary problem, and added a handshake that waits for an ACK before revealing the iframe so events don't get lost."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 문제 정의" : "1. Problem definition"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "두 코드베이스가 별도 레포로 나뉘어 있어서, 한쪽 상태를 다른 쪽에 넘기려면 postMessage 직렬화를 거쳐야 합니다. 그런데 Vue 쪽에서 만든 객체를 그대로 넘기면 DataCloneError가 났습니다. 처음엔 특정 페이로드의 문제로 보였지만, 송출 인터페이스 전반에서 같은 형태로 반복됐습니다."
            : "Because the two codebases live in separate repos, handing state from one to the other means going through postMessage serialization. Passing a Vue-side object across as-is threw a DataCloneError. At first it looked like a problem with one payload, but the same shape kept recurring across the whole display interface."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 직렬화 경계 — 개별 버그에서 경계 설계로" : "2. Serialization boundary — from a bug to a contract"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "원인은 Vue의 반응형 객체였습니다. toRaw는 top-level만 얕게 unwrap하기 때문에, 중첩된 reactive가 Proxy로 남은 채 postMessage의 구조화 복제(structured clone)에 걸렸습니다. 이걸 페이로드마다 따로 고치는 대신, 경계를 넘는 데이터는 항상 평범한 객체로 정규화한다는 규칙을 인터페이스 전반에 적용했습니다. 이렇게 경계의 계약을 한 번 정해 두니, 같은 오류가 페이로드마다 다시 나오지 않았습니다."
            : "The cause was Vue's reactive objects. toRaw only shallow-unwraps the top level, so nested reactives stayed as Proxies and tripped postMessage's structured clone. Instead of fixing it payload by payload, I applied one rule across the interface: data crossing the boundary is always normalized to a plain object. It wasn't blocking one bug so much as defining the boundary's contract."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. ACK 핸드셰이크 — 신뢰 기반 메시징의 한계" : "3. ACK handshake — the limits of trust-based messaging"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "postMessage는 보낸 쪽이 받는 쪽의 준비 상태를 알 수 없습니다. 송출 모듈이 아직 iframe을 띄울 준비가 안 된 사이에 이벤트를 보내면 그대로 사라집니다. 그래서 노출(reveal) 전에 송출 모듈의 ACK를 먼저 받고 진행하는 핸드셰이크를 설계했습니다. 보내고 끝내는 대신, 받았다는 신호를 확인한 뒤에 다음으로 넘어가도록 바꿨습니다."
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
              ? "arming race 수정 — ACK를 기다리는 쪽과 보내는 쪽의 준비 순서가 어긋나면서 생기던 경합을 정리했습니다."
              : "Fixed an arming race — a contention that surfaced when the waiting side and the sending side got ready in the wrong order."}
          </li>
          <li>
            {isKo
              ? "해외망 회귀 — 해외 네트워크에서 발생하던 회귀를 IS_ORIGIN 게이팅으로 대응했습니다."
              : "Closed an overseas-network regression — handled it through IS_ORIGIN gating."}
          </li>
          <li>
            {isKo
              ? "정리 작업 — 주문 완료 통보의 매장 분기를 제거하고, playAdMedia 인터페이스를 JSON object 형태로 통일했습니다."
              : "Cleanup — removed store-specific branching in order-complete notifications and unified the playAdMedia interface around a JSON object."}
          </li>
        </ul>
        <p className="text-sm leading-7 text-zinc-500 dark:text-zinc-400">
          {isKo
            ? "머지와 내부 QA까지 마쳤고, 이벤트 유실률 같은 정량 지표는 배포 후 측정할 예정입니다."
            : "Merged and internally QA'd; quantitative metrics like the event-loss rate are pending post-release measurement."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "5. 무엇을 배웠나" : "5. What I learned"}
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
