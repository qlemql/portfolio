import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/siteUrl";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
