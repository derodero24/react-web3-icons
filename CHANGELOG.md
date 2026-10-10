# Changelog

## 5.0.0

### Major Changes

- [#883](https://github.com/derodero24/react-web3-icons/pull/883) [`78d14c1`](https://github.com/derodero24/react-web3-icons/commit/78d14c1e4f7f2be6ffb989862292e079b14fa9c9) Thanks [@derodero24](https://github.com/derodero24)! - **Upgrading from v4?** Read the [migration guide](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#migrating-from-v4-to-v5). The entries below list every change; the breaking ones in short:
  
  - Every icon is drawn on a uniform 64×64 grid, so many icons render larger or smaller at the same `size` ([section 5](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#5-every-icon-is-drawn-on-a-uniform-6464-grid)).
  - Icons with masks, gradients or clip paths render their own internal SVG ids per instance, through `useId`, and still need no `'use client'` ([section 1](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#1-per-instance-internal-svg-ids)).
  - The icons with extra props (`withBackground`, `fill1`, `fill2`) are generated like every other icon. `BybitProps` now declares only `fill1` and `fill2` and no longer extends `IconProps`: type the full props as `IconProps & BybitProps` ([section 2](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#2-icons-with-extra-props-are-generated-like-every-other-icon)).
  - The `react-web3-icons/dynamic` components accept every variant a category ships, render `fallback` for a `variant` the icon does not ship and for a chunk that fails to load, and match identifiers case-insensitively, ignoring whitespace, `.`, `-` and `_`. `ChainIcon` falls back to `name` for an unknown `chainId` instead of rendering `fallback`, and needs `chainId` or `name`: `<ChainIcon />` is a type error ([section 3](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#3-dynamic-components-render-fallback-when-a-chunk-fails-to-load), [section 4](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#4-dynamic-components-every-variant-stricter-variant-normalized-identifiers)).
  - Export names follow one naming rule. Renamed exports, such as `PhantomWallet*` → `Phantom*` and `StarkNet*` → `Starknet*`, keep their old names as deprecated aliases through v5, listed in `DEPRECATED_ICON_NAMES`. Duplicate variants such as `MetaMaskAlt` and `ArbitrumOneFlat` are deprecated as well ([section 6](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#6-export-names-follow-one-naming-rule)). The icons of rebranded and defunct projects are deprecated too, and the lookup keys `BUSD`, `hopprotocol` and `odos` no longer resolve ([section 7](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#7-rebrands-with-new-artwork), [section 8](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#8-icons-of-defunct-projects-are-deprecated)).
  - Exports deprecated in 2.0.0 to 3.1.0 are removed: `GnosisSafe*`, `Matic*`, `EtherscanLight`, `BasescanLight`, `BscscanLight`, `BybitLight`, `Truffle*`, `Ganache*`, `Drizzle*` and `TofuNft*` ([section 9](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#9-removed-exports)).
  - Many icons now render the brand's current official artwork. Some base exports now render a different mark: `Zerion` and `TrustWallet` the standalone mark instead of a container, `Dai` Sky's DAI disc instead of the bare symbol, and `Op` the OP token instead of the Optimism chain symbol ([section 10](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#10-zerion-and-trustwallet-render-the-standalone-mark), [section 11](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#11-base-coin-icons-that-now-render-the-official-token-disc)). Other icons changed their outline: a mark lost or gained its disc or tile, or a container changed shape, and some marks turned from light to dark or back ([section 12](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#12-artwork-changes-that-affect-layout)).
  - Chain `250`, `fantom` and `FTM` now resolve to `Sonic`. In the manifest, deprecated entries carry no `chainId`, `slug` or `ticker`, `brandColor` follows a new rule, and `IconManifestEntry['name']` is typed `IconManifestName`, the union of export names, instead of `string`. `Arbitrum`'s `variants` no longer list `'One'`, `'Nova'` and their mono suffixes: `ArbitrumOne` and `ArbitrumNova` have entries of their own. Current icons no longer list deprecated variants, and `Bnb` and `CosmosHub`, which now re-export other icons, no longer list `aliases` ([section 13](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#13-lookup-and-manifest-changes)).

- [#872](https://github.com/derodero24/react-web3-icons/pull/872) [`22ace97`](https://github.com/derodero24/react-web3-icons/commit/22ace97e76cf48f918e83975df23bb8fad27cb10) Thanks [@derodero24](https://github.com/derodero24)! - **Visual change: `ArbitrumOne` and `ArbitrumNova` are now the current Arbitrum One and Nova logomarks** from the Arbitrum Foundation brand kit ([#835](https://github.com/derodero24/react-web3-icons/issues/835)): a hexagon outline around the A in Blue Shift `#1B4ADD` (`0923_One_Logos_Logomark_RGB.svg`) and around the N in Nova Orange `#FF7700` (`0923_Nova_Logos_Logomark_RGB.svg`). They replace the pre-2023 circle marks, a `#1B4ADD` or `#E57310` disc with the white letter. `ArbitrumOneMono` and `ArbitrumNovaMono` are the same paths in `currentColor`, which are the kit's one-colour `AllWhite` logomarks, instead of the disc with the letter knocked out. Like `Arbitrum`, the new marks are drawn 56 units tall on the 64 grid instead of filling it.
  
  **Deprecated:** the current logomarks are single-colour, so the `Flat` variants are now aliases of the defaults: `ArbitrumOneFlat` → `ArbitrumOne`, `ArbitrumOneFlatMono` → `ArbitrumOneMono`, `ArbitrumNovaFlat` → `ArbitrumNova` and `ArbitrumNovaFlatMono` → `ArbitrumNovaMono`. They keep working through v5 and render the new artwork, and their ring-shaped circle artwork is gone. The manifest (`react-web3-icons/manifest`, `dist/manifest.json`) marks the four as `deprecated`, and the `Arbitrum` entry's `variants` no longer list `OneFlat`, `OneFlatMono`, `NovaFlat` and `NovaFlatMono`. Deprecated exports are not dynamic variants, so `'Flat'` and `'FlatMono'` are not `ChainVariant` values, and `<ChainIcon name="arbitrum-nova" variant="Flat" />` renders `fallback`. Omit `variant` instead. The `arbitrum-one`, `arbitrum-nova` and chain `42170` lookups are unchanged.

- [#890](https://github.com/derodero24/react-web3-icons/pull/890) [`a85c6af`](https://github.com/derodero24/react-web3-icons/commit/a85c6af166531dab895bdf3f2b698ae739dc368f) Thanks [@derodero24](https://github.com/derodero24)! - **Breaking (types):** `ChainIcon` needs `chainId`, `name`, or both. `<ChainIcon />` and `<ChainIcon variant="mono" />` type-checked but could only render `fallback`; they are now type errors, as a missing identifier already is for the other dynamic components. The prop may still hold `undefined` (for example `useAccount().chainId` before a wallet connects), which renders `fallback`, so `<ChainIcon chainId={account.chainId} />` keeps compiling. `ChainIconProps` is now a union type alias instead of an interface: `interface MyProps extends ChainIconProps` no longer compiles, so write `type MyProps = ChainIconProps & { … }`. A wrapper that types its props as `Omit<ChainIconProps, …>` or `Pick<ChainIconProps, …>`, or passes `chainId` and `name` on as separate variables, no longer type-checks, because both identifiers become optional: pass the props on as one object, or omit props from each member of the union. See the [migration guide](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#4-dynamic-components-every-variant-stricter-variant-normalized-identifiers).

- [#873](https://github.com/derodero24/react-web3-icons/pull/873) [`c148b1a`](https://github.com/derodero24/react-web3-icons/commit/c148b1acfb01ac124eec6a7fc3522c10ec8ec852) Thanks [@derodero24](https://github.com/derodero24)! - `Dai` and `DaiMono` now render Sky's official DAI disc instead of the bare DAI symbol ([#836](https://github.com/derodero24/react-web3-icons/issues/836)). Sky publishes DAI only as this disc, so the bare `#F5AC37` symbol, which was not an official composition, is gone:
  
  - `Dai`: `app.sky.money/tokens/dai.svg` with its paths unchanged, a `#F5AC37` disc with the `#FEFEFD` mark. A `fill` prop no longer recolours `Dai` (its disc and mark carry their own colours); use `DaiMono` with `color` or `fill` for a single-colour icon.
  - `DaiMono`: the disc in `currentColor` with the mark knocked out.
  - `DaiCircle` and `DaiCircleMono` are now aliases of `Dai` and `DaiMono`, so `variant="Circle"` keeps working. Their mark used to come from an older artboard and was about 1.5% narrower than the official mark and about 0.5 units (on the 64-unit grid) left of its official position; it now matches the official file.

- [#828](https://github.com/derodero24/react-web3-icons/pull/828) [`f5a429d`](https://github.com/derodero24/react-web3-icons/commit/f5a429d83f5947f97f325d26fed6d4b559f1302e) Thanks [@derodero24](https://github.com/derodero24)! - Make the `react-web3-icons/dynamic` components (`ChainIcon`, `CoinIcon`, …) robust:
  
  - **Breaking:** a failed icon chunk load (network error, deploy skew) renders `fallback` instead of throwing to the nearest error boundary, and is retried on a later render instead of failing until a full reload.
  - `ref` reaches the underlying `<svg>` on React 18 and 19.
  - Each component has its own `displayName` (`ChainIcon`, `CoinIcon`, …) instead of `DynamicIconInner`.
  - `undefined`, `null` or non-string identifiers from untyped data render `fallback` instead of throwing.
  - Development builds warn once per unknown identifier and per failed load, also in browser bundlers such as Vite (the old check never ran there); production builds strip the warnings.

- [#832](https://github.com/derodero24/react-web3-icons/pull/832) [`6fd4185`](https://github.com/derodero24/react-web3-icons/commit/6fd4185b5821c9b6c60b7a277d38d16640875757) Thanks [@derodero24](https://github.com/derodero24)! - Make every icon of the dynamic categories reachable through `react-web3-icons/dynamic`, with one shared identifier normalization ([#813](https://github.com/derodero24/react-web3-icons/issues/813)).
  
  - **Every variant.** `variant` accepts `'colored'`, `'mono'` and every variant suffix the category ships, typed per category: `ChainVariant` (`'Circle'`, `'CircleMono'`, `'Square'`, `'SquareMono'`), `CoinVariant`, `WalletVariant`, `ExchangeVariant`, `DexVariant`, `BridgeVariant` (`'Inverted'`), `DefiVariant` (`'Circle'`, `'CircleMono'`) and `OracleVariant` (`'colored' | 'mono'`), all exported from `react-web3-icons/dynamic`. `<ChainIcon name="ethereum" variant="Circle" />` renders `EthereumCircle`; exports such as `BtcCircleMono`, `MetaMaskSquare` or `BybitInverted` were in the lazy import maps but could not be loaded before; now every entry can.
  - **Breaking:** a `variant` the category does not ship (possible from untyped data or a cast), or one the resolved icon lacks (`<ChainIcon name="aptos" variant="Circle" />`), renders `fallback` and warns once in development. Before, any value other than `'mono'` silently rendered the colored icon. `variant="mono"` always renders the `Mono` export; every icon of these categories has one.
  - **One normalization.** Every dynamic component matches identifiers case-insensitively, ignoring whitespace, `.`, `-` and `_`, against equally normalized keys, so `'layer-zero'`, `'pancake-swap'`, `'Arbitrum Nova'`, `'Crypto.com'` or `'cow_protocol'` now resolve (only `DefiIcon` stripped `.` and `-` before). The generator fails when two keys of a map would normalize alike.
  - **Breaking:** an unknown `chainId` falls back to `name` instead of rendering `fallback`: `<ChainIcon chainId={999999} name="base" />` renders Base.
  - **Aliases and connector ids resolve.** Every manifest alias of these categories is now also a lookup key of its icon (`btc`, `bnb`, `matic`, `atom`, `zk`, `lz`, `stg`, `1inch`, `cake`, `sushi`, `steth`, `wc`, `okb`, …), and the generator enforces this for new aliases. Common wallet connector ids resolve too: `phantom`, `rainbow`, `okx`, `backpack`, `coinbase`, `coinbase-wallet-sdk` (wagmi `coinbaseWalletSDK`), `metamask-sdk` (wagmi `metaMaskSDK`), `trust`, `bitget`, `bitkeep`, `uniswap`, `argent-x` (`Ready`), `nami` (`Lace`), `yoroi`, `daedalus`. The chain slug `arbitrum-one` resolves to `ArbitrumOne` (its own variant `Mono`), and chain `ftm` to `Sonic`. These keys are added to the `react-web3-icons/meta` maps, whose names and key types are unchanged; the `ChainSlug`, `WalletSlug`, … types widen accordingly.
  - Identifier props stay typed as the known keys plus any string (`name: WalletSlug | (string & {})`), so editors suggest keys and API strings still type-check.
  - The lazy import maps list only exports the components can render: deprecated exports (such as `Fantom` and `Ftm`) and the duplicate coin `Flare` (rendered as `Flr`) are gone from them, which no key could reach.

- [#828](https://github.com/derodero24/react-web3-icons/pull/828) [`f5a429d`](https://github.com/derodero24/react-web3-icons/commit/f5a429d83f5947f97f325d26fed6d4b559f1302e) Thanks [@derodero24](https://github.com/derodero24)! - Generate the icons with extra props (`AvalancheCircle`/`AvalancheCircleMono` `withBackground`, `Bybit*` `fill1`/`fill2`, `Rainbow`/`RainbowSymbol` `withBackground`) like every other icon instead of hand-writing them.
  
  - They now set `aria-labelledby` from `title` + `titleId`, like every other icon.
  - Their `createIcon` calls are `/* @__PURE__ */`-annotated, so importing e.g. `AvalancheMono` no longer bundles `AvalancheCircle`.
  - Generating them does not change how any combination of `withBackground`, `fill1`, `fill2` and `fill` renders.
  - **Breaking (types):** `BybitProps` now declares only `fill1` and `fill2` and no longer extends `IconProps`; use `IconProps & BybitProps` or `ComponentProps<typeof Bybit>`. `AvalancheProps` and `RainbowProps` (of `Rainbow`, formerly `RainbowWallet`) are exported the same way.
  - `BybitMono` (and `react-web3-icons/svg/exchange/BybitMono.svg`) declares `fill="currentColor"` on the `<svg>` instead of on each path, like every mono icon. It renders the same, and a CSS `fill` on the icon now reaches the paths.

- [#892](https://github.com/derodero24/react-web3-icons/pull/892) [`bc143a3`](https://github.com/derodero24/react-web3-icons/commit/bc143a3251cb80860c33053880f1f7970bd689b3) Thanks [@derodero24](https://github.com/derodero24)! - The manifest (`react-web3-icons/manifest`, `dist/manifest.json`) describes every icon the same way, re-exports included.
  
  - Entries that re-export another icon now carry `variants` and `brandColor`: the re-exported coins (`Eth`, `Btc`, `Sol`, `Bnb`, `Flr`, …), chain `CosmosHub`, `Hyperliquid` and `OpBnb`, defi `SafeProtocol`, explorer `Arbiscan` and wallet `OkxWallet`. `variants` lists the suffixes the entry's own category exports (`Eth`: `['', 'Mono', 'Circle', 'CircleMono']`), and `brandColor` is the colour of the icon it re-exports (`Eth` has `Ethereum`'s `#8c8c8c`).
  - `ArbitrumOne` and `ArbitrumNova` carry their own `variants` (`['', 'Mono']`) and `brandColor` (`#1b4add` and `#ff7700`). **Breaking:** `Arbitrum`'s `variants` no longer list `'One'`, `'OneMono'`, `'Nova'` and `'NovaMono'`; as in the dynamic components, they are icons of their own.
  - **Breaking:** `variants` no longer list deprecated variants, unless the icon itself is deprecated. Compared with 4.0.0, `MetaMask` and `OpenSea` no longer list `'Alt'`, and `MagicEden` no longer lists `'Flat'` and `'WordmarkFlat'`.
  - Every `variants` list starts with `''` and `'Mono'`, then lists each other suffix followed by its mono (`Bitcoin`: `['', 'Mono', 'Circle', 'CircleMono']`, was `['Circle', '', 'CircleMono', 'Mono']`).

- [#892](https://github.com/derodero24/react-web3-icons/pull/892) [`bc143a3`](https://github.com/derodero24/react-web3-icons/commit/bc143a3251cb80860c33053880f1f7970bd689b3) Thanks [@derodero24](https://github.com/derodero24)! - **Breaking (types):** `IconManifestEntry['name']` (`react-web3-icons/manifest`) is now `IconManifestName` instead of `string`. This new exported type is the same union of export names as `IconName`, so `icons[entry.name]` on `import * as icons from 'react-web3-icons'` type-checks without a cast. The manifest spells the names out, so its types still load without `@types/react`. Reading `name` as a `string` still compiles; code that builds its own `IconManifestEntry` objects must use export names.

- [#839](https://github.com/derodero24/react-web3-icons/pull/839) [`c3bd437`](https://github.com/derodero24/react-web3-icons/commit/c3bd437573d137b3f9abbbdae6e3770951ad9a55) Thanks [@derodero24](https://github.com/derodero24)! - Draw every icon on a uniform 64×64 grid so icons of the same size look the same size ([#704](https://github.com/derodero24/react-web3-icons/issues/704)).
  
  - **Breaking (visual):** every icon's `viewBox` is now `0 0 64 64`. Bare marks are scaled so their painted box's longer side is 56 units, centred; containers (`Circle*` / `Square*` variants, and marks that are themselves a solid disc or square) fill all 64 units. Icons whose artwork was letterboxed in the square `size` box (`Ethereum`, `Aave`, `Avascan`, `LayerZero`, …) or carried uneven padding now render larger (up to ×1.75, e.g. `Tangem`, `Backpack`); marks that already filled a square viewBox edge to edge now render about 12.5% smaller (×0.875), because they gain the 4-unit padding. Brand shapes and colours are unchanged. Regenerate markup snapshots, and re-check custom CSS that compensated for the old per-icon viewBoxes. See the [migration guide](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#5-every-icon-is-drawn-on-a-uniform-6464-grid).
  - The eight marks that overflowed their old viewBox and were clipped at its edge are now shown whole, with their `Mono` variants: `Eclipse`, `Frax`, `Lido`, `SushiSwap`, `Binance`, `Helius`, `RedStone`, and `WorldChain`, which now draws the World logomark.
  - `react-web3-icons/svg/*` and the Iconify sets follow: every Iconify icon is 64×64, so `info.height` is 64.

- [#828](https://github.com/derodero24/react-web3-icons/pull/828) [`f5a429d`](https://github.com/derodero24/react-web3-icons/commit/f5a429d83f5947f97f325d26fed6d4b559f1302e) Thanks [@derodero24](https://github.com/derodero24)! - Give every rendered icon its own internal SVG ids, so masked and gradient icons render independently of other instances on the page.
  
  - **Breaking:** icons with internal ids (masks, gradients, clip paths) now render per-instance ids (`w3i-<name>-<instance>-…`, e.g. `w3i-arbitrumcirclemono-r1-arb-circle-a`) instead of one shared id per component. Previously `url(#…)` resolved to the first instance on the page, so a first instance inside a `display: none` subtree, or with a different `fill` or `color`, broke or restyled every later one. Regenerate markup snapshots that contain these ids. See the [migration guide](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#1-per-instance-internal-svg-ids).
  - These icons call `useId`, which React supports in Server Components: icons still render without `'use client'`, and icons without internal ids still call no hooks. A new test renders every icon under React's `react-server` build.
  - Mask content no longer inherits `fill` from the icon's `<svg>`: `<HardhatMono fill="#fff" />` keeps its cut-outs. Default rendering is unchanged; `react-web3-icons/svg/*` and the Iconify sets carry the same explicit mask fills.

- [#878](https://github.com/derodero24/react-web3-icons/pull/878) [`9e25978`](https://github.com/derodero24/react-web3-icons/commit/9e259789d483b98a6efecd167af3d67938b3124b) Thanks [@derodero24](https://github.com/derodero24)! - `PhantomSymbolMono` is deprecated: since Phantom's default became the standalone ghost, it rendered the same artwork as `PhantomMono`. Use `PhantomMono`; the old name keeps working through v5 and is listed in `DEPRECATED_ICON_NAMES`. The deprecated `PhantomWalletSymbolMono` now points to `PhantomMono` as well.
  
  - **Breaking:** `<WalletIcon name="phantom" variant="SymbolMono" />` now renders `fallback`; use `variant="mono"`. `'SymbolMono'` stays a `WalletVariant` (for `Rainbow`).
  - In the manifest, `PhantomSymbolMono` is marked `deprecated` and `'SymbolMono'` leaves the `variants` of `Phantom`.
  - In the Iconify mono set, `wallet-phantom-symbol-mono` is now a hidden alias of `wallet-phantom-mono` instead of a visible icon of its own.

- [#860](https://github.com/derodero24/react-web3-icons/pull/860) [`b19d680`](https://github.com/derodero24/react-web3-icons/commit/b19d680f20c00e9bb1d68e3d293ae772dc4cd5b7) Thanks [@derodero24](https://github.com/derodero24)! - Consistent export names ([#815](https://github.com/derodero24/react-web3-icons/issues/815)). Export names now follow written rules (CONTRIBUTING.md, "Export Names"), enforced by a test over `icons/`: the project's current official name in PascalCase, acronyms as words, a category suffix only where it is part of the name or avoids a clash, and tickers for coins. See the [migration guide](https://github.com/derodero24/react-web3-icons/blob/develop/MIGRATION.md#6-export-names-follow-one-naming-rule) for the full tables and a find-and-replace.
  
  - **Renames (deprecated aliases, still working through v5):** `PhantomWallet*` → `Phantom*`, `RainbowWallet*` → `Rainbow*` (props type `RainbowProps`), `BackpackWallet*` → `Backpack*`, `YoroiWallet*` → `Yoroi*`, `DaedalusWallet*` → `Daedalus*`, `OKXWallet*` → `OkxWallet*`, `Argent*` → `Ready*` (Argent rebranded to Ready), `Gateio*` → `Gate*` (Gate.io rebranded to Gate), `StarkNet*` → `Starknet*`, `BinanceSmartChain*` → `BnbSmartChain*`. The old names render the same icon and are listed in `DEPRECATED_ICON_NAMES`; their lookup keys resolve to the new names. Renamed icons render their internal ids with the new name. The case-only renames `OKXWallet*` and `StarkNet*` get no `dist/svg` file or Iconify alias of their own.
  - **Rebrands with new artwork:** `Cactus` / `CactusMono` (devtool, from the Cactus logo) replace `Tally*`; `Sky` / `SkyMono` / `SkyCircle` / `SkyCircleMono` (defi, re-exported from coin; from the official SKY token file) replace `MakerDao*` and the coin `Mkr*`; `Velora` / `VeloraMono` (dex, from the Velora brand kit) replace `ParaSwap*`. The old exports keep their artwork and are deprecated. The keys `makerdao`, `MKR` and `paraswap` now resolve to `Sky` and `Velora`, and `DefiIcon` gains the `Circle` / `CircleMono` variants.
  - **New coin `Gram`** (`GramMono`, `GramCircle`, `GramCircleMono`, ticker `GRAM`) from the official ton.org/media token marks: Gram is the token formerly known as Toncoin. The `Ton` exports (The Open Network) keep their names, and the `TON` ticker resolves to them.
  - **Deprecated with no replacement:** `Busd*`, `Web3Js*`, `X2Y2*`, `NftStorage*`, `HopProtocol*` and `Odos*` (shut down on 2026-07-30). Their lookup keys (`BUSD`, `hopprotocol`, `odos`) no longer resolve.
  - **Breaking: removed exports** whose deprecation met the lifecycle policy (at least one minor release and 90 days): `GnosisSafe*` and `Matic*` (deprecated in 2.0.0), `EtherscanLight`, `BasescanLight`, `BscscanLight`, `BybitLight` (3.0.0), `Truffle*`, `Ganache*`, `Drizzle*` and `TofuNft*` (3.1.0). Use `Safe*`, `Pol*` and the `*Inverted` variants instead. `Fantom*` / `Ftm*` (deprecated in 4.0.0) stay until they meet the policy.
  - New slugs `gnosis-chain`, `manta-pacific` and `bnb-smart-chain`, so every chain's export name also resolves as a slug.

- [#866](https://github.com/derodero24/react-web3-icons/pull/866) [`f8b7ace`](https://github.com/derodero24/react-web3-icons/commit/f8b7ace7ce7fc7e1a08660c42a6a7686c7a95bd8) Thanks [@derodero24](https://github.com/derodero24)! - Settle the remaining v5 naming and artwork decisions ([#815](https://github.com/derodero24/react-web3-icons/issues/815), [#835](https://github.com/derodero24/react-web3-icons/issues/835), [#836](https://github.com/derodero24/react-web3-icons/issues/836), [#837](https://github.com/derodero24/react-web3-icons/issues/837)):
  
  - **Renames** (the old names stay as deprecated aliases through v5):
    - `ImmutableX*` → `Immutable*`, after the Immutable X → Immutable rebrand. The new slugs `immutable` and `immutable-zkevm` resolve to it.
    - `ZkSync*` → `Zksync*`, the official name ZKsync with the acronym written as a word. Like `StarkNet*`, the old names get no `dist/svg` file of their own, because those files would differ only in letter case.
  - **Duplicate variants deprecated:**
    - `MetaMaskAlt` → `MetaMask`: one fox design since 2024. `'Alt'` is not a `WalletVariant` value.
    - `MagicEdenFlat` → `MagicEden`: the current mark is single-colour.
    - `MagicEdenWordmarkFlat`: a legacy stacked lockup with no official counterpart. Use `MagicEdenWordmark` or `MagicEdenWordmarkMono`.
  - **Unofficial composites:**
    - `UsdcCircle` / `UsdcCircleMono` and `DogeCircle` / `DogeCircleMono` now render the official round token marks (`Usdc` / `UsdcMono`, `Doge` / `DogeMono`), instead of legacy discs of unidentified origin. The `'Circle'` variants keep working.
  - **One artwork, one source:**
    - `CosmosHub` / `CosmosHubMono` re-export `Atom` / `AtomMono`. The Cosmos chain registry uses that art as the Cosmos Hub logo, and it replaces a legacy hexagon with no current official source.
    - `Wld` / `WldMono` re-export `WorldChain` / `WorldChainMono`. The geometry is the same World logomark.
  - **Lookup:** the new slug `eigencloud` resolves to `EigenLayer`.
  - **Kept as they are:**
    - `Oneinch`: 1inch is one word.
    - `TON`: still the ticker of the `Ton` mark. The coin re-export of the chain cannot be deprecated without making the root `Ton` ambiguous.

### Minor Changes

- [#871](https://github.com/derodero24/react-web3-icons/pull/871) [`58850fe`](https://github.com/derodero24/react-web3-icons/commit/58850fe4e59273196f01f5f522c9551c2fdfe325) Thanks [@derodero24](https://github.com/derodero24)! - Add `CoinMarketCapCircle` and `CoinMarketCapCircleMono` (tracker) ([#837](https://github.com/derodero24/react-web3-icons/issues/837)). `CoinMarketCapCircle` is CoinMarketCap's own disc icon from coinmarketcap.com: the white mark on a `#3861FB` disc, the official way to show the brand blue. `CoinMarketCapCircleMono` is the disc in `currentColor` with the mark knocked out.

- [#871](https://github.com/derodero24/react-web3-icons/pull/871) [`58850fe`](https://github.com/derodero24/react-web3-icons/commit/58850fe4e59273196f01f5f522c9551c2fdfe325) Thanks [@derodero24](https://github.com/derodero24)! - Deprecate `OpenSeaAlt` ([#837](https://github.com/derodero24/react-web3-icons/issues/837)). It is the pre-2025 white-disc OpenSea logomark (`#2081E2` ship), and the current OpenSea brand (`#0086FF`) has no white-disc asset to replace it with. Use `OpenSea` or `OpenSeaSymbol` instead. The export keeps working with unchanged artwork through v5, is listed in `DEPRECATED_ICON_NAMES`, is marked `deprecated: true` in the manifest, and is hidden in the Iconify collection (`marketplace-open-sea-alt`). The earliest removal is v6.

- [#878](https://github.com/derodero24/react-web3-icons/pull/878) [`9e25978`](https://github.com/derodero24/react-web3-icons/commit/9e259789d483b98a6efecd167af3d67938b3124b) Thanks [@derodero24](https://github.com/derodero24)! - Stop shipping the same artwork twice under two exports: `StarknetCircle` / `StarknetCircleMono` (chain; `StrkCircle` / `StrkCircleMono` in coin) are now the `Starknet` / `StarknetMono` components, and `CeloscanSquare` / `CeloscanSquareMono` (explorer) the `Celoscan` / `CeloscanMono` components. The official Starknet symbol is already a disc and the official Celoscan mark is already the square tile, so each pair drew an identical file. They are not deprecated, and sharing the component does not change what they render; `<ChainIcon name="starknet" variant="Circle" />` keeps working.
  
  - Their internal ids and React DevTools name now carry the default's name (`w3i-starknet-…` instead of `w3i-starknetcircle-…`).
  - In the Iconify sets, `chain-starknet-circle`, `chain-starknet-circle-mono`, `explorer-celoscan-square` and `explorer-celoscan-square-mono` are aliases of the default icons instead of icons of their own.
  - In the manifest, `'Circle'` and `'CircleMono'` stay among the `variants` of `Starknet`, and `'Square'` and `'SquareMono'` among those of `Celoscan`.
  
  Two more pairs drew identical files once the official BNB Chain and Arbitrum art landed ([#873](https://github.com/derodero24/react-web3-icons/issues/873), [#872](https://github.com/derodero24/react-web3-icons/issues/872)), and now share one component:
  
  - `Bnb`, `BnbMono`, `BnbCircle` and `BnbCircleMono` (coin) re-export `BnbSmartChain`, `BnbSmartChainMono`, `BnbSmartChainCircle` and `BnbSmartChainCircleMono` (chain), like `Arb` → `Arbitrum`. Both units drew the brand kit's `BNB Chain_Symbol_Yellow.svg`. The ticker `BNB` still resolves to `Bnb`. Like the other re-exported coins, the manifest entry for `Bnb` has `BnbSmartChain`'s `brandColor` and no `aliases` of its own (`BnbSmartChain` lists `'bnb'`).
  - `ArbiscanMono` (explorer) re-exports `ArbitrumMono`: Arbiscan publishes no one-colour mark, so its mono already was the Arbitrum kit's one-colour logomark.
  - In the Iconify sets, `coin-bnb`, `coin-bnb-mono` and `explorer-arbiscan-mono` become aliases instead of icons of their own.

- [#880](https://github.com/derodero24/react-web3-icons/pull/880) [`d5a6de0`](https://github.com/derodero24/react-web3-icons/commit/d5a6de0444976f80182404281238e53b17cddd39) Thanks [@derodero24](https://github.com/derodero24)! - Add `DydxInverted`, dYdX's official dark-theme logomark (logo-mark-light.svg: a `#FAFAFD` stroke, a fading white stroke and the `#6966FF` accent), for dark backgrounds where the default's near-black strokes vanish. `DexIcon` accepts `variant="Inverted"` for it.

- [#878](https://github.com/derodero24/react-web3-icons/pull/878) [`9e25978`](https://github.com/derodero24/react-web3-icons/commit/9e259789d483b98a6efecd167af3d67938b3124b) Thanks [@derodero24](https://github.com/derodero24)! - New `HtxInverted` (exchange): the two HTX flames in white and blue `#008CD6`, taken from htx.com's dark-theme header logo, for dark backgrounds where the default's navy `#00003E` flame vanishes. `<ExchangeIcon name="htx" variant="Inverted" />` renders it, the manifest's `Htx` entry lists `'Inverted'` among its `variants`, and the Iconify set gains `exchange-htx-inverted`.

- [#827](https://github.com/derodero24/react-web3-icons/pull/827) [`ac8411c`](https://github.com/derodero24/react-web3-icons/commit/ac8411c6535514542897aa5ec54873fd05bcf67e) Thanks [@derodero24](https://github.com/derodero24)! - Every icon of a dynamic category is now reachable through `react-web3-icons/meta` and the dynamic components.
  
  - **New lookup keys.** `TICKER_TO_COIN` (and `<CoinIcon symbol>`) gains `DOT`, `FET`, `HBAR`, `ICP`, `INJ`, `NEAR`, `PEPE`, `STX`, `TIA` and `TON`, which used to render the fallback although the coins were exported; `CHAIN_SLUG_TO_NAME` (and `<ChainIcon name>`) gains `cronos`. The `ChainSlug` and `Ticker` types widen accordingly.
  - **Fantom / FTM now resolve to Sonic.** `Fantom`, `FantomMono`, `Ftm` and `FtmMono` were deprecated in 4.0.0 because Fantom Opera was succeeded by Sonic (FTM upgraded 1:1 to S), yet the meta maps still pointed at them. `CHAIN_ID_TO_NAME[250]` and `CHAIN_SLUG_TO_NAME.fantom` are now `'Sonic'` and `TICKER_TO_COIN.FTM` is the coin `'Sonic'`, so `<ChainIcon chainId={250} />`, `<ChainIcon name="fantom" />` and `<CoinIcon symbol="FTM" />` render the Sonic mark, and removing the deprecated exports in a future major will not change these lookups. The deprecated exports themselves are unchanged; in the manifest they no longer carry `chainId` / `slug` / `ticker`. Lookup keys can no longer point at deprecated exports.
  - **One Pyth icon.** `react-web3-icons/coin` and `react-web3-icons/oracle` used to export two different components named `Pyth` / `PythMono` (same paths, different colours). The coin subpath now re-exports the oracle artwork, coloured `#110F23` like the official Pyth Network dark logomark ([brand assets](https://legacy.pyth.network/brand)). **Visible change:** oracle `Pyth` was purple (`#9945FF`) and is now dark purple `#110F23` (coin `Pyth` moves from `#110F24` to `#110F23`); `PythMono` is unchanged. `import { Pyth } from 'react-web3-icons'`, both subpaths and `<CoinIcon symbol="PYTH" />` / `<OracleIcon name="pyth" />` now render the same component, and manifest entries that share a `name` always refer to the same component.
  - **Better manifest `brandColor`.** It used to be the most frequent colour of the artwork, which for badge-style marks was the dark container. Greys, near-black and near-white now count only when an artwork has no other colour, and icons can carry a curated value. Among the entries this changes from 4.0.0: chain `Kaia` `#040404` → `#bff009`, `Astar` `#231f20` → `#e6007a`, `Starknet` (`StarkNet` in 4.0.0) `#fafafa` → `#ec796b`; coin `Looks` `#000000` → `#0ce466`, `Pepe` `#000000` → `#4f9843`; defi `Babylon` `#0a1418` → `#ce6533`; exchange `Bitstamp` `#282828` → `#003b2f`; explorer `Basescan` `#12161c` → `#0052ff`, `Bscscan` `#12161c` → `#f0b90b`; storage `NftStorage` (deprecated in this release) `#000000` → `#f5c32c`; wallet `Xverse` `#181818` → `#ee7a30`; oracle `Pyth` `#9945ff` → `#7142cf` (Pyth's brand purple). Icons whose artwork is redrawn in this release also take the colour of the new artwork (for example exchange `Htx` `#e6eefa` → `#00003e`, the navy of the official flame), so read the generated manifest for exact values. Monochrome marks such as Axelar, Hedera and Linea keep `#000000` (Aptos's redrawn mark has its near-black `#0f0e0b`), which is now also derived when the artwork paints its shapes in SVG's default black or names the colour `black` rather than a hex value: chain `Stellar` (which had no `brandColor`) and the new coins `Ondo` and `Tao` get `#000000`. A coin that re-exports another icon's artwork takes that icon's colour, so `Ldo` (the Lido logomark) has Lido's `#0085ff`.
  - **One source for icon data.** The meta maps, `DEPRECATED_ICON_NAMES`, the manifest and the dynamic import maps are now generated together from the icon definitions, so they can no longer drift apart. Map names and key types are unchanged. `DEPRECATED_ICON_NAMES` is now typed `ReadonlySet<IconName>` (iterating it yields icon names); `has()` still accepts any string.

- [#893](https://github.com/derodero24/react-web3-icons/pull/893) [`88d1cc7`](https://github.com/derodero24/react-web3-icons/commit/88d1cc70fcab27ec3687a211574c09f6af352f3d) Thanks [@derodero24](https://github.com/derodero24)! - New lookup keys for icons that already ship: the legacy tickers `MATIC` (→ `Pol`) and `KLAY` (→ `Kaia`), since MATIC and KLAY converted 1:1 to POL and KAIA, and the EVM chain IDs `295` (→ `Hedera`) and `1776` (→ `Injective`). `<CoinIcon symbol="MATIC" />`, `<CoinIcon symbol="KLAY" />`, `<ChainIcon chainId={295} />` and `<ChainIcon chainId={1776} />` rendered `fallback` before. In the manifest, `Hedera` and `Injective` gain a `chainId`.

- [#857](https://github.com/derodero24/react-web3-icons/pull/857) [`ef4518a`](https://github.com/derodero24/react-web3-icons/commit/ef4518a4ae26c8ccc1ac51184d02775e135dbce6) Thanks [@derodero24](https://github.com/derodero24)! - Add long-tail category icons from official artwork ([#711](https://github.com/derodero24/react-web3-icons/issues/711)), each with a `Mono` variant:
  
  - Tracker: `Dune` (+ `DuneSquare`, `DuneSquareMono`, from the dune.com brand hub), `DexScreener` (the official app icon: the white falcon on a `#09090B` square, + `DexScreenerSymbolMono`, the falcon alone), `Nansen` (nansen.ai brand kit) and `Arkham`.
  - Marketplace: `Tensor`.
  - Storage: `Walrus`.

- [#872](https://github.com/derodero24/react-web3-icons/pull/872) [`22ace97`](https://github.com/derodero24/react-web3-icons/commit/22ace97e76cf48f918e83975df23bb8fad27cb10) Thanks [@derodero24](https://github.com/derodero24)! - Add `ModeCircle` / `ModeCircleMono` and `BlastCircle` / `BlastCircleMono`, so the pale chartreuse and yellow marks have an official variant that reads on light backgrounds:
  
  - `ModeCircle` is Mode's token icon (`Token.svg` in Mode's brand kit, github.com/mode-network/brandkit): the M in black on a `#DFFE00` disc.
  - `BlastCircle` is the round icon blast.io serves (`/icons/blast-color.svg`): the `#FCFC03` mark on a black disc.
  - The `CircleMono` variants are the disc in `currentColor` with the mark knocked out.
  
  `<ChainIcon name="mode" variant="Circle" />` and `<ChainIcon name="blast" variant="Circle" />` render them. `Mode`, `Blast` and their monos are unchanged; their sources now cite the exact kit and site files.

- [#874](https://github.com/derodero24/react-web3-icons/pull/874) [`8e7a2fd`](https://github.com/derodero24/react-web3-icons/commit/8e7a2fdb28ae3b9158e71f569424c60f8cd78766) Thanks [@derodero24](https://github.com/derodero24)! - Add `DataNetwork` for DATA Network (formerly Story, chain ID 1514) from the DATA Foundation brand kit ([#706](https://github.com/derodero24/react-web3-icons/issues/706)):
  
  - `DataNetwork` / `DataNetworkMono`: the official Symbol in `#1A1A1A`, and the same mark in `currentColor`.
  - `DataNetworkSquare` / `DataNetworkSquareMono`: the official $DATA token badge, a `#1A1A1A` square with the mark in `#F8F8F6`, and the square in `currentColor` with the mark knocked out. Use the square on dark backgrounds.
  - `<ChainIcon>` and `CHAIN_ID_TO_NAME` / `CHAIN_SLUG_TO_NAME` resolve chain ID `1514` and the slugs `data-network`, `data` and the old name `story`.
  - The coin re-export `Data` (`DataMono`, `DataSquare`, `DataSquareMono`) resolves the ticker `DATA` and the legacy ticker `IP` through `<CoinIcon>` and `TICKER_TO_COIN`, since $IP converted 1:1 to $DATA.

- [#856](https://github.com/derodero24/react-web3-icons/pull/856) [`b74b344`](https://github.com/derodero24/react-web3-icons/commit/b74b34415f5cddefefcb52cab161f576927785b6) Thanks [@derodero24](https://github.com/derodero24)! - Add chain icons for Unichain (`Unichain`, `UnichainMono`; chain ID 130), Abstract (`Abstract`, `AbstractMono`; 2741) and Soneium (`Soneium`, `SoneiumMono`; 1868) from their official brand assets, and `OpBnb` / `OpBnbMono` for opBNB (204), which re-export the BNB Chain symbol that opBNB uses. All four resolve through `<ChainIcon chainId>` / `<ChainIcon name>` (`unichain`, `abstract`, `soneium`, `opbnb`) and the `react-web3-icons/meta` maps.

- [#874](https://github.com/derodero24/react-web3-icons/pull/874) [`8e7a2fd`](https://github.com/derodero24/react-web3-icons/commit/8e7a2fdb28ae3b9158e71f569424c60f8cd78766) Thanks [@derodero24](https://github.com/derodero24)! - Add `Fdusd` and `FdusdMono` for First Digital USD (ticker `FDUSD`, [#708](https://github.com/derodero24/react-web3-icons/issues/708)). `Fdusd` is First Digital's official token icon, unchanged: a black disc with the F in `#ECEFF3` and the bar in `#02EC81`. `FdusdMono` is the disc in `currentColor` with the F and the bar knocked out. `<CoinIcon symbol="FDUSD">` and `TICKER_TO_COIN` resolve it.

- [#859](https://github.com/derodero24/react-web3-icons/pull/859) [`fb70c01`](https://github.com/derodero24/react-web3-icons/commit/fb70c01f06d70ef042c1fc8e222c6f6199e04cc6) Thanks [@derodero24](https://github.com/derodero24)! - Add coin icons from official brand assets ([#708](https://github.com/derodero24/react-web3-icons/issues/708)), each with a `Mono` variant and its ticker in `TICKER_TO_COIN` / `<CoinIcon>`:
  
  - `Tao` (`TAO`): the Bittensor TAO symbol from the Opentensor Foundation media kit.
  - `Ondo` (`ONDO`): the Ondo icon from the Ondo Media Kit.
  - `Render` (`RENDER`, legacy `RNDR`): the Render Network symbol from rendernetwork.com.
  - `Usde` (`USDE`): Ethena's USDe token disc from ethena.fi.

- [#858](https://github.com/derodero24/react-web3-icons/pull/858) [`6aa293a`](https://github.com/derodero24/react-web3-icons/commit/6aa293ae5ae6a0ee8673a6de77c0ed731a3873e5) Thanks [@derodero24](https://github.com/derodero24)! - Add the Orca, Meteora and Fluid DEX icons ([#709](https://github.com/derodero24/react-web3-icons/issues/709)), each with a `Mono` variant and a `<DexIcon>` slug (`orca`, `meteora`, `fluid`):
  
  - `Orca` / `OrcaMono`: the official logomark from Orca's brand assets (yellow disc with the orca).
  - `Meteora` / `MeteoraMono`: the v2 symbol and its one-colour version from Meteora's brand kit.
  - `Fluid` / `FluidMono`: the Fluid (Instadapp) sign from fluid.io. Fluid publishes its sign in one colour only, so `Fluid` is black and `FluidMono` uses `currentColor`.

- [#893](https://github.com/derodero24/react-web3-icons/pull/893) [`88d1cc7`](https://github.com/derodero24/react-web3-icons/commit/88d1cc70fcab27ec3687a211574c09f6af352f3d) Thanks [@derodero24](https://github.com/derodero24)! - Ship each artwork once. These exports drew a second copy of another icon's official artwork, in slightly different markup, and now re-export that icon, so both names are one component. Export names, tickers and slugs are unchanged, and each pair rendered the same in Chromium, up to anti-aliasing at the edges.
  
  - `Tia` / `TiaMono`, `Hbar` / `HbarMono` and `Stx` / `StxMono` (coin) re-export `Celestia`, `Hedera` and `Stacks` (chain), and `Ena` / `EnaMono` (coin) re-export `Ethena` / `EthenaMono` (defi).
  - `Arbiscan` (explorer) re-exports `Arbitrum`, as `ArbiscanMono` already re-exported `ArbitrumMono`.
  - `Blastscan` / `BlastscanMono` (explorer) re-export `Blast` / `BlastMono` (chain). `BlastscanLight` keeps its own artwork.
  - `OkxWallet` / `OkxWalletMono` (wallet) are `Okx` / `OkxMono` (exchange): both units drew the checker of OKX's own header lockup. The deprecated `OKXWallet` / `OKXWalletMono` still work.
  - They render under the re-exported icon's name: React DevTools shows `Celestia` for `Tia`, and the internal ids of `Ena` read `w3i-ethena-…`.
  - In the Iconify sets, `coin-tia`, `coin-tia-mono`, `coin-hbar`, `coin-hbar-mono`, `coin-stx`, `coin-stx-mono`, `coin-ena`, `coin-ena-mono`, `explorer-arbiscan`, `explorer-blastscan`, `explorer-blastscan-mono`, `wallet-okx-wallet` and `wallet-okx-wallet-mono` are now aliases of the re-exported icons instead of icons of their own.
  - In the manifest, `Tia`, `Hbar`, `Stx`, `Ena`, `Arbiscan` and `OkxWallet` keep their `variants` and, like the other re-exported icons, carry the `brandColor` of the icon they re-export. `Blastscan` lists the same variants in a new order, `['', 'Mono', 'Light']` (`['', 'Light', 'Mono']` in 4.0.0). The curated brand colours of `Tia` and `Stx` move to the chain icons: `Celestia`'s `brandColor` is now `#5640d1`, Celestia's Indigo (`#7a2bf9` in 4.0.0), and `Stacks`' is `#fc6432`, the Stacks orange (`#141414` in 4.0.0). `Tia` and `Stx` therefore still have these colours (in 4.0.0 they had `#7a2bf9` and `#7023eb`), and `Ena` now has `Ethena`'s `#040404` (`#1c1c1c` in 4.0.0).

- [#843](https://github.com/derodero24/react-web3-icons/pull/843) [`a5e1464`](https://github.com/derodero24/react-web3-icons/commit/a5e146401b71b4dd917e230adfb62d5c2863308e) Thanks [@derodero24](https://github.com/derodero24)! - Refresh outdated or wrong chain, bridge, oracle, domain and node artwork with the brands' current official files ([#835](https://github.com/derodero24/react-web3-icons/issues/835)).
  
  - **Visible rebrands:**
    - `Base` is now Base's current symbol, "The Square": a blue `#0000FF` rounded square. It replaces the circle-with-bar mark. `BaseCircle` and `BaseSquare` show the white Square on a `#0000FF` disc or tile.
    - `Polkadot` is the current symbol: six ellipses in near-black `#171717`. The pink `#E6007A` symbol is gone.
    - `Avalanche` uses the current two-part mark in `#E6212F`. It no longer sits in a disc. `AvalancheSquare` is the official icon: the red mark on a `#1D1D1D` square. `AvalancheCircle` is the official AVAX token: a `#E6212F` disc with the mark cut out over a white inner disc. The `Mono` variants are the same shapes in `currentColor`, with the mark knocked out of the square and the disc.
    - `Zksync` is the official logomark (`#11141A` arrows) without the black tile. `ZksyncCircle` and `ZksyncSquare` keep the black container.
  - **Wrong artwork replaced by the real logo:**
    - `Wormhole` is the black W logomark. It was a moon illustration.
    - `Socket` is the green-to-blue SOCKET symbol. It was an "OC" wordmark crop.
    - `WorldChain` is the World logomark. The old glyph was mangled.
    - `Orbiter` is the alien in its UFO. It was a recoloured UI icon.
    - `RedStone` is the official symbol in `#AE0822`.
  - **Updated to the current official mark or colour:**
    - `Polygon` and its Circle and Square variants: solid `#670DE5`, with square-cut corners. The Square variant is now the official rounded square.
    - `Solana` (and its Circle and Square variants), `Sui`, `Sei`, `Celestia`, `Tron`, `Hedera`, `Band`, `Api3`, `QuickNode`, `Ton` and `GnosisChain` have each brand's current mark and colours.
    - `Ens` is the solid `#0080BC` mark, and `EnsCircle` is the official token icon.
    - `Starknet` uses the kit's `#EC796B` → `#E175B1` gradients, and the mark fills its Circle and Square variants.
    - `Berachain` is the bear-and-chains symbol without the brown tile.
    - `Synapse` has the official gradient stops.
    - `Stargate` is the light-theme symbol, whose dark star shows on white.
    - `Pyth` paths now come from the official logomark, with the same shape as before.
  - **New:** `OrbiterInverted`, Orbiter's official dark-theme symbol, for dark backgrounds. `BridgeVariant` gains `'Inverted'`.
  - Every refreshed unit records its official source.

- [#854](https://github.com/derodero24/react-web3-icons/pull/854) [`5ea98e1`](https://github.com/derodero24/react-web3-icons/commit/5ea98e1cfc1b628c4750bba9fc1cbd540b47c696) Thanks [@derodero24](https://github.com/derodero24)! - Add the official token discs as `Circle` / `CircleMono` variants, built from each project's own token file with its paths unchanged. Each `CircleMono` is the disc in `currentColor` with the mark knocked out. The coin exports re-export them:
  
  - `KavaCircle`, `KavaCircleMono` (chain and coin): the white K on a `#FF433E` disc, from kava.io/branding.
  - `MonadCircle`, `MonadCircleMono` (chain and the `MON` coin): the white mark on a `#6E54FF` disc, from Monad's `Token.svg`, with its soft drop shadow.
  - `RoninCircle`, `RoninCircleMono` (chain and the `RON` coin): the `#F5F8FC` mark on a `#004DE5` disc, from `Ronin Token/SVG/Ronin-Token.svg` in Ronin's brand kit.
  - `SonicCircle`, `SonicCircleMono` (chain and the `S` coin): the `#F5F5F5` mark on a `#141416` disc, from `S/S_token.svg` in Sonic's media kit.
  - `TaikoCircle`, `TaikoCircleMono` (chain and coin): the `#FAFAFA` mark on a `#E81899` disc, from the TKO token icon in Taiko's brand kit.
  - `JupiterCircle`, `JupiterCircleMono`, re-exported as `JupCircle`, `JupCircleMono`: the six gradient arcs on a `#0F1524` disc, from `JupiterTokens/Token-512x512.svg` in Jupiter's brand kit.
  - `LdoCircle`, `LdoCircleMono`: the white Lido mark on the LDO token's own `#FFAA7D` peach disc, from `Lido/Tokens/LDO/LDO.svg` in Lido's press kit. They belong to the `Ldo` coin only; `Ldo` and `LdoMono` still re-export the blue `Lido` mark.
  - `BerachainCircle`, `BerachainCircleMono`, re-exported as `BeraCircle`, `BeraCircleMono`: the white outlined bear face on a `#78350F` disc, the BERA token as published in Berachain's own `berachain/guides` repository. On dark backgrounds, `BerachainCircle` is now the legible alternative to the dark `Berachain` mark.
  
  Also, `DexIcon` now accepts the `'Circle'` and `'CircleMono'` variants (Jupiter is the first dex icon with them).
  
  **Visual change: `Hyperliquid` (and `Hype`) is now the official `#97FCE4` blob.** It is `Hyperliquid_Blob_Green.svg` from Hyperliquid's brand kit unchanged, the same blob the app uses for the HYPE token. It was a third-party redraw in `#50D2C1`, slightly wider. `HyperliquidMono` and `HypeMono` follow the new shape, and the manifest brand colour changes from `#50d2c1` to `#97fce4`.
  
  The manifest (`react-web3-icons/manifest`, `dist/manifest.json`) now lists the variants a unit re-exports alongside the ones it draws: `Ldo` reports `['', 'Mono', 'Circle', 'CircleMono']`.

- [#867](https://github.com/derodero24/react-web3-icons/pull/867) [`fccbb69`](https://github.com/derodero24/react-web3-icons/commit/fccbb69b46a6482c3f23b50c5b0a81c4598af225) Thanks [@derodero24](https://github.com/derodero24)! - Add official artwork for Gemini's app icon, USDS, Lace and Cronos, and rebuild `XrpCircle`:
  
  - New `GeminiSquare` / `GeminiSquareMono` (exchange): the official Gemini app icon from gemini.com, the white symbol on a `#FE630C` to `#FF4809` rounded tile. It is the legible Gemini option on dark backgrounds.
  - New `Usds` / `UsdsMono` (coin, ticker `USDS`): Sky's official USDS token, the white S on a `#FFD232` to `#FF6D6D` disc, from app.sky.money.
  - New `Lace` / `LaceMono` (wallet, slug `lace`): the Lace symbol from lace.io. Lace is Nami's successor: `NamiWallet` / `NamiWalletMono` are deprecated in favour of `Lace` / `LaceMono`, and the keys `nami` and `namiwallet` resolve to `Lace` (`<WalletIcon name="nami" />` renders the Lace symbol, and `WALLET_SLUG_TO_NAME` maps both to `'Lace'`).
  - `Cronos` / `CronosMono` (chain) and `Cro` / `CroMono` (coin): visual change. They now use the official Cronos mark from cronos.com, the black C on a `#4CDBFF` square. Before, they used the old Crypto.com lion shield. `Cronos` is now its own artwork, and `Cro` re-exports it. Chain ID 25, slug `cronos` and ticker `CRO` resolve as before.
  - `XrpCircle` / `XrpCircleMono`: visual change. They are now the official XRP symbol in white on a `#141414` disc (the XRPL Brand Kit's black), at the standard container size. The mark is larger than before, and the old `#23292F` disc is gone.

### Patch Changes

- [#872](https://github.com/derodero24/react-web3-icons/pull/872) [`22ace97`](https://github.com/derodero24/react-web3-icons/commit/22ace97e76cf48f918e83975df23bb8fad27cb10) Thanks [@derodero24](https://github.com/derodero24)! - **Visual change: `ArbiscanMono` is now the outline logomark**, the same artwork as `ArbitrumMono`: the ring and the four strokes in `currentColor` with the hexagon body left open. This is the Arbitrum Foundation brand kit's own one-colour logomark (`AllWhite_Logos_Logomark_RGB.svg`), and Arbiscan uses the Arbitrum logomark as its brandmark and publishes no one-colour symbol of its own. It replaces a filled hexagon with the strokes knocked out, so the two Arbitrum monos now match ([#746](https://github.com/derodero24/react-web3-icons/issues/746)). `Arbiscan` itself is unchanged; its source now cites the logo-symbol.svg in Arbiscan's brand assets.

- [#871](https://github.com/derodero24/react-web3-icons/pull/871) [`58850fe`](https://github.com/derodero24/react-web3-icons/commit/58850fe4e59273196f01f5f522c9551c2fdfe325) Thanks [@derodero24](https://github.com/derodero24)! - `Arweave` and `ArweaveMono` now use the glyph of Arweave's official brand kit page (the Glyph drawing served by arweave.org/brand-kit) instead of an approximation of the arweave.org header symbol ([#837](https://github.com/derodero24/react-web3-icons/issues/837)). The ring is slightly thinner and the "a" slightly larger; the `#222326` colour is unchanged.

- [#880](https://github.com/derodero24/react-web3-icons/pull/880) [`d5a6de0`](https://github.com/derodero24/react-web3-icons/commit/d5a6de0444976f80182404281238e53b17cddd39) Thanks [@derodero24](https://github.com/derodero24)! - Redraw `Bithumb` from the official Bithumb BI kit (bithumbcorp.com). It is the same b-and-flag mark, now with the kit's paths and colours: the b is `#FF8200` (was `#F47320`), and the flag and the shadow on the b's shoulder are `#D1350F` (was `#D53127` and a five-stop red-to-orange gradient). The shadow is the kit's own fade, converted from the vector file. `BithumbMono` is now the kit's one-colour symbol, whose flag and shoulder stand apart from the stem. The manifest's `brandColor` is now the guide's Bithumb Orange, `#ff6c00` (was `#d53127`).

- [#873](https://github.com/derodero24/react-web3-icons/pull/873) [`c148b1a`](https://github.com/derodero24/react-web3-icons/commit/c148b1acfb01ac124eec6a7fc3522c10ec8ec852) Thanks [@derodero24](https://github.com/derodero24)! - `BnbSmartChain` and all its variants now draw the exact symbol of the official BNB Chain brand kit (`BNB Chain_Symbol_Yellow.svg`, and `BNB Chain_Symbol_White.svg` on the containers), replacing an older redraw whose proportions and chevron arms were slightly off ([#836](https://github.com/derodero24/react-web3-icons/issues/836)). The colours, the `#F0B90B` disc and rounded square, and the mark's size inside them are unchanged. The re-exports follow: `Bnb`, `BnbMono`, `BnbCircle` and `BnbCircleMono` (coin), `OpBnb` and `OpBnbMono`, and the deprecated `BinanceSmartChain*` aliases.

- [#873](https://github.com/derodero24/react-web3-icons/pull/873) [`c148b1a`](https://github.com/derodero24/react-web3-icons/commit/c148b1acfb01ac124eec6a7fc3522c10ec8ec852) Thanks [@derodero24](https://github.com/derodero24)! - The source notes of `Cake` now also cite PancakeSwap's token-list icon, `tokens.pancakeswap.finance/images/symbol/cake.svg`, the same artwork as the brand kit's `cake-token.svg`, because the logo download link in the brand page's Markdown export returns 404 ([#836](https://github.com/derodero24/react-web3-icons/issues/836)). No icon changes visually.

- [#873](https://github.com/derodero24/react-web3-icons/pull/873) [`c148b1a`](https://github.com/derodero24/react-web3-icons/commit/c148b1acfb01ac124eec6a7fc3522c10ec8ec852) Thanks [@derodero24](https://github.com/derodero24)! - The source notes of `Cardano` (and its `Ada` re-export) now name the exact official file, `cardano.org/img/brand-assets/cardano-starburst-blue.svg` from the Cardano brand assets, which it renders identically, and describe how the Mono and Circle variants are built from it ([#836](https://github.com/derodero24/react-web3-icons/issues/836)). No icon changes visually.

- [#890](https://github.com/derodero24/react-web3-icons/pull/890) [`a85c6af`](https://github.com/derodero24/react-web3-icons/commit/a85c6af166531dab895bdf3f2b698ae739dc368f) Thanks [@derodero24](https://github.com/derodero24)! - The type declarations of the 16 category subpaths (`react-web3-icons/chain`, `react-web3-icons/wallet`, …) no longer export an `index_d_exports` namespace, which never existed at runtime. With `import * as wallets from 'react-web3-icons/wallet'`, `Object.values(wallets).map(Icon => <Icon />)` and `wallets[name]` with `name: keyof typeof wallets` now type-check. `IconName` is now generated as a list of names; it holds the same names as before.

- [#855](https://github.com/derodero24/react-web3-icons/pull/855) [`a59c454`](https://github.com/derodero24/react-web3-icons/commit/a59c4547f93ec7bfef5dc2e23b52a339a255ef93) Thanks [@derodero24](https://github.com/derodero24)! - Replace three outdated chain marks with the brands' current official artwork. Each mono variant is rebuilt from the new artwork, and the coin re-exports follow:
  
  - `Mantle` (and `Mnt`): the MoMNTum brandmark from Mantle's brand kit, 16 bars fading from white to `#00FF93`, without the old black disc. It is drawn for dark backgrounds. New `MantleSquare` / `MantleSquareMono` (re-exported as `MntSquare` / `MntSquareMono`) reproduce the official MNT token icon, the brandmark on an Obsidian Green `#092C24` square, for light backgrounds.
  - `Algorand` (and `Algo`): the AlgoBrand Kit's blue logomark (`#2D2DF1`) instead of a black redraw of the same A. `AlgorandCircle` is now a `#2D2DF1` disc with the white logomark.
  - `Aptos` (and `Apt`): the current Aptos Network symbol (`#0F0E0B`, with sharp diagonal cuts) from the Aptos media kit, replacing the earlier mark with rounded notches.

- [#875](https://github.com/derodero24/react-web3-icons/pull/875) [`4a1d744`](https://github.com/derodero24/react-web3-icons/commit/4a1d744ef49f91cf08e668c8da2c0abb3151a280) Thanks [@derodero24](https://github.com/derodero24)! - Source-only (the artwork already matched the official files, so nothing renders differently): `Compound`, `Liquity`, `Tenderly`, `Wagmi`, `Solscan`, `LooksRare` (+`Flat`), `CoinLedger` and `Coinpanda` (all variants) now cite the exact official files they match instead of a homepage (`Compound` had no `source` at all), and their notes say which file each variant comes from ([#837](https://github.com/derodero24/react-web3-icons/issues/837)).
  
  - `Compound`: `compound-mark.svg` (`#00D395`) from the official compound-finance/compound-components repo, which the paths are scaled from, and the compound.xyz header logo, which shows the same mark.
  - `Liquity`: the liquity.org navbar lockup and standalone icon files.
  - `Tenderly`: docs.tenderly.co `tenderly-symbol.svg`. The brand-assets page now lists a refreshed palette, but its files could not be downloaded, so the art stays.
  - `Wagmi`: `favicon.svg` (mark) and `logo-light.svg` (`#1B1B1B`) from wagmi's site.
  - `Solscan`: the Branding page symbol and the home-page header logo. The ring stays `#00E8B5`, the colour of both.
  - `LooksRare`: `icon-darkbg.svg`, `icon-lightbg.svg` (`Flat`) and `icon-mono-black.svg` (`Mono`) from the LooksRare brand-assets zip.
  - `CoinLedger`: the Logos kit linked from coinledger.io/press.
  - `Coinpanda`: the four icon files on coinpanda.io/branding (default, Mono, `Circle`, `Square`).

- [#845](https://github.com/derodero24/react-web3-icons/pull/845) [`a8b1133`](https://github.com/derodero24/react-web3-icons/commit/a8b113371fe97b4511a78c8c8d725e96c6d1a1af) Thanks [@derodero24](https://github.com/derodero24)! - Replace outdated or off-brand coin artwork with the brands' current official files ([#836](https://github.com/derodero24/react-web3-icons/issues/836)). Each mono variant is rebuilt from the new artwork:
  
  - `Usdc`: Circle's current `#0B53BF` USDC token.
  - `Usdt`: the Tether mark in `#009393`, from tether.to.
  - `Inj`: the flat `#4D3DFF` Injective token.
  - `Tia`: the current, heavier Celestia symbol in near-black `#0E1014`. Use `TiaMono` with a light `color` on dark backgrounds.
  - `Fet`: the ASI Alliance symbol, since FET is now the ASI Alliance token. The export name is unchanged.
  - `Stx`: the Stacks symbol (`#141414`), which replaces a glyph that was not the Stacks mark.
  - `Vet`: the flat `#7266FF` V from VeChain's brand kit.
  - `Hbar`: the Hedera logomark (an H in a black disc), which Hedera uses for HBAR.
  - `Bch`: the official `#0AC18E` Bitcoin Cash circle.
  - `Fil`: the white ƒ on a `#0090FF` disc.
  - `Shib`: the current SHIB token from shibatoken.com.
  - `Xmr`: the Monero symbol from the press kit, now with its grey band.
  - `Flare` / `Flr`: the paths of the official Flare.svg.
  - Official colours for `Icp` (infinity mark from internetcomputer.org), `Ena` (gradient disc with a rim), `Kas` (`#6FC7BA`, white K) and `Xrp` (`#141414`).
  - `Bnb`: now the bare yellow BNB Chain symbol, which the brand guidelines specify for the BNB token. The coin on a yellow disc is still available as `BnbCircle`.

- [#861](https://github.com/derodero24/react-web3-icons/pull/861) [`e58ec98`](https://github.com/derodero24/react-web3-icons/commit/e58ec981d1d70c2d43078b51c0eb67adc5155eda) Thanks [@derodero24](https://github.com/derodero24)! - Replace the `Zec` artwork with the official Zcash brandmark from the Zcash Media Kit ([#836](https://github.com/derodero24/react-web3-icons/issues/836)). It is a `#F4B728` disc with the Z cut out, where the old icon was a `#ECB244` disc with a white, rounded Z. `ZecMono` is now the kit's one-colour brandmark with the same geometry. The colored `Doge`, `Pepe` and `Ltc` keep their artwork, and their source notes now give where it actually comes from.

- [#871](https://github.com/derodero24/react-web3-icons/pull/871) [`58850fe`](https://github.com/derodero24/react-web3-icons/commit/58850fe4e59273196f01f5f522c9551c2fdfe325) Thanks [@derodero24](https://github.com/derodero24)! - `CoinMarketCap` now renders the bare mark in the official `#17181B` of CoinMarketCap's logo file (`coinmarketcap_1.svg`) instead of `#3861FB`, a colour no official vector of the bare mark uses ([#837](https://github.com/derodero24/react-web3-icons/issues/837)). The geometry and `CoinMarketCapMono` are unchanged. The manifest `brandColor` stays `#3861fb`, now set explicitly from the site's brand blue. On dark backgrounds, use the new `CoinMarketCapCircle` or `CoinMarketCapMono` with a light `color`.

- [#890](https://github.com/derodero24/react-web3-icons/pull/890) [`a85c6af`](https://github.com/derodero24/react-web3-icons/commit/a85c6af166531dab895bdf3f2b698ae739dc368f) Thanks [@derodero24](https://github.com/derodero24)! - The internal `createIcon` module that every icon imports no longer carries a second call form that no icon used. A single tree-shaken icon is 689 B instead of 766 B (minified and brotlied).

- [#872](https://github.com/derodero24/react-web3-icons/pull/872) [`22ace97`](https://github.com/derodero24/react-web3-icons/commit/22ace97e76cf48f918e83975df23bb8fad27cb10) Thanks [@derodero24](https://github.com/derodero24)! - **Visual change: `EthereumMono` (and the `EthMono` coin re-export) now shows the diamond's facets.** It is ethereum.org's own one-colour diamond, `eth-diamond-black.svg` ("ETH diamond (gray)" on ethereum.org/assets), in `currentColor` with the file's opacity tiers: `.45` for the left faces, `.6` for the middle band and `.8` for the right faces. The previous mono used near-opaque tiers (`.85` to `1`), so it read as a solid silhouette. `Ethereum`, `EthereumCircle` and `EthereumSquare` keep their artwork; the unit now cites the exact ethereum.org file.

- [#871](https://github.com/derodero24/react-web3-icons/pull/871) [`58850fe`](https://github.com/derodero24/react-web3-icons/commit/58850fe4e59273196f01f5f522c9551c2fdfe325) Thanks [@derodero24](https://github.com/derodero24)! - `Etherscan`, `EtherscanMono` and `EtherscanInverted` now cite their exact files in Etherscan's official brand package ([#837](https://github.com/derodero24/react-web3-icons/issues/837)): `etherscan-logo-circle.svg` for `Etherscan` and `EtherscanMono`, and `etherscan-logo-circle-light.svg` (white mark, `#8B8B8B` arc, the same shape as `Etherscan`) for `EtherscanInverted`. The shapes and colours are the same as in 4.x.

- [#865](https://github.com/derodero24/react-web3-icons/pull/865) [`ac4a01f`](https://github.com/derodero24/react-web3-icons/commit/ac4a01f1b3537e9bf5ed6ca9d4429bb5fde7de84) Thanks [@derodero24](https://github.com/derodero24)! - `package.json` now gives `repository` as an explicit git URL (`git+https://github.com/derodero24/react-web3-icons.git`) instead of the `github:` shorthand, the form npm compares against the provenance attestation of a release ([#703](https://github.com/derodero24/react-web3-icons/issues/703)).

- [#841](https://github.com/derodero24/react-web3-icons/pull/841) [`a52fa89`](https://github.com/derodero24/react-web3-icons/commit/a52fa898c5e537680baf3fac986369989505979d) Thanks [@derodero24](https://github.com/derodero24)! - Fix colored icons that rendered wrong, using the brands' official artwork:
  
  - `Pendle`: the white circle disappeared on light backgrounds. It is now the official light-background mark (circle `#DEDEDE`, ball `#1E4480`).
  - `OptimismCircle`, `OptimismSquare` and their `Mono` variants: the centre sparkle is cut out, as in the official OP Mainnet symbol. The first two filled it white, and the masks of the Mono variants knocked it out instead of keeping it as ink.
  - `Dydx` / `DydxMono`: `Dydx` was white on transparent and invisible on light backgrounds. It is now dYdX's official light-theme logomark (dark strokes with the `#6966FF` accent). Use `DydxInverted` or `DydxSquare` on dark backgrounds.

- [#833](https://github.com/derodero24/react-web3-icons/pull/833) [`4229cc2`](https://github.com/derodero24/react-web3-icons/commit/4229cc236d7f54436aee1660c5309f0d4aa7fd4c) Thanks [@derodero24](https://github.com/derodero24)! - Complete the Iconify collection metadata and pass Iconify's own validators (`react-web3-icons/iconify.json`, `iconify-mono.json`):
  
  - `info.samples` named `coin-bitcoin`, which is not an icon (`coin-btc` is an alias of `chain-bitcoin`). The samples are now six visible icons: `chain-ethereum`, `chain-bitcoin`, `chain-solana`, `wallet-meta-mask`, `dex-uniswap`, `exchange-binance` (`-mono` in the mono set).
  - `info.total` counted hidden (deprecated) icons; it now counts visible icons, as Iconify does.
  - New `info.version` (the package version) and `info.category` (`Logos`, where Iconify lists brand sets).
  - New `info.displayHeight`: `16`, the preview height Iconify derives from `info.height` (now 64).
  - Colored icons with shapes that set no fill (e.g. `web3:chain-linea`, `web3:chain-stellar`) now state the black they render with, wrapped in `<g fill="#000">`. Iconify's tooling reported these as unset colours and could not detect the set's palette. Rendering is unchanged.

- [#872](https://github.com/derodero24/react-web3-icons/pull/872) [`22ace97`](https://github.com/derodero24/react-web3-icons/commit/22ace97e76cf48f918e83975df23bb8fad27cb10) Thanks [@derodero24](https://github.com/derodero24)! - **Visual change: `Injective` and `InjectiveMono` take the exact icon from Injective's brand kit** (`icon_Injective-Ocean.svg` in injective.com/brand), which corrects a slight horizontal squash: the mark is now about 2% wider, as in the official file. Colour (`#4D3DFF`) and shape are otherwise unchanged.

- [#822](https://github.com/derodero24/react-web3-icons/pull/822) [`87de827`](https://github.com/derodero24/react-web3-icons/commit/87de827245ba41d8f41626edfede7a2d4824a63e) Thanks [@derodero24](https://github.com/derodero24)! - Packaging fixes:
  
  - The package no longer declares `engines`, so installing it under Node 18 or 20 no longer warns, or fails with Yarn 1 or `engine-strict`. Nothing in the published files depends on the Node version. What consumers need is an ES2022 baseline: the JavaScript is compiled to ES2022 (now set explicitly instead of being inferred from `engines`) and runs in any browser, bundler, or runtime that supports ES2022. The Node requirement in `devEngines` (see CONTRIBUTING.md) only applies to building the library from source.
  - `react-web3-icons/package.json` is now exported, so `require.resolve('react-web3-icons/package.json')` and `import.meta.resolve` work instead of throwing `ERR_PACKAGE_PATH_NOT_EXPORTED`.
  - JavaScript and declaration sourcemaps are no longer published. The declaration maps pointed at `src/`, which is not in the package. In 4.0.0 they were 526 of the 1,863 files and about 30% of the unpacked size (1.48 of 4.98 MB). Dropping them changes nothing else in the published JavaScript and type declarations.

- [#852](https://github.com/derodero24/react-web3-icons/pull/852) [`208cf9a`](https://github.com/derodero24/react-web3-icons/commit/208cf9ac2d5f21c9404af1df2e85cd94536a9602) Thanks [@derodero24](https://github.com/derodero24)! - Redraw every MetaMask icon from MetaMask's official 2024 flat fox (logo pack at https://metamask.io/assets), replacing the pre-2024 faceted fox:
  
  - `MetaMask`: the kit's 2024 fox. The kit has a single fox design, so `MetaMaskAlt` renders the same fox and is deprecated in this release.
  - `MetaMaskCircle`, `MetaMaskSquare`: a white fox on the new `#FF5C16` orange.
  - `MetaMaskMono`, `MetaMaskCircleMono`, `MetaMaskSquareMono`: one colour with knock-out seams between the facets, open eyes and a solid mouth, so the fox stays recognisable at small sizes.
  - The manifest brand colour for `MetaMask` changes from `#f6851b` to `#ff5c16`.

- [#872](https://github.com/derodero24/react-web3-icons/pull/872) [`22ace97`](https://github.com/derodero24/react-web3-icons/commit/22ace97e76cf48f918e83975df23bb8fad27cb10) Thanks [@derodero24](https://github.com/derodero24)! - **Visual change: `Metis` is now the official Metis symbol** from metis.io/brandassets (Logo Library, "Symbol Metis"): a black head with a laurel sprig on a full-bleed `#00D2FF` disc. It replaces the retired symbol, a `#00D8C1` disc with the head knocked out, for which no official vector exists ([#835](https://github.com/derodero24/react-web3-icons/issues/835)). `MetisMono` is the disc in `currentColor` with the head knocked out and the sprig left in ink, like Metis's own one-colour symbols. Its manifest `brandColor` changes from `#00d8c1` to `#00d2ff`. The export names and the `metis` / chain `1088` lookups are unchanged.

- [#889](https://github.com/derodero24/react-web3-icons/pull/889) [`0e2c88e`](https://github.com/derodero24/react-web3-icons/commit/0e2c88e7e4738bad6ec629bf6f722bdb861abaa1) Thanks [@derodero24](https://github.com/derodero24)! - The `fill` prop now recolours `HardhatMono` and `PancakeSwapMono`, as it does every other Mono icon; their artwork used to ignore it. Both render as before by default and with `color`, and so do `react-web3-icons/svg/*` and the Iconify sets.

- [#842](https://github.com/derodero24/react-web3-icons/pull/842) [`226a230`](https://github.com/derodero24/react-web3-icons/commit/226a230647146c81519ae054806e6618d18bf875) Thanks [@derodero24](https://github.com/derodero24)! - Make illegible `*Mono` variants read as their coloured marks again ([#746](https://github.com/derodero24/react-web3-icons/issues/746)). Every redraw is derived from the coloured artwork, in one ink colour with holes:
  
  - `RainbowMono`, `RainbowSymbolMono`, `RainbowCircleMono` and `RainbowSquareMono` keep the three bands apart with thin seams.
  - `RoutescanMono` and `DefiLlamaMono` drop their opacity tiers: a seamed hexagon, and the D with the llama knocked out.
  - `DogeMono` is the full coin with the coloured D knocked out, `ShibMono` regains the disc behind the head, and `CrvMono` shows the tube and its bands instead of a blob.

- [#846](https://github.com/derodero24/react-web3-icons/pull/846) [`48f50af`](https://github.com/derodero24/react-web3-icons/commit/48f50afbc755e2bba8de5f6139e663a58812e893) Thanks [@derodero24](https://github.com/derodero24)! - Redraw seven `*Mono` variants so they keep more of the coloured design, and use the official Cosmos artwork for `Atom`:
  
  - `Atom` now uses the Cosmos chain-registry artwork, with its dark disc ([#836](https://github.com/derodero24/react-web3-icons/issues/836)). It fills the icon box like other coin discs, so it renders larger than before. `AtomMono` is that disc in ink, with the orbits, electrons and nucleus knocked out.
  - `PendleMono`, `TenderlyMono` and `DeBankMono` drop their grey opacity tiers. They are in one ink, with thin gaps that keep the circle and pendulum, the three wings, and the arc in front of the B apart.
  - `LidoMono` is Lido's own one-colour mark: the kite is an outline around a hole above the solid bowl.
  - `IpfsMono` is a solid cube with seams on its faces, instead of a wireframe.
  - `NftStorageMono` (deprecated in this release) draws the stack of cards behind the front card in solid ink, with thin gaps between the cards, as the coloured art shows it in yellow.

- [#848](https://github.com/derodero24/react-web3-icons/pull/848) [`b3274bf`](https://github.com/derodero24/react-web3-icons/commit/b3274bf4c7c17f0d7780b1d68f5a0acfaf9a653e) Thanks [@derodero24](https://github.com/derodero24)! - Keep the internal structure of the coloured marks in more `*Mono` variants. Every change is derived from the coloured artwork, in one ink colour with 1.2-unit knockout seams:
  
  - `EthereumCircleMono` and `EthereumSquareMono` show the facet edges of the diamond instead of a flat knockout.
  - `StarknetMono` (and `StarknetCircleMono`, now the same component) and `StarknetSquareMono` keep the pink underside of the wave apart from the white crest.
  - `CakeMono` knocks the whole bunny out of the disc and keeps the pancake crescent, without the hairline around the outline.
  - `Web3JsMono` (deprecated in this release) replaces the hairlines between the letter groups with real seams.
  - `UnstoppableDomainsMono` keeps the stripe behind the U.
  - `DrpcMono` drops its opacity tiers: every prism face in ink, kept apart by seams.
  - `RabbyMono` keeps the haunch and the back ear apart from the body.

- [#849](https://github.com/derodero24/react-web3-icons/pull/849) [`30604f3`](https://github.com/derodero24/react-web3-icons/commit/30604f3c2f3cfa660916d58057ff60a90aa88475) Thanks [@derodero24](https://github.com/derodero24)! - Bring six icons in line with the brands' official kits. Export names are unchanged.
  
  - `Lido` is Lido's 2026 logomark: a `#0085FF` outlined kite over a solid bowl, from the official press kit. It replaces the faceted `#00A3FF` drop. `LidoMono` is the kit's one-colour logomark.
  - `UsdtCircle` is Tether's official token icon, the white mark on a `#009393` disc, and `UsdtCircleMono` follows it. They replace a `#26A17B` composite.
  - `Raydium` is the official symbol from Raydium's UI repository (RaydiumLogo.tsx), nearly unchanged visually: its gradient now runs from teal at the bottom-left to purple at the top-right, as in the official file. The colours are unchanged.
  - `Eclipse` is the brand kit's standalone black symbol, without the green tile, and `EclipseMono` is the same symbol.
  - `Xverse` is the kit's standalone symbol (`#0F0F0F` X with the `#EE7A30` accent), without the dark disc. `XverseMono` follows it.
  - `Wld` is the official World logomark, the same artwork as `WorldChain`. Its ring and strokes are thicker than before.
  - Sources and notes for Vet, Cro, LayerZero, Tron, Pyth, Camelot, Jupiter, Icp and UniswapWallet now cite the official kits.

- [#877](https://github.com/derodero24/react-web3-icons/pull/877) [`4052739`](https://github.com/derodero24/react-web3-icons/commit/405273939e836ccfda1ce53e4cf6dffb8f8c5610) Thanks [@derodero24](https://github.com/derodero24)! - Use the official artwork for two icons and cite the exact official files for nine more ([#835](https://github.com/derodero24/react-web3-icons/issues/835)). Export names are unchanged.
  
  - `MantaPacific`: the icon from Manta Network's 2024 logo kit, with much heavier strokes and a diagonal `#29CCB9` / `#009AFF` / `#FF66B7` gradient, instead of a thin-stroke drawing with a horizontal gradient. `MantaPacificMono` is the kit's one-colour icon.
  - `UnstoppableDomains`: the paths of the site's own icon, in the same `#00C9FF` and `#0D67FE`. The mark keeps its 56-unit width and is about 1.3% taller (50.9 units instead of 50.2): the U reaches about 0.3 units higher and lower, and the stripe is a little steeper. `UnstoppableDomainsMono` is rebuilt from those paths with the same 1.2-unit seam between the stripe and the U.
  - `Zora`, `Bitcoin`, `Astar`, `Chainstack`, `Across`, `Ankr`, `Drpc`, `Helius` and `Infura` now cite the exact official files in their sources and notes, which also record where the artwork differs slightly from those files. Their artwork is unchanged.

- [#871](https://github.com/derodero24/react-web3-icons/pull/871) [`58850fe`](https://github.com/derodero24/react-web3-icons/commit/58850fe4e59273196f01f5f522c9551c2fdfe325) Thanks [@derodero24](https://github.com/derodero24)! - `OpenZeppelin` is now the current Z mark of OpenZeppelin's official brand kit (`OZ-Logo-FavIconColor.svg`, `#2E99FF` / `#4F56FA` / `#09C2FF`, with a rectangular lower-right block), replacing the retired pale-blue mark (`#63D2F9` / `#4E5EE4` / `#63B0F9`) of the old openzeppelin-contracts logo ([#837](https://github.com/derodero24/react-web3-icons/issues/837)). `OpenZeppelinMono` follows the new shape. The manifest `brandColor` is now `#2e99ff`. Export names are unchanged.

- [#851](https://github.com/derodero24/react-web3-icons/pull/851) [`ac116fa`](https://github.com/derodero24/react-web3-icons/commit/ac116fa40cc2e429223496b58f043d9f6f83f663) Thanks [@derodero24](https://github.com/derodero24)! - **Visual change: `Optimism` is now a square, not a circle.** It is the official OP Mainnet symbol from Optimism's brand kit (optimism.io/brand), the glyph in `#FAFAF9` on a full-bleed `#FF0421` (Optimism Red) square. It was a `#FF0420` disc with a white glyph. `OptimismMono` follows the new square shape. No export names change.
  
  - `OptimismSquare` is the symbol as the brand page shows it, on a `#FF0421` square with slightly rounded corners (6.27 of 64 units, down from 12.8). The glyph is drawn at the symbol's own size, larger than before.
  - `OptimismCircle` uses the official colours and draws the glyph at the symbol's own size on the `#FF0421` disc. Optimism publishes no circular OP Mainnet symbol, so the disc is still a repo convention.
  - `OptimismMono`, `OptimismCircleMono` and `OptimismSquareMono` are their variant's container in `currentColor` with the glyph knocked out.
  - **`Op` is now the official OP token mark**, the letters OP in `#FAFAF9` on a `#FF0421` disc (`Token.svg` from the brand kit). Optimism's brand page reserves this mark for the token, so `Op` no longer re-exports the `Optimism` chain symbol. `OpMono` is the disc in `currentColor` with the letters knocked out. `OpCircle` and `OpCircleMono` are now the same components as `Op` and `OpMono`. The `OP` ticker lookup is unchanged.

- [#890](https://github.com/derodero24/react-web3-icons/pull/890) [`a85c6af`](https://github.com/derodero24/react-web3-icons/commit/a85c6af166531dab895bdf3f2b698ae739dc368f) Thanks [@derodero24](https://github.com/derodero24)! - Optional props now accept `undefined` under `exactOptionalPropertyTypes`, like the SVG attributes of `@types/react`: `title`, `titleId` and `size` of every icon, `withBackground`, `fill1` and `fill2` of the icons with extra props, and `variant` of the `react-web3-icons/dynamic` components. The identifier props of the dynamic components (`chainId`, `name`, `symbol`) stay required but accept `undefined` too, which renders `fallback`: `<CoinIcon symbol={token?.symbol} />` now type-checks. `<Ethereum title={label} />` with `label: string | undefined` now type-checks, and so does spreading an `IconProps` object into `<ChainIcon chainId={id} {...props} />`.

- [#840](https://github.com/derodero24/react-web3-icons/pull/840) [`c07f1a4`](https://github.com/derodero24/react-web3-icons/commit/c07f1a47c0ab2e97262299edc619aac8c504ac6e) Thanks [@derodero24](https://github.com/derodero24)! - Redraw `PepeMono` so it reads as Pepe again ([#746](https://github.com/derodero24/react-web3-icons/issues/746)). Its knockout path was a corrupted copy of the coloured line art that filled the forehead and lips as blobs and dropped the eyes and hand. The mono is now derived mechanically from the coloured artwork: the tile in ink, Pepe's silhouette knocked out, and the line art, lips and pupils drawn back in ink.

- [#890](https://github.com/derodero24/react-web3-icons/pull/890) [`a85c6af`](https://github.com/derodero24/react-web3-icons/commit/a85c6af166531dab895bdf3f2b698ae739dc368f) Thanks [@derodero24](https://github.com/derodero24)! - The eight `react-web3-icons/dynamic` components are now `/* @__PURE__ */`-annotated, so a bundler drops the ones you do not import. Before, importing only `CoinIcon` also bundled the lazy import maps and lookup maps of the seven other categories: with esbuild and code splitting, the entry chunk shrinks from 37.2 KB to 10.9 KB (minified).

- [#862](https://github.com/derodero24/react-web3-icons/pull/862) [`e13c440`](https://github.com/derodero24/react-web3-icons/commit/e13c440c06aeda8e6acb0642ae3037f929e31612) Thanks [@derodero24](https://github.com/derodero24)! - Replace outdated or off-brand chain marks with the brands' current official artwork ([#835](https://github.com/derodero24/react-web3-icons/issues/835)). The mono variants are rebuilt from the new artwork, and the coin re-exports follow:
  
  - `Kava` (and the `Kava` coin): the official Primary Logomark from kava.io/branding, a wider K in Kava Red `#FF433E` instead of a narrower K in `#FF564F`.
  - `Immutable`: the current Immutable symbol from immutable.com, a `#2B3038` disc with the hexagonal knot knocked out, instead of the retired Immutable X "X" on a black disc. `ImmutableMono` is the same disc in `currentColor`.
  - `Ink`: the official `InkLogo` from Ink's UI kit, the mark in `#7132F5` on a `#F0EFFF` disc, instead of the same mark in `#7757E2` with no light disc. `InkMono` is Ink's own one-colour logo.
  - `Scroll`: the current outline scroll mark in `#0A0A0A` from scroll.io, without the earlier beige tile and coloured scroll.
  - `Near` (and the `Near` coin): the black (`#000`) NEAR symbol from near.org, instead of a `#00EC97` green N.
  - `Stacks`: the exact symbol from the stacks.co navbar, which corrects a slight horizontal stretch.
  - `Fraxtal`: the official Fraxtal chain icon from frax.com, a white chain link on a black disc, instead of the generic Frax currency sign. `FraxtalMono` is the disc with the chain link knocked out.

- [#853](https://github.com/derodero24/react-web3-icons/pull/853) [`ec9bfe8`](https://github.com/derodero24/react-web3-icons/commit/ec9bfe8733846bb863ec28926ce6e4430bd70370) Thanks [@derodero24](https://github.com/derodero24)! - Update outdated or off-brand artwork in the defi, devtool, explorer, marketplace, storage and tracker categories to the brands' current official assets ([#837](https://github.com/derodero24/react-web3-icons/issues/837)). Export names are unchanged.
  
  - New marks after rebrands: `Babylon` (2026 symbol, `#CE6533`), `Synthetix` (the `#00D1FF` brand-kit icon), `RocketPool` (current logo), `Chainlink` (`#0847F7` hexagon with a transparent centre), `Moralis` (2025 blue-to-magenta mark), `Pinata` (current llama), `CoinGecko` (rebrand symbol; the mono is CoinGecko's own one-colour symbol).
  - `OpenSea` and `OpenSeaSymbol`: the current opensea.io logo (`#0086FF`, redrawn ship). `OpenSeaAlt` keeps its artwork and is deprecated.
  - `Balancer` is now the official monochrome mark (black, replacing the retired v2 gradient).
  - Colours corrected to the official values: `Blockscout` (`#5353D3`), `Morpho` (solid `#004EC3` lower wings), `Ethena` (gradient disc with its rim), `Convex` (`#3A3A3A` C with its accent pixels), `Privy` (`#010110`), `CollabLand` (`#1A1A40` face), `TheGraph` (the kit's `#0C0A1D` logomark), and the `Hardhat` diamond.
  - Geometry taken from the official files: `Gmx`, `Yearn`, `Thirdweb`, and `Frax`, which now keeps the disc of the official icon.
  - `Celoscan` is now the official `#FCFF52` tile with the black C, replacing the retired Celo green. `CeloscanSquare` is unchanged.
  - The matching `Mono` variants are rebuilt from the new artwork.

- [#863](https://github.com/derodero24/react-web3-icons/pull/863) [`2c691b2`](https://github.com/derodero24/react-web3-icons/commit/2c691b2a56b2bb54160be5f02dad8e7f5d3366c2) Thanks [@derodero24](https://github.com/derodero24)! - Finish the artwork refresh of the defi, devtool, explorer, marketplace, portfolio and tracker categories ([#837](https://github.com/derodero24/react-web3-icons/issues/837)). Export names are unchanged.
  
  - `Remix` / `RemixMono`: the official Remix logo (the shell mark the IDE draws in its top bar, `#007AA6`) replaces an unrelated black disc with a figure.
  - `EthersJs`: the path of the official ethers logo (even-odd fill, `EthersJsMono` too) in `#1D4C7C`, the colour ethers.org renders its logo in, instead of the off-brand `#24339B`. Ethers publishes the vector only in white; `EthersJsMono` with `color="#fff"` gives that white logo.
  - `MagicEden` and `MagicEdenFlat`: the current magiceden.io header mark in the brand colour `#EC136D`. This replaces the retired purple-to-pink gradient (default) and `#E93A88` (Flat), so the two exports now look the same, and `MagicEdenFlat` is deprecated in this release. `MagicEdenMono` takes the header path (no visible change).
  - `MagicEdenWordmark` / `MagicEdenWordmarkMono`: the current horizontal header wordmark (`#EC136D` mark, `#24262F` letters) replaces the stacked lockup with the retired gradient. In the square 64-unit box it paints only about 6.4 units tall, so render it at roughly 128 px or larger, or use `MagicEden` at small sizes. `MagicEdenWordmarkFlat` keeps the stacked lockup, since Magic Eden has no single-colour wordmark, and is deprecated in this release.
  - Source-only (the artwork already matched the official files): `Bscscan` (+`Inverted`), `Routescan`, `DefiLlama` and `Aragon` now cite the exact official files. `AragonCircle`, `Avascan` and `Zapper` are now documented as non-official or unverified.

- [#826](https://github.com/derodero24/react-web3-icons/pull/826) [`d66b881`](https://github.com/derodero24/react-web3-icons/commit/d66b881f301132f8749a9e6615f3ad578cf79c5d) Thanks [@derodero24](https://github.com/derodero24)! - Make the static SVG files safe to inline together and fix the Iconify metadata.
  
  - `react-web3-icons/svg/*`: internal ids (gradients, masks, clip paths) are now prefixed per file as `w3i-<category>-<kebab-name>_<id>` (e.g. `w3i-chain-arbitrum-circle-mono_arb-circle-a`), with every `url(#…)` reference (including `URL(#…)`) updated, so two inlined SVGs no longer collide on ids like `id="a"`. Iconify bodies use the same `<icon-name>_<id>` form, which keeps ids of different icons distinct even when one icon name is a prefix of another. Files are also serialized uniformly (one element per line). Rendering is unchanged.
  - `react-web3-icons/iconify.json` and `iconify-mono.json`: `info.height` was hard-coded to 24 although most icons kept their native viewBox (64, 40, 2500, …). It now states the icons' common height, 64.
  - Attribute values keep their meaning through the build: literal line breaks inside an attribute are normalized to spaces as XML requires, and line breaks written as character references (`&#10;`) are kept instead of being collapsed.

- [#871](https://github.com/derodero24/react-web3-icons/pull/871) [`58850fe`](https://github.com/derodero24/react-web3-icons/commit/58850fe4e59273196f01f5f522c9551c2fdfe325) Thanks [@derodero24](https://github.com/derodero24)! - `Safe` (wallet) and `SafeProtocol` (defi) now render the official `#1A1A1A` of safe.global's own mark, `safe-icon.svg`, instead of `#000`; the geometry is unchanged, and `SafeMono` / `SafeProtocolMono` are unchanged ([#837](https://github.com/derodero24/react-web3-icons/issues/837)). The two units drew the same artwork, so `SafeProtocol` and `SafeProtocolMono` now re-export `Safe` and `SafeMono` instead of keeping a second copy. The slug `safeprotocol` still resolves through `DefiIcon`. As with other re-exports (`CosmosHub`), the manifest's `SafeProtocol` entry takes its `brandColor` from `Safe`, and the Iconify icon `defi-safe-protocol` becomes an alias of `wallet-safe`; `react-web3-icons/svg/defi/SafeProtocol.svg` is still shipped. The `brandColor` of `Safe` and `SafeProtocol` is now `#1a1a1a`.

- [#871](https://github.com/derodero24/react-web3-icons/pull/871) [`58850fe`](https://github.com/derodero24/react-web3-icons/commit/58850fe4e59273196f01f5f522c9551c2fdfe325) Thanks [@derodero24](https://github.com/derodero24)! - `Solidity` and `SolidityMono` now use the current official Solidity logo, `docs/logo.svg` of the Solidity repository (the logo of the docs and soliditylang.org headers), with equilateral triangles ([#837](https://github.com/derodero24/react-web3-icons/issues/837)). The mark is about 2% narrower (aspect ratio 0.633 instead of 0.644); the height, the `#2B247C` colour and the `.8` / `.45` / `.6` opacity tiers are unchanged. The previous shape came from the legacy 2016 brand-guide file.

- [#893](https://github.com/derodero24/react-web3-icons/pull/893) [`88d1cc7`](https://github.com/derodero24/react-web3-icons/commit/88d1cc70fcab27ec3687a211574c09f6af352f3d) Thanks [@derodero24](https://github.com/derodero24)! - The manifest search term `ftm` moves from the deprecated chain `Fantom` to `Sonic` (`aliases: ['s', 'fantom', 'ftm']`), the icon the `ftm` key resolves to. Like lookup keys, the aliases of a deprecated icon now belong on its replacement.

- [#893](https://github.com/derodero24/react-web3-icons/pull/893) [`88d1cc7`](https://github.com/derodero24/react-web3-icons/commit/88d1cc70fcab27ec3687a211574c09f6af352f3d) Thanks [@derodero24](https://github.com/derodero24)! - Source-only (nothing renders differently): `Crv` now names its legacy source, `@web3icons/react` (MIT), in its source list, and `PolkadotJs` records that polkadot.js.org serves its orange disc only as a raster favicon, so the vector is unverified. `BnbSmartChain`, `Avalanche` and `Dydx` cite the official files at their current addresses. `BnbSmartChain` cites the two BNB Chain symbol files instead of a folder that returns 404. `Avalanche` cites avalanche.com's `touchicon.svg` instead of the old avax.network address, the brand kit article at its new address, and the logo folder that the article now links. `DydxSquare` cites dydx.trade's `favicon.svg`, which the notes compare with the shipped tile (its 2-unit border is not in the current favicon).

- [#871](https://github.com/derodero24/react-web3-icons/pull/871) [`58850fe`](https://github.com/derodero24/react-web3-icons/commit/58850fe4e59273196f01f5f522c9551c2fdfe325) Thanks [@derodero24](https://github.com/derodero24)! - `Spark` and `SparkMono` now use the logomark of Spark's official press kit (`spark-logomark.svg` from docs.spark.finance/brand) ([#837](https://github.com/derodero24/react-web3-icons/issues/837)). The star is square in the kit, so it is now about 3.5% wider than before; the `#FA43BD` to `#FFA930` gradient is unchanged. The previous star came from the narrower spark.finance site lockup.

- [#872](https://github.com/derodero24/react-web3-icons/pull/872) [`22ace97`](https://github.com/derodero24/react-web3-icons/commit/22ace97e76cf48f918e83975df23bb8fad27cb10) Thanks [@derodero24](https://github.com/derodero24)! - **Visual change: `Stellar` and `StellarMono` (and the `Xlm` / `XlmMono` coin re-exports) now use the mark from Stellar's Logo Press Kit 2026** (stellar.org/brand-resources, "Stellar logo pack"): the same ring with two bands, drawn with a thinner ring and thinner bands than before. The previous artwork was the heavier version that the stellar.org header still shows. `Stellar` is black (`#000`) as in the kit's RGB export, and its manifest entry now lists `#000000` as its `brandColor`.

- [#880](https://github.com/derodero24/react-web3-icons/pull/880) [`d5a6de0`](https://github.com/derodero24/react-web3-icons/commit/d5a6de0444976f80182404281238e53b17cddd39) Thanks [@derodero24](https://github.com/derodero24)! - `TrustWallet` / `TrustWalletMono` are now the standalone two-part shield of trustwallet.com/icon.svg, without the white tile. Before, they were aliases of `TrustWalletSquare` / `TrustWalletSquareMono`, so `TrustWallet`, `TrustWalletMono` and `<WalletIcon name="trust" />` change from the shield on a white tile to the bare shield. `TrustWalletMono` is the shield silhouette with a gap where the two halves meet. Use `TrustWalletSquare` / `TrustWalletSquareMono` for the previous look. The manifest variants are unchanged; the `brandColor` is now `#0500ff` (was `#0a64bc`), the blue of the current shield.

- [#886](https://github.com/derodero24/react-web3-icons/pull/886) [`8743ad1`](https://github.com/derodero24/react-web3-icons/commit/8743ad199fd043d2b36a0bf97ffe9b9ebdd685ea) Thanks [@derodero24](https://github.com/derodero24)! - Source-only (nothing renders differently): `DeBank`, `Linea` and `Celo` cited only a homepage, and their notes now record what could not be verified. No official vector of `DeBank` was found, and its artwork matches debank.com's PNG app icon. `Linea` and `Celo` have not been compared with an official logo file, and `Celo` now names its legacy source, `@web3icons/react` (MIT).

- [#880](https://github.com/derodero24/react-web3-icons/pull/880) [`d5a6de0`](https://github.com/derodero24/react-web3-icons/commit/d5a6de0444976f80182404281238e53b17cddd39) Thanks [@derodero24](https://github.com/derodero24)! - Replace three wallet and DEX icons whose artwork differed from the brands' current official files ([#834](https://github.com/derodero24/react-web3-icons/issues/834)).
  
  - `Uniswap` / `UniswapMono` (and `Uni` / `UniMono`, which re-export them): the current `#F50DB4` unicorn from Uniswap's official brand assets replaces the earlier, thinner unicorn in `#FF007A`. The mono is the official one-colour icon. The manifest's `brandColor` is now `#f50db4` (was `#ff007a`).
  - `Backpack` / `BackpackMono`: the symbol from Backpack's media kit page, the same backpack with rounder corners, including the tips of the handle.
  - `Exodus` / `ExodusMono`: exodus.com's official icon.svg. The old copy was stretched 1.8% horizontally.

- [#844](https://github.com/derodero24/react-web3-icons/pull/844) [`f9be5ae`](https://github.com/derodero24/react-web3-icons/commit/f9be5ae01a79abd1117938757b10f1e3ff8d01d5) Thanks [@derodero24](https://github.com/derodero24)! - Refresh outdated wallet, exchange and DEX artwork from the brands' current official files ([#834](https://github.com/derodero24/react-web3-icons/issues/834)).
  
  - `Phantom` (+ `Mono`, `Circle`, `Square` and their `Mono` variants): the flat `#AB9FF2` ghost from Phantom's press kit replaces the old gradient app icon. The default is now the standalone ghost. `Square` is the press kit's app icon, and `Circle` puts the same artwork on a circle.
  - `TrustWalletCircle`, `TrustWalletSquare` and their `Mono` variants: the current two-part gradient shield on a white container replaces the old `#0A64BC` outline shield.
  - `BitgetWallet`: the 2025 Bitget Wallet logomark (cyan chevron on `#001F29`) replaces a copy of the Bitget exchange mark.
  - `CoinbaseWallet` (+ `Circle`, `Square`): the current gradient "C" ring replaces the old blue square mark.
  - `Brave`: the official gradient lion with its white face replaces a flat `#FF2000` silhouette.
  - `Yoroi`: the flat `#4B63F6` symbol replaces an unofficial gradient.
  - `UniswapWallet`: the official Uniswap app logo (`#F50DB4` on a pale pink rounded tile) replaces `#FF007A` on a square tile.
  - `Enkrypt`: the official purple radial gradient on the E replaces flat `#C54AFF`.
  - `KuCoin`: `#00B47D` replaces `#23AF91`.
  - `Phemex`: the current slanted-bar mark (green to cyan gradient).
  - `Aerodrome`: the current striped swoosh replaces the old sun.
  - `Velodrome`: the official interlocking rings replace third-party artwork.
  - `Ekubo`: the official `#101010` symbol, without the unofficial purple disc. Use `EkuboMono` with a light `color` on dark backgrounds.
  - `Oneinch`: the post-2025 black block with the white 1" sign replaces the red tile.
  - `SushiSwap`: the official blue-to-pink gradient roll replaces flat `#FA52A0`.
  
  Every changed `Mono` variant was rebuilt from the new artwork.

- [#880](https://github.com/derodero24/react-web3-icons/pull/880) [`d5a6de0`](https://github.com/derodero24/react-web3-icons/commit/d5a6de0444976f80182404281238e53b17cddd39) Thanks [@derodero24](https://github.com/derodero24)! - The wallet, exchange and DEX icons that cited only a homepage now cite the official files they were checked against, or say why none could be read ([#834](https://github.com/derodero24/react-web3-icons/issues/834)). Bitfinex, Daedalus, Keplr, Ledger, PancakeSwap, Rainbow, Ready and Trezor match them (Trezor's symbol is drawn inline in the trezor.io header, so that page is cited). Okx matches the layout and corner radius of the checker in OKX's own lockup, whose cells are 1 to 2% taller than wide, and keeps its square cells. For Binance, Bitget, Coinbase, Gate, ImToken, Rabby, Solflare, Tangem and Upbit, the notes record what could not be verified (walled sites, raster-only assets, or official files that differ), and the artwork is unchanged.

- [#864](https://github.com/derodero24/react-web3-icons/pull/864) [`85b9525`](https://github.com/derodero24/react-web3-icons/commit/85b9525d3ee6c127ff53427505461b5fa2484ce5) Thanks [@derodero24](https://github.com/derodero24)! - Refresh more wallet, exchange and DEX artwork from the brands' current official files ([#834](https://github.com/derodero24/react-web3-icons/issues/834)).
  
  - `Kraken`: the symbol from kraken.com's header logo in `#7132F5` replaces `#5841D8`.
  - `Deribit`: deribit.com's official `favicon.svg` in `#0052FF` replaces the teal `#2DAE9A` mark.
  - `Mexc`: the single-colour `#0057FF` M from mexc.com's header logo replaces the two-tone MX-token mark.
  - `Htx`: the official navy `#00003E` and blue `#008CD6` flames from htx.com replace the pale HT-token flame. The mark is now legible on light backgrounds.
  - `Gemini`: the black symbol from gemini.com's header logo replaces the old cyan `#26DDF9` mark. On dark backgrounds, use `GeminiMono` with a light `color`. The manifest's `brandColor` is the app icon's orange, `#ff4809`.
  - `CowProtocol`: the CoW Protocol mark from the CoW DAO brand kit, in `#490072` purple, replaces a third-party `#004293` cow.
  - `SubWallet`: the brand kit's gradient icon (`#61FEC0` to `#0425FE`) replaces an unofficial horizontal gradient.
  - `CryptoCom`: the official Crypto.com App icon (a blue gradient tile with the white hexagon and lion) replaces a flat `#03316C` filled hexagon.
  - `Petra`: the current Petra mark in white on a `#5A3FFF` rounded tile replaces the old coral "P".
  - `Bitstamp`: the current "Bitstamp by Robinhood" B in `#003B2F` replaces the old dark B with a green bar. `BitstampCircle` is the white B on a `#003B2F` disc.
  - `WalletConnect` (+ `Circle`, `Square`): the current sharp-cornered brandmark in `#0988F0` replaces the 2018 rounded mark in `#3396FF`. `WalletConnectCircle` is the official WCT token icon.
  
  Every changed `Mono` variant was rebuilt from the new artwork. `OkxWallet` and `Bybit` only record their sources and verification notes; their artwork is unchanged.

- [#880](https://github.com/derodero24/react-web3-icons/pull/880) [`d5a6de0`](https://github.com/derodero24/react-web3-icons/commit/d5a6de0444976f80182404281238e53b17cddd39) Thanks [@derodero24](https://github.com/derodero24)! - Redraw Zerion from its official brand guidelines (design.zerion.io, linked as Brand Assets from zerion.io). Export names are unchanged.
  
  - `Zerion` / `ZerionMono` are now real variants: the guidelines' standalone Symbol, the current rounded Z in Zerion Digital `#2461ED`, and the same Z in `currentColor`. Before, they were aliases of `ZerionCircle` / `ZerionCircleMono`, so `Zerion`, `ZerionMono` and `<WalletIcon name="zerion" />` change from a disc to the standalone Z. Use `ZerionCircle` / `ZerionCircleMono` for a round icon.
  - `ZerionCircle` and `ZerionSquare` are the guidelines' Icon files: a `#2461ED` disc and a rounded square with the Z knocked out. They replace the earlier sharp Z, which sat on a `#2962EF` → `#255CE5` gradient disc and a `#16161A` square. `ZerionCircleMono` and `ZerionSquareMono` are the same shapes in `currentColor`.
  - The manifest's `brandColor` for Zerion is now `#2461ed` (was `#2962ef`).

## 4.0.0

### Major Changes

- [#739](https://github.com/derodero24/react-web3-icons/pull/739) [`713bd16`](https://github.com/derodero24/react-web3-icons/commit/713bd168a8f811ac064cd0572ad4ea9425b7d02b) Thanks [@derodero24](https://github.com/derodero24)! - Drop Node.js 20 support: `engines.node` is now `>=22.12.0`. Node 20 (Iron) reached end-of-life on 2026-04-30 and the build toolchain (tsdown 0.22 / rolldown 1.0) no longer runs on it. The library itself is plain ESM + React and is unaffected at runtime — this only changes the declared support matrix and the CI test matrix (Node 22 and 24).

- [#734](https://github.com/derodero24/react-web3-icons/pull/734) [`92c5d08`](https://github.com/derodero24/react-web3-icons/commit/92c5d08278d2069905e1402ff6c6c984ca49d03c) Thanks [@derodero24](https://github.com/derodero24)! - Icons are now pure, hook-free components that render in React Server Components without `'use client'`. Breaking changes:

  - **`IconContext` and `IconContextValue` are removed.** Icons no longer read defaults from context (the `useContext` call forced a client boundary). Use font-size scaling (icons default to `1em`) or a small wrapper component to apply shared defaults — see MIGRATION.md.
  - **Internal SVG ids are deterministic** (derived from the component name) instead of `useId`-based. Rendering the same icon twice duplicates those ids with identical definitions; rendering output is otherwise unchanged. Markup snapshots that captured the old ids need regeneration.

### Minor Changes

- [#722](https://github.com/derodero24/react-web3-icons/pull/722) [`9386cf8`](https://github.com/derodero24/react-web3-icons/commit/9386cf8f26378dbd3aba3c635fcaf161cd1ea2bf) Thanks [@derodero24](https://github.com/derodero24)! - Add Orbiter Finance, Synapse, and Socket bridge icons

- [#722](https://github.com/derodero24/react-web3-icons/pull/722) [`9386cf8`](https://github.com/derodero24/react-web3-icons/commit/9386cf8f26378dbd3aba3c635fcaf161cd1ea2bf) Thanks [@derodero24](https://github.com/derodero24)! - Add Eclipse chain icon

- [#722](https://github.com/derodero24/react-web3-icons/pull/722) [`9386cf8`](https://github.com/derodero24/react-web3-icons/commit/9386cf8f26378dbd3aba3c635fcaf161cd1ea2bf) Thanks [@derodero24](https://github.com/derodero24)! - Add Maple Finance and Kamino DeFi protocol icons (restores the remaining icons from [#618](https://github.com/derodero24/react-web3-icons/issues/618), which was lost from develop)

- [#732](https://github.com/derodero24/react-web3-icons/pull/732) [`3227ae8`](https://github.com/derodero24/react-web3-icons/commit/3227ae8499c42a75d532748129cb9ff0b491b2db) Thanks [@derodero24](https://github.com/derodero24)! - Add `react-web3-icons/manifest`: a machine-readable catalog of every icon export (`name`, `category`, `chainId`/`slug`/`ticker` identifiers, `deprecated` flag), plus a plain-JSON variant at `react-web3-icons/manifest.json`. Useful for building icon pickers, search indexes, and docs without importing the component bundles. The manifest is auto-generated and guarded by a sync test.

- [#722](https://github.com/derodero24/react-web3-icons/pull/722) [`9386cf8`](https://github.com/derodero24/react-web3-icons/commit/9386cf8f26378dbd3aba3c635fcaf161cd1ea2bf) Thanks [@derodero24](https://github.com/derodero24)! - Add oracle category with Pyth Network, Band Protocol, API3, and RedStone icons

- [#724](https://github.com/derodero24/react-web3-icons/pull/724) [`b38b435`](https://github.com/derodero24/react-web3-icons/commit/b38b43590ccd9950833120de515ba5f766d47c88) Thanks [@derodero24](https://github.com/derodero24)! - Expose the generated raw SVG files through a `./svg/*` subpath export (`react-web3-icons/svg/<category>/<Name>.svg`). The files were already shipped in the package but were unreachable because the `exports` map blocked the subpath. Also documents bundler and CDN (jsdelivr/unpkg) usage in the README.

- [#722](https://github.com/derodero24/react-web3-icons/pull/722) [`9386cf8`](https://github.com/derodero24/react-web3-icons/commit/9386cf8f26378dbd3aba3c635fcaf161cd1ea2bf) Thanks [@derodero24](https://github.com/derodero24)! - Add Brave, Petra, Uniswap Wallet, and Xverse wallet icons

- [#736](https://github.com/derodero24/react-web3-icons/pull/736) [`542e82c`](https://github.com/derodero24/react-web3-icons/commit/542e82c4987f8905af39449a8e67d8cd68a4455c) Thanks [@derodero24](https://github.com/derodero24)! - Ship IconifyJSON collections: `react-web3-icons/iconify.json` (colored, prefix `web3`) and `react-web3-icons/iconify-mono.json` (`currentColor`, prefix `web3-mono`), generated from the icon source tree and validated with `@iconify/utils`. This makes the full set usable from Vue, Svelte, Web Components, `unplugin-icons`, and the rest of the Iconify ecosystem; ticker and deprecated re-exports are registered as Iconify aliases.

- [#744](https://github.com/derodero24/react-web3-icons/pull/744) [`f1e5966`](https://github.com/derodero24/react-web3-icons/commit/f1e596662bb12a6386e4c0944813f5f4ce4edc1b) Thanks [@derodero24](https://github.com/derodero24)! - Add four missing major chains ([#706](https://github.com/derodero24/react-web3-icons/issues/706) batch 1), all registered in `CHAIN_ID_TO_NAME` / `CHAIN_SLUG_TO_NAME` with native-token coin entries in `TICKER_TO_COIN`:

  - **Cronos** (chain id 25, `CRO`) — re-exports the existing CRO coin mark
  - **Monad** (chain id 143, `MON`) — official logomark from monad.xyz's brand & media kit
  - **Ronin** (chain id 2020, `RON`) — official mark from the wiki.roninchain.com brand kit
  - **Kaia** (chain id 8217, `KAIA`) — official coin symbol from the docs.kaia.io brand asset pack; the legacy `klaytn` slug also resolves

  All chain ids verified against chainlist.org.

- [#737](https://github.com/derodero24/react-web3-icons/pull/737) [`c9d0246`](https://github.com/derodero24/react-web3-icons/commit/c9d0246ae7dd36b3d7d3e6afad7b9ab594fc587a) Thanks [@derodero24](https://github.com/derodero24)! - Enrich the icon manifest: base entries now include `variants` (available export suffixes), `aliases` (extra lowercase search terms, sourced from the icon unit definitions), and `brandColor` (dominant hex color of the colored artwork). The demo app's search aliases now come from the manifest, so library consumers and the icon browser share one source of truth.

- [#748](https://github.com/derodero24/react-web3-icons/pull/748) [`7a02767`](https://github.com/derodero24/react-web3-icons/commit/7a02767f95a58fdb7724a42c2ce5b3d5ac4440e5) Thanks [@derodero24](https://github.com/derodero24)! - Rebuild four monochrome variants to match their colored counterparts (owner-approved proof sheet): `BaseMono` (outline ring → filled circle with bar knockout), `ZecMono` (container restored around the Z), `XmrMono` (corrected undersized footprint), and `PhantomWalletMono` (ghost proportions aligned with the colored mark).

- [#749](https://github.com/derodero24/react-web3-icons/pull/749) [`989f39e`](https://github.com/derodero24/react-web3-icons/commit/989f39eabf9748c5275fb5b5d7955d0c3911a6ca) Thanks [@derodero24](https://github.com/derodero24)! - Rebuild three monochrome variants to match their colored counterparts (owner-approved proof sheet): `EkuboMono` (container restored around the goggles), `OsmosisMono` (abstract half-circle replaced with the potion-orb silhouette), `CakeMono` (bunny face aligned with the colored mark, both eyes restored), and `CoinGeckoMono` (missing head crest added to the existing artwork).

- [#750](https://github.com/derodero24/react-web3-icons/pull/750) [`93955a7`](https://github.com/derodero24/react-web3-icons/commit/93955a79e1a394944b8e65c44e543660c4596f65) Thanks [@derodero24](https://github.com/derodero24)! - Mono redo batch 3 (owner-reviewed): `OptimismMono` now renders the OP Mainnet sun (arc + center diamond) and the **colored `Optimism` artwork is fixed** — a missing `fill-rule="evenodd"` was hiding the sun's red core; `RocketPoolMono` restored from an outline ring to the filled coin with rocket knockout; `StargateMono` rebuilt as petals plus the center star (visible in the colored mark on dark backgrounds); `DeBridge` (colored **and** mono) replaced with the official standalone logomark from debridge.com/brand — the previous artwork was the avatar tile, not the brand mark.

- [#750](https://github.com/derodero24/react-web3-icons/pull/750) [`93955a7`](https://github.com/derodero24/react-web3-icons/commit/93955a79e1a394944b8e65c44e543660c4596f65) Thanks [@derodero24](https://github.com/derodero24)! - Mono redo batch 4 (owner-reviewed): `LiquityMono` rebuilt as the full-circle silhouette with the light wedge knocked out (thin containing ring); `TallyMono` keeps its solid stacked-plane design with the separation strokes halved for a lighter outline. `CamelotMono` gains the sword hilt that extends above the shield (matching the colored mark's dark-background silhouette). `TruffleMono` and `DrizzleMono` were audited against the threshold reference and confirmed already faithful — no artwork change.

- [#741](https://github.com/derodero24/react-web3-icons/pull/741) [`0421a87`](https://github.com/derodero24/react-web3-icons/commit/0421a87130ef488fdd8434e1273e787fb968a2f7) Thanks [@derodero24](https://github.com/derodero24)! - Add native-token coin exports for chains already in the library — `ALGO`, `SEI`, `SUI`, `BERA`, `STRK`, `CELO`, `KAVA`, `ASTR`, `TAIKO` — plus `HYPE` and the Hyperliquid chain entry (EVM chain id 999, HyperEVM). All of them re-export existing artwork (no duplicated SVG paths), so `<CoinIcon symbol="SUI" />`, `<ChainIcon chainId={999} />`, and the corresponding `TICKER_TO_COIN` / `CHAIN_ID_TO_NAME` / `CHAIN_SLUG_TO_NAME` lookups now resolve.

- [#735](https://github.com/derodero24/react-web3-icons/pull/735) [`2e13781`](https://github.com/derodero24/react-web3-icons/commit/2e1378163238184c740c3a228de5743c1f54a58c) Thanks [@derodero24](https://github.com/derodero24)! - Dynamic components (`react-web3-icons/dynamic`) now lazy-load exactly one per-icon chunk per resolved identifier instead of the entire category bundle — with code splitting, rendering `<CoinIcon symbol="ETH" />` downloads a ~7 KB gzip entry plus a small per-icon chunk rather than the ~50 KB category module. The dist output is also unbundled (one module per icon), which improves file-level tree-shaking for all bundlers: a single static icon import now costs ~0.5 KB brotli.

- [#742](https://github.com/derodero24/react-web3-icons/pull/742) [`c36c3dd`](https://github.com/derodero24/react-web3-icons/commit/c36c3ddd892a3be6a1db0f9e43c7c972d4e25f71) Thanks [@derodero24](https://github.com/derodero24)! - Add `Sonic` / `SonicMono` chain icons (EVM chain id 146, slug `sonic`, ticker `S`) from the official Sonic Labs asset, exposed from both the chain and coin subpaths. Following the icon lifecycle policy for the Fantom → Sonic rebrand, `Fantom`, `FantomMono`, `Ftm`, and `FtmMono` still work but are now marked `@deprecated` (pointing at their Sonic replacements) and are listed in `DEPRECATED_ICON_NAMES`; removal will follow the documented policy (a future major, ≥90 days out).

### Patch Changes

- [#720](https://github.com/derodero24/react-web3-icons/pull/720) [`399312c`](https://github.com/derodero24/react-web3-icons/commit/399312c5649d0200be257711b7ab581737452fc9) Thanks [@derodero24](https://github.com/derodero24)! - Fix the `./deprecated` subpath export: its `require` condition pointed to `dist/deprecated.cjs` / `dist/deprecated.d.cts`, which are never produced by the ESM-only build, so `require('react-web3-icons/deprecated')` failed with a missing-file error. The subpath now declares only the ESM entry, consistent with every other subpath.

- [#781](https://github.com/derodero24/react-web3-icons/pull/781) [`66e67c7`](https://github.com/derodero24/react-web3-icons/commit/66e67c77a5d18fdd48b9adb1bfd1462454963d8a) Thanks [@derodero24](https://github.com/derodero24)! - Fix the Iconify collections dropping the fill declared on the source `<svg>` root. About 100 colored icons (e.g. `web3:chain-ton`, `web3:dex-uniswap`, `web3:exchange-binance`) rendered black because their brand colour lived on the root element; bodies are now wrapped in a `<g fill="…">` carrying that value. Mono icons with an explicit `fill="none"` root (stroke-only artwork) are no longer force-filled with `currentColor`.

- [#783](https://github.com/derodero24/react-web3-icons/pull/783) [`292c9b1`](https://github.com/derodero24/react-web3-icons/commit/292c9b13492aa7cefe21c2f48e3a7a4dccaf0909) Thanks [@derodero24](https://github.com/derodero24)! - Fix `ICON_MANIFEST` entries for units whose default export is a local alias (`TrustWallet`, `Zerion`): `variants` now includes `''` and `'Mono'` and `brandColor` is populated. Also refreshes `DeBridge`'s `brandColor` after the artwork replacement.

- [#723](https://github.com/derodero24/react-web3-icons/pull/723) [`e658a7f`](https://github.com/derodero24/react-web3-icons/commit/e658a7ff9fa088accb569e4573b0a22f94f08bde) Thanks [@derodero24](https://github.com/derodero24)! - Fix tree-shaking: annotate every `createIcon` call with `/* @__PURE__ */`. Without the annotation, bundlers had to assume the calls were side-effectful and kept the whole category chunk, so importing a single icon bundled ~55–150 KB. A single-icon import now bundles ~3.3 KB minified (~1.5 KB gzip) in webpack, Rollup, and esbuild. A size-limit scenario and a source-level test now guard the annotation.

- [#733](https://github.com/derodero24/react-web3-icons/pull/733) [`a3353fc`](https://github.com/derodero24/react-web3-icons/commit/a3353fcbc8ea7ccd3ccdc258c7b87a0d793bc6bf) Thanks [@derodero24](https://github.com/derodero24)! - Internal architecture: icons are now generated from an SVG-first source tree (`icons/`) instead of hand-written TSX. Rendered output is verified byte-identical (all snapshots unchanged), so nothing changes for consumers — except the static files under `react-web3-icons/svg/*`, which now ship with clean, stable internal ids instead of render-generated ones.

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
