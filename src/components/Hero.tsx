'use client';

import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  return (
    <Section className="pt-16 pb-20 sm:pt-20 sm:pb-24" id="hero" disableAnimation>
      <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
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
                href={`/${locale}/case-studies`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 dark:border-white/20"
              >
                {t("ctaCases")}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300} duration={800} direction="right" className="hidden sm:block">
          <div className="aspect-square w-full rounded-2xl border bg-gradient-to-br from-zinc-100 to-zinc-50 shadow-sm transition-transform duration-500 hover:scale-[1.02] dark:border-white/10 dark:from-zinc-900 dark:to-black" />
        </ScrollReveal>
      </div>
    </Section>
  );
}
