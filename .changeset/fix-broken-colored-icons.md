---
"react-web3-icons": patch
---

Fix four colored icons that rendered wrong, using the brands' official artwork:

- `Lido` / `LidoMono`: the drop was clipped into a mangled shape. It now uses the paths of Lido's official favicon (flat `#00A3FF` facets), and the mono is the drop's silhouette.
- `Pendle` / `PendleMono`: the white circle disappeared on light backgrounds. `Pendle` is now the official light-background mark (circle `#DEDEDE`, ball `#1E4480`). `PendleMono` follows Pendle's official one-colour logo: the circle at half opacity behind the ball and stick.
- `OptimismCircle`, `OptimismSquare` and their `Mono` variants: the centre sparkle is cut out, as in the official OP Mainnet symbol. The first two filled it white, and the masks of the Mono variants knocked it out instead of keeping it as ink.
- `Dydx` / `DydxMono`: `Dydx` was white on transparent and invisible on light backgrounds. It is now dYdX's official light-theme logomark (dark strokes with the `#6966FF` accent). Use `DydxSquare` on dark backgrounds.
