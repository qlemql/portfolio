import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

const MCP_LIST = ["Jira", "Confluence", "GitHub", "Figma"];

export default function AiCollabVisual({ locale }: Props) {
  const isKo = locale === "ko";
  return (
    <div className="flex h-full w-full items-center gap-5">
      <div className="flex w-32 shrink-0 flex-col items-center gap-1">
        <div className="w-full rounded-md border border-accent/50 bg-white/80 px-2 py-1 text-center text-xs font-semibold text-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
          common
        </div>
        <div className="text-[11px] leading-none text-accent" aria-hidden="true">
          ↓
        </div>
        <div className="grid w-full grid-cols-2 gap-1">
          <div className="rounded border border-accent/30 bg-white/60 px-2 py-1 text-center text-xs font-medium text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
            FE
          </div>
          <div className="rounded border border-accent/30 bg-white/60 px-2 py-1 text-center text-xs font-medium text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
            BE
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "MCP 4종" : "MCP × 4"}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {MCP_LIST.map((mcp) => (
            <span
              key={mcp}
              className="rounded-md border border-accent/30 bg-white/60 px-2 py-0.5 text-center text-[11px] font-medium text-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
            >
              {mcp}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
          <span className="font-mono text-accent">/release</span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span>{isKo ? "Hooks · Skills" : "Hooks · Skills"}</span>
        </div>
      </div>
    </div>
  );
}
