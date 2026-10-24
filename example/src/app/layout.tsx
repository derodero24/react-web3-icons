import '../styles/global.css';

import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import Footer from '../components/site/Footer';
import Header from '../components/site/Header';
import { SITE_URL } from '../lib/site';
import { THEME_INIT_SCRIPT } from '../utils/theme';
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

const DESCRIPTION =
  'Open-source React icons for Web3: chains, coins, wallets, DEXs and more, drawn from official brand assets. Colored and mono variants, tree-shakable, Server Components ready.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'React Web3 Icons: Web3 brand icons for React',
    template: '%s · React Web3 Icons',
  },
  description: DESCRIPTION,
  authors: [{ name: '@derodero24' }],
  keywords: [
    'react icons',
    'web3 icons',
    'crypto icons',
    'chain icons',
    'token icons',
    'wallet icons',
    'svg',
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
    description: DESCRIPTION,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React Web3 Icons',
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: THEME_INIT_SCRIPT sets data-theme on <html>
    // before hydration, so its attributes intentionally differ from the HTML.
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, build-time constant (no user input); must run before first paint to avoid a theme flash
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body>
        <Providers>
          <a
            href="#main"
            className="fixed left-4 top-4 z-50 -translate-y-16 rounded-lg bg-accent-fg px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <div className="flex min-h-svh flex-col">
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
