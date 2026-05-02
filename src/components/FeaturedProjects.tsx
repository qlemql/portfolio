'use client';

import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { CASE_STUDIES } from "@/data/caseStudies";

export default function FeaturedProjects() {
  const t = useTranslations("cases");
  const locale = useLocale();

  return (
    <Section id="cases" title={t("title")} className="py-12 sm:py-16">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CASE_STUDIES.map((cs, index) => (
          <ScrollReveal key={cs.slug} delay={index * 150} direction="up">
            <li className="group h-full overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900">
              <Link href={`/${locale}/case-studies/${cs.slug}`} className="block h-full">
                <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900">
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="space-y-2 p-4">
                  <h3 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {t(cs.titleKey)}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{t(cs.summaryKey)}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-2 py-0.5 text-xs text-zinc-600 transition-colors duration-200 hover:border-zinc-400 hover:text-zinc-900 dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:text-zinc-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-zinc-950 underline-offset-4 transition-all group-hover:gap-2 group-hover:underline dark:text-zinc-50">
                      {t("more")}
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </Section>
  );
}
