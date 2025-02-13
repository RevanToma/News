import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateText = (text: string, maxLength = 1000) => {
  if (!text) return 'No content available to summarize.';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};
