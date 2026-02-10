# 📝 Example Workflow - Creating Content with the Agent Team

This document shows a complete example of how to use the Agent Team System to create a video from start to finish.

## 🎯 Scenario: Create Educational TikTok Content About Electrolytes

Let's walk through creating a video about "Los 3 Electrolitos Esenciales" for TikTok.

---

## Phase 1: Check Team Status

**Who:** Any team member
**Action:** See current pipeline status

```bash
node agents/team-status.mjs
```

**Output:**
```
📊 CONTENT PIPELINE STATUS
  📁 Drafts: 1 pieces (awaiting Director approval)
  ✅ Ready: 7 pieces (approved for render)
  📅 Scheduled: 28 pieces (rendered, ready to post)
```

---

## Phase 2: Director Initiates Request

**Who:** Director (You or AI acting as Director)

### Load Director Persona
```bash
node agents/agent-launcher.mjs director
```

### Director's Request
```
[DIRECTOR] → @ContentWriter:

We need educational TikTok content about the 3 essential electrolytes.

Target audience: Health-conscious 18-35 year olds
Platform: TikTok (primary), Instagram (secondary)
Format: QuickTip template (15 seconds)
Tone: Casual but scientifically backed
Due: Today

Please create content following DATA-INPUT-FORMAT.md
```

---

## Phase 3: Content Writer Creates Copy

**Who:** Content Writer (You or AI acting as Writer)

### Load Writer Persona
```bash
node agents/agent-launcher.mjs writer
```

### Writer Creates Content

Create file: `content/drafts/BILAN_EDU_003.json`

```json
{
  "contentId": "BILAN_EDU_003",
  "topic": "electrolitos-esenciales",
  "category": "educational",
  "tip": "💡 Los 3 electrolitos que tu cuerpo REALMENTE necesita",
  "reason": "Sodio para hidratación, Potasio para músculos, y Magnesio para recuperación. Juntos mantienen tu cuerpo en balance perfecto.",
  "cta": "Hidrátate con ciencia 💧 bilan.mx",
  "hashtags": {
    "tiktok": ["#electrolitos", "#hidratacion", "#bilan", "#ciencia", "#saludable"],
    "instagram": ["#BilanMx", "#HidratacionInteligente", "#Electrolitos"],
    "twitter": ["#ciencia", "#hidratacion", "#electrolitos"]
  },
  "platforms": ["tiktok", "instagram"]
}
```

### Writer's Response
```
[WRITER] → @Director:

Content ready for review: BILAN_EDU_003

Topic: Los 3 electrolitos esenciales
Format: QuickTip (15s)
Platforms: TikTok, Instagram

Content draft created at: content/drafts/BILAN_EDU_003.json

Key points:
- Hook focuses on "REALMENTE necesitas" (attention-grabbing)
- Explains all 3 electrolytes briefly
- Scientific but accessible language
- Strong CTA with brand mention
- Trending hashtags for TikTok discovery

Ready for your approval.
```

---

## Phase 4: Director Reviews and Approves

**Who:** Director

### Director's Review
```
[DIRECTOR] → @ContentWriter:

Reviewed BILAN_EDU_003 ✅

Feedback:
✅ Hook is strong and engaging
✅ Scientific accuracy confirmed
✅ Hashtag strategy is solid
✅ Tone is perfect for TikTok

APPROVED for production.

@Producer - Please create and render for TikTok and Instagram.
```

---

## Phase 5: Producer Executes Production

**Who:** Producer (You or AI acting as Producer)

### Load Producer Persona
```bash
node agents/agent-launcher.mjs producer
```

### Producer's Actions

#### 1. Verify content file exists
```bash
cat content/drafts/BILAN_EDU_003.json
```

#### 2. Trigger multi-platform generation
```bash
node scripts/multi-platform-generator.mjs BILAN_EDU_003 \
  --from-file content/drafts/BILAN_EDU_003.json \
  --platforms tiktok,instagram
```

### Producer's Update
```
[PRODUCER] → @TechnicalSpecialist:

Executing render for BILAN_EDU_003

Platforms: TikTok, Instagram
Template: QuickTipVideo
Input: content/drafts/BILAN_EDU_003.json

Command initiated:
  node scripts/multi-platform-generator.mjs BILAN_EDU_003 \
    --from-file content/drafts/BILAN_EDU_003.json \
    --platforms tiktok,instagram

Monitoring render progress...
```

---

## Phase 6: Technical Specialist Monitors Render

