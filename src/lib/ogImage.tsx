import { ImageResponse } from "next/og";
import type { Locale } from "@/data/locale";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * OG 이미지 팔레트. 사이트 본문과 축을 하나로 맞춘다(zinc + --accent).
 *
 * 링크 카드는 슬랙 스레드·트위터 타임라인에 한 장씩 뜨는 물건이라, 페이지 종류를
 * 배경색으로 구분해도 보는 사람에게는 비교 대상이 없어 읽히지 않는다. 종류는 이미
 * 내용이 구분한다 — 상세는 케이스 제목 + 태그, 홈·목록은 이름 + 역할. 그래서
 * 배경은 한 벌만 둔다.
 *
 * 라우트별 opengraph-image.tsx는 레이아웃이 서로 다르지만(내용이 다르므로 통합하지
 * 않는다) 색은 반드시 여기서 가져간다. 색을 각자 들고 있으면 한쪽만 고쳐진다.
 */
export const OG_COLORS = {
  background: "linear-gradient(135deg, #fafafa 0%, #e4e4e7 100%)",
  /** 제목. --accent 라이트값과 같은 값이며, 이는 사이트와 동일한 의도다. */
  title: "#18181b",
  /** 본문 */
  body: "#3f3f46",
  /** 본문 보조(요약 등) */
  bodyMuted: "#52525b",
  /** 라벨·서명 */
  muted: "#71717a",
  /** 구분점 */
  divider: "#d4d4d8",
  /** 지표 강조. title과 같은 값이지만 크기·굵기로 위계가 갈린다. */
  accent: "#18181b",
} as const;

type Args = {
  locale: Locale;
  /** 상단 작은 라벨 */
  eyebrow: string;
  title: string;
  description: string;
  /** 하단 강조 항목. 비우면 렌더하지 않는다. */
  highlights?: string[];
};

/**
 * OG 이미지 공통 렌더러.
 * 라우트별 opengraph-image.tsx가 얇게 감싸 쓰도록 분리했다 — 페이지마다
 * 레이아웃을 복사하면 한쪽만 고쳐지고 값이 갈린다.
 */
export function renderOgImage({ locale, eyebrow, title, description, highlights }: Args) {
  const isKo = locale === "ko";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
          background: OG_COLORS.background,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: OG_COLORS.muted, letterSpacing: -0.5 }}>
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            color: OG_COLORS.title,
            marginTop: 12,
            letterSpacing: -2,
            maxWidth: 1000,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: OG_COLORS.body,
            marginTop: 28,
            maxWidth: 940,
            lineHeight: 1.35,
            letterSpacing: -0.5,
          }}
        >
          {description}
        </div>
        {highlights && highlights.length > 0 ? (
          <div
            style={{
              display: "flex",
              gap: 28,
              marginTop: 44,
              fontSize: 24,
              fontWeight: 700,
              color: OG_COLORS.accent,
            }}
          >
            {highlights.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: 28 }}>
                {i > 0 ? <div style={{ display: "flex", color: OG_COLORS.divider }}>·</div> : null}
                <div style={{ display: "flex" }}>{h}</div>
              </div>
            ))}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 22,
            color: OG_COLORS.muted,
            fontWeight: 600,
          }}
        >
          {isKo ? "김태현 · Frontend Engineer" : "Taehyun Kim · Frontend Engineer"}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
