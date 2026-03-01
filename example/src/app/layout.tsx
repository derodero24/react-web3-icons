import '../styles/global.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from '../components/sections/Header';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'React Web3 Icons',
  description: 'React Web3 Icons',
  authors: [{ name: '@derodero24' }],
  keywords: 'React, Web3, Icon, Blockchain, Crypto, Currency, Token, NFT',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'React Web3 Icons',
    siteName: 'React Web3 Icons',
    description: 'React Web3 Icons',
    images: '/icon-512.png',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1F2937" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#F3F4F6"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#1F2937"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&family=Orbitron:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <div className="flex min-h-svh flex-col">
            <Header />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
