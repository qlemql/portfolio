import { routing } from "@/i18n/routing";
import { OG_SIZE, renderOgImage } from "@/lib/ogImage";
import type { Locale } from "@/data/locale";

export const alt = "Taehyun Kim — Frontend Engineer";
export const size = OG_SIZE;
export const contentType = "image/png";

// 없으면 이 라우트만 요청 시 렌더로 떨어져 소셜 크롤러 요청마다 Satori가 돈다.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" ? "en" : "ko") as Locale;
  const isKo = locale === "ko";

  return renderOgImage({
    locale,
    eyebrow: "Frontend Engineer",
    title: isKo ? "김태현" : "Taehyun Kim",
    description: isKo
      ? "패턴을 찾아 자동화하고, 결과를 데이터로 증명합니다"
      : "Find patterns, automate them, prove outcomes with data",
    highlights: isKo
      ? ["가입 전환 3.2×", "결제 전환 62%", "웹뷰 0→1"]
      : ["Signup 3.2×", "Payment 62%", "WebView 0→1"],
  });
}
