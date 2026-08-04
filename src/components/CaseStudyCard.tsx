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
        aria-label={`${cs.title[locale]} ${locale === "ko" ? "자세히 보기" : "— read more"}`}
        className="flex h-full flex-col gap-3 p-5 lg:flex-row lg:gap-4"
      >
        {/* w-20(80px)은 58→90%·MCP 4종 등이 경계를 넘어 값이 갈렸다. nowrap만 넣고
            폭을 두면 값이 구분선을 침범하므로 폭과 함께 가야 한다.
            단 그 폭은 lg 이상에서만 쓴다 — 320px에서 112px은 카드의 45%라, 본문이
            한 줄에 한글 8자로 눌린다. 좁은 화면에서는 전체 폭을 쓰는 쪽이 "값이
            감싸지지 않는다"는 계약을 더 잘 지킨다(침범할 구분선 자체가 없다).
            sm이 아니라 lg인 이유: ul이 sm:grid-cols-2라 640px에서 카드가 반으로
            접힌다. 같은 지점에서 지표 열까지 돌아오면 본문 열이 126px로 눌려
            320px보다 나빠진다(측정: 640px에서 3–5줄). 측정상 나란히 두기가
            버티는 건 카드 폭 ~426px부터이고, 그리드가 거기 닿는 게 lg다. */}
        <div className="border-b border-black/5 pb-3 dark:border-white/10 lg:w-28 lg:shrink-0 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
          {/* 스택 모드에서는 값·라벨을 한 줄에 둔다 — 열 모드의 위/아래 배치를
              그대로 두면 카드가 두 줄 더 길어져 스택으로 아낀 높이를 되돌린다. */}
          <div className="flex items-baseline gap-2 lg:block">
            <div className="whitespace-nowrap text-xl font-bold leading-tight tracking-tight text-accent tabular-nums">
              {cs.headline.value}
            </div>
            {/* 대비 상대가 본문(16px)이 아니라 위의 값(text-xl 20px)이라 14px로 충분히
                갈린다. 13px을 토큰으로 등록하면 스케일이 8단계가 되어 방향이 반대다. */}
            <div className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 lg:mt-1">
              {cs.headline.label[locale]}
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* 시점이 스캔 경로 안에 있어야 5건이 궤적으로 읽힌다. 푸터 최하위에 두면
              평면이 된다. period가 없으면 publishedAt으로 떨어지되 구분자를 점으로
              맞춰 — 한 열에 2024.11 – 2025.03과 2026-06이 섞이지 않게 한다. */}
          <time
            dateTime={cs.publishedAt}
            className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400"
          >
            {cs.period ?? cs.publishedAt.slice(0, 7).replace("-", ".")}
          </time>
          <h3 className="mt-0.5 text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {cs.title[locale].split(" — ")[0]}
          </h3>
          {/* clamp를 두지 않는다 — 55자 규칙을 지키면 자를 일이 없고, 남겨두면
              다음 사람이 긴 문안을 넣어도 조용히 잘려 규칙이 무너진다. */}
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {cs.oneLiner[locale]}
          </p>
          <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-zinc-500 dark:text-zinc-400">
            {cs.tags.slice(0, VISIBLE_TAGS).map((tag) => (
              <span key={tag} className="rounded-full border px-2 py-0.5 dark:border-white/15">
                {tag}
              </span>
            ))}
            {rest > 0 ? <span>+{rest}</span> : null}
          </div>
        </div>
      </Link>
    </li>
  );
}
