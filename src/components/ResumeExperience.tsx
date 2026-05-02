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
        <h3 className="text-lg font-bold tracking-tight text-blue-700 dark:text-blue-300">
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

      <p className="rounded-lg bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
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
        <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-950/30">
          <h4 className="mb-2 text-sm font-bold text-blue-800 dark:text-blue-200">
            {locale === "ko" ? "💡 기술적 기여" : "💡 Technical contributions"}
          </h4>
          <ul className="ml-5 list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
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
      ? "grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3"
      : "flex flex-wrap items-center gap-x-4 gap-y-2";

  return (
    <div className="rounded-lg border-l-4 border-blue-600 bg-gradient-to-br from-zinc-50 to-zinc-100 px-4 py-3 dark:border-blue-400 dark:from-zinc-900 dark:to-zinc-950">
      <ul className={`${containerClass} text-sm`}>
        {metrics.map((m, i) => (
          <li key={i} className="flex items-baseline gap-1">
            <span className="font-bold text-blue-700 dark:text-blue-300">
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
      <div className="rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 dark:border-yellow-700/60 dark:from-yellow-950/30 dark:to-amber-950/30">
        <h4 className="mb-3 text-sm font-bold text-amber-900 dark:text-yellow-200">
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
    <div className="rounded-lg border-l-4 border-blue-600 bg-zinc-50 p-4 dark:border-blue-400 dark:bg-zinc-900">
      <h4 className="mb-2 text-sm font-bold text-blue-800 dark:text-blue-300">
        {project.name[locale]}
      </h4>
      {project.bullets ? (
        <ul className="ml-5 list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
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
      <div className="mb-1 inline-block rounded bg-yellow-200/60 px-2 py-0.5 text-xs font-bold text-amber-900 dark:bg-yellow-900/40 dark:text-yellow-200">
        {section.title[locale]}
      </div>
      {section.paragraphs ? (
        <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
          {section.paragraphs[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ) : null}
      {section.bullets ? (
        <ul className="ml-5 list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
          {section.bullets[locale].map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
