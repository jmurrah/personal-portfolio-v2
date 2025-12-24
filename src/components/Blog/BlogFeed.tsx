import { useEffect, useMemo, useState } from 'react';
import type { FeedPost } from './types';
import { getCachedBlogPosts, loadBlogPosts } from './feedService';
import './BlogFeed.css';

interface BlogFeedProps {
  onSelect?: (post: FeedPost) => void;
}

function formatDate(value?: string | null) {
  if (!value) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
}

export default function BlogFeed({ onSelect }: BlogFeedProps) {
  const cachedPosts = useMemo(() => getCachedBlogPosts(), []);
  const [posts, setPosts] = useState<FeedPost[]>(cachedPosts ?? []);
  const [loading, setLoading] = useState(!cachedPosts);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
          const id = post.guid ?? post.link ?? post.title ?? Math.random().toString(36);
          const publishedOn = formatDate(post.pubDate ?? undefined);
          const isTitleHovered = hoveredCard === id;

          return (
            <li
              key={id}
              className="blog-card border-t-2 border-[var(--border)] bg-[var(--surface)] p-3 cursor-pointer"
              onClick={() => onSelect?.(post)}
              onMouseEnter={() => setHoveredCard(id)}
              onMouseLeave={() => {
                setHoveredCard(null);
              }}
            >
              <div className="flex justify-between">
                <h3
                  className={`blog-card__title text-lg font-semibold text-[color:var(--primary)] underline-fill w-fit ${
                    isTitleHovered ? 'is-hovered' : ''
                  }`}
                >
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-base text-[color:var(--text-muted)]">
                  {publishedOn && <span>{publishedOn}</span>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
