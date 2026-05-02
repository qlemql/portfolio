'use client';

import { useTranslations } from 'next-intl';

export default function PrintButton() {
  const t = useTranslations('resumePage');
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95 print:hidden dark:bg-zinc-50 dark:text-black"
    >
      {t('downloadPdf')}
    </button>
  );
}
