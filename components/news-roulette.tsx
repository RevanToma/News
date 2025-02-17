'use client';
import { categories } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import { NewsArticle } from '@/types';
import { getNews } from '@/actions/news.actions';

const NewsRoulette = () => {
  const [randomCat, setRandomCat] = useState(''),
    [showNews, setShowNews] = useState(false),
    [news, setNews] = useState<NewsArticle>(),
    [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      if (!randomCat) return;
      setLoading(true);
      const fetchedNews = await getNews(randomCat);
      setNews(fetchedNews?.data[0]);
      setLoading(false);
    };

    fetchNews();
  }, [randomCat]);

  const fetchRandomNews = () => {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    setRandomCat(randomCategory);
    setShowNews(true);
  };
  return (
    <Card className='h-fit p-3 flex flex-col gap-2 items-center'>
      <CardContent className='p-1'>
        {loading ? (
          <Loader className='w-8 h-8 animation-spin' />
        ) : (
          showNews && (
            <div>
              <h2 className='text-lg font-bold'>{news?.title}</h2>
              <p className='mt-2'>{news?.description}</p>
              <a
                href={news?.link}
                target='_blank'
                className='text-blue-500 underline'
              >
                Read More
              </a>
            </div>
          )
        )}
      </CardContent>
      <h2 className='font-bold'>Spin the News Wheel!</h2>
      <Button onClick={fetchRandomNews} className='w-full' disabled={loading}>
        🎰 Surprise Me!
      </Button>
    </Card>
  );
};

export default NewsRoulette;
