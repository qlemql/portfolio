import type { Locale } from "@/data/resume";

type Props = { locale: Locale };

export default function SocialLoginVisual({ locale }: Props) {
  const isKo = locale === "ko";
  return (
    <div className="flex h-full w-full items-center gap-5">
      <div className="flex flex-1 flex-col gap-2.5">
        <div className="flex items-center gap-3">
          <span className="w-14 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {isKo ? "이메일" : "Email"}
          </span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-800/70">
            <div className="h-full w-[10%] rounded-full bg-zinc-400 dark:bg-zinc-600" />
          </div>
          <span className="w-14 text-right font-mono text-xs text-zinc-500 dark:text-zinc-400">
            0.93%
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-14 text-xs font-medium text-zinc-700 dark:text-zinc-200">
            {isKo ? "소셜" : "Social"}
          </span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-800/70">
            <div className="h-full w-[33%] rounded-full bg-accent" />
          </div>
          <span className="w-14 text-right font-mono text-xs font-bold text-accent">
            3.00%
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] text-zinc-600 dark:text-zinc-400">
          <span>
            <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">75.83%</span>{" "}
            {isKo ? "소셜 비중" : "via social"}
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span>Google · Kakao · Naver</span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span>{isKo ? "8일 출시" : "8 days"}</span>
        </div>
      </div>
      <div className="shrink-0 border-l border-accent/20 pl-5 text-right">
        <div className="text-4xl font-bold leading-none tracking-tight text-accent">
          3.2<span className="text-2xl">×</span>
        </div>
        <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {isKo ? "가입 전환" : "Signup"}
        </div>
      </div>
    </div>
  );
}
