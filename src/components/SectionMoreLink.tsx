import Link from "next/link";

/**
 * 섹션 푸터의 "더보기" 링크. 두 섹션이 각자 마크업을 들고 있어 공백 하나뿐 아니라
 * 문구(See more / See all)·테두리·호버까지 조금씩 갈려 있었다. 같은 역할이면 같은
 * 컴포넌트를 쓴다 — 마크업이 두 벌이면 언제든 다시 갈린다.
 * 화살표 앞 간격은 리터럴 공백이 아니라 gap-1이 만든다. 공백 문자는 지웠는지
 * 눈으로 확인할 수 없어 바로 이 어긋남을 만든 원인이다.
 */
export default function SectionMoreLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-6 flex justify-center">
      <Link
        href={href}
        className="inline-flex items-center gap-1 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-zinc-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md active:scale-95 dark:border-white/20 dark:text-zinc-200"
      >
        {label}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
