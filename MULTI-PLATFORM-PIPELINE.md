# 🚀 Multi-Platform Content Pipeline Design

*Complete system for cross-platform video generation, organization, and automated posting*

---

## 🎯 System Overview

**Goal:** Generate platform-optimized videos from single content source, track posting status, and automate scheduling.

**Flow:** Content → Multi-Platform Generation → Organization → Scheduling → Auto-Posting

---

## 📊 Content Database Schema

### Master Content Record
```json
{
  "contentId": "BILAN_001",
  "createdAt": "2026-02-08T13:20:00Z",
  "status": "ready", // draft, ready, scheduled, posted
  "topic": "electrolyte-myths",
  "category": "mythbusting",
  "sourceText": "Los electrolitos no son solo sal...",
  "keywords": ["electrolitos", "hidratacion", "mitos"],
  "platforms": {
    "tiktok": {
      "videoFile": "out/tiktok/BILAN_001_tiktok.mp4",
      "caption": "🔥 MITO: Los electrolitos son solo sal...",
      "hashtags": "#electrolitos #hidratacion #bilan",
      "status": "posted",
      "postedAt": "2026-02-08T15:30:00Z",
      "postUrl": "https://tiktok.com/@bilan.mx/video/123",
      "performance": {
        "views": 1250,
        "likes": 87,
        "shares": 12
      }
    },
    "instagram": {
      "videoFile": "out/instagram/BILAN_001_instagram.mp4",
      "caption": "¿Sabías que los electrolitos son más que sal? 💡",
      "hashtags": "#ElectrolitosReales #HidratacionInteligente #Bilan",
      "status": "ready",
      "scheduledFor": "2026-02-09T10:00:00Z"
    },
    "whatsapp": {
      "videoFile": "out/whatsapp/BILAN_001_whatsapp.mp4",
      "caption": "Dato rápido sobre electrolitos 📱",
      "status": "ready"
    },
    "twitter": {
      "videoFile": "out/twitter/BILAN_001_twitter.mp4", 
      "caption": "🧵 Thread: Electrolitos vs. Sal común",
      "status": "draft"
    }
  }
}
```

---

## 🎨 Platform-Specific Templates

### Video Specifications

| Platform | Aspect Ratio | Duration | Resolution | Template |
|----------|--------------|----------|------------|----------|
| **TikTok** | 9:16 | 15-30s | 1080x1920 | QuickTip, Mythbusting |
| **Instagram** | 9:16 | 15-60s | 1080x1920 | Educational, Trending |
| **WhatsApp** | 1:1 | 10-20s | 1080x1080 | QuickTip (Square) |
| **Twitter** | 16:9 | 15-45s | 1920x1080 | Educational (Landscape) |

### Template Modifications Needed
```javascript
// New platform variants
export const PlatformTemplates = {
  tiktok: "QuickTipVideo", // existing
  instagram: "EducationalVideo", // existing  
  whatsapp: "QuickTipSquare", // NEW - square format
  twitter: "EducationalLandscape" // NEW - landscape format
};
```

---

## 📁 File Organization System

```
content/
├── master-content.json           # Master content database
├── drafts/                      # Work in progress
│   ├── 2026-02-08-electrolitos.json
│   └── 2026-02-09-hidratacion.json
├── ready/                       # Ready for posting
│   └── BILAN_001.json
├── scheduled/                   # Scheduled content
│   └── BILAN_002.json
└── posted/                      # Posted content archive
    └── 2026-02/
        ├── BILAN_001.json
        └── BILAN_002.json

out/
├── tiktok/
│   ├── BILAN_001_tiktok.mp4
│   └── BILAN_002_tiktok.mp4
├── instagram/
│   ├── BILAN_001_instagram.mp4
│   └── BILAN_002_instagram.mp4
├── whatsapp/
│   ├── BILAN_001_whatsapp.mp4
│   └── BILAN_002_whatsapp.mp4
└── twitter/
    ├── BILAN_001_twitter.mp4
    └── BILAN_002_twitter.mp4

scripts/
├── multi-platform-generator.mjs  # Main generator
├── content-manager.mjs           # Database operations  
├── scheduler.mjs                 # Scheduling system
└── auto-poster.mjs              # Posting automation
```

---

## 🛠 Implementation Scripts

### 1. Multi-Platform Generator
```javascript
// scripts/multi-platform-generator.mjs
import { generatePlatformVideo } from './platform-renderer.mjs';

async function generateAllPlatforms(contentId) {
  const platforms = ['tiktok', 'instagram', 'whatsapp', 'twitter'];
  const results = {};
  
  for (const platform of platforms) {
    console.log(`🎬 Generating ${platform} video for ${contentId}...`);
    results[platform] = await generatePlatformVideo(contentId, platform);
  }
  
  return results;
}
```

