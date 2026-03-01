[![npm][npm-image]][npm-url]
[![license][license-image]][license-url]
[![bundle size][size-image]][size-url]

[npm-image]: https://img.shields.io/npm/v/react-web3-icons?color=blue
[npm-url]: https://www.npmjs.com/package/react-web3-icons
[license-image]: https://img.shields.io/npm/l/react-web3-icons
[license-url]: https://github.com/derodero24/react-web3-icons/blob/main/LICENSE
[size-image]: https://img.shields.io/bundlephobia/minzip/react-web3-icons
[size-url]: https://bundlephobia.com/package/react-web3-icons

# React Web3 Icons

A comprehensive React SVG icon library for Web3 — blockchains, wallets, DEXs, tokens, and more.

![icons](https://raw.githubusercontent.com/derodero24/react-web3-icons/main/image/icons.png)

**[Browse all icons](https://react-web3-icons-mu.vercel.app/)**

## Features

- 130+ icons across 13 categories
- Colored and monochrome variants for every icon
- Tree-shakeable — only import what you use (`sideEffects: false`)
- Scales with font size (`1em` default)
- Full TypeScript support
- Works with React 18+

## Install

```sh
npm install react-web3-icons
```

Or with other package managers:

```sh
yarn add react-web3-icons
pnpm add react-web3-icons
```

## Quick Start

```tsx
import { Ethereum, EthereumMono } from 'react-web3-icons';

function App() {
  return (
    <div>
      {/* Colored icon — renders official brand colors */}
      <Ethereum />

      {/* Mono icon — inherits CSS color */}
      <EthereumMono style={{ color: '#6366f1' }} />
    </div>
  );
}
```

## Usage

### Sizing

Icons default to `1em`, so they scale with the surrounding font size:

```tsx
<Ethereum style={{ fontSize: '2rem' }} />
```

You can also set explicit dimensions:

```tsx
<Ethereum width={32} height={32} />
```

### Monochrome Variants

Every icon has a `Mono` variant that uses `currentColor`, making it easy to match your app's theme:

```tsx
<BitcoinMono style={{ color: 'white' }} />
<BitcoinMono className="text-gray-500" /> {/* Tailwind */}
```

### Accessibility

Add a `title` prop for screen reader support:

```tsx
<Ethereum title="Ethereum" />
```

When no `title` is provided, the icon is treated as decorative.

### All Standard SVG Props

Icons accept all standard SVG attributes:

```tsx
<Ethereum className="my-icon" style={{ opacity: 0.8 }} onClick={handleClick} />
```

## Icon Categories

| Category | Description | Examples |
| --- | --- | --- |
| `chain` | L1/L2 blockchains | Ethereum, Arbitrum, Polygon, Solana |
| `coin` | Cryptocurrencies & tokens | Bitcoin, Doge, USDT, USDC |
| `wallet` | Wallet apps | MetaMask, PhantomWallet, RainbowWallet |
| `dex` | Decentralized exchanges | Uniswap, PancakeSwap, Dydx |
| `exchange` | Centralized exchanges | Binance, Coinbase, Kraken |
| `marketplace` | NFT marketplaces | OpenSea, MagicEden, LooksRare |
| `devtool` | Developer tools | Hardhat, Truffle, Web3Js |
| `explorer` | Block explorers | Etherscan, Bscscan, Solscan |
| `node` | Node providers | Alchemy, Infura, QuickNode |
| `storage` | Decentralized storage | Ipfs, Arweave, NftStorage |
| `domain` | Domain services | Ens, UnstoppableDomains |
| `portfolio` | Portfolio trackers | DeBank, Zapper, CoinLedger |
| `tracker` | Analytics & tracking | DefiLlama, CoinGecko, CoinMarketCap |

Browse the full list at the **[demo site](https://react-web3-icons-mu.vercel.app/)**.

## Props

All icons extend `SVGProps<SVGSVGElement>` with the following additions:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Accessible title rendered as `<title>` inside the SVG |
| `titleId` | `string` | — | ID used to bind `<title>` to the SVG for accessibility |
| `size` | `string \| number` | `"1em"` | Sets both width and height unless explicitly overridden |
| `width` | `string \| number` | — | Icon width (overrides `size` for width only) |
| `height` | `string \| number` | — | Icon height (overrides `size` for height only) |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Inline styles |

Plus all standard SVG attributes (`fill`, `stroke`, `opacity`, `onClick`, etc.).

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding icons, the SVG optimization pipeline, and submitting pull requests.

## License

[MIT](LICENSE)
