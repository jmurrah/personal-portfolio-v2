import prerendered from '@/constants/prerenderedPosts.json';
import type { FeedPost } from './types';

const cachedPosts: FeedPost[] = Array.isArray((prerendered as { items?: FeedPost[] }).items)
  ? (prerendered as { items: FeedPost[] }).items
  : [];

export function loadBlogPosts(): Promise<FeedPost[]> {
  return Promise.resolve(cachedPosts);
}

export function getCachedBlogPosts() {
  return cachedPosts;
}
