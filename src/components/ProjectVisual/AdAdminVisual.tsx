import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function AdAdminVisual({ locale }: Props) {
  const isKo = locale === "ko";
  return (
    <div className="flex h-full w-full items-center gap-5">
      <div className="flex flex-1 flex-col gap-2">
        <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "7단계 리팩토링" : "7-step refactor"}
        </div>
        <div className="flex items-center">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-1 items-center">
              <div className="h-3 w-3 shrink-0 rounded-full bg-accent ring-2 ring-accent/20" />
              {i < 6 && <div className="h-0.5 flex-1 bg-accent/30" />}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 text-[11px] text-zinc-600 dark:text-zinc-400">
          <span>
            <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">30+</span>{" "}
            {isKo ? "파일" : "files"}
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span>
            <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">70+</span>{" "}
            cherry-pick
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span className="font-mono text-accent">/release</span>
        </div>
      </div>
      <div className="shrink-0 border-l border-accent/20 pl-5 text-right">
        <div className="text-4xl font-bold leading-none tracking-tight text-accent">0</div>
        <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "회귀" : "Regressions"}
        </div>
      </div>
    </div>
  );
}
