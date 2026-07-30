import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/siteUrl";
import "../globals.css";

/**
 * 본문은 Pretendard 단독. Geist는 라틴 전용이라 한글이 시스템 폰트로 떨어졌고,
 * 두 폰트를 병용하면 x-height·굵기 축이 달라 "AI 리서치 3건"처럼 단어 단위로
 * 섞이는 줄에서 라틴이 크고 얇게 튄다. 축을 하나로 통일하는 게 해결이다.
 *
 * 서브셋은 scripts/subset-font.sh로 생성한다(2.0MB → 428KB).
 * tabular-nums가 이 파일의 tnum feature에 의존하므로 서브셋 시 반드시 유지해야 한다.
 */
const pretendard = localFont({
  src: "../../assets/fonts/PretendardVariable.subset.woff2",
  weight: "300 800",
  variable: "--font-pretendard",
  display: "swap",
  preload: true,
});

/**
 * 숫자 지표의 의도적 대비용으로만 남긴다(라틴 단독 구간).
 * ProjectVisual에서만 쓰여 케이스 상세에만 등장하므로 preload하지 않는다 —
 * 홈·목록에서 쓰지 않는 폰트를 모든 페이지에서 미리 받을 이유가 없다.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// 다크 테마를 첫 페인트 전에 적용해 깜빡임을 막는다.
const NO_FLASH_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  // setRequestLocale이 없으면 next-intl이 요청 헤더를 참조해 라우트가 동적 렌더로 떨어진다.
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const siteName = t("siteName");
  return {
    title: siteName,
    description: t("siteDescription"),
    metadataBase: new URL(SITE_URL),
    applicationName: siteName,
    openGraph: { siteName },
  };
}

// 이 파일이 루트 레이아웃이다. <html lang>을 로케일별로 내보내려면 locale을 아는
// 세그먼트가 <html>을 소유해야 해서, app/layout.tsx에서 여기로 내렸다.
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body
        className={`${pretendard.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
