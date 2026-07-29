import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/data/locale";

const EMAIL = "taehyun_fe@naver.com";

type Props = {
  locale: Locale;
  /** 현재 페이지와 중복되지 않는 보조 동선을 고른다. */
  secondary: "resume" | "projects";
};

/**
 * 끝까지 스크롤한 사람은 이미 관심을 표현한 상태다. 그 지점에 요청이 없으면
 * 의향이 그냥 사라진다. 푸터 링크는 구조적으로 무시된다(footer blindness).
 */
export default async function ContactCta({ locale, secondary }: Props) {
  const t = await getTranslations({ locale, namespace: "cta" });
  const href = secondary === "resume" ? `/${locale}/resume` : `/${locale}/projects`;

  return (
    <section
      aria-label={t("title")}
      className="mx-auto max-w-5xl px-4 pb-4 pt-10 print:hidden sm:pt-16"
    >
      <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-6 sm:p-8 dark:border-accent/25 dark:from-accent/15">
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-2xl">
          {t("title")}
        </h2>
        <p className="mt-2 max-w-prose text-sm leading-7 text-zinc-600 dark:text-zinc-300">
          {t("body")}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg active:scale-95"
          >
            {t("email")}
          </a>
          <Link
            href={href}
            className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md active:scale-95 dark:border-white/20"
          >
            {t(secondary)}
          </Link>
        </div>
      </div>
    </section>
  );
}
