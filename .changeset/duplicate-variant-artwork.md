---
"react-web3-icons": minor
---

Stop shipping the same artwork twice under two exports:

- `StarknetCircle` / `StarknetCircleMono` (chain; `StrkCircle` / `StrkCircleMono` in coin) are now the `Starknet` / `StarknetMono` components, and `CeloscanSquare` / `CeloscanSquareMono` (explorer) the `Celoscan` / `CeloscanMono` components. The official Starknet symbol is already a disc and the official Celoscan mark is already the square tile, so each pair drew an identical file. They are not deprecated and render the same artwork as before; `<ChainIcon name="starknet" variant="Circle" />` keeps working. Their internal ids and React DevTools name now carry the default's name (`w3i-starknet-…` instead of `w3i-starknetcircle-…`), and in the Iconify sets `chain-starknet-circle`, `chain-starknet-circle-mono`, `explorer-celoscan-square` and `explorer-celoscan-square-mono` are aliases of the default icons instead of icons of their own.
- `PhantomSymbolMono` is deprecated: since Phantom's default became the standalone ghost, it rendered the same artwork as `PhantomMono`. Use `PhantomMono`; the old name keeps working through v5 and is listed in `DEPRECATED_ICON_NAMES`. The deprecated `PhantomWalletSymbolMono` now points to `PhantomMono` as well. `'SymbolMono'` stays a `WalletVariant` (for `Rainbow`), but `<WalletIcon name="phantom" variant="SymbolMono" />` now renders `fallback`; use `variant="mono"`.
