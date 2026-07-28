import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";



export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale은 middleware에서 전달된 locale입니다
  let locale = await requestLocale;

  // locale이 유효하지 않으면 기본값 사용
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});


