'use client';

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const otherLocale = locale === "ko" ? "en" : "ko";
  const strippedPath = (pathname ?? "/").replace(/^\/(ko|en)(?=\/|$)/, "") || "/";
  const switchHref = strippedPath === "/" ? `/${otherLocale}` : `/${otherLocale}${strippedPath}`;

  // 현재 위치를 색 + 밑줄 두 채널로 표시한다. 색만 쓰면 색각 이상에서 구분되지 않는다.
  const items = [
    { href: `/${locale}/resume`, label: tNav("resume"), match: "/resume" },
    { href: `/${locale}/projects`, label: tNav("projects"), match: "/projects" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/70 py-3 backdrop-blur-sm print:hidden dark:border-white/10 dark:bg-black/40">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4">
        <Link
          href={`/${locale}`}
          className="whitespace-nowrap text-sm font-semibold tracking-tight"
        >
          {locale === "ko" ? "김태현" : "Taehyun Kim"}
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {items.map((item) => {
            const active = strippedPath.startsWith(item.match);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-sm transition ${
                    active
                      ? "font-semibold text-accent underline decoration-accent decoration-2 underline-offset-8"
                      : "font-medium text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* 언어·테마는 내비게이션이 아니라 유틸리티라 구분선 뒤로 묶는다. */}
          <li aria-hidden="true" className="mx-1 h-4 w-px bg-black/10 dark:bg-white/15" />
          <li>
            <Link
              href={switchHref}
              className="rounded-full px-2.5 py-2 text-sm font-medium text-zinc-600 transition hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
              aria-label={locale === "ko" ? "Switch to English" : "한국어로 전환"}
              prefetch={false}
              scroll={false}
            >
              {locale === "ko" ? "EN" : "KO"}
            </Link>
          </li>
          <li>
            <ThemeToggle locale={locale === "ko" || locale === "en" ? locale : "ko"} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
