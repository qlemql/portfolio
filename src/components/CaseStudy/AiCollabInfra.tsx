import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function AiCollabInfra({ locale }: Props) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">TL;DR</h2>
        <p className="text-sm leading-7">
          {isKo
            ? "공통·프론트엔드·백엔드 코드가 한 저장소(모노레포)에 섞여 있으면 AI에게 줘야 할 컨텍스트가 한꺼번에 불어나고, 그만큼 작업 품질이 떨어집니다. 도메인별로 컨텍스트와 권한을 나눈 계층형 Claude Code 설정을 만들고, 반복 작업은 자동화 절차(Custom Skill·Hook)로 굳혔으며, 티켓·문서·디자인처럼 코드 밖에 있는 정보는 MCP 연동 4종(Jira, Confluence, GitHub, Figma)으로 끌어왔습니다. 핵심은 AI가 무엇을 알고 있어야 하는지를 도메인 경계에 맞춰 분명히 정해 둔 것입니다."
            : "When shared, frontend, and backend code all live in one repository (a monorepo), the context you have to hand the AI balloons, and quality drops with it. I built a layered Claude Code config that splits context and permissions by domain, hardened repetitive work into automated procedures (Custom Skills and Hooks), and pulled in what lives outside the code — tickets, docs, design — through four MCP integrations (Jira, Confluence, GitHub, Figma). The core of it was deciding, along domain boundaries, what the AI should actually know."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 문제 정의" : "1. Problem definition"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "제가 담당하던 광고 어드민(티오더 태블릿 광고를 관리하는 사내 어드민)을 포함한 팀 모노레포에서 시작한 작업입니다. 모노레포 전체를 하나의 거대한 컨텍스트로 AI에 던지면 두 가지가 같이 일어납니다. 무관한 정보가 추론에 노이즈를 더하고, 권한 경계가 흐려지면서 프론트엔드 작업 중에 백엔드 스키마를 바꾸자고 하는 식의 제안이 나옵니다. 결과적으로 그럴듯해 보이지만 도메인 경계를 침범하는 코드가 나옵니다."
            : "This started in the team monorepo that included the ad admin I worked on (the internal console for managing ads on T-order tablets). Throwing the whole monorepo at the AI as one giant context does two things at once. Irrelevant material adds noise to the reasoning, and permission boundaries blur — you get suggestions like changing a backend schema in the middle of frontend work. The output looks plausible but quietly crosses domain boundaries."}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "2. 설계 — 계층형 Claude Code 설정" : "2. Design — layered Claude Code config"}
        </h2>

        <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-4 dark:bg-zinc-900/60">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "공통(common) 계층" : "Shared (common) tier"}
          </h3>
          <p className="text-sm leading-7">
            {isKo
              ? "팀 컨벤션과 커밋 규칙, 보안 가드, 그리고 어디서나 적용되는 절대 하지 말 것 목록을 둡니다. 모든 하위 계층이 이 컨텍스트를 자동으로 상속받습니다."
              : "Team conventions, commit rules, security guards, and the list of things never to do anywhere. Every sub-tier inherits this context automatically."}
          </p>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "프론트엔드(FE) 계층" : "Frontend (FE) tier"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "허용 컨텍스트·도구: 디자인 시스템 토큰, 컴포넌트 라이브러리 인덱스, Figma MCP."
                : "Allowed context & tools: design-system tokens, component library index, Figma MCP."}
            </li>
            <li>
              {isKo
                ? "금지 작업: 백엔드 스키마 변경 제안, DB 마이그레이션 작성."
                : "Forbidden: proposing backend schema changes or DB migrations."}
            </li>
            <li>
              {isKo
                ? "도메인 컨텍스트: 광고 어드민 도메인 어휘, UI 패턴, 접근성 규칙."
                : "Domain context: ad-admin domain vocabulary, UI patterns, accessibility rules."}
            </li>
          </ul>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "백엔드(BE) 계층" : "Backend (BE) tier"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "허용 컨텍스트·도구: API 스펙, DB 스키마, 마이그레이션 가이드."
                : "Allowed context & tools: API specs, DB schemas, migration guidelines."}
            </li>
            <li>
              {isKo
                ? "금지 작업: 클라이언트 상태 관리 결정, UI 컴포넌트 생성."
                : "Forbidden: client state-management decisions, UI component creation."}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "3. 자동화 — Custom Skill · Hook" : "3. Automation — Custom Skills · Hooks"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "반복되는 워크플로우를 Skill로 고정해 두면 두 가지가 좋아집니다. AI가 매번 어떻게 할지 다시 추론하지 않고 검증된 절차를 그대로 따라가고, 절차가 파일로 남아 버전 관리되니 다른 팀원이 돌려도 같은 결과가 나옵니다."
            : "Fixing a repetitive workflow into a Skill helps in two ways. The AI follows a proven procedure instead of re-deriving how to do it each time, and because the procedure lives in a versioned file, any teammate running it gets the same result."}
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
          <li>
            <strong>{isKo ? "PR 스킬" : "PR skill"}</strong>
            {isKo
              ? ": PR 생성 절차에 lint·build 검증을 내장했습니다. 리뷰어가 \"기본은 됐는지\"를 확인하던 1차 검증 비용을 코드에 위임한 것입니다."
              : ": embeds lint and build checks into the PR-creation procedure itself — delegating to code the first-pass review of \"are the basics done,\" which reviewers used to carry."}
          </li>
          <li>
            <strong>{isKo ? "업무일지 스킬 3종 (daily/weekly/monthly)" : "Work-log skills (daily/weekly/monthly)"}</strong>
            {isKo
              ? ": 커밋·PR·Jira 활동을 일일 업무일지 → 주간정리 → 월간회고로 자동 취합합니다."
              : ": auto-compile commit, PR, and Jira activity into a daily log → weekly digest → monthly retrospective."}
          </li>
          <li>
            <strong>{isKo ? "cleanup-docs 스킬" : "cleanup-docs skill"}</strong>
            {isKo
              ? ": 역할이 끝난 오래된 문서를 찾아 정리해, 문서가 코드와 따로 놀지 않게 합니다."
              : ": finds and clears out documents that have outlived their purpose, so the docs don't drift from the code."}
          </li>
          <li>
            <strong>/release</strong>{" "}
            {isKo
              ? "스킬: PR 메타데이터에서 릴리스 노트를 만들고, cherry-pick 후보를 뽑고, Jira를 자동으로 링크합니다. (별도 케이스 스터디로 다룹니다.)"
              : "skill: builds release notes from PR metadata, selects cherry-pick candidates, auto-links Jira. (Covered in a separate case study.)"}
          </li>
          <li>
            {isKo
              ? "Hook: PR 본문 양식을 검증하고, 컨벤션 위반을 자동으로 알립니다."
              : "Hooks: validate PR body format, auto-flag convention violations."}
          </li>
          <li>
            {isKo
              ? "용어 가드: 코드에 새 문구를 넣을 때 정해 둔 표준 용어(도메인 상수)를 쓰지 않고 하드코딩하면 잡아냅니다."
              : "Terminology guard: catches new strings hardcoded past the established domain constants."}
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 외부 컨텍스트 — MCP 4종 통합" : "4. External context — 4 MCP integrations"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "이 티켓의 의도가 뭔지, 디자인 의도가 뭔지처럼 코드 안에 답이 없는 질문은 외부 시스템을 봐야 합니다. MCP 4종을 통합해 새 업무 영역을 파악하는 데 드는 시간을 줄였습니다."
            : "Questions whose answer isn't in the code, like what a ticket intends or what a design intends, need external systems. Integrating four MCP servers cut the time it takes to ramp up on an unfamiliar domain."}
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-md border bg-white p-3 text-sm dark:border-white/10 dark:bg-zinc-900">
            <strong className="text-zinc-900 dark:text-zinc-100">Jira</strong> ·{" "}
            {isKo ? "이슈 의도 + 우선순위" : "ticket intent + priority"}
          </div>
          <div className="rounded-md border bg-white p-3 text-sm dark:border-white/10 dark:bg-zinc-900">
            <strong className="text-zinc-900 dark:text-zinc-100">Confluence</strong> ·{" "}
            {isKo ? "정책 문서 (신규 프로젝트의 운영 정책)" : "policy docs (operating policies for new projects)"}
          </div>
          <div className="rounded-md border bg-white p-3 text-sm dark:border-white/10 dark:bg-zinc-900">
            <strong className="text-zinc-900 dark:text-zinc-100">GitHub</strong> ·{" "}
            {isKo ? "PR 히스토리 / 코드 검색" : "PR history / code search"}
          </div>
          <div className="rounded-md border bg-white p-3 text-sm dark:border-white/10 dark:bg-zinc-900">
            <strong className="text-zinc-900 dark:text-zinc-100">Figma</strong> ·{" "}
            {isKo ? "디자인 의도 + Code Connect" : "design intent + Code Connect"}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "5. 채택 기준 — AI 제안을 어떻게 받아들이는가" : "5. Adoption rule — how AI suggestions get accepted"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "AI 제안은 그대로 받아들이지 않고 검증을 거쳐 채택합니다. 두 가지 기준으로 거르고, 거른 결과는 기록합니다."
            : "Suggestions never go in as-is; they pass verification first. Two filters, plus a record of what got filtered:"}
        </p>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "계층 경계를 지키는가. 프론트엔드 작업이 은근슬쩍 백엔드 결정을 흉내내고 있지는 않은지 봅니다. diff가 작아 보여도 도메인 모델을 침범하면 거절합니다."
              : "Does it keep layer boundaries? I check whether an FE change is quietly making a BE decision. Even if the diff looks small, I reject it when it breaches the domain model."}
          </li>
          <li>
            {isKo
              ? "실제 마찰을 줄이는가, 아니면 표면만 정리하는가. 시간이 드는 작업을 실제로 줄여 주는지, 코드를 보기 좋게만 만드는지 구분합니다."
              : "Does it remove real friction, or just tidy the surface? I separate suggestions that cut time-consuming work from ones that only make code look nicer."}
          </li>
          <li>
            {isKo
              ? "거절한 제안은 결정 로그에 남깁니다. 같은 제안이 다시 올라와도 처음부터 다시 검토하지 않기 위해서입니다."
              : "Rejected suggestions go into a decision log, so the same one doesn't restart the review next time."}
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "6. 무엇을 배웠나" : "6. What I learned"}
        </h2>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "AI를 잘 쓴다는 건 결국 AI에 맡길 영역과 사람이 결정할 영역을 분명히 정해 둔다는 뜻이었습니다."
              : "Using AI well, in the end, just meant being explicit about what the AI handles and what stays a human decision."}
          </li>
          <li>
            {isKo
              ? "도메인 경계와 컨텍스트 경계, 권한 경계가 서로 맞아떨어져야 합니다. 셋이 어긋나기 시작하면 경계를 침범하는 제안이 다시 늘어났습니다."
              : "The domain boundary, the context boundary, and the permission boundary have to line up. When they diverged, boundary-crossing suggestions crept back in."}
          </li>
          <li>
            {isKo
              ? "MCP 같은 외부 시스템 통합은 단순한 편의가 아니라, 코드에 적혀 있지 않은 의도를 끌어오는 핵심 통로였습니다."
              : "External integrations like MCP weren't a convenience. They were the channel for bringing in intent that the code never captured."}
          </li>
        </ul>
      </section>
    </div>
  );
}
