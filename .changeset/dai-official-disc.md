---
"react-web3-icons": major
---

`Dai` and `DaiMono` now render Sky's official DAI disc instead of the bare DAI symbol (#836). Sky publishes DAI only as this disc, so the bare `#F5AC37` symbol, which was not an official composition, is gone:

- `Dai`: `app.sky.money/tokens/dai.svg` with its paths unchanged, a `#F5AC37` disc with the `#FEFEFD` mark. A `fill` prop no longer recolours `Dai` (its disc and mark carry their own colours); use `DaiMono` with `color` or `fill` for a single-colour icon.
- `DaiMono`: the disc in `currentColor` with the mark knocked out.
- `DaiCircle` and `DaiCircleMono` are now aliases of `Dai` and `DaiMono`, so `variant="Circle"` keeps working. Their mark used to come from an older artboard and was about 1.5% narrower than the official mark and about 0.5 units (on the 64-unit grid) left of its official position; it now matches the official file.
