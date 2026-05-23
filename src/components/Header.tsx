'use client';

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const otherLocale = locale === "ko" ? "en" : "ko";
  const strippedPath = (pathname ?? "/").replace(/^\/(ko|en)(?=\/|$)/, "") || "/";
  const switchHref = strippedPath === "/" ? `/${otherLocale}` : `/${otherLocale}${strippedPath}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/70 py-3 backdrop-blur-sm print:hidden dark:border-white/10 dark:bg-black/40">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4">
        <Link
          href={`/${locale}`}
          className="whitespace-nowrap text-sm font-semibold tracking-tight"
        >
          {tCommon("siteName")}
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          <li>
            <Link
              href={`/${locale}/resume`}
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              {tNav("resume")}
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/projects`}
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              {tNav("projects")}
            </Link>
          </li>
          <li>
            <ThemeToggle locale={locale === "ko" || locale === "en" ? locale : "ko"} />
          </li>
          <li>
            <Link
              href={switchHref}
              className="rounded-full border px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/20"
              aria-label="Switch language"
              prefetch={false}
              scroll={false}
            >
              {locale === "ko" ? "EN" : "KO"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
