import { APP_THEME_CHANGE_EVENT, type AppThemeChangeDetail } from '@/constants/events';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../tileBackground.css';

interface TileBackgroundProps {
  tileSize?: number;
  tileGap?: number;
  fadeDuration?: string;
}

interface GridSize {
  cols: number;
  rows: number;
}

interface GridPosition {
  row: number;
  col: number;
}

const DELAY_PER_PIXEL = 0.0008;

const TileBackground: React.FC<TileBackgroundProps> = ({
  tileSize = 16,
  tileGap = 0,
  fadeDuration = '5s',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<GridSize>({ cols: 0, rows: 0 });
  const [baseColor, setBaseColor] = useState<string>(() =>
    typeof window === 'undefined'
      ? 'hsl(40, 8%, 94%)'
      : getComputedStyleSafe(document.body, '--bg', 'hsl(40, 8%, 94%)'),
  );
  const currentColorRef = useRef(baseColor);

  const tilesRef = useRef<Array<HTMLDivElement | null>>([]);
  const tileReadyTimesRef = useRef<number[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const baseColorTimeoutRef = useRef<number | null>(null);
  const lastHoverRef = useRef<GridPosition | null>(null);

  useEffect(() => {
    const updateGrid = () => {
      const cols = Math.ceil(window.innerWidth / (tileSize + tileGap)) + 2;
      const rows = Math.ceil(window.innerHeight / (tileSize + tileGap)) + 2;
      setGrid({ cols, rows });
    };
    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, [tileGap, tileSize]);

  useEffect(() => {
    document.documentElement.style.setProperty('--tile-size', `${tileSize}px`);
    document.documentElement.style.setProperty('--tile-gap', `${tileGap}px`);
    document.documentElement.style.setProperty('--fade-duration', fadeDuration);
  }, [fadeDuration, tileGap, tileSize]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const initialColor = getComputedStyleSafe(document.body, '--bg', baseColor);
    currentColorRef.current = initialColor;
    setBaseColor(initialColor);
  }, []);

  useEffect(() => {
    currentColorRef.current = baseColor;
  }, [baseColor]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!containerRef.current || !grid.cols || !grid.rows) return;

      const rect = containerRef.current.getBoundingClientRect();
      const tileStride = tileSize + tileGap;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / tileStride);
      const row = Math.floor(y / tileStride);

      if (col < 0 || col >= grid.cols || row < 0 || row >= grid.rows) {
        return;
      }

      lastHoverRef.current = { row, col };
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [grid.cols, grid.rows, tileGap, tileSize]);

  useEffect(() => {
    const total = grid.cols * grid.rows;
    if (total <= 0) {
      tilesRef.current = [];
      tileReadyTimesRef.current = [];
      return;
    }

    tilesRef.current.length = total;

    const now = Date.now();
    if (tileReadyTimesRef.current.length < total) {
      const toAdd = total - tileReadyTimesRef.current.length;
      tileReadyTimesRef.current = tileReadyTimesRef.current.concat(Array(toAdd).fill(now));
    } else if (tileReadyTimesRef.current.length > total) {
      tileReadyTimesRef.current = tileReadyTimesRef.current.slice(0, total);
    }
  }, [grid.cols, grid.rows]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutsRef.current = [];
    if (baseColorTimeoutRef.current) {
      window.clearTimeout(baseColorTimeoutRef.current);
      baseColorTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearAllTimeouts, [clearAllTimeouts]);

  const fadeDurationSeconds = useMemo(() => convertDurationToSeconds(fadeDuration), [fadeDuration]);
  const tileStride = useMemo(() => tileSize + tileGap, [tileGap, tileSize]);

  const applyColorToAllTiles = useCallback((color: string) => {
    tilesRef.current.forEach((tile) => {
      if (tile) {
        tile.style.setProperty('--tile-color', color);
      }
    });
    setBaseColor(color);
    currentColorRef.current = color;
  }, []);

  const scheduleBaseColorUpdate = useCallback(
    (color: string, delayMs: number) => {
      if (baseColorTimeoutRef.current) {
        window.clearTimeout(baseColorTimeoutRef.current);
      }

      baseColorTimeoutRef.current = window.setTimeout(
        () => {
          applyColorToAllTiles(color);
          baseColorTimeoutRef.current = null;
        },
        Math.max(delayMs, 0),
      );
    },
    [applyColorToAllTiles],
  );

  const scheduleTileColorUpdate = useCallback((index: number, color: string, delayMs: number) => {
    const applyColor = () => {
      const tile = tilesRef.current[index];
      if (tile) {
        tile.style.setProperty('--tile-color', color);
        return;
      }

      if (index >= tilesRef.current.length) {
        return;
      }

      const retryId = window.setTimeout(applyColor, 16);
      timeoutsRef.current.push(retryId);
    };

    const timeoutId = window.setTimeout(applyColor, Math.max(0, delayMs));
    timeoutsRef.current.push(timeoutId);
  }, []);

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<AppThemeChangeDetail>;
      const { colors, initial } = customEvent.detail;
      const targetColor = colors.to;

      if (!grid.cols || !grid.rows) {
        clearAllTimeouts();
        tileReadyTimesRef.current = [];
        applyColorToAllTiles(targetColor);
        return;
      }

      const origin =
        lastHoverRef.current ??
        ({
          row: Math.floor(grid.rows / 2),
          col: Math.floor(grid.cols / 2),
        } as GridPosition);

      const now = Date.now();
      const fadeDurationMs = fadeDurationSeconds * 1000;
      const totalTiles = grid.cols * grid.rows;

      if (initial) {
        clearAllTimeouts();
        tileReadyTimesRef.current = Array(totalTiles).fill(now + fadeDurationMs);
        applyColorToAllTiles(targetColor);
        return;
      }

      let maxReadyTime = now;

      for (let i = 0; i < totalTiles; i += 1) {
        const baseDelaySeconds = computeDelaySeconds(i, origin, grid.cols, tileStride);
        const intendedStart = now + baseDelaySeconds * 1000;
        const previousReadyTime = tileReadyTimesRef.current[i] ?? now;
        const startTime = Math.max(intendedStart, previousReadyTime);

        scheduleTileColorUpdate(i, targetColor, startTime - now);

        const readyTime = startTime + fadeDurationMs;
        tileReadyTimesRef.current[i] = readyTime;
        maxReadyTime = Math.max(maxReadyTime, readyTime);
      }

      scheduleBaseColorUpdate(targetColor, maxReadyTime - now);
    };

    window.addEventListener(APP_THEME_CHANGE_EVENT, handleThemeChange as EventListener);
    return () =>
      window.removeEventListener(APP_THEME_CHANGE_EVENT, handleThemeChange as EventListener);
  }, [
    applyColorToAllTiles,
    clearAllTimeouts,
    fadeDurationSeconds,
    grid.cols,
    grid.rows,
    scheduleBaseColorUpdate,
    scheduleTileColorUpdate,
    tileStride,
  ]);

  const total = grid.cols * grid.rows;

  return (
    <div
      ref={containerRef}
      className="tile-bg-container"
      style={
        {
          '--tile-base-color': baseColor,
          gridTemplateColumns: `repeat(${grid.cols}, var(--tile-size))`,
          gridAutoRows: `var(--tile-size)`,
          gap: `var(--tile-gap)`,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="tile"
          ref={(node) => {
            tilesRef.current[i] = node;
            if (node && !node.dataset.initializedColor) {
              node.dataset.initializedColor = 'true';
              node.style.setProperty('--tile-color', currentColorRef.current);
            }
          }}
        />
      ))}
    </div>
  );
};

function getComputedStyleSafe(element: Element, property: string, fallback: string): string {
  try {
    const value = getComputedStyle(element).getPropertyValue(property).trim();
    return value || fallback;
  } catch {
    return fallback;
  }
}

function convertDurationToSeconds(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return 0;
  }

  if (trimmed.endsWith('ms')) {
    const msValue = Number.parseFloat(trimmed.slice(0, -2));
    return Number.isFinite(msValue) ? msValue / 1000 : 0;
  }

  const secondsValue = Number.parseFloat(trimmed.replace('s', ''));
  return Number.isFinite(secondsValue) ? secondsValue : 0;
}

function computeDelaySeconds(
  index: number,
  origin: GridPosition,
  cols: number,
  tileStride: number,
) {
  const row = Math.floor(index / cols);
  const col = index % cols;

  const dx = (col - origin.col) * tileStride;
  const dy = (row - origin.row) * tileStride;

  const distance = Math.hypot(dx, dy);
  return distance * DELAY_PER_PIXEL;
}

export default TileBackground;
