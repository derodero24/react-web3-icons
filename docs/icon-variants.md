# Icon Variants and Mono Design

How icon exports are named, what each variant contains, and how monochrome
variants are drawn. It is part of the [contributing guide](../CONTRIBUTING.md).

## Naming convention

Every icon export follows a `{Brand}{Variant}` pattern using PascalCase. The base name (no suffix) typically represents the **standalone branded symbol** without a background container — unless the brand's official assets always include a specific background, in which case the base includes it (see [Base icon background rule](#base-icon-background-rule) below). When no standalone variant exists in the official brand assets, the base name represents the primary brand mark.

### Variant Suffixes

| Suffix | Meaning | Example |
| --- | --- | --- |
| _(none)_ | Primary brand mark — standalone symbol without background in most cases; includes background when integral to the official brand mark (see [Base icon background rule](#base-icon-background-rule)) | `Bitcoin`, `ZkSync` |
| `Mono` | Monochrome (`currentColor`) matching the base shape | `BitcoinMono` |
| `Circle` | Symbol on a circular background | `BitcoinCircle` |
| `CircleMono` | Monochrome circular | `BitcoinCircleMono` |
| `Square` | Symbol on a square / rounded-rectangle background | `TrustWalletSquare` |
| `SquareMono` | Monochrome square | `TrustWalletSquareMono` |
| `Wordmark` | Symbol with text (logotype) | `MagicEdenWordmark` |
| `WordmarkMono` | Monochrome wordmark | `MagicEdenWordmarkMono` |
| `Alt` | Alternative color scheme or design | `MetaMaskAlt` |
| `Inverted` | Inverted color scheme for contrast on dark backgrounds | `EtherscanInverted` |
| `Light` | _(deprecated)_ Legacy lighter variant; only `BlastscanLight` remains active. Prefer `Inverted` for new icons. | `BlastscanLight` |
| `Flat` | Single brand color, no internal color variation | `ArbitrumOneFlat` |
| `Symbol` | Standalone symbol without container (when base has one) | `RainbowWalletSymbol` |
| `SymbolMono` | Monochrome standalone symbol without container | `OpenSeaSymbolMono` |

### Rules

1. **Base = standalone**: The unsuffixed name is always the standalone symbol. If the brand's primary mark is a circle (e.g., OpenSea ship on blue circle), the base name keeps the circle shape and `SymbolMono` provides the symbol-only mono variant.
2. **Mono mirrors its base**: `FooMono` matches `Foo`'s shape; `FooCircleMono` matches `FooCircle`'s shape.
3. **No numeric suffixes**: Never use `Foo2`, `Foo3`, etc. Use descriptive suffixes that convey the visual difference.
4. **Flat vs Alt**: Use `Flat` when the difference is strictly single-color simplification. Use `Alt` for a meaningfully different design or color scheme.
5. **Inverted**: Reserved for variants where the artwork colors are inverted for contrast on dark backgrounds. The shape and layout are identical to the base.

### Base icon background rule

Whether the base icon (`Foo`) includes a background container depends on the official brand assets:

- **Include the background in the base variant** when the brand's official icon is always presented with a specific background (colored square, circle, or rounded rectangle) in all official assets — the background is integral to the brand mark.

  _Examples_: `ZkSync` (black square), `Scroll` (beige rectangle), `Mantle` (black circle), `Linea` (black rectangle)

  In these cases, do **not** add a separate `FooCircle`/`FooSquare` variant unless the mark also officially exists without a background.

- **Omit the background from the base variant** when the brand provides a standalone icon mark (no background). The base icon (`Foo`) contains only the mark. Add `FooCircle` and/or `FooSquare` variants when a background container is needed.

  _Examples_: `Coinbase` (C mark only) + `CoinbaseCircle`; `Avalanche` (A mark) + `AvalancheCircle`

When in doubt, consult the brand's official press kit or design guidelines. If the official assets show the mark both with and without a background, use the standalone mark as the base and add Circle/Square variants for the backgrounded versions.

## Mono design rules

Every `*Mono` variant is judged against its colored counterpart. The goal is
that swapping colored → mono changes only the coloring, never the impression:

1. **Same silhouette**: the mono covers the same footprint as the colored
   variant at the same scale in the same viewBox. If the colored artwork has a
   container (circle / rounded square / shield), the mono keeps it: render the
   container filled in `currentColor` and knock the glyph out (a single
   `fill-rule="evenodd"` path is the preferred form). Never reduce a filled
   container to an outline ring, and never drop the container entirely — that
   is what the `Symbol` / `SymbolMono` variants are for.
2. **One color only**: monos use `currentColor` exclusively — no fixed fills,
   no grays. Prefer binary ink (fill or hole); translucent `currentColor`
   shading is acceptable only where the mark's structure genuinely needs it
   (e.g. distinguishing cube faces), never to imitate decorative gradients.
3. **Keep identifying detail**: facial features, letterforms, and other
   details that make the mark recognizable must survive; decorative gradients
   and shading may be dropped. If a detail can't be expressed in one color,
   simplify it rather than delete it.
4. **Verify both polarities**: check the mono on white *and* on a dark
   background (`color` set to a light value) before submitting.

`node scripts/audit-mono.ts` rasterizes every colored/mono pair and reports
outliers — run it after adding or reworking mono artwork. Besides silhouette
IoU / ink ratio / edge-detail ratio, it binarizes the colored artwork by
luminance (best-threshold sweep) and reports the pixel disagreement with the
mono (`refMiss`); a high value means the mono departs from a straight
black-and-white reading of the original. When subject and background
luminance are too close the reference is reported as `degenerate` — judge
those icons visually instead. Intentional rendering changes to existing icons
need the `visual-baseline-update` label on the PR so the visual-regression
job regenerates baselines instead of comparing against develop.
