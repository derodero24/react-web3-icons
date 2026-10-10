---
"react-web3-icons": major
---

Settle the remaining v5 naming and artwork decisions (#815, #835, #836, #837):

- **Renames** (the old names stay as deprecated aliases through v5):
  - `ImmutableX*` → `Immutable*`, after the Immutable X → Immutable rebrand. The new slugs `immutable` and `immutable-zkevm` resolve to it.
  - `ZkSync*` → `Zksync*`, the official name ZKsync with the acronym written as a word. Like `StarkNet*`, the old names get no `dist/svg` file of their own, because those files would differ only in letter case.
- **Duplicate variants deprecated:**
  - `MetaMaskAlt` → `MetaMask`: one fox design since 2024. `'Alt'` is not a `WalletVariant` value.
  - `MagicEdenFlat` → `MagicEden`: the current mark is single-colour.
  - `MagicEdenWordmarkFlat`: a legacy stacked lockup with no official counterpart. Use `MagicEdenWordmark` or `MagicEdenWordmarkMono`.
- **Unofficial composites:**
  - `UsdcCircle` / `UsdcCircleMono` and `DogeCircle` / `DogeCircleMono` now render the official round token marks (`Usdc` / `UsdcMono`, `Doge` / `DogeMono`), instead of legacy discs of unidentified origin. The `'Circle'` variants keep working.
- **One artwork, one source:**
  - `CosmosHub` / `CosmosHubMono` re-export `Atom` / `AtomMono`. The Cosmos chain registry uses that art as the Cosmos Hub logo, and it replaces a legacy hexagon with no current official source.
  - `Wld` / `WldMono` re-export `WorldChain` / `WorldChainMono`. The geometry is the same World logomark.
- **Lookup:** the new slug `eigencloud` resolves to `EigenLayer`.
- **Kept as they are:**
  - `Oneinch`: 1inch is one word.
  - `TON`: still the ticker of the `Ton` mark. The coin re-export of the chain cannot be deprecated without making the root `Ton` ambiguous.
