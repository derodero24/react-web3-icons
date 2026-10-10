---
"react-web3-icons": patch
---

The type declarations of the 16 category subpaths (`react-web3-icons/chain`, `react-web3-icons/wallet`, …) no longer export an `index_d_exports` namespace, which never existed at runtime. With `import * as wallets from 'react-web3-icons/wallet'`, `Object.values(wallets).map(Icon => <Icon />)` and `wallets[name]` with `name: keyof typeof wallets` now type-check. `IconName` is now generated as a list of names; it holds the same names as before.
