'use client';

import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useTranslations } from "next-intl";

type ProjectItem = { titleKey: string; summaryKey: string; tags: string[] };

export default function FeaturedProjects() {
  const t = useTranslations("projects");
  const PROJECTS: ProjectItem[] = [
    { titleKey: "p1Title", summaryKey: "p1Summary", tags: ["A/B", "Onboarding", "Analytics"] },
    { titleKey: "p2Title", summaryKey: "p2Summary", tags: ["Payments", "Error Handling", "Form UX"] },
    { titleKey: "p3Title", summaryKey: "p3Summary", tags: ["Perf", "Code Split", "Image"] }
  ];
  return (
    <Section id="projects" title={t("title")} className="py-12 sm:py-16">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PROJECTS.map((p, index) => (
          <ScrollReveal key={p.titleKey} delay={index * 150} direction="up">
            <li className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900">
              <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="space-y-2 p-4">
                <h3 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {t(p.titleKey)}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t(p.summaryKey)}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-2 py-0.5 text-xs text-zinc-600 transition-colors duration-200 hover:border-zinc-400 hover:text-zinc-900 dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:text-zinc-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-medium text-zinc-950 underline-offset-4 transition-all hover:gap-2 hover:underline dark:text-zinc-50"
                  >
                    {t("more")}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </Section>
  );
}


