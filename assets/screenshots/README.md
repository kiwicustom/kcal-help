# Help screenshots — infrastructure (Phase 1)

**Law:** [`docs/product/DOCUMENTATION-LAW.md`](../../../docs/product/DOCUMENTATION-LAW.md)  
**Platform:** [`docs/product/BUDDY-ACADEMY-HELP-PLATFORM.md`](../../../docs/product/BUDDY-ACADEMY-HELP-PLATFORM.md)

## Rules

- **Playwright only.** Manual screenshots are forbidden.
- Stable filenames (see `manifest.json`). Do not rename casually.
- Store only under this directory.

## Documentation Mode

App query: `?docsMode=1` (e.g. `/#/u/sam/home?docsMode=1`)

- Sets `data-docs-mode="1"` on `<html>`
- Disables animations for clean frames
- Prefer Example Sam for deterministic data

## Commands

```bash
npm run help:screenshots          # generate implemented shots
npm run help:verify-screenshots   # CI gate (manifest required list)
```

## Entry points

| Spec | Role |
|------|------|
| `e2e/specs/help-screenshots.spec.ts` | Capture Home shots (expand incrementally) |
| `help-site/assets/screenshots/manifest.json` | Required + catalog filenames |

## Phase 1 note

Architecture only: directory, naming, Docs Mode, Playwright hooks, CI verify.  
Full surface coverage is added feature-by-feature without redesigning Help HTML.
