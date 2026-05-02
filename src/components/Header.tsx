'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common");
  const otherLocale = locale === "ko" ? "en" : "ko";
  const strippedPath = (pathname ?? "/").replace(/^\/(ko|en)(?=\/|$)/, "") || "/";
  const switchHref = strippedPath === "/" ? `/${otherLocale}` : `/${otherLocale}${strippedPath}`;
console.log(locale,'locale');
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur-sm transition-all dark:border-white/10 dark:bg-black/40 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="text-sm font-semibold tracking-tight">
          {t("siteName")}
        </Link>
        <ul className="flex items-center gap-2">
          <li>
            <a
              href="mailto:taehyun_fe@naver.com"
              className="rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/20"
              aria-label="이메일 보내기"
            >
              taehyun_fe@naver.com
            </a>
          </li>
          <li>
            <a
              href="tel:010-2713-4729"
              className="rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/20"
              aria-label="전화 걸기"
            >
              010-2713-4729
            </a>
          </li>
          <li>
            <Link
              href={switchHref}
              className="rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/20"
              aria-label="언어 전환"
              prefetch={false}
            >
              {locale === "ko" ? "EN" : "KO"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}


