import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function SocialLoginConversion({ locale }: Props) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">TL;DR</h2>
        <p className="text-sm leading-7">
          {isKo
            ? "PO 목표: B2C 가입 전환율 0.93%를 끌어올린다. 8일 안에 Google / Kakao / Naver OAuth 3종 + 추가 정보 수집 페이지를 붙여 가입 전환 0.93% → 3.00% (3.2배), 소셜 가입 비중 75.83%, 결제 진입 허들 제거를 달성했습니다. 핵심은 \"이메일 가입의 어떤 부분이 사용자를 막는가\"를 분석한 다음 OAuth로 그 단계만 잘라낸 것."
            : "PO goal: lift B2C signup conversion above 0.93%. In 8 days I shipped Google / Kakao / Naver OAuth + a follow-up profile form, taking conversion 0.93% → 3.00% (3.2×), with 75.83% of signups via social and the payment-entry friction removed. The key move: identify which step of email signup actually blocks users, then use OAuth to cut exactly that step."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "Riad B2C 확장 직후, 가입 전환율은 0.93%에 머물러 있었고 결제까지 도달하는 비율이 그만큼 낮았습니다. PO는 \"가입 진입 허들이 가장 큰 누수\"라고 지목했고, 8일짜리 짧은 사이클로 OAuth 3종을 붙이는 작업이 잡혔습니다. 의사결정의 첫 단계는 \"이메일 가입의 어느 단계가 막히는가\"를 데이터로 보는 것이었습니다."
            : "Right after Riad's B2C expansion, signup conversion sat at 0.93%, capping payment funnel volume. The PO flagged signup friction as the biggest leak, and the team scoped an 8-day cycle to ship 3 OAuth providers. Step one wasn't building OAuth — it was reading the data to find which step of email signup people quit on."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 핵심 의사결정" : "2. Key decisions"}
        </h2>

        <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-4 dark:bg-zinc-900/60">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "1) 추가 정보 수집은 \"OAuth 후\"로" : "1) Collect missing fields after OAuth, not before"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "OAuth는 이메일·이름까지만 보장합니다. 비즈니스 정책상 전화번호와 약관 동의가 필수였는데, 그 둘을 OAuth 화면 \"앞\"에 두면 결국 이메일 가입과 똑같은 허들이 됩니다. 결정: OAuth 인증을 먼저 통과시키고, 필수 필드가 비어 있을 때만 후속 페이지로 redirect. 사용자가 \"이미 가입한 느낌\"을 한 번 받은 다음에야 추가 입력을 요구합니다."
              : "OAuth only guarantees email + name. Policy required phone number and terms consent — putting those before OAuth recreates the same friction as email signup. Decision: clear OAuth first, then redirect to a follow-up page only when required fields are missing. The user has already crossed the \"signed up\" line before being asked for more."}
          </p>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2) Type-safe OAuth 플로우" : "2) Type-safe OAuth flow"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "프로바이더(Google / Kakao / Naver)별 응답 구조가 다른데, 각자 string 키로 접근하면 \"이름 필드가 없네\" 같은 런타임 에러가 발생."
                : "Provider response shapes differ (Google / Kakao / Naver). String-key access risks runtime errors like \"name field missing\"."}
            </li>
            <li>
              {isKo
                ? "프로바이더별 응답 타입을 정의하고, 통합 사용자 객체로 정규화하는 매퍼를 둠. 컴파일 타임에 누락 필드 잡힘."
                : "Defined per-provider response types and normalized them through a single mapper into a unified user object. Missing fields fail at compile time."}
            </li>
            <li>
              {isKo
                ? "에러 핸들링: 인증 실패 / 약관 미동의 / 토큰 만료 등 명시적 분기."
                : "Errors split explicitly: auth failure, terms not accepted, token expiry."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "3) 8일 일정 + 3 프로바이더 — 우선순위" : "3) 8-day window + 3 providers — prioritization"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "Google / Kakao 먼저(국내·해외 양쪽 커버), Naver는 마지막. 각 프로바이더의 검증 → 후속 페이지 → 결제 연결까지 e2e 단위로 끝낸 후 다음."
                : "Google / Kakao first (covers domestic + international); Naver last. Each provider verified end-to-end through follow-up form → payment before moving on."}
            </li>
            <li>
              {isKo
                ? "8일 안에 모든 프로바이더가 동일한 정합성으로 동작. 일정 절반에 \"하나 prov만 깊게 짜기\" 방식이 아닌 \"3개 얕게 → 깊게\" 진행."
                : "All 3 providers reached parity inside 8 days. Avoided \"one provider deep first\" — went \"all three shallow, then deepen\"."}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. 결과" : "3. Outcomes"}
        </h2>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
          <li>
            {isKo ? "가입 전환율 0.93% → 3.00% (3.2배)" : "Signup conversion: 0.93% → 3.00% (3.2×)"}
          </li>
          <li>
            {isKo ? "소셜 가입 비중 75.83% — 이메일 가입 경로의 부담을 사실상 대체" : "75.83% of signups via social — effectively replaced the email path's burden"}
          </li>
          <li>
            {isKo
              ? "결제 진입 허들 제거 → 후속 결제 전환 62% 달성의 전제 조건"
              : "Removed the entry barrier into payments — a precondition for the 62% payment conversion that followed"}
          </li>
          <li>
            {isKo
              ? "스택: OAuth 2.0, REST API, TypeScript, Zustand"
              : "Stack: OAuth 2.0, REST API, TypeScript, Zustand"}
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 무엇을 배웠나" : "4. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "전환 개선의 첫 작업은 코드가 아니라 \"어디서 막히는가\"를 데이터로 좁히는 것. 8일을 \"OAuth 짜기\"로 시작하면 같은 결과 못 만들었을 것."
              : "The first move on conversion isn't code — it's narrowing \"where they stop\" with data. Starting the 8 days with \"build OAuth\" wouldn't have produced this outcome."}
          </li>
          <li>
            {isKo
              ? "필수 필드 수집을 인증 이전 vs 이후에 두는 1줄짜리 결정이 전환율을 결정한다."
              : "A one-line decision — collect required fields before vs after auth — drives conversion."}
          </li>
          <li>
            {isKo
              ? "프로바이더 3개를 동시에 다룰 때는 응답을 통합 사용자 객체로 정규화하는 게 핵심. 분기를 컴포넌트가 아니라 매퍼에 둔다."
              : "When juggling 3 providers, the key is normalizing responses into a unified user object. Branch in the mapper, not in components."}
          </li>
        </ul>
      </section>
    </div>
  );
}
