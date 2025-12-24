import { usePrimaryTheme } from '@/hooks/usePrimaryTheme';
import './PrimaryColorSelector.css';

export default function PrimaryColorSelector() {
  const { theme, setTheme, primaryThemes } = usePrimaryTheme();

  return (
    <div className="primary-color-selector" role="radiogroup" aria-label="Primary color">
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
            className={`primary-color-swatch${isActive ? ' is-selected' : ''}`}
          >
            <span className="primary-color-label">
              {primaryTheme}
            </span>
          </button>
        );
      })}
    </div>
  );
}
