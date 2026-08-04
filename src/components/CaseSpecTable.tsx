import { Fragment } from "react";
import type { CaseSpec } from "@/data/caseStudies";
import type { Locale } from "@/data/locale";

/**
 * 상세를 끝까지 읽지 않는 독자를 위한 사실 표. 산문에 흩어진 값을 모으는 것이
 * 목적이므로, 본문에 근거가 없는 값은 넣지 않는다. 행이 없으면 표 자체를 렌더하지 않는다.
 */
export default function CaseSpecTable({ spec, locale }: { spec?: CaseSpec; locale: Locale }) {
  if (!spec) return null;

  const isKo = locale === "ko";
  const rows = [
    spec.period && { label: isKo ? "기간" : "Period", value: spec.period, nums: true },
    spec.role && { label: isKo ? "역할" : "Role", value: spec.role[locale] },
    spec.stack?.length ? { label: isKo ? "스택" : "Stack", value: spec.stack.join(" · ") } : null,
    spec.team && { label: isKo ? "팀" : "Team", value: spec.team[locale] },
    spec.status && { label: isKo ? "배포" : "Status", value: spec.status[locale] },
    spec.metric && { label: isKo ? "지표" : "Metric", value: spec.metric[locale] },
  ].filter((r): r is { label: string; value: string; nums?: boolean } => Boolean(r));

  if (rows.length === 0) return null;

  return (
    // print:hidden을 붙이지 않는다 — 인쇄본에서 사실 표가 특히 유용하다.
    // break-inside-avoid로 페이지 경계에서 쪼개지는 것만 막는다.
    <dl className="mt-10 grid break-inside-avoid grid-cols-[5rem_1fr] gap-x-4 gap-y-2.5 rounded-2xl border border-black/5 bg-zinc-50/60 p-5 text-sm dark:border-white/10 dark:bg-white/[0.03]">
      {rows.map((r) => (
        <Fragment key={r.label}>
          <dt className="text-zinc-500 dark:text-zinc-400">{r.label}</dt>
          <dd
            className={`leading-relaxed text-zinc-800 dark:text-zinc-200${r.nums ? " tabular-nums" : ""}`}
          >
            {r.value}
          </dd>
        </Fragment>
      ))}
    </dl>
  );
}
