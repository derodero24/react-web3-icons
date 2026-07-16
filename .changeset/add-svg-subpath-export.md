---
'react-web3-icons': minor
---

Expose the generated raw SVG files through a `./svg/*` subpath export (`react-web3-icons/svg/<category>/<Name>.svg`). The files were already shipped in the package but were unreachable because the `exports` map blocked the subpath. Also documents bundler and CDN (jsdelivr/unpkg) usage in the README.
