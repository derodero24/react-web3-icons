---
"react-web3-icons": patch
---

`CoinMarketCap` now renders the bare mark in the official `#17181B` of CoinMarketCap's logo file (`coinmarketcap_1.svg`) instead of `#3861FB`, a colour no official vector of the bare mark uses (#837). The geometry and `CoinMarketCapMono` are unchanged. The manifest `brandColor` stays `#3861fb`, now set explicitly from the site's brand blue. On dark backgrounds, use `CoinMarketCapMono` with a light `color`.
