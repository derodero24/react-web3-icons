# Migrating from v4 to v5

See [CHANGELOG.md](./CHANGELOG.md) for full release notes.

## 1. Per-instance internal SVG ids

v4 gave every instance of an icon the same internal ids (`w3i-<name>-…`), and `url(#…)` always resolves to the first element with an id. A first instance inside a `display: none` subtree, or one with a different `fill` or `color`, therefore broke or restyled the masks and gradients of every later instance.

Icons with internal ids (masks, gradients, clip paths) now call `useId` and render unique ids per instance, e.g. `w3i-arbitrumcirclemono-r1-arb-circle-a`. `useId` works in React Server Components, so icons still need no `'use client'`; icons without internal ids still call no hooks. Mask content also no longer inherits `fill` from the icon's `<svg>`.

- Default rendering is unchanged.
- Markup snapshots that contain icon ids need to be regenerated.
- If you mount several React roots on one page, give each its own `identifierPrefix` (`createRoot(el, { identifierPrefix: 'a-' })`), as for any `useId` consumer.

## 2. Icons with extra props are generated like every other icon

`AvalancheCircle(Mono)`, `Bybit*` and `RainbowWallet(Symbol)` (now `Rainbow(Symbol)`, see section 6) were hand-written and are now generated from `icons/` like the rest, which fixes their drift from the other icons:

- With `title` and `titleId`, they now set `aria-labelledby` like every other icon.
- They are annotated `/* @__PURE__ */`, so importing one export of `Avalanche`, `Bybit` or `Rainbow` no longer bundles its siblings.
- `withBackground`, `fill1` and `fill2` render exactly as before for every combination of values.
- **`BybitProps` now holds only the extra props** (`fill1`, `fill2`); it no longer extends `IconProps`. `AvalancheProps` and `RainbowProps` (for `Rainbow`, formerly `RainbowWallet`, see section 6) are now exported the same way.

```diff
- const props: BybitProps = { fill1: '#000', size: 24 };
+ const props: IconProps & BybitProps = { fill1: '#000', size: 24 };
+ // or: ComponentProps<typeof Bybit>
```

- `BybitMono` declares `fill="currentColor"` on its `<svg>` (like every mono icon) instead of on each path. It renders the same, and a CSS `fill` on the icon now reaches the paths.

## 3. Dynamic components render `fallback` when a chunk fails to load

`react-web3-icons/dynamic` components (`ChainIcon`, `CoinIcon`, …) no longer throw to the nearest error boundary when an icon chunk fails to load (network error, deploy skew). They render `fallback` and import the chunk again on a later render. They also forward `ref` to the `<svg>`, show their own names in React DevTools, and render `fallback` instead of throwing for `undefined`/`null` identifiers.

- If you relied on an error boundary to catch failed icon chunks, handle it with `fallback` instead.

## 4. Dynamic components: every variant, stricter `variant`, normalized identifiers

`variant` now accepts every variant suffix the category ships (`<ChainIcon name="ethereum" variant="Circle" />`), typed per category (`ChainVariant`, `CoinVariant`, `WalletVariant`, … from `react-web3-icons/dynamic`). `'colored'` and `'mono'` work as before.

- **An unknown variant renders `fallback`.** In v4, any `variant` other than `'mono'` rendered the colored icon. Now a value the category does not ship, or a variant the resolved icon lacks, renders `fallback` and warns once in development. TypeScript already rejects unknown literals; check values that come from untyped data or casts.

  ```diff
  - <CoinIcon symbol={symbol} variant={theme} />          // 'dark' rendered the colored icon
  + <CoinIcon symbol={symbol} variant={theme === 'dark' ? 'mono' : 'colored'} />
  ```

- **An unknown `chainId` falls back to `name`.** `<ChainIcon chainId={id} name={slug} />` with an ID this package does not know now renders the icon for `name` instead of `fallback`. Pass only `chainId` to keep the old behaviour.
- **Identifiers are normalized in every component**: case-insensitive, ignoring whitespace, `.`, `-` and `_` (`'layer-zero'`, `'Arbitrum Nova'`, `'Crypto.com'`), and manifest aliases and common wallet connector ids (`'phantom'`, `'metaMaskSDK'`, `'okx'`, …) resolve. Inputs that used to render `fallback` may now render an icon.
- **Types:** the `variant` prop of `ChainIconProps`, `CoinIconProps`, … is the category's variant union instead of `'colored' | 'mono'`. Code that copies it into a `'colored' | 'mono'` variable needs the wider type.

## 5. Every icon is drawn on a uniform 64×64 grid

Icons used to keep the viewBox of their source artwork (`0 0 784.37 1277.39` for `Ethereum`, `0 0 266 139` for `Aave`, `152.19 197.21 139.67 48.01` for `Avascan`, …) while rendering into a square `size`×`size` box, so a tall or wide mark was letterboxed and looked smaller than its neighbours. Every icon now has `viewBox="0 0 64 64"` and fills it by one rule:

- a bare mark's longer side spans 56 of the 64 units (87.5%), centred;
- a container (`Circle*` / `Square*` variants, and marks that are themselves a solid disc or square, such as coins and app-icon tiles) fills all 64 units.

