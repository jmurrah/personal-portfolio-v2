import { Outlet } from 'react-router-dom';
import PreloadAssets from '@/components/PreloadAssets';

export default function AppLayout() {
  return (
    <>
      <PreloadAssets />
      <main className="flex justify-center items-center custom-margin w-full">
        <div className="w-full max-w-3xl p-4 min-h-fit relative">
          <Outlet />
        </div>
      </main>
    </>
  );
}
