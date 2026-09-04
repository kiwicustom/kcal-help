# Help screenshots (Playwright only)

**Law:** [`docs/product/DOCUMENTATION-LAW.md`](../../../docs/product/DOCUMENTATION-LAW.md)

- Generate: `npm run help:screenshots` (app running at `E2E_BASE_URL`)
- Verify: `npm run help:verify-screenshots` — **fails CI if any `manifest.json` → `required` file is missing**
- **Manual PNGs are forbidden.** Stable filenames only.

`manifest.json` → `required` = CI gate. `catalog` = full Documentation Law target.
