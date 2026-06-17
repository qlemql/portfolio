import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function CrossCodebaseVisual({ locale }: Props) {
  const isKo = locale === "ko";
  return (
    <div className="flex h-full w-full flex-col justify-center gap-3">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center rounded-md border border-accent/30 bg-white px-3 py-2 dark:bg-zinc-900">
          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Order</span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Vue3</span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-0.5">
          <div className="flex w-full items-center">
            <div className="h-0.5 flex-1 bg-accent/40" />
            <span aria-hidden="true" className="text-[10px] text-accent">▶</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">postMessage</span>
          <div className="flex w-full items-center">
            <span aria-hidden="true" className="text-[10px] text-accent">◀</span>
            <div className="h-0.5 flex-1 bg-accent/40" />
          </div>
          <span className="font-mono text-[10px] font-semibold text-accent">ACK</span>
        </div>

        <div className="flex flex-col items-center rounded-md border border-accent/30 bg-white px-3 py-2 dark:bg-zinc-900">
          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Display</span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">React</span>
        </div>
      </div>

      <div className="text-center text-[10px] text-zinc-500 dark:text-zinc-400">
        {isKo
          ? "직렬화 경계 정규화 · iframe 노출 전 ACK 핸드셰이크"
          : "Normalized serialization boundary · ACK handshake before reveal"}
      </div>
    </div>
  );
}
