import {
  APP_THEME_CHANGE_EVENT,
  type AppThemeChangeDetail,
  type ThemeName,
} from '@/constants/events';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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

interface WaveState {
  id: number;
  theme: ThemeName;
  origin: GridPosition;
  maxDelay: number;
}

const DELAY_PER_PIXEL = 0.0008;
const COLOR_TRANSITION_SECONDS = 0.45;

const TileBackground: React.FC<TileBackgroundProps> = ({
  tileSize = 16,
  tileGap = 0,
  fadeDuration = '10s',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<GridSize>({ cols: 0, rows: 0 });
  const [tileColor, setTileColor] = useState<string>(() =>
    typeof window === 'undefined'
      ? 'hsl(40, 8%, 94%)'
      : getComputedStyleSafe(document.body, '--bg-dark', 'hsl(40, 8%, 94%)'),
  );
  const [waveState, setWaveState] = useState<WaveState | null>(null);
  const waveIdRef = useRef(0);
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
  }, [tileSize, tileGap, fadeDuration]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setTileColor(getComputedStyleSafe(document.body, '--bg-dark', tileColor));
  }, []);

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
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<AppThemeChangeDetail>;
      const { theme, colors, initial } = customEvent.detail;

      if (!grid.cols || !grid.rows) return;

      const origin =
        lastHoverRef.current ??
        ({
          row: Math.floor(grid.rows / 2),
          col: Math.floor(grid.cols / 2),
        } as GridPosition);

      const maxDelay = computeMaxDelay(origin, grid, tileSize, tileGap);

      if (!initial) {
        waveIdRef.current += 1;
        setWaveState({
          id: waveIdRef.current,
          theme,
          origin,
          maxDelay,
        });
      }

      setTileColor(colors.to);
    };

    window.addEventListener(APP_THEME_CHANGE_EVENT, handleThemeChange as EventListener);
    return () =>
      window.removeEventListener(APP_THEME_CHANGE_EVENT, handleThemeChange as EventListener);
  }, [grid.cols, grid.rows, tileGap, tileSize]);

  useEffect(() => {
    if (!waveState) return;

    const totalDurationMs = (waveState.maxDelay + COLOR_TRANSITION_SECONDS) * 1000 + 100;
    const timeout = window.setTimeout(() => setWaveState(null), totalDurationMs);

    return () => window.clearTimeout(timeout);
  }, [waveState]);

  const total = grid.cols * grid.rows;

  const tileStride = useMemo(() => tileSize + tileGap, [tileGap, tileSize]);

  return (
    <div
      ref={containerRef}
      className="tile-bg-container"
      style={{
        gridTemplateColumns: `repeat(${grid.cols}, var(--tile-size))`,
        gridAutoRows: `var(--tile-size)`,
        gap: `var(--tile-gap)`,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="tile"
          style={createTileStyle({
            index: i,
            color: tileColor,
            grid,
            waveState,
            tileStride,
          })}
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

interface CreateTileStyleArgs {
  index: number;
  color: string;
  grid: GridSize;
  waveState: WaveState | null;
  tileStride: number;
}

function createTileStyle({ index, color, grid, waveState, tileStride }: CreateTileStyleArgs) {
  const baseStyle = {
    '--tile-base-color': color,
  } as React.CSSProperties;

  if (!waveState || !grid.cols) {
    return baseStyle;
  }

  const delaySeconds = computeDelaySeconds(index, waveState.origin, grid.cols, tileStride);

  return {
    ...baseStyle,
    transitionDelay: `${delaySeconds}s`,
    transitionDuration: `${COLOR_TRANSITION_SECONDS}s`,
  };
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

function computeMaxDelay(origin: GridPosition, grid: GridSize, tileSize: number, tileGap: number) {
  const tileStride = tileSize + tileGap;
  const corners: GridPosition[] = [
    { row: 0, col: 0 },
    { row: 0, col: grid.cols - 1 },
    { row: grid.rows - 1, col: 0 },
    { row: grid.rows - 1, col: grid.cols - 1 },
  ];

  const maxDistance = corners.reduce((acc, position) => {
    const dx = (position.col - origin.col) * tileStride;
    const dy = (position.row - origin.row) * tileStride;
    const distance = Math.hypot(dx, dy);
    return Math.max(acc, distance);
  }, 0);

  return maxDistance * DELAY_PER_PIXEL;
}

export default TileBackground;
