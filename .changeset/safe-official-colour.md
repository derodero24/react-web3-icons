---
"react-web3-icons": patch
---

`Safe` (wallet) and `SafeProtocol` (defi) now render the official `#1A1A1A` of safe.global's own mark, `safe-icon.svg`, instead of `#000`; the geometry is unchanged, and `SafeMono` / `SafeProtocolMono` are unchanged (#837). The two units drew the same artwork, so `SafeProtocol` and `SafeProtocolMono` now re-export `Safe` and `SafeMono` instead of keeping a second copy. The slug `safeprotocol` still resolves through `DefiIcon`. As with other re-exports (`CosmosHub`), the manifest's `SafeProtocol` entry takes its `brandColor` from `Safe`, and the Iconify icon `defi-safe-protocol` becomes an alias of `wallet-safe`; `react-web3-icons/svg/defi/SafeProtocol.svg` is still shipped. The `brandColor` of `Safe` and `SafeProtocol` is now `#1a1a1a`.
