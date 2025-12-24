import './palette.css';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import Education from '@/pages/Education';
import Experience from '@/pages/Experience';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import AppLayout from '@/layouts/AppLayout';

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
  return (
    <BrowserRouter basename={basename}>
      <RedirectHandler />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<Experience />} />
          <Route path="education" element={<Education />} />
          <Route path="projects" element={<Projects />} />
          <Route path="blog" element={<Blog />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
