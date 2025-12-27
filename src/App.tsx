import './palette.css';
import { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import AppRoutes from '@/app/routes';
import { loadBlogPosts } from '@/components/Blog/feedService';

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
    loadBlogPosts().catch((error) => {
      console.warn('Blog prefetch failed; will retry on demand.', error);
    });
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <RedirectHandler />
      <AppRoutes />
    </BrowserRouter>
  );
}
