import { getNews } from '@/actions/news.actions';
import AsideNews from '@/components/aside-news';
import NewsCard from '@/components/news-card';
import NewsRoulette from '@/components/news-roulette';
import TrendingNews from '@/components/tranding-news';

export default async function Home() {
  const { data: news } = await getNews('other');
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
}
