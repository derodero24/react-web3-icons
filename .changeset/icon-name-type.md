---
"react-web3-icons": minor
---

Export `IconName` TypeScript type — a union of all icon component names. Useful for type-safe dynamic icon lookups.

```ts
import type { IconName } from 'react-web3-icons';
import * as icons from 'react-web3-icons';

function Icon({ name }: { name: IconName }) {
  const Component = icons[name];
  return <Component />;
}
```
