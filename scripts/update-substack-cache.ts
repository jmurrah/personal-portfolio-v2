import fs from 'node:fs';
import path from 'node:path';

const RSS_BRIDGE_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://jacobmurrah.substack.com/feed';
const CACHE_PATH = path.join(process.cwd(), 'src', 'constants', 'prerenderedPosts.json');
const OUTPUT_SPACES = 2;

type Enclosure = { link: string; type: string };

export type CacheItem = {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: Enclosure;
  categories: string[];
};

type CacheFile = { items: CacheItem[] };

type BridgeItem = {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: Enclosure;
  categories: string[];
};

type BridgeResponse = {
  status: string;
  feed: Record<string, unknown>;
  items: BridgeItem[];
};

function readFileSafe(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return JSON.stringify({ items: [] });
  }
}

function formatDateUTC(value: string | number | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    console.warn(`Invalid date encountered: ${value}. Using current time.`);
    return formatDateUTC(new Date());
  }
  const pad = (n: number) => String(n).padStart(2, '0');
  return [
    date.getUTCFullYear(),
    '-',
    pad(date.getUTCMonth() + 1),
    '-',
    pad(date.getUTCDate()),
    ' ',
    pad(date.getUTCHours()),
    ':',
    pad(date.getUTCMinutes()),
    ':',
    pad(date.getUTCSeconds()),
  ].join('');
}

async function fetchFeedViaBridge(): Promise<BridgeItem[]> {
  console.log(`Fetching feed via RSS Bridge: ${RSS_BRIDGE_URL}...`);

  const response = await fetch(RSS_BRIDGE_URL);

  if (!response.ok) {
    throw new Error(`Bridge fetch failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as BridgeResponse;

  if (data.status !== 'ok') {
    throw new Error(`Bridge returned error status: ${JSON.stringify(data)}`);
  }

  return data.items || [];
}

function mapBridgeItemToCache(item: BridgeItem): CacheItem {
  return {
    title: (item.title || '').trim(),
    pubDate: formatDateUTC(item.pubDate),
    link: (item.link || '').trim(),
    guid: (item.guid || item.link || '').trim(),
    author: (item.author || 'Jacob Murrah').trim(),
    thumbnail: (item.thumbnail || '').trim(),
    description: (item.description || '').trim(),
    content: (item.content || item.description || '').trim(),
    enclosure: item.enclosure || { link: '', type: '' },
    categories: Array.isArray(item.categories) ? item.categories : [],
  };
}

function validateCacheObject(obj: unknown, label: string): asserts obj is CacheFile {
  if (typeof obj !== 'object' || obj === null) throw new Error(`${label}: root is not an object`);
  if (!Object.prototype.hasOwnProperty.call(obj, 'items'))
    throw new Error(`${label}: missing "items" key`);
}

function sortItems(items: CacheItem[]) {
  return [...items].sort((a, b) => {
    const dateA = new Date(`${a.pubDate}Z`).getTime();
    const dateB = new Date(`${b.pubDate}Z`).getTime();
    if (dateA !== dateB) return dateB - dateA;
    return a.guid.localeCompare(b.guid);
  });
}

function mergeItems(existingItems: CacheItem[], bridgeItems: CacheItem[]) {
  const existingByGuid = new Set(existingItems.map((item) => item.guid));
  const newOnes = bridgeItems.filter((item) => !existingByGuid.has(item.guid));
  return { merged: sortItems([...existingItems, ...newOnes]), addedCount: newOnes.length };
}

async function main() {
  const cacheText = readFileSafe(CACHE_PATH);
  const cacheJson = JSON.parse(cacheText) as unknown;
  validateCacheObject(cacheJson, 'existing cache');

  console.log(`Existing cache items: ${cacheJson.items.length}`);

  const bridgeItems = await fetchFeedViaBridge();
  console.log(`Bridge returned items: ${bridgeItems.length}`);

  const mappedItems = bridgeItems.map(mapBridgeItemToCache);

  const { merged, addedCount } = mergeItems(cacheJson.items, mappedItems);
  console.log(`New items added: ${addedCount}`);

  const mergedObject: CacheFile = { items: merged };

  const output = `${JSON.stringify(mergedObject, null, OUTPUT_SPACES)}\n`;
  if (output === cacheText) {
    console.log('Cache is already up-to-date. No changes written.');
    return;
  }

  fs.writeFileSync(CACHE_PATH, output, 'utf8');
  console.log(`Cache updated at ${CACHE_PATH}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
