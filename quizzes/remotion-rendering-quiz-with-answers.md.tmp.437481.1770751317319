# Remotion Rendering - Deep Understanding Quiz
## Complete with Answer Key & Explanations

**Total Questions:** 15
**Estimated Time:** 18-20 minutes
**Passing Score:** 75% (11/15 correct)
**Context:** Based on bilan-video project workflow

---

## Question 1: Frame Calculation Fundamentals

Your video composition has `fps: 30` and you want a 15-second video. You write an animation that should play from frame 0 to frame 450. What's wrong?

**A)** Nothing is wrong, 15 seconds × 30 fps = 450 frames
**B)** The calculation is off by one frame (should be 449)
**C)** Remotion uses 0-indexed frames, so it's actually 16 seconds
**D)** FPS affects playback speed, not total frames

**✅ CORRECT ANSWER: B**

**Explanation:**
Remotion uses 0-indexed frames. For a 15-second video at 30 fps:
- Total frames needed: 15 × 30 = 450 frames
- Frame range: 0 to 449 (that's 450 frames total)
- If you animate to frame 450, you're creating 451 frames (0, 1, 2, ... 450)
- This results in a 15.033-second video

**Why Other Options Are Wrong:**
- **A:** Doesn't account for 0-indexing. Frame 0 counts as the first frame.
- **C:** Frames are 0-indexed, but this doesn't add time - you still need frames 0-449 for 15 seconds.
- **D:** FPS does affect frame count. Duration = totalFrames / fps.

**Key Takeaway:** Always use `durationInFrames: Math.floor(seconds × fps)` and remember animations go from 0 to (duration - 1).

---

## Question 2: Props Serialization Gotcha

You try to pass props to a composition like this:
```bash
remotion render --props='{"contentId": "BILAN_001"}'
```

But your component receives `undefined`. The JSON file exists at `content/ready/BILAN_001.json`. What's the most likely issue?

**A)** Remotion doesn't support JSON props via CLI
**B)** You should pass the file path, not the contentId
**C)** The component expects the entire JSON object, not just contentId
**D)** Props must be passed via a separate props file with `--props=file.json`

**✅ CORRECT ANSWER: C**

**Explanation:**
Your component likely expects the full content structure (tip, reason, title, etc.), not just an ID. The props you pass via CLI become the component's props directly. If you pass `{contentId: "BILAN_001"}`, your component receives exactly that - just the ID.

You need to either:
1. Pass the full JSON: `--props="$(cat content/ready/BILAN_001.json)"`
2. Use a props file: `--props=content/ready/BILAN_001.json`
3. Have your component load the file based on contentId (but this requires async handling)

**Why Other Options Are Wrong:**
- **A:** Remotion fully supports JSON props via CLI.
- **B:** While you CAN pass a file path with different syntax, passing contentId is valid if your component handles it.
- **D:** Props files work, but inline JSON also works - the issue is the content mismatch.

**Key Takeaway:** Props passed to compositions must match what the component expects. Don't pass IDs when components need full data objects.

---

## Question 3: Multi-Platform Rendering Order

You batch render for all 4 platforms (TikTok, Instagram, WhatsApp, Twitter) using your script. TikTok (9:16, 1920x1080) takes 55s, Instagram (1:1, 1080x1080) takes 32s. Why is TikTok slower?

**A)** 9:16 aspect ratio requires more processing
**B)** Higher resolution (1920x1080 vs 1080x1080) means more pixels to render
**C)** TikTok codec settings are more complex
**D)** The rendering order causes caching benefits for later renders

**✅ CORRECT ANSWER: B**

**Explanation:**
Total pixels to render:
- TikTok: 1080 × 1920 = 2,073,600 pixels
- Instagram: 1080 × 1080 = 1,166,400 pixels

TikTok has ~78% more pixels to render, which directly translates to longer rendering time. Each frame requires more computation, compositing, and encoding.

**Why Other Options Are Wrong:**
- **A:** Aspect ratio itself doesn't affect render time - it's the total pixel count that matters.
- **C:** Both typically use H.264; codec settings are usually consistent across platforms in batch renders.
- **D:** While Remotion does cache some assets, the first render doesn't benefit from this, and caching doesn't reduce time by 40%.

