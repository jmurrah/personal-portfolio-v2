import type { FeedPost } from './types';

const FALLBACK_SLUG = 'post';

function formatDateSlug(value?: string | null) {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const year = String(parsed.getFullYear());
  return `${month}.${year}`;
}

function getTitleAcronym(title?: string | null) {
  if (!title) return '';
  const words = title.match(/[a-z0-9]+(?:'[a-z0-9]+)*/gi) ?? [];
  return words
    .map((word) => word[0])
    .join('')
    .toLowerCase();
}

function slugifyFallback(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getPostSlug(post: FeedPost) {
  const titleSlug = getTitleAcronym(post.title);
  const dateSlug = formatDateSlug(post.pubDate);
  const combined = [titleSlug, dateSlug].filter(Boolean).join('-');
  if (combined) return combined;

  const fallbackSource = post.guid ?? post.link ?? post.pubDate ?? '';
  const fallbackSlug = slugifyFallback(fallbackSource);
  return fallbackSlug || FALLBACK_SLUG;
}

export function getPostPath(post: FeedPost) {
  return `/blog/${getPostSlug(post)}`;
}
