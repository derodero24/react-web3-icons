---
'react-web3-icons': major
---

Drop Node.js 20 support: `engines.node` is now `>=22.12.0`. Node 20 (Iron) reached end-of-life on 2026-04-30 and the build toolchain (tsdown 0.22 / rolldown 1.0) no longer runs on it. The library itself is plain ESM + React and is unaffected at runtime — this only changes the declared support matrix and the CI test matrix (Node 22 and 24).
