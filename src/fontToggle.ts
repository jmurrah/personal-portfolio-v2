export type FontChoice = 'geist' | 'general';

const FONT_KEY = 'font-preference';
const DEFAULT_FONT: FontChoice = 'geist';

export const FONT_STACKS: Record<FontChoice, string> = {
  geist:
    "'Geist', 'General Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  general:
    "'General Sans', 'Geist', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const isFontChoice = (value: string | null): value is FontChoice =>
  value === 'geist' || value === 'general';

export const getStoredFont = (): FontChoice => {
  if (typeof window === 'undefined') return DEFAULT_FONT;
  try {
    const stored = localStorage.getItem(FONT_KEY);
    return isFontChoice(stored) ? stored : DEFAULT_FONT;
  } catch {
    return DEFAULT_FONT;
  }
};

export const applyFont = (font: FontChoice) => {
  if (typeof document === 'undefined') return;
  const fontStack = FONT_STACKS[font] ?? FONT_STACKS[DEFAULT_FONT];
  document.documentElement.style.setProperty('--font-family', fontStack);
  if (document.body) {
    document.body.style.fontFamily = fontStack;
  }
  try {
    localStorage.setItem(FONT_KEY, font);
  } catch {
    return;
  }
};

export const applyInitialFont = () => {
  applyFont(getStoredFont());
};
