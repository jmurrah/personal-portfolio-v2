import { Outlet } from 'react-router-dom';
export default function AppLayout() {
  return (
    <>
      <main className="w-full max-w-6xl mx-auto px-8">
        <Outlet />
      </main>
    </>
  );
}
