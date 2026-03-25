# Testing

## Run tests

```bash
npm test          # run once
npm run test:watch  # watch mode (re-runs on file changes)
```

~1 second, 172 tests, no rendering.

---

## What gets tested

### `tests/scripts.test.ts` — production scripts exist

Verifies the 3 scripts wired in `package.json` are present on disk, and that the old broken `batch-render.mjs` (which used dead composition IDs) is gone from the project root.

If you rename or move a script, update `package.json` and this test together.

---

### `tests/composition-ids.test.ts` — Root.tsx wiring

Reads `src/Root.tsx` as text, extracts all `id="..."` values with a regex, and asserts:

- Exactly **10 compositions** are registered
- All 4 platform IDs exist: `QuickTip`, `QuickTipWhatsApp`, `QuickTipInstagram`, `EducationalTwitter`
- All 4 master IDs exist: `MasterQuickTip`, `MasterMythbusting`, `MasterEducational`, `MasterTrending`
- Every composition ID referenced in `scripts/multi-platform-generator.mjs` PLATFORMS config is present in Root.tsx

No Remotion import needed — just `fs.readFileSync` + regex. Adding a composition to Root.tsx without updating the count assertion will fail this test (intentionally).

---

### `tests/duration.test.ts` — frame count math

Imports `getMasterVideoDuration()` from `src/templates/MasterVideo.tsx` and calls it with known inputs. All Remotion APIs and React components are mocked so no browser or renderer is needed.

Current expected values (from constants in MasterVideo.tsx):

| Template    | Frames (no intro/outro) | Frames (with intro+outro) |
|-------------|-------------------------|---------------------------|
| QuickTip    | 450 (15s × 30fps)       | 645 (2.5 + 15 + 4 × 30)  |
| Mythbusting | 900                     | 1095                      |
| Educational | 1800                    | 1995                      |
| Trending    | 1200                    | 1395                      |

If you change `INTRO_DURATION`, `OUTRO_DURATION`, or any value in `CONTENT_DURATIONS`, update the assertions here to match.

---

### `tests/content-files.test.ts` — content JSON integrity

Recursively globs `content/**/*.json`, reads every file, and asserts:

1. It parses as valid JSON (catches accidental corruption or truncation)
2. It is a non-null object, not an array

One test pair is generated per file (~80 files → 157 tests total). If you add a content file that somehow fails, the test name includes the relative path so you can find it immediately.

---

## Design decisions

**No actual rendering** — Remotion renders take 30–90s per video. Tests cover logic and structure only.

**Text-based composition check** — Importing Root.tsx would pull in all of Remotion. Reading it as text and matching `id="..."` is fast and dependency-free.

**Mocking in duration test** — `getMasterVideoDuration` is a pure function but lives in a file with JSX and Remotion imports. `vi.mock` stubs out everything external so only the pure math runs.

**Vitest over Jest** — Zero-config TypeScript, native ESM, and esbuild transformation. No `babel.config.js` or manual `transform` setup required.
