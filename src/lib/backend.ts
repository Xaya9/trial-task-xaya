// backend.js
import Parser from 'rss-parser';

interface FeedItem {
  title?: string | undefined;
  link: string;
}

export async function getRSSFeed(url: string): Promise<FeedItem[]> {
  const parser = new Parser();

  try {
    const feed = await parser.parseURL(url);
    const itemsWithLinks: FeedItem[] = feed.items
      .filter((item) => item.link && typeof item.link === 'string')
      .map((item) => ({ title: item.title, link: item.link as string }));
    return itemsWithLinks;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw new Error('Error fetching RSS feed');
  }
}

