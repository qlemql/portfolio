import { getLocale } from "next-intl/server";

type Props = {
  maxWidth?: "max-w-5xl" | "max-w-4xl" | "max-w-3xl" | "max-w-2xl";
};

// 연락처는 ContactCard가 맡는다. 푸터는 저작권만 남겨 역할 중복을 없앴다.
export default async function Footer({ maxWidth = "max-w-5xl" }: Props) {
  const locale = await getLocale();
  const name = locale === "ko" ? "김태현" : "Taehyun Kim";

  return (
    <footer
      className={`mx-auto ${maxWidth} px-4 py-10 text-sm text-zinc-500 print:hidden dark:text-zinc-400`}
    >
      © {new Date().getFullYear()} {name}
    </footer>
  );
}
