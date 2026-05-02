'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const NEXT: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'light',
};
const ICON: Record<Theme, string> = {
  light: '☀️',
  dark: '🌙',
};
const LABEL_KO: Record<Theme, string> = {
  light: '라이트',
  dark: '다크',
};
const LABEL_EN: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
};

function detectInitial(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

type Props = { locale: 'ko' | 'en' };

export default function ThemeToggle({ locale }: Props) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(detectInitial());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
  }, [theme, mounted]);

  const handleClick = () => {
    const next = NEXT[theme];
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const labels = locale === 'ko' ? LABEL_KO : LABEL_EN;

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full border px-3 py-2 text-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/20"
      aria-label={`Theme: ${labels[theme]}`}
      title={labels[theme]}
    >
      <span aria-hidden="true">{ICON[theme]}</span>
    </button>
  );
}
