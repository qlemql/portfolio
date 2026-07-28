'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const LABEL: Record<'ko' | 'en', string> = {
  ko: '테마 전환',
  en: 'Toggle theme',
};

function detectInitial(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

type Props = { locale: 'ko' | 'en' };

export default function ThemeToggle({ locale }: Props) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // localStorage/matchMedia는 서버에 없어 렌더 중엔 못 읽는다 — 마운트 후 1회 동기화.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(detectInitial());
  }, []);

  const handleClick = () => {
    const next: Theme =
      (theme ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light')) === 'dark'
        ? 'light'
        : 'dark';
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  // 마운트 전에 빈 자리표시자를 렌더하면 헤더에 빈칸이 보이고 JS 없이는 계속 비어 있다.
  // 두 아이콘을 모두 내보내고 .dark 클래스로 CSS가 고르게 하면, no-flash 스크립트가
  // 첫 페인트 전에 클래스를 붙여 두므로 하이드레이션 전에도 올바른 아이콘이 보인다.
  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full border px-3 py-2 text-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/20"
      aria-label={LABEL[locale]}
      title={LABEL[locale]}
    >
      <span aria-hidden="true" className="inline dark:hidden">
        ☀️
      </span>
      <span aria-hidden="true" className="hidden dark:inline">
        🌙
      </span>
    </button>
  );
}
