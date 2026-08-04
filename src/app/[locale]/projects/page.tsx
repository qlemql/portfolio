import type { Metadata } from "next";
import Link from "next/link";
import SideProjectCard from "@/components/SideProjectCard";
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
                {/* 카드와 같은 문제 — 값·라벨이 고정 폭이라 320px에서 제목 슬롯이
                    49px(한글 3자)로 눌려 아무것도 못 읽는다. 좁은 화면에서는
                    제목을 다음 줄로 흘려 전체 폭을 준다(flex-wrap + basis-full). */}
                <Link
                  href={`/${locale}/projects/${cs.slug}`}
                  aria-label={`${cs.title[locale]} ${locale === "ko" ? "자세히 보기" : "— read more"}`}
                  className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 px-5 py-3 transition hover:bg-accent/5 sm:flex-nowrap sm:gap-x-5"
                >
                  <span className="w-24 shrink-0 whitespace-nowrap text-xl font-bold tracking-tight text-accent tabular-nums sm:w-28 sm:text-2xl">
                    {cs.headline!.value}
                  </span>
                  <span className="shrink-0 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    {cs.headline!.label[locale]}
                  </span>
                  {/* 제목이 이미 같은 숫자를 담고 있어, 대시 앞 주제부만 보여 중복을 피한다.
                      좁은 화면에서는 줄바꿈을 허용한다 — 자기 줄을 다 쓰므로 자를 이유가 없다. */}
                  <span className="min-w-0 basis-full text-sm text-zinc-500 dark:text-zinc-400 sm:flex-1 sm:basis-auto sm:truncate">
                    {cs.title[locale].split(" — ")[0]}
                  </span>
                  {/* 제목이 자기 줄을 다 쓰므로 좁은 화면에서 화살표는 홀로 3번째 줄에
                      남는다. 장식(aria-hidden)이라 지우는 편이 맞다. */}
                  <span
                    aria-hidden="true"
                    className="hidden shrink-0 text-sm text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-accent dark:text-zinc-500 sm:inline"
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
          {/* 이미지 없는 항목이 섞여 있어 stretch를 끄지 않으면, 짧은 카드가 옆
              카드 높이까지 늘어나고 mt-auto 태그 줄만 바닥에 남아 큰 공백이 생긴다. */}
          <ul className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
            {SHIPPED_SIDE_PROJECTS.map((p) => (            
              <SideProjectCard key={p.slug} p={p} locale={locale} showImage />
            ))}
          </ul>

          {/* 숨기는 게 아니라 층을 나눈다 — 완성물이 진행 중 항목에 묻히지 않게. */}
          <details className="group mt-6">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-zinc-700 transition hover:border-accent hover:text-accent dark:border-white/15 dark:text-zinc-300">
              {tPage("building")} {WIP_SIDE_PROJECTS.length}
              <span aria-hidden="true" className="transition group-open:rotate-180">▾</span>
            </summary>
            {/* 위와 같은 이유 — 이 묶음에도 이미지 없는 항목이 있다. */}
            <ul className="mt-4 grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
              {WIP_SIDE_PROJECTS.map((p) => (            
              <SideProjectCard key={p.slug} p={p} locale={locale} showImage />
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
