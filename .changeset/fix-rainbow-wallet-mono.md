---
"react-web3-icons": patch
---

fix(wallet): RainbowWalletMono now renders with background matching RainbowWallet

Previously, `RainbowWalletMono` and `RainbowWalletSymbolMono` were identical — both rendered only the arc symbol with viewBox `20 20 80 80`. `RainbowWalletMono` now correctly mirrors the full `RainbowWallet` icon (viewBox `0 0 120 120`) using a solid background with the arc paths cut out via mask.
