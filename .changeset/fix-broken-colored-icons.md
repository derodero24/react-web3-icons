---
"react-web3-icons": patch
---

Fix colored icons that rendered wrong, using the brands' official artwork:

- `Pendle`: the white circle disappeared on light backgrounds. It is now the official light-background mark (circle `#DEDEDE`, ball `#1E4480`).
- `OptimismCircle`, `OptimismSquare` and their `Mono` variants: the centre sparkle is cut out, as in the official OP Mainnet symbol. The first two filled it white, and the masks of the Mono variants knocked it out instead of keeping it as ink.
- `Dydx` / `DydxMono`: `Dydx` was white on transparent and invisible on light backgrounds. It is now dYdX's official light-theme logomark (dark strokes with the `#6966FF` accent). Use `DydxInverted` or `DydxSquare` on dark backgrounds.
