'use client';

import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

// 리아(Ria) B2C OTA에서 주도한 0→1 성과 — 모두 같은 프로젝트 출처
const LEAD_STATS = [
  { value: "3.2×", labelKo: "가입 전환 (0.93→3.0%)", labelEn: "Signup (0.93→3.0%)" },
  { value: "62%", labelKo: "결제 전환 (이중 결제)", labelEn: "Payment (dual)" },
  { value: "−70%", labelKo: "견적 시간 (12→3)", labelEn: "Quote time (12→3)" },
  { value: "−75%", labelKo: "빌드 시간 (4→1분)", labelEn: "Build time (4→1min)" },
] as const;

// 출시·운영 중인 개인 앱 (App Store)
const SHIPPED_APPS = ["morning-briefing", "minimal-habit-tracker"] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isKo = locale === "ko";
  return (
    <Section className="pt-12 pb-14 sm:pt-16 sm:pb-20" id="hero" disableAnimation>
      <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2">
        <div className="space-y-4">
          <ScrollReveal delay={0} duration={600} direction="up">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{t("role")}</p>
          </ScrollReveal>

          <ScrollReveal delay={150} duration={600} direction="up">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
              {t("title")}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={300} duration={600} direction="up">
            <p className="max-w-[58ch] text-base leading-7 text-zinc-600 dark:text-zinc-400">{t("desc")}</p>
          </ScrollReveal>

          <ScrollReveal delay={450} duration={600} direction="up">
            <div className="flex gap-2">
              <Link
                href={`/${locale}/projects`}
                className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg active:scale-95"
              >
                {t("ctaProjects")}
              </Link>
              <Link
                href={`/${locale}/resume`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 dark:border-white/20"
              >
                {t("ctaResume")}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300} duration={800} direction="right">
          <div className="flex flex-col gap-3" aria-label={t("metricsAria")}>
            {/* 기둥 1 — 회사에서 주도한 0→1 */}
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {t("pillars.leadName")}
                </span>
                <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-fg">
                  {t("pillars.leadTag")}
                </span>
                <span className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                  {t("pillars.leadSub")}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3">
                {LEAD_STATS.map((s) => (
                  <div key={s.value} className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-accent tabular-nums">
                      {s.value}
                    </span>
                    <span className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                      {isKo ? s.labelKo : s.labelEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 기둥 2 — 지금 AI로 직접 */}
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {t("pillars.nowName")}
                </span>
                <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-fg">
                  {t("pillars.nowTag")}
                </span>
                <span className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                  {t("pillars.nowSub")}
                </span>
              </div>
              <p className="mt-2.5 whitespace-pre-line text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.rich("pillars.nowBody", {
                  b: (chunks) => <span className="font-bold text-accent">{chunks}</span>,
                })}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {SHIPPED_APPS.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-black/5 px-2 py-0.5 text-[11px] text-zinc-500 dark:border-white/10 dark:text-zinc-400"
                  >
                    ✓ {name}
                  </span>
                ))}
                <span className="rounded-full border border-black/5 px-2 py-0.5 text-[11px] text-zinc-400 dark:border-white/10 dark:text-zinc-500">
                  {t("pillars.moreApps")}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
