import { lazy, Suspense } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

const BlogFeed = lazy(() => import('@/components/Blog/BlogFeed'));

export default function BlogContent() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BlogFeed />
    </Suspense>
  );
}
