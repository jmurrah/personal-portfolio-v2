import './palette.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Resume from '@/pages/Resume';
import AppLayout from '@/layouts/AppLayout';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<Home />} />
          <Route path="experience" element={<Home />} />
          <Route path="education" element={<Home />} />
          <Route path="projects" element={<Home />} />
          <Route path="blog" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}
