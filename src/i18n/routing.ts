import { defineRouting } from "next-intl/routing";

// 로케일 정의의 원본. middleware·request 설정·데이터 타입이 모두 여기서 파생된다.
export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  localePrefix: "always",
});
