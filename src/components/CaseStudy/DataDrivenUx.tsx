import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function DataDrivenUx({ locale }: Props) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">TL;DR</h2>
        <p className="text-sm leading-7">
          {isKo
            ? "B2C로 확장한 직후 두 달 동안, PO와 PD, 개발이 매일 아침 전날 데이터를 같이 보고 그날의 실험을 정하는 사이클을 돌렸습니다. 그 결과 견적 확인율이 58%에서 90%로, 결제 전환이 0%에서 50%로, 비회원 견적 요청이 53%에서 62%로 올랐습니다. CTA 위치나 폼 필드 순서, 로딩 상태 같은 작은 결정들이 쌓인 결과였습니다."
            : "For two months right after the B2C expansion, the PO, PD, and engineering met every morning to look at the prior day's data together and decide that day's experiment. Quote views went from 58% to 90%, payment conversion from 0% to 50%, and guest quote requests from 53% to 62%. It added up from small calls about CTA placement, form-field order, and loading states."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "소셜 로그인으로 가입 진입 허들을 한 번 무너뜨린 직후였습니다. 가입한 사용자가 그다음 단계인 견적과 결제에서 어디서 멈추는지가 다음 병목이었습니다. 정답을 모를 때 가장 빠른 방법은 매일 데이터를 보고 작게 바꾸는 것이라고 판단했습니다. 팀은 PO와 PD, 그리고 FE인 저였습니다."
            : "This was right after social login had broken the signup-entry barrier. The next bottleneck was where signed-up users actually stop, in the quote and payment steps. With the answer unknown, the fastest path seemed to be reading the data daily and shipping small changes. The team was the PO, the PD, and me on the frontend."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 핵심 의사결정" : "2. Key decisions"}
        </h2>

        <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-4 dark:bg-zinc-900/60">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "1) 실험을 하루 단위로 잘게 쪼개기" : "1) Daily cadence — split experiments down to a single day"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "매일 아침 15분 동안 전날의 GA4, Clarity, Datadog 데이터를 보고 가설을 한두 개 세운 다음, 그날 할 실험을 정했습니다."
                : "Every morning, 15 minutes: review the prior day's GA4, Clarity, and Datadog data, form one or two hypotheses, and lock in that day's experiment."}
            </li>
            <li>
              {isKo
                ? "변경은 화면 하나, 요소 하나처럼 작게 했습니다. 다음 날 결과를 비교하기 쉽도록 한 번에 변수 하나만 움직였습니다."
                : "I kept changes small, one screen or one element at a time, so that only one variable moved and the next day's comparison stayed clean."}
            </li>
            <li>
              {isKo
                ? "PO와 PD가 함께 보는 전날 데이터 슬랙 스레드를 매일 같은 시간에 갱신해, 의사결정 기록이 남도록 했습니다."
                : "A daily Slack thread of the prior day's data, updated at the same time each morning, kept a decision log everyone read from."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2) 도구를 목적에 맞게 나누기" : "2) Pick the tool by intent"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              <strong>GA4:</strong>{" "}
              {isKo
                ? "전체 깔때기에서 어디서 얼마나 빠지는지(양적으로)."
                : "the whole funnel, where users drop and how much (quantitative)."}
            </li>
            <li>
              <strong>Clarity:</strong>{" "}
              {isKo
                ? "히트맵과 세션 일부로 사용자가 어떻게 막혔는지(행동 패턴)."
                : "heatmaps and session samples, how a user got stuck (behavior)."}
            </li>
            <li>
              <strong>Datadog RUM:</strong>{" "}
              {isKo
                ? "결제 플로우의 커스텀 이벤트로 무엇이 일어났는지(이벤트 순서)."
                : "custom events on the payment flow, what actually happened (event sequence)."}
            </li>
            <li>
              {isKo
                ? "세 도구가 서로 대체재가 아니라 보완재라는 걸 첫 주에 한 번 정리해 두니, 매일 어느 도구를 볼지로 다툴 일이 없었습니다."
                : "Once we settled in the first week that the three complement rather than replace each other, we never argued about which tool to look at each morning."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "3) 실제 개선 사례 — 작은 변경의 누적" : "3) The actual changes — small, accumulated"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "결제 화면에서 CTA를 첫 화면 안으로 옮겼더니 결제 진입율이 처음으로 올랐습니다."
                : "Moving the CTA into the first viewport on the payment screen gave the first lift in payment entry."}
            </li>
            <li>
              {isKo
                ? "입력 폼 순서를 사용자가 가장 자신 있는 답부터 적도록 바꿨더니 폼 이탈이 줄었습니다."
                : "Reordering the form so users answer the easiest field first reduced form drop-offs."}
            </li>
            <li>
              {isKo
                ? "로딩 상태에 스켈레톤과 진행 표시를 넣었더니, 세션 리플레이에서 보이던 고장난 줄 알았다는 식의 패턴이 사라졌습니다."
                : "Adding skeletons and progress indicators removed the \"I thought it was broken\" pattern we kept seeing in session replays."}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. 결과" : "3. Outcomes"}
        </h2>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
          <li>{isKo ? "견적 확인율 58% → 90%" : "Quote view rate: 58% → 90%"}</li>
          <li>{isKo ? "결제 전환율 0% → 50%" : "Payment conversion: 0% → 50%"}</li>
          <li>{isKo ? "비회원 견적 요청 전환율 53% → 62%" : "Guest quote-request conversion: 53% → 62%"}</li>
          <li>{isKo ? "스택: GA4, Microsoft Clarity, Datadog RUM" : "Stack: GA4, Microsoft Clarity, Datadog RUM"}</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 무엇을 배웠나" : "4. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "실험 주기를 하루 단위로 가져가니 학습 속도가 확연히 빨라졌습니다. 전날 결정의 결과를 다음 날 아침 바로 확인할 수 있어, 가설의 맥락이 사라지기 전에 검증이 끝났습니다."
              : "Moving to a daily cycle made us learn a lot faster. I could see the result of each decision the next morning, while the reasoning behind it was still fresh."}
          </li>
          <li>
            {isKo
              ? "한 번에 하나만 바꾼다는 규칙은 큰 변화를 한꺼번에 시도하고 싶은 유혹을 견뎌야 지킬 수 있었습니다. 결국 큰 변화는 작은 변화가 쌓여 만들어졌습니다."
              : "Changing one thing at a time only worked when I resisted the urge to make one big change instead. The big improvements really did come from small changes adding up."}
          </li>
          <li>
            {isKo
              ? "도구를 목적별로 한 번 나눠 두면 매일 회의 시간이 줄었습니다. 어느 도구를 볼지 아침마다 다시 정하지 않으려면, 처음에 한 번 합의해 두는 편이 효율적이었습니다."
              : "Splitting the tools by purpose up front cut down our daily meetings. Agreeing once on which tool answers which question beat relitigating it every morning."}
          </li>
        </ul>
      </section>
    </div>
  );
}
