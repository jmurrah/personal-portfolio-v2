import prerendered from '@/constants/prerenderedPosts.json';
import type { FeedPost } from './types';

// Posts are bundled at build time; no runtime fetch
const cachedPosts: FeedPost[] = Array.isArray((prerendered as { items?: FeedPost[] }).items)
  ? (prerendered as { items: FeedPost[] }).items
  : [];

export function loadBlogPosts(): Promise<FeedPost[]> {
  return Promise.resolve(cachedPosts);
}

export function prefetchBlogPosts() {
  // No-op; posts already in bundle
  return;
}

export function getCachedBlogPosts() {
  return cachedPosts;
}
