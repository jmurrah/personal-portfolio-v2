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

type ThemeFontToggleProps = {
  tileSize?: number | string;
  gap?: number | string;
  isCompact?: boolean;
};

export default function ThemeFontToggle({
  tileSize = 32,
  gap = '0.75rem',
  isCompact = false,
}: ThemeFontToggleProps) {
  const [mode, setMode] = useState<ModeName>(() => getStoredMode());
  const [font, setFont] = useState<FontChoice>(() => getStoredFont());

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

  const fontGridStyle: CSSProperties = {
    '--option-columns': 2,
    '--tile-size': typeof tileSize === 'number' ? `${tileSize}px` : tileSize,
    '--tile-gap': isCompact ? '0px' : gap,
    gridTemplateColumns: isCompact ? 'repeat(auto-fit, minmax(120px, 1fr))' : undefined,
    gap: isCompact ? '0' : undefined,
  };

  const content = isCompact ? (
    <>
      <div className="option-grid" style={{ '--option-columns': 1 } as CSSProperties}>
        <button
          type="button"
          onClick={handleModeToggle}
          aria-pressed={mode === 'dark'}
          className={`option-btn option-btn--neutral${mode === 'dark' ? ' selected' : ''}`}
          aria-label="Toggle light and dark mode"
        >
          <div className="flex items-center justify-center gap-2">
            <SvgIcon
              src={modeIcon}
              alt={modeLabel === 'Light' ? 'Sun icon' : 'Moon icon'}
              size="small"
              color="currentColor"
            />
            <span>{modeLabel}</span>
          </div>
        </button>
      </div>
      <div className="option-grid font-group font-group--compact" style={fontGridStyle}>
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
    </>
  ) : (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full"
      style={
        {
          '--tile-size': typeof tileSize === 'number' ? `${tileSize}px` : tileSize,
          '--tile-gap': gap,
        } as CSSProperties
      }
    >
      <div className="option-grid" style={{ '--option-columns': 1 } as CSSProperties}>
        <button
          type="button"
          onClick={handleModeToggle}
          aria-pressed={mode === 'dark'}
          className={`option-btn option-btn--neutral${mode === 'dark' ? ' selected' : ''}`}
          aria-label="Toggle light and dark mode"
        >
          <div className="flex items-center justify-center gap-2">
            <SvgIcon
              src={modeIcon}
              alt={modeLabel === 'Light' ? 'Sun icon' : 'Moon icon'}
              size="small"
              color="currentColor"
            />
            <span>{modeLabel}</span>
          </div>
        </button>
      </div>
      <div className="sm:col-span-2 option-grid font-group" style={fontGridStyle}>
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
      <PrimaryColorSelector tileSize={28} gap="0.75rem" />
    </div>
  );
}
