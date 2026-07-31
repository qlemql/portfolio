import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import { getTranslations } from "next-intl/server";
import { SKILLS, skillLabel } from "@/data/skills";
import type { Locale } from "@/data/resume";

export default async function Skills({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "skills" });
  return (
    <Section id="skills" title={t("title")}>
      {/* 래퍼는 그리드 아이템이라 stretch되지만 카드가 콘텐츠 높이에 머물면
          태그 개수만큼 블록 높이가 달라진다. ScrollReveal → 카드로 h-full 체인을 잇는다. */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SKILLS.map((s, index) => (
          <ScrollReveal key={s.groupKey} delay={index * 100} direction="up" className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t(s.groupKey)}
              </div>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => {
                  const label = skillLabel(item, locale);
                  return (
                    <span
                      key={label}
                      className="rounded-full border px-2 py-0.5 text-xs text-zinc-600 dark:border-white/15 dark:text-zinc-300"
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
