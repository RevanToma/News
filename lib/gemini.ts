import { GoogleGenerativeAI } from '@google/generative-ai';

export const summarizeWithGemini = async (articleContent: string) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  if (!articleContent) return 'No content available to summarize.';

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Summarize the following news article in a few sentences:\n\n"${articleContent}"`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const summary = response.text();

    return summary || 'Summary unavailable.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Failed to summarize article.';
  }
};

export const fetchSummarize = async (description: string) => {
  if (!description) throw new Error('No content available to summarize.');

  try {
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleContent: description }),
    });

    if (!response.ok) {
      throw new Error(`❌ Failed to fetch summary, Status: ${response.status}`);
    }

    const data = await response.json();

    return data.summary || 'Summary unavailable.';
  } catch (error) {
    console.error('Error fetching summary:', error);
  }
};
