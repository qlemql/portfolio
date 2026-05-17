import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function QuoteTimeVisual({ locale }: Props) {
  const isKo = locale === "ko";
  return (
    <div className="flex h-full w-full items-center gap-5">
      <div className="flex flex-1 items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-1.5">
          <div className="grid grid-cols-4 gap-0.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 w-1.5 rounded-sm bg-zinc-400/70 dark:bg-zinc-600/70"
              />
            ))}
          </div>
          <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-500">
            12 {isKo ? "필드" : "fields"}
          </div>
        </div>
        <div className="text-accent" aria-hidden="true">
          →
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex flex-col gap-0.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-2 w-10 rounded-sm bg-accent" />
            ))}
          </div>
          <div className="font-mono text-[10px] font-semibold text-accent">
            3 {isKo ? "카테고리" : "categories"}
          </div>
        </div>
      </div>
      <div className="shrink-0 border-l border-accent/20 pl-5 text-right">
        <div className="text-4xl font-bold leading-none tracking-tight text-accent">
          −70<span className="text-2xl">%</span>
        </div>
        <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "견적 시간" : "Quote time"}
        </div>
      </div>
    </div>
  );
}
