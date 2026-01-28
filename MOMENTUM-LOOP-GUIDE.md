# Momentum Loop Content Compendium - Usage Guide

## Overview

This compendium contains **30 video scripts** based on Wes McDowell's **Momentum Loop strategy** from the content marketing framework outlined in `contnetStrategy.md`.

**Source:** The NEW Way to Win at Content Marketing in 2026
**Video:** https://www.youtube.com/watch?v=2X0lYnNmbsc

---

## The Momentum Loop Framework

The Momentum Loop is a three-phase content flywheel designed to replace the exhausting "hamster wheel" of daily posting:

```
┌─────────────────────────────────────────────────┐
│  ATTRACTION  →  CONVERSION  →  EMAIL  →  REPEAT │
└─────────────────────────────────────────────────┘
```

### Phase 1: Attraction Content (Discovery)
**Platform:** Long-form YouTube (search-based, long shelf life)
**Goal:** Get discovered by new audiences or deepen existing relationships
**Content Types:**
- FAQ Videos (answer specific questions)
- List Videos (provide ideas/resources)
- Comparison Videos (help viewers make decisions)
- Thought Leadership (share unique perspectives)

**Why YouTube?**
- Search-based (users actively looking for solutions)
- Long shelf life (videos bring leads years later)
- Not recency-dependent (unlike TikTok/Instagram)

---

### Phase 2: Conversion Content (Website)
**Platform:** Your website (landing pages)
**Goal:** Convert "80% sold" viewers into buyers
**Three Keys:**
1. **Crystal Clear Value Proposition** (5-second clarity)
2. **One Page, One Purpose** (single CTA per page)
3. **Show the Proof** (testimonials, trust badges)

**Lead Magnets:** Capture emails with free resources (checklists, guides) for nurturing

---

### Phase 3: Email Content (Sales)
**Platform:** Email list (highest ROI: $36-$40 per $1 spent)
**Goal:** Convert trust into revenue
**Two Email Types:**
1. **Weekly Nurture Emails:** Notify list of new attraction content, drive traffic back to videos
2. **Sales Emails:** Less frequent (monthly/launches), convert trust into purchases

**Why Email?**
- Direct access (no algorithm interference)
- Highest ROI of all marketing channels
- Majority of sales come from email, not direct from YouTube

---

## Compendium Structure

### File Location
```
/home/capicuaman/Documents/bilan-video/data/momentum-loop-content-compendium.json
```

### Content Breakdown (30 Videos)

#### **Attraction Content** (20 videos)
These are designed for YouTube/TikTok to get discovered:
- `attract_01` to `attract_10`: Main attraction videos (FAQ, List, Comparison, Thought Leadership)
- `recurring_01` to `recurring_10`: Evergreen content for ongoing production

**Identifiers:**
- `contentType`: "FAQ", "List", "Comparison", "Thought Leadership"
- `marketingPhase`: "Attraction"
- `youtube.searchIntent`: Target search keywords
- `youtube.duration`: Recommended video length
- `youtube.thumbnailText`: Thumbnail copy

---

#### **Conversion Content** (5 videos)
Designed to move viewers from "interested" to "buyer":
- `convert_01` to `convert_05`: Direct product pitch, testimonials, urgency, tutorials

**Identifiers:**
- `contentType`: "Conversion"
- `marketingPhase`: "Conversion"
- `tiktok.cta`: Clear call-to-action (always "link en bio")

**These videos should:**
- Include clear product benefits
- Feature social proof
- Have strong CTAs
- Link to landing pages

---

#### **Email Content** (5 videos)
Scripts for email campaigns (can also be adapted for video):
- `email_01` to `email_02`: Nurture emails (notify about new videos)
- `email_03` to `email_05`: Sales emails (launches, offers, guarantees)

**Identifiers:**
- `contentType`: "Email Nurture" or "Email Sales"
- `marketingPhase`: "Email"
- `emailSubject`: Subject line
- `emailType`: "weekly_nurture", "sales_launch", "sales_offer"

---

## How To Use This Compendium

### 1. **Production Priority**

**Week 1-2: Attraction Content**
Start with attraction videos to build discovery pipeline:
```bash
# Render videos: attract_01 through attract_05
VIDEO_ID=attract_01 npm run render
VIDEO_ID=attract_02 npm run render
# ... etc
```

**Week 3: Conversion Content**
Once traffic starts, create conversion videos:
```bash
VIDEO_ID=convert_01 npm run render  # Myth about sugar
VIDEO_ID=convert_02 npm run render  # 30-day transformation
VIDEO_ID=convert_03 npm run render  # How to use tutorial
```

