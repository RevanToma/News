import { fetchAndCacheNews } from '@/lib/newsApi';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'top';
  const query = searchParams.get('q') || '';

  try {
    const results = await fetchAndCacheNews(
      `?category=${category}${query ? `&q=${query}` : ''}`,
      `${category}${query ? `-search-${query}` : ''}`
    );

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load news' }, { status: 500 });
  }
}
