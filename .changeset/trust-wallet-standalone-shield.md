---
"react-web3-icons": patch
---

`TrustWallet` / `TrustWalletMono` are now the standalone two-part shield of trustwallet.com/icon.svg, without the white tile. Before, they were aliases of `TrustWalletSquare` / `TrustWalletSquareMono`, so `TrustWallet`, `TrustWalletMono` and `<WalletIcon name="trust" />` change from the shield on a white tile to the bare shield. `TrustWalletMono` is the shield silhouette with a gap where the two halves meet. Use `TrustWalletSquare` / `TrustWalletSquareMono` for the previous look. The manifest variants are unchanged; the `brandColor` is now `#0500ff` (was `#0a64bc`), the blue of the current shield.
