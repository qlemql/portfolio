import { getLocale } from "next-intl/server";

const EMAIL = "taehyun_fe@naver.com";
const GITHUB = "github.com/qlemql";
const GITHUB_URL = "https://github.com/qlemql";
const LINKEDIN_URL = "https://www.linkedin.com/in/%ED%83%9C%ED%98%84-%EA%B9%80-1465571b8/";

/**
 * 페이지 끝의 연락처 블록. 설득 카피나 응답 시간 약속은 두지 않는다 —
 * 지키지 못할 약속은 다른 디테일의 신뢰까지 깎고, 감성 카피는 국내 채용
 * 맥락에서 과장으로 읽힌다. 해결하려는 문제는 하나뿐이다:
 * 푸터의 이메일이 저작권 표기와 같은 크기·같은 회색이라 찾아야 한다는 것.
 */
export default async function ContactCard() {
  const locale = await getLocale();
  const isKo = locale === "ko";

  return (
    <section
      aria-label={isKo ? "연락처" : "Contact"}
      className="mx-auto max-w-5xl px-4 pt-10 print:hidden sm:pt-16"
    >
      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900 sm:p-7">
        <p className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          {isKo ? "김태현" : "Taehyun Kim"}
        </p>
        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">Frontend Engineer</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-base">
          {/* 이메일만 본문급 크기 + 색 + 밑줄 — 클릭 대상임을 형태로 명시한다.
              break-words는 전역 overflow-wrap을 걷어낸 데 대한 국소 보완이다
              (전역으로 두면 keep-all을 덮어 지표 숫자가 갈린다). 좁은 폭에서
              실제로 넘칠 수 있는 건 이메일·URL뿐이라 여기에만 준다. */}
          <a
            href={`mailto:${EMAIL}`}
            className="break-words font-medium text-accent underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
          >
            {EMAIL}
          </a>
          <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
            ·
          </span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-zinc-600 underline-offset-4 transition hover:text-accent hover:underline dark:text-zinc-300"
          >
            {GITHUB}
          </a>
          <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
            ·
          </span>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-zinc-600 underline-offset-4 transition hover:text-accent hover:underline dark:text-zinc-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
