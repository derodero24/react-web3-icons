import '../styles/global.css';

import type { Metadata } from 'next';
import { Noto_Sans, Orbitron } from 'next/font/google';
import type { ReactNode } from 'react';
import Header from '../components/sections/Header';
import { Providers } from './providers';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'React Web3 Icons',
  description:
    'Open-source React icon library for Web3 — chains, coins, wallets, DEXs, and more.',
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
    description:
      'Open-source React icon library for Web3 — chains, coins, wallets, DEXs, and more.',
    images: '/icon-512.png',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${orbitron.variable}`}
      suppressHydrationWarning
    >
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
