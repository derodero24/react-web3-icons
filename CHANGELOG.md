# Changelog

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