**Who:** Technical Specialist (You or AI acting as Technical)

### Load Technical Persona
```bash
node agents/agent-launcher.mjs technical
```

### Technical Specialist Monitors

```bash
# Watch render progress
tail -f remotion.log

# Check system resources
htop
```

### Technical Specialist's Report
```
[TECHNICAL] → @Producer: Render progress update

BILAN_EDU_003 rendering status:
✅ TikTok version: Rendering... 45% complete
✅ Instagram version: Queued

Estimated completion: 2 minutes

No errors detected.
```

### When Complete
```
[TECHNICAL] → @QA:

Render complete for BILAN_EDU_003 ✅

Output files:
- out/tiktok/BILAN_EDU_003_tiktok.mp4 (2.4MB, 1080x1920, 15s)
- out/tiktok/BILAN_EDU_003_tiktok_caption.txt
- out/instagram/BILAN_EDU_003_instagram.mp4 (1.8MB, 1080x1080, 15s)
- out/instagram/BILAN_EDU_003_instagram_caption.txt

Technical specs verified:
✅ TikTok: 9:16 vertical, 1080x1920, 15.0s, 2.4MB (< 50MB limit)
✅ Instagram: 1:1 square, 1080x1080, 15.0s, 1.8MB (< 30MB limit)

Ready for QA review.
```

---

## Phase 7: QA Reviews Video

**Who:** QA Specialist (You or AI acting as QA)

### Load QA Persona
```bash
node agents/agent-launcher.mjs qa
```

### QA Review Process

#### 1. View videos
```bash
# Play TikTok version
vlc out/tiktok/BILAN_EDU_003_tiktok.mp4

# Play Instagram version
vlc out/instagram/BILAN_EDU_003_instagram.mp4
```

#### 2. Check technical specs
```bash
ffprobe -v error -show_format -show_streams out/tiktok/BILAN_EDU_003_tiktok.mp4
```

#### 3. Review captions
```bash
cat out/tiktok/BILAN_EDU_003_tiktok_caption.txt
cat out/instagram/BILAN_EDU_003_instagram_caption.txt
```

### QA Checklist Results

**Visual Quality:** ✅
- [x] Resolution: 1080x1920 (TikTok), 1080x1080 (Instagram)
- [x] Text clearly readable on mobile
- [x] Brand colors accurate
- [x] Logo visible and positioned correctly
- [x] No visual glitches
- [x] Smooth transitions

**Content Quality:** ✅
- [x] Tip text engaging and clear
- [x] Scientific backing provided
- [x] CTA is actionable
- [x] Spanish grammar perfect
- [x] Hashtags relevant
- [x] Brand voice consistent

**Technical Quality:** ✅
- [x] Duration: 15.0s (correct)
- [x] File sizes within limits
- [x] Video plays without errors
- [x] Captions properly formatted

**Platform Optimization:** ✅
- [x] TikTok: Vertical format, casual tone, trending hashtags
- [x] Instagram: Square format, aesthetic quality, branded hashtags
- [x] First 3 seconds grab attention

### QA's Report
```
[QA] → @Director:

QA Review Complete: BILAN_EDU_003 ✅ APPROVED

Platforms: TikTok, Instagram

Visual Quality: ✅ Excellent
  - Text is highly readable
  - Brand colors perfect
  - Logo placement ideal
  - Professional finish

Content Quality: ✅ Excellent
  - Hook is strong ("REALMENTE necesitas")
  - Science is accurate
  - Spanish grammar perfect
  - Hashtags well-selected

Technical Quality: ✅ Meets all specs
  - TikTok: 1080x1920, 15s, 2.4MB ✅
  - Instagram: 1080x1080, 15s, 1.8MB ✅

Platform Fit: ✅ Optimized
  - TikTok version will perform well (strong hook, trending style)
  - Instagram version has great aesthetic appeal

VERDICT: ✅ APPROVED - Ready for final Director sign-off

No revisions needed.
```

---

## Phase 8: Director Final Approval

**Who:** Director

### Director's Final Review
```
[DIRECTOR] → @QA:

Thank you for thorough review.

Final approval given for BILAN_EDU_003 ✅

Video quality is excellent. Message is clear and scientifically accurate.
Perfect for our target audience.

@Producer - Move to ready state and schedule for:
- TikTok: Tomorrow at 6 PM (peak engagement time)
- Instagram: Tomorrow at 7 PM (Reels feed optimization)
```

---

## Phase 9: Producer Finalizes

**Who:** Producer

### Producer's Final Actions

