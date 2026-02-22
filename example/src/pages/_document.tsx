import { Head, Html, Main, NextScript } from 'next/document';

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <meta name="author" content="@derodero24" />
        <meta
          name="keywords"
          content="React, Web3, Icon, Blockchain, Crypto, Currency, Token, NFT"
        />

        {/* Colors */}
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

        {/* icons */}
        <link rel="icon" sizes="any" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&family=Orbitron:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
