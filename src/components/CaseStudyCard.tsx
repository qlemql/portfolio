import Link from "next/link";
import type { CaseStudyMeta } from "@/data/caseStudies";
import type { Locale } from "@/data/locale";

const VISIBLE_TAGS = 2;

/**
 * 카드는 "클릭할까?" 하나만 돕는 단위다. 판단에 필요한 건 무엇 / 결과 /
 * 기술 성격 3개이고 그 이상은 결정을 늦춘다.
 * 좌측 지표 열이 고정 착지점 역할을 하고, 제목은 대시 앞 주제부만 쓴다
 * (뒤쪽은 지표 열이 이미 말하고 있어 반복이 된다).
 */
export default function CaseStudyCard({ cs, locale }: { cs: CaseStudyMeta; locale: Locale }) {
  const rest = cs.tags.length - VISIBLE_TAGS;

  return (
    <li className="group h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-lg dark:border-white/10 dark:bg-zinc-900">
      <Link
        href={`/${locale}/projects/${cs.slug}`}
        aria-label={cs.title[locale]}
        className="flex h-full gap-4 p-5"
      >
        {/* w-20(80px)은 58→90%·MCP 4종 등이 경계를 넘어 값이 갈렸다. nowrap만 넣고
            폭을 두면 값이 구분선을 침범하므로 폭과 함께 가야 한다. */}
        <div className="w-28 shrink-0 border-r border-black/5 pr-4 dark:border-white/10">
          <div className="whitespace-nowrap text-xl font-bold leading-tight tracking-tight text-accent tabular-nums">
            {cs.headline.value}
          </div>
          {/* 대비 상대가 본문(16px)이 아니라 위의 값(text-xl 20px)이라 14px로 충분히
              갈린다. 13px을 토큰으로 등록하면 스케일이 8단계가 되어 방향이 반대다. */}
          <div className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {cs.headline.label[locale]}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {cs.title[locale].split(" — ")[0]}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {cs.summary[locale]}
          </p>
          <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-zinc-500 dark:text-zinc-400">
            {cs.tags.slice(0, VISIBLE_TAGS).map((tag) => (
              <span key={tag} className="rounded-full border px-2 py-0.5 dark:border-white/15">
                {tag}
              </span>
            ))}
            {rest > 0 ? <span>+{rest}</span> : null}
            <time dateTime={cs.publishedAt} className="ml-auto tabular-nums">
              {cs.publishedAt.slice(0, 7)}
            </time>
          </div>
        </div>
      </Link>
    </li>
  );
}
