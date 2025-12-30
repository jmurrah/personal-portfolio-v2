import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './palette.css';
import { applyInitialTheme } from './themeToggle';
import { applyInitialFont } from './fontToggle';
import App from './App';

document.documentElement.classList.add('app-loading');
document.body.classList.add('scrollbar');
applyInitialFont();
applyInitialTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

document.documentElement.classList.remove('app-loading');
