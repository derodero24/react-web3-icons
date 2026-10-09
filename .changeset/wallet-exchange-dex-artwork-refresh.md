---
"react-web3-icons": patch
---

Replace four wallet and DEX icons whose artwork differed from the brands' current official files (#834). Export names are unchanged.

- `Uniswap` / `UniswapMono` (and `Uni` / `UniMono`, which re-export them): the current `#F50DB4` unicorn from Uniswap's official brand assets replaces the earlier, thinner unicorn in `#FF007A`. The mono is the official one-colour icon. The manifest's `brandColor` is now `#f50db4` (was `#ff007a`).
- `Backpack` / `BackpackMono`: the symbol from Backpack's media kit page, the same backpack with rounder corners, including the tips of the handle.
- `Exodus` / `ExodusMono`: exodus.com's official icon.svg. The old copy was stretched 1.8% horizontally.
- `Safe`: the official safe-icon.svg in `#1A1A1A` (was `#000`). `SafeMono` is unchanged in shape. The manifest's `brandColor` is now `#1a1a1a` (was `#000000`).
