import Link from "next/link";
import type {
  ExperienceItem,
  Locale,
  Metric,
  ProjectItem,
  ProjectSection,
} from "@/data/resume";

type Props = {
  locale: Locale;
  item: ExperienceItem;
  /** 목차 앵커 */
  id?: string;
};

export default function ResumeExperience({ locale, item, id }: Props) {
  return (
    <article id={id} className="scroll-mt-28 space-y-4 border-b border-zinc-200 pb-8 last:border-b-0 dark:border-zinc-800">
      <header className="space-y-1 print:break-after-avoid">
        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {item.company[locale]}
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            {item.role[locale]}
          </span>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {item.period[locale]}
          </span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.meta[locale]}</p>
      </header>

      <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
        {item.summary[locale]}
      </p>

      {item.metrics && item.metrics.length > 0 ? (
        <MetricsBlock locale={locale} metrics={item.metrics} layout={item.metricsLayout ?? "inline"} />
      ) : null}

      <div className="space-y-3">
        {item.projects.map((project, i) => (
          <ProjectBox key={i} locale={locale} project={project} />
        ))}
      </div>

      {item.portfolioHref ? (
        <Link
          href={`/${locale}${item.portfolioHref}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 underline-offset-4 transition hover:text-accent hover:underline dark:text-zinc-300 print:hidden"
        >
          {locale === "ko" ? "관련 사례 포트폴리오에서 보기" : "See related case studies"}
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}

    </article>
  );
}

function MetricsBlock({
  locale,
  metrics,
  layout,
}: {
  locale: Locale;
  metrics: Metric[];
  layout: "grid" | "grid-2" | "inline";
}) {
  const containerClass =
    layout === "grid"
      ? "grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3"
      : layout === "grid-2"
        ? "grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2"
        : "flex flex-wrap items-center gap-x-6 gap-y-2";

  return (
    <div className="border-l-2 border-accent pl-4 py-1">
      <ul className={`${containerClass} text-sm`}>
        {metrics.map((m, i) => (
          <li key={i} className="flex items-baseline gap-1.5">
            <span className="whitespace-nowrap text-xl font-extrabold tracking-tight text-accent tabular-nums dark:text-accent print:text-black">
              {m.value[locale]}
            </span>
            {m.label[locale] ? (
              <span className="text-xs text-zinc-500 print:text-zinc-600 dark:text-zinc-400">
                {m.label[locale]}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectBox({ locale, project }: { locale: Locale; project: ProjectItem }) {
  if (project.variant === "highlight") {
    return (
      <div className="break-inside-avoid rounded-lg border-l-[3px] border-accent bg-zinc-50 p-5 dark:bg-zinc-900/60">
        <h4 className="mb-3 text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {project.name[locale]}
        </h4>
        <div className="space-y-3">
          {project.sections?.map((section, i) => (
            <ProjectSubsection key={i} locale={locale} section={section} />
          ))}
        </div>
        <CaseLink locale={locale} href={project.caseHref} />
      </div>
    );
  }

  return (
    <div className="break-inside-avoid rounded-lg border-l border-zinc-300 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/30">
      <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {project.name[locale]}
      </h4>
      {project.bullets ? (
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          {project.bullets[locale].map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      ) : null}
      <CaseLink locale={locale} href={project.caseHref} />
    </div>
  );
}

/** 이력서는 사실만 담고, 서술은 케이스 스터디로 넘긴다. 인쇄물에서는 클릭할 수 없어 제외. */
function CaseLink({ locale, href }: { locale: Locale; href?: string }) {
  if (!href) return null;
  return (
    <Link
      href={`/${locale}${href}`}
      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent underline-offset-4 hover:underline print:hidden"
    >
      {/* 케이스 진입 문구는 한 가지로 — "자세히" / "Read the case study"로 갈려 있었다. */}
      {locale === "ko" ? "자세히 보기" : "Read more"}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function ProjectSubsection({ locale, section }: { locale: Locale; section: ProjectSection }) {
  return (
    <div>
      <div className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {section.title[locale]}
      </div>
      {section.paragraphs ? (
        <div className="space-y-1 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
          {section.paragraphs[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
