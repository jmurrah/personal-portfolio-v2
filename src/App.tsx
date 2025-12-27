import './palette.css';
import { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import AppRoutes from '@/app/routes';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedPath = sessionStorage.getItem('redirect-path');
    if (storedPath) {
      sessionStorage.removeItem('redirect-path');
      navigate(storedPath, { replace: true });
    }
  }, [navigate]);

  return null;
}

export default function App() {
  useEffect(() => {
    const schedule =
      (window as typeof window & { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 0));

    schedule(() => {
      // Preload blog data and route chunk without blocking render
      void import('@/components/Blog/feedService').then(({ prefetchBlogPosts }) => {
        prefetchBlogPosts();
      });
      void import('@/pages/Blog');
      // Warm the blog HTML in the browser cache so navigation is instant
      void fetch('/blog', { cache: 'force-cache', credentials: 'same-origin' }).catch(() => {});
    });
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <RedirectHandler />
      <AppRoutes />
    </BrowserRouter>
  );
}
