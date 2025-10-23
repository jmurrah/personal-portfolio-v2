import { Outlet } from 'react-router-dom';
import PreloadAssets from '@/components/PreloadAssets';

export default function AppLayout() {
  return (
    <>
      <PreloadAssets />
      <main className="flex justify-center items-center w-full custom-margin">
        <div className="w-full max-w-2xl p-4 min-h-fit">
          <Outlet />
        </div>
      </main>
    </>
  );
}
