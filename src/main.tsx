import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { applyInitialTheme } from './themeToggle';
import { applyInitialFont } from './fontToggle';

// Prevent flash of unstyled/theme-less content until app mounts.
document.documentElement.classList.add('app-loading');
applyInitialFont();
applyInitialTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

document.documentElement.classList.remove('app-loading');
