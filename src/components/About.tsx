'use client';

import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");
  const languages = t.raw("languages") as string[];
  const interests = t.raw("interests") as string[];

  return (
    <Section id="about" title={t("title")} className="py-10 sm:py-12">
      <ScrollReveal delay={100} direction="up">
        <p className="max-w-prose leading-7 text-zinc-600 dark:text-zinc-400 lg:max-w-none">
          {t.rich("desc", {
            n: () => <br />,
            m: () => (
              <>
                <br className="lg:hidden" />
                <span className="hidden lg:inline"> </span>
              </>
            ),
          })}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={200} direction="up">
        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-3">
          <dt className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t("languagesLabel")}
          </dt>
          <dd className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border px-2.5 py-0.5 text-sm text-zinc-700 dark:border-white/15 dark:text-zinc-300"
              >
                {lang}
              </span>
            ))}
          </dd>

          <dt className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {t("interestsLabel")}
          </dt>
          <dd className="flex flex-wrap gap-2">
            {interests.map((item) => (
              <span
                key={item}
                className="rounded-full border px-2.5 py-0.5 text-sm text-zinc-700 dark:border-white/15 dark:text-zinc-300"
              >
                {item}
              </span>
            ))}
          </dd>
        </dl>
      </ScrollReveal>
    </Section>
  );
}
