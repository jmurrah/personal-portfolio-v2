import { Outlet } from 'react-router-dom';
export default function AppLayout() {
  return (
    <>
      <main className="flex justify-center">
        <div className="w-full max-w-3xl p-4">
          <Outlet />
        </div>
      </main>
    </>
  );
}
