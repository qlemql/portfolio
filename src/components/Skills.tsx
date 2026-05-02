'use client';

import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";
import { SKILLS } from "@/data/skills";

export default function Skills() {
  const t = useTranslations("skills");
  return (
    <Section id="skills" title={t("title")} className="py-10 sm:py-12">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SKILLS.map((s, index) => (
          <ScrollReveal key={s.groupKey} delay={index * 100} direction="up">
            <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900">
              <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t(s.groupKey)}
              </div>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border px-2 py-0.5 text-xs text-zinc-600 transition-all duration-200 hover:scale-105 hover:border-zinc-400 hover:text-zinc-900 dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:text-zinc-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
