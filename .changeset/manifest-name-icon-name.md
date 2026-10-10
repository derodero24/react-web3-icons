---
"react-web3-icons": major
---

**Breaking (types):** `IconManifestEntry['name']` (`react-web3-icons/manifest`) is now `IconName` instead of `string`, so `icons[entry.name]` on `import * as icons from 'react-web3-icons'` type-checks without a cast. Reading `name` as a `string` still compiles; code that builds its own `IconManifestEntry` objects must use export names.
