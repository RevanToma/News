import { NewsArticle } from '@/types';

const removeDuplicates = (artices: NewsArticle[]) => {
  const duplicates = new Set();

  return artices.filter((article) => {
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

export const fetchNews = async (
  category = 'top',
  query = ''
): Promise<NewsArticle[]> => {
  try {
    const endpoint = query
      ? `/api/search?q=${query}`
      : `/api/news?category=${category}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`❌ Failed to fetch news, Status: ${response.status}`);
    }

    const data: NewsArticle[] = await response.json();

    const uniqNews = removeDuplicates(data);

    return uniqNews || [];
  } catch (error) {
    console.log('Error fetching news from Next.js API:', error);
    return [];
  }
};
