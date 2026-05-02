import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/data/caseStudies";
import AdAdminStabilization from "@/components/CaseStudy/AdAdminStabilization";
import B2COtaExpansion from "@/components/CaseStudy/B2COtaExpansion";
import type { Locale } from "@/data/resume";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const SUPPORTED: Locale[] = ["ko", "en"];

const CONTENT: Record<string, (props: { locale: Locale }) => React.ReactNode> = {
  "ad-admin-stabilization": AdAdminStabilization,
  "b2c-ota-expansion": B2COtaExpansion,
};

export function generateStaticParams() {
  return CASE_STUDIES.flatMap((cs) =>
    SUPPORTED.map((locale) => ({ locale, slug: cs.slug }))
  );
}

export default async function CaseStudyDetail({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  if (!SUPPORTED.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const meta = getCaseStudyBySlug(slug);
  if (!meta) notFound();

  const Body = CONTENT[slug];
  const tPage = await getTranslations("caseStudiesPage");
  const tCases = await getTranslations("cases");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:py-16">
        <Link
          href={`/${locale}/case-studies`}
          className="text-sm text-zinc-500 underline-offset-4 hover:underline dark:text-zinc-400"
        >
          ← {tPage("backToList")}
        </Link>

        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            {tCases(meta.titleKey)}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">{tCases(meta.summaryKey)}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-2 py-0.5 text-xs text-zinc-600 dark:border-white/15 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {Body ? (
          <Body locale={locale} />
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            (Content coming soon)
          </p>
        )}
      </main>
      <footer className="mx-auto max-w-3xl px-4 py-10 text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} 김태현. All rights reserved.
      </footer>
    </div>
  );
}
