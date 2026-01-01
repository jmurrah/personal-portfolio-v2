import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const FEED_URL = 'https://jacobmurrah.substack.com/feed';
const CACHE_PATH = path.join(process.cwd(), 'src', 'constants', 'prerenderedPosts.json');
const OUTPUT_SPACES = 2;
const PUBDATE_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

const CRAWLER_BUDDY_BASE_URL = (process.env.CRAWLER_BUDDY_BASE_URL ?? '').trim();
const CRAWLER_BUDDY_CRAWLER = (process.env.CRAWLER_BUDDY_CRAWLER ?? 'SeleniumUndetected').trim();
const CRAWLER_BUDDY_TIMEOUT_S = Number(process.env.CRAWLER_BUDDY_TIMEOUT_S ?? 45);

const FEED_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
};

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

type RssItem = Record<string, unknown>;

type CrawlerBuddySegment = { name?: string; data?: unknown };

const requiredKeys: (keyof CacheItem)[] = [
  'title',
  'pubDate',
  'link',
  'guid',
  'author',
  'thumbnail',
  'description',
  'content',
  'enclosure',
  'categories',
];

function readFileSafe(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8');
}

function asString(value: unknown): string {
  if (value === undefined || value === null) return '';
  return String(value);
}

function extractText(node: unknown): string {
  if (node === undefined || node === null) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'object') {
    const obj = node as Record<string, unknown>;
    return (
      (obj.__cdata as string | undefined) ??
      (obj.cdata as string | undefined) ??
      (obj['#text'] as string | undefined) ??
      (typeof obj.text === 'string' ? obj.text : '') ??
      ''
    );
  }
  return '';
}

