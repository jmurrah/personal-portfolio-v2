import type { FeedPost } from './types';

const FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://jacobmurrah.substack.com/feed';

let cachedPosts: FeedPost[] | null = null;
let inFlight: Promise<FeedPost[]> | null = null;

async function requestPosts(): Promise<FeedPost[]> {
  const res = await fetch(FEED_URL);
  if (!res.ok) {
    throw new Error(`Feed request failed: ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data?.items) ? data.items : [];
}

export function loadBlogPosts(): Promise<FeedPost[]> {
  if (cachedPosts) return Promise.resolve(cachedPosts);
  if (inFlight) return inFlight;

  inFlight = requestPosts()
    .then((posts) => {
      cachedPosts = posts;
      return posts;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}

export function prefetchBlogPosts() {
  void loadBlogPosts();
}

export function getCachedBlogPosts() {
  return cachedPosts;
}
