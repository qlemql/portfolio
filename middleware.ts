import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  localePrefix: "always",
});

export const config = {
  // 모든 경로를 매칭하되, api, _next, _vercel 및 정적 파일은 제외
  matcher: ['/', '/(ko|en)/:path*', '/((?!_next|_vercel|api|.*\\..*).*)', '/api/:path*'],
};