#### 1. Move content to ready
```bash
node scripts/content-manager.mjs move BILAN_EDU_003 drafts ready
```

#### 2. Update metadata
```bash
# Create scheduling metadata (example)
echo '{
  "scheduled_tiktok": "2026-02-11T18:00:00-06:00",
  "scheduled_instagram": "2026-02-11T19:00:00-06:00",
  "approved_by": "Director",
  "approved_date": "2026-02-10",
  "qa_approved": true
}' > content/ready/BILAN_EDU_003_metadata.json
```

### Producer's Status Update
```
[PRODUCER] → @Director:

BILAN_EDU_003 finalized ✅

Status updated:
- Content moved from drafts/ to ready/
- Videos ready for posting:
  - out/tiktok/BILAN_EDU_003_tiktok.mp4
  - out/instagram/BILAN_EDU_003_instagram.mp4
- Captions prepared with hashtags
- Scheduled:
  - TikTok: Tomorrow 6:00 PM
  - Instagram: Tomorrow 7:00 PM

Total production time: 1.5 hours (ideation to ready)

Pipeline updated:
📁 Drafts: 0 pieces
✅ Ready: 8 pieces
📅 Scheduled: 29 pieces

Team performance: ✅ On target

Excellent work team! 🎬
```

---

## Phase 10: Publishing (Future)

**Who:** Producer (manual) or Automated System (future)

### Manual Publishing Steps

#### TikTok:
1. Open TikTok app
2. Upload `out/tiktok/BILAN_EDU_003_tiktok.mp4`
3. Copy caption from `out/tiktok/BILAN_EDU_003_tiktok_caption.txt`
4. Add hashtags
5. Schedule for 6:00 PM tomorrow

#### Instagram:
1. Open Instagram app
2. Create Reel
3. Upload `out/instagram/BILAN_EDU_003_instagram.mp4`
4. Copy caption from `out/instagram/BILAN_EDU_003_instagram_caption.txt`
5. Add hashtags
6. Schedule for 7:00 PM tomorrow

### After Publishing
```bash
# Mark as posted
node scripts/content-manager.mjs update BILAN_EDU_003 tiktok posted "https://tiktok.com/@bilan.electrolitos/video/123456"
node scripts/content-manager.mjs update BILAN_EDU_003 instagram posted "https://instagram.com/p/ABC123"

# Move to posted archive
node scripts/content-manager.mjs move BILAN_EDU_003 ready posted
```

---

## 📊 Success Summary

**Production Metrics:**
- ⏱️ Time from ideation to ready: 1.5 hours ✅ (Target: < 2 hours)
- 🎯 First-draft approval: 100% ✅ (Target: > 75%)
- 🔄 Revision rounds: 0 ✅ (Target: < 2)
- ✅ QA approval rate: 100% ✅ (Target: > 80%)
- 📱 Platforms covered: 2 of 4 ✅

**Team Collaboration:**
- 👥 5 agents coordinated smoothly
- 💬 Clear communication throughout
- ✅ All quality checkpoints passed
- 🎬 Professional final output

---

## 💡 Key Takeaways

### What Worked Well:
1. **Clear communication** - Each agent tagged the next person in the workflow
2. **Detailed checklists** - QA caught everything before Director review
3. **Role clarity** - Each agent knew their responsibilities
4. **Documentation** - Easy to track decision-making process
5. **Quality focus** - Multiple checkpoints ensured excellence

### Best Practices Demonstrated:
1. Director set clear expectations upfront
2. Writer researched hashtags and used trending language
3. Technical Specialist validated specs proactively
4. QA provided detailed, constructive feedback
5. Producer kept everyone informed of progress

### For Next Time:
1. Consider A/B testing different hooks
2. Batch similar content for efficiency
3. Pre-schedule content earlier in the week
4. Track engagement metrics for optimization

---

## 🎓 Using This Workflow

### With Human Team:
1. Each person loads their agent persona
2. Follow the communication protocol
3. Use the commands specific to your role
4. Tag the next person when your work is done

### With AI Assistants:
1. Load agent persona into AI context
2. Ask AI to "act as [ROLE]"
3. Provide necessary information
4. AI will follow role guidelines and use appropriate tools

### Mixed Team (Human + AI):
1. Humans can act as any agent
2. Delegate specific agent roles to AI
3. Maintain communication protocol
4. Review AI output with human judgment

---

**🎬 This workflow can be adapted for any content type - QuickTips, Mythbusting, Educational, or Trending formats!**
