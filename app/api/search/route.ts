import { fetchAndCacheNews } from '@/lib/newsApi';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url); // ✅ Ensure full URL is parsed correctly
  console.log('🌍 API Received URL:', url.toString()); // ✅ Debugging
  console.log('🔍 searchParams:', url.searchParams.toString()); // ✅ Debugging

  const query = url.searchParams.get('q');
  console.log('🔍 Extracted Query:', query); // ✅ Debugging

  const { searchParams } = new URL(req.url);

  if (!query) {
    return new Response(JSON.stringify({ error: 'Search query is missing' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const results = await fetchAndCacheNews(
      `?q=${encodeURIComponent(query)}`,
      `search-${query}`
    );
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 200 });
  }
}
