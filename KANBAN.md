# BILAN Video Production Kanban

## ✅ Done

- [x] Set up Remotion project
- [x] Create brand.ts with BILAN colors and fonts
- [x] Create 4 video templates (QuickTip, Mythbusting, Educational, Trending)
- [x] Create batch render scripts
- [x] Connect Google Drive via rclone
- [x] Fix logo fade-out (only one logo at a time)
- [x] Update QuickTip template with chunky labels + shadows
- [x] Increase top logo size (550px) + add shadow
- [x] Delete old renders
- [x] **Phase 1 Audio Implementation Complete**
  - [x] Create audio folder structure (public/audio/music/)
  - [x] Add background music to QuickTip template
  - [x] Add background music to Mythbusting template
  - [x] Add background music to Educational template
  - [x] Add background music to Trending template
  - [x] Update MasterVideo wrapper to include audio
  - [x] Test video rendering with audio (test-audio-quicktip.mp4 ✅)

## 🔄 In Progress

- [ ] Review all 10 videos
- [ ] Prepare for TikTok posting

## 📋 TODO Plan - System Improvements

### 🔴 High Priority (Quick Wins)

**Code Cleanup & Consistency**
- [ ] Consolidate 5 QuickTipVideo-test*.tsx files into single component with `audioVariant` prop
- [x] Fix brand name consistency - change "BILAN" to "bilan" in Root.tsx default props
- [ ] Unify batch-render.mjs and batch-render-master.mjs into single script with CLI flags
- [ ] Archive test videos to `archive/` folder

**Content Validation**
- [ ] Create `utils/validate-content.ts` for TikTok compliance checking
- [ ] Add medical claims detection (prevent "cures", "treats", "heals")
- [ ] Add brand name validator (enforce lowercase "bilan")
- [ ] Add duration validation (content vs target duration check)

### 🟡 Medium Priority (Audio & Performance)

**Audio System Enhancement**
- [ ] Create template-specific audio library structure:
  - `public/audio/music/quicktip/` - energetic tracks (120-140 BPM)
  - `public/audio/music/mythbusting/` - dramatic tension tracks
  - `public/audio/music/educational/` - calm ambient tracks
  - `public/audio/music/trending/` - viral beats
- [ ] Create `config/audio.ts` with audio presets per template
- [ ] Add sound effects: whoosh-in, pop, ding for transitions
- [ ] Implement audio variant selector in templates

**Performance & Scalability**
- [ ] Add parallel rendering with concurrency control (PQueue)
- [ ] Implement incremental rendering with content hash cache
- [ ] Add render progress indicators for batch operations
- [ ] Add retry logic for failed renders

**Developer Experience**
- [ ] Create `BaseTemplate.tsx` to share common patterns (logo, audio, brand bar)
- [ ] Add full type coverage with `VideoContentMap` discriminated union
- [ ] Add hot reload for content files (chokidar watch)

### 🟢 Low Priority (Advanced Features)

**Analytics & A/B Testing**
- [ ] Embed tracking metadata in video exports (version, template, audioVariant, abTestGroup)
- [ ] Create A/B test configuration framework in `ab-testing/`
- [ ] Build simple performance dashboard (render times, success rates)

**Content Pipeline**
- [ ] Support multiple input formats (JSON, Google Sheets API, Notion)
- [ ] Implement dynamic duration calculation based on word count
- [ ] Create template preview system (3-second low-quality preview)
- [ ] Add content calendar integration for seasonal topics

**File Organization**
- [ ] Restructure templates into folders:
  ```
  src/templates/
    ├── base/BaseTemplate.tsx
    ├── QuickTip/index.tsx, variants.ts, types.ts
    ├── Mythbusting/
    ├── Educational/
    └── Trending/
  ```
- [ ] Organize content by batch:
  ```
  content/
    ├── batch-01/
    ├── batch-02/
    └── templates/
  ```

## ✅ Recently Completed

- [x] Update MythbustingVideo template with chunky style ✅
- [x] Update EducationalVideo template with chunky style ✅
- [x] Update TrendingVideo template with chunky style ✅
- [x] Re-render all 10 videos with new style ✅
- [x] Upload final videos to Google Drive ✅
- [x] Create BrandIntro component (logo animation + tagline) ✅
- [x] Create BrandOutro component (CTA + handle + social prompts) ✅
- [x] Create MasterVideo wrapper (auto-stitches intro/content/outro) ✅
- [x] Render example MasterQuickTip with intro/outro ✅
- [x] Add "hidratación inteligente" tagline to BrandOutro ✅
- [x] Change label badges to green (`accentGreen`) for contrast on blue bg ✅
- [x] Add `accentGreen` color to brand.ts ✅
- [x] Document brand guidelines in KANBAN.md ✅
- [x] Create BILAN-VIDEO-GUIDELINES.md (master reference doc) ✅
- [x] Create TIKTOK-GUIDELINES.md (compliance rules) ✅
- [x] Fix salt video for TikTok compliance (01-verdad-sal-v3.mp4) ✅
- [x] Create 4 new TikTok-compliant content JSON files ✅

