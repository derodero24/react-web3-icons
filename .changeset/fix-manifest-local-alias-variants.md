---
"react-web3-icons": patch
---

Fix `ICON_MANIFEST` entries for units whose default export is a local alias (`TrustWallet`, `Zerion`): `variants` now includes `''` and `'Mono'` and `brandColor` is populated. Also refreshes `DeBridge`'s `brandColor` after the artwork replacement.
