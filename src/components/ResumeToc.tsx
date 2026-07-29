import type { Locale } from "@/data/locale";

type Item = { id: string; label: string };

/**
 * 이력서는 처음부터 읽는 문서가 아니라 특정 답을 찾는 문서다
 * ("React 경력? 성과? 리드 경험?"). 목차는 그 탐색 비용을 낮춘다.
 * 인쇄물에서는 클릭할 수 없으므로 제외한다.
 */
export default function ResumeToc({ items, locale }: { items: Item[]; locale: Locale }) {
  return (
    <nav
      aria-label={locale === "ko" ? "이력서 목차" : "Resume contents"}
      className="sticky top-16 z-10 -mx-4 mb-2 border-y border-black/5 bg-zinc-50/90 px-4 py-2 backdrop-blur-sm print:hidden dark:border-white/10 dark:bg-black/80"
    >
      <ul className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="inline-block rounded-full px-2.5 py-1 text-zinc-600 transition hover:bg-black/5 hover:text-accent dark:text-zinc-300 dark:hover:bg-white/10"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