The grid changes no shapes or colours, only the scale and position inside the box (sections 10 to 12 cover new artwork that changes an icon's outline), and the props, `width`/`height` defaults and the `1em` sizing are the same. At the same `size`, icons change size in both directions:

- **Letterboxed, tall, wide or heavily padded marks render larger**, up to about 1.75× (`Tangem` ×1.75, `Backpack` (formerly `BackpackWallet`) ×1.54, `OkxWallet` (formerly `OKXWallet`) ×1.45).
- **Marks that already filled their square viewBox edge to edge render about 12.5% smaller** (×0.875), because bare marks now keep 4 units of padding on each side.
- Containers that already filled their box (most `Circle*` / `Square*` variants) are unchanged.

Eight marks overflowed their old viewBox and were cut off at its edge: `Eclipse`, `Frax`, `Lido`, `SushiSwap`, `Binance`, `Helius`, `RedStone` and `WorldChain`. v5 shows every mark whole. `Eclipse`, `Binance` and `Helius` look as before and render somewhat smaller; the other five also have new artwork in v5 (`Frax` and `WorldChain` are in section 12).

- **Regenerate snapshots** that contain icon markup: every `viewBox` and most path data changed.
- **Re-check custom sizing that relied on the old viewBox**, e.g. CSS that set only `width` or `height` and let the other follow the aspect ratio, `preserveAspectRatio` overrides, padding added to even out letterboxed icons, or code reading the `viewBox` attribute. The square viewBox makes such tweaks unnecessary.
- `react-web3-icons/svg/*` files and the Iconify sets (`width`/`height` now 64 for every icon) changed the same way.

## 6. Export names follow one naming rule

Export names now follow the rules in [CONTRIBUTING.md](./CONTRIBUTING.md#export-names) (#815): the project's current official name in PascalCase, acronyms written as words, a category suffix such as `Wallet` only where it is part of the name or avoids a clash, and tickers for coins. The exports below are renamed, or follow a rebrand that kept its artwork.

**The old names keep working through v5.** They are deprecated aliases of the new exports (`@deprecated` JSDoc, listed in `DEPRECATED_ICON_NAMES`), render the same icon, and will be removed in a later major release under the [icon lifecycle policy](./docs/icon-lifecycle.md).

### Rename table

| v4 name (deprecated) | v5 name | Category |
| --- | --- | --- |
| `BinanceSmartChain` | `BnbSmartChain` | chain |
| `BinanceSmartChainMono` | `BnbSmartChainMono` | chain |
| `BinanceSmartChainCircle` | `BnbSmartChainCircle` | chain |
| `BinanceSmartChainSquare` | `BnbSmartChainSquare` | chain |
| `BinanceSmartChainSquareMono` | `BnbSmartChainSquareMono` | chain |
| `BinanceSmartChainCircleMono` | `BnbSmartChainCircleMono` | chain |
| `StarkNet` | `Starknet` | chain |
| `StarkNetMono` | `StarknetMono` | chain |
| `StarkNetCircle` | `StarknetCircle` | chain |
| `StarkNetSquare` | `StarknetSquare` | chain |
| `StarkNetSquareMono` | `StarknetSquareMono` | chain |
| `StarkNetCircleMono` | `StarknetCircleMono` | chain |
| `ImmutableX` | `Immutable` | chain |
| `ImmutableXMono` | `ImmutableMono` | chain |
| `ZkSync` | `Zksync` | chain |
| `ZkSyncMono` | `ZksyncMono` | chain |
| `ZkSyncCircle` | `ZksyncCircle` | chain |
| `ZkSyncSquare` | `ZksyncSquare` | chain |
| `ZkSyncSquareMono` | `ZksyncSquareMono` | chain |
| `ZkSyncCircleMono` | `ZksyncCircleMono` | chain |
| `Gateio` | `Gate` | exchange |
| `GateioMono` | `GateMono` | exchange |
| `Argent` | `Ready` | wallet |
| `ArgentMono` | `ReadyMono` | wallet |
| `BackpackWallet` | `Backpack` | wallet |
| `BackpackWalletMono` | `BackpackMono` | wallet |
| `DaedalusWallet` | `Daedalus` | wallet |
| `DaedalusWalletMono` | `DaedalusMono` | wallet |
| `OKXWallet` | `OkxWallet` | wallet |
| `OKXWalletMono` | `OkxWalletMono` | wallet |
| `PhantomWallet` | `Phantom` | wallet |
| `PhantomWalletMono` | `PhantomMono` | wallet |
| `PhantomWalletCircle` | `PhantomCircle` | wallet |
| `PhantomWalletCircleMono` | `PhantomCircleMono` | wallet |
| `PhantomWalletSquare` | `PhantomSquare` | wallet |
| `PhantomWalletSquareMono` | `PhantomSquareMono` | wallet |
| `PhantomWalletSymbolMono` | `PhantomMono` (see [duplicate variants](#duplicate-variants-are-deprecated)) | wallet |
| `RainbowWallet` | `Rainbow` | wallet |
| `RainbowWalletSymbol` | `RainbowSymbol` | wallet |
| `RainbowWalletCircle` | `RainbowCircle` | wallet |
| `RainbowWalletCircleMono` | `RainbowCircleMono` | wallet |
| `RainbowWalletSquare` | `RainbowSquare` | wallet |
| `RainbowWalletSquareMono` | `RainbowSquareMono` | wallet |
| `RainbowWalletMono` | `RainbowMono` | wallet |
| `RainbowWalletSymbolMono` | `RainbowSymbolMono` | wallet |
| `YoroiWallet` | `Yoroi` | wallet |
| `YoroiWalletMono` | `YoroiMono` | wallet |

`Argent` follows the Argent → Ready rebrand, `Gateio` the Gate.io → Gate rebrand, `BinanceSmartChain` the BNB Smart Chain rename and `ImmutableX` the Immutable X → Immutable rebrand (chain 13371 is Immutable zkEVM); their artwork is the same as the new name's. `ZkSync` follows the acronym rule for the official name ZKsync. `CoinbaseWallet`, `BitgetWallet`, `OkxWallet` and `UniswapWallet` keep `Wallet` because `Coinbase`, `Bitget`, `Okx` and `Uniswap` are other icons.

- The extra-props type of `Rainbow` is `RainbowProps` (`RainbowWalletProps`, new in v5, is gone).
- Renamed icons render their internal ids with the new name (`w3i-phantomsquaremono-…` instead of `w3i-phantomwalletsquaremono-…`), also through the old names. Regenerate markup snapshots that contain them.
- Static files and Iconify icons follow the new names (`react-web3-icons/svg/wallet/Phantom.svg`, `web3:wallet-phantom`). The old names stay available as files and Iconify aliases, except `OKXWallet*`, `StarkNet*` and `ZkSync*`, whose files would differ from the new ones only in letter case: use `OkxWallet*.svg`, `Starknet*.svg` and `Zksync*.svg` (Iconify: `chain-zksync`).
- Lookup keys still resolve, now to the new names: `<WalletIcon name="phantom" />` renders `Phantom`, and `CHAIN_SLUG_TO_NAME.bsc` is `'BnbSmartChain'`. `gate`, `ready`, `bnb-smart-chain`, `gnosis-chain`, `manta-pacific`, `immutable`, `immutable-zkevm` and `eigencloud` (→ `EigenLayer`) are new slugs, and the primary slug (the manifest's `slug`) of a renamed wallet or exchange is its new name (`phantom`, `gate`).

### Quick find-and-replace

Every rename keeps the variant suffix, so one replacement per name covers all variants (`PhantomWalletSquareMono` → `PhantomSquareMono`). The first two lines replace Phantom's duplicate `SymbolMono` (see below) instead:

```
s/\bPhantomWalletSymbolMono\b/PhantomMono/g
s/\bPhantomSymbolMono\b/PhantomMono/g
s/\bPhantomWallet/Phantom/g
s/\bRainbowWallet/Rainbow/g
s/\bBackpackWallet/Backpack/g
s/\bYoroiWallet/Yoroi/g
s/\bDaedalusWallet/Daedalus/g
s/\bOKXWallet/OkxWallet/g
s/\bArgent/Ready/g
s/\bGateio/Gate/g
s/\bStarkNet/Starknet/g
s/\bBinanceSmartChain/BnbSmartChain/g
s/\bImmutableX/Immutable/g
s/\bZkSync/Zksync/g
```

Save these lines as `v5-renames.sed` and run, for example with GNU sed:

```sh
grep -rlE '\b(PhantomWallet|PhantomSymbolMono|RainbowWallet|BackpackWallet|YoroiWallet|DaedalusWallet|OKXWallet|Argent|Gateio|StarkNet|BinanceSmartChain|ImmutableX|ZkSync)' src \
  | xargs sed -i -f v5-renames.sed
```

### Duplicate variants are deprecated

These variants render the same artwork as another export, or legacy artwork with no current official counterpart. They keep working through v5 as deprecated exports:

| Deprecated | Use instead | Category | Why |
| --- | --- | --- | --- |
| `MetaMaskAlt` | `MetaMask` | wallet | MetaMask has a single fox design since its 2024 refresh, so `Alt` rendered the default |
| `PhantomSymbolMono`, `PhantomWalletSymbolMono` | `PhantomMono` | wallet | Phantom's default is the standalone ghost since the 2024 press kit, so `SymbolMono` rendered the same artwork as `Mono` |
| `MagicEdenFlat` | `MagicEden` | marketplace | the current Magic Eden mark is single-colour, so `Flat` rendered the default |
| `MagicEdenWordmarkFlat` | `MagicEdenWordmark`, `MagicEdenWordmarkMono` | marketplace | legacy stacked lockup; Magic Eden has no single-colour wordmark |
| `OpenSeaAlt` | `OpenSea`, `OpenSeaSymbol` | marketplace | pre-2025 white-disc logomark (`#2081E2` ship); the current OpenSea brand has no white-disc asset |
| `ArbitrumOneFlat` | `ArbitrumOne` | chain | the current Arbitrum One logomark is single-colour, so `Flat` now renders the default |
| `ArbitrumOneFlatMono` | `ArbitrumOneMono` | chain | the same, for the mono |
| `ArbitrumNovaFlat` | `ArbitrumNova` | chain | the current Arbitrum Nova logomark is single-colour, so `Flat` now renders the default |
| `ArbitrumNovaFlatMono` | `ArbitrumNovaMono` | chain | the same, for the mono |

Deprecated exports are not variants of the dynamic components, so `'Alt'` is not a `WalletVariant` value and `'Flat'` and `'FlatMono'` are not `ChainVariant` values: `<WalletIcon name="metamask" variant="Alt" />` and `<ChainIcon name="arbitrum-nova" variant="Flat" />` are type errors and render `fallback`. Omit `variant` (or use `'mono'`) instead. Likewise `<WalletIcon name="phantom" variant="SymbolMono" />` renders `fallback` (`'SymbolMono'` stays a `WalletVariant` for `Rainbow`); use `variant="mono"`.

`StarknetCircle`, `StarknetCircleMono`, `CeloscanSquare` and `CeloscanSquareMono` are not deprecated: the official Starknet symbol is already a disc and the Celoscan mark already a square tile, so they are now the same components as `Starknet`, `StarknetMono`, `Celoscan` and `CeloscanMono` and render the same artwork as before. Their markup carries the default's ids (`w3i-starknet-…`), and their Iconify names are aliases of the default icons.

## 7. Rebrands with new artwork

These projects rebranded with a new logo or were folded into a successor. The new export carries the new artwork from the official source; the old export keeps the old artwork and is deprecated:

| Deprecated | Replacement | Category | New artwork |
| --- | --- | --- | --- |
| `Tally`, `TallyMono` | `Cactus`, `CactusMono` | devtool | the Cactus logo served by tally.xyz (Tally became Cactus on 2026-06-17) |
| `MakerDao`, `MakerDaoMono` | `Sky`, `SkyMono`, `SkyCircle`, `SkyCircleMono` | defi | the SKY token file, app.sky.money/tokens/sky.svg |
| `Mkr`, `MkrMono` | `Sky`, `SkyMono`, `SkyCircle`, `SkyCircleMono` | coin | the same, re-exported from defi (MKR upgrades to SKY) |
| `ParaSwap`, `ParaSwapMono` | `Velora`, `VeloraMono` | dex | the Velora brand kit, velora.xyz/brand |
| `NamiWallet`, `NamiWalletMono` | `Lace`, `LaceMono` | wallet | the Lace symbol from lace.io (Nami was folded into Lace) |

`Gram`, `GramMono`, `GramCircle` and `GramCircleMono` (coin, ticker `GRAM`) are new: Gram is the token formerly known as Toncoin (TON), with its own mark from ton.org/media. The `Ton` exports, the logo of The Open Network, are unchanged in `react-web3-icons/chain` and `react-web3-icons/coin`, and the ticker `TON` (new in v5) resolves to them.

- The lookup keys moved with the brands: `makerdao` resolves to `Sky` (`DefiIcon`), `paraswap` to `Velora` (`DexIcon`), `namiwallet` to `Lace` (`WalletIcon`) and `MKR` to `Sky` (`CoinIcon`, `TICKER_TO_COIN`), so they render the new artwork. `sky`, `velora`, `lace`, `nami` (→ `Lace`), `SKY` and `GRAM` are new keys.
- `DefiIcon` gains the `'Circle'` and `'CircleMono'` variants (`DefiVariant`) through `SkyCircle`.

```diff
- import { MakerDao, Mkr, NamiWallet, ParaSwap, Tally } from 'react-web3-icons';
+ import { Cactus, Lace, Sky, Velora } from 'react-web3-icons';
```

## 8. Icons of defunct projects are deprecated

These projects shut down or were discontinued. Their exports still work and render the same artwork, but they are deprecated with no replacement and will be removed in a later major release:

| Deprecated | Category | Reason |
| --- | --- | --- |
| `Busd`, `BusdMono` | coin | Paxos stopped minting BUSD in February 2023, and Binance ended support in December 2023 |
| `Web3Js`, `Web3JsMono` | devtool | ChainSafe sunset web3.js on 2025-03-04 |
| `X2Y2`, `X2Y2Mono` | marketplace | X2Y2 closed its marketplace on 2025-04-30 |
| `NftStorage`, `NftStorageMono` | storage | NFT.Storage Classic uploads were decommissioned on 2024-06-30 |
| `HopProtocol`, `HopProtocolMono` | bridge | Hop's official domain has lapsed |
| `Odos`, `OdosMono` | dex | Odos shut down on 2026-07-30 (odos.xyz shows the shutdown notice) |

Lookup keys may not point at deprecated icons, so the ticker `BUSD` and the slugs `hopprotocol` and `odos` no longer resolve: the dynamic components render `fallback` for them, and the `react-web3-icons/meta` maps no longer list them.

## 9. Removed exports

These exports were deprecated in v2 or v3 and have met the lifecycle policy (at least one minor release and 90 days), so v5 removes them. Importing them is now an error:

| Removed | Use instead | Deprecated since |
| --- | --- | --- |
| `GnosisSafe`, `GnosisSafeMono` | `Safe`, `SafeMono` | 2.0.0 (2026-03-01) |
| `Matic`, `MaticMono`, `MaticCircle`, `MaticCircleMono` | `Pol`, `PolMono`, `PolCircle`, `PolCircleMono` | 2.0.0 (2026-03-01) |
| `EtherscanLight` | `EtherscanInverted` | 3.0.0 (2026-03-10) |
| `BasescanLight` | `BasescanInverted` | 3.0.0 (2026-03-10) |
| `BscscanLight` | `BscscanInverted` | 3.0.0 (2026-03-10) |
| `BybitLight` | `BybitInverted` | 3.0.0 (2026-03-10) |
| `Truffle`, `TruffleMono` | — (ConsenSys sunset Truffle Suite) | 3.1.0 (2026-03-16) |
| `Ganache`, `GanacheMono` | — (ConsenSys sunset Truffle Suite) | 3.1.0 (2026-03-16) |
| `Drizzle`, `DrizzleMono` | — (ConsenSys sunset Truffle Suite) | 3.1.0 (2026-03-16) |
| `TofuNft`, `TofuNftMono` | — (tofunft.com shut down) | 3.1.0 (2026-03-16) |

Their static files (`react-web3-icons/svg/…`) and Iconify icons and aliases are gone too. `Fantom`, `FantomMono`, `Ftm` and `FtmMono` were deprecated in 4.0.0 (2026-09-14), have not met the 90-day window yet, and stay deprecated.

```diff
- import { EtherscanLight, GnosisSafe, Matic } from 'react-web3-icons';
+ import { EtherscanInverted, Pol, Safe } from 'react-web3-icons';
```

## 10. `Zerion` and `TrustWallet` render the standalone mark

The base names of these units were aliases of a container variant. Following the base-name rule (the unsuffixed name is the brand's standalone symbol), they are now the standalone marks from the official sources:

| Export | 4.x | v5 | Container variant |
| --- | --- | --- | --- |
| `Zerion`, `ZerionMono` | aliases of `ZerionCircle`, `ZerionCircleMono` | the standalone Z of Zerion's brand guidelines | `ZerionCircle`, `ZerionCircleMono` |
| `TrustWallet`, `TrustWalletMono` | aliases of `TrustWalletSquare`, `TrustWalletSquareMono` | the standalone shield of trustwallet.com/icon.svg | `TrustWalletSquare`, `TrustWalletSquareMono` |

- `<WalletIcon name="zerion" />` and `<WalletIcon name="trust" />` (and their `variant="mono"`) render the standalone marks too; `variant="Circle"` and `variant="Square"` select the containers.
- The base names are their own components now, so `Zerion !== ZerionCircle` and `TrustWallet !== TrustWalletSquare`.

```diff
- import { TrustWallet, Zerion } from 'react-web3-icons';
+ import { TrustWalletSquare, ZerionCircle } from 'react-web3-icons'; // to keep a container
```

## 11. Base coin icons that now render the official token disc

When a brand publishes its token only as a disc, the base export now renders that disc (the [base icon background rule](./docs/icon-variants.md#base-icon-background-rule)), and the `Circle` exports are aliases of the base, so `variant="Circle"` keeps working. Review screenshots or visual baselines that include these icons:

| Exports | v4 rendered | v5 renders |
| --- | --- | --- |
| `Dai`, `DaiMono` | the bare DAI symbol in `#F5AC37` | Sky's official DAI disc (`#F5AC37` disc, white mark) |
| `DaiCircle`, `DaiCircleMono` | a DAI disc with a slightly narrower, shifted mark | aliases of `Dai`, `DaiMono` |
| `UsdcCircle`, `UsdcCircleMono` | a legacy USDC disc in `#2775CA` | aliases of `Usdc`, `UsdcMono` (Circle's official `#0B53BF` USDC token) |
| `DogeCircle`, `DogeCircleMono` | a slab D on a `#C2A633` disc | aliases of `Doge`, `DogeMono` (the Dogecoin coin of Dogecoin Core) |
| `Op`, `OpMono`, `OpCircle`, `OpCircleMono` | the Optimism chain symbol on a `#FF0420` disc (re-exported from `Optimism`) | the official OP token (`#FAFAF9` letters OP on a `#FF0421` disc); `OpCircle`, `OpCircleMono` are aliases of `Op`, `OpMono` |

There is no export for the bare DAI symbol any more: Sky publishes no stand-alone version of it. A `fill` prop no longer recolours `Dai` (its disc and mark carry their own colours); use `DaiMono` with `color` or `fill` for a single-colour icon.

## 12. Artwork changes that affect layout

Many icons have new artwork from the brand's current official files. Most of these changes are details or colours (see the 5.0.0 entries in [CHANGELOG.md](./CHANGELOG.md)), but in the icons below the outline changed too: a mark lost or gained its disc or tile, or a container changed shape. Check code that relies on an icon's outline, such as a circular crop, a border radius or a background you draw behind a mark, and review screenshots or visual baselines that include these icons. The `Mono` variants changed the same way, and the deprecated old names (section 6) render the same as the new ones. Sections 10 and 11 cover `Zerion`, `TrustWallet`, `Dai`, `UsdcCircle`, `DogeCircle` and `Op`.

### Marks that lost their disc or tile

They are now bare marks with the padding of section 5. Use the container variant named in the table, or draw a background yourself.

| Exports | v4 rendered | v5 renders |
| --- | --- | --- |
| `ArbitrumOne`, `ArbitrumNova` | the white letter on a `#1B4ADD` / `#E57310` disc (the deprecated `ArbitrumOneFlat` and `ArbitrumNovaFlat`: the letter in a ring) | the hexagon logomark, an outline in `#1B4ADD` / `#FF7700` |
| `Band` | a hexagonal B on a `#516BF0` disc | the `#8F8FFF` loop logomark |
| `Berachain`, `Bera` | a white bear and chain links on a `#814625` tile | the `#2C1A16` bear and chain links, more than twice as wide as tall; `BerachainCircle` and `BeraCircle` (new) are the BERA token disc |
| `Bnb` | the white symbol on a `#F0B90B` disc | the `#F0B90B` symbol, re-exported from `BnbSmartChain`; `BnbCircle` keeps the disc |
| `CoinbaseWallet` | a white disc and blue square on a `#0052FF` tile | the C ring in a blue-to-yellow gradient; `CoinbaseWalletCircle` and `CoinbaseWalletSquare` put it on a white disc or tile |
| `Ekubo` | a white mark on a purple-to-black gradient disc | the mark in `#101010` |
| `Mantle`, `Mnt` | white bars on a black disc | white-to-`#00FF93` bars drawn for dark backgrounds; `MantleSquare` and `MntSquare` (new) put them on a `#092C24` square |
| `Phantom` | a white ghost on a purple gradient disc | the `#AB9FF2` ghost; `PhantomCircle` and `PhantomSquare` keep a container, now in `#9886E5` |
| `Remix` | a figure knocked out of a black disc | the Remix logo in `#007AA6`; there is no container variant |
| `Scroll` | the coloured scroll on a `#FFEEDA` square | the scroll in `#0A0A0A` |
| `Socket` | the letters OC in white on a `#7F1FFF` square | the SOCKET symbol in a green-to-blue gradient |
| `Xverse` | a white X on a `#181818` disc | the `#0F0F0F` X with its `#EE7A30` accent |
| `Zksync` | white arrows on a black square | the `#11141A` arrows; `ZksyncCircle` and `ZksyncSquare` keep the black container |

### Marks that are now drawn on a disc or tile

They now fill the whole box like other containers (section 5), so they render larger, and a background you drew behind them is no longer needed.

| Exports | v4 rendered | v5 renders |
| --- | --- | --- |
| `Api3` | the bare `#4B6EFF` triangle | the triangle on a `#1F267B` disc |
| `Atom`, `CosmosHub` | `Atom`: the bare atom; `CosmosHub`: a `#BA3FD9` hexagon | the ATOM token, an atom on a `#2E3148` disc; `CosmosHub` re-exports `Atom` |
| `Bch` | the bare `#58BE92` symbol | the white symbol on a `#0AC18E` disc |
| `BitgetWallet` | the bare `#00F0FF` mark | the `#00F0FF` chevron on a `#001F29` tile |
| `Cronos`, `Cro` | the Crypto.com lion shield in `#2E4B9F` | a black C on a `#4CDBFF` square; `Cro` re-exports `Cronos` |
| `CryptoCom` | a `#03316C` hexagon | the white hexagon outline and lion on a blue gradient tile |
| `Fil` | the bare `#0090FF` f | the white f on a `#0090FF` disc |
| `Frax` | the bare black crosshair | the white crosshair on a black disc with a white ring |
| `Fraxtal` | the black Frax crosshair | a white chain link on a black disc with a thin white rim |
| `Hbar` | the bare black H | the Hedera logomark, an H knocked out of a black disc |
| `Inj` | the bare mark in a blue gradient | the white mark on a `#4D3DFF` disc |
| `Metis` | a bare `#00D8C1` mark | a black head on a `#00D2FF` disc |

### Other outline changes

| Exports | v4 rendered | v5 renders |
| --- | --- | --- |
| `Optimism` | the white glyph on a `#FF0420` disc | the glyph on a full-bleed `#FF0421` square; `OptimismCircle` keeps a disc, and `OptimismSquare` keeps a tile, now with a corner radius of about 6 units instead of 12.8 |
| `Base` | the white circle-with-bar mark on a `#0052FF` disc | Base's square symbol, a full-bleed `#0000FF` square; `BaseCircle` and `BaseSquare` now hold a white square |
| `AvalancheSquare`, `AvalancheSquareMono` | the mark in a white disc on a `#E84142` rounded tile (`AvalancheSquareMono`: a disc with the mark knocked out) | the `#E6212F` mark on a full-bleed `#1D1D1D` square (`AvalancheSquareMono`: that square with the mark knocked out) |
| `PolygonSquare` | the white mark, 46 of 64 units wide, on a `#7B3FE4` tile with a corner radius of 12.8 units | the mark, 28 units wide, on a `#670DE5` tile with a corner radius of 4 units |
| `Oneinch` | the white sign on a `#E82219` tile with rounded corners | the sign on a full-bleed black square |
| `UniswapWallet` | the `#FF007A` unicorn on a `#FFD8EA` square | the `#F50DB4` unicorn on a `#FEF4FF` tile with rounded corners |
| `Wormhole` | a moon and stars drawn in `#C1BBF6` lines | the logomark, a W knocked out of a black disc, at the size of a bare mark |
| `WorldChain` | a clipped glyph | the World logomark, whole; `Wld`, which already showed the whole logomark with a thinner ring, now re-exports it |
| `Stx` | the letters STX in `#7023EB`, a wide mark | the `#141414` Stacks symbol, as tall as it is wide |
| `MagicEdenWordmark`, `MagicEdenWordmarkMono` | the stacked lockup, the mark above the name | the horizontal header wordmark, about nine times as wide as tall, so it fills only a thin band of a square box; the deprecated `MagicEdenWordmarkFlat` keeps the stacked lockup |

### Marks that changed between dark and light

- These are now dark marks on a transparent background, so on a dark page they need a light background, or the `Mono` variant with a light `color`: `Balancer`, `Berachain` / `Bera`, `Celestia` / `Tia`, `CoinMarketCap`, `Ekubo`, `Gemini`, `Near`, `Polkadot` / `Dot`, `Privy`, oracle `Pyth` (section 13), `Scroll`, `Stx`, `TheGraph`, `Xverse` and `Zksync`. In v4 they were coloured, light, or on their own container.
- `GnosisChain` (a green disc in v4), `Sei` (a red gradient disc in v4, now `#600014`) and `Wormhole` are now dark discs with the mark knocked out, so the same applies to them.
- `Dydx` and `Htx` were light marks and are now dark; the new `DydxInverted` and `HtxInverted` are light versions for dark backgrounds.
- `AvalancheSquare` (`#1D1D1D`) and `Oneinch` (black) are now dark containers (red in v4), so on a dark page their edge does not show.
- These are now light and fade on a white page: `Mantle` / `Mnt` (use `MantleSquare`, or `MantleMono` with a dark `color`), `QuickNode` (`#6CFF75`) and `Hyperliquid` / `Hype` (`#97FCE4`).
- `CoinbaseWalletCircle`, `CoinbaseWalletSquare` and `TrustWalletCircle` are now white containers (blue in v4), and `UniswapWallet` is now a near-white `#FEF4FF` tile (a pale pink `#FFD8EA` square in v4), so on a white page their edge does not show.

## 13. Lookup and manifest changes

- **Fantom lookups render Sonic.** `CHAIN_ID_TO_NAME[250]`, `CHAIN_SLUG_TO_NAME.fantom` and `TICKER_TO_COIN.FTM` are now `'Sonic'`, so `<ChainIcon chainId={250} />`, `<ChainIcon name="fantom" />` and `<CoinIcon symbol="FTM" />` render the Sonic mark. The deprecated `Fantom`, `FantomMono`, `Ftm` and `FtmMono` exports still render the Fantom artwork.
- **One `Pyth` component.** `react-web3-icons/coin` now re-exports `Pyth` and `PythMono` from `react-web3-icons/oracle`, so both subpaths export the same component, coloured `#110F23`. In v4 the oracle `Pyth` was `#9945FF` and the coin `Pyth` `#110F24`.
- **Keys for icons v4 already exported.** The tickers `DOT`, `FET`, `HBAR`, `ICP`, `INJ`, `NEAR`, `PEPE`, `STX`, `TIA` and `TON`, the legacy tickers `MATIC` (`Pol`) and `KLAY` (`Kaia`), the chain slug `cronos` and the chain IDs `295` (`Hedera`) and `1776` (`Injective`) rendered `fallback` in v4; they now render their icons.
- **Deprecated manifest entries carry no lookup ids.** In v4 `Fantom` had `chainId: 250` and `slug: 'fantom'`, and `Ftm` had `ticker: 'FTM'`; in v5 no deprecated entry has a `chainId`, `slug` or `ticker`, and `Fantom`'s search alias `ftm` moved to `Sonic`. The old names of renamed exports (section 6) are alias entries with only `name`, `category` and `deprecated`; read the other fields from the new name's entry (`BnbSmartChain` has `chainId: 56`).
- **Entries that became re-exports carry no `variants` or `brandColor`.** An entry that only re-exports another icon, with no variants of its own, has neither field. In v5 this newly applies to coin `Bnb`, `Cro`, `Ena`, `Hbar`, `Pyth`, `Stx`, `Tia` and `Wld`, chain `CosmosHub`, defi `SafeProtocol`, explorer `Arbiscan` and wallet `OkxWallet` (`OKXWallet` in v4); read these fields from the icon they re-export (chain `BnbSmartChain`, chain `Cronos`, defi `Ethena`, chain `Hedera`, oracle `Pyth`, chain `Stacks`, chain `Celestia`, chain `WorldChain`, coin `Atom`, wallet `Safe`, chain `Arbitrum` and exchange `Okx`). The reverse also happened: chain `Cronos` and coin `Op` were re-exports in v4 and now have their own artwork, and coin `Ldo` still re-exports `Lido` but adds its own `Circle` variants. These three now have `variants` and `brandColor` (`Ldo` has Lido's `#0085ff`).
- **`brandColor` follows a new rule.** v4 took the most frequent colour value of the colored artwork other than white, which for badge-style marks was often the dark container. v5 counts greys, near-black and near-white only when the artwork has no other colour, and some icons carry a curated value. Together with the new artwork, this changes many values, for example chain `Kaia` `#040404` → `#bff009`, wallet `Xverse` `#181818` → `#ee7a30` and oracle `Pyth` `#9945ff` → `#7142cf`. If you stored `brandColor` values, read them again from `react-web3-icons/manifest` or `react-web3-icons/manifest.json`.

## Checklist

- [ ] Regenerate markup snapshots containing icon defs ids or icon markup (viewBox, path data)
- [ ] Type full `Bybit` props as `IconProps & BybitProps` (or `ComponentProps<typeof Bybit>`)
- [ ] Pass dynamic components only `variant` values of their category (`ChainVariant`, …); others render `fallback`
- [ ] Re-check custom CSS or layout that compensated for the old per-icon viewBoxes
- [ ] Replace the removed exports (`GnosisSafe*`, `Matic*`, `*Light`, `Truffle*`, `Ganache*`, `Drizzle*`, `TofuNft*`) with their replacements (section 9)
- [ ] Optionally rename the deprecated names with the find-and-replace in section 6 (they keep working through v5)
- [ ] Drop `variant="Alt"` from `WalletIcon` and `variant="Flat"` / `"FlatMono"` from `ChainIcon`, and use `variant="mono"` instead of `variant="SymbolMono"` for Phantom; optionally replace `ArbitrumOneFlat*` and `ArbitrumNovaFlat*` with `ArbitrumOne*` and `ArbitrumNova*` (section 6, duplicate variants)
- [ ] Optionally move from `Tally`, `MakerDao`, `Mkr`, `ParaSwap` and `NamiWallet` to `Cactus`, `Sky`, `Velora` and `Lace` (new artwork, section 7)
- [ ] Expect `fallback` for the lookup keys of defunct projects (`BUSD`, `hopprotocol`, `odos`, …) and the new Sky, Velora and Lace artwork for `MKR`, `makerdao`, `paraswap`, `nami` and `namiwallet` (sections 7 and 8)
- [ ] Load `react-web3-icons/svg/…/OkxWallet*.svg`, `Starknet*.svg` and `Zksync*.svg` instead of the `OKXWallet*`, `StarkNet*` and `ZkSync*` files
- [ ] Use `ZerionCircle` / `TrustWalletSquare` (and their `Mono` variants) where you relied on `Zerion` / `TrustWallet` rendering a container (section 10)
- [ ] Expect the DAI disc from `Dai` / `DaiMono`, and review visual baselines of the icons in section 11
- [ ] Review layouts, backgrounds and visual baselines for the icons in section 12 (for example code that assumed a round `Optimism`, `Base` or `Bnb`, or a container around `Phantom`, `Zksync` or `Mantle`), and check that the marks that are now dark or light still show on your background
- [ ] Expect Sonic for chain 250, `fantom` and `FTM`, and the `#110F23` `Pyth`; read stored `brandColor` values again, and take `variants` and `brandColor` of re-exported icons from the icon they re-export (section 13)

---

# Migrating from v3 to v4

v4 makes every static icon a pure, hook-free component so icons render in React Server Components without `'use client'`. See [CHANGELOG.md](./CHANGELOG.md) for full release notes.

## 1. `IconContext` removed

Icons no longer read defaults from context (`useContext` prevented server rendering). The `IconContext` export and `IconContextValue` type are gone.

Migration options, depending on what you used it for:

```diff
- <IconContext.Provider value={{ size: 32 }}>
-   <Ethereum />
-   <Bitcoin />
- </IconContext.Provider>
+ {/* Icons default to 1em — font-size scales them together */}
+ <div style={{ fontSize: 32 }}>
+   <Ethereum />
+   <Bitcoin />
+ </div>
```

For `className`/`style`/other defaults, wrap the icons you use once, at module scope:

```tsx
import { type ComponentType, forwardRef, type RefAttributes } from 'react';
import { Bitcoin, Ethereum, type IconProps } from 'react-web3-icons';

type IconComponent = ComponentType<Omit<IconProps, 'ref'> & RefAttributes<SVGSVGElement>>;

// Call at module scope, never inside a component: each call creates a new
// component type, and React remounts the icon whenever the type changes.
function withDefaults(Icon: IconComponent, defaults: Omit<IconProps, 'ref'>) {
  const WithDefaults = forwardRef<SVGSVGElement, Omit<IconProps, 'ref'>>((props, ref) => (
    <Icon {...defaults} {...props} ref={ref} />
  ));
  WithDefaults.displayName = `WithDefaults(${Icon.displayName ?? 'Icon'})`;
  return WithDefaults;
}

export const AppEthereum = withDefaults(Ethereum, { size: 32, className: 'my-icon' });
export const AppBitcoin = withDefaults(Bitcoin, { size: 32, className: 'my-icon' });
```

`forwardRef` keeps `ref` working on React 18 as well as 19. Props passed at the call site override the defaults; unlike `IconContext`, `style` is replaced rather than merged.

## 2. Deterministic internal SVG ids

Internal `id` attributes (masks, gradients) previously used React's `useId` and changed between renders. They are now stable, derived from the component name (e.g. `w3i-ethereumcirclemono-…`).

- Rendering the same icon multiple times on one page duplicates those ids. The duplicate definitions are identical, so icons render correctly — but if your tooling requires globally unique DOM ids, render such icons once and reuse via CSS.
- Markup snapshots that captured the old `useId`-based values need to be regenerated.

## 3. Node.js 20 support dropped (4.0.0 only)

4.0.0 declares `engines.node` `>=22.12.0`. Node 20 reached end-of-life on 2026-04-30. This only affects the declared support matrix — the published files are plain ESM and unchanged — but package managers will warn (or fail, with `engine-strict`) when installing 4.0.0 on Node 20. That check ran even for apps that only use the package in a browser bundle, because it is tied to the Node version running the install.

Releases after 4.0.0 no longer declare `engines`. What consumers need is an **ES2022** baseline: the published JavaScript is compiled to ES2022 and runs in any browser, bundler, or runtime that supports it, whatever the Node version. Only building the library from source needs a specific Node version (see the [prerequisites in CONTRIBUTING.md](./CONTRIBUTING.md#prerequisites)).

## 4. Artwork changes to existing icons

No export was renamed, but some existing icons look different in 4.0.0. Review them if you depend on their exact appearance (screenshots, visual-regression baselines, design files):

- **`Optimism`** (and its coin alias `Op`): a missing `fill-rule="evenodd"` hid the red core of the OP Mainnet sun; it is now visible.
- **`DeBridge`** and **`DeBridgeMono`**: replaced with the official standalone logomark from [debridge.com/brand](https://debridge.com/brand). The previous artwork was the avatar tile.
- **Mono variants redrawn to match their colored counterparts**: `BaseMono`, `CakeMono`, `CamelotMono`, `CoinGeckoMono`, `EkuboMono`, `LiquityMono`, `OptimismMono` (and `OpMono`), `OsmosisMono`, `PhantomWalletMono`, `RocketPoolMono`, `StargateMono`, `TallyMono`, `XmrMono`, `ZecMono`.

See the 4.0.0 entries in [CHANGELOG.md](./CHANGELOG.md) for what changed in each.

## 5. Fantom deprecated in favor of Sonic

Fantom Opera was succeeded by Sonic (FTM was upgraded 1:1 to S), so 4.0.0 adds `Sonic` / `SonicMono` (exported from both `react-web3-icons/chain` and `react-web3-icons/coin`) and deprecates the Fantom exports, following the [icon lifecycle policy](./docs/icon-lifecycle.md):

| Deprecated | Replacement |
| --- | --- |
| `Fantom` (chain) | `Sonic` |
| `FantomMono` (chain) | `SonicMono` |
| `Ftm` (coin) | `Sonic` |
| `FtmMono` (coin) | `SonicMono` |

The deprecated exports still work and render the Fantom artwork, but they carry `@deprecated` JSDoc and are listed in `DEPRECATED_ICON_NAMES`. They will be removed in a future major release.

```diff
- import { Fantom, Ftm } from 'react-web3-icons';
+ import { Sonic } from 'react-web3-icons';
```

## Checklist

- [ ] Replace `IconContext.Provider` usages (font-size wrapper or explicit props)
- [ ] Remove `IconContextValue` type imports
- [ ] Regenerate any markup snapshots containing icon defs ids
- [ ] Only if you install 4.0.0 exactly with `engine-strict`: run Node 22.12+ (later 4.x releases drop `engines`)
- [ ] Review screenshots or visual baselines that include the icons listed in section 4
- [ ] Optionally replace `Fantom` / `FantomMono` / `Ftm` / `FtmMono` with `Sonic` / `SonicMono`

---

# Migrating from v2 to v3

This guide covers all breaking changes in v3. See [CHANGELOG.md](./CHANGELOG.md) for the full release notes.

## 1. ESM only — CommonJS dropped

v3 ships ESM exclusively (`.mjs` / `.d.mts`). If you used `require()`:

```diff
- const { Ethereum } = require('react-web3-icons');
+ import { Ethereum } from 'react-web3-icons';
```

All modern bundlers (Vite, Webpack 5, Next.js) and Node.js 20+ support ESM natively. No import paths or API surface changed beyond the renames below.

## 2. Renamed exports — numeric suffixes replaced

Most `Foo2` / `Foo3` / `Foo4` exports are renamed to a descriptive suffix. A few are removed entirely (see [section 4](#4-removed-exports)). Either way, the old numbered names **no longer exist** and will cause import errors.

### Rename table

| v2 name | v3 name |
| --- | --- |
| `Algorand2` | `AlgorandCircle` |
| `Arbitrum2` | `ArbitrumCircle` |
| `ArbitrumMono2` | `ArbitrumCircleMono` |
| `ArbitrumOne2` | `ArbitrumOneFlat` |
| `ArbitrumOneMono2` | `ArbitrumOneFlatMono` |
| `ArbitrumNova2` | `ArbitrumNovaFlat` |
| `ArbitrumNovaMono2` | `ArbitrumNovaFlatMono` |
| `Avalanche2` | `AvalancheCircle` |
| `AvalancheMono2` | `AvalancheCircleMono` |
| `Bitcoin2` | `BitcoinCircle` |
| `BitcoinMono2` | `BitcoinCircleMono` |
| `Cardano2` | `CardanoCircle` |
| `CardanoMono2` | `CardanoCircleMono` |
| `Polygon2` | `PolygonCircle` |
| `PolygonMono2` | `PolygonCircleMono` |
| `Ada2` | `AdaCircle` |
| `AdaMono2` | `AdaCircleMono` |
| `Arb2` | `ArbCircle` |
| `ArbMono2` | `ArbCircleMono` |
| `Avax2` | `AvaxCircle` |
| `AvaxMono2` | `AvaxCircleMono` |
| `Btc2` | `BtcCircle` |
| `BtcMono2` | `BtcCircleMono` |
| `Dai2` | `DaiCircle` |
| `DaiMono2` | `DaiCircleMono` |
| `Looks2` | `LooksAlt` |
| `Pol2` | `PolCircle` |
| `PolMono2` | `PolCircleMono` |
| `Xrp2` | `XrpCircle` |
| `XrpMono2` | `XrpCircleMono` |
| `Aragon2` | `AragonCircle` |
| `AragonMono2` | `AragonCircleMono` |
| `Dydx2` | `DydxSquare` |
| `DydxMono2` | `DydxSquareMono` |
| `Ens2` | `EnsCircle` |
| `EnsMono2` | `EnsCircleMono` |
| `Bitstamp2` | `BitstampCircle` |
| `BitstampMono2` | `BitstampCircleMono` |
| `Bybit2` | `BybitInverted` |
| `Coinbase2` | `CoinbaseCircle` |
| `Coinbase3` | `CoinbaseCircleAlt` |
| `CoinbaseMono2` | `CoinbaseCircleMono` |
| `Etherscan2` | `EtherscanInverted` |
| `Bscscan2` | `BscscanInverted` |
| `Avascan2` | `AvascanWordmark` |
| `AvascanMono2` | `AvascanWordmarkMono` |
| `LooksRare2` | `LooksRareFlat` |
| `MagicEden2` | `MagicEdenWordmark` |
| `MagicEden3` | `MagicEdenFlat` |
| `MagicEden4` | `MagicEdenWordmarkFlat` |
| `MagicEdenMono2` | `MagicEdenWordmarkMono` |
| `OpenSea2` | `OpenSeaAlt` |
| `OpenSeaMono2` | `OpenSeaSymbolMono` |
| `Coinpanda2` | `CoinpandaCircle` |
| `Coinpanda3` | `CoinpandaSquare` |
| `CoinpandaMono2` | `CoinpandaCircleMono` |
| `CoinpandaMono3` | `CoinpandaSquareMono` |
| `MetaMask2` | `MetaMaskAlt` |
| `PhantomWalletMono2` | `PhantomWalletSymbolMono` |
| `RainbowWallet2` | `RainbowWalletSymbol` |
| `TrustWallet2` | `TrustWalletCircle` |
| `TrustWalletMono2` | `TrustWalletCircleMono` |
| `Zerion2` | `ZerionCircle` |
| `ZerionMono2` | `ZerionCircleMono` |

### Quick find-and-replace

For most projects, a regex replace across your source files handles the bulk of renames:

```
# Circle variants (most common)
s/Algorand2/AlgorandCircle/g
s/Arbitrum2/ArbitrumCircle/g
s/Bitcoin2/BitcoinCircle/g
# ... etc. — use the table above
```

## 3. Swapped base names

For some icons, the **base (unsuffixed) name now points to a different variant**. In v2, the base name was often the circle variant. In v3, the base name is typically the standalone symbol (icons whose official brand mark includes an integral background — such as OpenSea, ZkSync, or Scroll — retain that background as the base).

If you relied on `Bitcoin` being the orange circle, you need `BitcoinCircle` now:

```diff
- <Bitcoin />       {/* v2: orange circle — v3: standalone ₿ symbol */}
+ <BitcoinCircle /> {/* v3: orange circle */}
```

All swapped icons:

| v2 base name rendered | v3 equivalent |
| --- | --- |
| `Bitcoin` (circle) | `BitcoinCircle` |
| `Avalanche` (circle) | `AvalancheCircle` |
| `Dai` (circle) | `DaiCircle` |
| `Coinbase` (circle) | `CoinbaseCircle` |
| `MagicEden` (wordmark) | `MagicEdenWordmark` |
| `Avascan` (wordmark) | `AvascanWordmark` |

Coin aliases follow the same pattern: `Btc` (was circle) is now standalone, use `BtcCircle` for the circle.

## 4. Removed exports

These numbered variants are removed. Use the base name instead:

- `GnosisSafe2` — use `Safe` (identical component; `GnosisSafe` also works but is deprecated)
- `GnosisSafeMono2` — use `SafeMono` (identical component; `GnosisSafeMono` also works but is deprecated)

```diff
- import { GnosisSafe2 } from 'react-web3-icons';
+ import { Safe } from 'react-web3-icons';
```

## 5. Deprecated re-exports (still work, will be removed later)

These old names continue to work in v3 as re-exports, but emit TypeScript `@deprecated` warnings. Update at your convenience — they will be removed in a future major release.

| Deprecated name | Replacement |
| --- | --- |
| `EtherscanLight` | `EtherscanInverted` |
| `BasescanLight` | `BasescanInverted` |
| `BscscanLight` | `BscscanInverted` |
| `BybitLight` | `BybitInverted` |
| `Matic` | `Pol` |
| `MaticCircle` | `PolCircle` |
| `MaticMono` | `PolMono` |
| `MaticCircleMono` | `PolCircleMono` |
| `GnosisSafe` | `Safe` |
| `GnosisSafeMono` | `SafeMono` |

```diff
- import { EtherscanLight, Matic } from 'react-web3-icons';
+ import { EtherscanInverted, Pol } from 'react-web3-icons';
```

## Checklist

1. Replace all `require('react-web3-icons')` with `import`
2. Rename numbered variants using the table in section 2
3. Check if you use any swapped base names (section 3) — update if you expected the circle/wordmark variant
4. Replace `GnosisSafe2` / `GnosisSafeMono2` with `Safe` / `SafeMono`
5. Optionally update deprecated names (section 5) to avoid future breakage
