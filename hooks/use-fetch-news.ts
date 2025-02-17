import { fetchNews } from '@/lib/fetchNews';
import { NewsArticle } from '@/types';
import { useEffect, useState } from 'react';

const useFetchNews = (category?: string, query?: string) => {
  const [news, setNews] = useState<NewsArticle[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const articles = await fetchNews(category, query);

        const sortedNews = articles.sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

        setNews(sortedNews);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news.');
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, [category]);

  return { news, loading, error };
};

export default useFetchNews;