**Key Takeaway:** Render time scales with total pixel count. 1920×1080 takes significantly longer than 1080×1080 even though it "looks" similar.

---

## Question 4: useCurrentFrame() Timing

You have this code:
```tsx
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1]);
```

At `fps: 30`, when does the element become fully visible?

**A)** At 0 seconds (frame 0)
**B)** At 1 second (frame 30)
**C)** At 1.033 seconds (just after frame 30)
**D)** Depends on the video duration

**✅ CORRECT ANSWER: B**

**Explanation:**
At `fps: 30`:
- Frame 0 = 0 seconds → opacity = 0
- Frame 30 = 1 second → opacity = 1 (fully visible)
- Time = frame / fps = 30 / 30 = 1 second exactly

The interpolation reaches its maximum output (1) exactly at frame 30, which occurs at the 1-second mark.

**Why Other Options Are Wrong:**
- **A:** At frame 0, opacity is 0 (minimum), not 1.
- **C:** Frame 30 IS at 1 second, not after. Frame 31 would be at 1.033s.
- **D:** The interpolation timing is independent of total video duration.

**Key Takeaway:** Frame timing: `time_in_seconds = frame_number / fps`. Frame 30 at 30fps = exactly 1 second.

---

## Question 5: Sequence Overlap Edge Case

You have two sequences:
```tsx
<Sequence from={0} durationInFrames={90}>...</Sequence>
<Sequence from={90} durationInFrames={90}>...</Sequence>
```

At frame 90, what renders?

**A)** Only the first sequence (frame 90 is its last frame)
**B)** Only the second sequence (it starts at frame 90)
**C)** Both sequences overlap for one frame
**D)** Neither sequence (transition gap)

**✅ CORRECT ANSWER: B**

**Explanation:**
Sequence ranges are `[from, from + durationInFrames)` - inclusive start, exclusive end.
- First sequence: frames 0-89 (duration 90 means frames 0,1,2...89)
- Second sequence: frames 90-179

At frame 90, only the second sequence is active. The first sequence's last frame is 89.

**Why Other Options Are Wrong:**
- **A:** Frame 90 is NOT included in the first sequence. Duration of 90 frames starting at 0 means frames 0-89.
- **C:** No overlap. Sequences end before the next begins.
- **D:** There's no gap. Frame 90 immediately starts the second sequence.

**Key Takeaway:** `durationInFrames={90}` starting at `from={0}` renders frames 0-89, NOT 0-90. Always exclusive end.

---

## Question 6: Text Rendering Gotcha

You notice text looks blurry in your rendered video but appears sharp in Remotion Studio. What's the most likely cause?

**A)** Studio uses higher resolution preview
**B)** The font isn't loading properly during render
**C)** Text antialiasing differs between preview and render
**D)** Video compression artifacts from codec settings

**✅ CORRECT ANSWER: D**

**Explanation:**
Video codecs (especially H.264) use lossy compression that can blur fine details like text edges. This is normal and expected. Studio renders to your screen without video compression, so text appears sharper.

Solutions:
- Increase bitrate in render settings
- Use higher quality preset (e.g., `quality` instead of `fast`)
- Make text larger or bolder
- Increase contrast between text and background

**Why Other Options Are Wrong:**
- **A:** Studio actually renders at composition resolution, same as final render.
- **B:** If the font didn't load, you'd see a fallback font, not blurry text.
- **C:** Antialiasing is consistent - the blur is from compression, not rendering.

**Key Takeaway:** Video compression ALWAYS reduces text sharpness. Compensate with larger fonts, higher bitrate, or increased contrast.

---

## Question 7: Audio Sync Problem

You add background music with `<Audio src="music.mp3" />` and it plays perfectly in Studio, but in the rendered video, audio ends 0.5s before the video. What's the most likely issue?

**A)** The MP3 file has silence at the end
**B)** Remotion's renderer doesn't support MP3, use WAV
**C)** Audio and video codecs have different length calculations
**D)** The composition `durationInFrames` is longer than the audio

**✅ CORRECT ANSWER: D**

**Explanation:**
If your composition is 450 frames (15s at 30fps) but your audio is only 14.5 seconds, the audio will end before the video. Remotion doesn't automatically extend audio to match video duration.

