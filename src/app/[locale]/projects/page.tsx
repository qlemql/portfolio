import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CASE_STUDIES } from "@/data/caseStudies";
import { SIDE_PROJECTS } from "@/data/sideProjects";
import type { Locale } from "@/data/resume";

const SUPPORTED: Locale[] = ["ko", "en"];

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const title = `${t("title")} · 김태현`;
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
  if (!SUPPORTED.includes(rawLocale as Locale)) notFound();
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

        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {tPage("work")}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CASE_STUDIES.map((cs) => (
            <li
              key={cs.slug}
              className="group h-full overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900"
            >
              <Link href={`/${locale}/projects/${cs.slug}`} className="block h-full p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-500">
                    <time dateTime={cs.publishedAt}>{cs.publishedAt}</time>
                    <span>·</span>
                    <span className="truncate">{cs.tags.slice(0, 2).join(" · ")}</span>
                  </div>
                  <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {cs.title[locale]}
                  </h2>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {cs.summary[locale]}
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
        </section>

        <section id="personal" className="scroll-mt-24 space-y-5">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {tPage("personal")}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SIDE_PROJECTS.map((p) => (
              <li
                key={p.slug}
                className="group h-full overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900"
              >
                <Link href={`/${locale}/projects/${p.slug}`} className="flex h-full flex-col">
                  {p.image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-black/5 dark:border-white/10">
                      <div
                        aria-hidden
                        className="absolute inset-0 scale-110 bg-cover bg-center opacity-30 blur-2xl dark:opacity-25"
                        style={{ backgroundImage: `url('${p.image}')` }}
                      />
                      <Image
                        src={p.image}
                        alt={p.name[locale]}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col space-y-3 p-5">
                    <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-500">
                      {p.status === "wip" ? (
                        <span className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent">
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
