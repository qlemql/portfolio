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
            ? "목표는 0.93%에 머물던 B2C(일반 소비자) 가입 전환율을 끌어올리는 것이었습니다. 8일 안에 Google·Kakao·Naver 소셜 로그인(OAuth) 3종과 추가 정보 입력 페이지를 붙였고, 인증 플로우는 프론트엔드부터 백엔드(Go)의 콜백·토큰 교환 엔드포인트까지 직접 구현했습니다. 가입 전환을 0.93%에서 3.00%로(3.2배) 올리고, 소셜 가입 비중 76%를 달성해, 결제로 가는 길목이던 가입 허들을 낮췄습니다. 핵심은 0.93%라는 절대치에서 '가입 절차 자체가 허들'이라고 판단하고, OAuth로 이메일 가입의 마찰을 통째로 걷어낸 것이었습니다."
            : "The PO's goal was to lift B2C signup conversion above 0.93%. In 8 days I shipped Google, Kakao, and Naver OAuth plus a follow-up profile form — building the auth flow end to end, from the frontend to the Go backend's callback and token-exchange endpoints. Conversion went from 0.93% to 3.00% (3.2x), with 76% of signups coming through social — lowering the barrier that stood on the way to payments. The key move was reading 0.93% as a verdict on the signup process itself, then using OAuth to remove the friction of email signup wholesale."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "B2B 단체 여행 견적 플랫폼이던 Ria가 일반 소비자(B2C)로 확장한 직후, 가입 전환율은 0.93%에 머물러 있었습니다. 가입이 좁으니 그 뒤의 견적·결제 퍼널도 함께 막혀 있었습니다. 기획자(PO)는 가입 진입 허들이 가장 큰 누수라고 봤고, 8일짜리 짧은 사이클로 OAuth 세 가지를 붙이기로 했습니다. 단계별 이탈 지점까지 계측하진 않았지만, 0.93%라는 절대치가 특정 화면이 아니라 가입 절차 전체가 문제라는 판단을 만들었습니다."
            : "Right after Ria — until then a B2B group-travel quote platform — expanded to consumers (B2C), signup conversion sat at 0.93%, which capped the quote and payment funnel too. The PO saw signup friction as the biggest leak, and the team scoped an 8-day cycle to ship three OAuth providers. We hadn't instrumented step-level drop-off, but the sheer 0.93% said the problem was the signup process as a whole, not any one screen."}
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
              ? "소셜 로그인으로 받을 수 있는 정보는 이메일과 이름뿐입니다. 그런데 비즈니스 정책상 전화번호와 약관 동의가 필수였습니다. 이 둘을 OAuth 화면 앞에 두면 결국 이메일 가입과 똑같은 허들이 됩니다. 그래서 OAuth 인증을 먼저 통과시키고, 필수 필드가 비어 있을 때만 다음 페이지로 보내기로 했습니다. 사용자가 '이미 가입됐다'고 느낀 뒤에 추가 입력을 요청하는 구조입니다."
              : "OAuth only guarantees email and name, but our policy required a phone number and terms consent. Putting those in front of OAuth recreates the same friction as email signup. So we cleared OAuth first and only redirected to a follow-up page when required fields were missing. The user already feels signed up by the time we ask for anything more."}
          </p>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2) Type-safe OAuth 플로우" : "2) Type-safe OAuth flow"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "프로바이더마다(Google, Kakao, Naver) 응답 구조가 달라서, 문자열 키로 직접 접근하면 '이 프로바이더에는 이름 필드가 없는' 케이스가 런타임 에러로 터집니다."
                : "Each provider (Google, Kakao, Naver) returns a different response shape, and accessing them by raw string keys risks runtime errors like a missing name field."}
            </li>
            <li>
              {isKo
                ? "프로바이더별 응답 타입을 정의하고, 매퍼를 두어 통합 사용자 객체로 정규화했습니다. 존재하지 않는 필드에 접근하는 실수가 컴파일 타임에 잡힙니다."
                : "I defined a response type per provider and normalized them through a single mapper into a unified user object, so accessing a field that isn't there fails at compile time."}
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
                ? "첫 프로바이더에서 검증한 플로우가 패턴이 되어, 나머지 둘은 그 위에 얹는 작업이라 속도가 붙었고 8일 안에 셋 모두 같은 수준으로 동작했습니다."
                : "The flow proven on the first provider became the pattern, so the other two were a matter of layering onto it — all three reached parity within 8 days."}
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
            {isKo ? "소셜 가입 비중 76%로, 이메일 가입 경로의 부담을 사실상 대체했습니다." : "76% of signups via social, effectively replacing the burden of the email path."}
          </li>
          <li>
            {isKo
              ? "결제로 가는 진입 허들이 낮아져, 이후 B2C OTA 확장에서 결제 전환 62%를 만드는 전제 조건이 됐습니다."
              : "With the entry barrier lowered, this set up the 62% payment conversion achieved later in the B2C OTA expansion."}
          </li>
          <li>
            {isKo
              ? "스택: OAuth 2.0, TypeScript, Zustand (프론트) · Go (백엔드 콜백·토큰 교환)"
              : "Stack: OAuth 2.0, TypeScript, Zustand (frontend) · Go (backend callback/token exchange)"}
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
              ? "전환 개선의 출발은 코드가 아니라 수치였습니다. 0.93%라는 절대치가 '어느 화면을 고칠까'가 아니라 '절차 자체를 걷어내자'는 판단을 만들었습니다."
              : "The starting point wasn't code but a number. 0.93% shifted the question from \"which screen do we fix\" to \"remove the process itself.\""}
          </li>
          <li>
            {isKo
              ? "필수 정보를 인증 전에 받느냐 후에 받느냐는 사양서에선 한 줄 차이지만, 전환율을 가른 건 이 결정이었습니다."
              : "Collecting required fields before or after auth is one line's difference in a spec, but it was the decision that moved conversion."}
          </li>
          <li>
            {isKo
              ? "프로바이더를 세 개 동시에 다룰 때는 응답을 통합 사용자 객체로 정규화하는 게 핵심이었습니다. 분기는 컴포넌트가 아니라 매퍼에 뒀습니다."
              : "With three providers in play, the key was normalizing responses into a unified user object. I kept the branching in the mapper, not in the components."}
          </li>
        </ul>
      </section>
    </div>
  );
}
