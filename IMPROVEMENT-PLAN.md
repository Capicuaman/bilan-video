# BILAN Video System - Improvement Plan

*Strategic roadmap for scaling and enhancing the video production pipeline*

---

## 📊 Executive Summary

This plan outlines improvements to transform the current working system into a scalable, automated, data-driven video production pipeline.

**Current State**: Functional but manual, with limited scalability
**Target State**: Automated, AI-assisted, analytics-driven video factory

---

## 🗺️ Phase Overview

| Phase | Focus | Effort | Impact |
|-------|-------|--------|--------|
| 0 | Structural Cleanup | 1-2 days | High |
| 1 | Template System | 2-3 days | High |
| 2 | Audio Enhancement | 2-3 days | Medium |
| 3 | Content Automation | 3-5 days | Very High |
| 4 | Analytics & A/B Testing | 2-3 days | Medium |
| 5 | Performance & DX | 2-3 days | Medium |

---

## Phase 0: Structural Cleanup & Consolidation

### 0.1 Consolidate Test Files
**Problem**: 5 versions of QuickTipVideo (`QuickTipVideo-test1.tsx` through `test5.tsx`)

**Solution**:
```typescript
// Create single TestableQuickTip component with audio variant prop
interface QuickTipProps {
  tip: string;
  reason: string;
  cta: string;
  audioVariant?: 'flashlight' | 'electro' | 'dreamy' | 'bpm118' | 'quickstart' | 'default';
}
```

**Action Items**:
- [ ] Merge all test versions into main template with variant selection
- [ ] Remove deprecated test files
- [ ] Update Root.tsx to remove test compositions
- [ ] Archive test videos to `archive/` folder

### 0.2 Unify Batch Render Scripts
**Problem**: `batch-render.mjs` and `batch-render-master.mjs` likely duplicate logic

**Solution**:
- Create single `render.mjs` with CLI flags:
  ```bash
  node render.mjs --mode=batch --format=master  # Full videos with intro/outro
  node render.mjs --mode=batch --format=content # Content only
  node render.mjs --mode=single --id=video-01   # Single video
  ```

### 0.3 Standardize File Organization
```
content/
  ├── batch-01/           # Group by batch
  ├── batch-02/
  └── templates/          # Reusable content templates
src/
  ├── templates/
  │   ├── base/           # Shared components
  │   ├── QuickTip/
  │   │   ├── index.tsx
  │   │   ├── variants.ts # Audio variants
  │   │   └── types.ts
```

---

## Phase 1: Template System Improvements

### 1.1 Dynamic Duration System
**Current**: Fixed durations per template type
**Target**: Content-aware dynamic timing

```typescript
// utils/duration.ts
export function calculateDuration(
  template: TemplateType,
  content: ContentProps,
  options: { wordsPerSecond?: number; minDuration?: number } = {}
): number {
  const text = extractAllText(content);
  const wordCount = text.split(/\s+/).length;
  const baseDuration = wordCount / (options.wordsPerSecond || 2.5);
  return Math.max(baseDuration, options.minDuration || 15);
}
```

### 1.2 Template Inheritance Architecture
```typescript
// templates/BaseTemplate.tsx
interface BaseTemplateProps {
  backgroundMusic?: string;
  duration: number;
  onRenderComplete?: () => void;
}

// All templates extend base
export const QuickTipVideo: React.FC<QuickTipProps> = (props) => (
  <BaseTemplate {...baseProps}>
    <QuickTipContent {...props} />
  </BaseTemplate>
);
```

### 1.3 Add Visual Enhancement Options
- **Background patterns**: Subtle animated gradients
- **Text animations**: Typewriter, word-by-word reveal
- **Progress indicator**: Subtle timeline showing video progress
- **Emoji reactions**: Floating emojis for engagement

### 1.4 Create Template Preview System
```typescript
// scripts/preview-template.mjs
// Generates quick 3-second preview of all templates for review
```

---

## Phase 2: Audio System Enhancement

### 2.1 Template-Specific Audio Library
```
public/audio/
  ├── music/
  │   ├── quicktip/
  │   │   ├── energetic-120bpm.mp3   # Upbeat
  │   │   ├── punchy-130bpm.mp3      # High energy
  │   │   └── chill-100bpm.mp3       # Relaxed
  │   ├── mythbusting/
  │   │   ├── dramatic-tension.mp3   # Suspense
  │   │   ├── reveal-impact.mp3      # Truth reveal
  │   │   └── neutral-informative.mp3
  │   ├── educational/
  │   │   ├── calm-ambient.mp3       # Focus
  │   │   ├── gentle-piano.mp3       # Friendly
  │   │   └── lo-fi-study.mp3        # Modern
  │   └── trending/
  │       ├── viral-beat.mp3         # Trending style
  │       ├── hype-140bpm.mp3        # High energy
  │       └── transformation.mp3     # Before/after
  └── sfx/
      ├── whoosh-in.mp3
      ├── whoosh-out.mp3
      ├── pop.mp3
      ├── ding.mp3
      └── subtle-impact.mp3
```

### 2.2 Audio Configuration System
```typescript
// config/audio.ts
export const audioPresets = {
  quicktip: {
    background: 'music/quicktip/energetic-120bpm.mp3',
    volume: 0.25,
    sfx: {
      textAppear: 'sfx/pop.mp3',
      transition: 'sfx/whoosh-in.mp3',
    },
  },
  // ... other templates
};
```

