import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return (
    <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? 'Use light theme' : 'Use dark theme'}
    </button>
  );
}
