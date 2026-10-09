# Migrating from v4 to v5

See [CHANGELOG.md](./CHANGELOG.md) for full release notes.

## 1. Per-instance internal SVG ids

v4 gave every instance of an icon the same internal ids (`w3i-<name>-…`), and `url(#…)` always resolves to the first element with an id. A first instance inside a `display: none` subtree, or one with a different `fill` or `color`, therefore broke or restyled the masks and gradients of every later instance.

Icons with internal ids (masks, gradients, clip paths) now call `useId` and render unique ids per instance, e.g. `w3i-ethereumcirclemono-r1-ethc-a`. `useId` works in React Server Components, so icons still need no `'use client'`; icons without internal ids still call no hooks. Mask content also no longer inherits `fill` from the icon's `<svg>`.

- Default rendering is unchanged.
- Markup snapshots that contain icon ids need to be regenerated.
- If you mount several React roots on one page, give each its own `identifierPrefix` (`createRoot(el, { identifierPrefix: 'a-' })`), as for any `useId` consumer.

## 2. Icons with extra props are generated like every other icon

`AvalancheCircle(Mono)`, `Bybit*` and `RainbowWallet(Symbol)` were hand-written and are now generated from `icons/` like the rest, which fixes their drift from the other icons:

- With `title` and `titleId`, they now set `aria-labelledby` like every other icon.
- They are annotated `/* @__PURE__ */`, so importing one export of `Avalanche`, `Bybit` or `RainbowWallet` no longer bundles its siblings.
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

Shapes and colours are unchanged; only the scale and position inside the box change, and the props, `width`/`height` defaults and the `1em` sizing are the same. At the same `size`, icons change size in both directions:

- **Letterboxed, tall, wide or heavily padded marks render larger**, up to about 1.75× (`Tangem` ×1.75, `BackpackWallet` ×1.54, `OKXWallet` and `Api3` ×1.45).
- **Marks that already filled their square viewBox edge to edge render about 12.5% smaller** (×0.875), because bare marks now keep 4 units of padding on each side.
- Containers that already filled their box (most `Circle*` / `Square*` variants) are unchanged.

Seven marks overflowed their old viewBox and were cut off at its edge; they are now shown whole, which makes them render somewhat smaller: `Eclipse`, `Frax`, `Lido`, `SushiSwap`, `Binance`, `Helius` and `RedStone` (and their `Mono` variants, which share their geometry). `WorldChain` keeps its old crop.

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

Deprecated exports are not variants of the dynamic components, so `'Alt'` leaves `WalletVariant`: `<WalletIcon name="metamask" variant="Alt" />` is a type error and renders `fallback`. Omit `variant` instead. Likewise `<WalletIcon name="phantom" variant="SymbolMono" />` renders `fallback` (`'SymbolMono'` stays a `WalletVariant` for `Rainbow`); use `variant="mono"`.

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

`Gram`, `GramMono`, `GramCircle` and `GramCircleMono` (coin, ticker `GRAM`) are new: Gram is the token formerly known as Toncoin (TON), with its own mark from ton.org/media. The `Ton` exports, the logo of The Open Network, are unchanged in `react-web3-icons/chain` and `react-web3-icons/coin`, and the ticker `TON` still resolves to them.

- The lookup keys moved with the brands: `makerdao` resolves to `Sky` (`DefiIcon`), `paraswap` to `Velora` (`DexIcon`), `nami` and `namiwallet` to `Lace` (`WalletIcon`) and `MKR` to `Sky` (`CoinIcon`, `TICKER_TO_COIN`), so they render the new artwork. `sky`, `velora`, `lace`, `SKY` and `GRAM` are new keys.
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

## Checklist

- [ ] Regenerate markup snapshots containing icon defs ids or icon markup (viewBox, path data)
- [ ] Type full `Bybit` props as `IconProps & BybitProps` (or `ComponentProps<typeof Bybit>`)
- [ ] Pass dynamic components only `variant` values of their category (`ChainVariant`, …); others render `fallback`
- [ ] Re-check custom CSS or layout that compensated for the old per-icon viewBoxes
- [ ] Replace the removed exports (`GnosisSafe*`, `Matic*`, `*Light`, `Truffle*`, `Ganache*`, `Drizzle*`, `TofuNft*`) with their replacements (section 9)
- [ ] Optionally rename the deprecated names with the find-and-replace in section 6 (they keep working through v5)
- [ ] Drop `variant="Alt"` from `WalletIcon`, and use `variant="mono"` instead of `variant="SymbolMono"` for Phantom (section 6, duplicate variants)
- [ ] Optionally move from `Tally`, `MakerDao`, `Mkr`, `ParaSwap` and `NamiWallet` to `Cactus`, `Sky`, `Velora` and `Lace` (new artwork, section 7)
- [ ] Expect `fallback` for the lookup keys of defunct projects (`BUSD`, `hopprotocol`, `odos`) and the new Sky, Velora and Lace artwork for `MKR`, `makerdao`, `paraswap`, `nami` and `namiwallet` (sections 7 and 8)
- [ ] Load `react-web3-icons/svg/…/OkxWallet*.svg`, `Starknet*.svg` and `Zksync*.svg` instead of the `OKXWallet*`, `StarkNet*` and `ZkSync*` files

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

Releases after 4.0.0 no longer declare `engines`. What consumers need is an **ES2022** baseline: the published JavaScript is compiled to ES2022 and runs in any browser, bundler, or runtime that supports it, whatever the Node version. Node `^22.18.0 || >=24.11.0` is only required to build the library from source.

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
