import path from 'path';
import fs from 'fs';
import { NewsArticle } from '@/types';

// spara i json fil lokalt
const CACHE_DIR = path.join(process.cwd(), '.cache');
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR);
}

const getCacheFilePath = (identifier: string) =>
  path.join(CACHE_DIR, `${identifier}.json`);

export async function fetchAndCacheNews(
  endpoint: string,
  cacheKey: string
): Promise<NewsArticle[]> {
  const cacheFile = getCacheFilePath(cacheKey);

  if (fs.existsSync(cacheFile)) {
    const cachedData = fs.readFileSync(cacheFile, 'utf-8');
    return JSON.parse(cachedData);
  }

  const apiKey = process.env.NEWS_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL;

  if (!apiKey) {
    throw new Error('API key is missing');
  }

  try {
    const response = await fetch(
      `${apiUrl}${endpoint}&apikey=${apiKey}&language=en`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch news, Status: ${response.status}`);
    }

    const data: { results: NewsArticle[] } = await response.json();
    fs.writeFileSync(cacheFile, JSON.stringify(data.results || []));

    return data.results || [];
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw new Error('Failed to load news');
  }
}

// eller spara i minnet

// const cache = {};

// export async function fetchAndCacheNews(endpoint, cacheKey) {
//   if (cache[cacheKey]) {
//     return cache[cacheKey];
//   }

//   const apiKey = process.env.NEWS_API_KEY;
//   const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL;

//   if (!apiKey) {
//     throw new Error('API key is missing');
//   }

//   try {

//     const response = await fetch(
//       `${apiUrl}${endpoint}&apikey=${apiKey}&language=en`
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch news, Status: ${response.status}`);
//     }

//     const data = await response.json();

//     cache[cacheKey] = data.results || [];

//     return cache[cacheKey];
//   } catch (error) {
//     console.error(' API Fetch Error:', error);
//     throw new Error('Failed to load news');
//   }
// }
