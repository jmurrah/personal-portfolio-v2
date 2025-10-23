import { useEffect } from 'react';

/**
 * Preloads the provided image paths as soon as the component mounts so that
 * subsequent renders can display them without network delay.
 */
export function usePreloadImages(imagePaths: readonly string[]) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const uniquePaths = Array.from(new Set(imagePaths)).filter(Boolean);
    const preloadedImages: HTMLImageElement[] = [];

    uniquePaths.forEach((path) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = path;
      preloadedImages.push(img);
    });

    return () => {
      preloadedImages.forEach((img) => {
        img.src = '';
      });
    };
  }, [imagePaths]);
}

