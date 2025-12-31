import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getCachedBlogPosts } from './feedService';
import { getPostPath, getPostSlug } from './postRouting';
import type { FeedPost } from './types';
import './BlogFeed.css';

const formatDate = (value: string) => {
  if (!value) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
};

const getPostId = (post: FeedPost, slug: string) => post.guid || post.link || slug;

export default function BlogFeed() {
  const posts = useMemo(() => getCachedBlogPosts(), []);

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
          const id = getPostId(post, slug);
          const publishedOn = formatDate(post.pubDate);

          return (
            <li key={id}>
              <Link
                to={getPostPath(post)}
                className="blog-card block w-full border-t-2 border-[var(--border)] bg-[var(--surface)] p-3"
                aria-label={post.title ? `Read ${post.title}` : 'Read blog post'}
              >
                <div className="flex justify-between">
                  <h3 className="blog-card__title text-lg font-semibold text-[color:var(--primary)]">
                    <span className="underline-fill">{post.title}</span>
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
