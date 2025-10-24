// src/components/TileBackground.tsx

import React, { useEffect, useRef } from 'react';
import '../tileBackground.css'; // adjust path if needed

interface TileBackgroundProps {
  tileSize?: number;
  tileGap?: number;
  tileBg?: string;
  hoverColor?: string;
  fadeDuration?: string;
}

const TileBackground: React.FC<TileBackgroundProps> = ({
  tileSize = 16,
  tileGap = 0,
  fadeDuration = '1s',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const setStyles = () => {
      document.documentElement.style.setProperty('--tile-size', `${tileSize}px`);
      document.documentElement.style.setProperty('--tile-gap', `${tileGap}px`);
      document.documentElement.style.setProperty('--fade-duration', fadeDuration);
    };
    setStyles();

    const cols = Math.ceil(window.innerWidth / (tileSize + tileGap));
    const rows = Math.ceil(window.innerHeight / (tileSize + tileGap));
    const total = cols * rows;

    // Clear existing if any
    container.innerHTML = '';

    for (let i = 0; i < total; i++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      container.append(tile);
    }

    const handleResize = () => {
      const newCols = Math.ceil(window.innerWidth / (tileSize + tileGap));
      const newRows = Math.ceil(window.innerHeight / (tileSize + tileGap));
      const newTotal = newCols * newRows;
      if (newTotal === container.children.length) return;
      // repopulate quickly
      container.innerHTML = '';
      for (let i = 0; i < newTotal; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        container.append(tile);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [tileSize, tileGap, fadeDuration]);

  return <div ref={containerRef} className="tile-bg-container" />;
};

export default TileBackground;