Solutions:
- Match composition duration to audio length
- Loop the audio: `<Audio src="..." loop />`
- Use `endAt` prop to fade out audio
- Trim video to match audio length

**Why Other Options Are Wrong:**
- **A:** Possible, but the question states it plays perfectly in Studio with same duration.
- **B:** Remotion fully supports MP3. This isn't a codec issue.
- **C:** While codecs calculate differently, this would be a fraction of a frame, not 0.5s.

**Key Takeaway:** Audio duration ≠ video duration. Always verify your audio length matches your composition's `durationInFrames / fps`.

---

## Question 8: Batch Render Failure

Your batch render script fails on the 3rd content piece with "Error: Composition not found". The first 2 rendered successfully. What's the most likely cause?

**A)** The 3rd content JSON has a syntax error
**B)** Memory leak from previous renders
**C)** The composition name doesn't match the expected format
**D)** The renderer process crashed and needs restart

**✅ CORRECT ANSWER: C**

**Explanation:**
Your batch script likely dynamically determines which composition to use (e.g., QuickTipVideo vs EducationalLandscape) based on content metadata. If the 3rd content has a different `type` or format that doesn't map to an existing composition name, the render fails.

Check your script's composition selection logic and ensure all content types have matching compositions registered in `remotion.config.ts`.

**Why Other Options Are Wrong:**
- **A:** JSON syntax error would fail during props parsing with a different error message.
- **B:** Memory leaks cause slowdown or crashes, not "composition not found" errors.
- **D:** Process crash would show different error (connection error, SIGTERM, etc.).

**Key Takeaway:** "Composition not found" = the composition name you're requesting doesn't exist in your registered compositions. Check your mapping logic.

---

## Question 9: Platform Specs Violation

Your script renders a WhatsApp video that's 18MB (max is 16MB per your specs). The video duration and resolution are correct. What's the BEST way to reduce file size?

**A)** Reduce resolution from 1080x1080 to 720x720
**B)** Lower the bitrate in render settings
**C)** Shorten the video duration
**D)** Change from H.264 to H.265 codec

**✅ CORRECT ANSWER: B**

**Explanation:**
Lowering bitrate directly reduces file size while maintaining resolution and duration. This is the most targeted solution.

```bash
remotion render --crf=28  # Higher CRF = lower quality/size
# or
remotion render --video-bitrate=1M
```

CRF 23 (default) → try 26-28 for smaller file sizes.

**Why Other Options Are Wrong:**
- **A:** Works, but reduces quality unnecessarily. Try bitrate first.
- **C:** Changes your content. You want 12-15 second videos per your specs.
- **D:** H.265 has better compression BUT poor compatibility on older devices and requires more render time.

**Key Takeaway:** Adjust bitrate/CRF before changing resolution or duration. It's the most flexible file size control.

---

## Question 10: Dynamic Import Timing

You load content JSON dynamically in your component:
```tsx
const [data, setData] = useState(null);
useEffect(() => {
  fetch('/content/BILAN_001.json')
    .then(r => r.json())
    .then(setData);
}, []);
```

This works in Studio but fails during rendering. Why?

**A)** Fetch API isn't available during SSR rendering
**B)** The file path is incorrect for the render environment
**C)** Remotion rendering is synchronous, async data loading fails
**D)** All of the above are issues

**✅ CORRECT ANSWER: D**

**Explanation:**
All three are problems:
1. Remotion's renderer runs in Node.js where `fetch` isn't available (pre-Node 18) or works differently
2. The path `/content/...` resolves differently in Studio (served via dev server) vs render (filesystem)
3. Remotion evaluates each frame synchronously - async state updates don't work reliably

**Solution:** Pass data as props, don't load it inside components:
```bash
remotion render --props="$(cat content/BILAN_001.json)"
```

**Key Takeaway:** NEVER use async data loading in Remotion components. Always pass data via props or import statically.

---

## Question 11: Interpolate Extrapolation

You have:
```tsx
const scale = interpolate(frame, [0, 30, 60], [1, 1.5, 1]);
```

What happens at frame 90?

