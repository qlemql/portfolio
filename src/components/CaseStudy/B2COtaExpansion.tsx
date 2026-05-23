import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function B2COtaExpansion({ locale }: Props) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">TL;DR</h2>
        <p className="text-sm leading-7">
          {isKo
            ? "B2B 단체 여행 견적 플랫폼 'Ria'에 B2C 직접 예약과 결제 흐름을 얹는 5개월짜리 프로젝트였습니다. 가장 큰 리스크는 결제였습니다. 한 결제사의 정책 승인이 런칭 일정보다 오래 걸렸기 때문입니다. 한 결제사로 통합한다는 초기 설계를 포기하고 국내는 토스, 해외는 Stripe로 빠르게 나눠서 일정을 지켰고, 결제 전환 62%를 달성했습니다."
            : "A 5-month project that layered a B2C reservation and payment flow onto Ria, a B2B group-travel quote platform. The biggest risk was payments: one provider's policy approval ran longer than our launch window. I dropped the single-PSP plan and split it into domestic (Toss) and international (Stripe), which kept us on schedule and reached 62% payment conversion."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "Ria는 원래 B2B 단체 여행사를 위한 견적 플랫폼이었습니다. PO는 개인 고객도 같은 조건으로 바로 예약하고 결제할 수 있게 하자는 목표를 세웠고, 기존 B2B 흐름은 그대로 둔 채 B2C 진입을 더해야 했습니다. 팀은 CTO와 AI, FE 개발 3명에 PO와 PD가 함께였습니다."
            : "Ria was originally a quote platform for B2B group-travel agencies. The PO set a goal of letting individual customers reserve and pay on the same terms, instantly. The B2B flow had to keep working, and the B2C entry was added on top. The team was 3 engineers (CTO, AI, FE) plus a PO and a PD."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 핵심 의사결정 4가지" : "2. Four key decisions"}
        </h2>

        <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-4 dark:bg-zinc-900/60">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "1) 이중 결제 시스템 — 정책 리스크를 결제사 분리로 풀다" : "1) Dual payment system — split PSPs to dodge policy risk"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              <strong>{isKo ? "초기 가정: " : "Initial plan: "}</strong>
              {isKo
                ? "토스페이먼츠 하나로 국내와 해외 결제를 통합한다."
                : "unify domestic and international payments through Toss Payments."}
            </li>
            <li>
              <strong>{isKo ? "발견된 제약: " : "Constraint found: "}</strong>
              {isKo
                ? "토스 정책상 해외 결제 서비스의 승인과 개발이 런칭 일정보다 오래 걸렸습니다."
                : "Toss's international approval and integration timeline ran past our launch window."}
            </li>
            <li>
              <strong>{isKo ? "결정: " : "Decision: "}</strong>
              {isKo
                ? "Stripe를 함께 도입했습니다. 수수료 2.9%에 사흘 정도면 연동할 수 있었고, PayPal보다 수수료가 낮았습니다."
                : "adopt Stripe in parallel: a 2.9% fee, about three days to integrate, and a lower fee than PayPal."}
            </li>
            <li>
              <strong>{isKo ? "결과: " : "Outcome: "}</strong>
              {isKo
                ? "국내는 토스, 해외는 Stripe로 나눠 일정을 지켰고 결제 전환 62%를 달성했습니다."
                : "Toss for domestic, Stripe for international, schedule met, 62% payment conversion."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2) 모바일 웹 우선" : "2) Mobile-web first"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "왜: B2C 사용자는 모바일 사용 비중이 큽니다. 데스크탑을 먼저 설계하면 이탈이 커집니다."
                : "Why: B2C users skew heavily toward mobile. Designing desktop-first widens drop-off."}
            </li>
            <li>
              {isKo
                ? "실행: 375px 기준 반응형, 터치 인터랙션 최적화, 모바일 결제 플로우 다듬기."
                : "Build: 375px responsive baseline, touch-interaction tuning, a polished mobile payment flow."}
            </li>
            <li>
              {isKo ? "결과: 모바일 이탈률이 줄고 B2C UX가 나아졌습니다." : "Outcome: lower mobile drop-off, better B2C UX."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "3) Google Maps 4:6 분할 뷰 → 상세 진입률 +23%" : "3) Google Maps 4:6 split view → +23% detail entry"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "왜: 사용자 인터뷰에서 숙소 위치가 예약 결정의 핵심이라는 신호를 확인했습니다."
                : "Why: user interviews showed that location was the decisive factor in choosing a reservation."}
            </li>
            <li>
              {isKo
                ? "실행: 지도와 리스트를 4:6으로 나누고, 클러스터링으로 성능을 확보하고, 커스텀 마커로 시각적으로 구분했습니다."
                : "Build: a 4:6 map/list split, clustering for performance, custom markers for visual differentiation."}
            </li>
            <li>
              {isKo
                ? "결과: 상세 페이지 진입률이 23% 올랐습니다."
                : "Outcome: detail-page entry rose by 23%."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "4) Datadog RUM — 결제 이탈 원인 분석" : "4) Datadog RUM — root-cause for payment drop-off"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "왜: Clarity는 히트맵, Sentry는 에러만 보여 줍니다. 결제 단계에서 실제로 무슨 일이 일어났는지 보려면 세션 리플레이가 필요했습니다."
                : "Why: Clarity gives heatmaps, Sentry gives errors. To see what actually happened during payment drop-off, we needed session replay."}
            </li>
            <li>
              {isKo
                ? "실행: Datadog RUM을 도입하고 결제 플로우에 커스텀 이벤트를 붙였습니다."
                : "Build: introduced Datadog RUM and attached custom events along the payment flow."}
            </li>
            <li>
              {isKo
                ? "결과: 실시간으로 모니터링하면서 이슈 트리아지 시간을 줄였습니다."
                : "Outcome: real-time monitoring and faster triage."}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. 무엇을 배웠나" : "3. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "런칭 일정과 부딪히는 외부 의존성, 가령 승인이나 SLA는 통합보다 분리로 푸는 게 빨랐습니다. 단일 PSP 통합의 깔끔함보다 일정을 지키는 게 비즈니스엔 더 가치 있었습니다."
              : "External dependencies that collide with the launch date, like approvals or SLAs, were faster to solve by splitting than by integrating. Hitting the date was worth more to the business than the neatness of a single PSP."}
          </li>
          <li>
            {isKo
              ? "사용자 인터뷰의 한 문장이 의사결정을 바꾸기도 합니다. 숙소 위치가 가장 중요하다는 단서를 붙잡지 않았다면 4:6 지도 분할은 우선순위에서 밀렸을 것입니다."
              : "A single line from a user interview can change a decision. If we hadn't held onto the clue that location matters most, the 4:6 map split would have been deprioritized."}
          </li>
          <li>
            {isKo
              ? "관측 도구는 목적에 맞게 골라서 도입했습니다. RUM과 에러 추적, 히트맵은 서로 대체하는 게 아니라 보완하는 관계였습니다."
              : "I picked observability tools by what each was for. RUM, error tracking, and heatmaps complement each other rather than replace one another."}
          </li>
        </ul>
      </section>
    </div>
  );
}
