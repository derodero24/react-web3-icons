import '../styles/global.css';

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import Footer from '../components/sections/Footer';
import Header from '../components/sections/Header';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env['NEXT_PUBLIC_SITE_URL'] ??
      'https://react-web3-icons.vercel.app',
  ),
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
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React Web3 Icons',
    description:
      'Open-source React icon library for Web3 — chains, coins, wallets, DEXs, and more.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0f0f0f" />
      </head>
      <body>
        <Providers>
          <a
            href="#icon-grid"
            className="fixed left-4 top-4 z-50 -translate-y-16 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
          >
            Skip to icons
          </a>
          <div className="flex min-h-svh flex-col theme-transition">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
