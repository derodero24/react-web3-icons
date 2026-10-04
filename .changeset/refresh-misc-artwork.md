---
"react-web3-icons": patch
---

Finish the artwork refresh of the defi, devtool, explorer, marketplace, portfolio and tracker categories (#837). Export names are unchanged.

- `Remix` / `RemixMono`: the official Remix logo (the shell mark the IDE draws in its top bar, `#007AA6`) replaces an unrelated black disc with a figure.
- `EthersJs`: the official ethers logo, which Ethers publishes only in white. The off-brand `#24339B` is gone, so the icon is now white and is meant for dark backgrounds; on light backgrounds use `EthersJsMono` with a dark `color`. The path now uses the official even-odd fill (`EthersJsMono` too). The manifest `brandColor` is now `#1D4C7C`, the colour of ethers.org.
- `MagicEden` and `MagicEdenFlat`: the current magiceden.io header mark in the brand colour `#EC136D`. This replaces the retired purple-to-pink gradient (default) and `#E93A88` (Flat), so the two exports now look the same. `MagicEdenMono` takes the header path (no visible change).
- `MagicEdenWordmark` / `MagicEdenWordmarkMono`: the current horizontal header wordmark (`#EC136D` mark, `#24262F` letters) replaces the stacked lockup with the retired gradient. `MagicEdenWordmarkFlat` keeps the stacked lockup, since Magic Eden has no single-colour wordmark.
- Source-only (the artwork already matched the official files): `Bscscan` (+`Inverted`), `Routescan`, `DefiLlama` and `Aragon` now cite the exact official files. `AragonCircle`, `Avascan` and `Zapper` are now documented as non-official or unverified.
