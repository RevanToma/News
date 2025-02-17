import { Metadata } from 'next';
import DisplayBookmakrs from './display-bookmarks';

export const metadata: Metadata = {
  title: 'Bookmarks',
};
export default async function BookmarksPage() {
  return (
    <main className='p-6 max-w-5xl mx-auto '>
      <h1 className='text-3xl font-bold mb-4'>Bookmarked Articles</h1>
      <DisplayBookmakrs />
    </main>
  );
}
