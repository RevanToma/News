'use server';

import fs from 'fs';
import path from 'path';
import { NewsArticle } from '@/types';
import { revalidatePath } from 'next/cache';

const CACHE_DIR = path.join(process.cwd(), '.cache');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR);
}

const getCacheFilePath = (identifier: string) =>
  path.join(CACHE_DIR, `${identifier}.json`);

export async function fetchNews(
  category: string,
  query = ''
): Promise<NewsArticle[]> {
  if (!category || category.trim() === '') {
    category = 'top';
  }
  const cacheKey = `${category}${query ? `-search-${query}` : ''}`;
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

  const fullUrl = `${apiUrl}?category=${category}${
    query ? `&q=${query}` : ''
  }&apikey=${apiKey}&language=en`;

  try {
    const response = await fetch(fullUrl);
    const data = await response.json();

    if (!response.ok) {
      console.error(`⚠️ API returned ${response.status}:`, data);

      throw new Error(`Failed to fetch news, Status: ${response.status}`);
    }

    const results = data.results || [];

    fs.writeFileSync(cacheFile, JSON.stringify(results));

    return results;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw new Error('Failed to load news');
  }
}

const removeDuplicates = (articles: NewsArticle[]) => {
  const duplicates = new Set();

  return articles.filter((article) => {
    if (
      duplicates.has(article.article_id) ||
      duplicates.has(article.title) ||
      duplicates.has(article.link)
    ) {
      return false;
    }

    duplicates.add(article.article_id);
    duplicates.add(article.title);
    duplicates.add(article.link);
    return true;
  });
};

export const getNews = async (
  category = 'top',
  query = ''
): Promise<{ data: NewsArticle[]; success: boolean }> => {
  try {
    const data = await fetchNews(category, query);

    if (!Array.isArray(data)) {
      console.error(
        '❌ API did not return an array! Most likely because of exceeding the rate limit',
        data
      );
      return {
        data: [],
        success: false,
      };
    }

    return {
      data: removeDuplicates(data),
      success: true,
    };
  } catch (error) {
    console.error('Error fetching news from Next.js API:', error);
    return {
      data: [],
      success: false,
    };
  }
};

// eller spara i minnet
// const memoryCache: Record<string, NewsArticle[]> = {};

// export async function fetchAndCacheNewsToMemory(
//   endpoint: string,
//   cacheKey: string
// ): Promise<NewsArticle[]> {
//   if (memoryCache[cacheKey]) {
//     console.log(`🟢 Serving from memory cache: ${cacheKey}`);
//     return memoryCache[cacheKey];
//   }

//   const apiKey = process.env.NEWS_API_KEY;
//   const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL;

//   if (!apiKey) throw new Error('❌ API key is missing');

//   const fullUrl = `${apiUrl}${endpoint}&apikey=${apiKey}&language=en`;

//   try {
//     console.log(`🔵 Fetching fresh news from API: ${fullUrl}`);
//     const response = await fetch(fullUrl);
//     if (!response.ok)
//       throw new Error(`❌ Failed to fetch news, Status: ${response.status}`);

//     const data = await response.json();
//     const newsResults = data.results || [];

//     memoryCache[cacheKey] = newsResults;

//     return newsResults;
//   } catch (error) {
//     console.error('❌ API Fetch Error:', error);
//     throw new Error('Failed to load news');
//   }
// }
