import { useEffect, useState } from 'react';
import type { FeedPost } from '@/components/blogTypes';
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

    fetchPosts();

    return () => {
      isMounted = false;
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
      <ul className="flex flex-col gap-6">
        {posts.map((post) => {
          const id = post.guid ?? post.link ?? post.title ?? Math.random().toString(36);
          const publishedOn = formatDate(post.pubDate ?? undefined);
          const preview = buildExcerpt(post.description);
          const isTitleHovered = hoveredCard === id && authorHover !== id;

          return (
            <li
              key={id}
              className="blog-card border border-t-[color:var(--card-border)] bg-[var(--card-bg)] cursor-pointer"
              onClick={() => onSelect?.(post)}
              onMouseEnter={() => setHoveredCard(id)}
              onMouseLeave={() => {
                setHoveredCard(null);
                setAuthorHover(null);
              }}
            >
              <div className="flex flex-col gap-2">
                <h3
                  className={`blog-card__title text-lg font-semibold text-[color:var(--primary)] underline-fill w-fit ${
                    isTitleHovered ? 'is-hovered' : ''
                  }`}
                >
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[color:var(--muted-text,#9ca3af)]">
                  {publishedOn && <span>{publishedOn}</span>}
                  <span>&bull;</span>
                  <a
                    href="https://jacobmurrah.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-fill"
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={() => setAuthorHover(id)}
                    onMouseLeave={() => setAuthorHover(null)}
                  >
                    Jacob Murrah
                  </a>
                </div>
                {preview && (
                  <div
                    className="leading-relaxed text-[color:var(--text)]"
                    dangerouslySetInnerHTML={{ __html: preview }}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
