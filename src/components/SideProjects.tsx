import Link from "next/link";
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
      <div className="mt-6 flex justify-center">
        <Link
          href={`/${locale}/projects#personal`}
          className="inline-flex items-center gap-1 rounded-full border border-black/10 px-4 py-2 text-sm text-zinc-700 transition hover:border-accent hover:text-accent dark:border-white/15 dark:text-zinc-300"
        >
          {locale === "ko" ? "더보기" : "See all"} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
