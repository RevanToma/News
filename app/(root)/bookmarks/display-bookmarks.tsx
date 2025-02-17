'use client';
import NewsCard from '@/components/news-card';
import { useBookmarks } from '@/context/bookmarkContext';

export default function DisplayBookmakrs() {
  const { bookmarks } = useBookmarks();

  return (
    <div className='min-h-80'>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-2  gap-6'>
          {bookmarks.map((article) => (
            <NewsCard key={article.article_id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
