---
"react-web3-icons": major
---

`PhantomSymbolMono` is deprecated: since Phantom's default became the standalone ghost, it rendered the same artwork as `PhantomMono`. Use `PhantomMono`; the old name keeps working through v5 and is listed in `DEPRECATED_ICON_NAMES`. The deprecated `PhantomWalletSymbolMono` now points to `PhantomMono` as well.

- **Breaking:** `<WalletIcon name="phantom" variant="SymbolMono" />` now renders `fallback`; use `variant="mono"`. `'SymbolMono'` stays a `WalletVariant` (for `Rainbow`).
- In the manifest, `PhantomSymbolMono` is marked `deprecated` and `'SymbolMono'` leaves the `variants` of `Phantom`.
- In the Iconify mono set, `wallet-phantom-symbol-mono` is now a hidden alias of `wallet-phantom-mono` instead of a visible icon of its own.
