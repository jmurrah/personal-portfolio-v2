import { ALL_ASSET_PATHS } from '@/assets';
import { usePreloadImages } from '@/hooks/usePreloadImages';

export default function PreloadAssets() {
  usePreloadImages(ALL_ASSET_PATHS);

  return null;
}
