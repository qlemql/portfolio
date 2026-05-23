import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import SideProjects from "@/components/SideProjects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Footer from "@/components/Footer";
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
        <About />
        <FeaturedProjects />
        <SideProjects />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}


