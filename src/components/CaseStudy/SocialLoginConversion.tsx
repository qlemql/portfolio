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
            ? "PO의 목표는 0.93%에 머물던 B2C 가입 전환율을 끌어올리는 것이었습니다. 8일 안에 Google, Kakao, Naver OAuth 세 가지와 추가 정보 수집 페이지를 붙여, 가입 전환을 0.93%에서 3.00%로(3.2배) 올리고, 소셜 가입 비중 75.83%를 달성하고, 결제 진입 허들을 없앴습니다. 핵심은 이메일 가입의 어느 부분이 사용자를 막는지 먼저 분석한 다음, OAuth로 딱 그 단계만 잘라낸 것이었습니다."
            : "The PO's goal was to lift B2C signup conversion above 0.93%. In 8 days I shipped Google, Kakao, and Naver OAuth plus a follow-up profile form, taking conversion from 0.93% to 3.00% (3.2x), with 75.83% of signups coming through social and the payment-entry friction gone. The key move was to analyze which step of email signup actually blocked users, then use OAuth to cut exactly that step."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "Ria가 B2C로 확장한 직후, 가입 전환율은 0.93%에 머물러 있었고 결제까지 도달하는 비율도 그만큼 낮았습니다. PO는 가입 진입 허들이 가장 큰 누수라고 봤고, 8일짜리 짧은 사이클로 OAuth 세 가지를 붙이기로 했습니다. 첫 단계는 OAuth를 만드는 게 아니라, 이메일 가입의 어느 단계에서 사람들이 그만두는지 데이터로 보는 것이었습니다."
            : "Right after Riad's B2C expansion, signup conversion sat at 0.93%, which capped the payment funnel too. The PO saw signup friction as the biggest leak, and the team scoped an 8-day cycle to ship three OAuth providers. The first step wasn't building OAuth; it was reading the data to find which step of email signup people quit on."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 핵심 의사결정" : "2. Key decisions"}
        </h2>

        <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-4 dark:bg-zinc-900/60">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "1) 추가 정보 수집은 OAuth 다음에" : "1) Collect missing fields after OAuth, not before"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "OAuth가 보장하는 건 이메일과 이름까지입니다. 그런데 비즈니스 정책상 전화번호와 약관 동의가 필수였습니다. 이 둘을 OAuth 화면 앞에 두면 결국 이메일 가입과 똑같은 허들이 됩니다. 그래서 OAuth 인증을 먼저 통과시키고, 필수 필드가 비어 있을 때만 다음 페이지로 보내기로 했습니다. 사용자가 이미 가입했다는 느낌을 한 번 받은 다음에야 추가 입력을 요청하는 셈입니다."
              : "OAuth only guarantees email and name, but our policy required a phone number and terms consent. Putting those in front of OAuth recreates the same friction as email signup. So we cleared OAuth first and only redirected to a follow-up page when required fields were missing. The user has already crossed the line of feeling signed up before being asked for anything more."}
          </p>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2) Type-safe OAuth 플로우" : "2) Type-safe OAuth flow"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "프로바이더마다(Google, Kakao, Naver) 응답 구조가 다른데, 각자 string 키로 접근하면 이름 필드가 없다는 식의 런타임 에러가 납니다."
                : "Each provider (Google, Kakao, Naver) returns a different response shape, and accessing them by raw string keys risks runtime errors like a missing name field."}
            </li>
            <li>
              {isKo
                ? "프로바이더별 응답 타입을 정의하고, 매퍼를 두어 통합 사용자 객체로 정규화했습니다. 누락된 필드가 컴파일 타임에 잡힙니다."
                : "I defined a response type per provider and normalized them through a single mapper into a unified user object, so missing fields fail at compile time."}
            </li>
            <li>
              {isKo
                ? "에러는 인증 실패, 약관 미동의, 토큰 만료처럼 경우별로 나눠서 처리했습니다."
                : "Errors were split by case: auth failure, terms not accepted, token expiry."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "3) 8일 일정에 프로바이더 3개 — 우선순위" : "3) 8-day window, 3 providers — prioritization"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "Google과 Kakao를 먼저 했습니다(국내와 해외를 함께 커버). Naver는 마지막에 했습니다. 각 프로바이더를 검증부터 후속 페이지, 결제 연결까지 끝낸 다음 다음 프로바이더로 넘어갔습니다."
                : "Google and Kakao first, to cover both domestic and international, with Naver last. I finished each provider end-to-end, from verification through the follow-up form to payment, before moving on."}
            </li>
            <li>
              {isKo
                ? "8일 안에 세 프로바이더 모두 같은 수준으로 동작했습니다. 한 프로바이더만 깊게 짜는 대신, 셋을 얕게 붙인 다음 깊이를 더하는 순서로 갔습니다."
                : "All three reached parity within 8 days. Rather than building one provider deeply first, I went broad and shallow across all three, then deepened."}
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
            {isKo ? "가입 전환율 0.93% → 3.00% (3.2배)" : "Signup conversion: 0.93% → 3.00% (3.2x)"}
          </li>
          <li>
            {isKo ? "소셜 가입 비중 75.83%로, 이메일 가입 경로의 부담을 사실상 대체했습니다." : "75.83% of signups via social, effectively replacing the burden of the email path."}
          </li>
          <li>
            {isKo
              ? "결제 진입 허들 제거. 이후 결제 전환 62%를 달성하는 전제 조건이 됐습니다."
              : "Removed the entry barrier into payments, which set up the 62% payment conversion that followed."}
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
              ? "전환을 개선할 때 첫 작업은 코드가 아니라 어디서 막히는지를 데이터로 좁히는 일이었습니다. 8일을 OAuth 구현으로 시작했다면 같은 결과를 내지 못했을 것입니다."
              : "The first move on conversion was data, not code: narrowing down where people stop. Had the 8 days started with building OAuth, the result would not have been the same."}
          </li>
          <li>
            {isKo
              ? "필수 필드를 인증 전에 받느냐 후에 받느냐는 한 줄짜리 결정이지만, 이 결정이 전환율을 갈랐습니다."
              : "Whether to collect required fields before or after auth is a one-line decision, but it was the one that moved conversion."}
          </li>
          <li>
            {isKo
              ? "프로바이더를 세 개 동시에 다룰 때는 응답을 통합 사용자 객체로 정규화하는 게 핵심이었습니다. 분기는 컴포넌트가 아니라 매퍼에 뒀습니다."
              : "Juggling three providers, the key was normalizing responses into a unified user object. I kept the branching in the mapper, not in the components."}
          </li>
        </ul>
      </section>
    </div>
  );
}
