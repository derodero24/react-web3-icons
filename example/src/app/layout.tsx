import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import '../styles/global.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'React Web3 Icons',
  description: 'React Web3 Icons',
  authors: [{ name: '@derodero24' }],
  keywords: [
    'React',
    'Web3',
    'Icon',
    'Blockchain',
    'Crypto',
    'Currency',
    'Token',
    'NFT',
  ],
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
    type: 'website',
    images: '/icon-512.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F3F4F6' },
    { media: '(prefers-color-scheme: dark)', color: '#1F2937' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&family=Orbitron:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
