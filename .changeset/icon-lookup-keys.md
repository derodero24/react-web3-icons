---
"react-web3-icons": minor
---

Every icon of a dynamic category is now reachable through `react-web3-icons/meta` and the dynamic components.

- **New lookup keys.** `TICKER_TO_COIN` (and `<CoinIcon symbol>`) gains `DOT`, `FET`, `HBAR`, `ICP`, `INJ`, `NEAR`, `PEPE`, `STX`, `TIA` and `TON`, which used to render the fallback although the coins were exported; `CHAIN_SLUG_TO_NAME` (and `<ChainIcon name>`) gains `cronos`. The `ChainSlug` and `Ticker` types widen accordingly.
- **Fantom / FTM now resolve to Sonic.** `Fantom`, `FantomMono`, `Ftm` and `FtmMono` were deprecated in 4.0.0 because Fantom Opera was succeeded by Sonic (FTM upgraded 1:1 to S), yet the meta maps still pointed at them. `CHAIN_ID_TO_NAME[250]` and `CHAIN_SLUG_TO_NAME.fantom` are now `'Sonic'` and `TICKER_TO_COIN.FTM` is the coin `'Sonic'`, so `<ChainIcon chainId={250} />`, `<ChainIcon name="fantom" />` and `<CoinIcon symbol="FTM" />` render the Sonic mark, and removing the deprecated exports in a future major will not change these lookups. The deprecated exports themselves are unchanged; in the manifest they no longer carry `chainId` / `slug` / `ticker`. Lookup keys can no longer point at deprecated exports.
- **One source for icon data.** The meta maps, `DEPRECATED_ICON_NAMES`, the manifest and the dynamic import maps are now generated together from the icon definitions, so they can no longer drift apart. Map names, key types and existing entries are unchanged. `DEPRECATED_ICON_NAMES` is now typed `ReadonlySet<IconName>` (iterating it yields icon names); `has()` still accepts any string.
