import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCard from "@/components/ContactCard";

import { setRequestLocale, getTranslations } from "next-intl/server";
import { CASE_STUDIES, HEADLINE_CASE_STUDIES } from "@/data/caseStudies";
import CaseStudyCard from "@/components/CaseStudyCard";
import { SHIPPED_SIDE_PROJECTS, WIP_SIDE_PROJECTS } from "@/data/sideProjects";
import { isLocale, type Locale } from "@/data/locale";


type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const title = `${t("title")} · ${locale === "ko" ? "김태현" : "Taehyun Kim"}`;
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: { ko: "/ko/projects", en: "/en/projects" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/projects`,
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectsIndex({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const tPage = await getTranslations("projectsPage");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:py-12">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            {tPage("title")}
          </h1>
          <p className="max-w-prose text-zinc-600 dark:text-zinc-400">
            {tPage("subtitle")}
          </p>
        </header>

        <section aria-label={tPage("highlights")} className="space-y-3">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {tPage("highlights")}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{tPage("highlightsDesc")}</p>
          </div>
          <ul className="divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/5 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-zinc-900">
            {HEADLINE_CASE_STUDIES.map((cs) => (
              <li key={cs.slug}>
                <Link
                  href={`/${locale}/projects/${cs.slug}`}
                  className="group flex items-baseline gap-3 px-5 py-3 transition hover:bg-accent/5 sm:gap-5"
                >
                  <span className="w-24 shrink-0 text-xl font-bold tracking-tight text-accent tabular-nums sm:w-28 sm:text-2xl">
                    {cs.headline!.value}
                  </span>
                  <span className="shrink-0 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    {cs.headline!.label[locale]}
                  </span>
                  {/* 제목이 이미 같은 숫자를 담고 있어, 대시 앞 주제부만 보여 중복을 피한다. */}
                  <span className="min-w-0 flex-1 truncate text-sm text-zinc-500 dark:text-zinc-400">
                    {cs.title[locale].split(" — ")[0]}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-sm text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-accent dark:text-zinc-500"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {tPage("work")}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CASE_STUDIES.map((cs) => (
            <CaseStudyCard key={cs.slug} cs={cs} locale={locale} />
          ))}
        </ul>
        </section>

        <section id="personal" className="scroll-mt-24 space-y-5">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {tPage("personal")}
          </h2>
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            {tPage("shipped")} {SHIPPED_SIDE_PROJECTS.length}
          </h3>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SHIPPED_SIDE_PROJECTS.map((p) => (            
              <li
                key={p.slug}
                className="group h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900"
              >
                <Link href={`/${locale}/projects/${p.slug}`} className="flex h-full flex-col">
                  {p.image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-black/5 dark:border-white/10">
                      {/* 배경 블러도 같은 src·sizes를 써서 최적화본 하나만 내려받게 한다. */}
                      <Image
                        src={p.image}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="scale-110 object-cover opacity-30 blur-2xl dark:opacity-25"
                      />
                      {/* 바로 아래 h3가 같은 이름을 제공한다. alt를 주면 카드가 제목을 두 번 읽는다. */}
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        placeholder="blur"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col space-y-3 p-5">
                    <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      {p.status === "wip" ? (
                        <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
                          {locale === "ko" ? "개발 중" : "In development"}
                        </span>
                      ) : (
                        <time dateTime={p.publishedAt}>{p.publishedAt.slice(0, 7)}</time>
                      )}
                      <span className="truncate">{p.tags.slice(0, 2).join(" · ")}</span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {p.name[locale]}
                    </h3>
                    <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {p.tagline[locale]}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-1">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border px-2 py-0.5 text-xs text-zinc-600 dark:border-white/15 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* 숨기는 게 아니라 층을 나눈다 — 완성물이 진행 중 항목에 묻히지 않게. */}
          <details className="group mt-6">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-zinc-700 transition hover:border-accent hover:text-accent dark:border-white/15 dark:text-zinc-300">
              {tPage("building")} {WIP_SIDE_PROJECTS.length}
              <span aria-hidden="true" className="transition group-open:rotate-180">▾</span>
            </summary>
            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {WIP_SIDE_PROJECTS.map((p) => (            
              <li
                key={p.slug}
                className="group h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900"
              >
                <Link href={`/${locale}/projects/${p.slug}`} className="flex h-full flex-col">
                  {p.image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-black/5 dark:border-white/10">
                      {/* 배경 블러도 같은 src·sizes를 써서 최적화본 하나만 내려받게 한다. */}
                      <Image
                        src={p.image}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="scale-110 object-cover opacity-30 blur-2xl dark:opacity-25"
                      />
                      {/* 바로 아래 h3가 같은 이름을 제공한다. alt를 주면 카드가 제목을 두 번 읽는다. */}
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        placeholder="blur"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col space-y-3 p-5">
                    <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      {p.status === "wip" ? (
                        <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
                          {locale === "ko" ? "개발 중" : "In development"}
                        </span>
                      ) : (
                        <time dateTime={p.publishedAt}>{p.publishedAt.slice(0, 7)}</time>
                      )}
                      <span className="truncate">{p.tags.slice(0, 2).join(" · ")}</span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {p.name[locale]}
                    </h3>
                    <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                      {p.tagline[locale]}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-1">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border px-2 py-0.5 text-xs text-zinc-600 dark:border-white/15 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
            </ul>
          </details>
        </section>
      </main>
      <ContactCard />
      <Footer />
    </div>
  );
}
