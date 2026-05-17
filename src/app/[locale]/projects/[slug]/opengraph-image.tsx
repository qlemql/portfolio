import { ImageResponse } from "next/og";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/data/caseStudies";
import type { Locale } from "@/data/resume";

export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata() {
  return CASE_STUDIES.map((cs) => ({
    id: cs.slug,
    alt: cs.slug,
  }));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function Image({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = rawLocale === "ko" ? "ko" : "en";
  const meta = getCaseStudyBySlug(slug);
  if (!meta) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", width: "100%", height: "100%" }} />
      ),
      { ...size }
    );
  }
  const isKo = locale === "ko";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 100px",
          background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, color: "#92400e", fontWeight: 600 }}>
            {isKo ? "프로젝트" : "Project"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              color: "#0f172a",
              marginTop: 16,
              letterSpacing: -1.5,
              maxWidth: 1000,
              lineHeight: 1.2,
            }}
          >
            {meta.title[locale]}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#475569",
              marginTop: 32,
              maxWidth: 1000,
              lineHeight: 1.4,
            }}
          >
            {meta.summary[locale]}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", gap: 16, color: "#1e40af", fontWeight: 600 }}>
            {meta.tags.map((tag, i) => (
              <div key={i} style={{ display: "flex" }}>
                #{tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", color: "#64748b", fontWeight: 600 }}>
            {isKo ? "김태현" : "Taehyun Kim"}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
