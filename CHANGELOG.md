# Changelog

## 3.2.0

### Minor Changes

- [#675](https://github.com/derodero24/react-web3-icons/pull/675) [`bd1a278`](https://github.com/derodero24/react-web3-icons/commit/bd1a2780086e95f607c3efd350896b2d222fd8f4) Thanks [@derodero24](https://github.com/derodero24)! - Add Viem icon variants (Viem, ViemMono) to devtool category

## 3.1.0

### Minor Changes

- [`8dcbff3`](https://github.com/derodero24/react-web3-icons/commit/8dcbff3e8527251a667ea1e0f6759e00c5ef4bc9) Thanks [@derodero24](https://github.com/derodero24)! - Add Axelar and deBridge bridge icons

- [`a5f969b`](https://github.com/derodero24/react-web3-icons/commit/a5f969bd38d4ff148889707f351c22faef92f16d) Thanks [@derodero24](https://github.com/derodero24)! - Add BCH (Bitcoin Cash), KAS (Kaspa), and CRO (Cronos) coin icons with colored and mono variants

- [`f8743c5`](https://github.com/derodero24/react-web3-icons/commit/f8743c5ef133e988209d4a4ee0fe5de9acb4eba2) Thanks [@derodero24](https://github.com/derodero24)! - Add Taiko, World Chain, and Ink chain icons

- [`393540e`](https://github.com/derodero24/react-web3-icons/commit/393540e0dafac8238cf02aad2a8bdc256f362138) Thanks [@derodero24](https://github.com/derodero24)! - Add DefiIcon, DexIcon, and BridgeIcon dynamic components for runtime icon loading by protocol name

- [`0dd8a55`](https://github.com/derodero24/react-web3-icons/commit/0dd8a55f5ad4e2960b7d7ac1485a9216e839f103) Thanks [@derodero24](https://github.com/derodero24)! - feat(coin): add ENA and VET coin icons

  Add colored and mono variants for:

  - ENA (Ethena)
  - VET (VeChain)

- [#645](https://github.com/derodero24/react-web3-icons/pull/645) [`8e0107a`](https://github.com/derodero24/react-web3-icons/commit/8e0107a2d46d2f515fb6ee6f7d5e04bc7dcab8c3) Thanks [@derodero24](https://github.com/derodero24)! - Add EtherFi and Babylon DeFi protocol icons

- [#635](https://github.com/derodero24/react-web3-icons/pull/635) [`bf69fdb`](https://github.com/derodero24/react-web3-icons/commit/bf69fdb18a28665b4ff6cc4b48054754bc285b7f) Thanks [@derodero24](https://github.com/derodero24)! - Add `Flare` / `FlareMono` coin icons for the Flare Network native token (FLR). `Flr` / `FlrMono` are available as ticker aliases. `FLR` is also registered in `TICKER_TO_COIN` for dynamic resolution.

- [`fb336bf`](https://github.com/derodero24/react-web3-icons/commit/fb336bfe2916f7389f7cfaf0fdbe49f1a47b3d07) Thanks [@derodero24](https://github.com/derodero24)! - Add missing chain IDs and slugs to meta maps for supported chains

- [`1e22da8`](https://github.com/derodero24/react-web3-icons/commit/1e22da8a3f356b7d668ffbabfe8575b3eb0a0a00) Thanks [@derodero24](https://github.com/derodero24)! - Add Odos and ParaSwap DEX icons

- [`ac14b1c`](https://github.com/derodero24/react-web3-icons/commit/ac14b1c858d20abeca3528cfaff08c44dd3b789d) Thanks [@derodero24](https://github.com/derodero24)! - Add Solflare wallet icon (colored and mono variants)

- [#653](https://github.com/derodero24/react-web3-icons/pull/653) [`a4f5664`](https://github.com/derodero24/react-web3-icons/commit/a4f5664e279ee85b3e8fa52b739a72f28d17d071) Thanks [@derodero24](https://github.com/derodero24)! - Add static SVG file exports to the npm package.

  Running `pnpm run build` now also executes `scripts/generate-svgs.mjs`, which renders every icon component to a static `.svg` file and writes them to `dist/svg/<category>/<Name>.svg`. These files are included in the published package (already covered by the `"files": ["dist"]` field).

  This enables use in non-React environments — Vue, Svelte, Angular, static HTML, CDN delivery, Figma plugins, and any toolchain that can import or reference plain SVG files.

- [#637](https://github.com/derodero24/react-web3-icons/pull/637) [`c7a56a2`](https://github.com/derodero24/react-web3-icons/commit/c7a56a2134228c08e17b68dd3128bc97998ae405) Thanks [@derodero24](https://github.com/derodero24)! - Add `Venus` / `VenusMono` DeFi protocol icons for Venus Protocol.

- [`8972524`](https://github.com/derodero24/react-web3-icons/commit/89725248780c66eef40573a1ffe02354c98ba85e) Thanks [@derodero24](https://github.com/derodero24)! - Add XMR (Monero) and ZEC (Zcash) coin icons with colored and mono variants

- [`55d0389`](https://github.com/derodero24/react-web3-icons/commit/55d03899551111d6d98458deec70d813e9ce8891) Thanks [@derodero24](https://github.com/derodero24)! - Export WALLET_SLUG_TO_NAME and EXCHANGE_SLUG_TO_NAME from react-web3-icons/meta for runtime wallet/exchange lookups

- [`219310b`](https://github.com/derodero24/react-web3-icons/commit/219310ba0ba0bd963c904549ef157f491eafd507) Thanks [@derodero24](https://github.com/derodero24)! - Add TypeScript autocomplete hints for dynamic icon component props

### Patch Changes

- [#647](https://github.com/derodero24/react-web3-icons/pull/647) [`125fc11`](https://github.com/derodero24/react-web3-icons/commit/125fc11d2accc5e0cead6435329a839b9062363f) Thanks [@derodero24](https://github.com/derodero24)! - Add JSDoc descriptions to all exported icon components for improved IDE intellisense

- [#632](https://github.com/derodero24/react-web3-icons/pull/632) [`71c0518`](https://github.com/derodero24/react-web3-icons/commit/71c05186770aa3092975fcbc19e609a5143c34f3) Thanks [@derodero24](https://github.com/derodero24)! - Deprecate `TofuNft` and `TofuNftMono` — tofunft.com shut down permanently in 2024. Both icons are now marked `@deprecated` and included in `DEPRECATED_ICON_NAMES`.

- [#642](https://github.com/derodero24/react-web3-icons/pull/642) [`2b9617b`](https://github.com/derodero24/react-web3-icons/commit/2b9617b9f6ced6662859407ea0c84d31ae157e9f) Thanks [@derodero24](https://github.com/derodero24)! - Deprecate `Ganache`, `GanacheMono`, `Truffle`, `TruffleMono`, `Drizzle`, and `DrizzleMono` — ConsenSys sunset Truffle Suite in September 2023.

- [`883e6e6`](https://github.com/derodero24/react-web3-icons/commit/883e6e6e355353aa52fd97f6d3090ad21dbba11b) Thanks [@derodero24](https://github.com/derodero24)! - Log a development-mode warning when a dynamic icon component resolves a name that does not exist in the category module

- [#655](https://github.com/derodero24/react-web3-icons/pull/655) [`5cb6d45`](https://github.com/derodero24/react-web3-icons/commit/5cb6d45ee239573084ef9f32336db783a2e56c90) Thanks [@derodero24](https://github.com/derodero24)! - Revert NftStorageMono to the original stroke-based implementation that was broken by [#644](https://github.com/derodero24/react-web3-icons/issues/644)

## 3.0.0

> **Upgrading from v2?** See the [Migration Guide](./MIGRATION.md) for step-by-step instructions.

### Major Changes

- [#375](https://github.com/derodero24/react-web3-icons/pull/375) [`7db69e8`](https://github.com/derodero24/react-web3-icons/commit/7db69e86257e365446e9b1bb4a04afa7b649fe74) Thanks [@derodero24](https://github.com/derodero24)! - Drop CommonJS (CJS) output — distribute ESM only.

  The library now publishes only `.mjs` and `.d.mts` files. CommonJS `require()` is no longer supported.

  Most modern bundlers (Vite, Webpack 5, Next.js, etc.) and runtimes (Node.js 20+) fully support ESM natively. Dropping CJS reduces published package size and removes the tsdown CJS deprecation warning.

  **Migration:** If you were using `require('react-web3-icons')`, switch to ESM `import` syntax. No import paths or API surface changed.

- [`754a2f2`](https://github.com/derodero24/react-web3-icons/commit/754a2f28ec035df29f24289d8bcc8bf589466575) Thanks [@derodero24](https://github.com/derodero24)! - Replace opaque numeric suffixes with descriptive variant names across all icon exports.

  **Breaking changes:**

  All numbered icon variants (`Foo2`, `Foo3`, `Foo4`) are renamed to descriptive suffixes that convey the visual shape:

  - `Circle` — symbol on circular background (e.g. `BitcoinCircle`)
  - `Square` — symbol on square/rounded-rect background (e.g. `DydxSquare`)
  - `Wordmark` — symbol with text (e.g. `MagicEdenWordmark`)
  - `Alt` — alternative color scheme (e.g. `MetaMaskAlt`)
  - `Light` — light-colored variant for dark backgrounds (e.g. `BybitLight`)
  - `Flat` — single brand color simplification (e.g. `ArbitrumOneFlat`)
  - `Symbol` / `SymbolMono` — standalone symbol without container (e.g. `RainbowWalletSymbol`, `OpenSeaSymbolMono`)

  Some icons swap which variant is the base name — the standalone symbol (no background) is now always the unsuffixed default:

  - `Bitcoin` is now the standalone ₿ symbol; the orange circle version is `BitcoinCircle`
  - `Avalanche` is now the standalone A-mountain; the red circle is `AvalancheCircle`
  - `Dai` is now the standalone D; the gold circle is `DaiCircle`
  - `Coinbase` is now the standalone C; circle variants are `CoinbaseCircle` / `CoinbaseCircleAlt`
  - `MagicEden` is now the icon only; wordmark variants are `MagicEdenWordmark` / `MagicEdenWordmarkFlat`
  - `Avascan` is now the icon only; wordmark variants are `AvascanWordmark` / `AvascanWordmarkMono`

  Coin aliases follow their chain counterparts (e.g. `Btc` → standalone, `BtcCircle` → circle).

  Removed exports: `GnosisSafe2`, `GnosisSafeMono2` — use `GnosisSafe` / `GnosisSafeMono` instead (identical components).

  See CONTRIBUTING.md § "Icon Variant Naming Convention" for the full suffix reference.

### Minor Changes

- [`8319a8f`](https://github.com/derodero24/react-web3-icons/commit/8319a8f423f1d3c82af844286998556c87fa4661) Thanks [@derodero24](https://github.com/derodero24)! - feat(defi): add Aave and Lido icons

- [`e138519`](https://github.com/derodero24/react-web3-icons/commit/e138519912ec78f4deb32b415cc518b60d773890) Thanks [@derodero24](https://github.com/derodero24)! - feat(bridge): add Wormhole, Stargate, LayerZero, and Across bridge icons

- [#498](https://github.com/derodero24/react-web3-icons/pull/498) [`45a505c`](https://github.com/derodero24/react-web3-icons/commit/45a505cf7d83202a3fea1c69cf0b3d2c7b916da3) Thanks [@derodero24](https://github.com/derodero24)! - Add Circle variants for Optimism, Base, ZkSync, StarkNet chains

- [#502](https://github.com/derodero24/react-web3-icons/pull/502) [`7087b46`](https://github.com/derodero24/react-web3-icons/commit/7087b46ea8507007eba078edf1af59661358aeb2) Thanks [@derodero24](https://github.com/derodero24)! - Add Square variants for top-10 chain icons

- [#497](https://github.com/derodero24/react-web3-icons/pull/497) [`71bc52f`](https://github.com/derodero24/react-web3-icons/commit/71bc52fa89cabb8f8bf2f05cd8026ffa7b518e1e) Thanks [@derodero24](https://github.com/derodero24)! - Add Circle variants for BNB, USDC, and Doge coins

- [#496](https://github.com/derodero24/react-web3-icons/pull/496) [`ea9730b`](https://github.com/derodero24/react-web3-icons/commit/ea9730b8d809df97c4e1a4772969d0501c35492a) Thanks [@derodero24](https://github.com/derodero24)! - feat(coin): add Circle variants for Ethereum, Solana, and USDT

  Add `EthereumCircle`, `EthereumCircleMono`, `SolanaCircle`, `SolanaCircleMono`,
  `UsdtCircle`, and `UsdtCircleMono` — branded circle background icons for the
  most commonly used tokens in swap UIs and token lists.

  Coin re-exports: `EthCircle`, `EthCircleMono`, `SolCircle`, `SolCircleMono`.

- [`5f1f823`](https://github.com/derodero24/react-web3-icons/commit/5f1f823d20565ea3359bae8e32b04274ec532e33) Thanks [@derodero24](https://github.com/derodero24)! - Add DefiLlamaMono variant for monochrome usage

- [`33b9d35`](https://github.com/derodero24/react-web3-icons/commit/33b9d352b211cd3bb5fe9ae2a9a9a6df4e7bdcf0) Thanks [@derodero24](https://github.com/derodero24)! - feat(dex): add 1inch, SushiSwap, and Raydium DEX icons

- [#492](https://github.com/derodero24/react-web3-icons/pull/492) [`176d35c`](https://github.com/derodero24/react-web3-icons/commit/176d35c936eb36d81a49b09aff6185da769c76ac) Thanks [@derodero24](https://github.com/derodero24)! - feat(coin): add DogeMono and ShibMono variants

  - DogeMono: mask-based circle with "D" lettermark cutout at 24×24
  - ShibMono: outline silhouette path at 24×24

- [#486](https://github.com/derodero24/react-web3-icons/pull/486) [`0cb7fca`](https://github.com/derodero24/react-web3-icons/commit/0cb7fca148a5a28918e5a752a6557903690dcd98) Thanks [@derodero24](https://github.com/derodero24)! - Add `react-web3-icons/dynamic` subpath with lazy-loading icon components (ChainIcon, CoinIcon, WalletIcon, ExchangeIcon)

- [`3014407`](https://github.com/derodero24/react-web3-icons/commit/3014407bc31c1053539fbd19dda0b80208531223) Thanks [@derodero24](https://github.com/derodero24)! - feat(defi): add EigenLayer icon variants

- [#488](https://github.com/derodero24/react-web3-icons/pull/488) [`106e1a3`](https://github.com/derodero24/react-web3-icons/commit/106e1a30c7ced5bf70e8c73eb4dccb5733883d0b) Thanks [@derodero24](https://github.com/derodero24)! - Add 8 EVM-compatible chain icons: Blast, Celo, Gnosis Chain, Metis, Zora, Mode, Manta Pacific, Fraxtal with colored and mono variants

- [#491](https://github.com/derodero24/react-web3-icons/pull/491) [`b4aa6c8`](https://github.com/derodero24/react-web3-icons/commit/b4aa6c89252e2b83d28f37f6f80b8a236146aa2f) Thanks [@derodero24](https://github.com/derodero24)! - Add 4 exchange icons: Bithumb, Upbit, Deribit, Phemex with colored and mono variants

- [#485](https://github.com/derodero24/react-web3-icons/pull/485) [`b10665b`](https://github.com/derodero24/react-web3-icons/commit/b10665bf0aac27b5444f545cdd91d0ffe3bcac8d) Thanks [@derodero24](https://github.com/derodero24)! - Add `react-web3-icons/meta` subpath with chain ID, slug, and ticker lookup maps

- [#489](https://github.com/derodero24/react-web3-icons/pull/489) [`0beaf35`](https://github.com/derodero24/react-web3-icons/commit/0beaf35e0c77d23eabdb79170611080573a704e5) Thanks [@derodero24](https://github.com/derodero24)! - Add 6 non-EVM chain icons: Cosmos Hub, Hedera, Celestia, Injective, Stacks, Kava with colored and mono variants

- [`a715371`](https://github.com/derodero24/react-web3-icons/commit/a715371aeabc57937c1f8fbc1c05831ae8467808) Thanks [@derodero24](https://github.com/derodero24)! - Add Sol and SolMono coin exports by re-exporting Solana chain icon

- [#487](https://github.com/derodero24/react-web3-icons/pull/487) [`82148bf`](https://github.com/derodero24/react-web3-icons/commit/82148bf79088deb872618cf242128e5f4cf893aa) Thanks [@derodero24](https://github.com/derodero24)! - Add missing top-50 coin icons: TON, DOT, NEAR (re-exports from chain), ICP, HBAR, PEPE, INJ, TIA, STX, FET with colored and mono variants

- [#499](https://github.com/derodero24/react-web3-icons/pull/499) [`e6b01d0`](https://github.com/derodero24/react-web3-icons/commit/e6b01d0bde5986bcf3cc27b1aeba26e32cc7a74e) Thanks [@derodero24](https://github.com/derodero24)! - Add Circle and CircleMono variants for MetaMask, PhantomWallet, CoinbaseWallet, WalletConnect, and RainbowWallet

- [#490](https://github.com/derodero24/react-web3-icons/pull/490) [`db3d9d3`](https://github.com/derodero24/react-web3-icons/commit/db3d9d3e3dbfe3ef26c738064374189cd6403fa9) Thanks [@derodero24](https://github.com/derodero24)! - Add 5 wallet icons: Enkrypt, imToken, Bitget Wallet, SubWallet, Tangem with colored and mono variants

- [#503](https://github.com/derodero24/react-web3-icons/pull/503) [`b944269`](https://github.com/derodero24/react-web3-icons/commit/b94426904db1df4ddcc0b3c3884c7dbd738b973b) Thanks [@derodero24](https://github.com/derodero24)! - Add Square variants for top wallet icons

- [#398](https://github.com/derodero24/react-web3-icons/pull/398) [`f142632`](https://github.com/derodero24/react-web3-icons/commit/f142632fc2ae1e2927f2002533050ab2de88fa19) Thanks [@derodero24](https://github.com/derodero24)! - feat(wallet): add BackpackWallet and BackpackWalletMono icon variants

- [#399](https://github.com/derodero24/react-web3-icons/pull/399) [`5f61056`](https://github.com/derodero24/react-web3-icons/commit/5f610562ed68f18aeecb6ef33b103131dbfa3fb3) Thanks [@derodero24](https://github.com/derodero24)! - feat(chain): add Base and Optimism chain icon variants

- [`824dc44`](https://github.com/derodero24/react-web3-icons/commit/824dc44ac50ec9b263b84042d7d3ea10affa2d72) Thanks [@derodero24](https://github.com/derodero24)! - feat(coin): add CRV (Curve Finance) icon variants

- [`1b0f402`](https://github.com/derodero24/react-web3-icons/commit/1b0f402399cba2d070d8edb3f939410b6e156e41) Thanks [@derodero24](https://github.com/derodero24)! - feat(coin): add MKR token icon as re-export from MakerDao

- [#409](https://github.com/derodero24/react-web3-icons/pull/409) [`bdac6b2`](https://github.com/derodero24/react-web3-icons/commit/bdac6b28e54e85747fb03208d3f744ca0465f596) Thanks [@derodero24](https://github.com/derodero24)! - feat(coin): add TRX, OP, APT, MNT, FTM, LINK, UNI, LDO, EIGEN, JUP coin exports

- [`26436f3`](https://github.com/derodero24/react-web3-icons/commit/26436f333419e2c12e245c0f20d6d2109692a753) Thanks [@derodero24](https://github.com/derodero24)! - feat(coin): add WLD (Worldcoin) token icon

- [#393](https://github.com/derodero24/react-web3-icons/pull/393) [`aba4724`](https://github.com/derodero24/react-web3-icons/commit/aba47245c9a53ea32fc129e49475cad0030672ab) Thanks [@derodero24](https://github.com/derodero24)! - Add Balancer and BalancerMono DeFi icon variants

- [`1d8a26d`](https://github.com/derodero24/react-web3-icons/commit/1d8a26dd087cf584d277ef5ba36cb97848c0e561) Thanks [@derodero24](https://github.com/derodero24)! - feat: add Synthetix (defi), Pyth and Atom (coin) icon variants

- [#394](https://github.com/derodero24/react-web3-icons/pull/394) [`af0cdbc`](https://github.com/derodero24/react-web3-icons/commit/af0cdbc0ae8ab571ca1d9146ed19d49d69a6bfb4) Thanks [@derodero24](https://github.com/derodero24)! - Add Compound and CompoundMono DeFi icon variants

- [#412](https://github.com/derodero24/react-web3-icons/pull/412) [`2528088`](https://github.com/derodero24/react-web3-icons/commit/25280884e3786fdc14687070cd423351d524a339) Thanks [@derodero24](https://github.com/derodero24)! - feat(defi): add Pendle, MakerDao, and RocketPool icon variants

- [#416](https://github.com/derodero24/react-web3-icons/pull/416) [`b8a4fd8`](https://github.com/derodero24/react-web3-icons/commit/b8a4fd80a7b28498ebbc5c0025a13a6aa0327318) Thanks [@derodero24](https://github.com/derodero24)! - feat(defi): add Morpho icon variants

- [#369](https://github.com/derodero24/react-web3-icons/pull/369) [`9847bbd`](https://github.com/derodero24/react-web3-icons/commit/9847bbd58b867d315a7c806adf8950126506867b) Thanks [@derodero24](https://github.com/derodero24)! - Export `DEPRECATED_ICON_NAMES` — a `ReadonlySet<string>` containing the names of all deprecated icon aliases. Useful for filtering duplicates out of icon lists without maintaining a separate copy in your app.

- [`df97fa5`](https://github.com/derodero24/react-web3-icons/commit/df97fa53ec92ca474ad7aece6ae5e1fab8817704) Thanks [@derodero24](https://github.com/derodero24)! - feat(devtool): add Privy icon variants

- [`22b5da1`](https://github.com/derodero24/react-web3-icons/commit/22b5da110f9edba360eaa155198ddeeb04726712) Thanks [@derodero24](https://github.com/derodero24)! - feat(dex): add Aerodrome icon variants

- [`cf3e4d5`](https://github.com/derodero24/react-web3-icons/commit/cf3e4d5708055eb6c92d1ffe598b5281f3658969) Thanks [@derodero24](https://github.com/derodero24)! - feat: add CowProtocol (dex) and Fil (coin) icon variants

- [`b57ac74`](https://github.com/derodero24/react-web3-icons/commit/b57ac74d970e6227d359ace56d43b62e60bef16b) Thanks [@derodero24](https://github.com/derodero24)! - feat(dex): add Hyperliquid icon

- [#392](https://github.com/derodero24/react-web3-icons/pull/392) [`af7abff`](https://github.com/derodero24/react-web3-icons/commit/af7abfffeaa22c454232e843678bc5d78c924ed9) Thanks [@derodero24](https://github.com/derodero24)! - Add Jupiter and JupiterMono DEX icon variants

- [`28184ba`](https://github.com/derodero24/react-web3-icons/commit/28184baf78bc5cdcc6c1bfaa5090a298e96db736) Thanks [@derodero24](https://github.com/derodero24)! - feat(dex): add Osmosis icon

- [#408](https://github.com/derodero24/react-web3-icons/pull/408) [`6fa2c3f`](https://github.com/derodero24/react-web3-icons/commit/6fa2c3f6e2f022d98df38729f69d3410d9b9e412) Thanks [@derodero24](https://github.com/derodero24)! - feat(exchange): add Bitget and CryptoCom icon variants

- [`e8ff9a6`](https://github.com/derodero24/react-web3-icons/commit/e8ff9a621832a884530ef4527fccee8c0343be76) Thanks [@derodero24](https://github.com/derodero24)! - feat(exchange): add HTX and MEXC icon variants

- [#411](https://github.com/derodero24/react-web3-icons/pull/411) [`0d179f9`](https://github.com/derodero24/react-web3-icons/commit/0d179f9668cd2bc40cf37ee09832a1b7b94fe559) Thanks [@derodero24](https://github.com/derodero24)! - feat(wallet): add Exodus and ExodusMono icons

- [`bd6d436`](https://github.com/derodero24/react-web3-icons/commit/bd6d436ef99e47692a9f2ab28859485c2d99c756) Thanks [@derodero24](https://github.com/derodero24)! - feat(explorer): add Arbiscan, Basescan, and Blockscout icon variants

- [#380](https://github.com/derodero24/react-web3-icons/pull/380) [`06f434c`](https://github.com/derodero24/react-web3-icons/commit/06f434c27b4fac5be8f0b205e6fc8e063ba276fa) Thanks [@derodero24](https://github.com/derodero24)! - feat(chain): add `AlgorandCircleMono` variant

- [#388](https://github.com/derodero24/react-web3-icons/pull/388) [`7e587a6`](https://github.com/derodero24/react-web3-icons/commit/7e587a68bc6fb28bf1630e0112f8ca9486e9c8e1) Thanks [@derodero24](https://github.com/derodero24)! - feat(devtool): add Chainlink and ChainlinkMono icon variants

- [#481](https://github.com/derodero24/react-web3-icons/pull/481) [`929a8cd`](https://github.com/derodero24/react-web3-icons/commit/929a8cd091ff98142789ea1aac465f920d5598a2) Thanks [@derodero24](https://github.com/derodero24)! - feat(defi): add Frax, Convex, GMX, Liquity, Spark, and Ethena icons

- [#482](https://github.com/derodero24/react-web3-icons/pull/482) [`6f9e560`](https://github.com/derodero24/react-web3-icons/commit/6f9e560bf978b6f59ac6dbe22722be1e4eb76661) Thanks [@derodero24](https://github.com/derodero24)! - feat(dex): add Velodrome, Camelot, and Ekubo DEX icons

- [#480](https://github.com/derodero24/react-web3-icons/pull/480) [`92f654e`](https://github.com/derodero24/react-web3-icons/commit/92f654ea0740058d69b4fe08914ca09abeb080a7) Thanks [@derodero24](https://github.com/derodero24)! - feat(explorer): add Blastscan, Celoscan, and Routescan explorer icons

- [#479](https://github.com/derodero24/react-web3-icons/pull/479) [`27bd0e0`](https://github.com/derodero24/react-web3-icons/commit/27bd0e0a74206ddf5f2e9e3559e4ceb9a8794ce5) Thanks [@derodero24](https://github.com/derodero24)! - feat(node): add Chainstack and Drpc node provider icons

- [#473](https://github.com/derodero24/react-web3-icons/pull/473) [`4dd9987`](https://github.com/derodero24/react-web3-icons/commit/4dd99870b37070dbc428da8df7a65f110f4a5df5) Thanks [@derodero24](https://github.com/derodero24)! - feat(marketplace): add OpenSeaSymbol colored variant

- [#477](https://github.com/derodero24/react-web3-icons/pull/477) [`2a5fd5a`](https://github.com/derodero24/react-web3-icons/commit/2a5fd5a8f568ffa3dab2e310feb23a22a8c2bae0) Thanks [@derodero24](https://github.com/derodero24)! - feat(defi): add SafeProtocol and SafeProtocolMono icons

- [#478](https://github.com/derodero24/react-web3-icons/pull/478) [`4f347b3`](https://github.com/derodero24/react-web3-icons/commit/4f347b346499165baa131799ee0ba5b7524bae0c) Thanks [@derodero24](https://github.com/derodero24)! - feat(devtool): add Tenderly and TenderlyMono icons

- [#386](https://github.com/derodero24/react-web3-icons/pull/386) [`679e702`](https://github.com/derodero24/react-web3-icons/commit/679e7020fa280fa9aea4f011604945454d948b22) Thanks [@derodero24](https://github.com/derodero24)! - feat(devtool): add Wagmi and WagmiMono icon variants

- [#407](https://github.com/derodero24/react-web3-icons/pull/407) [`d89736b`](https://github.com/derodero24/react-web3-icons/commit/d89736bfc98133c1d25aa6f3ad768551a800a2a8) Thanks [@derodero24](https://github.com/derodero24)! - feat(bridge): add HopProtocol and HopProtocolMono icons

- [#374](https://github.com/derodero24/react-web3-icons/pull/374) [`b4d21ff`](https://github.com/derodero24/react-web3-icons/commit/b4d21ff5d50f4a7fb995656978acf8a294e694db) Thanks [@derodero24](https://github.com/derodero24)! - Export `IconName` union type for type-safe dynamic icon lookup

- [#405](https://github.com/derodero24/react-web3-icons/pull/405) [`852f6c2`](https://github.com/derodero24/react-web3-icons/commit/852f6c2b3008154a64581a97aebf717511a348c4) Thanks [@derodero24](https://github.com/derodero24)! - feat(wallet): add Keplr and KeplrMono icon variants

- [#396](https://github.com/derodero24/react-web3-icons/pull/396) [`7fe8818`](https://github.com/derodero24/react-web3-icons/commit/7fe88188701f9568fc2808e3ef21bc503dc451c5) Thanks [@derodero24](https://github.com/derodero24)! - feat(wallet): add Ledger and LedgerMono icon variants

- [#400](https://github.com/derodero24/react-web3-icons/pull/400) [`12bcedd`](https://github.com/derodero24/react-web3-icons/commit/12bceddf81658e6c97bf0741aebf9dbed1a216f3) Thanks [@derodero24](https://github.com/derodero24)! - feat(chain): add Near and Sui chain icon variants

- [`8e36a1e`](https://github.com/derodero24/react-web3-icons/commit/8e36a1eebcd7ac06bd146698ac51e0a06695d97f) Thanks [@derodero24](https://github.com/derodero24)! - feat(node): add Ankr and Helius icon variants

- [#397](https://github.com/derodero24/react-web3-icons/pull/397) [`019fd3b`](https://github.com/derodero24/react-web3-icons/commit/019fd3b42492c3b504f54ead47a06e2b653c1edb) Thanks [@derodero24](https://github.com/derodero24)! - feat(wallet): add OKXWallet and OKXWalletMono icon variants

- [#410](https://github.com/derodero24/react-web3-icons/pull/410) [`df42cb6`](https://github.com/derodero24/react-web3-icons/commit/df42cb60891624338960c6572da7ec6e1dbf2dbf) Thanks [@derodero24](https://github.com/derodero24)! - feat(wallet): add Rabby and RabbyMono icons

- [#484](https://github.com/derodero24/react-web3-icons/pull/484) [`9af503c`](https://github.com/derodero24/react-web3-icons/commit/9af503c2d99da5e994a243232e43a045a79a4f8a) Thanks [@derodero24](https://github.com/derodero24)! - Rename Light icon variants to Inverted for clearer semantics

  - `EtherscanLight` → `EtherscanInverted`
  - `BasescanLight` → `BasescanInverted`
  - `BscscanLight` → `BscscanInverted`
  - `BybitLight` → `BybitInverted`

  The old `Light` names remain as deprecated re-exports and will be removed in a future major release.

- [`d5572d1`](https://github.com/derodero24/react-web3-icons/commit/d5572d15cbb6c058e45ed71924a4f2734b12a56c) Thanks [@derodero24](https://github.com/derodero24)! - Add structure-only `bridge` and `defi` category exports for future icon additions.

- [#403](https://github.com/derodero24/react-web3-icons/pull/403) [`73e28e8`](https://github.com/derodero24/react-web3-icons/commit/73e28e8131ae54ae9ab54e958c5a9abf41007648) Thanks [@derodero24](https://github.com/derodero24)! - feat(chain): add Scroll, Berachain, and Mantle chain icon variants

- [#402](https://github.com/derodero24/react-web3-icons/pull/402) [`5c091a3`](https://github.com/derodero24/react-web3-icons/commit/5c091a3e3a6938e3e86a6fb21cebcc300db01049) Thanks [@derodero24](https://github.com/derodero24)! - feat(chain): add StarkNet and Sei chain icon variants

- [#406](https://github.com/derodero24/react-web3-icons/pull/406) [`fe6a32a`](https://github.com/derodero24/react-web3-icons/commit/fe6a32ac5a026e79cd6da074bb0d7107873881e7) Thanks [@derodero24](https://github.com/derodero24)! - feat(wallet): add Trezor and TrezorMono icon variants

- [#401](https://github.com/derodero24/react-web3-icons/pull/401) [`f327ef9`](https://github.com/derodero24/react-web3-icons/commit/f327ef9a1d8661593316501b11db09c62c570eba) Thanks [@derodero24](https://github.com/derodero24)! - feat(chain): add Tron, Aptos, and Fantom chain icon variants

- [#391](https://github.com/derodero24/react-web3-icons/pull/391) [`145b0a2`](https://github.com/derodero24/react-web3-icons/commit/145b0a24b657175d91cf3fa44b93ff8109a595bf) Thanks [@derodero24](https://github.com/derodero24)! - Add MetaMaskMono, RainbowWalletMono, and RainbowWalletSymbolMono variants

- [#395](https://github.com/derodero24/react-web3-icons/pull/395) [`4c29e79`](https://github.com/derodero24/react-web3-icons/commit/4c29e79a7e58af81349f8717e85719aaf88dbfff) Thanks [@derodero24](https://github.com/derodero24)! - feat(defi): add Yearn and YearnMono icon variants

- [#404](https://github.com/derodero24/react-web3-icons/pull/404) [`e1d65b1`](https://github.com/derodero24/react-web3-icons/commit/e1d65b16f093580da239f6395f2f71ce7e4d055b) Thanks [@derodero24](https://github.com/derodero24)! - feat(chain): add zkSync Era and Linea chain icon variants

### Patch Changes

- [#358](https://github.com/derodero24/react-web3-icons/pull/358) [`516e50d`](https://github.com/derodero24/react-web3-icons/commit/516e50d36a0d12770522d65148fba520a1efb6f8) Thanks [@derodero24](https://github.com/derodero24)! - Auto-wire `aria-labelledby` when both `title` and `titleId` props are provided

- [`77b389e`](https://github.com/derodero24/react-web3-icons/commit/77b389e82e4de1036c7466ba6b51e38607ad1224) Thanks [@derodero24](https://github.com/derodero24)! - Fix DeBankMono overlay path to use currentColor instead of hardcoded black

- [`f34953c`](https://github.com/derodero24/react-web3-icons/commit/f34953c4522508e63d3b7fafae0449683515c995) Thanks [@derodero24](https://github.com/derodero24)! - Replace global CSS class names with inline fill attributes in Doge icon to prevent namespace collisions

- [#495](https://github.com/derodero24/react-web3-icons/pull/495) [`0dbeaa1`](https://github.com/derodero24/react-web3-icons/commit/0dbeaa1fa416d7bbd2a787f0edae18462155016e) Thanks [@derodero24](https://github.com/derodero24)! - Add missing wallet and exchange slugs to dynamic icon resolve maps

- [`8f738f5`](https://github.com/derodero24/react-web3-icons/commit/8f738f5ea0481c19854eaff9698b257262fd3ab6) Thanks [@derodero24](https://github.com/derodero24)! - Fix CollabLand colors and resolve SVG structural quality issues

  - CollabLand: update fill colors to match official brand-kit (`#1F0061`, `#F6C349`)
  - CollabLand: move `<defs>` before referencing elements in both base and mono variants
  - CollabLandMono: remove extraneous `stroke`/`strokeWidth`/`strokeMiterlimit` from mouth path
  - BitstampCircleMono: move `<defs>` before masked `<path>`
  - PolkadotJsMono: move `<defs>` before masked `<circle>`
  - Kraken: remove `h0 0` no-op path artifact
  - KuCoin: remove `h0` no-op path artifact
  - Safe: remove dead `paintOrder="stroke"` attribute (no stroke defined)

- [#471](https://github.com/derodero24/react-web3-icons/pull/471) [`485a1fa`](https://github.com/derodero24/react-web3-icons/commit/485a1fa0027a281cfc264e6ddf83b8c8a1ff9a8b) Thanks [@derodero24](https://github.com/derodero24)! - fix(explorer): ArbiscanMono now renders the complete Arbitrum A mark

  The previous implementation was missing the two chevron paths that form the upper/inner triangular portion of the Arbitrum A mark, leaving only two diagonal bars inside a hexagon ring. ArbiscanMono now uses a mask-based silhouette approach — a solid hexagon with all logo paths (chevrons, ring outline, and diagonal bars) cut out — producing the recognizable Arbitrum logo in monochrome.

- [`77905be`](https://github.com/derodero24/react-web3-icons/commit/77905be899e68fb04c0f29ef2b0512a36d5a9a5a) Thanks [@derodero24](https://github.com/derodero24)! - Fix Binance icon color to official brand yellow (#F0B90B)

- [`5bb2769`](https://github.com/derodero24/react-web3-icons/commit/5bb276959fff7141802a20f1c94579918c30c6a9) Thanks [@derodero24](https://github.com/derodero24)! - Fix Bitstamp icon green color to match official brand (#149f49)

- [`d1042a3`](https://github.com/derodero24/react-web3-icons/commit/d1042a303ecfd0b90ab3dfcc539fe7d6959f5b4b) Thanks [@derodero24](https://github.com/derodero24)! - fix(exchange): update Bybit viewBox to match current official logo dimensions

- [#472](https://github.com/derodero24/react-web3-icons/pull/472) [`a5f255b`](https://github.com/derodero24/react-web3-icons/commit/a5f255b28383e2a4188ff149fbe772d9757ca802) Thanks [@derodero24](https://github.com/derodero24)! - fix(devtool): ChainlinkMono mask cutout now works with any currentColor

  The `<mask>` element was placed outside `<defs>` (non-conformant SVG) and the inner hexagon cutout path had no explicit `fill`, causing it to inherit `currentColor`. When `currentColor` was white or light, the mask failed to cut out the center, rendering a solid hexagon instead of a ring. Both issues are now fixed: mask moved into `<defs>`, cutout path uses explicit `fill="#000"`.

- [#474](https://github.com/derodero24/react-web3-icons/pull/474) [`87502b0`](https://github.com/derodero24/react-web3-icons/commit/87502b0ba7a7bdd4f484a82cfe07fbe02496debe) Thanks [@derodero24](https://github.com/derodero24)! - fix(chain): update Fantom icon color to reflect Sonic rebrand

- [`5ad1c7a`](https://github.com/derodero24/react-web3-icons/commit/5ad1c7a6b889c5b57d11b1aecc4c597f95e5f38a) Thanks [@derodero24](https://github.com/derodero24)! - Fix Gemini icon color to official brand turquoise (#26DDF9)

- [`bca0f95`](https://github.com/derodero24/react-web3-icons/commit/bca0f95257aca0cc399cee8ce4cf49b88c44543a) Thanks [@derodero24](https://github.com/derodero24)! - Fix Kraken icon color to official brand purple (#5841D8)

- [`32415a9`](https://github.com/derodero24/react-web3-icons/commit/32415a99320442f551a44f580c9e29fb1c324964) Thanks [@derodero24](https://github.com/derodero24)! - Fix KuCoin icon color to official brand green (#23AF91)

- [#540](https://github.com/derodero24/react-web3-icons/pull/540) [`f44e278`](https://github.com/derodero24/react-web3-icons/commit/f44e27813a88eb7e3ecccbea069b322703821ab1) Thanks [@derodero24](https://github.com/derodero24)! - Improve mono variant quality for icons that lost structural detail: add opacity differentiation to Routescan, DRPC, Tenderly, and ICP mono variants; remove invisible shadow from DeBankMono

- [#470](https://github.com/derodero24/react-web3-icons/pull/470) [`1de97da`](https://github.com/derodero24/react-web3-icons/commit/1de97da2dde0237f1e47b870b6ab90d7cb3f3c7b) Thanks [@derodero24](https://github.com/derodero24)! - fix(wallet): RainbowWalletMono now renders with background matching RainbowWallet

  Previously, `RainbowWalletMono` and `RainbowWalletSymbolMono` were identical — both rendered only the arc symbol with viewBox `20 20 80 80`. `RainbowWalletMono` now correctly mirrors the full `RainbowWallet` icon (viewBox `0 0 120 120`) using a solid background with the arc paths cut out via mask.

- [`aba19d8`](https://github.com/derodero24/react-web3-icons/commit/aba19d847356d716a73c562fe36606137aa53ceb) Thanks [@derodero24](https://github.com/derodero24)! - fix(devtool): update Remix icon to current official logomark

- [`6f66cfd`](https://github.com/derodero24/react-web3-icons/commit/6f66cfdc99240133819cf7a93771f62d0057b2fa) Thanks [@derodero24](https://github.com/derodero24)! - Fix Solidity icon color to official brand purple (#2B247C)

- [`85de8df`](https://github.com/derodero24/react-web3-icons/commit/85de8df8a0a08f17bbc0406494f7458fdde61ce9) Thanks [@derodero24](https://github.com/derodero24)! - Fix TheGraph icon colors to current brand purple (#6F4CFF), replacing the outdated cyan-to-blue gradient

- [`8fa566f`](https://github.com/derodero24/react-web3-icons/commit/8fa566fcd45e31c6f1d69324df31f78285f842d5) Thanks [@derodero24](https://github.com/derodero24)! - Fix TON icon color to official brand blue (#0098EA)

- [`6065669`](https://github.com/derodero24/react-web3-icons/commit/606566986238c98e85450984ae46634d3c8e43a6) Thanks [@derodero24](https://github.com/derodero24)! - Fix TrustWallet icon color to post-rebrand brand blue (#0A64BC)

- [`00b9dd5`](https://github.com/derodero24/react-web3-icons/commit/00b9dd565ce53dcb7bc89f33748ccc233b2d7821) Thanks [@derodero24](https://github.com/derodero24)! - Fix Usdt icon color to official Tether brand green (#26A17B)

- [`e26ea11`](https://github.com/derodero24/react-web3-icons/commit/e26ea11c507c083dc8d7d4d13f14863fc9194091) Thanks [@derodero24](https://github.com/derodero24)! - Fix viewBox mismatches between colored and mono variants for Drizzle, Truffle, and EtherscanLight

- [`f29ae4b`](https://github.com/derodero24/react-web3-icons/commit/f29ae4b72978d596fece8b24e1ce6f478a708a86) Thanks [@derodero24](https://github.com/derodero24)! - Fix WalletConnect icon color to official brand blue (#3396FF)

- [#352](https://github.com/derodero24/react-web3-icons/pull/352) [`9b7703e`](https://github.com/derodero24/react-web3-icons/commit/9b7703ea6490d2bd4abbc13a12b21a165ba597e7) Thanks [@derodero24](https://github.com/derodero24)! - Set `displayName` on `IconContext` for improved React DevTools label

- [`09fee48`](https://github.com/derodero24/react-web3-icons/commit/09fee48fca5b315cf87de84d3fe355d1bcc5aef2) Thanks [@derodero24](https://github.com/derodero24)! - Remove invisible dead path element from ImmutableX icon variants

- [`00d6799`](https://github.com/derodero24/react-web3-icons/commit/00d6799ab11a9bf1b9d2eac521efc25c233b4f4d) Thanks [@derodero24](https://github.com/derodero24)! - Deduplicate RainbowWallet and RainbowWalletSymbol SVG rendering

  Extract a shared internal `RainbowWalletBase` component. Both `RainbowWallet` (defaulting `withBackground` to `true`) and `RainbowWalletSymbol` (defaulting to `false`) now delegate to it, eliminating ~170 lines of duplicated SVG markup with no change to public API or rendering output.

- [#476](https://github.com/derodero24/react-web3-icons/pull/476) [`9e77c44`](https://github.com/derodero24/react-web3-icons/commit/9e77c44ff8135fa1ad05628b55a52ba4915ee2ea) Thanks [@derodero24](https://github.com/derodero24)! - refactor: migrate manual forwardRef icons to createIcon utility

- [`1409577`](https://github.com/derodero24/react-web3-icons/commit/14095777b5846b90ce0615b85e95f1b9ac184fd1) Thanks [@derodero24](https://github.com/derodero24)! - Refactor CoinGecko and CoinMarketCap to use createIcon utility

- [#494](https://github.com/derodero24/react-web3-icons/pull/494) [`9636eda`](https://github.com/derodero24/react-web3-icons/commit/9636edaea3863539c9e03a214533032a08480a3a) Thanks [@derodero24](https://github.com/derodero24)! - Improve ShibMono icon with muzzle, nose, and eye cutouts for better resemblance to the colored variant

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
