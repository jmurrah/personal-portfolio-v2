export const primaryThemes = ['teal', 'rose', 'green', 'cherry', 'amethyst', 'blue'] as const;

export type PrimaryThemeName = (typeof primaryThemes)[number];

const STORAGE_KEY = 'theme';
const DEFAULT_THEME: PrimaryThemeName = 'blue';

const themeClasses = primaryThemes.map((theme) => `theme-${theme}`);

const isThemeName = (value: string | null): value is PrimaryThemeName =>
  value !== null && (primaryThemes as readonly string[]).includes(value);

export const getStoredTheme = (): PrimaryThemeName => {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isThemeName(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

export const applyTheme = (name: PrimaryThemeName) => {
  if (typeof document === 'undefined') return;
  const { body } = document;
  if (!body) return;
  body.classList.remove(...themeClasses);
  body.setAttribute('data-theme', name);
};

export const persistTheme = (name: PrimaryThemeName) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // localStorage is best-effort.
  }
};

export const initThemeFromStorage = () => {
  const theme = getStoredTheme();
  applyTheme(theme);
};
