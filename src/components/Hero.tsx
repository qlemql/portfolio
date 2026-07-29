import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/data/resume";

// Ria 재직 중 만든 성과. 넷을 같은 크기로 나열하면 전부 배경으로 처리되므로
// 가장 강한 하나만 승격하고 나머지는 보조 근거로 내린다.
const LEAD_PRIMARY = {
  value: "3.2×",
  labelKo: "가입 전환",
  labelEn: "Signup conversion",
  detailKo: "0.93% → 3.00% · 소셜 로그인 8일",
  detailEn: "0.93% → 3.00% · three providers in 8 days",
} as const;

const LEAD_SECONDARY = [
  { value: "62%", labelKo: "결제 전환", labelEn: "Payment conversion" },
  { value: "−70%", labelKo: "견적 시간", labelEn: "Quote time" },
  { value: "−75%", labelKo: "빌드 시간", labelEn: "Build time" },
] as const;

// 출시·운영 중인 개인 앱 (App Store)
const SHIPPED_APPS = ["morning-briefing", "minimal-habit-tracker"] as const;

export default async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const isKo = locale === "ko";
  return (
    <Section className="pt-12 pb-10 sm:pt-16 sm:pb-20" id="hero" disableAnimation>
      <div className="space-y-10">
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
            <p className="max-w-[760px] whitespace-pre-line text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {t("desc")}
            </p>
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

        <ScrollReveal delay={200} duration={800} direction="up">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label={t("metricsAria")}>
            {/* 기둥 1 — 회사에서 주도한 0→1 */}
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {t("pillars.leadName")}
                </span>
                <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-fg">
                  {t("pillars.leadTag")}
                </span>
                <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
                  {t("pillars.leadSub")}
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="text-4xl font-bold leading-none tracking-tight text-accent tabular-nums">
                  {LEAD_PRIMARY.value}
                </span>
                <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {isKo ? LEAD_PRIMARY.labelKo : LEAD_PRIMARY.labelEn}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {isKo ? LEAD_PRIMARY.detailKo : LEAD_PRIMARY.detailEn}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-black/5 pt-3 dark:border-white/10">
                {LEAD_SECONDARY.map((s) => (
                  <li key={s.value} className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold tracking-tight text-zinc-700 tabular-nums dark:text-zinc-200">
                      {s.value}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {isKo ? s.labelKo : s.labelEn}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 기둥 2 — 지금 AI로 직접 */}
            <div className="flex flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {t("pillars.nowName")}
                </span>
                <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-fg">
                  {t("pillars.nowTag")}
                </span>
                <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
                  {t("pillars.nowSub")}
                </span>
              </div>
              <p className="mt-2.5 whitespace-pre-line text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.rich("pillars.nowBody", {
                  b: (chunks) => <span className="font-bold text-accent">{chunks}</span>,
                })}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {SHIPPED_APPS.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-black/5 px-2 py-0.5 text-[11px] text-zinc-500 dark:border-white/10 dark:text-zinc-400"
                  >
                    ✓ {name}
                  </span>
                ))}
                <span className="rounded-full border border-black/5 px-2 py-0.5 text-[11px] text-zinc-400 dark:border-white/10 dark:text-zinc-400">
                  {t("pillars.moreApps")}
                </span>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </Section>
  );
}
