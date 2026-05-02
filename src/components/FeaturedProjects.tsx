'use client';

import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { CASE_STUDIES } from "@/data/caseStudies";

export default function FeaturedProjects() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const isKo = locale === "ko";

  return (
    <Section id="projects" title={t("title")} className="py-10 sm:py-12">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CASE_STUDIES.map((cs, index) => (
          <ScrollReveal key={cs.slug} delay={index * 150} direction="up">
            <li className="group h-full overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg dark:border-white/10 dark:bg-zinc-900">
              <Link href={`/${locale}/projects/${cs.slug}`} className="block h-full p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-500">
                    <time dateTime={cs.publishedAt}>{cs.publishedAt}</time>
                    <span>·</span>
                    <span className="truncate">
                      {cs.tags.slice(0, 2).join(" · ")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {t(cs.titleKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t(cs.summaryKey)}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-2 py-0.5 text-xs text-zinc-600 dark:border-white/15 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 underline-offset-4 transition-all group-hover:gap-2 group-hover:text-accent group-hover:underline dark:text-zinc-300">
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
