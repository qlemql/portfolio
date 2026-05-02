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
            ? "B2B 단체 여행 견적 플랫폼 'Ria'에 B2C 직접 예약·결제 흐름을 얹는 5개월 프로젝트. 가장 큰 리스크는 결제 — 한 결제사의 정책 승인이 런칭 일정보다 길었습니다. \"한 결제사로 통합한다\"는 초기 설계를 포기하고 국내(토스) + 해외(Stripe) 이중 시스템으로 빠르게 분리해 일정을 지키며 결제 전환 62%를 달성했습니다."
            : "A 5-month project layering a B2C reservation + payment flow onto Ria, a B2B group-travel quote platform. The biggest risk was payments — one provider's policy approval was longer than our launch window. I abandoned the \"one PSP\" plan and split into domestic (Toss) + international (Stripe), keeping the schedule and landing 62% payment conversion."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "Ria는 원래 B2B 단체 여행사 대상 견적 플랫폼이었습니다. 사용자(=PO)는 \"개인 고객도 같은 조건으로 즉시 예약하고 결제할 수 있게 하자\"는 목표를 세웠고, 기존 B2B 흐름은 유지한 채 B2C 진입을 추가해야 했습니다. 팀: CTO·AI·FE 3명 + PO + PD."
            : "Ria was originally a quote platform for B2B group-travel agencies. The PO set a goal: \"let individual customers reserve and pay on the same terms, instantly.\" The B2B flow had to keep working; the B2C entry was additive. Team: CTO / AI / FE (3 engineers) + PO + PD."}
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
                ? "토스페이먼츠 단일로 국내·해외 결제 통합."
                : "unify domestic + international through Toss Payments."}
            </li>
            <li>
              <strong>{isKo ? "발견된 제약: " : "Constraint found: "}</strong>
              {isKo
                ? "토스 정책상 해외 결제 서비스 승인·개발이 런칭 일정보다 오래 걸림."
                : "Toss's international approval + integration timeline exceeded our launch window."}
            </li>
            <li>
              <strong>{isKo ? "결정: " : "Decision: "}</strong>
              {isKo
                ? "Stripe 병행 도입 (수수료 2.9%, 약 3일 내 연동 가능). PayPal 대비 수수료 우위."
                : "adopt Stripe in parallel (2.9% fee, ~3 days to integrate). Lower fee than PayPal."}
            </li>
            <li>
              <strong>{isKo ? "결과: " : "Outcome: "}</strong>
              {isKo
                ? "국내(토스) + 해외(Stripe) 이중 시스템으로 일정 준수, 결제 전환 62% 달성."
                : "Met launch schedule with Toss (domestic) + Stripe (international); 62% payment conversion."}
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
                ? "Why: B2C 사용자는 모바일 사용 비중이 큼 (시장 패턴). 데스크탑 우선 설계는 이탈을 키운다."
                : "Why: B2C users skew heavily mobile (market pattern). Desktop-first widens drop-off."}
            </li>
            <li>
              {isKo
                ? "실행: 375px 기준 반응형, 터치 인터랙션 최적화, 모바일 결제 플로우 폴리시."
                : "Build: 375px responsive baseline, touch interaction tuning, polished mobile payment flow."}
            </li>
            <li>
              {isKo ? "결과: 모바일 이탈률 감소, B2C UX 향상." : "Outcome: lower mobile drop-off, better B2C UX."}
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
                ? "Why: 사용자 인터뷰에서 \"숙소 위치\"가 예약 결정의 핵심이라는 시그널 확인."
                : "Why: user interviews revealed \"location\" is the decisive factor in reservation choice."}
            </li>
            <li>
              {isKo
                ? "실행: 지도/리스트 4:6 분할, 클러스터링으로 성능 확보, 커스텀 마커로 시각적 차별화."
                : "Build: 4:6 map/list split, clustering for perf, custom markers for visual differentiation."}
            </li>
            <li>
              {isKo
                ? "결과: 상세 페이지 진입률 23% 향상."
                : "Outcome: +23% on detail-page entry."}
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
                ? "Why: Clarity는 히트맵, Sentry는 에러만. 결제 이탈의 \"무엇이 일어났는지\"는 세션 리플레이가 필요했음."
                : "Why: Clarity = heatmaps, Sentry = errors. Drop-off needed session replay to see \"what happened\"."}
            </li>
            <li>
              {isKo
                ? "실행: Datadog RUM 도입, 결제 플로우에 커스텀 이벤트 부착."
                : "Build: introduced Datadog RUM, attached custom events along the payment flow."}
            </li>
            <li>
              {isKo
                ? "결과: 실시간 모니터링 + 이슈 트리아지 단축."
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
              ? "런칭 일정과 충돌하는 외부 의존성(승인/SLA)은 \"통합\"이 아니라 \"분리\"로 푸는 게 빠르다. 단일 PSP 통합의 우아함보다 일정 준수가 비즈니스에 더 가치 있었다."
              : "External dependencies (approvals, SLAs) that collide with launch are solved faster by separation than by integration. Hitting the date mattered more than the elegance of a single PSP."}
          </li>
          <li>
            {isKo
              ? "사용자 인터뷰의 한 문장이 의사결정을 바꾼다. \"숙소 위치가 가장 중요\"라는 단서를 붙잡지 않았으면 4:6 지도 분할은 우선순위에서 밀렸을 것."
              : "One line from a user interview can change a decision. Without \"location matters most\", the 4:6 map split would have been deprioritized."}
          </li>
          <li>
            {isKo
              ? "관측 도구는 목적에 맞게 구분해서 도입한다. RUM·에러 추적·히트맵은 서로 대체재가 아니라 보완재."
              : "Pick observability tools by intent. RUM, error tracking, and heatmaps complement rather than replace each other."}
          </li>
        </ul>
      </section>
    </div>
  );
}
