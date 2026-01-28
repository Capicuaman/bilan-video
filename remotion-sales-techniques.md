# Remotion Sales Conversion Techniques

## Psychological Timing Techniques

### Golden 3-Second Hook
Use `useCurrentFrame()` to create dynamic intros that grab attention immediately
```javascript
const frame = useCurrentFrame();
const opacity = Math.min(1, frame / 15); // First 0.5 seconds at 30fps
```

### Micro-Pacing
Vary animation speeds with `interpolate()` to maintain engagement
```javascript
const scale = interpolate(
  frame,
  [0, 30, 60],
  [0, 1.2, 1],
  { extrapolateRight: 'clamp' }
);
```

### Peak-End Timing
Place key messages at frames 30% and 85% through video duration
```javascript
const { fps, durationInFrames } = useVideoConfig();
const firstPeak = Math.floor(durationInFrames * 0.3);
const finalPeak = Math.floor(durationInFrames * 0.85);
```

## Visual Persuasion Elements

### Social Proof Overlays
Animate customer testimonials with `spring()` physics
```javascript
const testimonialY = spring({
  frame,
  fps,
  config: { damping: 12 },
});
```

### Scarcity Counters
Real-time countdown timers using `useState()` + `useCurrentFrame()`
```javascript
const [timeLeft, setTimeLeft] = useState(3600);
useEffect(() => {
  if (frame % 30 === 0) setTimeLeft(prev => Math.max(0, prev - 1));
}, [frame]);
```

### Authority Badges
Certifications/logos that fade in with `sequence()` timing
```javascript
const badges = sequence({
  durationInFrames,
  fps,
  sequences: [
    { from: 0, to: 60, component: TrustBadge },
    { from: 90, to: 150, component: QualitySeal },
  ],
});
```

## Interactive Conversion Triggers

### Progressive CTAs
Multiple call-to-action points that escalate urgency
```javascript
const ctaIntensity = interpolate(
  frame,
  [0, 120, 240],
  [0, 0.5, 1],
  { extrapolateRight: 'clamp' }
);
```

### FOMO Animations
"Only 3 left" counters with pulsing effects
```javascript
const pulse = Math.sin(frame * 0.1) * 0.2 + 1;
const color = frame % 60 < 30 ? '#ff4444' : '#ff6666';
```

### Price Anchoring
Compare old vs new prices with strikethrough animations
```javascript
const strikethroughWidth = interpolate(
  frame,
  [180, 210],
  [0, 100],
  { extrapolateRight: 'clamp' }
);
```

## Data-Driven Personalization

### Dynamic Content
Use input props to customize videos per viewer segment
```javascript
export const PersonalizedVideo = ({ viewerData, productRecommendations }) => {
  return (
    <>
      <Text>{viewerData.name}, tu oferta especial:</Text>
      <ProductGrid products={productRecommendations} />
    </>
  );
};
```

### Behavioral Triggers
Different endings based on imagined user actions
```javascript
const ending = viewerData.previousPurchases.length > 0 
  ? <LoyaltyOffer /> 
  : <WelcomeOffer />;
```

### Geo-Targeting
Location-specific offers with conditional rendering
```javascript
const offer = viewerData.location === 'MX' 
  ? <MexicoOffer /> 
  : <InternationalOffer />;
```

## Retention Optimization

### Pattern Interrupts
Sudden scene changes every 5-7 seconds
```javascript
const sceneNumber = Math.floor(frame / (fps * 6)); // Change every 6 seconds
const backgroundColor = ['#ffffff', '#f0f0f0', '#e0e0e0'][sceneNumber % 3];
```

### Rhythm Control
Sync key frames to audio beats
```javascript
const beatFrames = [0, 30, 60, 90, 120]; // Sync to audio
const shouldHighlight = beatFrames.includes(frame % 150);
```

### Curiosity Gaps
Tease information then reveal later in video
```javascript
const revealProgress = Math.max(0, (frame - 180) / 60); // Reveal after 6 seconds
const textOpacity = Math.min(1, revealProgress);
```

## Trust Building

### Transparency Effects
Show "behind the scenes" with animated overlays
```javascript
const behindTheScenes = frame > 240 ? (
  <BehindTheScenes opacity={Math.min(1, (frame - 240) / 60)} />
) : null;
```

### Process Visualization
Animate how your product works step-by-step
```javascript
const stepNumber = Math.floor(frame / (fps * 2)) % 4; // 2 seconds per step
return (
  <ProcessStep 
    step={stepNumber} 
    progress={(frame % (fps * 2)) / (fps * 2)} 
  />
);
```

### Risk Reversal
Money-back guarantees with prominent animations
```javascript
const guaranteeScale = spring({
  frame: frame - 300, // Start at 10 seconds
  fps,
  config: { mass: 1, damping: 10 },
});
```

## Conversion Psychology

### Reciprocity
Free value in first 10 seconds before asking
```javascript
const freeValueEnd = fps * 10; // 10 seconds of free content
const isAskingPhase = frame > freeValueEnd;
```

### Commitment
Small "yes" moments leading to bigger ask
```javascript
const commitmentLevel = Math.min(3, Math.floor(frame / (fps * 5)));
const microCommitments = [
  "¿Te gusta? (Like)",
  "¿Compartes? (Share)",
  "¿Compras? (Buy)"
];
```

### Consensus
"Join 10,000+ satisfied customers" counters
```javascript
const customerCount = 10000 + Math.floor(frame / 10);
const counterSpeed = Math.sin(frame * 0.05) * 0.5 + 1;
```

## Platform Adaptation

### TikTok Optimization
```javascript
const tiktokConfig = {
  compositionWidth: 1080,
  compositionHeight: 1920, // 9:16 vertical
  fps: 30,
  durationInFrames: 900, // 30 seconds max
};
```

### YouTube Optimization
```javascript
const youtubeConfig = {
  compositionWidth: 1920,
  compositionHeight: 1080, // 16:9 horizontal
  fps: 30,
  durationInFrames: 3600, // 2 minutes ideal
};
```

### Instagram Reels
```javascript
const reelsConfig = {
  compositionWidth: 1080,
  compositionHeight: 1350, // 4:5 vertical
  fps: 30,
  durationInFrames: 900, // 30 seconds max
};
```

## Implementation Tips

1. **A/B Test Everything**: Create multiple versions with different techniques
2. **Analytics Integration**: Track which frames trigger conversions
3. **Mobile-First**: Ensure all techniques work on smaller screens
4. **Load Performance**: Optimize animations for smooth playback
5. **Accessibility**: Include captions and high contrast for all users

## Code Examples Repository

Create a library of reusable components:
- `UrgencyTimer.tsx`
- `SocialProofBar.tsx`
- `PriceComparison.tsx`
- `ProgressiveCTA.tsx`

Each component should accept props for customization and include built-in analytics tracking.