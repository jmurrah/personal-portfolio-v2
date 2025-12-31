import prerendered from '@/constants/prerenderedPosts.json';
import type { FeedPost } from './types';

type RawPost = Partial<Record<keyof FeedPost, unknown>>;

const toStringValue = (value: unknown) => (typeof value === 'string' ? value : '');

const normalizePost = (post: RawPost): FeedPost => ({
  title: toStringValue(post.title),
  link: toStringValue(post.link),
  pubDate: toStringValue(post.pubDate),
  description: toStringValue(post.description),
  content: toStringValue(post.content),
  guid: toStringValue(post.guid),
  author: toStringValue(post.author),
  thumbnail: toStringValue(post.thumbnail),
});

const cachedPosts: FeedPost[] = Array.isArray((prerendered as { items?: RawPost[] }).items)
  ? (prerendered as { items: RawPost[] }).items.map(normalizePost)
  : [];

export function loadBlogPosts(): Promise<FeedPost[]> {
  return Promise.resolve(cachedPosts);
}

export function getCachedBlogPosts(): FeedPost[] {
  return cachedPosts;
}
