'use client';

import Section from "@/components/Section";
import ScrollReveal from "@/components/ScrollReveal";
import { useLocale, useTranslations } from "next-intl";
import { SIDE_PROJECTS, getLinkLabel, type Locale } from "@/data/sideProjects";

export default function SideProjects() {
  const t = useTranslations("sideProjects");
  const locale = useLocale() as Locale;

  return (
    <Section id="side-projects" title={t("title")} className="py-10 sm:py-12">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SIDE_PROJECTS.slice(0, 3).map((p, index) => (
          <ScrollReveal key={p.slug} delay={index * 100} direction="up">
            <li className="h-full rounded-xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
              <div className="flex h-full flex-col space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-500">
                  <time dateTime={p.publishedAt}>{p.publishedAt.slice(0, 7)}</time>
                  <span className="truncate">{p.tags.slice(0, 2).join(" · ")}</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {p.name[locale]}
                </h3>
                <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {p.tagline[locale]}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-2 py-0.5 text-xs text-zinc-600 dark:border-white/15 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-sm">
                  {p.links.map((link) => (
                    <a
                      key={link.type}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-700 underline-offset-4 transition hover:text-accent hover:underline dark:text-zinc-300"
                    >
                      {getLinkLabel(link.type, locale)} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </Section>
  );
}
