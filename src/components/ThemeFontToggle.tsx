import { useEffect, useState, type CSSProperties } from 'react';
import PrimaryColorSelector from '@/components/PrimaryColorSelector';
import SvgIcon from '@/components/SvgIcon';
import { ICONS } from '@/assets';
import {
  MODE_CHANGED_EVENT,
  applyModeWithTransition,
  getStoredMode,
  type ModeName,
} from '@/themeToggle';
import { applyFont, getStoredFont, FONT_STACKS, type FontChoice } from '@/fontToggle';
import './OptionSelector.css';
import './PrimaryColorSelector.css';

type CSSVars = CSSProperties & Record<string, string | number>;

type ThemeFontToggleProps = {
  tileSize?: number | string;
  gap?: number | string;
};

export default function ThemeFontToggle({ tileSize = 32, gap = '0.75rem' }: ThemeFontToggleProps) {
  const [mode, setMode] = useState<ModeName>(() => getStoredMode());
  const [font, setFont] = useState<FontChoice>(() => getStoredFont());
  const gapValue = typeof gap === 'number' ? `${gap}px` : gap;
  const tileSizeValue = typeof tileSize === 'number' ? `${tileSize}px` : tileSize;
  const colorTileSize = typeof tileSize === 'number' ? tileSize : undefined;

  useEffect(() => {
    const syncFromDom = () => {
      const isDark = document?.documentElement?.classList.contains('dark-mode');
      setMode(isDark ? 'dark' : 'light');
    };
    syncFromDom();

    const handleModeEvent = (event: Event) => {
      const detail = (event as CustomEvent<{ mode?: ModeName }>).detail;
      if (detail?.mode) {
        setMode(detail.mode);
      }
    };
    window.addEventListener(MODE_CHANGED_EVENT, handleModeEvent as EventListener);
    return () => window.removeEventListener(MODE_CHANGED_EVENT, handleModeEvent as EventListener);
  }, []);

  const handleModeToggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    applyModeWithTransition(next);
  };

  const handleFontChange = (choice: FontChoice) => {
    setFont(choice);
    applyFont(choice);
  };

  const nextMode = mode === 'dark' ? 'light' : 'dark';
  const modeLabel = nextMode === 'dark' ? 'Dark' : 'Light';
  const modeIcon = nextMode === 'dark' ? ICONS.moon : ICONS.sun;
  const modeIconColor = nextMode === 'dark' ? '#0400ffff' : '#ecad00ff';

  const fontGridStyle: CSSVars = {
    '--option-columns': 2,
    '--tile-size': tileSizeValue,
    '--tile-gap': gapValue,
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  };
  const content = (
    <div
      className="font-toggle-grid"
      style={{ '--tile-size': tileSizeValue, '--tile-gap': gapValue } as CSSVars}
    >
      <button
        type="button"
        onClick={handleModeToggle}
        aria-pressed={mode === 'dark'}
        className={`option-btn option-btn--neutral font-toggle-mode${mode === 'dark' ? ' selected' : ''}`}
        aria-label="Toggle light and dark mode"
      >
        <div className="flex items-center justify-center gap-2">
          <SvgIcon
            src={modeIcon}
            alt={modeLabel === 'Light' ? 'Sun icon' : 'Moon icon'}
            size="small"
            color={modeIconColor}
          />
        </div>
      </button>

      <div className="option-grid font-group" style={fontGridStyle}>
        <button
          type="button"
          onClick={() => handleFontChange('geist')}
          aria-pressed={font === 'geist'}
          className={`option-btn${font === 'geist' ? ' selected' : ''}`}
          style={{ fontFamily: FONT_STACKS.geist }}
        >
          Geist
        </button>
        <button
          type="button"
          onClick={() => handleFontChange('general')}
          aria-pressed={font === 'general'}
          className={`option-btn${font === 'general' ? ' selected' : ''}`}
          style={{ fontFamily: FONT_STACKS.general }}
        >
          General Sans
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      {content}
      <div className="h-px w-full bg-[color:var(--border)]" />
      <PrimaryColorSelector height={colorTileSize} gap={gapValue} />
    </div>
  );
}
