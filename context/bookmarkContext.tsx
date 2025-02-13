'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { NewsArticle } from '@/types';

interface BookmarkContextType {
  bookmarks: NewsArticle[];
  addBookmark: (article: NewsArticle) => void;
  removeBookmark: (id: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(
      localStorage.getItem('bookmarks') || '[]'
    ) as NewsArticle[];
    setBookmarks(savedBookmarks);
  }, []);

  const addBookmark = (article: NewsArticle) => {
    if (bookmarks.some((b) => b.article_id === article.article_id)) {
      return;
    }
    const updatedBookmarks = [...bookmarks, article];
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  const removeBookmark = (id: string) => {
    const updatedBookmarks = bookmarks.filter(
      (article) => article.article_id !== id
    );
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = (): BookmarkContextType => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
