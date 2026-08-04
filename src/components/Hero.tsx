import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/data/resume";
import { getCaseStudyBySlug } from "@/data/caseStudies";

// 지표는 caseStudies의 headline에서 파생한다. 같은 숫자를 여러 파일이 각각
// 들고 있으면 언제든 어긋나고, 어긋난 문서는 어느 쪽이 최신인지 의심을 만든다.
const PRIMARY_SLUG = "social-login-conversion";
const SECONDARY_SLUGS = ["b2c-ota-expansion", "quote-time-simplification"];

// 케이스 스터디가 없는 지표만 여기서 관리한다(Ria 이력서 bullet이 원본).
const BUILD_TIME = { value: "−75%", labelKo: "빌드 시간", labelEn: "Build time" };

const PRIMARY_DETAIL = {
  ko: "0.93% → 3.00% · 소셜 로그인 8일",
  en: "0.93% → 3.00% · three providers in 8 days",
};

// 출시·운영 중인 개인 앱 (App Store)
const SHIPPED_APPS = ["morning-briefing", "minimal-habit-tracker"] as const;

export default async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const isKo = locale === "ko";

  const primary = getCaseStudyBySlug(PRIMARY_SLUG)!;
  const secondary = [
    ...SECONDARY_SLUGS.map((slug) => {
      const cs = getCaseStudyBySlug(slug)!;
      return { value: cs.headline.value[locale], label: cs.headline.label[locale] };
    }),
    { value: BUILD_TIME.value, label: isKo ? BUILD_TIME.labelKo : BUILD_TIME.labelEn },
  ];
  return (
    <Section className="pt-12 pb-10 sm:pt-16 sm:pb-20" id="hero" disableAnimation>
      <div className="space-y-10">
        <div className="space-y-4">
          <ScrollReveal delay={0} duration={400} direction="up">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{t("role")}</p>
          </ScrollReveal>

          <ScrollReveal delay={80} duration={400} direction="up">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
              {t("title")}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160} duration={400} direction="up">
            <p className="max-w-[760px] whitespace-pre-line text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {t("desc")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240} duration={400} direction="up">
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

        <ScrollReveal delay={320} duration={400} direction="up">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label={t("metricsAria")}>
            {/* 기둥 1 — 회사에서 주도한 0→1 */}
            <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {t("pillars.leadName")}
                </span>
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                  {t("pillars.leadTag")}
                </span>
                <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
                  {t("pillars.leadSub")}
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="whitespace-nowrap text-4xl font-bold leading-none tracking-tight text-accent tabular-nums">
                  {primary.headline.value[locale]}
                </span>
                <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {primary.headline.label[locale]}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {PRIMARY_DETAIL[locale]}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-black/5 pt-3 dark:border-white/10">
                {secondary.map((m) => (
                  <li key={m.value + m.label} className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold tracking-tight text-zinc-700 tabular-nums dark:text-zinc-200">
                      {m.value}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{m.label}</span>
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
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
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
                    className="rounded-full border border-black/5 px-2 py-0.5 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400"
                  >
                    ✓ {name}
                  </span>
                ))}
                <span className="rounded-full border border-black/5 px-2 py-0.5 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
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
