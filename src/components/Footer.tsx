type Props = {
  maxWidth?: "max-w-5xl" | "max-w-4xl" | "max-w-3xl";
};

export default function Footer({ maxWidth = "max-w-5xl" }: Props) {
  return (
    <footer
      className={`mx-auto ${maxWidth} px-4 py-10 text-sm text-zinc-500 print:hidden dark:text-zinc-400`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} 김태현. All rights reserved.</div>
        <div className="flex gap-4">
          <a
            href="https://github.com/qlemql"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/%ED%83%9C%ED%98%84-%EA%B9%80-1465571b8/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
