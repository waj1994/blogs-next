import type { Metadata } from 'next';

import BaseHeader from '@/components/base-header';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: '欢迎来到我的博客',
  description: '欢迎来到我的博客'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <BaseHeader />
        <main className="max-w-[75ch] mx-auto px-7 pb-10">{children}</main>
      </body>
    </html>
  );
}
