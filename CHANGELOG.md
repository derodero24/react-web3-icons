# Changelog

## 2.0.1

### Patch Changes

- [#130](https://github.com/derodero24/react-web3-icons/pull/130) [`5508c60`](https://github.com/derodero24/react-web3-icons/commit/5508c60709e882d507fd9f355b5738af8e4e4886) Thanks [@derodero24](https://github.com/derodero24)! - Add missing forwardRef wrappers to Coinpanda2, Coinpanda3, CoinpandaMono2, and CoinpandaMono3

## 2.0.0

### Major Changes

- [#103](https://github.com/derodero24/react-web3-icons/pull/103) [`4a9f273`](https://github.com/derodero24/react-web3-icons/commit/4a9f273e89286fa9b4c1321e3ac82ecc0609f875) Thanks [@derodero24](https://github.com/derodero24)! - Rename rebranded services to current names:

  - Add `Safe` / `SafeMono` and deprecate `GnosisSafe*` aliases
  - Add `Pol` / `Pol*` and deprecate `Matic*` aliases
  - Update the example icon catalog to prefer `Safe` and `Pol`

- [`0e17d34`](https://github.com/derodero24/react-web3-icons/commit/0e17d34b249c2e22137eebeb44782459d0aefd3a) Thanks [@derodero24](https://github.com/derodero24)! - ### Breaking Changes

  - **React 18+ required**: Narrowed peer dependency from `>=16` to `>=18` to enable modern APIs (`useId`, `forwardRef` improvements)
  - **`IconProps` type changed**: Now extends `SVGProps<SVGSVGElement>` instead of `SVGAttributes<SVGElement>`, providing more precise typing for SVG elements
  - **New `size` prop**: All icons accept a `size` prop (defaults to `"1em"`) that sets both `width` and `height`. If you previously passed non-standard props that happen to be named `size`, they will now be intercepted
  - **`type: module`**: Package now sets `"type": "module"` in package.json. Dual CJS/ESM exports are still provided, so most consumers are unaffected

  ### New Features

  - **`createIcon` factory**: All icon components are now built with a shared factory that provides consistent behavior
  - **Ref forwarding**: All icons support `React.forwardRef` for direct DOM access
  - **`size` prop**: Unified sizing via a single `size` prop (e.g., `<Ethereum size={24} />`)
  - **`title` / `titleId` props**: Built-in accessible labeling support
  - **Automatic `aria-hidden`**: Icons without an accessible name (`title`, `aria-label`, or `aria-labelledby`) are automatically marked as decorative
  - **Dynamic SVG IDs**: Internal `<mask>`, `<linearGradient>`, `<clipPath>`, and `<filter>` IDs are generated via `useId()` to prevent collisions when multiple icons render on the same page
  - **Tree-shaking**: Added `"sideEffects": false` to package.json for optimal bundle sizes

  ### Bug Fixes

  - Fix SVG ID collisions when rendering multiple instances of the same icon
  - Fix ArbitrumNovaMono viewBox clipping
  - Fix MetaMask2 inline `<style>` tag replaced with inline styles for CSP compatibility
  - Fix stroke rendering on TruffleMono and GanacheMono icons
  - Fix `fill="none"` missing on NftStorageMono masked stroke paths
  - Fix `size` prop handling in Coinpanda multi-variant components

  ### Internal

  - Migrated build tool from dts-cli → tsup → tsdown
  - Modernized TypeScript configuration (target ES2022, moduleResolution Bundler)
  - Optimized large SVG files with shared path constants
  - Excluded source files from npm package for smaller install size

### Minor Changes

- [#95](https://github.com/derodero24/react-web3-icons/pull/95) [`917d4b4`](https://github.com/derodero24/react-web3-icons/commit/917d4b4eb8bee8a93c45e31fea5327d83497b6b2) Thanks [@derodero24](https://github.com/derodero24)! - Add `IconContext` for setting default icon props via React Context. Wrap icons in `<IconContext.Provider value={{ size: 24, className: 'icon' }}>` to apply defaults to all descendant icons. Direct props override context values; `style` is shallow-merged.

- [#102](https://github.com/derodero24/react-web3-icons/pull/102) [`5e6efe9`](https://github.com/derodero24/react-web3-icons/commit/5e6efe933d7260a5f4c4e096d9fe739893213a75) Thanks [@derodero24](https://github.com/derodero24)! - Add per-category subpath exports for tree-shaking (e.g. `react-web3-icons/chain`)

- [#107](https://github.com/derodero24/react-web3-icons/pull/107) [`e76dff7`](https://github.com/derodero24/react-web3-icons/commit/e76dff75dfefd4be3d0f0ec457c665f449b6c836) Thanks [@derodero24](https://github.com/derodero24)! - Add TON chain icon variants:

  - `Ton` (colored)
  - `TonMono` (monochrome)

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Mono variant contract tests and alias equivalence tests
- Coverage thresholds (100% statements, functions, lines, branches)
- Pre-push hooks with parallel execution via Lefthook

### Changed

- Migrated git hooks from Husky to Lefthook
- Migrated package manager from npm to pnpm
- Migrated linter/formatter from ESLint + Prettier to Biome
- Migrated test framework from Jest to Vitest
- Migrated build tool from dts-cli to tsup (then to tsdown)
- Updated all dependencies to latest versions
- Added `"type": "module"` to package.json
- Converted example config files from JS to TypeScript

### Fixed

- Replaced inline `<style>` tag with inline styles in MetaMask2
- Fixed React key anti-pattern in example app IconTable
- Fixed TypeScript type errors in example app

## [1.7.0] - 2023-04-07

### Added

- Arbitrum, Arb (alias) icons
- Gemini, OKX, Gate.io exchange icons
- Web3.js, Solidity, Remix devtool icons
- Moralis, Thirdweb, Aragon, Tally node/governance icons
- CollabLand, TheGraph icons
- Matic (Polygon alias) icon

### Changed

- Renamed `library` category folder to `devtool`
- Updated Polygon and PinataMono icons

## [1.6.0] - 2023-04-03

### Added

- Etherscan, Bscscan, Solscan, Avascan explorer icons
- CoinMarketCap, CoinGecko, DefiLlama tracker icons
- MagicEden marketplace icon
- Zapper, DeBank portfolio icons
- CoinLedger, Coinpanda portfolio icons
- Bybit, Bitstamp, Bitfinex exchange icons

## [1.5.0] - 2023-04-02

### Added

- Stellar and XLM (alias) icons with Mono variants

## [1.4.0] - 2023-03-30

### Added

- Doge, Dai, Shib, Ltc, Busd coin icons
- Avalanche2, Avax (alias) icons

### Fixed

- Avalanche icon rendering

## [1.3.0] - 2023-03-27

### Added

- ENS, UnstoppableDomains domain icons
- IPFS, Pinata (with Mono variant), Arweave storage icons
- EthersJs, Truffle, Ganache, Drizzle devtool icons
- X2Y2 marketplace icon

## [1.2.1] - 2023-03-27

### Fixed

- OpenSeaMono2 icon sizing

## [1.2.0] - 2023-03-27

### Added

- Mono variants: Cake, Looks, Xrp2, Usdc, Bnb, Cardano2/Ada2, PancakeSwap

### Changed

- Updated example page design

## [1.1.0] - 2023-03-26

### Added

- Wallet icons: TrustWallet, CoinbaseWallet, Argent, GnosisSafe, NamiWallet, YoroiWallet, DaedalusWallet, RainbowWallet
- Exchange icons: Coinbase, Kraken, KuCoin
- Infrastructure icons: QuickNode, Infura
- Devtool icons: OpenZeppelin, Hardhat, PolkadotJs
- Zerion (with variant and Mono) icons
- NftStorage, TofuNft marketplace icons

### Fixed

- UsdtMono icon export
- Example app dark mode

## [1.0.0] - 2023-03-25

### Changed

- Reorganized icon categories into separate folders
- Updated example page

## [0.3.1] - 2023-03-15

### Fixed

- Package metadata (added keywords)

## [0.3.0] - 2023-03-15

### Added

- Initial public release with chain, coin, dex, wallet, and marketplace icons

[Unreleased]: https://github.com/derodero24/react-web3-icons/compare/v1.7.0...HEAD
[1.7.0]: https://github.com/derodero24/react-web3-icons/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/derodero24/react-web3-icons/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/derodero24/react-web3-icons/compare/1.4.0...v1.5.0
[1.4.0]: https://github.com/derodero24/react-web3-icons/compare/v1.3.0...1.4.0
[1.3.0]: https://github.com/derodero24/react-web3-icons/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/derodero24/react-web3-icons/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/derodero24/react-web3-icons/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/derodero24/react-web3-icons/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/derodero24/react-web3-icons/compare/v0.3.1...v1.0.0
[0.3.1]: https://github.com/derodero24/react-web3-icons/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/derodero24/react-web3-icons/releases/tag/v0.3.0
