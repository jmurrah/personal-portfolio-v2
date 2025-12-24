import { useState } from 'react';
import { ICONS } from '@/assets';
import SvgIcon from '@/components/SvgIcon';
import { applyModeWithTransition, getStoredMode, type ModeName } from '@/themeToggle';

const getInitialMode = (): ModeName => {
  if (typeof document === 'undefined') {
    return getStoredMode();
  }

  return document.body?.classList.contains('dark-mode') ? 'dark' : 'light';
};

const iconSize = 16;

export default function ThemeToggle() {
  const [mode, setMode] = useState<ModeName>(() => getInitialMode());
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    setMode((current) => {
      const nextMode = current === 'dark' ? 'light' : 'dark';
      applyModeWithTransition(nextMode);
      return nextMode;
    });
  };

  const backgroundColor = isHovered
    ? 'color-mix(in srgb, var(--surface) 88%, var(--primary) 12%)'
    : 'var(--surface)';

  const borderColor = isHovered
    ? 'color-mix(in srgb, var(--border) 75%, var(--primary) 25%)'
    : 'var(--border)';

  const iconColor = 'var(--primary)';
  const iconSrc = mode === 'dark' ? ICONS.sun : ICONS.moon;

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
      aria-pressed={mode === 'dark'}
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
        alt={mode === 'dark' ? 'Sun icon' : 'Moon icon'}
        size="small"
        color={iconColor}
        style={{ width: iconSize, height: iconSize }}
      />
    </button>
  );
}
