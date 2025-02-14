'use client';
import NewsCard from '@/components/news-card';
import AsideNews from '@/components/aside-news';
import LoadingSkeleton from '@/app/loading';
import { categoryIcons } from '@/lib/constants';
import useFetchNews from '@/hooks/use-fetch-news';

const CategoryDetailsPage = ({ category }: { category: string }) => {
  const { news, loading } = useFetchNews(category);
  const categoryEmote = categoryIcons[category as keyof typeof categoryIcons];

  if (loading) return <LoadingSkeleton />;

  return (
    <main className='p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <section className='lg:col-span-2'>
        <h1 className='text-4xl font-bold mb-4 capitalize'>
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
