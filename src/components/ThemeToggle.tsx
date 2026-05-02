'use client';

import { useEffect, useState } from 'react';

type Theme = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'theme';
const NEXT: Record<Theme, Theme> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
};
const ICON: Record<Theme, string> = {
  system: '🖥️',
  light: '☀️',
  dark: '🌙',
};
const LABEL_KO: Record<Theme, string> = {
  system: '시스템',
  light: '라이트',
  dark: '다크',
};
const LABEL_EN: Record<Theme, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

function applyTheme(theme: Theme) {
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
}

type Props = { locale: 'ko' | 'en' };

export default function ThemeToggle({ locale }: Props) {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    setTheme(stored ?? 'system');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    if (theme !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme, mounted]);

  const handleClick = () => {
    const next = NEXT[theme];
    setTheme(next);
    if (next === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
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
