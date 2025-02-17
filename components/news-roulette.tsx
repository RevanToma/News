import { categories } from '@/lib/constants';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import useFetchNews from '@/hooks/use-fetch-news';

const NewsRoulette = () => {
  const [randomCat, setRandomCat] = useState(''),
    { news, loading } = useFetchNews(randomCat),
    [showNews, setShowNews] = useState(false);

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
              <h2 className='text-lg font-bold'>{news[0].title}</h2>
              <p className='mt-2'>{news[0].description}</p>
              <a
                href={news[0].link}
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
      <Button onClick={fetchRandomNews} className='w-full'>
        🎰 Surprise Me!
      </Button>
    </Card>
  );
};

export default NewsRoulette;
