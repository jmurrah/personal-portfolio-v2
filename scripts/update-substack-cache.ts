import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';
// @ts-expect-error: puppeteer-extra has no bundled types
import puppeteer from 'puppeteer-extra';
// @ts-expect-error: puppeteer-extra-plugin-stealth has no bundled types
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const FEED_URL = 'https://jacobmurrah.substack.com/feed';
const CACHE_PATH = path.join(process.cwd(), 'src', 'constants', 'prerenderedPosts.json');
const OUTPUT_SPACES = 2;
const PUBDATE_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

puppeteer.use(StealthPlugin());

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
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid date: ${value}`);
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

async function fetchFeedViaPuppeteer(): Promise<string> {
  console.log('Launching Puppeteer (Stealth Mode)...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log(`Navigating to ${FEED_URL}...`);

    const response = await page.goto(FEED_URL, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    if (!response) throw new Error('Puppeteer received no response');

    const status = response.status();
    console.log(`Response Status: ${status}`);

    if (status !== 200) {
      throw new Error(`Failed to fetch feed: HTTP ${status}`);
    }

    const content = await page.evaluate(() => document.body.innerText);

    if (!content.trim().startsWith('<')) {
      const rawContent = await page.content();
      return rawContent;
    }

    return content;
  } finally {
    await browser.close();
  }
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
    console.error('XML Parse failed. First 100 chars:', xmlText.slice(0, 100));
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
    enclosure = {
      link: String(enc.url ?? enc.href ?? '').trim(),
      type: String(enc.type ?? '').trim(),
    };
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

    const stringFields: (keyof CacheItem)[] = [
      'title',
      'pubDate',
      'link',
      'guid',
      'author',
      'thumbnail',
      'description',
      'content',
    ];

    stringFields.forEach((field) => {
      if (typeof entry[field] !== 'string') {
        throw new Error(`${prefix}: ${String(field)} is not a string`);
      }
    });

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
      if (typeof cat !== 'string') throw new Error(`${prefix}: categories[${idx}] is not a string`);
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
  if (typeof obj !== 'object' || obj === null) throw new Error(`${label}: root is not an object`);
  if (!Object.prototype.hasOwnProperty.call(obj, 'items'))
    throw new Error(`${label}: missing "items" key`);
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

  const feedXml = await fetchFeedViaPuppeteer();
  const feedItemsRaw = parseRss(feedXml);
  console.log(`RSS items found: ${feedItemsRaw.length}`);
  const feedItemsMapped = feedItemsRaw.map(mapRssItemToCache);

  const { merged, addedCount } = mergeItems(cacheJson.items, feedItemsMapped);
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
