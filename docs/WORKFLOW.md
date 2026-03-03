# bilan-video Workflow Reference

## The 4-Stage Pipeline

### 1. Content (`content/*.json`)
You write a JSON file describing the video — the title, body text, tip, which platform it's for, which template to use. This is the only thing you author manually. The JSON is the "source of truth."

### 2. Script (`npm run render`)
`multi-platform-generator.mjs` reads your JSON, figures out which Remotion compositions to render (based on platform/template fields), and fires off the render commands. You run one command and it handles all platforms automatically.

For bulk work, `npm run render:batch` loops over all JSON files in `content/` and renders them sequentially — good for overnight runs.

### 3. Templates (`src/templates/*.tsx`)
These are React components that define how the video *looks*. Remotion treats them like web pages — animated React → video frames → MP4 via ffmpeg. The templates (QuickTip, Educational, Mythbusting, Trending) are registered as **compositions** in `src/Root.tsx`. Each composition is a named render target with its own dimensions and duration.

### 4. Output (`out/[platform]/*.mp4`)
Final MP4 files, organized by platform. You never touch these directly.

---

## The Two Modes

| Mode | Command | When to use |
|---|---|---|
| **Preview** | `npm run dev` | Designing/iterating on a template. Hot-reloads, visual Studio UI. |
| **Production** | `npm run render` | Content is ready. Renders real MP4s. |

---

## The Mental Model

```
You write JSON → script routes it → template styles it → Remotion renders it → MP4 drops in out/
```

The key insight is **separation of concerns**: content (JSON) never touches layout (templates), and rendering (scripts) is just the bridge between them. To make a new video you only touch the JSON.

---

## Interactive Reference

The pipeline playground is at: `bilan-workflow-playground.html` (project root).
