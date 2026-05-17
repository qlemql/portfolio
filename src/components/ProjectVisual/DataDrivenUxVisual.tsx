import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

const ROWS = [
  { ko: "견적 확인", en: "Quote", from: "58%", to: "90%" },
  { ko: "결제 전환", en: "Payment", from: "0%", to: "50%" },
  { ko: "비회원", en: "Guest", from: "53%", to: "62%" },
];

export default function DataDrivenUxVisual({ locale }: Props) {
  const isKo = locale === "ko";
  return (
    <div className="flex h-full w-full items-center gap-5">
      <div className="flex flex-1 flex-col justify-center gap-1.5">
        {ROWS.map((r) => (
          <div key={r.en} className="flex items-center gap-2">
            <span className="w-16 text-xs font-medium text-zinc-600 dark:text-zinc-300">
              {isKo ? r.ko : r.en}
            </span>
            <span className="w-10 text-right font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {r.from}
            </span>
            <span className="text-accent" aria-hidden="true">
              →
            </span>
            <span className="w-10 font-mono text-xs font-bold text-accent">{r.to}</span>
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-[11px] text-zinc-600 dark:text-zinc-400">
          <span className="font-mono text-accent">GA4</span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span className="font-mono text-accent">Clarity</span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span className="font-mono text-accent">Datadog</span>
        </div>
      </div>
      <div className="shrink-0 border-l border-accent/20 pl-5 text-right">
        <div className="text-3xl font-bold leading-none tracking-tight text-accent">
          {isKo ? "매일" : "Daily"}
        </div>
        <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "실험 사이클" : "Cadence"}
        </div>
      </div>
    </div>
  );
}
