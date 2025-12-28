import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import './palette.css';
import { applyInitialTheme } from './themeToggle';
import { applyInitialFont } from './fontToggle';
import { router } from './app/routes';

document.documentElement.classList.add('app-loading');
document.body.classList.add('scrollbar');
applyInitialFont();
applyInitialTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

document.documentElement.classList.remove('app-loading');
