# Remotion Mastery Roadmap

A practical guide to becoming proficient at programmatic video creation with Remotion.

---

## 🎯 Immediate Next Steps

### 1. Build a Template Library

You have `TrendingVideo` — now create 4-5 more templates:

- `TestimonialVideo` — customer quote + before/after
- `ProductShowcase` — features with animated icons
- `CountdownVideo` — urgency/scarcity for promos
- `FAQVideo` — question → answer format
- `StoryVideo` — multi-scene narrative

Each one teaches you different animation patterns.

### 2. Master These Animation Primitives

```tsx
// Spring physics (you're using this)
spring({ frame, fps, config: { damping, stiffness, mass } })

// Sequences — chain animations
<Sequence from={0} durationInFrames={90}>...</Sequence>
<Sequence from={90} durationInFrames={60}>...</Sequence>

// Easing functions beyond linear
interpolate(frame, [0, 30], [0, 1], {
  easing: Easing.bezier(0.25, 0.1, 0.25, 1), // cubic-bezier
})

// Loop for repeating animations
const progress = (frame % 60) / 60; // loops every 2 seconds
```

### 3. Add Audio

```tsx
import { Audio, staticFile } from 'remotion';

<Audio src={staticFile('music.mp3')} volume={0.3} />
<Audio src={staticFile('whoosh.mp3')} startFrom={hookEnd} />
```

Sound effects transform engagement. Get a pack of swooshes, pops, and transitions.

---

## 📦 Architecture Upgrades

### 4. Create a Component Library

```
src/
  components/
    AnimatedText.tsx      # Text that types, fades, scales
    ProgressBar.tsx       # Scene indicators, timers
    LogoReveal.tsx        # Multiple reveal animations
    BackgroundPatterns.tsx # Gradients, particles, shapes
    TransitionWipe.tsx    # Scene transitions
```

### 5. Props Schema with Zod

```tsx
import { z } from 'zod';

export const TrendingSchema = z.object({
  hook: z.string().min(1),
  scenes: z.array(z.string()).min(2).max(6),
  brandColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});
```

Enables the Remotion Studio UI to edit props visually.

---

## 🔥 Advanced Techniques

### 6. Dynamic Data Videos

```tsx
// Generate videos from JSON/API
const videos = products.map(p => ({
  id: p.id,
  props: { name: p.name, price: p.price, image: p.image }
}));

// Batch render
npx remotion render ... --props-from-json products.json
```

### 7. Video/Image Integration

```tsx
import { Video, OffthreadVideo, Img } from 'remotion';

<OffthreadVideo src={staticFile('background.mp4')} />
<Img src={staticFile('product.png')} style={{ ... }} />
```

### 8. Canvas/WebGL for Custom Graphics

```tsx
// Animated particles, charts, 3D
import { useCurrentFrame } from 'remotion';

const MyCanvas = () => {
  const frame = useCurrentFrame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    // Draw animated graphics based on frame
  }, [frame]);
  
  return <canvas ref={canvasRef} width={1080} height={1920} />;
};
```

---

## 🛠️ Workflow Improvements

### 9. CLI Scripts for Batch Rendering

```bash
#!/bin/bash
# render-all.sh
for template in QuickTip Trending Educational Mythbusting; do
  npx remotion render src/index.ts $template out/${template}.mp4
done
```

### 10. GitHub Actions for Cloud Rendering

Render videos on push — useful for content pipelines. Check Remotion Lambda for serverless rendering at scale.

---

## 📚 Resources

| Resource | Link |
|----------|------|
| Remotion Docs | https://remotion.dev/docs |
| Examples | https://github.com/remotion-dev (template-* repos) |
| Discord | https://discord.gg/remotion |
| Showcase | https://remotion.dev/showcase |

---

## 🎯 30-Day Challenge

| Week | Focus |
|------|-------|
| **1** | Build 3 new templates, add audio |
| **2** | Component library + Zod schemas |
| **3** | Data-driven batch rendering (10 videos from JSON) |
| **4** | Complex animation: particles or charts |

---

## 💡 Tips from Experience

1. **Start with timing** — map out your video frame-by-frame before coding
2. **Use `fps` everywhere** — never hardcode frame numbers, use `fps * seconds`
3. **Extract constants** — put all timing into variables at the top
4. **Test at 2x speed** — render at half frames during development
5. **Keep text BIG** — mobile viewers need 44px+ minimum
6. **One idea per scene** — don't crowd, let things breathe
7. **Sound = 50% of impact** — even subtle audio elevates everything

---

## 🔧 Quick Reference: Render Commands

```bash
# Preview in browser
npm start

# Render single video
npx remotion render src/index.ts Trending out/trending.mp4

# Render with props
npx remotion render src/index.ts Trending out/video.mp4 \
  --props='{"hook":"Your text","scenes":["A","B","C"]}'

# Render specific frames (for testing)
npx remotion render src/index.ts Trending out/test.mp4 \
  --frames=0-90

# List all compositions
npx remotion compositions src/index.ts
```

---

*Created: 2026-01-26*
*Project: bilan-video*
