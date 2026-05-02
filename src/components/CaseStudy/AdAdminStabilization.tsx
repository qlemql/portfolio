import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function AdAdminStabilization({ locale }: Props) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "TL;DR" : "TL;DR"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "신규 입사 한 달. 30+ 파일에 흩어진 도메인 문자열을 7단계에 걸쳐 상수로 옮기며 회귀 0건을 유지했고, 같은 시기에 기존 팀이 손대지 않던 릴리스 작업을 /release 워크플로우로 단계적으로 자동화했습니다. 두 작업의 공통 원리: 마찰점에서 보이는 패턴을 측정 가능한 불변 조건으로 옮긴 뒤 점진적으로 자동화한다."
            : "One month after joining. I moved 30+ files of scattered domain strings into constants across 7 staged refactors with zero regressions, and in parallel automated a release process the team hadn't touched, step by step, into a /release workflow. The shared principle: take the pattern visible at a friction point, freeze it as a measurable invariant, and automate incrementally."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "광고 플랫폼팀의 광고 어드민(ad-admin)에 합류했을 때 두 종류의 마찰이 있었습니다. 하나는 도메인 용어가 30+ 파일에 직접 박혀 있어서 라벨 한 줄 바꾸려면 전수 검색이 필요했고, 다른 하나는 핫픽스/릴리스가 cherry-pick 수작업으로 진행돼 신규 입사자에게 진입 장벽이 높았습니다. 둘 다 \"기존 팀에게는 익숙해진 마찰\"이었습니다."
            : "When I joined the ad platform team, the ad admin had two friction points. Domain terms were hardcoded across 30+ files — changing a single label required a full search. Releases and hotfixes ran on manual cherry-picks, a high entry bar for a new joiner. Both were the kind of friction veterans get used to."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 광고 어드민 안정화 — 회귀 0건의 7단계 리팩토링" : "2. Stabilizing the ad admin — a 7-step refactor with zero regressions"}
        </h2>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            {isKo ? "문제" : "The problem"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "도메인 문자열이 컴포넌트, 유틸, API 페이로드에 직접 박혀 있어 (a) 변경 비용이 크고 (b) 같은 의미의 다른 표기가 누적돼 의도하지 않은 분기가 생기고 있었습니다."
              : "Domain strings sat directly inside components, utilities, and API payloads. The cost of changing them was high, and synonymous variants accumulated, creating accidental branches in behavior."}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            {isKo ? "핵심 결정 — \"렌더링 UI 텍스트 바이트 단위 동일성\"을 불변 조건으로" : "Key decision — make \"byte-level identity of rendered UI text\" the invariant"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "리팩토링 단계마다 화면에 찍히는 텍스트가 한 글자라도 달라지면 즉시 멈춘다는 규칙을 불변 조건으로 박았습니다. 의미 보존은 인간 판단을 필요로 하지만, 바이트 동일성은 자동 비교로 검증됩니다 — 신규 입사자가 도메인을 다 모르는 상태에서도 안전하게 진행할 수 있는 가드레일이었습니다."
              : "I locked in a rule: if any rendered character changed during a refactor step, stop immediately. Preserving meaning needs human judgment; preserving bytes can be checked automatically — a guardrail that lets a new joiner refactor safely without yet knowing the full domain."}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            {isKo ? "단계 분할" : "Step partitioning"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "1단계: 상수 후보 추출 (사용 위치 + 빈도 + 표기 변형 식별)"
                : "Step 1: extract constant candidates — usage sites, frequency, and surface variants."}
            </li>
            <li>
              {isKo
                ? "2~6단계: 도메인 묶음 단위로 한 번에 한 묶음씩만 옮김 (한 PR당 변경 범위 제한)"
                : "Steps 2–6: migrate one domain cluster per PR, capping change radius."}
            </li>
            <li>
              {isKo
                ? "7단계: 표기 변형이 발견된 케이스를 정정해 정합성 통일"
                : "Step 7: reconcile surface variants discovered along the way."}
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            {isKo ? "결과" : "Outcome"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>{isKo ? "회귀 0건 (전 단계 텍스트 동일성 유지)" : "Zero regressions across all 7 steps."}</li>
            <li>
              {isKo
                ? "이후 라벨 변경 작업이 1 파일 수정으로 끝남"
                : "Subsequent label changes now resolve in a single-file edit."}
            </li>
            <li>
              {isKo
                ? "도메인 어휘 정합성이 코드에 명시적으로 박힘 — 신규 입사자가 코드만 보고 도메인을 학습 가능"
                : "The domain vocabulary became explicit in code — readable to new joiners without external context."}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. /release 워크플로우 — 마찰을 단계적으로 자동화하다" : "3. /release workflow — automating friction in stages"}
        </h2>

        <p className="text-sm leading-7">
          {isKo
            ? "릴리스 작업은 처음에는 \"이 절차를 어떻게 따라가야 하지?\" 수준의 질문으로 시작했습니다. 다만 작업을 따라가는 동안 명확한 패턴 — PR 메타데이터, cherry-pick 후보, Jira 키 — 이 보였고, 자동화 가능성을 발견했습니다. 처음부터 완성형 자동화를 만들지 않고, 초안 → 보완 → 통합의 3단계로 진화시켰습니다."
            : "Release work started as a \"how do I follow this procedure?\" question. While walking through it I noticed a clear pattern — PR metadata, cherry-pick candidates, Jira keys — and a path to automation. Rather than ship a finished automation, I evolved it in three stages: draft → refinement → integration."}
        </p>

        <div className="rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 dark:border-yellow-700/60 dark:from-yellow-950/30 dark:to-amber-950/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "1단계 — 초안: PR 메타데이터 기반 릴리스 노트 자동 생성" : "Stage 1 — Draft: auto-generated release notes from PR metadata"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "/release 스킬이 PR 제목/라벨/본문에서 릴리스 노트 후보를 만들도록 했습니다. cherry-pick은 이 시점에서는 여전히 수작업이었지만, 노트 생성에서 절반 가량의 시간을 회수했습니다."
              : "The /release skill drafted release notes from PR titles/labels/bodies. Cherry-picking was still manual, but note generation was cut roughly in half."}
          </p>
        </div>

        <div className="rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 dark:border-yellow-700/60 dark:from-yellow-950/30 dark:to-amber-950/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2단계 — 보완: cherry-pick 후보 자동 추출 + 충돌 검증" : "Stage 2 — Refinement: auto cherry-pick selection + conflict checks"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "초안을 운영하는 동안 \"수작업으로 어떤 PR을 골랐는가\"의 패턴이 잡혔습니다. 그 기준을 코드로 옮기고, 후보 추출 후 dry-run cherry-pick으로 충돌 사전 검증까지 통합했습니다. 이 단계에서 v2.1.0 / v2.1.1 핫픽스 / v2.2.0 릴리스를 주도하며 70+ 커밋을 cherry-pick했습니다."
              : "Operating the draft surfaced a pattern of \"which PRs do I actually pick\". I encoded that into selection logic and added a dry-run cherry-pick to detect conflicts early. With this in place I drove v2.1.0 / v2.1.1 hotfix / v2.2.0 — 70+ commits cherry-picked."}
          </p>
        </div>

        <div className="rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 dark:border-yellow-700/60 dark:from-yellow-950/30 dark:to-amber-950/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "3단계 — 통합: Jira 키 자동 추출 → 배포 공지 자동 삽입" : "Stage 3 — Integration: Jira key extraction → deploy announcement"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "PR 본문에서 Jira 키를 정규식으로 추출해 배포 공지에 자동으로 링크하도록 통합했습니다. 작업자가 누락하기 쉽고 추적성에 직결되는 부분을 사람의 주의에서 코드로 옮긴 셈입니다."
              : "Jira keys were parsed from PR bodies and auto-linked into the deploy announcement. The piece most prone to human omission, most tied to traceability, was moved out of attention and into code."}
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 두 작업의 공통 원리" : "4. The common principle"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "신규 입사자 시점은 자산이다. 익숙해지기 전에 보이는 마찰은 자동화 후보다."
              : "A new joiner's view is an asset. Friction visible before habituation is an automation candidate."}
          </li>
          <li>
            {isKo
              ? "큰 변화는 측정 가능한 불변 조건 + 작은 단계로 분할한다. (UI 텍스트 동일성, dry-run 충돌 검증)"
              : "Large changes need a measurable invariant plus small steps. (UI byte identity; dry-run conflict checks.)"}
          </li>
          <li>
            {isKo
              ? "처음부터 완성형 자동화를 만들지 않는다. 초안 → 운영하며 발견한 패턴 → 보완 → 통합."
              : "Don't start with finished automation. Draft → operate → spot the pattern → refine → integrate."}
          </li>
          <li>
            {isKo
              ? "AI 도구는 계층 경계를 보존하는 한에서만 받아들였다 — 동의가 아니라 검증을 거친 채택."
              : "AI suggestions were accepted only when they preserved layer boundaries — adoption via verification, not agreement."}
          </li>
        </ul>
      </section>
    </div>
  );
}
