# AGENTS.md - BILAN Video Project

> This file is for AI coding agents working on the BILAN video generation project.

---

## Project Overview

**BILAN Video** is a Remotion-based video generation system for creating TikTok/Instagram Reels content for the "bilan" brand (hydration/electrolyte products). The project generates vertical format videos (1080x1920) optimized for social media platforms.

**Key Characteristics:**
- **Tech Stack:** TypeScript, React, Remotion 4.0.409, Tailwind CSS 4.0
- **Output Format:** TikTok vertical (1080x1920, 30fps)
- **Primary Language:** Spanish (content), English (code comments)
- **License:** UNLICENSED (private)

---

## Technology Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| Remotion | 4.0.409 | Video rendering engine |
| React | 19.2.3 | UI component framework |
| TypeScript | 5.9.3 | Type-safe development |
| Tailwind CSS | 4.0.0 | Styling (via @remotion/tailwind-v4) |
| csv-parse | 5.5.0 | Batch video data parsing |

---

## Project Structure

```
bilan-video/
├── src/
│   ├── index.ts              # Entry point - registers RemotionRoot
│   ├── Root.tsx              # Defines all video compositions
│   ├── brand.ts              # Brand constants (colors, fonts, sizes)
│   ├── index.css             # Global styles + Tailwind
│   ├── components/           # Reusable video components
│   │   ├── BrandIntro.tsx           # Basic intro (legacy)
│   │   ├── BrandIntroPerfected.tsx  # Animated logo + tagline
│   │   ├── BrandOutro.tsx           # Basic outro (legacy)
│   │   └── BrandOutroPerfected.tsx  # CTA + handle + social prompts
│   ├── templates/            # Video content templates
│   │   ├── QuickTipVideo.tsx        # 15s tips
│   │   ├── MythbustingVideo.tsx     # 30s myth debunking
│   │   ├── EducationalVideo.tsx     # 60s educational
│   │   ├── TrendingVideo.tsx        # 40s trending formats
│   │   ├── MasterVideo.tsx          # Wrapper combining intro/content/outro
│   │   └── index.ts                 # Template exports
│   ├── utils/
│   │   └── csvParser.ts             # Parse video data from CSV
│   └── data/
│       └── videos.csv               # Video content data source
├── public/
│   ├── logo.png                     # BILAN logo
│   ├── fonts/                       # Font files (Montserrat, Poppins, Metropolis)
│   └── audio/music/                 # Background music tracks
├── content/                         # JSON content files (optional)
├── out/                             # Rendered video output
├── data/                            # Marketing content data
├── ab-testing/                      # A/B test configurations
├── batch-render.mjs                 # Batch rendering script (Node.js)
├── batch-render-master.mjs          # Master batch renderer
├── remotion.config.ts               # Remotion configuration
└── *.md                             # Documentation files
```

---

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (live preview in browser)
npm run dev
# Or: npx remotion studio

# Render a single video
npx remotion render src/index.ts CompositionID out/video.mp4

# Render with custom props
npx remotion render src/index.ts QuickTip out/video.mp4 --props='{"tip":"Text","reason":"Why","cta":"Action"}'

# Render from JSON file
npx remotion render src/index.ts QuickTip out/video.mp4 --props=content/file.json

# Batch render from CSV
npm run render
# Or: node batch-render.mjs

# Bundle project (without rendering)
npm run build
# Or: npx remotion bundle

# Lint and type check
npm run lint

# Upgrade Remotion
npm run upgrade
# Or: npx remotion upgrade
```

---

## Video Templates

### Template Types and Durations

| Template | Duration | Use Case | Composition ID |
|----------|----------|----------|----------------|
| QuickTip | 15s | Fast tips | `QuickTip`, `MasterQuickTip` |
| Mythbusting | 30s | Debunk myths | `Mythbusting`, `MasterMythbusting` |
| Educational | 60s | Deep dives | `Educational`, `MasterEducational` |
| Trending | 40s | POV/transformation | `Trending`, `MasterTrending` |

### Composition Types

**Raw Templates** (content only):
- `QuickTip`, `Mythbusting`, `Educational`, `Trending`
- Use for testing content without intro/outro

**Master Videos** (complete videos with intro/outro):
- `MasterQuickTip`, `MasterMythbusting`, `MasterEducational`, `MasterTrending`
- Composed of: BrandIntro (2.5s) + Content + BrandOutro (4s)

**Test Compositions** (audio testing):
- `QuickTipTest1` through `QuickTipTest5` - Different background music tracks

---

## Brand Guidelines (CRITICAL)

### Brand Identity
- **Brand name:** Always lowercase `bilan` (never BILAN or Bilan)
- **Tagline:** `hidratación inteligente` (lowercase with accent)
- **Handle:** `@bilan.mx`

### Colors
```typescript
// From src/brand.ts
primary: '#0066CC'       // Brand blue (background)
accentGreen: '#22c55e'   // Label badges (green for contrast on blue)
white: '#FFFFFF'         // Text
error: '#ef4444'         // Myth/"antes" labels
success: '#22c55e'       // Truth/"después" labels
```

### Typography
- **Font:** Montserrat Bold
- **Sizes:** Maximum for accessibility
  - Hero: 72px
  - Title: 64px
  - Subtitle: 52px
  - Body: 44px

### Logo Rules
- Top of video: 550px width
- CTA/Outro screen: 750px width (larger for visibility)
- Only ONE logo visible at a time (top fades before CTA)

### CRITICAL RULE: NO BLANK SCREENS
- Never have empty frames without text or animations
- Every second must have visual content
- Test all transitions for gaps

---

## Content Data Format

### CSV Format (src/data/videos.csv)

```csv
id,type,title,hook,mainPoints,conclusion,myth,truth,explanation,tip,reason,scenes,trendingFormat,cta,brandColor
```

**Field mapping by type:**

**QuickTip:** `tip`, `reason`
**Mythbusting:** `myth`, `truth`, `explanation`
**Educational:** `hook`, `mainPoints` (pipe-separated), `conclusion`
**Trending:** `hook`, `scenes` (pipe-separated), `trendingFormat`

### JSON Props Format

```json
// QuickTip
{
  "tip": "Main tip text",
  "reason": "Why this matters",
  "cta": "Call to action"
}

