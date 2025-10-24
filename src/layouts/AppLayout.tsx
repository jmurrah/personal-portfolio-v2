import { Outlet } from 'react-router-dom';
import TileBackground from '@/components/TileBackground';
import PreloadAssets from '@/components/PreloadAssets';

export default function AppLayout() {
  return (
    <>
      <TileBackground tileSize={60} tileGap={0} fadeDuration="0.75s" />
      <PreloadAssets />
      <main className="flex justify-center items-center custom-margin w-full">
        <div className="w-full max-w-2xl p-4 min-h-fit relative">
          <Outlet />
        </div>
      </main>
    </>
  );
}