**Week 4: Email Setup**
Launch email campaign using nurture scripts

---

### 2. **Batch Rendering**

Create a batch file for rendering multiple videos:

```json
// data/momentum-batch-01.json
{
  "videos": [
    {
      "id": "01",
      "filename": "faq-como-saber-si-necesito-electrolitos",
      "template": "Educational",
      "props": { ... copy from attract_01 ... }
    },
    {
      "id": "02",
      "filename": "faq-diferencia-agua-vs-electrolitos",
      "template": "Educational",
      "props": { ... copy from attract_02 ... }
    }
    // ... etc
  ]
}
```

Then render batch:
```bash
CSV_FILE=data/momentum-batch-01.json npm run batch-render
```

---

### 3. **Content Adaptation By Platform**

#### **For YouTube (Long-Form)**
Use videos marked with `youtube` metadata:
- Duration: 90-180 seconds (longer is OK)
- Focus on SEO: optimize for `searchIntent` keywords
- Thumbnails: Use `thumbnailText` for thumbnail design
- Description: Include timestamps, links, resources

**Best candidates:**
- All `attract_*` videos (especially FAQ and Thought Leadership)
- `recurring_*` videos with educational value

#### **For TikTok/Reels (Short-Form)**
Use videos with `tiktok` metadata:
- Duration: 15-60 seconds (max 90s)
- Hook in first 3 seconds is critical
- Use trending formats: POV, transformation, tutorial
- Include hashtags from `tiktok.hashtags`

**Best candidates:**
- `convert_*` videos (direct CTAs work well)
- `recurring_*` myth-busting videos
- Tutorial/quick-tip formats

#### **For Email Campaigns**
Use `email_*` content:
- Subject line: Use `emailSubject` as-is
- Body: Adapt `props` to email copy format
- CTAs: Link to landing pages or new videos
- Frequency: Weekly nurture, monthly sales

---

### 4. **Campaign Flow Example**

**MONTH 1: Foundation**
- **Week 1:** Release `attract_01`, `attract_02`, `attract_03` on YouTube
- **Week 2:** Release `recurring_01`, `recurring_02`, `recurring_03` on TikTok
- **Week 3:** Release `convert_01`, `convert_02` on TikTok (with landing page ready)
- **Week 4:** Launch email campaign `email_01` (nurture) pointing to best-performing YouTube video

**MONTH 2: Optimization**
- Double down on best-performing content types
- Create variations of top videos
- Launch `email_03` (sales - new flavor launch)

---

### 5. **Content Calendar Template**

| Week | Platform | Video ID | Content Type | Goal |
|------|----------|----------|--------------|------|
| 1    | YouTube  | attract_01 | FAQ | Build search presence |
| 1    | TikTok   | attract_01 | FAQ | Quick awareness |
| 2    | YouTube  | attract_03 | List | Build search presence |
| 2    | Email    | email_01 | Nurture | Drive traffic to YouTube |
| 3    | TikTok   | convert_01 | Conversion | Drive landing page traffic |
| 3    | Landing  | - | Conversion | Optimize based on traffic |
| 4    | Email    | email_03 | Sales | Convert nurtured leads |

---

## Key Content Themes

Each video in the compendium addresses one of these strategic themes:

### 1. **Myth-Busting**
Breaking common hydration myths:
- 8 glasses of water myth
- Sugar "needed" for energy
- Coffee dehydration myth
- Alkaline water benefits
- Bananas for cramps

**Why it works:** Controversial takes drive engagement and shares

---

### 2. **Education/FAQ**
Answering real customer questions:
- How to know if you need electrolitos
- When to take electrolytes
- How much sodium needed per day
- Water vs electrolytes difference

**Why it works:** Search-optimized, evergreen value

---

### 3. **Comparison**
Positioning BILAN against alternatives:
- BILAN vs Gatorade
- Natural sources vs supplements
- Different magnesium types
- Water types comparison

**Why it works:** Helps decision-making, shows superiority

---

### 4. **Thought Leadership**
Establishing authority and unique perspective:
- Industry lies about sports drinks
- Hyponatremia dangers
- Future of hydration
- Science vs marketing

**Why it works:** Builds trust, differentiates brand

---

### 5. **Transformation/Social Proof**
Real results and testimonials:
- 30 days with BILAN
- Before/after stories
- User testimonials
- Personal transformation

**Why it works:** Drives conversions, builds trust

---

### 6. **Tutorials/Protocols**
Actionable how-to content:
- How to use BILAN correctly
- Gym hydration protocol
- Home hydration tests
- Timing optimization

