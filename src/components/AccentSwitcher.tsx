'use client';

import { useEffect, useState } from 'react';

type Accent = 'mono' | 'indigo' | 'emerald' | 'amber';

const ACCENTS: { id: Accent; label: string; swatch: string }[] = [
  { id: 'mono', label: 'Mono', swatch: 'bg-zinc-900 dark:bg-zinc-100' },
  { id: 'indigo', label: 'Indigo', swatch: 'bg-indigo-600' },
  { id: 'emerald', label: 'Emerald', swatch: 'bg-emerald-600' },
  { id: 'amber', label: 'Amber', swatch: 'bg-amber-500' },
];

const STORAGE_KEY = 'accent';

function applyAccent(a: Accent) {
  document.documentElement.setAttribute('data-accent', a);
}

export default function AccentSwitcher() {
  const [accent, setAccent] = useState<Accent>('mono');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Accent | null;
    setAccent(stored ?? 'mono');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyAccent(accent);
    localStorage.setItem(STORAGE_KEY, accent);
  }, [accent, mounted]);

  if (!mounted) {
    return <div className="h-9 w-32" aria-hidden="true" />;
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full border px-1.5 py-1 dark:border-white/15"
      role="radiogroup"
      aria-label="Accent color"
    >
      {ACCENTS.map((a) => (
        <button
          key={a.id}
          type="button"
          role="radio"
          aria-checked={accent === a.id}
          onClick={() => setAccent(a.id)}
          className={`h-5 w-5 rounded-full transition ${a.swatch} ${
            accent === a.id
              ? 'ring-2 ring-zinc-900 ring-offset-2 ring-offset-white dark:ring-zinc-100 dark:ring-offset-black'
              : 'opacity-60 hover:opacity-100'
          }`}
          title={a.label}
          aria-label={a.label}
        />
      ))}
    </div>
  );
}
