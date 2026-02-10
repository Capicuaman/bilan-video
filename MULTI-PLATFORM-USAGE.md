# 🚀 Multi-Platform Video Pipeline - Quick Start

**Status:** ✅ OPERATIONAL  
**New Templates:** WhatsApp Square + Twitter Landscape  
**Scripts:** Content Manager + Multi-Platform Generator  

---

## 🎯 Quick Commands

### Create Content
```bash
# Check pipeline status
node scripts/content-manager.mjs status

# Create new content
node scripts/content-manager.mjs create "Tip text" "Reason text" "CTA text" "topic" "category"
```

### Generate Videos
```bash
# Single platform
node scripts/multi-platform-generator.mjs BILAN_001 --from-file content/drafts/example.json --platforms whatsapp

# All platforms
node scripts/multi-platform-generator.mjs BILAN_002 --from-file content/drafts/example.json

# Inline content
node scripts/multi-platform-generator.mjs BILAN_003 \\
  --tip "Los electrolitos mejoran tu rendimiento" \\
  --reason "Mantienen el equilibrio de líquidos" \\
  --cta "Hidrátate con ciencia"
```

### Manage Content
```bash
# List ready content
node scripts/content-manager.mjs list ready

# Move content through pipeline
node scripts/content-manager.mjs move BILAN_001 ready scheduled

# Mark as posted
node scripts/content-manager.mjs update BILAN_001 tiktok posted "https://tiktok.com/@bilan.mx/video/123"
```

---

## 📱 Platform Outputs

| Platform | Format | Template | Dimensions | Duration |
|----------|--------|----------|------------|----------|
| **TikTok** | Vertical | QuickTipVideo | 1080x1920 | 15s |
| **WhatsApp** | Square | QuickTipSquare | 1080x1080 | 12s |
| **Instagram** | Square | QuickTipSquare | 1080x1080 | 15s |
| **Twitter** | Landscape | EducationalLandscape | 1920x1080 | 15s |

---

## 📁 File Organization

```
out/
├── tiktok/          # Vertical videos for TikTok
├── whatsapp/        # Square videos for WhatsApp  
├── instagram/       # Square videos for Instagram
└── twitter/         # Landscape videos for Twitter

content/
├── drafts/          # Work in progress
├── ready/           # Generated videos ready for posting
├── scheduled/       # Content scheduled for posting
└── posted/          # Posted content archive
```

---

## 🎬 Platform-Specific Features

### WhatsApp (Square)
- **Shorter duration** (12s) for attention spans
- **Larger fonts** for mobile viewing
- **Minimal hashtags** (WhatsApp doesn't use them)
- **Direct messaging style** captions

### Twitter (Landscape)  
- **Educational format** with 3 key points
- **Horizontal layout** for desktop viewing
- **Thread-style** captions
- **Professional tone**

### TikTok/Instagram
- Use **existing vertical templates**
- **Trending hashtags** included
- **Engaging captions** optimized per platform

---

## 🤖 Automation Ready

### Current State
- ✅ **Content database** with status tracking
- ✅ **Multi-platform generation** 
- ✅ **Caption optimization** per platform
- ✅ **File organization** system

### Next Steps (Phase 3-4)
- 🔄 **Clawdbot cron integration** for scheduling
- 📤 **Auto-posting** via browser automation  
- 📊 **Performance tracking** and analytics
- 🎯 **A/B testing** different formats

---

## 💡 Content Strategy Tips

### Best Practices
1. **Start with one strong tip** per video
2. **Keep reason under 2 sentences** for WhatsApp/TikTok
3. **Use 3 key points** for Twitter educational format
4. **Strong CTA** that drives action

### Content Types That Work
- **Myth-busting** ("MITO: La sal es mala")
- **Quick tips** ("Los electrolitos mejoran...")  
- **Educational** ("3 Electrolitos Esenciales")
- **Before/after** ("POV: Descubres que...")

### Platform Strategy
- **TikTok:** Trending, casual, myth-busting
- **Instagram:** Educational, aesthetic, behind-scenes
- **WhatsApp:** Direct, personal, quick tips
- **Twitter:** Educational threads, scientific backing

---

**🎯 You now have a complete content factory!**  
From single content input → 4 platform-optimized videos + organized tracking system.

Ready for the next phase when you are! 🚀