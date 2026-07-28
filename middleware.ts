import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // 모든 경로를 매칭하되 _next·_vercel·확장자 있는 정적 파일은 제외.
  // api 라우트는 없으므로 매칭 대상에서 뺀다.
  matcher: ['/', '/(ko|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};


