---
'react-web3-icons': patch
---

Fix the `./deprecated` subpath export: its `require` condition pointed to `dist/deprecated.cjs` / `dist/deprecated.d.cts`, which are never produced by the ESM-only build, so `require('react-web3-icons/deprecated')` failed with a missing-file error. The subpath now declares only the ESM entry, consistent with every other subpath.
