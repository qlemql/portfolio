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
import CrossCodebaseInterface from "@/components/CaseStudy/CrossCodebaseInterface";
import AiStoreWebview from "@/components/CaseStudy/AiStoreWebview";
import DailybookReactQuery from "@/components/CaseStudy/DailybookReactQuery";
import DataDrivenUx from "@/components/CaseStudy/DataDrivenUx";
import FamilycareKidsnote from "@/components/CaseStudy/FamilycareKidsnote";
import MvpSseStreaming from "@/components/CaseStudy/MvpSseStreaming";
import QuoteTimeSimplification from "@/components/CaseStudy/QuoteTimeSimplification";
import SocialLoginConversion from "@/components/CaseStudy/SocialLoginConversion";
import ProjectVisual from "@/components/ProjectVisual";
import { SIDE_PROJECTS, getSideProjectBySlug, getLinkLabel } from "@/data/sideProjects";
import SideProjectDetailBody from "@/components/SideProjectDetailBody";
import type { Locale } from "@/data/resume";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const SUPPORTED: Locale[] = ["ko", "en"];

const CONTENT: Record<string, (props: { locale: Locale }) => React.ReactNode> = {
  "ad-admin-stabilization": AdAdminStabilization,
  "b2c-ota-expansion": B2COtaExpansion,
  "ai-collab-infra": AiCollabInfra,
  "cross-codebase-interface": CrossCodebaseInterface,
  "ai-store-webview": AiStoreWebview,
  "dailybook-react-query": DailybookReactQuery,
  "data-driven-ux": DataDrivenUx,
  "familycare-kidsnote": FamilycareKidsnote,
  "mvp-sse-streaming": MvpSseStreaming,
  "quote-time-simplification": QuoteTimeSimplification,
  "social-login-conversion": SocialLoginConversion,
};

export function generateStaticParams() {
  const slugs = [
    ...CASE_STUDIES.map((cs) => cs.slug),
    ...SIDE_PROJECTS.filter((p) => p.detail).map((p) => p.slug),
  ];
  return slugs.flatMap((slug) => SUPPORTED.map((locale) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!SUPPORTED.includes(rawLocale as Locale)) return {};
  const locale = rawLocale as Locale;
  const cs = getCaseStudyBySlug(slug);
  const sp = cs ? undefined : getSideProjectBySlug(slug);
  if (!cs && !sp) return {};
  const name = cs ? cs.title[locale] : sp!.name[locale];
  const summary = cs ? cs.summary[locale] : sp!.tagline[locale];
  const publishedTime = cs ? cs.publishedAt : sp!.publishedAt;
  const title = `${name} · ${locale === "ko" ? "김태현 프로젝트" : "Taehyun's Project"}`;
  const description = summary;
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
      publishedTime,
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

  const cs = getCaseStudyBySlug(slug);
  const sp = cs ? undefined : getSideProjectBySlug(slug);
  if (!cs && !sp) notFound();
  if (sp && !sp.detail) notFound();

  const title = cs ? cs.title[locale] : sp!.name[locale];
  const summary = cs ? cs.summary[locale] : sp!.tagline[locale];
  const tags = cs ? cs.tags : sp!.tags;
  const Body = cs ? CONTENT[slug] : undefined;
  const tPage = await getTranslations("projectsPage");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-10 sm:py-12">
        <Link
          href={`/${locale}/projects`}
          className="text-sm text-zinc-500 underline-offset-4 hover:underline dark:text-zinc-400"
        >
          ← {tPage("backToList")}
        </Link>

        <div className="mt-10 space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            {title}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">{summary}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-2 py-0.5 text-xs text-zinc-600 dark:border-white/15 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
          {sp && sp.links.length > 0 ? (
            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-sm">
              {sp.links.map((link) => (
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
          ) : null}
        </header>

        {cs ? (
          <ProjectVisual slug={slug} locale={locale} className="h-36 w-full rounded-lg border border-accent/15 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-6 dark:border-accent/20 dark:from-accent/15 dark:via-accent/5 dark:to-transparent" />
        ) : sp && sp.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sp.image}
            alt={title}
            className="mx-auto max-h-[600px] w-auto rounded-lg border border-black/5 dark:border-white/10"
          />
        ) : null}

        {cs ? (
          Body ? (
            <Body locale={locale} />
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              (Content coming soon)
            </p>
          )
        ) : (
          <SideProjectDetailBody detail={sp!.detail!} locale={locale} />
        )}
        </div>
      </main>
      <Footer maxWidth="max-w-2xl" />
    </div>
  );
}
