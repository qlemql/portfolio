import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

const STRATEGIES = ["Quote", "Confirm", "Missing", "Error", "Progress"];

export default function MvpSseVisual({ locale }: Props) {
  const isKo = locale === "ko";
  return (
    <div className="flex h-full w-full items-center gap-5">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="rounded border border-accent/40 bg-white/80 px-2 py-0.5 text-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
            POST
          </span>
          <span className="text-accent" aria-hidden="true">
            →
          </span>
          <span className="rounded border border-accent/40 bg-white/80 px-2 py-0.5 font-semibold text-accent dark:bg-zinc-900/80">
            SSE stream
          </span>
        </div>
        <div className="text-accent" aria-hidden="true">
          ↓
        </div>
        <div className="flex flex-wrap gap-1">
          {STRATEGIES.map((s) => (
            <span
              key={s}
              className="rounded-full border border-accent/30 px-2 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-300"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="shrink-0 border-l border-accent/20 pl-5 text-right">
        <div className="text-4xl font-bold leading-none tracking-tight text-accent">5+</div>
        <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "Strategy" : "Strategies"}
        </div>
      </div>
    </div>
  );
}
