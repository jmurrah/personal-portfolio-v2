import { useState } from 'react';
import { ICONS } from '@/assets';
import SvgIcon from '@/components/SvgIcon';
import { toggleTheme as runThemeToggle } from '@/themeToggle';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof document === 'undefined') {
    return 'light';
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const iconSize = 16;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    runThemeToggle();
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
      id="theme-toggle"
      type="button"
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label="Toggle theme"
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
