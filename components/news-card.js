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
import { summarizeWithGemini, truncateText } from '@/lib/utils';
import { EllipsisVertical, Loader, Star } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from './ui/menubar';

export default function NewsCard({ article }) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = bookmarks.some(
    (b) => b.article_id === article.article_id
  );
  const [summary, setSummary] = useState(null);
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

      const data = await summarizeWithGemini(truncatedContent);

      setSummary(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
    setLoading(false);
  };

  const NewsCardActions = () => {
    return (
      <Menubar className='absolute right-0 bottom-0 -translate-y-1 bg-transparent border-none p-0 '>
        <MenubarMenu>
          <div>
            <MenubarTrigger className='cursor-pointer focus:bg-transparent'>
              <EllipsisVertical className='rotate-90' />
            </MenubarTrigger>
            <MenubarContent className='flex flex-col gap-2'>
              <Button
                variant={isBookmarked ? 'destructive' : ''}
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
                disabled={loading || summary}
                variant='secondary'
              >
                {loading ? 'Summarizing...' : 'Summarize'}
              </Button>
            </MenubarContent>
          </div>
        </MenubarMenu>
      </Menubar>
    );
  };

  return (
    <Card className=' relative border rounded-lg shadow flex flex-col gap-3 border-none'>
      <CardHeader className='flex w-full h-full p-0 '>
        {isBookmarked && (
          <Star
            className='absolute right-0 top-2'
            fill='#FFD700 '
            stroke='none'
          />
        )}
        <NewsCardActions />

        <Image
          width={400}
          height={200}
          src={imgSrc}
          alt='News'
          className='h-80 w-full object-cover transition-opacity duration-300 ease-in-out opacity-0'
          onLoad={(e) => e.target.classList.add('opacity-100')}
          placeholder='blur'
          priority={false}
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAvklEQVR42mNgGAWjYBSMglEwCYaIoIL/2tDFp+GoAD5P04z2HdUOUBRvTD4MQVUAzDqhDSoKxCmZoJlAIgsK0TgGhsLzMwMDAwDCJRIAXcMDAwDDIQEmYGxDH4MBMYGxjP2z6T1AqAtRUVDBUzAAwPDAwMDw+IkgDYMwMlDBXbOUBDEwMDDX1H1FVjEHwBmJjAwPCwxHiIwAgawG4mA8TIWgbDAQrAjoIC8pShq/AHIZRgAQlsLsgAAAABJRU5ErkJggg=='
          onError={() => setImgSrc(categoryFallbacks.default)}
        />
      </CardHeader>
      <CardContent>
        <CardTitle className='text-lg line-clamp-2'>{article.title}</CardTitle>
        <CardDescription className='text-sm mt-3 line-clamp-2 '>
          {!article.description
            ? 'No description available'
            : article.description}
        </CardDescription>
        {loading && (
          <>
            <span>Summarizing</span>
            <Loader className='h-4 w-4 animate-spin mx-auto mt-5' />
          </>
        )}
        {summary && (
          <p className='mt-2 text-sm bg-secondary p-2 rounded-md'>{summary}</p>
        )}
      </CardContent>
    </Card>
  );
}
