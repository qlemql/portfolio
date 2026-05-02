import { getRequestConfig } from "next-intl/server";

const locales = ["ko", "en"] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale은 middleware에서 전달된 locale입니다
  let locale = await requestLocale;

  // locale이 유효하지 않으면 기본값 사용
  if (!locale || !locales.includes(locale as Locale)) {
    locale = "ko";
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});


