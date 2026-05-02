'use client';

import { ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";

type SectionProps = {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  /** 스크롤 애니메이션 비활성화 */
  disableAnimation?: boolean;
};

export default function Section({ id, title, children, className, disableAnimation = false }: SectionProps) {
  const content = (
    <section id={id} aria-label={title} className={`mx-auto max-w-5xl px-4 ${className ?? ""}`}>
      {title ? (
        <ScrollReveal delay={0} duration={400}>
          <h2 className="mb-6 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
        </ScrollReveal>
      ) : null}
      {children}
    </section>
  );

  if (disableAnimation) {
    return content;
  }

  return (
    <ScrollReveal direction="up" duration={500}>
      {content}
    </ScrollReveal>
  );
}


