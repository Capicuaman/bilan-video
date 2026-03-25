# bilan Video Production Kanban

_Last updated: 2026-03-02_

---

## ✅ Done

### Infrastructure
- [x] Set up Remotion project
- [x] Create `brand.ts` with bilan colors and fonts
- [x] Create 4 core video templates (QuickTip, Mythbusting, Educational, Trending)
- [x] Create MasterVideo wrapper (auto-stitches intro/content/outro)
- [x] Add background music to all templates (ambient-loop.mp3, 30% volume)
- [x] Create BrandIntroPerfected + BrandOutroPerfected components
- [x] Create platform variants: BrandIntroWhatsApp, BrandIntroInstagram, BrandIntroStandard
- [x] Create BrandOutroLoopable component
- [x] Create QuickTipSquare + EducationalLandscape templates
- [x] Add `accentGreen` color to brand.ts for label badges

### Scripts
- [x] Build multi-platform-generator.mjs (main render path)
- [x] Build batch-automation.mjs for batch renders
- [x] Build content-manager.mjs for content pipeline
- [x] Add TikTok caption output to render script

### Architecture Cleanup (2026-02-XX)
- [x] Production-first architecture refactor
- [x] Move experimental audio A/B test templates to `src/experimental/`
- [x] Consolidate 10 active compositions in `src/Root.tsx`
- [x] Archive broken/superseded scripts to `scripts/archive/`
- [x] Archive historical docs to `docs/archive/`
- [x] Document data format in `docs/DATA-FORMAT.md`
- [x] Document pipeline in `docs/PIPELINE.md`
- [x] Document brand guidelines in `docs/GUIDELINES.md`

### Content
- [x] Fix salt video for TikTok compliance (01-verdad-sal series)
- [x] Create multiple TikTok-compliant content JSON files
- [x] Archive all previous renders to `~/Videos/bilan-archive/`
- [x] Set up content folder structure (drafts/, ready/, posted/, scheduled/)

---

## 🔄 In Progress

- [ ] Test renders — one per platform for review

---

## 📋 TODO

### 🔴 High Priority

- [ ] **Test render per platform** — TikTok, Instagram, WhatsApp, Twitter
- [ ] **Review rendered outputs** — quality check before mass production
- [ ] Validate content JSON files before batch render

### 🟡 Medium Priority

- [ ] Phase 2 audio — template-specific tracks:
  - QuickTip: upbeat/energetic (120–140 BPM)
  - Mythbusting: dramatic tension (80–110 BPM)
  - Educational: calm ambient (60–90 BPM)
  - Trending: viral beats
- [ ] Content validation utils (`utils/validate-content.ts`):
  - Medical claims detection
  - Brand name enforcer (lowercase "bilan")
  - Duration check
- [ ] Add parallel rendering with concurrency control
- [ ] Add retry logic for failed renders

### 🟢 Low Priority

- [ ] Phase 3 audio — AI voiceovers in Spanish
- [ ] Phase 4 audio — sound effects (whoosh, ding, pop)
- [ ] Dynamic duration calculation from word count
- [ ] Google Sheets / Notion content input support
- [ ] A/B test configuration framework
- [ ] Template preview system (3-sec low-quality preview)

---

## 🏗️ Current Architecture

### Compositions (src/Root.tsx — 10 active)
| ID | Template | Platform |
|----|----------|----------|
| QuickTip | QuickTipVideo | TikTok |
| QuickTipWhatsApp | QuickTipVideo | WhatsApp |
| QuickTipInstagram | QuickTipSquare | Instagram |
| EducationalTwitter | EducationalLandscape | Twitter |
| MasterQuickTip | MasterVideo + QuickTip | TikTok |
| MasterMythbusting | MasterVideo + Mythbusting | TikTok |
| MasterEducational | MasterVideo + Educational | TikTok |
| MasterTrending | MasterVideo + Trending | TikTok |
| PreviewBrandIntroPerfected | BrandIntroPerfected | Preview |
| PreviewBrandOutroPerfected | BrandOutroPerfected | Preview |

### Active Scripts (scripts/)
- `multi-platform-generator.mjs` — main render path (`npm run render`)
- `batch-automation.mjs` — batch renders (`npm run render:batch`)
- `content-manager.mjs` — content pipeline (`npm run content`)

### Content Files (content/)
- `myth_01_8vasos.json`, `myth_04_trampa_bebidas.json`, `myth_sal.json`, `myth_sal_v2.json`
- `quicktip_01_hidratacion.json`, `quicktip_02_ejercicio.json`, `quicktip_03_manana.json`
- `tip_hidratacion.json`

---

## 🎨 Brand Reference

| Element | Value |
|---------|-------|
| Brand name | `bilan` (always lowercase) |
| Tagline | `hidratación inteligente` |
| Handle | `@bilan.electrolitos` |
| Background | `#0066CC` (blue) |
| Label badges | `#22c55e` (accentGreen) |
| Logo top | 550px |
| Logo CTA | 750px |
