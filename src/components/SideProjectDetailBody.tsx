import type { Locale } from "@/data/resume";
import type { SideProjectDetail } from "@/data/sideProjects";

type Props = { detail: SideProjectDetail; locale: Locale };

export default function SideProjectDetailBody({ detail, locale }: Props) {
  return (
    <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
      <section className="rounded-lg border-l-2 border-accent bg-zinc-50 p-5 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          TL;DR
        </h2>
        <p className="text-sm leading-7">{detail.tldr[locale]}</p>
      </section>

      {detail.sections.map((s, i) => (
        <section key={i} className="space-y-3">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {s.heading[locale]}
          </h2>
          {s.body ? <p className="text-sm leading-7">{s.body[locale]}</p> : null}
          {s.bullets ? (
            <ul className="ml-5 list-disc space-y-2 text-sm leading-7">
              {s.bullets[locale].map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          ) : null}
          {s.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={s.image}
              alt={s.imageAlt ? s.imageAlt[locale] : s.heading[locale]}
              className="mx-auto mt-3 max-h-[560px] w-auto rounded-xl border border-black/5 shadow-sm dark:border-white/10"
            />
          ) : null}
        </section>
      ))}
    </div>
  );
}
