import { usePrimaryTheme } from '@/hooks/usePrimaryTheme';
import './PrimaryColorSelector.css';

const COLS = 5;
const GAP_REM = 0.625;

export default function PrimaryColorSelector() {
  const { theme, setTheme, primaryThemes } = usePrimaryTheme();
  const selectedIndex = Math.max(
    0,
    primaryThemes.findIndex((primaryTheme) => primaryTheme === theme),
  );
  const row = Math.floor(selectedIndex / COLS);
  const col = selectedIndex % COLS;

  return (
    <div className="primary-color-grid" role="radiogroup" aria-label="Primary color">
      {primaryThemes.map((primaryTheme) => {
        const isActive = primaryTheme === theme;
        return (
          <button
            key={primaryTheme}
            type="button"
            role="radio"
            aria-checked={isActive}
            data-theme={primaryTheme}
            aria-label={`Select ${primaryTheme} theme`}
            onClick={() => setTheme(primaryTheme)}
            className={`primary-color-btn${isActive ? ' selected' : ''}`}
          >
            <span className="sr-only">{primaryTheme}</span>
          </button>
        );
      })}
      <div
        className="primary-color-ring"
        data-theme={theme}
        style={{
          transform: `translate(calc(${col} * (100% + ${GAP_REM}rem)), calc(${row} * (100% + ${GAP_REM}rem)))`,
          width: `calc((100% - ${COLS - 1} * ${GAP_REM}rem) / ${COLS})`,
          color: 'var(--primary)',
        }}
      />
    </div>
  );
}
