import { initThemeFromStorage } from './theme/primaryTheme';

export type ModeName = 'light' | 'dark';

const MODE_KEY = 'mode';
const DEFAULT_MODE: ModeName = 'dark';
export const MODE_CHANGED_EVENT = 'mode-change';

const isModeName = (value: string | null): value is ModeName =>
  value === 'light' || value === 'dark';

const getBody = () => (typeof document === 'undefined' ? null : document.body);

export const getStoredMode = (): ModeName => {
  if (typeof window === 'undefined') return DEFAULT_MODE;
  try {
    const stored = localStorage.getItem(MODE_KEY);
    return isModeName(stored) ? stored : DEFAULT_MODE;
  } catch {
    return DEFAULT_MODE;
  }
};

export const applyMode = (mode: ModeName) => {
  const body = getBody();
  if (!body) return;
  body.classList.toggle('dark-mode', mode === 'dark');
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark-mode', mode === 'dark');
  }
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    return;
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(MODE_CHANGED_EVENT, { detail: { mode } }));
  }
};

export const applyModeWithTransition = (mode: ModeName) => {
  applyMode(mode);
};

export const applyInitialTheme = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('dark');
  }
  initThemeFromStorage();
  applyMode(getStoredMode());
};
