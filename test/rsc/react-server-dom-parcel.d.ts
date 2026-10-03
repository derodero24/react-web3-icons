// react-server-dom-parcel ships no type declarations; this covers the one
// function the RSC tests use.
declare module 'react-server-dom-parcel/server' {
  import type { ReactNode } from 'react';

  export function renderToReadableStream(
    model: ReactNode,
    options?: { readonly onError?: (error: unknown) => void },
  ): ReadableStream<Uint8Array>;
}
