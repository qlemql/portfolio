import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CASE_STUDIES } from "@/data/caseStudies";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudiesPage" });
  const title = `${t("title")} · 김태현`;
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/case-studies`,
      languages: { ko: "/ko/case-studies", en: "/en/case-studies" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/case-studies`,
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudiesIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tPage = await getTranslations("caseStudiesPage");
  const tCases = await getTranslations("cases");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:py-16">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            {tPage("title")}
          </h1>
          <p className="max-w-prose text-zinc-600 dark:text-zinc-400">
            {tPage("subtitle")}
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CASE_STUDIES.map((cs) => (
            <li
              key={cs.slug}
              className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900"
            >
              <Link href={`/${locale}/case-studies/${cs.slug}`} className="block">
                <div className="aspect-[16/9] w-full bg-gradient-to-br from-zinc-100 to-zinc-50 transition-transform duration-500 group-hover:scale-[1.02] dark:from-zinc-800 dark:to-zinc-900" />
                <div className="space-y-2 p-4">
                  <h2 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {tCases(cs.titleKey)}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {tCases(cs.summaryKey)}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {cs.tags.map((tag) => (
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
      </main>
      <Footer />
    </div>
  );
}
