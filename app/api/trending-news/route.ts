import { fetchAndCacheNews } from '@/lib/newsApi';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const trendingArticles = await fetchAndCacheNews(
      '?category=top',
      'trending'
    );
    //@ts-ignore
    return new Response(JSON.stringify(trendingArticles.slice(0, 5)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
