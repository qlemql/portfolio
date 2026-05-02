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
};

export default function ResumeExperience({ locale, item }: Props) {
  return (
    <article className="space-y-4 border-b border-zinc-200 pb-8 last:border-b-0 dark:border-zinc-800">
      <header className="space-y-1">
        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {item.company[locale]}
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            {item.role[locale]}
          </span>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {item.period}
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

      {item.techContributions ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {locale === "ko" ? "기술적 기여" : "Technical contributions"}
          </h4>
          <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            {item.techContributions[locale].map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
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
  layout: "grid" | "inline";
}) {
  const containerClass =
    layout === "grid"
      ? "grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3"
      : "flex flex-wrap items-center gap-x-6 gap-y-2";

  return (
    <div className="border-l-2 border-accent pl-4 py-1">
      <ul className={`${containerClass} text-sm`}>
        {metrics.map((m, i) => (
          <li key={i} className="flex items-baseline gap-1.5">
            <span className="font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {m.value[locale]}
            </span>
            {m.label[locale] ? (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
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
    </div>
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
      {section.bullets ? (
        <ul className="ml-5 list-disc space-y-1 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
          {section.bullets[locale].map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
