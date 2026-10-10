// Source: re-export of Ton — see src/chain/Ton.tsx
// Lookup keys: the ticker TON stays on this re-export of The Open Network's logo, although Toncoin was renamed Gram (ticker GRAM, which resolves to `Gram`). Moving TON to Gram would leave this coin export unreachable, and it cannot be deprecated on its own: a deprecated coin `Ton` would be a second binding named like the chain `Ton`, so the root `Ton` would be ambiguous and `DEPRECATED_ICON_NAMES` would also mark the chain icon
export {
  Ton,
  TonMono,
} from '../chain/Ton';
