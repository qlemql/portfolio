import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Achievements from "@/components/Achievements";
import FeaturedProjects from "@/components/FeaturedProjects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const title = tCommon("siteName");
  const description = tHero("desc");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ko: "/ko", en: "/en" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="space-y-8">
        <Hero />
        <Achievements />
        <FeaturedProjects />
        <Skills />
        <About />
      </main>
      <footer className="mx-auto max-w-5xl px-4 py-10 text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} 김태현. All rights reserved.
      </footer>
    </div>
  );
}