// Mythbusting
{
  "title": "Topic",
  "myth": "The false belief",
  "truth": "The actual fact",
  "explanation": "Brief explanation",
  "cta": "Call to action"
}

// Educational
{
  "title": "Topic",
  "hook": "Opening question",
  "mainPoints": ["Point 1", "Point 2", "Point 3"],
  "conclusion": "Summary",
  "cta": "Call to action"
}

// Trending
{
  "title": "Video title",
  "hook": "Opening hook",
  "scenes": ["Scene 1", "Scene 2", "Scene 3", "Scene 4"],
  "trendingFormat": "transformation|pov|challenge|duet",
  "cta": "Call to action"
}
```

---

## Code Style Guidelines

### TypeScript Configuration
- Target: ES2018
- Module: CommonJS
- JSX: react-jsx
- Strict mode enabled
- No unused locals allowed

### Prettier Configuration (.prettierrc)
```json
{
  "useTabs": false,
  "bracketSpacing": true,
  "tabWidth": 2
}
```

### ESLint
Uses `@remotion/eslint-config-flat` - run with `npm run lint`

### Naming Conventions
- Components: PascalCase (e.g., `QuickTipVideo`, `BrandIntroPerfected`)
- Props interfaces: ComponentName + "Props" (e.g., `QuickTipProps`)
- Files: PascalCase for components, camelCase for utilities
- Brand constants: UPPER_SNAKE_CASE in brand.ts

### Import Order
1. React/Remotion imports
2. Third-party imports
3. Local imports (components, utils, brand)

---

## Audio Implementation

All templates include background music:

```typescript
import { Audio, staticFile } from 'remotion';

<Audio
  src={staticFile("audio/music/ambient-loop.mp3")}
  loop={true}
  volume={0.3}
/>
```

**Available tracks:**
- `ambient-loop.mp3` - Default background
- `flashlight-ambient.mp3` - Test variant 1
- `electro-drone-ambient.mp3` - Test variant 2
- `dreamy-ambient-loop.mp3` - Test variant 3
- `ambient-music-loop-118.mp3` - Test variant 4
- `ambient-quick-start.mp3` - Test variant 5

---

## TikTok Compliance Rules

### NEVER Use
- Medical claims ("cures", "treats", "heals")
- Unrealistic results ("lose 10kg in a week")
- Discouraging professional medical care
- Extreme diet/weight loss messaging

### Safe Language Patterns
| Avoid | Use Instead |
|-------|-------------|
| "Cures dehydration" | "Supports hydration" |
| "Scientifically proven" | "Studies suggest..." |
| "You need this" | "Many people find..." |
| "Will make you..." | "May help with..." |

### Required Disclaimer
For health-adjacent content: "Consulta a un profesional de salud para consejos personalizados"

---

## Testing Instructions

### Manual Testing
1. Run `npm run dev` to open Remotion Studio
2. Select composition from left sidebar
3. Adjust props in the panel
4. Preview changes in real-time

### Single Video Render Test
```bash
npx remotion render src/index.ts QuickTip out/test.mp4 --props='{"tip":"Test","reason":"Testing","cta":"Test"}'
```

### Audio Testing
Use the `QuickTipTest1` through `QuickTipTest5` compositions to test different background music tracks.

---

## Security Considerations

- **API Keys:** Store in `.env` file (not committed to git)
- **Output Files:** Videos are rendered to `out/` directory (in .gitignore)
- **Dependencies:** Keep Remotion packages updated for security patches
- **File Access:** Batch renderer reads CSV files from local filesystem only

---

## Important File Locations

| File | Purpose |
|------|---------|
| `src/Root.tsx` | Define all video compositions here |
| `src/brand.ts` | Update brand colors, fonts, sizes |
| `src/data/videos.csv` | Bulk video content data |
| `remotion.config.ts` | Video codec, overwrite settings |
| `batch-render.mjs` | Modify batch rendering logic |

---

## Documentation References

- **PROPS_GUIDE.md** - Template props documentation
- **BILAN-VIDEO-GUIDELINES.md** - Master brand reference
- **TIKTOK-GUIDELINES.md** - TikTok compliance rules
- **BATCH-PLAN.md** - Batch rendering workflow
- **KANBAN.md** - Project status and roadmap
- **MOMENTUM-LOOP-GUIDE.md** - Content strategy (30 video scripts)

---

## Common Tasks

### Add a New Video Template
1. Create component in `src/templates/`
2. Export from `src/templates/index.ts`
3. Add composition in `src/Root.tsx`
4. Update duration constants in `MasterVideo.tsx`

### Modify Brand Colors
1. Edit `src/brand.ts`
2. Update all template files that hardcode colors
3. Re-render test videos

### Add Background Music
1. Add MP3 to `public/audio/music/`
2. Import and add `<Audio>` component in template
3. Test volume levels (recommended: 0.25-0.3)

### Batch Render Videos
1. Update `src/data/videos.csv` with new entries
2. Run `npm run render`
3. Check `out/` directory for rendered videos

---

*Last updated: 2026-01-29*
*For questions, check the markdown documentation files in project root.*
