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
            ? "B2C 확장 직후 2개월. PO·PD·개발이 매일 아침 전날 데이터를 같이 보고 그날의 실험을 결정하는 일일 사이클을 운영했습니다. 견적 확인율 58% → 90%, 결제 전환 0% → 50%, 비회원 견적 요청 53% → 62%. 작은 결정(CTA 위치, 폼 필드 순서, 로딩 상태)이 누적된 결과."
            : "Two months right after B2C expansion. PO, PD, and engineering met every morning to review prior-day data and decide same-day experiments. Quote view 58% → 90%, payment conversion 0% → 50%, guest quote-request 53% → 62% — the cumulative result of small calls on CTA placement, form-field order, and loading states."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "소셜 로그인이 가입 진입 허들을 한 번 무너뜨린 직후였습니다. 가입한 사용자가 그 다음 단계(견적 → 결제)에서 어디서 멈추는지가 다음 병목이었고, 정답을 모를 때 가장 빠른 방법은 \"매일 데이터를 보고 작게 바꾸는 것\"이었습니다. 팀: PO + PD + FE(나)."
            : "Just after social login had broken the signup-entry barrier. The next bottleneck was where the signed-up user actually stops — quote → payment. With the answer unknown, the fastest path was: read data daily and ship small changes. Team: PO + PD + FE (me)."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 핵심 의사결정" : "2. Key decisions"}
        </h2>

        <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-4 dark:bg-zinc-900/60">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "1) 일일 사이클 — \"오늘\" 단위 실험으로 잘게 쪼개기" : "1) Daily cadence — split experiments down to \"today\""}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "매일 아침 15분: 전날 GA4·Clarity·Datadog 데이터 리뷰 → 가설 1~2개 → 당일 실험 확정."
                : "15 min every morning: review GA4 / Clarity / Datadog from the prior day → 1–2 hypotheses → lock today's experiment."}
            </li>
            <li>
              {isKo
                ? "변경은 작게: \"한 화면 / 한 요소\" 단위. 다음 날 결과 비교가 단순해지도록 변수를 한 번에 하나만."
                : "Keep changes small — one screen / one element. Tomorrow's compare stays clean when only one variable moves."}
            </li>
            <li>
              {isKo
                ? "PO·PD가 함께 보는 \"전날 데이터\" 슬랙스레드를 매일 같은 시간에 갱신해 의사결정 기록을 남김."
                : "A daily Slack thread of \"prior-day data\" updated at the same time — keeps a decision log everyone reads from."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2) 도구를 목적에 맞게 분리" : "2) Pick the tool by intent"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              <strong>GA4:</strong>{" "}
              {isKo
                ? "전체 깔때기 — 어디서 얼마나 빠지는가 (양적)."
                : "the whole funnel — where users drop, and how much (quant)."}
            </li>
            <li>
              <strong>Clarity:</strong>{" "}
              {isKo
                ? "히트맵·세션 일부 — 사용자가 \"어떻게\" 막혔는가 (행동 패턴)."
                : "heatmaps + session samples — how the user got stuck (behavior)."}
            </li>
            <li>
              <strong>Datadog RUM:</strong>{" "}
              {isKo
                ? "결제 플로우 커스텀 이벤트 — \"무엇이 일어났는가\" (이벤트 시퀀스)."
                : "custom events on the payment flow — what happened (event sequence)."}
            </li>
            <li>
              {isKo
                ? "셋이 서로 대체재가 아니라 보완재라는 걸 첫 주에 한 번 정리해 두니 매일 \"어느 도구를 볼지\" 다툴 일이 없음."
                : "Defined once in week one that they're complements, not substitutes — no daily \"which tool?\" debate after."}
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
                ? "CTA 위치를 결제 화면 첫 뷰포트 안으로 이동 → 결제 진입율 상승의 첫 lift."
                : "Moved the CTA inside the first viewport on the payment screen — first lift on payment entry."}
            </li>
            <li>
              {isKo
                ? "입력 폼 순서를 \"사용자가 가장 자신 있는 답부터\"로 재정렬 → 폼 이탈 감소."
                : "Reordered form fields so users answer the easiest field first — fewer form drop-offs."}
            </li>
            <li>
              {isKo
                ? "로딩 상태 개선(스켈레톤 + 진행 표시) → \"고장난 줄 알았다\"는 세션 리플레이 패턴 제거."
                : "Skeletons + progress states — killed the \"I thought it was broken\" session-replay pattern."}
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
              ? "주간 실험은 가설을 잊고, 일일 실험은 가설을 기억한다. \"오늘 데이터\"가 \"어제의 결정\"을 즉각 검증해 줘서 학습이 빠르다."
              : "Weekly cycles forget the hypothesis. Daily cycles remember it — today's data verifies yesterday's decision while the context is still warm."}
          </li>
          <li>
            {isKo
              ? "한 번에 하나만 바꾼다는 규칙은 \"이번 주는 큰 변화가 필요한데\"라는 유혹을 이겨야 지킬 수 있다. 큰 변화는 작은 변화의 누적으로 만들어진다."
              : "\"Change one thing at a time\" only works if you resist \"but this week needs a big swing\". The big swing is many small ones."}
          </li>
          <li>
            {isKo
              ? "도구를 목적별로 분리하는 첫 정의가 매일 회의 시간을 줄인다. \"어느 도구를 볼지\"를 매일 다투지 않으려면 한 번 합의해 둬야 한다."
              : "Defining \"which tool for which intent\" once cuts daily meeting time. Don't re-litigate it every morning."}
          </li>
        </ul>
      </section>
    </div>
  );
}