function formatDateUTC(value: string | number | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${value}`);
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

function mustHaveCrawlerBuddy(): string {
  if (!CRAWLER_BUDDY_BASE_URL) {
    throw new Error(
      'Crawler-Buddy not configured. Set CRAWLER_BUDDY_BASE_URL (e.g. http://localhost:3028).',
    );
  }
  return CRAWLER_BUDDY_BASE_URL.replace(/\/+$/, '');
}

function buildCrawlerBuddyUrl(endpoint: string, targetUrl: string): string {
  const base = mustHaveCrawlerBuddy();
  const u = new URL(endpoint.startsWith('/') ? endpoint : `/${endpoint}`, base);

  u.searchParams.set('url', targetUrl);
  u.searchParams.set('crawler_name', CRAWLER_BUDDY_CRAWLER);
  u.searchParams.set('crawler', CRAWLER_BUDDY_CRAWLER);
  u.searchParams.set(
    'timeout_s',
    String(Number.isFinite(CRAWLER_BUDDY_TIMEOUT_S) ? CRAWLER_BUDDY_TIMEOUT_S : 45),
  );
  u.searchParams.set('accept_types', 'application/rss+xml,application/xml,text/xml');
  u.searchParams.set('ssl_verify', 'true');
  u.searchParams.set('bytes_limit', String(5_000_000));
  u.searchParams.set('User-Agent', FEED_HEADERS['User-Agent']);

  return u.toString();
}

function extractStreamsText(getjJson: unknown): string {
  if (!Array.isArray(getjJson)) return '';
  const segments = getjJson as CrawlerBuddySegment[];
  const streams = segments.find((s) => s?.name === 'Streams')?.data as
    | Record<string, unknown>
    | undefined;
  const text = streams?.Text;
  return typeof text === 'string' ? text : '';
}

async function fetchFeedViaCrawlerBuddy(feedUrl: string): Promise<string> {
  const contentsrUrl = buildCrawlerBuddyUrl('/contentsr', feedUrl);
  const r1 = await fetch(contentsrUrl, { redirect: 'follow' });

  if (r1.ok) {
    return await r1.text();
  }

  const getjUrl = buildCrawlerBuddyUrl('/getj', feedUrl);
  const r2 = await fetch(getjUrl, { redirect: 'follow' });

  if (!r2.ok) {
    throw new Error(
      `Crawler-Buddy failed: /contentsr -> ${r1.status} ${r1.statusText}, /getj -> ${r2.status} ${r2.statusText}`,
    );
  }

  const json = (await r2.json()) as unknown;
  const xml = extractStreamsText(json).trim();
  if (!xml) {
    throw new Error('Crawler-Buddy /getj returned no Streams.Text content (empty feed).');
  }
  return xml;
}

function parseRss(xmlText: string): RssItem[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    allowBooleanAttributes: true,
    trimValues: false,
    cdataPropName: '__cdata',
    removeNSPrefix: false,
  });
  const parsed = parser.parse(xmlText) as Record<string, unknown>;
  const channel = (parsed?.rss as Record<string, unknown> | undefined)?.channel as
    | Record<string, unknown>
    | undefined;
  if (!channel) {
    throw new Error('Invalid RSS: missing channel');
  }
  const items = channel.item;
  if (!items) return [];
  if (Array.isArray(items)) return items as RssItem[];
  return [items as RssItem];
}

function mapRssItemToCache(item: RssItem): CacheItem {
  const link = extractText(item.link).trim();
  const guidValue = extractText(item.guid).trim() || link;
  const pubDateRaw = extractText(item.pubDate).trim();
  const pubDate = formatDateUTC(pubDateRaw || Date.now());
  const description = extractText(item.description).trim();
  const contentEncoded = extractText((item as Record<string, unknown>)['content:encoded']);
  const content = contentEncoded || description || '';
  const author =
    extractText(
      (item as Record<string, unknown>).author ?? (item as Record<string, unknown>)['dc:creator'],
    ).trim() || 'Jacob Murrah';

  let enclosure: Enclosure = { link: '', type: '' };
  if (item.enclosure && typeof item.enclosure === 'object') {
    const enc = item.enclosure as Record<string, unknown>;
    const url = asString(enc.url ?? enc.href ?? '').trim();
    const type = asString(enc.type ?? '').trim();
    enclosure = { link: url, type };
  }

  const categories = (() => {
    const raw = (item as Record<string, unknown>).category;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.map((c) => extractText(c).trim()).filter(Boolean);
    const single = extractText(raw).trim();
    return single ? [single] : [];
  })();

  return {
    title: extractText(item.title).trim(),
    pubDate,
    link,
    guid: guidValue,
    author,
    thumbnail: '',
    description,
    content,
    enclosure,
    categories,
  };
}

function validateItems(items: CacheItem[], label: string) {
  if (!Array.isArray(items)) throw new Error(`${label}: items is not an array`);
  const seenGuids = new Set<string>();
  let prevDate: number | null = null;
  for (let i = 0; i < items.length; i += 1) {
    const entry = items[i];
    const prefix = `${label}[${i}]`;
    if (typeof entry !== 'object' || entry === null) {
      throw new Error(`${prefix}: entry is not an object`);
    }
    for (const key of requiredKeys) {
      if (!(key in entry)) throw new Error(`${prefix}: missing key "${key}"`);
    }
    for (const key of [
      'title',
      'pubDate',
      'link',
      'guid',
      'author',
      'thumbnail',
      'description',
      'content',
    ] as const) {
      if (typeof entry[key] !== 'string') {
        throw new Error(`${prefix}: ${key} is not a string (${typeof entry[key]})`);
      }
    }
    if (!PUBDATE_REGEX.test(entry.pubDate)) {
      throw new Error(`${prefix}: pubDate has invalid format "${entry.pubDate}"`);
    }
    if (typeof entry.enclosure !== 'object' || entry.enclosure === null) {
      throw new Error(`${prefix}: enclosure is not an object`);
    }
    if (typeof entry.enclosure.link !== 'string' || typeof entry.enclosure.type !== 'string') {
      throw new Error(`${prefix}: enclosure fields must be strings`);
    }
    if (!Array.isArray(entry.categories)) {
      throw new Error(`${prefix}: categories is not an array`);
    }
    entry.categories.forEach((cat, idx) => {
      if (typeof cat !== 'string') {
        throw new Error(`${prefix}: categories[${idx}] is not a string`);
      }
    });
    if (seenGuids.has(entry.guid)) {
      throw new Error(`${prefix}: duplicate guid "${entry.guid}"`);
    }
    seenGuids.add(entry.guid);

    const currentDate = new Date(`${entry.pubDate}Z`).getTime();
    if (Number.isNaN(currentDate)) {
      throw new Error(`${prefix}: pubDate is not a valid date "${entry.pubDate}"`);
    }
    if (prevDate !== null && currentDate > prevDate) {
      throw new Error(
        `${label}: items not sorted desc by pubDate at index ${i} (guid: ${entry.guid})`,
      );
    }
    prevDate = currentDate;
  }
}

function validateCacheObject(obj: unknown, label: string): asserts obj is CacheFile {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error(`${label}: root is not an object`);
  }
  if (!Object.prototype.hasOwnProperty.call(obj, 'items')) {
    throw new Error(`${label}: missing "items" key`);
  }
  validateItems((obj as CacheFile).items, `${label}.items`);
}

function sortItems(items: CacheItem[]) {
  return [...items].sort((a, b) => {
    const dateA = new Date(`${a.pubDate}Z`).getTime();
    const dateB = new Date(`${b.pubDate}Z`).getTime();
    if (dateA !== dateB) return dateB - dateA;
    return a.guid.localeCompare(b.guid);
  });
}

async function fetchFeedText(): Promise<string> {
  console.log(`Fetching feed via Crawler-Buddy at ${CRAWLER_BUDDY_BASE_URL}...`);
  return fetchFeedViaCrawlerBuddy(FEED_URL);
}

function mergeItems(existingItems: CacheItem[], feedItems: CacheItem[]) {
  const existingByGuid = new Set(existingItems.map((item) => item.guid));
  const newOnes = feedItems.filter((item) => !existingByGuid.has(item.guid));
  return { merged: sortItems([...existingItems, ...newOnes]), addedCount: newOnes.length };
}

async function main() {
  const cacheText = readFileSafe(CACHE_PATH);
  const cacheJson = JSON.parse(cacheText) as unknown;
  validateCacheObject(cacheJson, 'existing cache');

  console.log(`Existing cache items: ${cacheJson.items.length}`);

  const feedXml = await fetchFeedText();
  const feedItemsRaw = parseRss(feedXml);
  console.log(`RSS items found: ${feedItemsRaw.length}`);
  const feedItemsMapped = feedItemsRaw.map(mapRssItemToCache);

  const { merged, addedCount } = mergeItems(cacheJson.items, feedItemsMapped);
  console.log(`New items added: ${addedCount}`);

  const mergedObject: CacheFile = { items: merged };
  validateCacheObject(mergedObject, 'final cache');

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
