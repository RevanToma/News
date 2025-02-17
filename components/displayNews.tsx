'use client';

import NewsCard from './news-card';
import AsideNews from './aside-news';
import LoadingSkeleton from '@/app/loading';
import TrendingNews from './tranding-news';
import useFetchNews from '@/hooks/use-fetch-news';
import { notFound } from 'next/navigation';
import NewsRoulette from './news-roulette';

const DisplayNews = () => {
  const { error, loading, news } = useFetchNews('other');

  if (loading) return <LoadingSkeleton />;
  if (error) notFound();

  return (
    <main
      className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 mt-3 
    '
    >
      <NewsRoulette />
      <section className='lg:col-span-2 px-2'>
        <h1 className='text-4xl font-bold mb-4'>🔥 Trending News</h1>
        <TrendingNews />
        <h1 className='text-4xl font-bold mb-4 pl-1 mt-5'>🆕 News</h1>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
          {news.map((article) => (
            <NewsCard key={article.article_id} article={article} />
          ))}
        </div>
      </section>
      <AsideNews news={news} />
    </main>
  );
};
export default DisplayNews;
