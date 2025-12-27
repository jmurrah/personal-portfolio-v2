import './palette.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import AppRoutes from '@/app/routes';
import { ALL_ASSET_PATHS } from '@/assets';
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

function waitForFonts() {
  if (typeof document === 'undefined' || !('fonts' in document)) {
    return Promise.resolve();
  }
  const fontsToLoad = [
    '400 1em Geist',
    '600 1em Geist',
    '400 1em General Sans',
    '600 1em General Sans',
  ];
  const readiness = (document as Document & { fonts: FontFaceSet }).fonts.ready;
  const specificLoads = fontsToLoad.map((descriptor) =>
    (document as Document & { fonts: FontFaceSet }).fonts.load(descriptor).catch(() => undefined),
  );
  return Promise.all([readiness, ...specificLoads]).then(() => undefined);
}

function preloadImagesStrict(imagePaths: readonly string[]) {
  const uniquePaths = Array.from(new Set(imagePaths)).filter(Boolean);
  const tasks = uniquePaths.map(
    (path) =>
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to preload: ${path}`));
        img.src = path;
      }),
  );
  return Promise.all(tasks).then(() => undefined);
}

async function prepareApplication(): Promise<{ error?: string }> {
  try {
    await Promise.all([waitForFonts(), preloadImagesStrict(ALL_ASSET_PATHS), loadBlogPosts()]);
    return {};
  } catch (error) {
    console.error(error);
    return { error: 'Some assets failed to preload. Content may take a moment to appear.' };
  }
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    prepareApplication().then(({ error }) => {
      if (!isMounted) return;
      if (error) {
        // Surface preload issues to the console but proceed to render.
        console.warn(error);
      }
      setIsReady(true);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <RedirectHandler />
      {isReady ? <AppRoutes /> : <LoadingScreen />}
    </BrowserRouter>
  );
}
