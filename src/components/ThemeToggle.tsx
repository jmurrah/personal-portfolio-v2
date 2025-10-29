import { ICONS } from '@/assets';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const iconSize = 16;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const backgroundColor = isHovered
    ? 'color-mix(in srgb, var(--bg-light) 90%, var(--primary) 10%)'
    : 'transparent';

  const borderColor = isHovered
    ? 'color-mix(in srgb, var(--card-border) 80%, var(--primary) 20%)'
    : 'transparent';

  const iconColor = theme === 'dark' ? '#FDBA74' : '#6366F1';
  const iconSrc = theme === 'dark' ? ICONS.sun : ICONS.moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.25rem',
        height: '2.25rem',
        borderRadius: '0.5rem',
        border: `1px solid ${borderColor}`,
        backgroundColor,
        color: iconColor,
        cursor: 'pointer',
        transition: 'background-color 150ms ease, border-color 150ms ease',
      }}
    >
      <span
        aria-hidden
        style={{
          width: iconSize,
          height: iconSize,
          backgroundColor: iconColor,
          display: 'inline-block',
          maskImage: `url(${iconSrc})`,
          WebkitMaskImage: `url(${iconSrc})`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
        }}
      />
    </button>
  );
}
