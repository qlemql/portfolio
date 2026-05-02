'use client';

import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const HERO_METRICS = [
  { value: "3.2×", labelKo: "가입 전환", labelEn: "Signup", subKo: "0.93% → 3.00%", subEn: "0.93% → 3.00%" },
  { value: "62%", labelKo: "결제 전환", labelEn: "Payment", subKo: "토스 + Stripe 이중", subEn: "Toss + Stripe dual" },
  { value: "−70%", labelKo: "견적 시간", labelEn: "Quote time", subKo: "12 필드 → 3 카테고리", subEn: "12 fields → 3 categories" },
  { value: "−75%", labelKo: "빌드 시간", labelEn: "Build time", subKo: "4분 → 1분", subEn: "4min → 1min" },
] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const tAch = useTranslations("achievements");
  const locale = useLocale();
  const isKo = locale === "ko";
  return (
    <Section className="pt-16 pb-20 sm:pt-20 sm:pb-24" id="hero" disableAnimation>
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
            <p className="max-w-prose text-zinc-600 dark:text-zinc-400">{t("desc")}</p>
          </ScrollReveal>

          <ScrollReveal delay={450} duration={600} direction="up">
            <div className="flex gap-2">
              <Link
                href={`/${locale}/resume`}
                className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-lg active:scale-95 dark:bg-zinc-50 dark:text-black"
              >
                {t("ctaResume")}
              </Link>
              <Link
                href={`/${locale}/projects`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 dark:border-white/20"
              >
                {t("ctaProjects")}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300} duration={800} direction="right">
          <div className="grid grid-cols-2 gap-3" aria-label={tAch("title")}>
            {HERO_METRICS.map((m, i) => (
              <div
                key={i}
                className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900"
              >
                <div className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {m.value}
                </div>
                <div className="mt-1 text-xs font-medium text-zinc-700 dark:text-zinc-200">
                  {isKo ? m.labelKo : m.labelEn}
                </div>
                <div className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-500">
                  {isKo ? m.subKo : m.subEn}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
