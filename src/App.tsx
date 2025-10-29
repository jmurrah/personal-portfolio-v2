import './palette.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Blog from '@/pages/Blog';
import Resume from '@/pages/Resume';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import AppLayout from '@/layouts/AppLayout';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}
