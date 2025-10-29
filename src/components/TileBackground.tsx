import React, { useEffect, useRef, useState } from 'react';
import '../tileBackground.css';

interface TileBackgroundProps {
  tileSize?: number;
  tileGap?: number;
  fadeDuration?: string;
}

const TileBackground: React.FC<TileBackgroundProps> = ({
  tileSize = 16,
  tileGap = 0,
  fadeDuration = '10s',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });

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

  const total = grid.cols * grid.rows;

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
        <div key={i} className="tile" />
      ))}
    </div>
  );
};

export default TileBackground;
