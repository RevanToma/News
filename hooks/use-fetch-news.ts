import { getNews } from '@/actions/news.actions';
import { NewsArticle } from '@/types';
import { useEffect, useState } from 'react';

const useFetchNews = (category?: string, query?: string) => {
  const [news, setNews] = useState<NewsArticle[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      const { data: articles } = await getNews(category, query);

      const sortedNews = articles.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );

      setNews(sortedNews);
      setLoading(false);
    };
    loadNews();
  }, [category, query]);

  return { news, loading, error };
};

export default useFetchNews;
