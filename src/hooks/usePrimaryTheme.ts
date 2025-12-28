import { useCallback, useEffect, useState } from 'react';
import {
  applyTheme,
  getStoredTheme,
  persistTheme,
  primaryThemes,
  type PrimaryThemeName,
} from '@/theme/primaryTheme';

export const usePrimaryTheme = () => {
  const [theme, setThemeState] = useState<PrimaryThemeName>(() => getStoredTheme());

  const setTheme = useCallback((next: PrimaryThemeName) => {
    setThemeState(next);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent<PrimaryThemeName>('primary-theme-change', { detail: next }),
      );
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== 'theme') return;
      const next = event.newValue;
      if (!next || !primaryThemes.includes(next as PrimaryThemeName)) return;
      setTheme(next as PrimaryThemeName);
    };
    window.addEventListener('storage', onStorage);

    const onThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<PrimaryThemeName>;
      if (!customEvent.detail || !primaryThemes.includes(customEvent.detail)) return;
      setThemeState(customEvent.detail);
    };
    window.addEventListener('primary-theme-change', onThemeChange as EventListener);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('primary-theme-change', onThemeChange as EventListener);
    };
  }, [setTheme]);

  return { theme, setTheme, primaryThemes };
};
