'use client';
import { useEffect, useState } from 'react';
import { fetchNews } from '@/lib/fetchNews';
import NewsCard from '@/components/news-card';
import AsideNews from '@/components/aside-news';
import LoadingSkeleton from '@/app/loading';
import { categoryIcons } from '@/lib/constants';
import { NewsArticle } from '@/types';

const CategoryDetailsPage = ({ category }: { category: string }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const getNews = async () => {
      const articles = await fetchNews(category as string);

      const sortedNews = articles.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );

      setNews(sortedNews);
      setLoading(false);
    };

    getNews();
  }, [category]);

  const categoryEmote = categoryIcons[category as keyof typeof categoryIcons];

  if (loading) return <LoadingSkeleton />;

  return (
    <main className='p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <section className='lg:col-span-2'>
        <h1 className='text-3xl font-bold mb-4 capitalize'>
          {categoryEmote} {category} news
        </h1>
        {news.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
            {news.map((article) => (
              <NewsCard key={article.article_id} article={article} />
            ))}
          </div>
        )}
      </section>

      <AsideNews news={news} category={category} />
    </main>
  );
};

export default CategoryDetailsPage;
