# bilan-video

Remotion-based video pipeline for bilan electrolitos social content.

---

## Quick Start

### Level 1 — Single TikTok

```bash
# 1. Write your content JSON
cp content/ready/example.json content/ready/my-tip.json
# edit my-tip.json

# 2. Render
npm run render -- --from-file content/ready/my-tip.json

# 3. Find your video in out/
```

### Level 2 — All 4 Platforms at Once

```bash
npm run render -- --from-file content/ready/my-tip.json --platforms tiktok,whatsapp,instagram,twitter
```

Outputs to `out/` with platform suffixes.

### Level 3 — Batch from Queue

Drop JSON files into `content/scheduled/` then:

```bash
npm run render:batch
```

Processes all queued content and moves rendered files to `out/`.

### Level 4 — Visual Preview

```bash
npm run dev
```

Opens Remotion Studio at `localhost:3000` with 10 compositions.

---

## Compositions (10 total)

| ID | Format | Use |
|----|--------|-----|
| `QuickTip` | 1080×1920 TikTok | Raw quick tip |
| `QuickTipWhatsApp` | 1080×1080 Square | WhatsApp status |
| `QuickTipInstagram` | 1080×1080 Square | Instagram post |
| `EducationalTwitter` | 1920×1080 Landscape | Twitter/X video |
| `MasterQuickTip` | 1080×1920 TikTok | Branded (intro + outro) |
| `MasterMythbusting` | 1080×1920 TikTok | Branded mythbusting |
| `MasterEducational` | 1080×1920 TikTok | Branded educational |
| `MasterTrending` | 1080×1920 TikTok | Branded trending/POV |
| `PreviewBrandIntroPerfected` | 1080×1920 | Studio preview only |
| `PreviewBrandOutroPerfected` | 1080×1920 | Studio preview only |

---

## Content Scripts

```bash
npm run content          # content-manager: list, validate, move files
npm run render:batch     # batch-automation: process content/scheduled/
```

---

## Docs

- `docs/GUIDELINES.md` — brand voice, visual rules, content strategy
- `docs/DATA-FORMAT.md` — JSON input format for all templates
- `docs/PIPELINE.md` — multi-platform rendering pipeline details
