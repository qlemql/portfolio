import Image from "next/image";
import Link from "next/link";
import type { SideProject } from "@/data/sideProjects";
import type { Locale } from "@/data/locale";

const VISIBLE_TAGS = 2;

/**
 * 케이스 카드와 같은 슬롯 계약을 쓴다 — 날짜(제목 위) · 제목 · 한 줄 요약 · 태그 푸터.
 * 지표 열은 없다: 사이드 프로젝트는 검증된 수치가 없고, 빈 열을 만들면 채우려고
 * 값을 지어내게 된다.
 * 카드 전체가 상세 링크다. GitHub·App Store 같은 외부 링크는 상세 페이지가 맡는다 —
 * 카드 안에 목적지가 둘 이상 있으면 "클릭할까?" 하나를 돕는다는 카드의 역할이 흐려진다.
 */
export default function SideProjectCard({
  p,
  locale,
  showImage = false,
  fillRow = false,
}: {
  p: SideProject;
  locale: Locale;
  showImage?: boolean;
  /**
   * 행 높이를 채울지. 홈처럼 모든 카드의 구성이 같을 때만 켠다 — 높이가 맞아
   * 태그 줄이 나란히 선다. 이미지가 있는 카드와 없는 카드가 섞이는 목록에서
   * 켜면 짧은 카드가 옆 카드 높이까지 늘어나고 mt-auto 태그 줄만 바닥에 남는다.
   * (홈은 ScrollReveal이 감싸서 그리드 아이템이 li가 아니라 그 래퍼다. 그래서
   *  stretch가 li까지 내려오지 않고, 이 h-full이 실제로 일을 한다.)
   */
  fillRow?: boolean;
}) {
  const isKo = locale === "ko";
  const rest = p.tags.length - VISIBLE_TAGS;

  return (
    <li className={`group overflow-hidden rounded-2xl${fillRow ? " h-full" : ""} border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-lg dark:border-white/10 dark:bg-zinc-900`}>
      <Link
        href={`/${locale}/projects/${p.slug}`}
        aria-label={`${p.name[locale]} ${isKo ? "자세히 보기" : "— read more"}`}
        className="flex h-full flex-col"
      >
        {showImage && p.image ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-black/5 dark:border-white/10">
            {/* 배경 블러도 같은 src·sizes를 써서 최적화본 하나만 내려받게 한다. */}
            <Image
              src={p.image}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="scale-110 object-cover opacity-30 blur-2xl dark:opacity-25"
            />
            {/* 아래 h3가 같은 이름을 제공한다. alt를 주면 카드가 제목을 두 번 읽는다. */}
            <Image
              src={p.image}
              alt=""
              fill
              placeholder="blur"
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
            />
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col p-5">
          {/* 케이스 카드와 같은 자리·같은 크기. 진행 중 배지는 날짜를 밀어내지 않고
              같은 줄에 붙는다 — 슬롯이 하나 늘면 두 카드의 기준선이 어긋난다. */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <time dateTime={p.publishedAt} className="tabular-nums">
              {p.publishedAt.slice(0, 7).replace("-", ".")}
            </time>
            {p.status === "wip" ? (
              <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
                {isKo ? "개발 중" : "In development"}
              </span>
            ) : null}
          </div>
          {/* 케이스 카드는 대시 앞 주제부만 쓰지만 그 이유는 뒤쪽이 지표 열과 겹쳐서다.
              여기엔 지표 열이 없고 뒤쪽("일일 AI 브리핑")이 실제 정보라 전체를 쓴다. */}
          <h3 className="mt-0.5 text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {p.name[locale]}
          </h3>
          {/* 케이스 카드와 같은 이유로 clamp를 두지 않는다 — 48자 규칙을 지키면
              자를 일이 없고, 남겨두면 긴 문안이 조용히 잘려 규칙이 무너진다. */}
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {p.oneLiner[locale]}
          </p>
          <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-zinc-500 dark:text-zinc-400">
            {p.tags.slice(0, VISIBLE_TAGS).map((tag) => (
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
