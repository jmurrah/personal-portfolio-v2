import { Navigate, createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'projects', element: <Projects /> },
        { path: 'blog', element: <Blog /> },
        { path: 'blog/:slug', element: <BlogPost /> },
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { basename },
);
