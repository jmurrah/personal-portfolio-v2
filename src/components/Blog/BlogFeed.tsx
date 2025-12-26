import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { FeedPost } from './types';
import { getCachedBlogPosts, loadBlogPosts } from './feedService';
import { getPostPath, getPostSlug } from './postRouting';
import './BlogFeed.css';

function formatDate(value?: string | null) {
  if (!value) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
}

export default function BlogFeed() {
  const cachedPosts = useMemo(() => getCachedBlogPosts(), []);
  const [posts, setPosts] = useState<FeedPost[]>(cachedPosts ?? []);
  const [loading, setLoading] = useState(!cachedPosts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const hasCachedPosts = cachedPosts !== null;

    async function fetchPosts() {
      setError(null);
      if (!hasCachedPosts) {
        setLoading(true);
      }
      try {
        const items = await loadBlogPosts();
        if (isMounted) setPosts(items);
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

    function handleReady() {
      if (!isMounted) return;
      fetchPosts();
    }

    if (document.readyState === 'complete') {
      handleReady();
    } else {
      window.addEventListener('load', handleReady, { once: true });
    }

    return () => {
      isMounted = false;
      window.removeEventListener('load', handleReady);
    };
  }, [cachedPosts]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div className="text-[color:var(--danger)]">{error}</div>;
  }

  if (!posts.length) {
    return <div>No posts found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p>
        All posts come from my{' '}
        <a
          className="underline-fill"
          href="https://jacobmurrah.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation?.()}
        >
          Substack
        </a>
        . Read them here or at the source!
      </p>
      <ul className="flex flex-col">
        {posts.map((post) => {
          const slug = getPostSlug(post);
          const id = post.guid ?? post.link ?? slug;
          const publishedOn = formatDate(post.pubDate ?? undefined);

          return (
            <li key={id}>
              <Link
                to={getPostPath(post)}
                className="blog-card block w-full border-t-2 border-[var(--border)] bg-[var(--surface)] p-3"
                aria-label={post.title ? `Read ${post.title}` : 'Read blog post'}
              >
                <div className="flex justify-between">
                  <h3 className="blog-card__title text-lg font-semibold text-[color:var(--primary)] underline-fill w-fit">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-base text-[color:var(--text-muted)]">
                    {publishedOn && <span>{publishedOn}</span>}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
