import { ImageResponse } from "next/og";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/data/caseStudies";
import { SIDE_PROJECTS, getSideProjectBySlug } from "@/data/sideProjects";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/data/resume";
import { OG_COLORS } from "@/lib/ogImage";

// 레이아웃은 renderOgImage와 다르다(상세는 제목 + 태그, 홈·목록은 이름 + 역할).
// 내용이 다르므로 통합하지 않되, 색은 OG_COLORS에서만 가져온다 — 각자 들고 있으면
// 한쪽만 고쳐져 링크 카드가 페이지 종류마다 다른 팔레트로 나간다.

export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// generateImageMetadata를 두면 슬러그와 무관하게 케이스 스터디 전부가 id로 잡혀
// 페이지마다 og:image가 11개씩 생성된다. 페이지당 1장이 맞다.

// 페이지의 generateStaticParams와 같은 기준으로 og 이미지도 프리렌더한다.
export function generateStaticParams() {
  const slugs = [
    ...CASE_STUDIES.map((cs) => cs.slug),
    ...SIDE_PROJECTS.filter((p) => p.detail).map((p) => p.slug),
  ];
  return slugs.flatMap((slug) => routing.locales.map((locale) => ({ locale, slug })));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function Image({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = rawLocale === "ko" ? "ko" : "en";
  const isKo = locale === "ko";

  // 이 라우트는 케이스 스터디와 개인 프로젝트를 함께 서빙한다. 둘 다 처리해야
  // 개인 프로젝트 공유 시 백지 카드가 나오지 않는다.
  const cs = getCaseStudyBySlug(slug);
  const sp = getSideProjectBySlug(slug);
  const meta = cs
    ? { title: cs.title[locale], summary: cs.summary[locale], tags: cs.tags }
    : sp
      ? { title: sp.name[locale], summary: sp.tagline[locale], tags: sp.tags }
      : null;

  if (!meta) {
    return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%" }} />, {
      ...size,
    });
  }

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
          background: OG_COLORS.background,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, color: OG_COLORS.muted, fontWeight: 600 }}>
            {isKo ? "프로젝트" : "Project"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              color: OG_COLORS.title,
              marginTop: 16,
              letterSpacing: -1.5,
              maxWidth: 1000,
              lineHeight: 1.2,
            }}
          >
            {meta.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: OG_COLORS.bodyMuted,
              marginTop: 32,
              maxWidth: 1000,
              lineHeight: 1.4,
            }}
          >
            {meta.summary}
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
          {/* 사이트의 태그는 text-accent다. 여기도 같은 값을 쓰고, 제목(64px)과는
              크기·굵기로 위계를 갈라 둔다. */}
          <div style={{ display: "flex", gap: 16, color: OG_COLORS.accent, fontWeight: 600 }}>
            {meta.tags.map((tag, i) => (
              <div key={i} style={{ display: "flex" }}>
                #{tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", color: OG_COLORS.muted, fontWeight: 600 }}>
            {isKo ? "김태현" : "Taehyun Kim"}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
