import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function B2cOtaVisual({ locale }: Props) {
  const isKo = locale === "ko";
  return (
    <div className="flex h-full w-full items-center gap-5">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="rounded border border-accent/40 bg-white/80 px-2 py-0.5 text-xs font-semibold text-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
            Toss
          </div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-500">
            {isKo ? "국내 결제" : "Domestic"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded border border-accent/40 bg-white/80 px-2 py-0.5 text-xs font-semibold text-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
            Stripe
          </div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-500">
            {isKo ? "해외 결제" : "International"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] text-zinc-600 dark:text-zinc-400">
          <span>
            <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">+23%</span>{" "}
            {isKo ? "지도 진입" : "Maps entry"}
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span>Datadog RUM</span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span>{isKo ? "5개월" : "5 mo"}</span>
        </div>
      </div>
      <div className="shrink-0 border-l border-accent/20 pl-5 text-right">
        <div className="text-4xl font-bold leading-none tracking-tight text-accent">62%</div>
        <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "결제 전환" : "Checkout"}
        </div>
      </div>
    </div>
  );
}