**A)** Returns 1 (last value in output range)
**B)** Returns 0.5 (continues the pattern)
**C)** Throws an error (frame out of range)
**D)** Returns 1 (extrapolates using last segment's slope)

**✅ CORRECT ANSWER: A**

**Explanation:**
By default, `interpolate` uses `extend` extrapolation, which clamps to the last value:
- Frames 0-30: 1 → 1.5
- Frames 30-60: 1.5 → 1
- Frames 60+: stays at 1 (clamped)

To change this behavior:
```tsx
interpolate(frame, [0, 30, 60], [1, 1.5, 1], {
  extrapolateLeft: 'clamp',   // before frame 0
  extrapolateRight: 'extend'  // after frame 60 (continues slope)
})
```

**Why Other Options Are Wrong:**
- **B:** Interpolate doesn't detect patterns - you'd need `extrapolateRight: 'extend'` for continued slope.
- **C:** No error - interpolate handles out-of-range gracefully.
- **D:** Default is clamp, not extend. You must opt-in to extrapolation.

**Key Takeaway:** `interpolate` clamps to edge values by default. Use `extrapolateRight: 'extend'` for continued animation.

---

## Question 12: Composition Resolution vs Canvas

Your composition config is:
```ts
width: 1080,
height: 1920,
```

But you render with:
```bash
--scale=0.5
```

What's the output resolution?

**A)** 1080x1920 (scale only affects preview)
**B)** 540x960 (half of original)
**C)** 1080x1920 rendered faster (scale is performance hint)
**D)** Error: scale must be 1 for final render

**✅ CORRECT ANSWER: B**

**Explanation:**
`--scale` directly affects output resolution:
- `--scale=0.5` → 540×960 output
- `--scale=2` → 2160×3840 output

This is useful for:
- Quick preview renders (scale=0.5)
- High-quality exports (scale=2 for supersampling)
- Testing without full render time

For production, always use `--scale=1` (or omit it).

**Why Other Options Are Wrong:**
- **A:** Scale affects final output, not just preview.
- **C:** Scale doesn't just speed up - it actually reduces resolution.
- **D:** No error - scale is explicitly for controlling output resolution.

**Key Takeaway:** `--scale` changes output resolution. For final renders, always use scale=1 or omit it.

---

## Question 13: Caption Generation Timing

In your workflow, when should captions be generated?

**A)** Before rendering (as input to the composition)
**B)** During rendering (as part of the video)
**C)** After rendering (from the JSON content, saved separately)
**D)** Doesn't matter, all approaches work the same

**✅ CORRECT ANSWER: C**

**Explanation:**
Based on your `bilan-video` workflow, captions are:
1. Generated AFTER rendering
2. Saved to separate `.txt` files per platform
3. Formatted specifically for each platform (TikTok vs Instagram vs Twitter)
4. Used for copy-paste when uploading

This approach is best because:
- Captions differ per platform (length, hashtags, format)
- You can update captions without re-rendering
- Social media managers can easily copy-paste
- Same video can have different caption strategies

**Why Other Options Are Wrong:**
- **A:** Captions aren't rendered into the video - they're separate text for post description.
- **B:** You could burn captions into video, but this isn't your workflow and limits flexibility.
- **D:** Timing matters significantly for workflow efficiency and flexibility.

**Key Takeaway:** Generate platform-specific captions AFTER rendering from the same source JSON. Keep video and text separate.

---

## Question 14: QA Validation Logic

Your QA script checks if file size is under the platform limit. A video is 15.8MB but the limit is 16MB. However, the video FAILS upload to WhatsApp. What's the most likely gotcha?

**A)** MB calculation differs (1000KB vs 1024KB)
**B)** WhatsApp adds metadata that increases size
**C)** The platform spec is outdated
**D)** Network upload affects file size calculation

**✅ CORRECT ANSWER: A**

**Explanation:**
File size ambiguity:
- **MiB (mebibyte):** 1024 KB = 1 MiB (binary, true file size)
- **MB (megabyte):** 1000 KB = 1 MB (decimal, marketing)

Your 15.8MB file might actually be:
- 15.8 × 1024 × 1024 = 16,560,742 bytes (16.56 MB)
- This exceeds the 16 MB (16,777,216 bytes) limit

