import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/data/caseStudies";
import AdAdminStabilization from "@/components/CaseStudy/AdAdminStabilization";
import B2COtaExpansion from "@/components/CaseStudy/B2COtaExpansion";
import AiCollabInfra from "@/components/CaseStudy/AiCollabInfra";
import DailybookReactQuery from "@/components/CaseStudy/DailybookReactQuery";
import SocialLoginConversion from "@/components/CaseStudy/SocialLoginConversion";
import type { Locale } from "@/data/resume";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const SUPPORTED: Locale[] = ["ko", "en"];

const CONTENT: Record<string, (props: { locale: Locale }) => React.ReactNode> = {
  "ad-admin-stabilization": AdAdminStabilization,
  "b2c-ota-expansion": B2COtaExpansion,
  "ai-collab-infra": AiCollabInfra,
  "dailybook-react-query": DailybookReactQuery,
  "social-login-conversion": SocialLoginConversion,
};

export function generateStaticParams() {
  return CASE_STUDIES.flatMap((cs) =>
    SUPPORTED.map((locale) => ({ locale, slug: cs.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED.includes(locale as Locale)) return {};
  const meta = getCaseStudyBySlug(slug);
  if (!meta) return {};
  const t = await getTranslations({ locale, namespace: "projects" });
  const title = `${t(meta.titleKey)} · ${locale === "ko" ? "김태현 프로젝트" : "Taehyun's Project"}`;
  const description = t(meta.summaryKey);
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        ko: `/ko/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/projects/${slug}`,
      type: "article",
      publishedTime: meta.publishedAt,
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  if (!SUPPORTED.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const meta = getCaseStudyBySlug(slug);
  if (!meta) notFound();

  const Body = CONTENT[slug];
  const tPage = await getTranslations("projectsPage");
  const tProjects = await getTranslations("projects");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:py-16">
        <Link
          href={`/${locale}/projects`}
          className="text-sm text-zinc-500 underline-offset-4 hover:underline dark:text-zinc-400"
        >
          ← {tPage("backToList")}
        </Link>

        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            {tProjects(meta.titleKey)}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">{tProjects(meta.summaryKey)}</p>
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
      <Footer maxWidth="max-w-3xl" />
    </div>
  );
}
