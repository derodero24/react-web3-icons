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
[stackblitz-url]: https://stackblitz.com/github/derodero24/react-web3-icons/tree/main/examples/stackblitz

# React Web3 Icons

A comprehensive React SVG icon library for Web3 — blockchains, wallets, DEXs, tokens, and more.

![icons](https://raw.githubusercontent.com/derodero24/react-web3-icons/main/image/icons.png)

**[Browse all icons](https://react-web3-icons.vercel.app/)** · **[API Reference](https://react-web3-icons.vercel.app/docs)**

## Features

- 230+ icons (700+ component exports including mono and container variants) across 16 categories
- Colored and monochrome variants for every icon
- Server Components ready — renders without `'use client'`
- Tree-shakeable — named imports bundle only the icons you use ([details](#bundle-size))
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

Requires React 18+. Upgrading from v3? See the [migration guide](./MIGRATION.md).

The published files are ES modules compiled to **ES2022**, with no Node.js version requirement. They run as-is in any browser, bundler, or runtime that supports ES modules and ES2022 syntax and built-ins (for example `Object.hasOwn`, used by the dynamic components). To support older browsers, let your bundler transpile `react-web3-icons` and polyfill the missing built-ins.

## Quick Start

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][stackblitz-url] — a small Vite app ([`examples/stackblitz`](./examples/stackblitz)) that installs the published package.

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

### Dark Backgrounds and Theming

Colored icons reproduce the official brand artwork, and some brand marks are black (Aptos, LayerZero, Ledger, …) or nearly white, so they disappear on a background of the same tone. Pick the variant by how much brand color you need:

- **`Mono` + CSS `color`** — one color that follows your theme via `currentColor`. For black-only marks this is exactly the brand's reversed logo, so `<AptosMono />` in white is the dark-mode Aptos.
- **`Circle` / `Square`** — the mark on its brand background (`EthereumCircle`, `ArbitrumSquare`), legible on any page color.
- **`Inverted`** — brand colors reworked for dark backgrounds (`BybitInverted`, `EtherscanInverted`).

```tsx
import { AptosMono, Bitcoin, BybitInverted, EthereumCircle } from 'react-web3-icons';

<div style={{ background: '#0b0d12', color: '#f5f5f5' }}>
  <AptosMono /> {/* inherits the light text color */}
  <EthereumCircle />
  <BybitInverted />
  <Bitcoin /> {/* already legible on dark */}
</div>
```

Each base entry of the [icon manifest](#icon-manifest) lists its `variants`, so you can choose one at runtime:

```ts
import { ICON_MANIFEST } from 'react-web3-icons/manifest';

const onDark = (name: string) => {
  const variants = ICON_MANIFEST.find(e => e.name === name)?.variants ?? [];
  const suffix = ['Inverted', 'Circle', 'Square'].find(v => variants.includes(v));
  return suffix ? `${name}${suffix}` : `${name}Mono`; // Mono: set a light `color`
};
onDark('Ethereum'); // 'EthereumCircle'
onDark('Aptos'); // 'AptosMono'
```

A test audits every colored icon: when its artwork would vanish on a dark (or light) background, the icon must ship one of these options.

### Accessibility

Add a `title` prop for screen reader support:

```tsx
<Ethereum title="Ethereum" />
```

An icon without an accessible name is treated as decorative and rendered with `aria-hidden="true"`. Giving it a name — `title`, `aria-label`, or `aria-labelledby` — removes `aria-hidden` and adds `role="img"`:

```tsx
<Ethereum />                                {/* decorative: aria-hidden="true" */}
<Ethereum aria-label="Ethereum" />          {/* role="img" aria-label="Ethereum" */}
```

For maximum screen reader compatibility, pair `title` with `titleId` — the SVG will automatically get `aria-labelledby` pointing to the title:

```tsx
<Ethereum title="Ethereum logo" titleId="eth-title" />
{/* Renders: <svg aria-labelledby="eth-title"><title id="eth-title">Ethereum logo</title>…</svg> */}
```

### All Standard SVG Props

Icons accept all standard SVG attributes, and a `ref` to the `<svg>` element:

```tsx
<Ethereum className="my-icon" style={{ opacity: 0.8 }} onClick={handleClick} />
```

### Per-Category Imports

Every category is also available as a subpath:

```tsx
import { Ethereum } from 'react-web3-icons/chain';
import { Uniswap } from 'react-web3-icons/dex';
```

This is for organization only: a named import from the root (`import { Ethereum } from 'react-web3-icons'`) tree-shakes to exactly the same code. See [Bundle Size](#bundle-size).

### Raw SVG Files

Every icon is also published as a plain, optimized SVG file under the `svg/` subpath — useful outside React (Vue, Svelte, static HTML, image pipelines, design tools):

```
react-web3-icons/svg/<category>/<Name>.svg
```

```ts
// With a bundler (Vite, webpack, Next.js) — resolves to a URL or asset per your config
import ethereumSvgUrl from 'react-web3-icons/svg/chain/Ethereum.svg';
```

The files have no fixed `width`/`height`, so they scale to their container. Mono variants use `currentColor` and inherit CSS `color`. Internal ids (gradients, masks, clip paths) are prefixed per file (`w3i-<category>-<name>_…`), so any number of these files can be inlined into one page.

You can also hotlink them from a CDN without installing the package. Pin an exact version:

```
https://cdn.jsdelivr.net/npm/react-web3-icons@4.0.0/dist/svg/chain/Ethereum.svg
https://unpkg.com/react-web3-icons@4.0.0/dist/svg/chain/Ethereum.svg
```

Pick the version from the [npm page](https://www.npmjs.com/package/react-web3-icons?activeTab=versions) or the [changelog](./CHANGELOG.md). An unpinned URL (`@latest`, `@4`) can start serving different files whenever a new version is published, without any change on your side.

Browsers don't check [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) for images, so for an `<img>` the exact version is the only pin; self-host the files from `node_modules/react-web3-icons/dist/svg/` if you need more. When you load a file with `fetch()` instead (e.g. `dist/manifest.json` or an SVG you inline), you can pass `integrity`. Compute the hash from the exact URL you load:

```sh
curl -sL https://cdn.jsdelivr.net/npm/react-web3-icons@4.0.0/dist/manifest.json \
  | openssl dgst -sha384 -binary | openssl base64 -A
```

```ts
const res = await fetch('https://cdn.jsdelivr.net/npm/react-web3-icons@4.0.0/dist/manifest.json', {
  integrity: 'sha384-<hash printed by the command above>',
});
```

### Other frameworks (Iconify)

The full set also ships as IconifyJSON collections — `react-web3-icons/iconify.json` (colored, prefix `web3`) and `react-web3-icons/iconify-mono.json` (`currentColor`, prefix `web3-mono`) — so the icons work outside React through the Iconify ecosystem. Register the collection from the npm package, then use icons by name; nothing is fetched at runtime:

```ts
import { addCollection, Icon } from '@iconify/vue'; // or '@iconify/react'
import web3 from 'react-web3-icons/iconify.json';
import web3Mono from 'react-web3-icons/iconify-mono.json';

addCollection(web3);
addCollection(web3Mono);
// <Icon icon="web3:chain-ethereum" />, <Icon icon="web3-mono:chain-ethereum-mono" />
```

With the framework-agnostic [`iconify-icon`](https://iconify.design/docs/iconify-icon/) web component, register the collections the same way and render the `<iconify-icon>` custom element (the package exports `addCollection`, not an `Icon` component):

```ts
import { addCollection } from 'iconify-icon'; // also defines <iconify-icon>
import web3 from 'react-web3-icons/iconify.json';

addCollection(web3);
// <iconify-icon icon="web3:chain-ethereum"></iconify-icon>
```

Icon names are `<category>-<kebab-name>` (e.g. `chain-ethereum`, `chain-bitcoin`, `wallet-meta-mask`); ticker shorthands are registered as Iconify aliases (e.g. `coin-btc`). For build-time tools such as `unplugin-icons`, load the same JSON as a custom collection ([recipe](docs/iconify.md#unplugin-icons)).

The collections are not yet listed on [Iconify](https://icon-sets.iconify.design/) ([#702](https://github.com/derodero24/react-web3-icons/issues/702)). Once they are, `web3:` and `web3-mono:` icons will also load on demand from the Iconify API without `addCollection`, and `unplugin-icons` / Tailwind plugins will find them in `@iconify/json`. See [docs/iconify.md](docs/iconify.md) for details.

### React Server Components (RSC)

Static icons are pure components that call no hooks other than `useId`, which React supports in Server Components. They render in React Server Components with no `'use client'` directive:

```tsx
// app/page.tsx — Server Component
import { Ethereum } from 'react-web3-icons';

export default function Page() {
  return <Ethereum size={24} />;
}
```

Server-rendered icons ship zero client JavaScript. Only the [dynamic components](#dynamic-icon-components) (`react-web3-icons/dynamic`) are client-only, since they lazy-load icon chunks at runtime.

Internal SVG ids (masks, gradients, clip paths) are unique per rendered icon (`w3i-<name>-<instance>-…`, the instance part from `useId`), so every icon resolves its references inside its own `<svg>`: an instance inside a `display: none` subtree, or one with a different `fill` or `color`, never affects another. Icons without internal ids call no hooks at all. If you mount several React roots on one page, give each its own [`identifierPrefix`](https://react.dev/reference/react-dom/client/createRoot#parameters) so their ids cannot collide.

### Type-Safe Icon Lookup by Name

`IconName` is the union of every icon export name. When you know which icons you need, collect them in a map: only the listed icons are bundled, and `satisfies` rejects names that don't exist:

```tsx
import { Arbitrum, Base, Ethereum, type IconName } from 'react-web3-icons';

const ICONS = { Arbitrum, Base, Ethereum } satisfies Partial<Record<IconName, unknown>>;

function NamedIcon({ name }: { name: keyof typeof ICONS }) {
  const Icon = ICONS[name];
  return <Icon />;
}

<NamedIcon name="Ethereum" />   // ✅
<NamedIcon name="Bitcoin" />    // ❌ TypeScript error: not in ICONS
```

Accepting *any* `IconName` at runtime means shipping every icon, because the bundler cannot know which names will be used:

```tsx
import * as allIcons from 'react-web3-icons'; // bundles the whole library
import type { IconName } from 'react-web3-icons';

function AnyIcon({ name }: { name: IconName }) {
  const Icon = allIcons[name];
  return <Icon />;
}
```

That is fine for an icon browser, but it costs the full library size (see [Bundle Size](#bundle-size)). To resolve chains, coins, wallets, exchanges, DeFi protocols, DEXs, bridges, or oracles from runtime data, use the [dynamic components](#dynamic-icon-components) instead: they load one icon at a time.

### Dynamic Icon Components

The `react-web3-icons/dynamic` entry point provides components that lazily load icons at runtime by identifier (ticker, slug, connector id, or chain ID). Each icon is a separate dynamic `import()`, so with a bundler that splits dynamic imports into chunks (Vite, webpack, Rollup, and Next.js do by default) rendering one icon downloads one small chunk, not the whole category. The components are Client Components (`'use client'`) built on `React.lazy` and `Suspense`. The following categories have dedicated dynamic components:

```tsx
import { ChainIcon, CoinIcon, WalletIcon, ExchangeIcon, DefiIcon, DexIcon, BridgeIcon, OracleIcon } from 'react-web3-icons/dynamic';

<ChainIcon chainId={1} />               // Ethereum by chain ID
<ChainIcon name="arbitrum" />            // Arbitrum by slug
<CoinIcon symbol="ETH" />               // ETH coin icon
<WalletIcon name="metamask" />           // MetaMask wallet icon
<ExchangeIcon name="binance" />          // Binance exchange icon
<DefiIcon name="aave" />                // Aave DeFi protocol icon
<DexIcon name="uniswap" />              // Uniswap DEX icon
<BridgeIcon name="layerzero" />         // LayerZero bridge icon
<OracleIcon name="pyth" />              // Pyth oracle icon
```

`chainId` takes precedence over `name`; an unknown `chainId` falls back to `name`, so `<ChainIcon chainId={chain.id} name={chain.slug} />` still renders for chains without a registered ID.

#### Identifiers

An identifier resolves through the lookup keys of the [metadata maps](#metadata-lookups) (slugs, tickers, chain IDs). Both sides are normalized the same way — lowercased, with whitespace, `.`, `-` and `_` removed — so `'Arbitrum Nova'`, `'arbitrum_nova'` and `'arbitrum-nova'` are the same key, as are `'Ether.fi'` / `'etherfi'`, `'Crypto.com'` / `'cryptocom'` and `'eth'` / `'ETH'`. No two keys of a category normalize alike, so an identifier never matches more than one icon.

The keys include legacy names (`'klaytn'` → Kaia, `'fantom'` → Sonic), every search alias the [manifest](#icon-manifest) lists for these categories (`'btc'`, `'wc'`, `'1inch'`, …), and common wallet connector ids, so `<WalletIcon name={connector.id} />` works for wagmi and RainbowKit connectors such as `'metaMaskSDK'`, `'coinbaseWalletSDK'`, `'walletConnect'`, `'safe'`, `'phantom'`, `'rainbow'`, `'okx'`, `'backpack'`, `'trust'`, `'bitget'` or `'uniswap'`.

Identifier props are typed as the known keys plus any string (`name?: ChainSlug | (string & {})`): editors suggest the keys, and strings from API data still type-check.

#### Variants

The `variant` prop selects the artwork: `'colored'` (the default), `'mono'`, or any variant suffix the category ships. Each category exports its variant union, so a typo is a type error:

| Component | Variant type | Values besides `'colored'` and `'mono'` |
| --- | --- | --- |
| `ChainIcon` | `ChainVariant` | `'Circle'`, `'CircleMono'`, `'Flat'`, `'FlatMono'`, `'Square'`, `'SquareMono'` |
| `CoinIcon` | `CoinVariant` | `'Alt'`, `'Circle'`, `'CircleMono'`, `'Square'`, `'SquareMono'` |
| `WalletIcon` | `WalletVariant` | `'Circle'`, `'CircleMono'`, `'Square'`, `'SquareMono'`, `'Symbol'`, `'SymbolMono'` |
| `ExchangeIcon` | `ExchangeVariant` | `'Circle'`, `'CircleAlt'`, `'CircleMono'`, `'Inverted'`, `'Square'`, `'SquareMono'` |
| `DexIcon` | `DexVariant` | `'Circle'`, `'CircleMono'`, `'Square'`, `'SquareMono'` |
| `BridgeIcon` | `BridgeVariant` | `'Inverted'` |
| `DefiIcon` | `DefiVariant` | `'Circle'`, `'CircleMono'` |
| `OracleIcon` | `OracleVariant` | — |

```tsx
<CoinIcon symbol="BTC" variant="mono" />          // BtcMono
<ChainIcon name="ethereum" variant="Circle" />     // EthereumCircle
<WalletIcon name="phantom" variant="SquareMono" /> // PhantomSquareMono
```

Not every icon ships every variant of its category (see the manifest's `variants`); an icon without the requested variant renders `fallback`, and so does a variant the category does not know. Every icon of these categories has a `mono` variant.

#### Fallback

Use the `fallback` prop to render alternative content while the icon chunk is loading, when the identifier is not recognized (including `undefined`/`null` from untyped data), when the icon has no such variant, or when the chunk fails to load (a later render retries the import):

```tsx
<CoinIcon symbol={token.symbol} fallback={<GenericTokenIcon />} />
<CoinIcon symbol={token.symbol} fallback={<Skeleton width={24} height={24} />} />
```

When omitted, nothing is rendered for unknown identifiers and during loading.

Other icon props (`size`, `title`, `className`, `fill`, etc.) and `ref` are forwarded to the loaded icon's `<svg>`. In development builds, unknown identifiers, unknown or missing variants and failed loads log a `console.warn` once; production builds strip these warnings.

### Metadata Lookups

The `react-web3-icons/meta` subpath exports lookup maps for resolving icons by chain ID, slug, or ticker symbol at runtime:

| Export | Key | Value | Example |
| --- | --- | --- | --- |
| `CHAIN_ID_TO_NAME` | EVM chain ID (`1`, `42161`, …) | Chain icon base name | `1` → `'Ethereum'` |
| `CHAIN_SLUG_TO_NAME` | Lowercased slug (`'arbitrum'`, …) | Chain icon base name | `'arbitrum'` → `'Arbitrum'` |
| `TICKER_TO_COIN` | Uppercase ticker (`'ETH'`, …) | Coin icon base name | `'ETH'` → `'Eth'` |
| `WALLET_SLUG_TO_NAME` | Lowercased slug (`'metamask'`, …) | Wallet icon base name | `'metamask'` → `'MetaMask'` |
| `EXCHANGE_SLUG_TO_NAME` | Lowercased slug (`'binance'`, …) | Exchange icon base name | `'binance'` → `'Binance'` |
| `DEFI_SLUG_TO_NAME` | Lowercased slug (`'aave'`, …) | DeFi icon base name | `'aave'` → `'Aave'` |
| `DEX_SLUG_TO_NAME` | Lowercased slug (`'uniswap'`, …) | DEX icon base name | `'uniswap'` → `'Uniswap'` |
| `BRIDGE_SLUG_TO_NAME` | Lowercased slug (`'layerzero'`, …) | Bridge icon base name | `'layerzero'` → `'LayerZero'` |
| `ORACLE_SLUG_TO_NAME` | Lowercased slug (`'pyth'`, …) | Oracle icon base name | `'pyth'` → `'Pyth'` |

Each map exports a corresponding type (`ChainId`, `ChainSlug`, `Ticker`, `WalletSlug`, `ExchangeSlug`, `DefiSlug`, `DexSlug`, `BridgeSlug`, `OracleSlug`) for type-safe key access.

The [dynamic components](#dynamic-icon-components) use these maps internally, so `<ChainIcon chainId={chain.id} />` or `<CoinIcon symbol={token.symbol} />` is usually all you need. Use the maps directly when you need to render synchronously, without `Suspense`. In a Server Component the namespace imports below cost nothing on the client, because the icons render to HTML on the server.

#### Example: Resolve a chain icon from wagmi/viem

In client code, looking up an arbitrary name needs the whole category module, so this pattern bundles every chain icon (about 31 KB, see [Bundle Size](#bundle-size)):

```tsx
import * as chains from 'react-web3-icons/chain'; // bundles every chain icon
import { CHAIN_ID_TO_NAME, type ChainId } from 'react-web3-icons/meta';

function ResolvedChainIcon({ chainId }: { chainId: number }) {
  if (!Object.hasOwn(CHAIN_ID_TO_NAME, chainId)) return null;
  const Icon = chains[CHAIN_ID_TO_NAME[chainId as ChainId]];
  return <Icon />;
}
```

#### Example: Resolve a coin icon from a ticker

The same trade-off applies: in client code this bundles every coin icon (about 64 KB). If your app only shows a known set of tokens, import those icons by name and map tickers to them yourself.

```tsx
import * as coins from 'react-web3-icons/coin'; // bundles every coin icon
import { TICKER_TO_COIN, type Ticker } from 'react-web3-icons/meta';

function TokenIcon({ symbol }: { symbol: string }) {
  const key = symbol.trim().toUpperCase();
  if (!Object.hasOwn(TICKER_TO_COIN, key)) return null;
  const Icon = coins[TICKER_TO_COIN[key as Ticker]];
  return <Icon />;
}
```

### Icon Manifest

The `react-web3-icons/manifest` subpath exports a flat, machine-readable catalog of every icon export — ideal for building icon pickers, search indexes, or docs without importing the component bundles:

```ts
import { ICON_MANIFEST } from 'react-web3-icons/manifest';

// [{ name: 'Ethereum', category: 'chain', chainId: 1, slug: 'ethereum' },
//  { name: 'EthereumMono', category: 'chain' }, ...]
const chains = ICON_MANIFEST.filter(e => e.category === 'chain' && !e.deprecated);
```

Each entry (type `IconManifestEntry`) carries `name`, `category`, and — where registered in the [metadata maps](#metadata-lookups) — `chainId`, `slug`, or `ticker`, plus a `deprecated` flag for aliases. Base entries additionally list their `variants` (e.g. `['', 'Mono', 'Circle']`), extra lowercase search `aliases` (e.g. `'btc'` on `Bitcoin`), and a `brandColor` (the most frequent non-neutral colour of the colored artwork, or a curated override). The same data ships as plain JSON for non-JavaScript consumers at `react-web3-icons/manifest.json` (also available on the CDN under `dist/manifest.json`).

## Bundle Size

The package ships one ES module per icon, marks every icon `/* @__PURE__ */`, and declares `"sideEffects": false`, so a bundler that tree-shakes ES modules (Vite, Rollup, webpack, esbuild) keeps only the icons your code imports by name. The import style decides the size, not the import path:

| Import | Bundled | Size |
| --- | --- | --- |
| `import { Ethereum } from 'react-web3-icons'` | `Ethereum` only | ~0.5 KB |
| `import { Ethereum } from 'react-web3-icons/chain'` | `Ethereum` only (same as the root import) | ~0.5 KB |
| `import * as chains from 'react-web3-icons/chain'` + `chains[name]` | every chain icon | ~31 KB |
| `import * as coins from 'react-web3-icons/coin'` + `coins[name]` | every coin icon | ~64 KB |
| `import * as icons from 'react-web3-icons'` + `icons[name]` | the whole library | ~155 KB |
| `<CoinIcon symbol={symbol} />` from `react-web3-icons/dynamic` | a small loader, then one chunk per icon rendered | — |

Sizes are minified and brotli-compressed with React excluded, as reported by `pnpm run size`. The budgets live in the `size-limit` field of [package.json](./package.json) and are checked on every pull request.

- Import icons by name, from the root or from a category subpath. Both tree-shake equally.
- In client code, avoid `import * as …` combined with a runtime lookup such as `icons[name]` or `Object.keys(icons)`. The bundler can't tell which icons you use, so it keeps all of them.
- To pick icons from runtime data (a token list, the connected chain), use the [dynamic components](#dynamic-icon-components). They need a bundler that splits dynamic `import()` into chunks; without code splitting, the dynamic entry inlines every icon it can load (~129 KB).
- To list or search icons, use the [manifest](#icon-manifest) (~5 KB) instead of a namespace import.

## Icon Categories

| Category | Description | Examples |
| --- | --- | --- |
| `bridge` | Cross-chain bridge protocols | Across, LayerZero, Stargate, Wormhole |
| `chain` | L1/L2 blockchains | Ethereum, Arbitrum, Polygon, Solana |
| `coin` | Cryptocurrencies & tokens | Bitcoin, Doge, Usdt, Usdc |
| `defi` | DeFi protocols | Aave, EigenLayer, Lido |
| `devtool` | Developer tools | Hardhat, Viem, Wagmi |
| `dex` | Decentralized exchanges | Uniswap, PancakeSwap, Dydx |
| `domain` | Domain services | Ens, UnstoppableDomains |
| `exchange` | Centralized exchanges | Binance, Coinbase, Kraken |
| `explorer` | Block explorers | Etherscan, Bscscan, Solscan |
| `marketplace` | NFT marketplaces | OpenSea, MagicEden, LooksRare |
| `node` | Node providers | Alchemy, Infura, QuickNode |
| `oracle` | Oracle networks | Pyth, Band, API3, RedStone |
| `portfolio` | Portfolio trackers | DeBank, Zapper, CoinLedger |
| `storage` | Decentralized storage | Ipfs, Arweave, Pinata |
| `tracker` | Analytics & tracking | DefiLlama, CoinGecko, CoinMarketCap |
| `wallet` | Wallet apps | MetaMask, Phantom, Rainbow |

Browse the full list at the **[demo site](https://react-web3-icons.vercel.app/)**.

## Props

All icons extend `SVGProps<SVGSVGElement>` with the following additions:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Accessible title rendered as `<title>` inside the SVG |
| `titleId` | `string` | — | ID applied to the `<title>` element; when provided together with `title`, `aria-labelledby` is automatically set to this value |
| `size` | `string \| number` | `"1em"` | Sets both width and height unless explicitly overridden |
| `width` | `string \| number` | — | Icon width (overrides `size` for width only) |
| `height` | `string \| number` | — | Icon height (overrides `size` for height only) |
| `className` | `string` | — | CSS class name |
| `style` | `CSSProperties` | — | Inline styles |

Plus all standard SVG attributes (`fill`, `stroke`, `opacity`, `onClick`, etc.).

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding icons, lifecycle/deprecation rules, the SVG optimization pipeline, and submitting pull requests.

## Icon Lifecycle Policy

When icon brands are renamed (for example, `Argent` -> `Ready`, `PhantomWallet` -> `Phantom`), this project keeps backward compatibility by shipping deprecated aliases.

- Canonical exports follow the current official brand name.
- Deprecated exports (aliases of renamed icons, and artwork of retired brands) stay available for at least one minor release and at least 90 days.
- Deprecated exports are removed only in major releases, and removals are documented in changelog/release notes.

### Filtering Deprecated Icons

The `DEPRECATED_ICON_NAMES` set lists every deprecated export. Import it from the `react-web3-icons/deprecated` subpath (it is also exported from the root) to filter a list of names:

```ts
import { DEPRECATED_ICON_NAMES } from 'react-web3-icons/deprecated';

const iconNames = ['Ethereum', 'Argent', 'Ready'];
const current = iconNames.filter(name => !DEPRECATED_ICON_NAMES.has(name)); // ['Ethereum', 'Ready']
```

To enumerate the current icons, use the [manifest](#icon-manifest), which flags deprecated entries itself. `Object.keys()` on `import * as icons from 'react-web3-icons'` also works, but it bundles the whole library.

```ts
import { ICON_MANIFEST } from 'react-web3-icons/manifest';

// A Set, because an icon exported from two categories (e.g. Sonic) has two entries
const activeIconNames = new Set(ICON_MANIFEST.filter(e => !e.deprecated).map(e => e.name));
```

Full process and test requirements: [docs/icon-lifecycle.md](docs/icon-lifecycle.md).

## Trademarks

All product names, logos, and brands contained in this library are the property
of their respective owners and are used for identification purposes only. Their
inclusion does not imply any affiliation with or endorsement by the trademark
holders. The MIT license covers this library's code, not the trademarks
themselves — your use of a logo remains subject to the brand guidelines of its
owner.

If you are a rights holder and would like an icon corrected or removed, please
[open an issue](https://github.com/derodero24/react-web3-icons/issues/new/choose)
and we will address it promptly.

## License

[MIT](LICENSE)
