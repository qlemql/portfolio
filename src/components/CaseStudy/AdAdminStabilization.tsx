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
            ? "입사하고 한 달 동안 두 가지 작업을 했습니다. 30개가 넘는 파일에 흩어져 있던 도메인 문자열을 7단계에 걸쳐 상수로 옮겼고, 이 과정에서 회귀는 한 건도 나오지 않았습니다. 동시에 기존 팀이 손대지 않던 릴리스 작업을 /release 워크플로우로 조금씩 자동화했습니다. 두 작업 모두 접근 방식이 같았습니다. 마찰이 있는 지점에서 보이는 패턴을 측정할 수 있는 기준으로 고정한 다음, 한 번에 다 만들지 않고 단계적으로 자동화했습니다."
            : "In my first month I took on two things. I moved scattered domain strings across 30+ files into constants over 7 staged refactors, with zero regressions, and at the same time started automating a release process the team had left untouched, building it up into a /release workflow. I went at both the same way: take the pattern you can see at a friction point, lock it down as something measurable, then automate it in steps rather than all at once."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 컨텍스트" : "1. Context"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "광고 어드민에 합류했을 때 마찰이 두 군데 있었습니다. 하나는 도메인 용어가 30개가 넘는 파일에 직접 박혀 있어서, 라벨 한 줄을 바꾸려 해도 전체를 검색해야 했습니다. 다른 하나는 핫픽스와 릴리스를 cherry-pick으로 일일이 처리하고 있어서, 새로 들어온 사람에게는 진입 장벽이 높았습니다. 둘 다 기존 팀에게는 이미 익숙해져서 잘 보이지 않던 마찰이었습니다."
            : "When I joined, the ad admin had two friction points. Domain terms were hardcoded across 30+ files, so changing a single label meant searching the whole codebase. Releases and hotfixes ran on manual cherry-picks, which made for a high entry bar as a new joiner. Both were the kind of friction the existing team had simply gotten used to."}
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
              ? "도메인 문자열이 컴포넌트와 유틸, API 페이로드에 직접 박혀 있었습니다. 그래서 바꾸는 비용이 컸고, 같은 의미를 다르게 표기한 경우가 쌓이면서 의도하지 않은 분기가 생기고 있었습니다."
              : "Domain strings sat directly inside components, utilities, and API payloads. Changing them was expensive, and over time synonymous variants piled up and created accidental branches in behavior."}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            {isKo ? "핵심 결정 — 화면 텍스트의 바이트 동일성을 기준으로" : "Key decision — keep rendered UI text byte-for-byte identical"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "리팩토링 단계마다 화면에 찍히는 텍스트가 한 글자라도 달라지면 바로 멈춘다는 규칙을 세웠습니다. 의미가 보존됐는지는 사람이 판단해야 하지만, 바이트가 똑같은지는 자동 비교로 확인할 수 있습니다. 덕분에 도메인을 아직 다 모르는 신규 입사자도 안전하게 작업을 진행할 수 있는 가드레일이 됐습니다."
              : "I set a rule: if any rendered character changed during a refactor step, stop right there. Whether the meaning is preserved still needs human judgment, but whether the bytes match can be checked automatically. That gave me a guardrail to refactor safely as a new joiner who didn't yet know the full domain."}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            {isKo ? "단계 분할" : "Step partitioning"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "1단계: 상수 후보를 뽑았습니다. 어디서 쓰이는지, 얼마나 자주 쓰이는지, 표기가 어떻게 갈리는지 확인했습니다."
                : "Step 1: pull out constant candidates, checking where they're used, how often, and how the spelling varies."}
            </li>
            <li>
              {isKo
                ? "2~6단계: 도메인 묶음 단위로 한 번에 하나씩만 옮겼습니다. PR 하나가 건드리는 범위를 좁게 유지했습니다."
                : "Steps 2–6: migrate one domain cluster per PR, keeping the change radius small."}
            </li>
            <li>
              {isKo
                ? "7단계: 그동안 발견한 표기 변형들을 정정해 정합성을 맞췄습니다."
                : "Step 7: reconcile the surface variants found along the way."}
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            {isKo ? "결과" : "Outcome"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>{isKo ? "7단계 내내 텍스트 동일성이 유지돼 회귀가 한 건도 없었습니다." : "Zero regressions across all 7 steps."}</li>
            <li>
              {isKo
                ? "이후로는 라벨을 바꾸는 작업이 파일 한 개 수정으로 끝납니다."
                : "Subsequent label changes now resolve in a single-file edit."}
            </li>
            <li>
              {isKo
                ? "도메인 어휘가 코드에 명시적으로 드러나면서, 신규 입사자가 외부 설명 없이 코드만 보고 도메인을 익힐 수 있게 됐습니다."
                : "The domain vocabulary became explicit in code, readable to new joiners without external context."}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. /release 워크플로우 — 마찰을 단계적으로 자동화" : "3. /release workflow — automating friction in stages"}
        </h2>

        <p className="text-sm leading-7">
          {isKo
            ? "릴리스 작업은 처음엔 절차를 익히는 데서 시작했습니다. 작업을 따라가다 보니 PR 메타데이터, cherry-pick 후보, Jira 키처럼 반복되는 패턴이 보였고, 자동화가 가능하겠다고 판단했습니다. 처음부터 완성형을 만들기보다 초안, 보완, 통합 세 단계로 나눠 발전시켰습니다."
            : "Release work began with learning the procedure. As I walked through it, a clear pattern emerged: PR metadata, cherry-pick candidates, Jira keys. That suggested automation was viable. Rather than ship a finished tool, I developed it in three stages: draft, refinement, integration."}
        </p>

        <div className="rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 dark:border-yellow-700/60 dark:from-yellow-950/30 dark:to-amber-950/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "1단계 — 초안: PR 메타데이터 기반 릴리스 노트 자동 생성" : "Stage 1 — Draft: auto-generated release notes from PR metadata"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "/release 스킬이 PR 제목과 라벨, 본문에서 릴리스 노트 후보를 만들도록 했습니다. cherry-pick은 이 시점까지는 여전히 수작업이었지만, 노트를 만드는 데 드는 시간을 절반 정도 줄였습니다."
              : "The /release skill drafted release notes from PR titles, labels, and bodies. Cherry-picking was still manual at this point, but note generation was cut roughly in half."}
          </p>
        </div>

        <div className="rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 dark:border-yellow-700/60 dark:from-yellow-950/30 dark:to-amber-950/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "2단계 — 보완: cherry-pick 후보 자동 추출 + 충돌 검증" : "Stage 2 — Refinement: auto cherry-pick selection + conflict checks"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "초안을 직접 돌려 보는 동안, 수작업으로 어떤 PR을 골랐는지에 일정한 기준이 있다는 걸 알게 됐습니다. 그 기준을 코드로 옮기고, 후보를 뽑은 다음 dry-run cherry-pick으로 충돌을 미리 확인하는 단계까지 합쳤습니다. 이 단계에서 v2.1.0, v2.1.1 핫픽스, v2.2.0 릴리스를 주도하며 70개가 넘는 커밋을 cherry-pick했습니다."
              : "Running the draft myself, I noticed the PRs I picked by hand followed a consistent rule. I encoded that rule, then added a dry-run cherry-pick to catch conflicts early. With this in place I drove the v2.1.0, v2.1.1 hotfix, and v2.2.0 releases, cherry-picking 70+ commits."}
          </p>
        </div>

        <div className="rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 dark:border-yellow-700/60 dark:from-yellow-950/30 dark:to-amber-950/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "3단계 — 통합: Jira 키 자동 추출 → 배포 공지 자동 삽입" : "Stage 3 — Integration: Jira key extraction → deploy announcement"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "PR 본문에서 Jira 키를 정규식으로 뽑아 배포 공지에 자동으로 링크하도록 했습니다. 사람이 빠뜨리기 쉽고 추적성에 바로 영향을 주는 부분이라, 사람의 주의력에 맡기는 대신 코드가 처리하도록 옮겼습니다."
              : "Jira keys were parsed from PR bodies and auto-linked into the deploy announcement. This is the part most easily missed by a person and most tied to traceability, so I moved it out of human attention and into code."}
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 두 작업에서 얻은 것" : "4. What both tasks taught me"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "신규 입사자의 시선은 그 자체로 자산입니다. 익숙해지기 전에 보이는 마찰이 곧 자동화 후보입니다."
              : "A new joiner's view is an asset in itself. The friction you can see before you get used to it is exactly what's worth automating."}
          </li>
          <li>
            {isKo
              ? "큰 변경은 측정 가능한 기준 하나를 잡고 작은 단계로 쪼개서 진행했습니다. UI 텍스트 동일성, dry-run 충돌 검증이 그 기준이었습니다."
              : "For large changes, I relied on one measurable check and broke the work into small steps. Here that meant UI byte identity and a dry-run conflict test."}
          </li>
          <li>
            {isKo
              ? "자동화를 처음부터 완성형으로 만들려고 하지 않았습니다. 초안을 먼저 돌려 보고, 운영하면서 패턴을 발견하고, 보완한 다음 통합하는 순서로 갔습니다."
              : "I didn't try to build the whole automation up front. I shipped a draft, found the pattern while running it, refined it, then integrated."}
          </li>
          <li>
            {isKo
              ? "AI 도구는 계층 경계를 지키는 선에서만 받아들였습니다. 제안에 그냥 동의하기보다 한 번 검증하고 채택했습니다."
              : "I accepted AI suggestions only when they kept layer boundaries intact, verifying them first instead of just agreeing."}
          </li>
        </ul>
      </section>
    </div>
  );
}
