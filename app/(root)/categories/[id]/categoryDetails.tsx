'use client';
import NewsCard from '@/components/news-card';
import AsideNews from '@/components/aside-news';
import { categoryIcons } from '@/lib/constants';
import { NewsArticle } from '@/types';

const CategoryDetailsPage = ({
  news,
  category,
}: {
  news: NewsArticle[];
  category: string;
}) => {
  const categoryEmote = categoryIcons[category as keyof typeof categoryIcons];

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
