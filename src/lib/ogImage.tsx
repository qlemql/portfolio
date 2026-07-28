import { ImageResponse } from "next/og";
import type { Locale } from "@/data/locale";

export const OG_SIZE = { width: 1200, height: 630 };

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
          background: "linear-gradient(135deg, #fafafa 0%, #e0f2fe 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#64748b", letterSpacing: -0.5 }}>
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            color: "#0f172a",
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
            color: "#334155",
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
              color: "#1e40af",
            }}
          >
            {highlights.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: 28 }}>
                {i > 0 ? <div style={{ display: "flex", color: "#cbd5e1" }}>·</div> : null}
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
            color: "#64748b",
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
