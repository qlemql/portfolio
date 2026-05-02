import type { Metadata } from "next";
import Header from "@/components/Header";
import ResumeExperience from "@/components/ResumeExperience";
import PrintButton from "@/components/PrintButton";
import Footer from "@/components/Footer";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EDUCATION, EXPERIENCES, SUMMARY, type Locale } from "@/data/resume";
import { SIDE_PROJECTS } from "@/data/sideProjects";
import { SKILLS } from "@/data/skills";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const SUPPORTED: Locale[] = ["ko", "en"];

const HIGHLIGHT_METRICS: { value: string; ko: string; en: string }[] = [
  { value: "3.2×", ko: "가입 전환 (Riad)", en: "Signup conv. (Riad)" },
  { value: "62%", ko: "결제 전환 (Riad)", en: "Payment conv. (Riad)" },
  { value: "−70%", ko: "견적 시간 (Riad)", en: "Quote time (Riad)" },
  { value: "−75%", ko: "빌드 시간 (Riad)", en: "Build time (Riad)" },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "resumePage" });
  const title = `${t("title")} · 김태현`;
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
  if (!SUPPORTED.includes(rawLocale as Locale)) notFound();
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
                김태현
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
              <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
              <a
                href="tel:010-2713-4729"
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                010-2713-4729
              </a>
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

        <section
          aria-label={locale === "ko" ? "핵심 메트릭" : "Highlight metrics"}
          className="break-inside-avoid grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {HIGHLIGHT_METRICS.map((m) => (
            <div
              key={m.value}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {m.value}
              </div>
              <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                {locale === "ko" ? m.ko : m.en}
              </div>
            </div>
          ))}
        </section>

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
                  {s.items.join(" · ")}
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
            {SIDE_PROJECTS.map((p, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30"
              >
                <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {p.name[locale]}
                </h3>
                <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  {p.bullets[locale].map((line, j) => (
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
