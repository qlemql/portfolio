import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function FamilycareVisual({ locale }: Props) {
  const isKo = locale === "ko";
  return (
    <div className="flex h-full w-full items-center gap-5">
      <div className="flex flex-1 items-center gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="rounded border border-accent/40 bg-white/80 px-2 py-0.5 text-xs font-semibold text-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
            KidsNote
          </div>
          <div className="rounded border border-accent/40 bg-white/80 px-2 py-0.5 text-xs font-semibold text-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
            Lighthouse
          </div>
        </div>
        <div className="flex flex-col items-center text-accent" aria-hidden="true">
          <span className="text-[10px] leading-none">↘</span>
          <span className="text-[10px] leading-none">↗</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="rounded-md border border-accent/50 bg-white/80 px-2 py-1 text-xs font-semibold text-accent dark:bg-zinc-900/80">
            {isKo ? "공통 코드" : "Shared codebase"}
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-zinc-600 dark:text-zinc-400">
            <span>
              <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">−90%</span>{" "}
              {isKo ? "타입" : "types"}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>
              <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">−30%</span> CI
            </span>
          </div>
        </div>
      </div>
      <div className="shrink-0 border-l border-accent/20 pl-5 text-right">
        <div className="text-4xl font-bold leading-none tracking-tight text-accent">
          −50<span className="text-2xl">%</span>
        </div>
        <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "온보딩" : "Onboarding"}
        </div>
      </div>
    </div>
  );
}
