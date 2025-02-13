import { summarizeWithGemini } from '@/lib/gemini';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { articleContent } = await req.json();

    if (!articleContent) {
      return new Response(
        JSON.stringify({ error: 'Missing article content' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const summary = await summarizeWithGemini(articleContent);

    return NextResponse.json({ summary }, { status: 200 });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to summarize article' },
      { status: 500 }
    );
  }
}
