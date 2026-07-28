import type { Metadata } from "next";
import Header from "@/components/Header";
import ResumeExperience from "@/components/ResumeExperience";
import PrintButton from "@/components/PrintButton";
import Footer from "@/components/Footer";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EDUCATION, EXPERIENCES, SUMMARY } from "@/data/resume";
import { isLocale, type Locale } from "@/data/locale";
import { FEATURED_SIDE_PROJECTS, getLinkLabel } from "@/data/sideProjects";
import { SKILLS, skillLabel } from "@/data/skills";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "resumePage" });
  const title = `${t("title")} · ${locale === "ko" ? "김태현" : "Taehyun Kim"}`;
  const description = t("summaryDesc");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/resume`,
      languages: { ko: "/ko/resume", en: "/en/resume" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/resume`,
      type: "profile",
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ResumePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("resumePage");
  const tSkills = await getTranslations("skills");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:py-12 print:py-0">
        <div className="flex justify-end print:hidden">
          <PrintButton />
        </div>

        <header className="break-inside-avoid space-y-3 border-b border-zinc-300 pb-6 dark:border-zinc-700">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                {locale === "ko" ? "김태현" : "Taehyun Kim"}
              </h1>
              <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Frontend Engineer
              </p>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <a
                href="mailto:taehyun_fe@naver.com"
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                taehyun_fe@naver.com
              </a>
              {/* 번호는 globals.css의 인쇄 전용 규칙이 채운다 — HTML 소스에는 남기지 않음 */}
              <span
                aria-hidden="true"
                className="hidden text-zinc-300 print:inline dark:text-zinc-700"
              >
                ·
              </span>
              <span className="print-only-phone hidden print:inline" />
              <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
              <a
                href="https://github.com/qlemql"
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                github.com/qlemql
              </a>
            </div>
          </div>
        </header>

        <section aria-label={t("summaryTitle")} className="space-y-3">
          <h2 className="border-b border-zinc-200 pb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            {t("summaryTitle")}
          </h2>
          <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
            {SUMMARY[locale]}
          </p>
        </section>

        <section aria-label={t("skillsTitle")} className="break-inside-avoid space-y-3">
          <h2 className="border-b border-zinc-200 pb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            {t("skillsTitle")}
          </h2>
          <ul className="space-y-1.5">
            {SKILLS.map((s) => (
              <li key={s.groupKey} className="flex flex-wrap gap-2 text-sm">
                <span className="min-w-[10ch] font-semibold text-zinc-700 dark:text-zinc-300">
                  {tSkills(s.groupKey)}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {s.items.map((i) => skillLabel(i, locale)).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label={t("experienceTitle")} className="space-y-4">
          <h2 className="border-b border-zinc-200 pb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            {t("experienceTitle")}
          </h2>
          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <ResumeExperience key={i} locale={locale} item={exp} />
            ))}
          </div>
        </section>

        <section aria-label="Side Projects" className="space-y-3">
          <h2 className="border-b border-zinc-200 pb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            Side Projects
          </h2>
          <div className="space-y-3">
            {FEATURED_SIDE_PROJECTS.map((p, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30"
              >
                <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {p.name[locale]}
                </h3>
                {/* featured 기준이 "링크로 검증 가능"이므로 출력에도 링크가 보여야 한다. 인쇄물에서는 URL 자체를 노출. */}
                {p.links.length > 0 ? (
                  <p className="mb-2 flex flex-wrap gap-x-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {p.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="underline">
                        {getLinkLabel(l.type, locale)}
                        <span className="hidden print:inline"> ({l.url})</span>
                      </a>
                    ))}
                  </p>
                ) : null}
                <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  {/* "스택:" 줄은 바로 위 Skills 섹션과 중복이라 이력서에서는 제외 (카드에서는 유지) */}
                  {p.bullets[locale]
                    .filter((line) => !/^(스택|Stack)\s*:/.test(line))
                    .map((line, j) => (
                      <li key={j}>{line}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-label={t("educationTitle")} className="break-inside-avoid space-y-3">
          <h2 className="border-b border-zinc-200 pb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            {t("educationTitle")}
          </h2>
          <div className="space-y-2">
            {EDUCATION.map((e, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 py-2 last:border-b-0 dark:border-zinc-800"
              >
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {e.title[locale]}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {e.detail[locale]}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer maxWidth="max-w-3xl" />
    </div>
  );
}
