import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { OG_SIZE, renderOgImage } from "@/lib/ogImage";
import type { Locale } from "@/data/locale";

export const alt = "Resume — Taehyun Kim";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "en" ? "en" : "ko") as Locale;
  const t = await getTranslations({ locale, namespace: "resumePage" });

  return renderOgImage({
    locale,
    eyebrow: t("title"),
    title: locale === "ko" ? "이력서" : "Resume",
    description: t("summaryDesc"),
  });
}
