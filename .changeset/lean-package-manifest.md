---
"react-web3-icons": patch
---

Packaging fixes:

- The package no longer declares `engines`, so installing it under Node 18 or 20 no longer warns, or fails with Yarn 1 or `engine-strict`. Nothing in the published files depends on the Node version; the Node requirement (`^22.18.0 || >=24.11.0`, matching the build toolchain) only applies to building the library from source.
- `react-web3-icons/package.json` is now exported, so `require.resolve('react-web3-icons/package.json')` and `import.meta.resolve` work instead of throwing `ERR_PACKAGE_PATH_NOT_EXPORTED`.
- JavaScript and declaration sourcemaps are no longer published. The declaration maps pointed at `src/`, which is not in the package. The tarball is about 30% smaller (unpacked 4.98 MB → 3.49 MB, 1,863 → 1,337 files). The published JavaScript and type declarations are otherwise unchanged.
