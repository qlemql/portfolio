import Link from "next/link";
import { getAdjacentCaseStudies } from "@/data/caseStudies";
import type { Locale } from "@/data/locale";

/**
 * 깊게 읽은 사람의 다음 행동은 둘이다 — 다른 사례 더 보기, 연락하기.
 * 전자가 더 자연스러운데 연락처 블록만 있으면 헤더로 되돌아가야 한다.
 */
export default function CaseStudyNav({ slug, locale }: { slug: string; locale: Locale }) {
  const { prev, next } = getAdjacentCaseStudies(slug);
  if (!prev && !next) return null;
  const isKo = locale === "ko";

  return (
    <nav
      aria-label={isKo ? "다른 사례" : "More case studies"}
      className="mt-12 grid grid-cols-1 gap-3 border-t border-black/5 pt-8 print:hidden sm:grid-cols-2 dark:border-white/10"
    >
      {prev ? (
        <Link
          href={`/${locale}/projects/${prev.slug}`}
          className="group rounded-2xl border border-black/5 p-4 transition hover:border-accent dark:border-white/10"
        >
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            ← {isKo ? "이전 사례" : "Previous"}
          </span>
          <span className="mt-1 block text-sm font-semibold text-zinc-900 transition group-hover:text-accent dark:text-zinc-100">
            {prev.title[locale].split(" — ")[0]}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={`/${locale}/projects/${next.slug}`}
          className="group rounded-2xl border border-black/5 p-4 text-right transition hover:border-accent dark:border-white/10"
        >
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {isKo ? "다음 사례" : "Next"} →
          </span>
          <span className="mt-1 block text-sm font-semibold text-zinc-900 transition group-hover:text-accent dark:text-zinc-100">
            {next.title[locale].split(" — ")[0]}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
