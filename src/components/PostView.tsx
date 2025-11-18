import type { FeedPost } from '@/components/blogTypes';
import './PostView.css';

interface PostViewProps {
  post: FeedPost;
  onBack: () => void;
}

function formatDate(value?: string | null) {
  if (!value) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
}

function stripHtml(html?: string | null) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function cleanContent(html?: string | null) {
  if (!html) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  doc.querySelectorAll('.subscription-widget, .subscription-widget-wrap, .subscription-widget-wrap-editor').forEach((el) => el.remove());
  return doc.body.innerHTML;
}

export default function PostView({ post, onBack }: PostViewProps) {
  const publishedOn = formatDate(post.pubDate);
  const rawContent = post.content ?? post.description ?? '';
  const content = cleanContent(rawContent);
  const subtitle = stripHtml(post.description ?? '').trim();
  const author = post.author;

  return (
    <article className="post-view">
      <div className="post-shell">
        <div className="post-topbar">
          <button type="button" onClick={onBack} className="post-link-btn underline-fill">
            ← Back to posts
          </button>
          {post.link && (
            <a
              className="post-link-btn underline-fill"
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read on Substack
            </a>
          )}
        </div>

        <header className="post-header">
          <div className="post-title-block">
            {post.link ? (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="post-title-link underline-fill"
              >
                {post.title}
              </a>
            ) : (
              <h1 className="post-title">{post.title}</h1>
            )}
            {subtitle && <p className="post-subtitle">{subtitle}</p>}
          </div>
          <div className="post-byline">
            <a
              className="post-author underline-fill"
              href="https://jacobmurrah.substack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {author}
            </a>
            {publishedOn && <div className="post-date">{publishedOn}</div>}
          </div>
        </header>

        <hr className="post-divider" />

        <section
          className="post-content"
          dangerouslySetInnerHTML={{ __html: content }}
          aria-label="Post content"
        />

        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="post-link-btn post-bottom-link underline-fill"
          >
            Read on Substack
          </a>
        )}
      </div>
    </article>
  );
}
