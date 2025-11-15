import { ICONS } from '@/assets';
import {
  APP_THEME_CHANGE_EVENT,
  type AppThemeChangeDetail,
  type ThemeName,
} from '@/constants/events';
import SvgIcon from '@/components/SvgIcon';
import { useEffect, useRef, useState } from 'react';

type Theme = ThemeName;

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
  const previousThemeRef = useRef<Theme>(theme);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const body = document.body;
      const previousColor = getComputedStyle(body).getPropertyValue('--bg').trim();

      body.classList.toggle('dark', theme === 'dark');

      const nextColor = getComputedStyle(body).getPropertyValue('--bg').trim();

      const detail: AppThemeChangeDetail = {
        theme,
        prevTheme: previousThemeRef.current,
        colors: {
          from: previousColor,
          to: nextColor,
        },
        initial: previousThemeRef.current === theme,
      };

      window.dispatchEvent(new CustomEvent(APP_THEME_CHANGE_EVENT, { detail }));
      previousThemeRef.current = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const backgroundColor = isHovered
    ? 'color-mix(in srgb, var(--bg) 90%, var(--primary) 10%)'
    : 'var(--card-bg)';

  const borderColor = isHovered
    ? 'color-mix(in srgb, var(--card-border) 80%, var(--primary) 20%)'
    : 'var(--card-border)';

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
        border: `2px solid ${borderColor}`,
        backgroundColor,
        color: iconColor,
        cursor: 'pointer',
      }}
    >
      <SvgIcon
        src={iconSrc}
        alt={theme === 'dark' ? 'Sun icon' : 'Moon icon'}
        size="small"
        color={iconColor}
        style={{ width: iconSize, height: iconSize }}
      />
    </button>
  );
}
