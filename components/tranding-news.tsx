'use client';
import { useEffect, useState } from 'react';
import { fetchNews } from '@/lib/fetchNews';
import NewsCard from './news-card';
import { NewsArticle } from '@/types';

export default function TrendingNews() {
  const [trending, setTrending] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const getTrending = async () => {
      const news = await fetchNews();
      setTrending(news);
    };
    getTrending();
  }, []);

  return (
    <aside className='pb-5'>
      <ul className='space-y-3'>
        {trending.map((article) => (
          <NewsCard key={article.article_id} article={article} />
        ))}
      </ul>
    </aside>
  );
}
