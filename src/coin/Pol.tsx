// Source: re-export of Polygon — see src/chain/Polygon.tsx
// Lookup keys: the legacy ticker MATIC resolves to Pol, because MATIC was upgraded 1:1 to POL (https://docs.polygon.technology/pos/concepts/tokens/matic-to-pol: "The migration operates on a 1:1 basis").
export {
  Polygon as Pol,
  PolygonCircle as PolCircle,
  PolygonCircleMono as PolCircleMono,
  PolygonMono as PolMono,
} from '../chain/Polygon';