### 2. Content Manager
```javascript
// scripts/content-manager.mjs
export class ContentManager {
  async createContent(sourceData) {
    const contentId = this.generateId();
    const content = {
      contentId,
      createdAt: new Date().toISOString(),
      status: 'ready',
      ...sourceData,
      platforms: this.initializePlatforms(sourceData)
    };
    
    await this.saveContent(content);
    return content;
  }
  
  async updatePlatformStatus(contentId, platform, updates) {
    // Update specific platform data
  }
  
  async getContentByStatus(status) {
    // Filter content by status
  }
}
```

### 3. Auto-Scheduler
```javascript
// scripts/scheduler.mjs
export class ContentScheduler {
  async scheduleContent(contentId, platform, scheduledTime) {
    // Add to cron job or use n8n webhook
  }
  
  async getScheduledContent() {
    // Return content ready for posting
  }
}
```

---

## 📋 Management Dashboard Commands

### Content Creation
```bash
# Create new content from text
./scripts/create-content.mjs "Los electrolitos mejoran tu rendimiento" --category=educational

# Generate all platform videos
./scripts/multi-platform-generator.mjs BILAN_001

# Batch generate from CSV
./scripts/batch-multi-platform.mjs content/batch-february.csv
```

### Content Management
```bash
# Show pipeline status
./scripts/content-status.mjs

# Schedule content
./scripts/schedule-content.mjs BILAN_001 --platform=tiktok --time="2026-02-09T10:00:00Z"

# Mark as posted
./scripts/mark-posted.mjs BILAN_001 --platform=tiktok --url="https://tiktok.com/@bilan.mx/video/123"
```

### Analytics
```bash
# Performance report
./scripts/performance-report.mjs --period=week

# Platform comparison
./scripts/platform-analytics.mjs
```

---

## 🤖 Auto-Posting Integration

### Option 1: n8n Workflows
```javascript
// n8n webhook endpoint for scheduled posting
POST /webhook/bilan-auto-post
{
  "contentId": "BILAN_001",
  "platform": "tiktok",
  "action": "post"
}
```

### Option 2: Clawdbot Cron Jobs
```javascript
// Use Clawdbot's cron system for scheduling
cron.add({
  schedule: "0 10 * * *", // Daily at 10 AM
  task: "Check scheduled content and post via browser automation"
});
```

### Option 3: Platform APIs (when available)
```javascript
// Direct API posting for supported platforms
const apis = {
  instagram: new InstagramAPI(),
  tiktok: new TikTokAPI(), // Limited availability
  twitter: new TwitterAPI()
};
```

---

## 📊 Analytics & Tracking

### Performance Dashboard
```json
{
  "period": "2026-02-01 to 2026-02-08",
  "totalVideos": 15,
  "platforms": {
    "tiktok": {
      "posted": 12,
      "scheduled": 3,
      "avgViews": 2150,
      "topPerformer": "BILAN_005"
    },
    "instagram": {
      "posted": 10,
      "scheduled": 5,
      "avgLikes": 87,
      "topPerformer": "BILAN_003"
    }
  },
  "contentTypes": {
    "mythbusting": { "performance": "excellent" },
    "educational": { "performance": "good" },
    "trending": { "performance": "average" }
  }
}
```

---

## 🚀 Implementation Phases

### Phase 1: Multi-Platform Generation (Week 1)
- [ ] Create platform-specific templates (WhatsApp square, Twitter landscape)
- [ ] Build multi-platform generator script
- [ ] Test with 5 content pieces across all platforms

### Phase 2: Content Management (Week 2)  
- [ ] Implement content database system
- [ ] Create management dashboard scripts
- [ ] Build status tracking and organization

### Phase 3: Scheduling System (Week 3)
- [ ] Integrate with Clawdbot cron or n8n
- [ ] Create scheduling interface
- [ ] Test automated workflows

### Phase 4: Auto-Posting (Week 4)
- [ ] Browser automation for TikTok/Instagram
- [ ] API integration where available  
- [ ] Performance tracking and analytics

---

## 📝 Next Steps

1. **Review this design** - Does this match your vision?
2. **Choose implementation approach** - Clawdbot-based vs n8n vs hybrid?
3. **Start with Phase 1** - Multi-platform video generation
4. **Set up content database** - JSON files or external DB?

Ready to start building this pipeline?