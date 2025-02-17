import NewsCard from './news-card';
import { getNews } from '@/actions/news.actions';

export default async function TrendingNews() {
  const { data: trending } = await getNews();

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
