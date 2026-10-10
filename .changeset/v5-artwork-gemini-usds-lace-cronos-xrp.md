---
"react-web3-icons": minor
---

Add official artwork for Gemini's app icon, USDS, Lace and Cronos, and rebuild `XrpCircle`:

- New `GeminiSquare` / `GeminiSquareMono` (exchange): the official Gemini app icon from gemini.com, the white symbol on a `#FE630C` to `#FF4809` rounded tile. It is the legible Gemini option on dark backgrounds.
- New `Usds` / `UsdsMono` (coin, ticker `USDS`): Sky's official USDS token, the white S on a `#FFD232` to `#FF6D6D` disc, from app.sky.money.
- New `Lace` / `LaceMono` (wallet, slug `lace`): the Lace symbol from lace.io. Lace is Nami's successor: `NamiWallet` / `NamiWalletMono` are deprecated in favour of `Lace` / `LaceMono`, and the keys `nami` and `namiwallet` resolve to `Lace` (`<WalletIcon name="nami" />` renders the Lace symbol, and `WALLET_SLUG_TO_NAME` maps both to `'Lace'`).
- `Cronos` / `CronosMono` (chain) and `Cro` / `CroMono` (coin): visual change. They now use the official Cronos mark from cronos.com, the black C on a `#4CDBFF` square. Before, they used the old Crypto.com lion shield. `Cronos` is now its own artwork, and `Cro` re-exports it. Chain ID 25, slug `cronos` and ticker `CRO` resolve as before.
- `XrpCircle` / `XrpCircleMono`: visual change. They are now the official XRP symbol in white on a `#141414` disc (the XRPL Brand Kit's black), at the standard container size. The mark is larger than before, and the old `#23292F` disc is gone.
