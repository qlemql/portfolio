import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FEATURED_CASE_STUDIES } from "@/data/caseStudies";
import CaseStudyCard from "@/components/CaseStudyCard";
import type { Locale } from "@/data/resume";

export default async function FeaturedProjects({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <Section id="projects" title={t("title")} className="py-7 sm:py-12">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURED_CASE_STUDIES.map((cs) => (
          <ScrollReveal key={cs.slug} delay={0} direction="up">
            <CaseStudyCard cs={cs} locale={locale} />
          </ScrollReveal>
        ))}
      </ul>

      <ScrollReveal delay={100} direction="up">
        <div className="mt-6 flex justify-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium text-zinc-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md active:scale-95 dark:border-white/20 dark:text-zinc-200"
          >
            {t("viewAll")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </ScrollReveal>
    </Section>
  );
}