### 2.3 Audio Ducking (Future)
- Automatically lower background music during voiceovers
- Requires voiceover implementation first

---

## Phase 3: Content Pipeline Automation

### 3.1 AI-Assisted Content Generation
```typescript
// scripts/generate-content.mjs
import { MoonshotAI } from '@moonshot-ai/sdk';

// Generate video scripts from topics
const topics = [
  'electrolytes for runners',
  'hydration myths debunked',
  'pre-workout hydration tips',
];

for (const topic of topics) {
  const script = await generateScript(topic, {
    template: 'QuickTip',
    tone: 'energetic',
    maxDuration: 15,
  });
  
  await saveContent(script, `content/generated/${topic}.json`);
}
```

### 3.2 Content Validation Pipeline
```typescript
// utils/validate-content.ts
export function validateContent(content: VideoContent): ValidationResult {
  const errors = [];
  
  // TikTok compliance check
  if (containsMedicalClaims(content.text)) {
    errors.push({ type: 'warning', message: 'Contains potential medical claims' });
  }
  
  // Brand consistency check
  if (content.text.includes('BILAN') || content.text.includes('Bilan')) {
    errors.push({ type: 'error', message: 'Brand name must be lowercase "bilan"' });
  }
  
  // Duration validation
  const estimatedDuration = calculateDuration(content);
  if (estimatedDuration > content.targetDuration * 1.2) {
    errors.push({ type: 'warning', message: 'Content may exceed target duration' });
  }
  
  return { valid: errors.length === 0, errors };
}
```

### 3.3 Batch Content Import
Support multiple input formats:
- CSV (current)
- JSON (structured)
- Google Sheets (via API)
- Notion database (via API)

### 3.4 Content Calendar Integration
```typescript
// scripts/schedule-content.mjs
// Generate content based on calendar events
// - Seasonal topics (summer hydration, winter tips)
// - Product launches
// - Marketing campaigns
```

---

## Phase 4: Analytics & A/B Testing

### 4.1 Video Metadata Tracking
Embed tracking data in video metadata:
```json
{
  "version": "2.1",
  "template": "QuickTip",
  "audioVariant": "energetic-120bpm",
  "contentId": "qt-2026-01-001",
  "batchId": "batch-01",
  "abTestGroup": "A"
}
```

### 4.2 A/B Testing Framework
```typescript
// ab-testing/ framework
interface ABTest {
  id: string;
  hypothesis: string;
  variants: {
    control: VideoConfig;
    treatment: VideoConfig;
  };
  metrics: ['views', 'engagement', 'completionRate'];
}

// Example test: Does 15s vs 30s QuickTip perform better?
const durationTest: ABTest = {
  id: 'quicktip-duration-001',
  hypothesis: '15s videos have higher completion than 30s',
  variants: {
    control: { template: 'QuickTip', duration: 30 },
    treatment: { template: 'QuickTip', duration: 15 },
  },
};
```

### 4.3 Performance Dashboard
Create a simple dashboard to track:
- Render success/failure rates
- Average render time per template
- Most used templates
- Content performance (manual entry or TikTok API integration)

---

## Phase 5: Performance & Developer Experience

### 5.1 Parallel Rendering
```typescript
// batch-render.mjs - Current: sequential
// Target: parallel with concurrency control
const CONCURRENCY = 3;
const queue = new PQueue({ concurrency: CONCURRENCY });

for (const video of videos) {
  queue.add(() => renderVideo(video));
}
```

### 5.2 Incremental Rendering
Only re-render videos whose content has changed:
```typescript
// Cache based on content hash
const contentHash = hash(JSON.stringify(videoProps));
if (fs.existsSync(`out/cache/${contentHash}.mp4`)) {
  console.log('Cache hit, skipping render');
  continue;
}
```

### 5.3 Preview Mode
Fast preview for content review before full render:
```bash
# Low quality, fast render for review
npm run preview -- --quality=low --duration=5
```

### 5.4 Development Hot Reload
```typescript
// Watch content files and auto-refresh preview
chokidar.watch('content/**/*.json').on('change', () => {
  restartPreview();
});
```

### 5.5 Type Safety Improvements
```typescript
// Full type coverage for all content
interface VideoContentMap {
  QuickTip: QuickTipContent;
  Mythbusting: MythbustingContent;
  Educational: EducationalContent;
  Trending: TrendingContent;
}

type VideoType = keyof VideoContentMap;

function renderVideo<T extends VideoType>(
  type: T,
  content: VideoContentMap[T]
): Promise<RenderedVideo>;
```

---

## 🚀 Quick Wins (Do These First)

1. **Consolidate test files** → Clean up Root.tsx
2. **Add content validation** → Prevent TikTok violations before render
3. **Create audio preset system** → Better audio than single track
4. **Add progress indicators** → Better UX during batch renders
5. **Create content templates** → Faster content creation

---

## 📈 Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Videos per batch | 10 | 50+ |
| Render time per video | ~1.5 min | <1 min |
| Manual steps per video | 5+ | 1-2 |
| Content creation time | 30 min/video | 10 min/video |
| Failed renders | Unknown | <2% |

---

*Plan created: 2026-01-29*
*Review quarterly for updates*
