---
"react-web3-icons": minor
---

Every icon of a dynamic category is now reachable through `react-web3-icons/meta` and the dynamic components.

- **New lookup keys.** `TICKER_TO_COIN` (and `<CoinIcon symbol>`) gains `DOT`, `FET`, `HBAR`, `ICP`, `INJ`, `NEAR`, `PEPE`, `STX`, `TIA` and `TON`, which used to render the fallback although the coins were exported; `CHAIN_SLUG_TO_NAME` (and `<ChainIcon name>`) gains `cronos`. The `ChainSlug` and `Ticker` types widen accordingly.
- **One source for icon data.** The meta maps, `DEPRECATED_ICON_NAMES`, the manifest and the dynamic import maps are now generated together from the icon definitions, so they can no longer drift apart. Map names, key types and existing entries are unchanged. `DEPRECATED_ICON_NAMES` is now typed `ReadonlySet<IconName>` (iterating it yields icon names); `has()` still accepts any string.
