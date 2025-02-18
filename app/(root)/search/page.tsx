import NewsCard from '@/components/news-card';
import { getNews } from '@/actions/news.actions';
import { FC } from 'react';
import { Metadata } from 'next';

interface SearchResultsProps {
  searchParams: { q?: string };
}

export const metadata: Metadata = {
  title: 'Search Results',
};

const SearchResultsPage: FC<SearchResultsProps> = async ({ searchParams }) => {
  const query = await searchParams.q || '';

  const { data: news } = await getNews('top', query);

  return (
    <main className='max-w-7xl mx-auto p-6 min-h-80'>
      <h1 className='text-3xl font-bold mb-4'>
        Found {news?.length} Search Results for &quot;{query}&quot;
      </h1>
      {news?.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {news?.map((article) => (
            <NewsCard key={article.article_id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
};

export default SearchResultsPage;
