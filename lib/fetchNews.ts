import { NewsArticle } from '@/types';

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
export const fetchNews = async (
  category = 'top',
  query = ''
): Promise<NewsArticle[]> => {
  try {
    const endpoint = query
      ? `/api/search?q=${query}`
      : `/api/news?category=${category}`;

    const response = await fetch(endpoint),
      data = await response.json();

    if (!Array.isArray(data.results)) {
      console.error(
        '❌ API did not return an array!,most likely because of exceeded the rate limit',
        data
      );
      return [];
    }

    const uniqNews = removeDuplicates(data.results);
    return uniqNews || [];
  } catch (error) {
    console.error('Error fetching news from Next.js API:', error);
    return [];
  }
};
