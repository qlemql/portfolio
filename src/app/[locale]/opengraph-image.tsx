import { ImageResponse } from "next/og";

export const alt = "Taehyun Kim — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale } = await params;
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
          Frontend Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            color: "#0f172a",
            marginTop: 12,
            letterSpacing: -2,
          }}
        >
          {isKo ? "김태현" : "Taehyun Kim"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#334155",
            marginTop: 28,
            maxWidth: 920,
            lineHeight: 1.3,
            letterSpacing: -0.5,
          }}
        >
          {isKo
            ? "패턴을 찾아 자동화하고, 결과를 데이터로 증명합니다"
            : "Find patterns, automate them, prove outcomes with data"}
        </div>
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
          <div style={{ display: "flex" }}>{isKo ? "가입 전환 3.2×" : "Signup 3.2×"}</div>
          <div style={{ display: "flex", color: "#cbd5e1" }}>·</div>
          <div style={{ display: "flex" }}>{isKo ? "결제 전환 62%" : "Payment 62%"}</div>
          <div style={{ display: "flex", color: "#cbd5e1" }}>·</div>
          <div style={{ display: "flex" }}>{isKo ? "회귀 0건 리팩토링" : "Zero-regression refactor"}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
