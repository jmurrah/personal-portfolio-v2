import { useEffect } from 'react';

const IMAGE_PATHS = [
  '/logos/AuburnLogo.webp',
  '/logos/GTechLogo.webp',
  '/logos/AuburnEngineeringLogo.webp',
  '/logos/AT&TLogo.webp',
  '/logos/AdtranLogo.webp',
  '/logos/IS4SLogo.webp',
  '/icons/SunIcon.svg',
  '/icons/MoonIcon.svg',
];

export default function PreloadAssets() {
  useEffect(() => {
    IMAGE_PATHS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return null;
}
