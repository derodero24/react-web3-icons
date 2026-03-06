---
"react-web3-icons": patch
---

Deduplicate RainbowWallet and RainbowWalletSymbol SVG rendering

Extract a shared internal `RainbowWalletBase` component. Both `RainbowWallet` (defaulting `withBackground` to `true`) and `RainbowWalletSymbol` (defaulting to `false`) now delegate to it, eliminating ~170 lines of duplicated SVG markup with no change to public API or rendering output.
