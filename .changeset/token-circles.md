---
"react-web3-icons": minor
---

Add the official token discs as `Circle` / `CircleMono` variants, built from each project's own token file with its paths unchanged. Each `CircleMono` is the disc in `currentColor` with the mark knocked out. The coin exports re-export them:

- `KavaCircle`, `KavaCircleMono` (chain and coin): the white K on a `#FF433E` disc, from kava.io/branding.
- `MonadCircle`, `MonadCircleMono` (chain and the `MON` coin): the white mark on a `#6E54FF` disc, from Monad's `Token.svg`, with its soft drop shadow.
- `RoninCircle`, `RoninCircleMono` (chain and the `RON` coin): the `#F5F8FC` mark on a `#004DE5` disc, from `Ronin Token/SVG/Ronin-Token.svg` in Ronin's brand kit.
- `SonicCircle`, `SonicCircleMono` (chain and the `S` coin): the `#F5F5F5` mark on a `#141416` disc, from `S/S_token.svg` in Sonic's media kit.
- `TaikoCircle`, `TaikoCircleMono` (chain and coin): the `#FAFAFA` mark on a `#E81899` disc, from the TKO token icon in Taiko's brand kit.
- `JupiterCircle`, `JupiterCircleMono`, re-exported as `JupCircle`, `JupCircleMono`: the six gradient arcs on a `#0F1524` disc, from `JupiterTokens/Token-512x512.svg` in Jupiter's brand kit.
- `LdoCircle`, `LdoCircleMono`: the white Lido mark on the LDO token's own `#FFAA7D` peach disc, from `Lido/Tokens/LDO/LDO.svg` in Lido's press kit. They belong to the `Ldo` coin only; `Ldo` and `LdoMono` still re-export the blue `Lido` mark.
- `BerachainCircle`, `BerachainCircleMono`, re-exported as `BeraCircle`, `BeraCircleMono`: the white outlined bear face on a `#78350F` disc, the BERA token as published in Berachain's own `berachain/guides` repository. On dark backgrounds, `BerachainCircle` is now the legible alternative to the dark `Berachain` mark.

Also, `DexIcon` now accepts the `'Circle'` and `'CircleMono'` variants (Jupiter is the first dex icon with them).

**Visual change: `Hyperliquid` (and `Hype`) is now the official `#97FCE4` blob.** It is `Hyperliquid_Blob_Green.svg` from Hyperliquid's brand kit unchanged, the same blob the app uses for the HYPE token. It was a third-party redraw in `#50D2C1`, slightly wider. `HyperliquidMono` and `HypeMono` follow the new shape, and the manifest brand colour changes from `#50d2c1` to `#97fce4`.

The manifest (`react-web3-icons/manifest`, `dist/manifest.json`) now lists the variants a unit re-exports alongside the ones it draws: `Bnb` and `Ldo` report `['', 'Mono', 'Circle', 'CircleMono']`.
