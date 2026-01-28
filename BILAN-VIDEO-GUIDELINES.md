# bilan Video Creation Guidelines

*Master reference for creating consistent, professional bilan videos*

---

## 🎨 Brand Identity

### Name & Tagline
- **Brand name:** Always `bilan` (lowercase)
  - ✅ bilan
  - ❌ BILAN, Bilan, BiLan
- **Tagline:** `hidratación inteligente` (lowercase, with accent)
- **Handle:** `@bilan.mx`

### Colors
| Element | Color | Hex |
|---------|-------|-----|
| Background | Blue | `#0066CC` |
| Label badges | Green | `#22c55e` (`brand.colors.accentGreen`) |
| Text | White | `#FFFFFF` |
| Error/Myth | Red | `#ef4444` |
| Success/Truth | Green | `#22c55e` |

### Typography
- **Font:** Montserrat Bold
- **Sizes:** Maximum for accessibility
  - Hero: 72px
  - Title: 64px
  - Subtitle: 52px
  - Body: 44px
  - Caption: 36px

### Logo Placement
- **Top of video:** 550px width, centered
- **CTA/Outro screen:** 750px width, centered
- **Effect:** Drop shadow for visibility
- **Rule:** Only ONE logo visible at a time (top logo fades out before CTA)

---

## 🎬 Video Structure

### 🚨 CRITICAL RULE: NO BLANK SCREENS
- **NEVER have empty frames** without text, animations, or images
- Every second must have visual content or text on screen
- Breaks in content = lost audience engagement
- Test all transitions for gaps

### MasterVideo Components
All videos use the MasterVideo wrapper with three sections:

1. **BrandIntro** (2.5s)
   - Animated logo entrance
   - Tagline: "HIDRATACIÓN INTELIGENTE" (uppercase in intro)

2. **Content** (varies by template)
   - QuickTip: 15s
   - Mythbusting: 30s
   - Educational: 60s
   - Trending: 40s

3. **BrandOutro** (4s)
   - CTA text (e.g., "Infórmate mejor")
   - Logo (750px)
   - Tagline: "hidratación inteligente" (lowercase below logo)
   - Handle: @bilan.mx in blue pill
   - Social prompts: ❤️ Like | 💬 Comenta | 📤 Comparte

### Label Badges
- **Color:** Green (`#22c55e`) on blue background for contrast
- **Style:** Rounded pill with shadow, white text
- **Font size:** 48-56px
- **Semantic exceptions:**
  - ❌ Myth/Antes labels → Red
  - ✅ Truth/Después labels → Green

---

## 📱 TikTok Compliance

### ⚠️ NEVER Do
- Make unverified medical/health claims
- Use words like "cures", "treats", "heals"
- Promise specific results ("lose 10kg")
- Discourage professional medical care
- Promote extreme diets or weight loss

### ✅ Safe Language
| Avoid | Use Instead |
|-------|-------------|
| "Cures dehydration" | "Supports hydration" |
| "You need this" | "Many people find..." |
| "Scientifically proven" | "Studies suggest..." |
| "Will make you..." | "May help with..." |

### Safe Topics
1. General hydration tips
2. Exercise & hydration timing
3. Daily wellness habits
4. Common misconceptions (gentle tone)
5. Taste/lifestyle content

### Required Disclaimer
For health-adjacent content, include:
> "Consulta a un profesional de salud para consejos personalizados"

---

## 📝 Content JSON Structure

```json
{
  "id": "unique_id",
  "template": "QuickTip|Mythbusting|Educational|Trending",
  "contentProps": {
    // Template-specific props
  },
  "tiktok": {
    "caption": "Full caption with emojis and hashtags",
    "hashtags": ["array", "of", "hashtags"]
  }
}
```

### Template Props

**QuickTip:**
```json
{
  "tip": "Main tip text",
  "reason": "Why this matters",
  "cta": "Call to action"
}
```

**Mythbusting:**
```json
{
  "title": "Topic question",
  "myth": "The common misconception",
  "truth": "The balanced reality",
  "explanation": "Brief, soft explanation",
  "cta": "Call to action"
}
```

**Educational:**
```json
{
  "title": "Topic",
  "hook": "Opening question/statement",
  "mainPoints": ["Point 1", "Point 2", "Point 3"],
  "conclusion": "Summary",
  "cta": "Call to action"
}
```

**Trending:**
```json
{
  "title": "Video title",
  "hook": "Opening hook",
  "scenes": ["Scene 1", "Scene 2", "Scene 3", "Scene 4"],
  "cta": "Call to action",
  "trendingFormat": "transformation|pov|challenge|duet"
}
```

---

## 🏷️ Hashtag Strategy

### Core Hashtags (always include)
- `#bilan`
- `#hidratacion`

### Category Hashtags
| Topic | Hashtags |
|-------|----------|
| Fitness | `#fitness #gym #workout #entrenamiento` |
| Wellness | `#bienestar #saludable #vidaSaludable` |
| Education | `#aprendeentiktok #datoscuriosos` |
| Myths | `#mitos #realidad` |

### Trending/Discovery
- `#tipssaludables`
- `#habitossaludables`
- `#nutricion`

---

## ✅ Pre-Publish Checklist

- [ ] Brand name is lowercase "bilan"
- [ ] Outro shows "hidratación inteligente" tagline
- [ ] Labels are GREEN (not blue)
- [ ] No medical/health claims
- [ ] Language is soft ("may help", "supports")
- [ ] Includes "consulta a un profesional" if needed
- [ ] Caption has relevant hashtags
- [ ] Video is 9:16 vertical (1080x1920)

---

## 📁 Project Structure

```
bilan-video/
├── src/
│   ├── brand.ts           # Colors, fonts, sizes
│   ├── components/
│   │   ├── BrandIntro.tsx # Animated intro
│   │   └── BrandOutro.tsx # CTA outro with tagline
│   └── templates/
│       ├── QuickTipVideo.tsx
│       ├── MythbustingVideo.tsx
│       ├── EducationalVideo.tsx
│       ├── TrendingVideo.tsx
│       └── MasterVideo.tsx # Wrapper
├── content/               # JSON content files
├── out/                   # Rendered videos
└── public/
    ├── logo.png
    └── fonts/
```

---

## 🚀 Render Commands

**Single video:**
```bash
npx remotion render src/index.ts MasterQuickTip out/video-name.mp4 --props='{"template":"QuickTip","contentProps":{...}}'
```

**From JSON file:**
```bash
npx remotion render src/index.ts MasterQuickTip out/video-name.mp4 --props=content/filename.json
```

---

*Last updated: 2026-01-27*
*Reference: TikTok Community Guidelines (August 2025)*
