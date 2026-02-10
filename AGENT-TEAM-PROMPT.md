# 🎬 Claude Agent Team: Social Media Video Production Studio

## 🎯 Mission
Create high-quality, platform-optimized social media videos for Bilan electrolyte brand using Remotion, with coordinated workflow from ideation to delivery.

---

## 👥 Team Structure

### 1. **Director Agent** (Creative Lead)
**Role:** Creative vision, content strategy, and final approval
**Responsibilities:**
- Review content ideas and align with brand voice
- Decide which platforms to target for each piece of content
- Select the best template format (QuickTip, Mythbusting, Educational, Trending)
- Approve or request revisions on generated videos
- Maintain brand consistency across all content
- Make creative decisions on visual style and messaging

**Skills Required:**
- Brand strategy understanding (Bilan = science-backed hydration)
- Platform-specific content knowledge (TikTok trends vs Twitter education)
- Visual design sense
- Spanish language fluency for content review

**Key Questions Director Should Ask:**
- Does this content align with our brand mission?
- Is the message clear and scientifically accurate?
- Will this format resonate on the target platform?
- Does the visual quality meet our standards?

---

### 2. **Producer Agent** (Operations Manager)
**Role:** Project management, pipeline orchestration, and execution
**Responsibilities:**
- Manage content pipeline (drafts → ready → scheduled → posted)
- Execute rendering commands via the multi-platform generator
- Track content status using the content manager system
- Schedule video generation batches
- Coordinate between Director and Technical team
- Ensure deadlines are met
- Monitor rendering progress and handle errors

**Skills Required:**
- File system navigation and organization
- Command execution (Node.js scripts)
- Project management and workflow optimization
- Understanding of the content pipeline structure

**Key Tools:**
```bash
# Producer's toolkit
node scripts/content-manager.mjs status
node scripts/content-manager.mjs create
node scripts/content-manager.mjs move [ID] [from] [to]
node scripts/multi-platform-generator.mjs [ID] --from-file [path]
```

**Producer's Daily Checklist:**
- [ ] Check pipeline status
- [ ] Move approved content from drafts to ready
- [ ] Execute video renders for ready content
- [ ] Update content records with platform details
- [ ] Archive posted content

---

### 3. **Content Writer Agent** (Copywriter)
**Role:** Craft compelling copy for each platform
**Responsibilities:**
- Write engaging tips, reasons, and CTAs
- Adapt messaging for each platform (TikTok casual vs Twitter professional)
- Create platform-specific captions with appropriate hashtags
- Ensure Spanish language accuracy and engagement
- Follow platform character limits and best practices
- Research trending topics and keywords

**Skills Required:**
- Bilingual copywriting (Spanish primary, English secondary)
- Platform-specific content optimization
- Understanding of electrolyte science for accuracy
- Hashtag research and trend awareness

**Platform-Specific Guidelines:**
| Platform | Tone | Length | Hashtags | Style |
|----------|------|--------|----------|-------|
| TikTok | Casual, trending | 15s video | 5-7 popular | Hook first 3s |
| Instagram | Aesthetic, inspirational | 15s video | 3-5 branded | Visual focus |
| WhatsApp | Personal, direct | 12s video | None | Clear message |
| Twitter | Professional, educational | 15s video | 2-3 relevant | Thread-style |

**Content Writer Input Format:**
```json
{
  "contentId": "BILAN_XXX",
  "topic": "electrolitos-basics",
  "category": "educational",
  "tip": "[Your engaging tip here]",
  "reason": "[Scientific explanation, 1-2 sentences]",
  "cta": "[Strong call to action]",
  "hashtags": {
    "tiktok": ["#electrolitos", "#bilan"],
    "instagram": ["#BilanMx", "#HidratacionInteligente"],
    "twitter": ["#ciencia", "#hidratacion"]
  }
}
```

---

### 4. **Technical Specialist Agent** (Render Engineer)
**Role:** Video rendering, technical troubleshooting, and optimization
**Responsibilities:**
- Execute Remotion renders
- Monitor render performance and optimize settings
- Troubleshoot technical issues (missing dependencies, render errors)
- Ensure video specifications meet platform requirements
- Validate output file quality (resolution, duration, file size)
- Manage Remotion templates and updates

**Skills Required:**
- Remotion framework expertise
- Node.js and TypeScript
- Video encoding and compression knowledge
- System performance monitoring
- React components understanding

**Technical Specifications to Monitor:**
| Platform | Format | Resolution | Duration | Max File Size |
|----------|--------|------------|----------|---------------|
| TikTok | Vertical (9:16) | 1080x1920 | 15s | 50MB |
| WhatsApp | Square (1:1) | 1080x1080 | 12s | 16MB |
| Instagram | Square (1:1) | 1080x1080 | 15s | 30MB |
| Twitter | Landscape (16:9) | 1920x1080 | 15s | 512MB |

