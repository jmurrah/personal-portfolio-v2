import './palette.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Writing from '@/pages/Writing';
import Resume from '@/pages/Resume';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="writing" element={<Writing />} />
        <Route path="resume" element={<Resume />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
