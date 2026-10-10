---
"react-web3-icons": patch
---

Redraw Zerion from its official brand guidelines (design.zerion.io, linked as Brand Assets from zerion.io). Export names are unchanged.

- `Zerion` / `ZerionMono` are now real variants: the guidelines' standalone Symbol, the current rounded Z in Zerion Digital `#2461ED`, and the same Z in `currentColor`. Before, they were aliases of `ZerionCircle` / `ZerionCircleMono`, so `Zerion`, `ZerionMono` and `<WalletIcon name="zerion" />` change from a disc to the standalone Z. Use `ZerionCircle` / `ZerionCircleMono` for a round icon.
- `ZerionCircle` and `ZerionSquare` are the guidelines' Icon files: a `#2461ED` disc and a rounded square with the Z knocked out. They replace the earlier sharp Z, which sat on a `#2962EF` → `#255CE5` gradient disc and a `#16161A` square. `ZerionCircleMono` and `ZerionSquareMono` are the same shapes in `currentColor`.
- The manifest's `brandColor` for Zerion is now `#2461ed` (was `#2962ef`).
