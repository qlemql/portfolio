'use client';

import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";

type AchievementItem = { labelKey: string; value: string };

export default function Achievements() {
  const t = useTranslations("achievements");
  const items: AchievementItem[] = [
    { labelKey: "signup", value: "3.2×" },
    { labelKey: "payment", value: "62%+" },
    { labelKey: "order", value: "−70%" },
    { labelKey: "bundle", value: "−45%" }
  ];
  return (
    <Section id="achievements" title={t("title")} className="py-12 sm:py-16">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item, index) => (
          <ScrollReveal key={item.labelKey} delay={index * 100} direction="up">
            <li className="group rounded-xl border border-black/5 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900">
              <div className="text-2xl font-bold tracking-tight text-zinc-950 transition-transform duration-300 group-hover:scale-105 dark:text-zinc-50">
                {item.value}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {t(item.labelKey)}
              </div>
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </Section>
  );
}


