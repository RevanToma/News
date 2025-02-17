import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { BookmarkProvider } from '@/context/bookmarkContext';
import { ThemeProvider } from '@/components/theme-provider';
import { Metadata } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Chas News',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressContentEditableWarning
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <BookmarkProvider>{children}</BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
