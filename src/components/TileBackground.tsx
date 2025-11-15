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
  const tileQueuesRef = useRef<Promise<void>[]>([]);
  const timeoutsRef = useRef<number[]>([]);
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
  }, [tileSize, tileGap]);

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
      tileQueuesRef.current = [];
      return;
    }

    tilesRef.current.length = total;

    if (tileQueuesRef.current.length < total) {
      tileQueuesRef.current = tileQueuesRef.current.concat(
        Array.from({ length: total - tileQueuesRef.current.length }, () => Promise.resolve()),
      );
    } else if (tileQueuesRef.current.length > total) {
      tileQueuesRef.current.length = total;
    }
  }, [grid.cols, grid.rows]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutsRef.current = [];
    };
  }, []);

  const fadeDurationSeconds = useMemo(() => convertDurationToSeconds(fadeDuration), [fadeDuration]);

  const enqueueTileTransition = useCallback(
    (index: number, delaySeconds: number, color: string) => {
      const runTransition = () =>
        new Promise<void>((resolve) => {
          const delayMs = Math.max(delaySeconds, 0) * 1000;
          const startTimeout = window.setTimeout(() => {
            const tile = tilesRef.current[index];
            if (tile) {
              tile.style.setProperty('--tile-color', color);
            }
            const settleTimeout = window.setTimeout(() => resolve(), fadeDurationSeconds * 1000);
            timeoutsRef.current.push(settleTimeout);
          }, delayMs);

          timeoutsRef.current.push(startTimeout);
        });

      const queue = tileQueuesRef.current[index] ?? Promise.resolve();
      tileQueuesRef.current[index] = queue.then(runTransition);
    },
    [fadeDurationSeconds],
  );

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<AppThemeChangeDetail>;
      const { colors, initial } = customEvent.detail;

      if (!grid.cols || !grid.rows) return;

      const origin =
        lastHoverRef.current ??
        ({
          row: Math.floor(grid.rows / 2),
          col: Math.floor(grid.cols / 2),
        } as GridPosition);

      if (initial) {
        tilesRef.current.forEach((tile) => {
          if (tile) {
            tile.style.setProperty('--tile-color', colors.to);
          }
        });
        currentColorRef.current = colors.to;
        setBaseColor(colors.to);
      } else {
        const stride = tileSize + tileGap;
        const totalTiles = grid.cols * grid.rows;
        const maxDelay = computeMaxDelay(origin, grid, stride);

        for (let i = 0; i < totalTiles; i += 1) {
          const delaySeconds = computeDelaySeconds(i, origin, grid.cols, stride);
          enqueueTileTransition(i, delaySeconds, colors.to);
        }

        const totalDurationMs = (maxDelay + fadeDurationSeconds) * 1000;
        const timeoutId = window.setTimeout(() => {
          currentColorRef.current = colors.to;
          setBaseColor(colors.to);
        }, totalDurationMs);
        timeoutsRef.current.push(timeoutId);
      }
    };

    window.addEventListener(APP_THEME_CHANGE_EVENT, handleThemeChange as EventListener);
    return () =>
      window.removeEventListener(APP_THEME_CHANGE_EVENT, handleThemeChange as EventListener);
  }, [enqueueTileTransition, grid.cols, grid.rows, tileGap, tileSize]);

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
            if (!node) {
              return;
            }

            if (!node.dataset.initializedColor) {
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

function computeMaxDelay(origin: GridPosition, grid: GridSize, tileStride: number) {
  const corners: GridPosition[] = [
    { row: 0, col: 0 },
    { row: 0, col: grid.cols - 1 },
    { row: grid.rows - 1, col: 0 },
    { row: grid.rows - 1, col: grid.cols - 1 },
  ];

  const maxDistance = corners.reduce((acc, corner) => {
    const dx = (corner.col - origin.col) * tileStride;
    const dy = (corner.row - origin.row) * tileStride;
    const distance = Math.hypot(dx, dy);
    return Math.max(acc, distance);
  }, 0);

  return maxDistance * DELAY_PER_PIXEL;
}

export default TileBackground;
