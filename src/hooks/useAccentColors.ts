import { useCallback, useEffect, useMemo, useState } from 'react';

import { usePrimaryTheme } from '@/hooks/usePrimaryTheme';
import type { PrimaryThemeName } from '@/theme/primaryTheme';

export const useAccentColors = () => {
  const { theme, primaryThemes } = usePrimaryTheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark-mode')
      : false,
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark-mode'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const accentThemes = useMemo(() => {
    const idx = primaryThemes.indexOf(theme);
    if (idx === -1) return primaryThemes;
    return [...primaryThemes.slice(idx + 1), ...primaryThemes.slice(0, idx)];
  }, [primaryThemes, theme]);

  const getAccentColor = useCallback(
    (index: number) => {
      const sourceList = accentThemes.length ? accentThemes : primaryThemes;
      const colorName = sourceList[index % sourceList.length] as PrimaryThemeName;
      const shade = isDarkMode ? 'dark' : 'light';
      return `var(--theme-${colorName}-primary-${shade})`;
    },
    [accentThemes, isDarkMode, primaryThemes],
  );

  return { getAccentColor };
};
