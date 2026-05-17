import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "김태현 포트폴리오",
  description: "Frontend/Product 엔지니어 포트폴리오 — 성과 중심 소개와 연락 전환",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  alternates: {
    canonical: "/",
    languages: {
      ko: "/ko",
      en: "/en"
    }
  },
  applicationName: "김태현 포트폴리오",
  openGraph: {
    title: "김태현 포트폴리오",
    description:
      "Frontend/Product 엔지니어 포트폴리오 — 성과 중심 소개와 연락 전환",
    url: "/",
    siteName: "김태현 포트폴리오",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "김태현 포트폴리오",
    description:
      "Frontend/Product 엔지니어 포트폴리오 — 성과 중심 소개와 연락 전환",
  },
};

const NO_FLASH_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
