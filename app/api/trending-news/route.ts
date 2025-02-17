import { fetchAndCacheNews } from '@/lib/newsApi';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const results = await fetchAndCacheNews('?category=top', 'trending');

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