**Why it works:** High save rate, practical value

---

## Customization Tips

### Adding New Videos
When creating new content, follow this structure:

```json
{
  "id": "custom_01",
  "filename": "descriptive-filename",
  "template": "Educational|Mythbusting|QuickTip|Trending",
  "contentType": "FAQ|List|Comparison|Thought Leadership|Tutorial",
  "marketingPhase": "Attraction|Conversion|Email",
  "props": {
    "title": "Video Title",
    "hook": "First 3 seconds hook",
    "mainPoints": ["Point 1", "Point 2", "Point 3"],
    "conclusion": "Closing message",
    "cta": "Call to action"
  },
  "youtube": {
    "searchIntent": "target keyword phrase",
    "duration": "60-90s",
    "thumbnailText": "THUMBNAIL TEXT"
  },
  "tiktok": {
    "caption": "Full caption with emoji",
    "hashtags": ["tag1", "tag2", "tag3"],
    "cta": "Link en bio"
  }
}
```

---

### A/B Testing Ideas
Test different versions of high-performers:
- Hook variations (first 3 seconds)
- Different CTAs
- Title variations
- Visual style changes

Track in `/data/ab-test-config.json`

---

## Analytics & Optimization

### Metrics To Track

**Attraction Content (YouTube):**
- Search impressions
- Click-through rate (CTR)
- Average view duration
- Traffic to website

**Conversion Content (TikTok/Landing):**
- Link clicks
- Landing page conversion rate
- Add-to-cart rate
- Purchase completion rate

**Email Content:**
- Open rate (>25% is good)
- Click rate (>3% is good)
- Conversion rate
- Unsubscribe rate (<0.5%)

---

### Optimization Loop

1. **Identify top performers** (top 20% of videos by engagement)
2. **Analyze why they work** (hook? topic? format?)
3. **Create variations** (double down on what works)
4. **Retire underperformers** (bottom 20% after 90 days)
5. **Repeat monthly**

---

## Integration With Existing BILAN Assets

### RAG System
Add FAQ answers to:
- `/01_PROJECTS/BILAN/MARKETING/RAG/faq.json`

Example:
```json
{
  "question": "¿Cómo sé si necesito electrolitos?",
  "answer": "Hay 5 señales principales: (1) orina amarillo oscuro, (2) calambres musculares, (3) fatiga persistente, (4) mareos al levantarte, (5) antojos de sal. Si tienes 2 o más, tu cuerpo necesita electrolitos.",
  "source": "attract_01",
  "confidence": "high"
}
```

---

### Sales Manual
Reference conversion content in:
- `/01_PROJECTS/BILAN/SALES/consolidated_sales_manual.md`

Add objection handlers from `convert_*` videos

---

### VEO Video Prompts
Adapt scripts for video generation:
- `/01_PROJECTS/BILAN/MARKETING/VEO/`

Use hooks and scenes from `Trending` template videos

---

## Next Steps

### Immediate Actions
1. ✅ Review compendium structure
2. [ ] Select first 5 videos to produce (suggest: `attract_01` through `attract_05`)
3. [ ] Create batch rendering file
4. [ ] Set up YouTube channel optimization (titles, descriptions, tags)
5. [ ] Design landing page for conversion videos
6. [ ] Set up email capture system

### Week 1 Production
- Render attraction videos `attract_01`, `attract_02`, `attract_03`
- Upload to YouTube with SEO optimization
- Cross-post short versions to TikTok
- Begin email list building

### Month 1 Goal
- 10 attraction videos published
- 3 conversion videos live
- First email nurture campaign launched
- Analytics tracking set up

---

## Questions?

For questions about:
- **Remotion rendering:** Check `/PROPS_GUIDE.md`
- **Batch rendering:** Check `/BATCH-PLAN.md`
- **Content strategy:** Check `/MARKETING/SOCIAL-MEDIA/contnetStrategy.md`
- **Sales integration:** Check `/SALES/consolidated_sales_manual.md`

---

## Summary

This compendium gives you **30 ready-to-produce video scripts** organized by marketing phase. Use it to:

1. **Build discovery** through attraction content (YouTube)
2. **Convert visitors** through conversion content (TikTok + landing pages)
3. **Close sales** through email nurture and sales campaigns

The Momentum Loop works because each piece feeds into the next, creating a self-sustaining content flywheel that gets stronger over time.

Start with attraction, layer in conversion, and activate email to complete the loop.

**Now go render some videos and build that momentum! 🚀**
