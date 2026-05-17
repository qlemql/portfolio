import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

const ROWS = [
  { ko: "API 호출", en: "API calls", pct: 70 },
  { ko: "개발 시간", en: "Dev time", pct: 40 },
  { ko: "번들 크기", en: "Bundle", pct: 17 },
];

export default function DailybookVisual({ locale }: Props) {
  const isKo = locale === "ko";
  return (
    <div className="flex h-full w-full items-center gap-5">
      <div className="flex flex-1 flex-col justify-center gap-2">
        {ROWS.map((r) => (
          <div key={r.en} className="flex items-center gap-3">
            <span className="w-16 text-xs font-medium text-zinc-600 dark:text-zinc-300">
              {isKo ? r.ko : r.en}
            </span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-800/70">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${r.pct}%` }}
              />
            </div>
            <span className="w-12 text-right font-mono text-xs font-bold text-accent">
              −{r.pct}%
            </span>
          </div>
        ))}
      </div>
      <div className="shrink-0 border-l border-accent/20 pl-5">
        <div className="font-mono text-sm text-zinc-500 line-through dark:text-zinc-500">
          1.78<span className="text-xs">MB</span>
        </div>
        <div className="font-mono text-2xl font-bold leading-tight tracking-tight text-accent">
          1.47<span className="text-base">MB</span>
        </div>
        <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "Saga → Query" : "Saga → Query"}
        </div>
      </div>
    </div>
  );
}
