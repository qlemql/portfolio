/**
 * 배포 URL 단일 소스.
 *
 * NEXT_PUBLIC_SITE_URL이 없으면 canonical·og:url·sitemap이 전부 localhost로 박혀
 * 색인이 오염된다. Vercel이 자동 주입하는 변수로 폴백해 환경변수 누락에도
 * 프로덕션 URL이 나오도록 한다.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // 프로덕션 도메인(프리뷰 배포에서도 정식 도메인을 가리킨다)
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  // 프리뷰·브랜치 배포
  const deployment = process.env.VERCEL_URL;
  if (deployment) return `https://${deployment}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
