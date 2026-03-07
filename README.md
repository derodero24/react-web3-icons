[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][npm-url]
[![license][license-image]][license-url]
[![bundle size][size-image]][size-url]
[![Open in StackBlitz][stackblitz-image]][stackblitz-url]

[npm-image]: https://img.shields.io/npm/v/react-web3-icons?color=blue
[npm-url]: https://www.npmjs.com/package/react-web3-icons
[downloads-image]: https://img.shields.io/npm/dw/react-web3-icons
[license-image]: https://img.shields.io/npm/l/react-web3-icons
[license-url]: https://github.com/derodero24/react-web3-icons/blob/main/LICENSE
[size-image]: https://img.shields.io/bundlephobia/minzip/react-web3-icons
[size-url]: https://bundlephobia.com/package/react-web3-icons
[stackblitz-image]: https://developer.stackblitz.com/img/open_in_stackblitz_small.svg
[stackblitz-url]: https://stackblitz.com/github/derodero24/react-web3-icons/tree/main/example

# React Web3 Icons

A comprehensive React SVG icon library for Web3 — blockchains, wallets, DEXs, tokens, and more.

![icons](https://raw.githubusercontent.com/derodero24/react-web3-icons/main/image/icons.png)

**[Browse all icons](https://react-web3-icons.vercel.app/)**

## Features

- 250+ icons across 15 categories
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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][stackblitz-url]

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

For maximum screen reader compatibility, pair `title` with `titleId` — the SVG will automatically get `aria-labelledby` pointing to the title:

```tsx
<Ethereum title="Ethereum logo" titleId="eth-title" />
{/* Renders: <svg aria-labelledby="eth-title"><title id="eth-title">Ethereum logo</title>…</svg> */}
```

### All Standard SVG Props

Icons accept all standard SVG attributes:

```tsx
<Ethereum className="my-icon" style={{ opacity: 0.8 }} onClick={handleClick} />
```

### Per-Category Imports

Import from a specific category to reduce your bundle size:

```tsx
import { Ethereum } from 'react-web3-icons/chain';
import { Uniswap } from 'react-web3-icons/dex';
```

The root import still works and includes all icons:

```tsx
import { Ethereum } from 'react-web3-icons';
```

### IconContext

Use `IconContext.Provider` to set default props for all icons in a subtree:

```tsx
import { IconContext } from 'react-web3-icons';

<IconContext.Provider value={{ size: 32, className: 'my-icon' }}>
  <Ethereum />
  <Bitcoin />
</IconContext.Provider>
```

Any prop that can be passed directly to an icon can be set via context (`size`, `className`, `style`, `fill`, etc.). Per-icon props always take precedence; `style` objects are merged rather than replaced.

### React Server Components (RSC)

Icons use React hooks (`useId`, `useContext`) and therefore **cannot be rendered in React Server Components** directly. Add a `'use client'` directive (as the first statement in the file) to the component that renders icons, or to a small client-only re-export wrapper:

```tsx
// app/my-component.tsx
'use client';

import { Ethereum, Bitcoin } from 'react-web3-icons';

export function MyComponent() {
  return <Ethereum />;
}
```

Alternatively, create a small client-only re-export wrapper and import icons from it in your Client Components:

```tsx
// app/icons.tsx — must be a Client Component
'use client';
export { Ethereum, Bitcoin } from 'react-web3-icons';
```

```tsx
// app/my-component.tsx — Client Component that renders icons
'use client';
import { Ethereum } from './icons';

export function MyComponent() {
  return <Ethereum />;
}
```

### Type-Safe Dynamic Icon Lookup

Use the `IconName` type to reference icon names safely:

```tsx
import type { IconName } from 'react-web3-icons';
import * as allIcons from 'react-web3-icons';

function DynamicIcon({ name }: { name: IconName }) {
  const Icon = allIcons[name];
  return <Icon />;
}

// TypeScript errors on unknown names:
<DynamicIcon name="Ethereum" />   // ✅
<DynamicIcon name="Unknown" />    // ❌ TypeScript error
```

## Icon Categories

| Category | Description | Examples |
| --- | --- | --- |
| `bridge` | Cross-chain bridge protocols | Across, LayerZero, Stargate, Wormhole |
| `chain` | L1/L2 blockchains | Ethereum, Arbitrum, Polygon, Solana |
| `coin` | Cryptocurrencies & tokens | Bitcoin, Doge, Usdt, Usdc |
| `defi` | DeFi protocols | Aave, EigenLayer, Lido |
| `devtool` | Developer tools | Hardhat, Truffle, Web3Js |
| `dex` | Decentralized exchanges | Uniswap, PancakeSwap, Dydx |
| `domain` | Domain services | Ens, UnstoppableDomains |
| `exchange` | Centralized exchanges | Binance, Coinbase, Kraken |
| `explorer` | Block explorers | Etherscan, Bscscan, Solscan |
| `marketplace` | NFT marketplaces | OpenSea, MagicEden, LooksRare |
| `node` | Node providers | Alchemy, Infura, QuickNode |
| `portfolio` | Portfolio trackers | DeBank, Zapper, CoinLedger |
| `storage` | Decentralized storage | Ipfs, Arweave, NftStorage |
| `tracker` | Analytics & tracking | DefiLlama, CoinGecko, CoinMarketCap |
| `wallet` | Wallet apps | MetaMask, PhantomWallet, RainbowWallet |

Browse the full list at the **[demo site](https://react-web3-icons.vercel.app/)**.

## Props

All icons extend `SVGProps<SVGSVGElement>` with the following additions:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Accessible title rendered as `<title>` inside the SVG |
| `titleId` | `string` | — | ID applied to the `<title>` element; when provided together with `title`, `aria-labelledby` is automatically set to this value |
| `size` | `string \| number` | `"1em"` | For icons created via `createIcon`/`useIconContext`, sets both width and height unless explicitly overridden |
| `width` | `string \| number` | — | Icon width (overrides `size` for width only) |
| `height` | `string \| number` | — | Icon height (overrides `size` for height only) |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Inline styles |

Plus all standard SVG attributes (`fill`, `stroke`, `opacity`, `onClick`, etc.).

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding icons, lifecycle/deprecation rules, the SVG optimization pipeline, and submitting pull requests.

## Icon Lifecycle Policy

When icon brands are renamed (for example, `GnosisSafe` -> `Safe`, `Matic` -> `Pol`), this project keeps backward compatibility by shipping deprecated aliases.

- Canonical exports follow the current official brand name.
- Deprecated aliases stay available for at least one minor release and at least 90 days.
- Alias removals happen only in major releases and are documented in changelog/release notes.

### Filtering Deprecated Icons

Use the exported `DEPRECATED_ICON_NAMES` set to filter deprecated aliases from icon lists:

```ts
import * as icons from 'react-web3-icons';
import { DEPRECATED_ICON_NAMES } from 'react-web3-icons';

// Get current (non-deprecated) icon names, excluding non-icon exports
const activeIconNames = Object.keys(icons).filter(
  name =>
    !DEPRECATED_ICON_NAMES.has(name) &&
    name !== 'IconContext' &&
    name !== 'DEPRECATED_ICON_NAMES',
);
```

Or import from the dedicated subpath to avoid loading the full bundle:

```ts
import { DEPRECATED_ICON_NAMES } from 'react-web3-icons/deprecated';
```

Full process and test requirements: [CONTRIBUTING.md#icon-lifecycle-policy](CONTRIBUTING.md#icon-lifecycle-policy).

## License

[MIT](LICENSE)
