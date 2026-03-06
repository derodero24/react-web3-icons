---
"react-web3-icons": patch
---

Fix CollabLand colors and resolve SVG structural quality issues

- CollabLand: update fill colors to match official brand-kit (`#1F0061`, `#F6C349`)
- CollabLand: move `<defs>` before referencing elements in both base and mono variants
- CollabLandMono: remove extraneous `stroke`/`strokeWidth`/`strokeMiterlimit` from mouth path
- BitstampCircleMono: move `<defs>` before masked `<path>`
- PolkadotJsMono: move `<defs>` before masked `<circle>`
- Kraken: remove `h0 0` no-op path artifact
- KuCoin: remove `h0` no-op path artifact
- Safe: remove dead `paintOrder="stroke"` attribute (no stroke defined)
