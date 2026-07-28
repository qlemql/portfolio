import { routing } from "@/i18n/routing";

/**
 * 로케일 정의의 단일 출처. routing에서 파생시켜 라우팅·미들웨어·데이터가
 * 서로 다른 목록을 들고 어긋나는 일을 막는다.
 */
export type Locale = (typeof routing.locales)[number];

export const LOCALES = routing.locales;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;
