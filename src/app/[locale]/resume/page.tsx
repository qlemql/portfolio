import Header from "@/components/Header";
import ResumeExperience from "@/components/ResumeExperience";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { EDUCATION, EXPERIENCES, SIDE_PROJECTS, SUMMARY, type Locale } from "@/data/resume";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const SUPPORTED: Locale[] = ["ko", "en"];

export default async function ResumePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!SUPPORTED.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("resumePage");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="mx-auto max-w-4xl space-y-12 px-4 py-12 sm:py-16">
        <header className="space-y-3 border-b-4 border-blue-600 pb-6 text-center dark:border-blue-400">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            김태현
          </h1>
          <p className="text-base font-semibold text-zinc-500 dark:text-zinc-400">
            Frontend Engineer
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <a
              href="mailto:taehyun_fe@naver.com"
              className="hover:text-blue-700 dark:hover:text-blue-300"
            >
              <span className="text-blue-600 dark:text-blue-400" aria-hidden="true">✉</span>{" "}
              taehyun_fe@naver.com
            </a>
            <a
              href="tel:010-2713-4729"
              className="hover:text-blue-700 dark:hover:text-blue-300"
            >
              <span className="text-blue-600 dark:text-blue-400" aria-hidden="true">☎</span>{" "}
              010-2713-4729
            </a>
          </div>
        </header>

        <section aria-label={t("summaryTitle")} className="space-y-3">
          <h2 className="border-b-2 border-zinc-200 pb-2 text-xl font-bold text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
            {locale === "ko" ? "👨‍💻 " : "👨‍💻 "}{t("summaryTitle")}
          </h2>
          <p className="rounded-lg border-l-4 border-blue-600 bg-gradient-to-br from-sky-50 to-cyan-50 p-4 text-sm leading-relaxed text-zinc-700 dark:border-blue-400 dark:from-sky-950/30 dark:to-cyan-950/30 dark:text-zinc-300">
            {SUMMARY[locale]}
          </p>
        </section>

        <section aria-label={t("experienceTitle")} className="space-y-4">
          <h2 className="border-b-2 border-zinc-200 pb-2 text-xl font-bold text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
            💼 {t("experienceTitle")}
          </h2>
          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <ResumeExperience key={i} locale={locale} item={exp} />
            ))}
          </div>
        </section>

        <section aria-label="Side Projects" className="space-y-3">
          <h2 className="border-b-2 border-zinc-200 pb-2 text-xl font-bold text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
            🚀 Side Projects
          </h2>
          <div className="space-y-3">
            {SIDE_PROJECTS.map((p, i) => (
              <div
                key={i}
                className="rounded-lg border-l-4 border-blue-600 bg-zinc-50 p-4 dark:border-blue-400 dark:bg-zinc-900"
              >
                <h3 className="mb-2 text-sm font-bold text-blue-800 dark:text-blue-300">
                  {p.name[locale]}
                </h3>
                <ul className="ml-5 list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {p.bullets[locale].map((line, j) => (
                    <li key={j}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-label={t("educationTitle")} className="space-y-3">
          <h2 className="border-b-2 border-zinc-200 pb-2 text-xl font-bold text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
            🎓 {t("educationTitle")}
          </h2>
          <div className="space-y-2">
            {EDUCATION.map((e, i) => (
              <div
                key={i}
                className="rounded-lg border-l-4 border-zinc-400 bg-zinc-50 px-4 py-3 dark:border-zinc-600 dark:bg-zinc-900"
              >
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
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
      <footer className="mx-auto max-w-4xl px-4 py-10 text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} 김태현. All rights reserved.
      </footer>
    </div>
  );
}
