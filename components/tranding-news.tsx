'use client';
import NewsCard from './news-card';
import useFetchNews from '@/hooks/use-fetch-news';

export default function TrendingNews() {
  const { news: trending } = useFetchNews();

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
