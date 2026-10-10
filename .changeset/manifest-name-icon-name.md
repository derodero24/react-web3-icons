---
"react-web3-icons": major
---

**Breaking (types):** `IconManifestEntry['name']` (`react-web3-icons/manifest`) is now `IconManifestName` instead of `string`. This new exported type is the same union of export names as `IconName`, so `icons[entry.name]` on `import * as icons from 'react-web3-icons'` type-checks without a cast. The manifest spells the names out, so its types still load without `@types/react`. Reading `name` as a `string` still compiles; code that builds its own `IconManifestEntry` objects must use export names.
