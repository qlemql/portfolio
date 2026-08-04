import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import SectionMoreLink from "@/components/SectionMoreLink";
import { getTranslations } from "next-intl/server";
import { FEATURED_CASE_STUDIES } from "@/data/caseStudies";
import CaseStudyCard from "@/components/CaseStudyCard";
import type { Locale } from "@/data/resume";

export default async function FeaturedProjects({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <Section id="projects" title={t("title")}>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURED_CASE_STUDIES.map((cs) => (
          <ScrollReveal key={cs.slug} delay={0} direction="up">
            <CaseStudyCard cs={cs} locale={locale} />
          </ScrollReveal>
        ))}
      </ul>

      <ScrollReveal delay={100} direction="up">
        <SectionMoreLink href={`/${locale}/projects`} label={t("viewAll")} />
      </ScrollReveal>
    </Section>
  );
}
