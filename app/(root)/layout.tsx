import Layout from '@/components/layout';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen flex-col'>
      <main className='flex-1'>
        <Layout>{children}</Layout>
      </main>
    </div>
  );
}
