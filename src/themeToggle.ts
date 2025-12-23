type ThemeName = 'light' | 'dark';

const STORAGE_KEY = 'theme';

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => void;
  }
}

const getSystemTheme = (): ThemeName =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const readStoredTheme = (): ThemeName | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
};

const applyTheme = (theme: ThemeName, persist = true) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage is best-effort; theme still applies without it.
    }
  }
};

export const applyInitialTheme = () => {
  if (typeof window === 'undefined') return;
  const stored = readStoredTheme();
  applyTheme(stored ?? getSystemTheme(), stored !== null);
};

export const toggleTheme = () => {
  if (typeof document === 'undefined') return;

  const switchTheme = () => {
    const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Fallback: no view transitions or reduced motion preference => instant switch.
  if (prefersReducedMotion || !document.startViewTransition) {
    switchTheme();
    return;
  }

  document.startViewTransition(switchTheme);
};