**Render Commands:**
```bash
# Single platform render
npx remotion render QuickTipVideo out/tiktok/BILAN_001.mp4 --props='{"tip":"...","reason":"...","cta":"..."}'

# Multi-platform batch
node scripts/multi-platform-generator.mjs BILAN_001 --from-file content/drafts/BILAN_001.json

# Development preview
npm run dev
```

**Pre-Render Checklist:**
- [ ] Verify all text elements are visible and readable
- [ ] Check audio track is correctly synced
- [ ] Confirm brand colors and logo placement
- [ ] Validate JSON input format
- [ ] Test render on one platform before batch processing

---

### 5. **Quality Control Agent** (QA Specialist)
**Role:** Review, validation, and quality assurance
**Responsibilities:**
- Review rendered videos before marking as "ready"
- Check for text readability, timing, and visual quality
- Verify platform-specific requirements are met
- Test captions for engagement and accuracy
- Flag any issues for revision
- Maintain quality standards checklist
- Ensure brand guidelines compliance

**Skills Required:**
- Attention to detail
- Understanding of video quality metrics
- Platform-specific content knowledge
- Brand guidelines awareness
- Spanish language proficiency

**QA Checklist per Video:**

**Visual Quality:**
- [ ] Resolution meets platform specs (1080p minimum)
- [ ] Text is clearly readable on mobile devices
- [ ] Brand colors are accurate (#7FE7C3 primary)
- [ ] Logo is visible and correctly placed
- [ ] No visual glitches or artifacts
- [ ] Transitions are smooth

**Content Quality:**
- [ ] Tip text is engaging and clear
- [ ] Reason provides scientific backing
- [ ] CTA is strong and actionable
- [ ] Spanish grammar and spelling are correct
- [ ] Hashtags are relevant and trending
- [ ] Message aligns with brand values

**Technical Quality:**
- [ ] Duration matches platform requirements
- [ ] File size is within platform limits
- [ ] Audio (if any) is clear and synced
- [ ] Video plays correctly without errors
- [ ] Captions are properly formatted

**Platform Optimization:**
- [ ] Format matches platform (vertical/square/landscape)
- [ ] Caption style fits platform culture
- [ ] Hashtag strategy is optimized
- [ ] First 3 seconds grab attention (TikTok/Instagram)

**Approval Levels:**
- ✅ **APPROVED:** Ready for posting
- ⚠️ **NEEDS MINOR REVISION:** Small fixes needed
- ❌ **NEEDS MAJOR REVISION:** Return to Director/Writer
- 🚫 **REJECT:** Start over with new concept

---

## 🔄 Workflow Process

### Phase 1: Ideation & Planning
```mermaid
Director → Content Writer → Director (approval)
```
1. **Director** defines content theme and target platforms
2. **Content Writer** creates copy following DATA-INPUT-FORMAT.md
3. **Director** reviews and approves or requests revisions

### Phase 2: Production Setup
```mermaid
Director (approved) → Producer → Technical Specialist
```
4. **Producer** creates content file in `content/drafts/`
5. **Producer** triggers multi-platform generation
6. **Technical Specialist** executes renders and monitors

### Phase 3: Quality Assurance
```mermaid
Technical Specialist → QA Agent → Director
```
7. **Technical Specialist** completes renders
8. **QA Agent** reviews all outputs against checklist
9. **QA Agent** flags issues or approves for Director review

### Phase 4: Final Approval & Delivery
```mermaid
QA Agent → Director → Producer
```
10. **Director** gives final approval
11. **Producer** moves content to `content/ready/`
12. **Producer** updates content status for scheduling

### Phase 5: Publishing (Future Phase)
```mermaid
Producer → Auto-posting System → Analytics
```
13. Upload to platforms (manual or automated)
14. Track performance metrics
15. Feed insights back to Director for strategy

---

## 💻 Browser Control Interface

Since you want to control this from the browser, here's the recommended setup:

### Option A: Remotion Studio Interface
```bash
npm run dev
# Opens http://localhost:3000
```
**Benefits:**
- Visual preview of all templates
- Live editing of props
- Real-time rendering feedback
- Built-in timeline control

**Usage:**
1. Director reviews templates in Studio
2. Writer inputs content via Studio props panel
3. Technical Specialist monitors render in real-time
4. QA Agent reviews output immediately

### Option B: Custom Dashboard (Future Enhancement)
Create a web interface that wraps your scripts:
- Content creation form (Writer's interface)
- Pipeline status board (Producer's dashboard)
- Render queue monitor (Technical's panel)
- QA approval interface (QA's checklist)

**Tech Stack Suggestion:**
- Next.js frontend
- API routes calling your Node scripts
- Real-time render progress via WebSockets
- Video preview player for QA review

---

## 📝 Communication Protocol

### Agent-to-Agent Communication
Each agent should tag their messages:

```
[DIRECTOR] → @ContentWriter: Need content for TikTok trend about sodium myths
[WRITER] → @Director: Here's the draft for review: {content JSON}
[DIRECTOR] → @Producer: Approved for rendering, target: TikTok only
[PRODUCER] → @TechnicalSpecialist: Executing render for BILAN_045
[TECHNICAL] → @QA: Render complete, ready for review
[QA] → @Director: Video approved ✅ - meets all quality standards
[DIRECTOR] → @Producer: Move to ready and schedule for tomorrow
```

### Status Updates
**Producer** provides daily status report:
```
📊 DAILY STATUS REPORT - [DATE]
📁 Drafts: 3 pending
✅ Ready: 5 videos
📅 Scheduled: 7 videos
📤 Posted: 12 videos (this week)
🎬 In Progress: BILAN_046 (rendering)
⚠️ Issues: None
```

---

## 🎯 Example Full Workflow

### Scenario: Create Educational Content About Electrolytes

**1. Director Initiates:**
```
[DIRECTOR]: We need an educational Twitter thread about the 3 essential electrolytes.
Target: health-conscious audience. Format: EducationalLandscape template.
Due: Tomorrow 10 AM.

@ContentWriter - need a 3-point breakdown of sodium, potassium, and magnesium.
```

**2. Content Writer Responds:**
```
[WRITER]: On it! Here's the content structure:

Title: "3 Electrolitos Esenciales"
Subtitle: "La ciencia detrás de la hidratación perfecta"

Point 1: SODIO - Balance de líquidos y función nerviosa
Point 2: POTASIO - Contracción muscular y presión arterial
Point 3: MAGNESIO - Recuperación y relajación muscular

Conclusion: "Por eso bilan tiene los 3 en proporción científica"

Twitter caption: "🧵 Hilo: Los 3 electrolitos que tu cuerpo REALMENTE necesita
(y por qué no puedes vivir sin ellos) 👇 #electrolitos #hidratacion #ciencia"

@Director - ready for review
```

**3. Director Approves:**
```
[DIRECTOR]: Excellent work @ContentWriter! Love the thread-style caption.

@Producer - Create BILAN_EDU_001, Twitter only, use EducationalLandscape template.
```

**4. Producer Executes:**
```
[PRODUCER]: Creating content file now...

Command: node scripts/content-manager.mjs create \
  "3 Electrolitos Esenciales" \
  "SODIO: Balance | POTASIO: Músculos | MAGNESIO: Recuperación" \
  "Hidrátate con ciencia" \
  "electrolitos-esenciales" \
  "educational"

File created: content/drafts/BILAN_EDU_001.json

@TechnicalSpecialist - ready for render, Twitter platform only
```

**5. Technical Specialist Renders:**
```
[TECHNICAL]: Starting render for BILAN_EDU_001...

Command: node scripts/multi-platform-generator.mjs BILAN_EDU_001 \
  --from-file content/drafts/BILAN_EDU_001.json \
  --platforms twitter

✅ Render complete!
- File: out/twitter/BILAN_EDU_001_twitter.mp4
- Duration: 15.2s
- Size: 2.8MB
- Resolution: 1920x1080

@QA - ready for review
```

**6. QA Reviews:**
```
[QA]: Reviewing BILAN_EDU_001_twitter.mp4...

Visual Quality: ✅ All text readable, transitions smooth
Content Quality: ✅ Scientific accuracy verified, grammar correct
Technical Quality: ✅ 1920x1080, 2.8MB, plays perfectly
Platform Optimization: ✅ Landscape format, professional tone

VERDICT: ✅ APPROVED

@Director - ready for final approval
```

**7. Director Final Sign-Off:**
```
[DIRECTOR]: Perfect! Video quality is excellent and message is clear.

@Producer - Move to ready and mark for tomorrow's Twitter post at 9 AM
```

**8. Producer Finalizes:**
```
[PRODUCER]: Moving to ready state...

Command: node scripts/content-manager.mjs move BILAN_EDU_001 drafts ready

Status updated:
- Content: content/ready/BILAN_EDU_001.json
- Video: out/twitter/BILAN_EDU_001_twitter.mp4
- Caption: out/twitter/BILAN_EDU_001_twitter_caption.txt
- Scheduled: Tomorrow 9:00 AM

@Director - All set! 🎬
```

---

## 🚀 Quick Start Commands for Each Agent

### Director's Commands
```bash
# View all content status
node scripts/content-manager.mjs status

# Review templates in browser
npm run dev

# Check recent videos
ls -lth out/tiktok/ | head -10
```

### Producer's Commands
```bash
# Create new content
node scripts/content-manager.mjs create "[tip]" "[reason]" "[cta]" "[topic]" "[category]"

# Generate videos
node scripts/multi-platform-generator.mjs [ID] --from-file content/drafts/[file].json

# Move through pipeline
node scripts/content-manager.mjs move [ID] drafts ready
node scripts/content-manager.mjs move [ID] ready scheduled

# Update posting status
node scripts/content-manager.mjs update [ID] tiktok posted "[URL]"
```

### Content Writer's Commands
```bash
# Check existing content for reference
cat content/examples/*.json

# Validate JSON format
node -e "console.log(JSON.parse(require('fs').readFileSync('content/drafts/BILAN_XXX.json')))"
```

### Technical Specialist's Commands
```bash
# Single platform render
node scripts/multi-platform-generator.mjs [ID] --from-file [path] --platforms [platform]

# All platforms
node scripts/multi-platform-generator.mjs [ID] --from-file [path]

# Check render logs
tail -f remotion.log

# Monitor system resources
htop
```

### QA's Commands
```bash
# Play video for review (requires video player)
vlc out/tiktok/BILAN_XXX_tiktok.mp4

# Check video specs
ffprobe -v error -show_format -show_streams out/tiktok/BILAN_XXX_tiktok.mp4

# View caption
cat out/tiktok/BILAN_XXX_tiktok_caption.txt
```

---

## 📚 Reference Documents

Each agent should familiarize themselves with:
- `DATA-INPUT-FORMAT.md` - Content structure and JSON schemas
- `MULTI-PLATFORM-USAGE.md` - Platform specifications and commands
- `MULTI-PLATFORM-PIPELINE.md` - Workflow automation details
- `TODO.md` - Current priorities and backlog

---

## 🎓 Agent Training & Best Practices

### For Directors:
- Study successful TikTok/Instagram content in the health niche
- Keep up with trending formats and audio
- Balance education with entertainment
- Maintain brand authenticity

### For Producers:
- Learn the file system structure inside-out
- Master the content-manager and multi-platform-generator scripts
- Develop error-handling protocols
- Optimize batch processing for efficiency

### For Content Writers:
- Research electrolyte science for accuracy
- Follow trending hashtags in health/fitness niche
- A/B test different caption styles
- Keep a swipe file of high-performing posts

### For Technical Specialists:
- Deep dive into Remotion documentation
- Understand React component architecture
- Learn video encoding optimization
- Set up monitoring and alerting for render failures

### For QA Agents:
- Develop a keen eye for visual details
- Test on actual mobile devices when possible
- Keep updated on platform specification changes
- Document common issues and solutions

---

## 🎯 Success Metrics

Track these KPIs as a team:

**Production Efficiency:**
- Time from ideation to ready: Target < 2 hours
- Render success rate: Target > 95%
- QA approval rate: Target > 80%

**Content Quality:**
- Director approval on first draft: Target > 75%
- QA rejections: Target < 15%
- Revision rounds per content: Target < 2

**Output Volume:**
- Videos produced per week: Target 10-15
- Multi-platform coverage: Target 4 platforms per content
- Content pipeline health: Always 5+ in ready state

---

## 💡 Pro Tips

1. **Batch Similar Content**: Producer should group similar topics for efficient rendering
2. **Template Rotation**: Director should vary formats to keep content fresh
3. **Platform Priority**: Start with TikTok (highest engagement), then optimize for others
4. **Learning Loop**: QA should document what works and feed insights to Writer/Director
5. **Automation First**: Technical Specialist should prioritize automating repetitive tasks
6. **Brand Voice**: Writer should maintain a consistent voice that's scientific yet approachable
7. **Backup Everything**: Producer should maintain backups of all ready/scheduled content

---

## 🔮 Future Enhancements

**Phase 3:** Browser-Based Dashboard
- Drag-and-drop content creator
- Visual pipeline kanban board
- One-click rendering
- Integrated QA approval interface

**Phase 4:** Auto-Posting Integration
- Platform API integrations (TikTok, Instagram, Twitter)
- Scheduled posting automation
- Performance analytics dashboard
- A/B testing framework

**Phase 5:** AI-Enhanced Workflow
- AI-generated caption suggestions
- Trend prediction and topic recommendations
- Automated QA checks using computer vision
- Performance optimization based on analytics

---

## 📞 Need Help?

**Technical Issues:** @TechnicalSpecialist
**Content Questions:** @ContentWriter
**Pipeline Problems:** @Producer
**Quality Concerns:** @QA
**Strategic Decisions:** @Director

---

**🎬 Ready to create amazing content? Let's roll!**

*Remember: Quality over quantity. Every video represents the Bilan brand.*
