'use client';

import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");
  return (
    <Section id="about" title={t("title")} className="py-10 sm:py-12">
      <ScrollReveal delay={100} direction="up">
        <p className="max-w-prose text-zinc-600 dark:text-zinc-400">{t("desc")}</p>
      </ScrollReveal>
    </Section>
  );
}


