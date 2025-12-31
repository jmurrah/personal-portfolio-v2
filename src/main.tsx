import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './palette.css';
import { applyInitialTheme } from './themeToggle';
import { applyInitialFont } from './fontToggle';
import App from './App';

const bootstrap = () => {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.add('app-loading');
  document.body.classList.add('scrollbar');
  applyInitialFont();
  applyInitialTheme();

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element #root not found.');
    return;
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  document.documentElement.classList.remove('app-loading');
};

bootstrap();
