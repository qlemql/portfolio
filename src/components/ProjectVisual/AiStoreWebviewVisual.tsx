import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

const LAYERS = ["API Layer", "Domain Types", "TanStack Query", "MSW Mocking", "react-router"];

export default function AiStoreWebviewVisual({ locale }: Props) {
  const isKo = locale === "ko";
  return (
    <div className="flex h-full w-full items-center gap-5">
      <div className="shrink-0 text-right">
        <div className="text-3xl font-bold leading-none tracking-tight text-accent">0→1</div>
        <div className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "신규 구축" : "Built new"}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 border-l border-accent/20 pl-5">
        {LAYERS.map((layer) => (
          <div key={layer} className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="font-mono text-[11px] text-zinc-700 dark:text-zinc-300">{layer}</span>
          </div>
        ))}
        <span className="pt-1 text-[10px] text-zinc-500 dark:text-zinc-400">
          {isKo ? "core-service 단일 host · session-id 위임" : "single core-service host · session-id"}
        </span>
      </div>
    </div>
  );
}
