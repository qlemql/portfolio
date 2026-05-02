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
            ? "한 모노레포 안에 공통 / 프론트엔드 / 백엔드 도메인이 섞여 있을 때, AI 협업의 \"컨텍스트 폭발\"은 작업 품질을 떨어뜨립니다. 도메인별로 컨텍스트와 권한을 분리한 계층형 Claude Code 설정 아키텍처를 설계하고, 반복 작업을 Custom Skill·Hook으로, 외부 도메인 진입을 MCP 4종(Jira / Confluence / GitHub / Figma) 통합으로 자동화했습니다. 핵심은 \"AI가 무엇을 알고 있어야 하는가\"를 도메인 경계에 맞춰 명시화한 것입니다."
            : "Inside a monorepo where shared / frontend / backend domains coexist, AI collaboration suffers from \"context explosion\" that drags quality down. I designed a layered Claude Code config architecture that separates context and permissions per domain, automated repetitive workflows with Custom Skills and Hooks, and integrated four MCP servers (Jira / Confluence / GitHub / Figma) for external context. The core idea: make explicit \"what the AI should know\" along domain boundaries."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "1. 문제 정의" : "1. Problem definition"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "단일 거대 컨텍스트로 AI에 모노레포 전체를 던져주면 두 가지가 동시에 일어납니다. (a) 무관한 정보가 추론에 노이즈를 더하고, (b) 권한 경계가 흐려져 \"BE 코드가 FE 결정을 흉내내는\" 형태의 제안이 나옵니다. 결과적으로 AI 출력이 \"그럴듯하지만 계층 경계를 침범하는\" 코드가 됩니다."
            : "Throwing the whole monorepo as a single mega-context to AI does two things at once: (a) irrelevant material adds noise to reasoning, and (b) permission boundaries blur — backend code starts mimicking frontend decisions. The output looks plausible but violates layer boundaries."}
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
              ? "팀 컨벤션, 커밋 규칙, 보안 가드, 어디서나 적용되는 \"이건 절대 하지 말라\" 목록. 모든 하위 계층이 이 컨텍스트를 자동으로 상속받습니다."
              : "Team conventions, commit rules, security guards, and the \"never do this\" list that applies everywhere. All sub-tiers inherit this context automatically."}
          </p>
        </div>

        <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
          <h3 className="mb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isKo ? "프론트엔드(FE) 계층" : "Frontend (FE) tier"}
          </h3>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
            <li>
              {isKo
                ? "허용 도구: 디자인 시스템 토큰, 컴포넌트 라이브러리 인덱스, Figma MCP."
                : "Allowed tools: design-system tokens, component library index, Figma MCP."}
            </li>
            <li>
              {isKo
                ? "금지 작업: 백엔드 스키마 변경 제안, DB 마이그레이션 작성."
                : "Forbidden: proposing backend schema changes or DB migrations."}
            </li>
            <li>
              {isKo
                ? "도메인 컨텍스트: 광고 어드민 도메인 어휘 + UI 패턴 + 접근성 규칙."
                : "Domain context: ad-admin domain vocabulary + UI patterns + accessibility rules."}
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
                ? "허용 도구: API 스펙, DB 스키마, 마이그레이션 가이드."
                : "Allowed tools: API specs, DB schemas, migration guidelines."}
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
            ? "반복 워크플로우를 Skill로 박제하면 두 가지 이득이 있습니다. (1) AI가 매번 \"어떻게 할까\"를 추론하지 않고 검증된 절차를 그대로 따라간다. (2) 절차가 코드로 명시되어 다른 팀원도 동일한 결과를 얻는다."
            : "Locking repetitive workflows into Skills gives two wins: (1) the AI follows a proven procedure instead of re-deriving \"how\" each time, and (2) the procedure is explicit in code, so any teammate gets the same outcome."}
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7">
          <li>
            <strong>/release</strong>{" "}
            {isKo
              ? "스킬: PR 메타데이터 → 릴리스 노트 → cherry-pick 후보 추출 → Jira 자동 링크 (별도 케이스 스터디)."
              : "skill: PR metadata → release notes → cherry-pick candidates → Jira auto-link (separate case study)."}
          </li>
          <li>
            {isKo
              ? "Hook: PR 본문 양식 검증, 컨벤션 위반 자동 알림."
              : "Hooks: validate PR body format, auto-flag convention violations."}
          </li>
          <li>
            {isKo
              ? "도메인 어휘 가드: 새로 추가되는 문자열이 도메인 상수 외 인지 검사."
              : "Domain vocabulary guard: detect new strings that bypass the domain constants."}
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {isKo ? "4. 외부 컨텍스트 — MCP 4종 통합" : "4. External context — 4 MCP integrations"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "코드 안에 답이 없는 질문(\"이 티켓의 의도는?\", \"디자인 의도는?\")은 외부 시스템을 봐야 합니다. MCP 4종을 통합해 도메인 진입 비용을 낮췄습니다."
            : "Questions whose answer isn't in code (\"what's the ticket intent?\", \"what's the design intent?\") need external systems. Integrating 4 MCP servers lowered the cost of entering a domain."}
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-md border bg-white p-3 text-sm dark:border-white/10 dark:bg-zinc-900">
            <strong className="text-zinc-900 dark:text-zinc-100">Jira</strong> ·{" "}
            {isKo ? "이슈 의도 + 우선순위" : "ticket intent + priority"}
          </div>
          <div className="rounded-md border bg-white p-3 text-sm dark:border-white/10 dark:bg-zinc-900">
            <strong className="text-zinc-900 dark:text-zinc-100">Confluence</strong> ·{" "}
            {isKo ? "정책 문서 (멤버십/CRM, 사장님 앱)" : "policy docs"}
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
          {isKo ? "5. 채택 기준 — AI 제안을 어떻게 받아들이는가" : "5. Adoption rule — how AI suggestions get in"}
        </h2>
        <p className="text-sm leading-7">
          {isKo
            ? "AI 제안은 동의가 아니라 검증을 거쳐 채택합니다. 특히 두 가지를 본다."
            : "Suggestions are adopted via verification, not agreement. Two checks in particular:"}
        </p>
        <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
          <li>
            {isKo
              ? "계층 경계 보존: FE 작업이 BE 결정을 흉내내고 있지 않은가? 단순한 코드 수정처럼 보여도 도메인 모델을 침범하면 거절."
              : "Layer-boundary preservation: is the FE change quietly making a BE decision? Even if the diff looks small, it's rejected when the domain model is breached."}
          </li>
          <li>
            {isKo
              ? "실제 마찰 해결 vs 표면 정리: 제안이 실제로 시간이 드는 작업을 줄이는가, 아니면 코드를 \"예뻐 보이게\"만 만드는가."
              : "Real friction vs cosmetic cleanup: does the suggestion remove time-consuming work, or just make code look prettier?"}
          </li>
          <li>
            {isKo
              ? "거절한 제안은 결정 로그에 남깁니다 — 같은 제안이 반복돼도 다시 검토하지 않게."
              : "Rejected suggestions go into a decision log — so the same suggestion doesn't restart the review."}
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
              ? "\"AI를 잘 쓴다\"는 표현은 \"AI에 맡길 영역과 사람이 결정할 영역을 명시화한다\"의 줄임말이다."
              : "\"Using AI well\" really means \"making explicit what AI handles and what stays a human decision\"."}
          </li>
          <li>
            {isKo
              ? "도메인 경계 = 컨텍스트 경계 = 권한 경계. 셋이 서로 어긋나면 AI 협업은 망가진다."
              : "Domain boundary = context boundary = permission boundary. When they diverge, AI collaboration breaks."}
          </li>
          <li>
            {isKo
              ? "외부 시스템 통합(MCP)은 단순 편의가 아니라 \"코드에 없는 의도\"를 가져오는 핵심 인터페이스다."
              : "External integrations (MCP) aren't a convenience — they bring in \"intent not encoded in code\", which is the missing piece."}
          </li>
        </ul>
      </section>
    </div>
  );
}
