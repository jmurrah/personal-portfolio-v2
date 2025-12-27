import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { usePrimaryTheme } from '@/hooks/usePrimaryTheme';
import './PrimaryColorSelector.css';

type PrimaryColorSelectorProps = {
  tileSize?: number | string;
  gap?: number | string;
};

export default function PrimaryColorSelector({ tileSize, gap }: PrimaryColorSelectorProps) {
  const { theme, setTheme, primaryThemes } = usePrimaryTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const [ringStyle, setRingStyle] = useState<CSSProperties>({});

  const updateRing = useCallback(() => {
    const container = containerRef.current;
    const activeButton = buttonRefs.current.get(theme);
    if (!container || !activeButton) return;

    setRingStyle({
      transform: `translate(${activeButton.offsetLeft}px, ${activeButton.offsetTop}px)`,
      width: `${activeButton.offsetWidth}px`,
      height: `${activeButton.offsetHeight}px`,
    });
  }, [theme]);

  useEffect(() => {
    const frame = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(frame);
  }, [updateRing, primaryThemes]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;
    let frame = 0;
    const handle = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateRing);
    };
    const observer = new ResizeObserver(handle);
    observer.observe(container);
    window.addEventListener('resize', handle);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handle);
      cancelAnimationFrame(frame);
    };
  }, [updateRing]);

  const style: CSSProperties & Record<string, string> = {};
  if (tileSize !== undefined) {
    style['--tile-size'] = typeof tileSize === 'number' ? `${tileSize}px` : tileSize;
  }
  if (gap !== undefined) {
    style['--tile-gap'] = typeof gap === 'number' ? `${gap}px` : gap;
  }

  return (
    <div
      ref={containerRef}
      className="primary-color-grid"
      role="radiogroup"
      aria-label="Primary color"
      style={style}
    >
      {primaryThemes.map((primaryTheme) => {
        const isActive = primaryTheme === theme;
        return (
          <button
            key={primaryTheme}
            ref={(node) => {
              if (node) {
                buttonRefs.current.set(primaryTheme, node);
              } else {
                buttonRefs.current.delete(primaryTheme);
              }
            }}
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
      <div className="primary-color-ring" data-theme={theme} style={ringStyle} />
    </div>
  );
}
