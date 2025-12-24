import { useEffect, useState } from 'react';
import {
  applyTheme,
  getStoredTheme,
  persistTheme,
  primaryThemes,
  type PrimaryThemeName,
} from '@/theme/primaryTheme';

export const usePrimaryTheme = () => {
  const [theme, setTheme] = useState<PrimaryThemeName>(() => getStoredTheme());

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
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return { theme, setTheme, primaryThemes };
};
