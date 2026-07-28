'use client';

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

// not-found 경계는 Next가 모든 페이지 payload에 인라인한다. 문자열을 하드코딩하면
// 한쪽 언어가 반대 로케일 페이지에도 실려 나가므로 반드시 메시지에서 읽어야 한다.
export default function LocaleNotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 font-sans dark:bg-black">
      <main className="space-y-4 text-center">
        <p className="text-sm font-semibold text-accent">404</p>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
          {t("title")}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">{t("desc")}</p>
        <Link
          href={`/${locale}`}
          className="inline-block rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition hover:bg-accent-hover"
        >
          {t("home")}
        </Link>
      </main>
    </div>
  );
}
