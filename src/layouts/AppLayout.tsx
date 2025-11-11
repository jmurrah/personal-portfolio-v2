import { Outlet } from 'react-router-dom';
import TileBackground from '@/components/TileBackground';
import PreloadAssets from '@/components/PreloadAssets';
import LastUpdated from '@/components/LastUpdated/LastUpdated';

export default function AppLayout() {
  return (
    <>
      <TileBackground tileSize={40} tileGap={0} fadeDuration="0.5s" />
      <PreloadAssets />
      <main className="flex justify-center items-center custom-margin w-full">
        <div className="w-full max-w-2xl p-4 min-h-fit relative">
          <LastUpdated />
          <Outlet />
        </div>
      </main>
    </>
  );
}
