# BILAN Video Project - TODO

> Central task tracking for the BILAN video generation project. Last updated: 2026-02-05

---

## 🎯 Current Focus

**Status:** Production Ready ✅

- All 4 templates working (QuickTip, Mythbusting, Educational, Trending)
- Background music implemented (60% volume)
- Batch renderer with progress bars and TikTok captions
- 6 videos rendered and ready for posting

---

## ✅ Recently Completed

- [x] **Audio System**
  - [x] Add background music to all templates
  - [x] Remove duplicate Audio components (centralized in MasterVideo)
  - [x] Increase volume from 30% to 60%
  - [x] Add `audioTrack` field to content files for per-video music selection
- [x] **Batch Renderer Improvements**
  - [x] Add progress bars with percentage
  - [x] Track render time per video
  - [x] Calculate and display ETA
  - [x] Show audio track name during render
  - [x] Display TikTok captions in boxed format for easy copy-paste
  - [x] Save detailed JSON logs

- [x] **Brand Consistency**
  - [x] Fix brand name to lowercase "bilan"
  - [x] Update all chunky labels to green (#22c55e) for contrast
  - [x] Ensure proper logo sizing (550px top, 750px CTA)

---

## 📋 Active Tasks

### 🔴 High Priority

**Content Production**

- [ ] Review all 6 rendered videos for quality
- [ ] Post videos to TikTok with provided captions
- [ ] Create more content variations (Batch 02)

**Code Quality**

- [ ] Consolidate 5 QuickTipVideo-test\*.tsx files into single component
- [ ] Unify batch-render.mjs and batch-render-master.mjs into single script
- [ ] Add proper TypeScript types to MasterVideo contentProps

### 🟡 Medium Priority

**Audio Enhancement**

- [ ] Create template-specific audio folders (quicktip/, mythbusting/, etc.)
- [ ] Add sound effects (whoosh, pop, ding) for transitions
- [ ] Create audio preset configuration file

**Content Management**

- [ ] Add content validation (medical claims detection, brand name check)
- [ ] Create content template system for faster video creation
- [ ] Add support for Google Sheets as content source

**Performance**

- [ ] Implement parallel rendering with PQueue
- [ ] Add incremental rendering with content hash cache
- [ ] Add retry logic for failed renders

### 🟢 Low Priority

**Analytics & A/B Testing**

- [ ] Embed tracking metadata in video exports
- [ ] Create A/B test configuration framework
- [ ] Build performance dashboard

**Advanced Features**

- [ ] Add voiceover support (AI-generated)
- [ ] Implement dynamic duration based on word count
- [ ] Create template preview system (3-second low-quality)

---

## 🎬 Content Pipeline Status

### Batch 01 - Complete ✅

| Video                  | Template    | Audio Track                | Status      |
| ---------------------- | ----------- | -------------------------- | ----------- |
| quicktip_01            | QuickTip    | ambient-quick-start.mp3    | ✅ Rendered |
| quicktip_02            | QuickTip    | electro-drone-ambient.mp3  | ✅ Rendered |
| quicktip_03            | QuickTip    | dreamy-ambient-loop.mp3    | ✅ Rendered |
| myth_01                | Mythbusting | ambient-music-loop-118.mp3 | ✅ Rendered |
| myth_04_trampa_bebidas | Mythbusting | flashlight-ambient.mp3     | ✅ Rendered |
| myth_sal_v2            | Mythbusting | ambient-loop.mp3           | ✅ Rendered |

**Location:** `out/batch-01/`

### Batch 02 - Planning

- [ ] Plan 6-10 new videos
- [ ] Create content JSON files
- [ ] Assign unique audio tracks

---

## 🔧 Technical Debt

1. **TypeScript Issues**
   - MasterVideo.tsx has `any` type for contentProps
   - Some unused variables in templates
   - Missing discriminated union for VideoContentMap

2. **File Organization**
   - Test files need archiving
   - Duplicate batch render scripts
   - Content folder has old malformed JSON files

3. **Code Duplication**
   - Logo animation code repeated across templates
   - Audio component was duplicated (now fixed in MasterVideo)
   - Brand bar code repeated

---

## 🎵 Audio Library

**Available Tracks:** `public/audio/music/`

- `ambient-loop.mp3` - Default, calm background
- `ambient-quick-start.mp3` - Energetic, good for QuickTips
- `ambient-music-loop-118.mp3` - Neutral, good for Mythbusting
- `dreamy-ambient-loop.mp3` - Calm, good for morning tips
- `electro-drone-ambient.mp3` - Modern, good for fitness content
- `flashlight-ambient.mp3` - Bright, good for myth debunking

**Usage:** Add `"audioTrack": "filename.mp3"` to content JSON files

---

## 📱 TikTok Posting Checklist

For each video:

- [ ] Upload video from `out/batch-01/`
- [ ] Copy caption from render output (shown after each video)
- [ ] Add relevant hashtags (already in caption)
- [ ] Set cover frame (usually the hook text)
- [ ] Post at optimal time (check analytics)
- [ ] Cross-post to Instagram Reels if desired

---

## 🚀 Quick Commands

```bash
# Render all videos
node batch-render-master.mjs

# Render specific content directory
CONTENT_DIR=content/batch-02 node batch-render-master.mjs

# Check render logs
cat out/batch-01/render-log.json | jq

# Preview in browser
npm run dev
```

---

## 📚 Documentation

- **AGENTS.md** - Project overview and guidelines for AI assistants
- **BILAN-VIDEO-GUIDELINES.md** - Master brand reference
- **TIKTOK-GUIDELINES.md** - TikTok compliance rules
- **PROPS_GUIDE.md** - Template props documentation
- **IMPROVEMENT-PLAN.md** - Detailed improvement roadmap
- **MOMENTUM-LOOP-GUIDE.md** - Content strategy (30 video scripts)

---

## 💡 Ideas for Future Content

From MOMENTUM-LOOP-GUIDE.md:

- Debunking hydration myths (caffeine, salt, 8 glasses)
- Hidden dehydration signals (bad breath, headaches)
- Sports drink comparisons
- Athlete hydration secrets
- POV scenarios (forgetting water, being that person)
- Tutorials (proper hydration, signs to look for)
- Morning/evening routines

---

_Last updated: 2026-02-05_
_Next review: When Batch 02 planning starts_
