import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { getCachedBlogPosts, loadBlogPosts } from '@/components/Blog/feedService';
import { getPostSlug } from '@/components/Blog/postRouting';
import PostView from '@/components/Blog/PostView';
import type { FeedPost } from '@/components/Blog/types';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const cachedPosts = useMemo(() => getCachedBlogPosts(), []);
  const [posts, setPosts] = useState<FeedPost[]>(cachedPosts ?? []);
  const [loading, setLoading] = useState(!cachedPosts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      setError(null);
      try {
        const items = await loadBlogPosts();
        if (isMounted) {
          setPosts(items);
        }
      } catch (err) {
        console.error('Failed to load RSS feed', err);
        if (isMounted) {
          setError('Unable to load posts right now.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedSlug = (slug ?? '').toLowerCase();
  const post = useMemo(
    () => posts.find((item) => getPostSlug(item) === normalizedSlug),
    [posts, normalizedSlug],
  );

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  if (loading) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return <div className="text-[color:var(--danger)]">{error}</div>;
  }

  if (!post) {
    return (
      <section className="flex flex-col gap-3">
        <h1>Post not found</h1>
        <p>This post is no longer available.</p>
        <Link className="underline-fill w-fit" to="/blog">
          Back to the blog
        </Link>
      </section>
    );
  }

  return (
    <section>
      <PostView post={post} onBack={() => navigate('/blog')} />
    </section>
  );
}
