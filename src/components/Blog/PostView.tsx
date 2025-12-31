import type { FeedPost } from './types';
import './PostView.css';

interface PostViewProps {
  post: FeedPost;
  onBack: () => void;
}

const formatDate = (value: string) => {
  if (!value) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
};

const stripHtml = (html: string) => {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const getFootnoteNumberFromHref = (href: string | null | undefined) => {
  if (!href) return null;
  const match = href.match(/#footnote(?:-anchor)?-(\d+)/);
  return match?.[1] ?? null;
};

const normalizeFootnotes = (doc: Document) => {
  doc.querySelectorAll('a.footnote-anchor').forEach((link) => {
    const number = getFootnoteNumberFromHref(link.getAttribute('href')) ?? link.textContent?.trim();
    if (!number) return;
    link.setAttribute('href', `#footnote-${number}`);
    if (!link.id) link.id = `footnote-anchor-${number}`;
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });

  doc.querySelectorAll('.footnote').forEach((footnote) => {
    const numberLink = footnote.querySelector('a.footnote-number');
    const number =
      getFootnoteNumberFromHref(numberLink?.getAttribute('href')) ??
      numberLink?.textContent?.trim();
    if (!number || footnote.id) return;
    footnote.id = `footnote-${number}`;
  });

  doc.querySelectorAll('a.footnote-number').forEach((link) => {
    const number = getFootnoteNumberFromHref(link.getAttribute('href')) ?? link.textContent?.trim();
    if (!number) return;
    link.setAttribute('href', `#footnote-anchor-${number}`);
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });
};

const cleanContent = (html: string) => {
  if (!html) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  doc
    .querySelectorAll(
      '.subscription-widget, .subscription-widget-wrap, .subscription-widget-wrap-editor',
    )
    .forEach((el) => el.remove());
  doc.querySelectorAll('.image-link-expand, .restack-image, .view-image').forEach((el) => {
    el.remove();
  });
  normalizeFootnotes(doc);
  doc.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) {
      link.removeAttribute('target');
      link.removeAttribute('rel');
      return;
    }
    link.setAttribute('target', '_blank');
    const existingRel = link.getAttribute('rel') ?? '';
    const relTokens = new Set(existingRel.split(/\s+/).filter(Boolean));
    relTokens.add('noopener');
    relTokens.add('noreferrer');
    link.setAttribute('rel', Array.from(relTokens).join(' '));
  });
  return doc.body.innerHTML;
};

export default function PostView({ post, onBack }: PostViewProps) {
  const publishedOn = formatDate(post.pubDate);
  const rawContent = post.content || post.description || '';
  const content = cleanContent(rawContent);
  const subtitle = stripHtml(post.description).trim();

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
                className="post-title-link"
              >
                <span className="underline-fill">{post.title}</span>
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
              {post.author}
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
