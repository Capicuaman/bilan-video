# 🎬 Bilan Agent Team System

This directory contains the **Agent Team System** for managing Bilan's social media video production workflow. The system organizes roles, responsibilities, and communication protocols for creating high-quality videos across multiple platforms.

## 📁 Directory Structure

```
agents/
├── README.md                  # This file - system overview
├── director.md                # Creative Lead persona
├── producer.md                # Operations Manager persona
├── writer.md                  # Copywriter persona
├── technical.md               # Render Engineer persona
├── qa.md                      # QA Specialist persona
├── agent-launcher.mjs         # Load agent personas
└── team-status.mjs            # View pipeline status dashboard
```

## 👥 Agent Roles

### 🎬 Director (Creative Lead)
**Focus:** Creative vision, brand consistency, final approval
- Reviews content ideas
- Selects templates and platforms
- Approves or requests revisions
- Maintains brand voice

**Load persona:** `node agents/agent-launcher.mjs director`

---

### 📊 Producer (Operations Manager)
**Focus:** Pipeline orchestration, execution, coordination
- Manages content pipeline (drafts → ready → scheduled → posted)
- Executes rendering commands
- Coordinates between team members
- Tracks deadlines and status

**Load persona:** `node agents/agent-launcher.mjs producer`

---

### ✍️ Content Writer (Copywriter)
**Focus:** Compelling Spanish-language copy for each platform
- Writes engaging tips, reasons, CTAs
- Creates platform-specific captions
- Researches trending hashtags
- Ensures scientific accuracy

**Load persona:** `node agents/agent-launcher.mjs writer`

---

### 🔧 Technical Specialist (Render Engineer)
**Focus:** Video rendering, troubleshooting, optimization
- Executes Remotion renders
- Monitors performance
- Troubleshoots technical issues
- Validates output quality

**Load persona:** `node agents/agent-launcher.mjs technical`

---

### ✅ QA Specialist (Quality Control)
**Focus:** Quality assurance, review, validation
- Reviews rendered videos
- Checks readability and quality
- Verifies platform requirements
- Flags issues for revision

**Load persona:** `node agents/agent-launcher.mjs qa`

## 🚀 Quick Start

### View Team Status
```bash
# See pipeline overview and agent responsibilities
node agents/team-status.mjs
```

### Load Agent Persona
```bash
# Load specific agent guidelines
node agents/agent-launcher.mjs director
node agents/agent-launcher.mjs producer
node agents/agent-launcher.mjs writer
node agents/agent-launcher.mjs technical
node agents/agent-launcher.mjs qa

# View all agents at once
node agents/agent-launcher.mjs all

# Show help
node agents/agent-launcher.mjs help
```

### Make Scripts Executable (Optional)
```bash
chmod +x agents/agent-launcher.mjs
chmod +x agents/team-status.mjs

# Then run without 'node' prefix
./agents/team-status.mjs
./agents/agent-launcher.mjs director
```

## 🔄 Workflow Overview

```
1. [DIRECTOR] defines content theme and platforms
                ↓
2. [WRITER] creates copy following guidelines
                ↓
3. [DIRECTOR] reviews and approves
                ↓
4. [PRODUCER] creates content file in drafts/
                ↓
5. [PRODUCER] triggers multi-platform generation
                ↓
6. [TECHNICAL] executes renders and monitors
                ↓
7. [TECHNICAL] completes renders
                ↓
8. [QA] reviews all outputs against checklist
                ↓
9. [QA] flags issues or approves for Director
                ↓
10. [DIRECTOR] gives final approval
                ↓
11. [PRODUCER] moves to ready/ and schedules
```

## 💬 Communication Protocol

Agents should tag each other using this format:

```
[DIRECTOR] → @ContentWriter: Need content for TikTok trend about sodium myths

[WRITER] → @Director: Here's the draft for review: {content JSON}

[DIRECTOR] → @Producer: Approved for rendering, target: TikTok only

[PRODUCER] → @TechnicalSpecialist: Executing render for BILAN_045

[TECHNICAL] → @QA: Render complete, ready for review

[QA] → @Director: Video approved ✅ - meets all quality standards

[DIRECTOR] → @Producer: Move to ready and schedule for tomorrow
```

## 📊 Daily Status Report Format

The Producer should provide daily updates:

