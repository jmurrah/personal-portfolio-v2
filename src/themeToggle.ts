import { initThemeFromStorage } from './theme/primaryTheme';

export type ModeName = 'light' | 'dark';

const MODE_KEY = 'mode';
const DEFAULT_MODE: ModeName = 'light';

let modeTransitionInFlight = false;
let queuedMode: ModeName | null = null;

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
    // localStorage is best-effort.
  }
};

export const applyModeWithTransition = (mode: ModeName) => {
  if (typeof window === 'undefined') return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !document.startViewTransition) {
    applyMode(mode);
    return;
  }
  if (modeTransitionInFlight) {
    queuedMode = mode;
    return;
  }

  try {
    modeTransitionInFlight = true;
    const transition = document.startViewTransition(() => applyMode(mode));
    const clear = () => {
      modeTransitionInFlight = false;
      const nextMode = queuedMode;
      queuedMode = null;
      if (nextMode && nextMode !== mode) {
        applyModeWithTransition(nextMode);
      }
    };
    if (transition?.finished) {
      transition.finished.then(clear, clear);
    } else {
      clear();
    }
  } catch {
    modeTransitionInFlight = false;
    applyMode(mode);
  }
};

export const applyInitialTheme = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('dark');
  }
  initThemeFromStorage();
  applyMode(getStoredMode());
};