**Solution:** Use binary calculation in your QA:
```javascript
const fileSizeInMiB = stats.size / (1024 * 1024);
if (fileSizeInMiB > 15.26) { // 16 MB in MiB
  console.warn('File too large');
}
```

**Why Other Options Are Wrong:**
- **B:** Metadata is negligible (few KB), wouldn't cause this issue.
- **C:** Limits are usually stable, and would affect all videos.
- **D:** Network doesn't change file size, just transfer speed.

**Key Takeaway:** Always use binary (1024-based) calculations for file sizes. Leave 5% buffer below limits.

---

## Question 15: Template Reusability Edge Case

You have `QuickTipVideo.tsx` that works perfectly for TikTok (9:16). You copy it to create `QuickTipSquare.tsx` for Instagram (1:1) and just change the composition dimensions. The render succeeds but text is cut off. What's the gotcha?

**A)** The text positioning uses absolute coordinates (px) instead of percentages
**B)** Font size doesn't scale automatically with dimensions
**C)** Safe zones are different between 9:16 and 1:1
**D)** All of the above can cause text cutoff

**✅ CORRECT ANSWER: D**

**Explanation:**
All three issues commonly occur when adapting templates:

**A) Absolute positioning:**
```tsx
// ❌ Breaks on different aspect ratios
<div style={{top: 200, left: 100}}>

// ✅ Works across ratios
<div style={{top: '10%', left: '5%'}}>
```

**B) Font size:**
```tsx
// ❌ Same font size in 1920px and 1080px looks different
fontSize: '48px'

// ✅ Scales with container
fontSize: `${height * 0.05}px`
```

**C) Safe zones:**
- 9:16: Top/bottom safe zones more critical (mobile UI)
- 1:1: All edges equally important
- Text at top: 10% in 9:16 might be in safe zone, but in 1:1 it's edge

**Solution:** Use responsive units and `useVideoConfig()`:
```tsx
const {width, height} = useVideoConfig();
const fontSize = height * 0.06;
const padding = width * 0.05;
```

**Key Takeaway:** NEVER hard-code pixel values in multi-format templates. Always use percentages or calculations based on `useVideoConfig()`.

---

## 📊 Scoring Guide

Calculate your score:

**13-15 correct (87-100%):** 🏆 **MASTERY**
You have deep understanding of Remotion rendering. You understand edge cases, common gotchas, and best practices. Ready for complex multi-platform workflows.

**11-12 correct (73-80%):** ✅ **STRONG**
Solid foundation with minor gaps. Review the questions you missed - they likely cover edge cases you haven't encountered yet.

**8-10 correct (53-67%):** ⚠️ **MODERATE**
You understand basics but need more practice with edge cases. Focus on: frame calculations, props handling, and platform-specific rendering.

**Below 8 (< 53%):** 📚 **REVIEW NEEDED**
Revisit Remotion fundamentals. Practice with simple renders before tackling multi-platform workflows.

---

## 🎯 Key Concepts to Master

Based on this quiz, ensure you understand:

1. **Frame Math:** 0-indexing, fps calculations, duration formulas
2. **Props Flow:** How data moves from JSON → CLI → Component
3. **Performance:** Pixel count impact, render time estimation
4. **Timing:** useCurrentFrame(), interpolate(), Sequence boundaries
5. **Platform Specs:** Resolution, file size (binary vs decimal), codec trade-offs
6. **Async Gotchas:** Why async doesn't work in Remotion components
7. **Responsive Design:** Using percentages and useVideoConfig() for multi-format
8. **Quality Control:** Bitrate, compression artifacts, QA validation

---

## 📚 Recommended Practice

1. **Experiment with interpolate extrapolation modes**
2. **Practice frame calculations** for different fps and durations
3. **Build a responsive template** that works across all 4 aspect ratios
4. **Profile render times** for different resolutions
5. **Test file size optimizations** with different CRF/bitrate settings

---

**Quiz Generated:** 2026-02-10
**Based on:** bilan-video project, Remotion 4.0.409
**Skill Used:** learning-quiz-generator (global skill)

---

## 💡 Want More?

Use the `learning-quiz-generator` skill for any topic:
- "Quiz me on React hooks edge cases"
- "Test my TypeScript generics understanding"
- "Create a git rebase gotchas quiz"

The skill adapts to any domain! 🚀