```
📊 DAILY STATUS REPORT - 2026-02-10

📁 Drafts: 3 pending
✅ Ready: 5 videos
📅 Scheduled: 7 videos
📤 Posted: 12 videos (this week)
🎬 In Progress: BILAN_046 (rendering)
⚠️ Issues: None

Next actions:
- Review 3 drafts waiting for Director approval
- Render 5 ready pieces for all platforms
- Schedule 7 videos for this week
```

## 🛠️ Common Commands by Role

### Director Commands
```bash
# View all content status
node scripts/content-manager.mjs status

# Review templates in browser
npm run dev

# Check recent videos
ls -lth out/tiktok/ | head -10
```

### Producer Commands
```bash
# Create new content
node scripts/content-manager.mjs create "[tip]" "[reason]" "[cta]" "[topic]" "[category]"

# Generate videos
node scripts/multi-platform-generator.mjs [ID] --from-file content/drafts/[file].json

# Move through pipeline
node scripts/content-manager.mjs move [ID] drafts ready
node scripts/content-manager.mjs move [ID] ready scheduled
```

### Content Writer Commands
```bash
# Check existing content for reference
cat content/examples/*.json

# Validate JSON format
node -e "console.log(JSON.parse(require('fs').readFileSync('content/drafts/BILAN_XXX.json')))"
```

### Technical Specialist Commands
```bash
# Multi-platform batch
node scripts/multi-platform-generator.mjs [ID] --from-file [path]

# Specific platforms only
node scripts/multi-platform-generator.mjs [ID] --from-file [path] --platforms tiktok,instagram

# Development preview
npm run dev
```

### QA Commands
```bash
# Play video for review
vlc out/tiktok/BILAN_XXX_tiktok.mp4

# Check video specs
ffprobe -v error -show_format -show_streams out/tiktok/BILAN_XXX_tiktok.mp4

# View caption
cat out/tiktok/BILAN_XXX_tiktok_caption.txt
```

## 📚 Reference Documents

Each agent should familiarize themselves with:
- `DATA-INPUT-FORMAT.md` - Content structure and JSON schemas
- `MULTI-PLATFORM-USAGE.md` - Platform specifications and commands
- `MULTI-PLATFORM-PIPELINE.md` - Workflow automation details
- `BILAN-VIDEO-GUIDELINES.md` - Brand guidelines
- `TIKTOK-GUIDELINES.md` - Platform compliance
- `TODO.md` - Current priorities and backlog
- `AGENT-TEAM-PROMPT.md` - Full team specification

## 🎯 Success Metrics

### Production Efficiency
- Time from ideation to ready: Target < 2 hours
- Render success rate: Target > 95%
- QA approval rate: Target > 80%

### Content Quality
- Director approval on first draft: Target > 75%
- QA rejections: Target < 15%
- Revision rounds per content: Target < 2

### Output Volume
- Videos produced per week: Target 10-15
- Multi-platform coverage: Target 4 platforms per content
- Content pipeline health: Always 5+ in ready state

## 💡 Pro Tips

1. **For Directors:** Study trending content, balance education with entertainment
2. **For Producers:** Master the file system, optimize batch processing
3. **For Writers:** Research electrolyte science, keep a swipe file of high-performing posts
4. **For Technical:** Deep dive Remotion docs, set up monitoring for render failures
5. **For QA:** Test on actual mobile devices, document common issues

## 🔮 Future Enhancements

**Phase 3:** Browser-Based Dashboard
- Drag-and-drop content creator
- Visual pipeline kanban board
- One-click rendering
- Integrated QA approval interface

**Phase 4:** Auto-Posting Integration
- Platform API integrations
- Scheduled posting automation
- Performance analytics dashboard
- A/B testing framework

## 📞 Getting Help

**Technical Issues:** @TechnicalSpecialist
**Content Questions:** @ContentWriter
**Pipeline Problems:** @Producer
**Quality Concerns:** @QA
**Strategic Decisions:** @Director

## 🎓 Using with AI Assistants

When working with AI assistants (like Claude):

1. **Load the appropriate persona:**
   ```bash
   node agents/agent-launcher.mjs writer
   ```

2. **Share the output with your AI:**
   Copy the persona guidelines into your AI chat

3. **Ask the AI to act as that role:**
   "Please act as the Content Writer Agent and create content for..."

4. **Follow the communication protocol:**
   Use the agent tagging system in your prompts

5. **Reference the persona guidelines:**
   The AI will maintain role-specific focus and use correct tools

---

**🎬 Ready to create amazing content? Let's roll!**

*Remember: Quality over quantity. Every video represents the Bilan brand.*
