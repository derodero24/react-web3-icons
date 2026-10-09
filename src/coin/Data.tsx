// Source: re-export of DataNetwork — see src/chain/DataNetwork.tsx
// Lookup keys: the legacy ticker IP resolves to Data, because $IP converts to $DATA automatically at a 1:1 ratio (https://www.datafdn.org/faqs).
export {
  DataNetwork as Data,
  DataNetworkMono as DataMono,
  DataNetworkSquare as DataSquare,
  DataNetworkSquareMono as DataSquareMono,
} from '../chain/DataNetwork';
