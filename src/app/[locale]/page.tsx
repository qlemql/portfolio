import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Achievements from "@/components/Achievements";
import FeaturedProjects from "@/components/FeaturedProjects";
import Skills from "@/components/Skills";
import About from "@/components/About";

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


