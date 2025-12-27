import { useCallback, useEffect, useState } from 'react';
import {
  applyTheme,
  getStoredTheme,
  persistTheme,
  primaryThemes,
  type PrimaryThemeName,
} from '@/theme/primaryTheme';
import { MODE_CHANGED_EVENT } from '@/themeToggle';

const updateAccentVariables = () => {
  if (typeof document === 'undefined') return;
  const body = document.body;
  if (!body) return;
  const primary = getComputedStyle(body).getPropertyValue('--primary').trim();
  if (!primary) return;
  const targets = [body, document.documentElement];
  targets.forEach((el) => {
    el?.style.setProperty('--color-accent', primary);
    el?.style.setProperty('--color-accent-hover', primary);
  });
};

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
    updateAccentVariables();
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

    const onModeChange = () => updateAccentVariables();
    window.addEventListener(MODE_CHANGED_EVENT, onModeChange);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('primary-theme-change', onThemeChange as EventListener);
      window.removeEventListener(MODE_CHANGED_EVENT, onModeChange);
    };
  }, [setTheme]);

  return { theme, setTheme, primaryThemes };
};
