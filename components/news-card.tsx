'use client';

import { useBookmarks } from '@/context/bookmarkContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { categoryFallbacks } from '@/lib/constants';
import { useState } from 'react';
import { truncateText } from '@/lib/utils';
import { EllipsisVertical, Loader, Star } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from './ui/menubar';
import { NewsArticle } from '@/types';
import { fetchSummarize } from '@/lib/gemini';
import { usePathname } from 'next/navigation';

export default function NewsCard({ article }: { article: NewsArticle }) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = bookmarks.some(
    (b) => b.article_id === article.article_id
  );
  const pathName = usePathname();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const [imgSrc, setImgSrc] = useState(
    article.image_url ||
      categoryFallbacks[article.category?.[0]] ||
      categoryFallbacks.default
  );

  const handleSummarize = async () => {
    if (summary) return;

    setLoading(true);
    try {
      const truncatedContent = truncateText(article.description, 1000);

      const data = await fetchSummarize(truncatedContent);

      setSummary(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
    setLoading(false);
  };

  const NewsCardActions = () => {
    return (
      <Menubar className='bg-transparent border-none p-0 '>
        <MenubarMenu>
          <div>
            <MenubarTrigger className='cursor-pointer focus:bg-transparent p-0'>
              <EllipsisVertical className='rotate-90' />
            </MenubarTrigger>
            <MenubarContent className='flex flex-col gap-2'>
              <Button
                variant={isBookmarked ? 'secondary' : 'default'}
                onClick={() =>
                  isBookmarked
                    ? removeBookmark(article.article_id)
                    : addBookmark(article)
                }
              >
                {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
              </Button>
              <Button asChild variant='outline'>
                <Link href={article.link} target='_blank'>
                  Read more
                </Link>
              </Button>

              <Button
                onClick={handleSummarize}
                disabled={loading}
                variant='secondary'
              >
                Summarize
              </Button>
            </MenubarContent>
          </div>
        </MenubarMenu>
      </Menubar>
    );
  };

  return (
    <Card className='relative border rounded-lg shadow flex flex-col gap-3 border-none p-2'>
      <CardHeader className='flex w-full h-full p-0 '>
        {isBookmarked && pathName !== '/bookmarks' && (
          <Star
            className='absolute right-0 bottom-2'
            fill='#FFD700 '
            stroke='none'
          />
        )}
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 capitalize'>
            <span>{article.pubDate}</span>
            <span>{article.pubDateTZ}</span>
            <span>{article.country}</span>
          </div>
          <NewsCardActions />
        </div>

        <Image
          width={400}
          height={200}
          src={imgSrc}
          alt='News'
          className='h-80 w-full object-cover transition-opacity duration-300 ease-in-out opacity-0 rounded'
          onLoad={(e) => {
            const img = e.target as HTMLImageElement;
            img.classList.remove('opacity-0', 'blur-lg');
            img.classList.add('opacity-100');
          }}
          placeholder='blur'
          priority={false}
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAvklEQVR42mNgGAWjYBSMglEwCYaIoIL/2tDFp+GoAD5P04z2HdUOUBRvTD4MQVUAzDqhDSoKxCmZoJlAIgsK0TgGhsLzMwMDAwDCJRIAXcMDAwDDIQEmYGxDH4MBMYGxjP2z6T1AqAtRUVDBUzAAwPDAwMDw+IkgDYMwMlDBXbOUBDEwMDDX1H1FVjEHwBmJjAwPCwxHiIwAgawG4mA8TIWgbDAQrAjoIC8pShq/AHIZRgAQlsLsgAAAABJRU5ErkJggg=='
          onError={() => setImgSrc(categoryFallbacks.default)}
        />
      </CardHeader>
      <CardContent className='p-2 text-start'>
        <CardTitle className='text-lg line-clamp-2'>{article.title}</CardTitle>
        <CardDescription className='text-sm mt-3 line-clamp-2'>
          {!article.description
            ? 'No description available'
            : article.description}
        </CardDescription>
        {loading && <Loader className='h-4 w-4 animate-spin mx-auto mt-5' />}
        {summary && (
          <p className='mt-2 text-sm bg-secondary p-2 rounded-md'>{summary}</p>
        )}
      </CardContent>
    </Card>
  );
}
