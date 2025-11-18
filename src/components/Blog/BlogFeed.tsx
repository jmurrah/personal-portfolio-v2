import { useEffect, useState } from 'react';
import type { FeedPost } from './types';
import './BlogFeed.css';

interface BlogFeedProps {
  onSelect?: (post: FeedPost) => void;
  selectedGuid?: string | null;
}

function formatDate(value?: string | null) {
  if (!value) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
}

function buildExcerpt(html?: string | null) {
  if (!html) return '';
  const trimmed = html.slice(0, 240);
  return html.length > 240 ? `${trimmed}...` : trimmed;
}

export default function BlogFeed({ onSelect, selectedGuid }: BlogFeedProps) {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [authorHover, setAuthorHover] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://jacobmurrah.substack.com/feed',
        );
        if (!res.ok) throw new Error(`Feed request failed: ${res.status}`);
        const data = await res.json();
        if (isMounted) setPosts(data.items || []);
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
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!posts.length) {
    return <div>No posts found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[color:var(--text)]">
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
      <ul className="flex flex-col gap-6">
        {posts.map((post) => {
          const id = post.guid ?? post.link ?? post.title ?? Math.random().toString(36);
          const publishedOn = formatDate(post.pubDate ?? undefined);
          const preview = buildExcerpt(post.description);
          const isTitleHovered = hoveredCard === id && authorHover !== id;

          return (
            <li
              key={id}
              className="blog-card border-t-2 border-[color:var(--card-border,#e5e7eb)] bg-[var(--card-bg,#0f1115)] p-3 cursor-pointer"
              onClick={() => onSelect?.(post)}
              onMouseEnter={() => setHoveredCard(id)}
              onMouseLeave={() => {
                setHoveredCard(null);
                setAuthorHover(null);
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
                <div className="flex items-center gap-2 text-base color-[var(--text)]">
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
