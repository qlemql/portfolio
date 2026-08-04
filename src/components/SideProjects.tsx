import SectionMoreLink from "@/components/SectionMoreLink";
import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import { getTranslations } from "next-intl/server";
import SideProjectCard from "@/components/SideProjectCard";
import { FEATURED_SIDE_PROJECTS, type Locale } from "@/data/sideProjects";

export default async function SideProjects({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "sideProjects" });

  return (
    <Section id="side-projects" title={t("title")}>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURED_SIDE_PROJECTS.map((p, index) => (
          <ScrollReveal key={p.slug} delay={index * 100} direction="up">
            <SideProjectCard p={p} locale={locale} fillRow />
          </ScrollReveal>
        ))}
      </ul>
      <SectionMoreLink href={`/${locale}/projects#personal`} label={t("viewAll")} />
    </Section>
  );
}