## 🔊 Audio Implementation Plan

### Phase 1: Minimum Viable Audio (Current)

- **Goal:** Add background music to all video templates
- **Implementation:** Single neutral background track per template type
- **Files:** `background-music.mp3` (30-60 seconds, loopable)
- **Volume:** 25-30% (background, not overpowering)

### Phase 2: Content-Specific Audio

- **QuickTip:** Upbeat, energetic music
- **Mythbusting:** Dramatic tension-building tracks
- **Educational:** Calm, focused ambient music
- **Trending:** Current TikTok trending sounds

### Phase 3: Voiceovers

- AI-generated voiceovers synchronized with text sections
- Separate audio files per content section
- Professional Spanish voice for brand consistency

### Phase 4: Sound Effects

- Whoosh sounds for text transitions
- Ding/achievement sounds for key points
- Subtle emphasis sounds

### Technical Implementation

```typescript
// Audio component usage
<Audio
  src={staticFile('audio/music/ambient-loop.mp3')}
  loop={true}
  volume={0.3}
/>
```

**Audio Files Added:**

- `ambient-loop.mp3` - Background music for all templates
- Volume: 30% (background, not overpowering)
- Loop: Enabled for seamless playback

**Testing:**

- ✅ MasterQuickTip with audio rendered successfully (2.7MB)
- All 4 templates updated with background music
- MasterVideo wrapper includes audio for complete videos

## 📝 Notes

- Logo: 550px top, 750px CTA
- Labels: White text on colored pill background, 52-56px
- All text has drop shadows
- Top logo fades out before CTA appears

## 🎨 Brand Guidelines (IMPORTANT!)

- **Brand name:** Always "bilan" lowercase (never BILAN or Bilan)
- **Tagline:** "hidratación inteligente" (lowercase)
- **Background:** Blue (`#0066CC`)
- **Label badges:** Green (`#22c55e` / `brand.colors.accentGreen`) for contrast on blue
- **BrandOutro:** Shows tagline "hidratación inteligente" below logo
- **Semantic colors:** Keep red for ❌ (myth/antes), green for ✅ (truth/después)

## 🔄 Ready for Mass Production

- [x] Review final video quality and performance
- [x] **Setup production environment** ✅
  - [x] Configure API keys in `.env` file
  - [x] Add Moonshot Kimi API for AI content generation
  - [x] Set up environment variables for easy production access
- [ ] **Phase 2: Template-Specific Audio (Optional - Next Milestone)**
  - QuickTip: Upbeat, energetic music (120-140 BPM)
  - Mythbusting: Dramatic tension-building tracks (80-110 BPM)
  - Educational: Calm, focused ambient music (60-90 BPM)
  - Trending: Current TikTok trending sounds and remixes

## 🔧 Production Environment Setup

**✅ Environment Variables Configured:**

- **File:** `.env` (created for secure API key management)
- **Moonshot Kimi API:** `sk-kimi-***` (AI content generation ready)
- **Render Settings:** Quality high, volume 30%
- **Directory Structure:** Organized for mass production

**🎯 Production Ready:**

- All 4 templates have background music
- MasterVideo wrapper includes audio
- Test renders available for comparison
- API access for AI-assisted content creation

## 🔄 Ready for Mass Production

- [x] Review final video quality and performance
- [ ] **Phase 2: Template-Specific Audio (Optional - Next Milestone)**
  - QuickTip: Upbeat, energetic music (120-140 BPM)
  - Mythbusting: Dramatic tension-building tracks (80-110 BPM)
  - Educational: Calm, focused ambient music (60-90 BPM)
  - Trending: Current TikTok trending sounds and remixes

**🎯 Production Ready Status:**

- ✅ All 4 templates have background music
- ✅ MasterVideo wrapper includes audio
- ✅ Test renders archived for reference
- ✅ API access configured
- ✅ Environment variables documented
- ✅ KANBAN updated with production status

---

_Last updated: 2026-01-30_
