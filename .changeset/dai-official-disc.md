---
"react-web3-icons": major
---

`Dai` and `DaiMono` now render Sky's official DAI disc instead of the bare DAI symbol (#836). Sky publishes DAI only as this disc, so the bare `#F5AC37` symbol, which was not an official composition, is gone:

- `Dai`: `app.sky.money/tokens/dai.svg` with its paths unchanged, a `#F5AC37` disc with the `#FEFEFD` mark.
- `DaiMono`: the disc in `currentColor` with the mark knocked out.
- `DaiCircle` and `DaiCircleMono` are now aliases of `Dai` and `DaiMono`, so `variant="Circle"` keeps working. Their mark used to come from an older artboard and was about 1.5% narrower than the official one and about half a unit left of centre; it now matches the official file.
