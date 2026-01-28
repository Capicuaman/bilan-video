# How to Use the A/B Testing Framework

## **Step 1: Update Your Existing Components**

### **Modify BrandIntro.tsx**
```tsx
// src/components/BrandIntro.tsx
import { brand, getFontStack } from '../brand';

interface BrandIntroProps {
  variant?: 'A' | 'B' | 'C' | 'D' | 'E';
  videoType?: 'Mythbusting' | 'Educational' | 'QuickTip' | 'Trending';
  customTagline?: string;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({
  variant = 'A',
  videoType = 'Mythbusting',
  customTagline
}) => {
  // Get tagline based on variant and video type
  const getTagline = () => {
    const hooks = {
      Mythbusting: ["¿MITO O REALIDAD?", "LO QUE NUNCA TE DIJERON", "DESVANECIENDO MITOS", "LA VERDAD OCULTA", "MENTIRAS DE LA INDUSTRIA"],
      Educational: ["CLASE MAESTRA DE HIDRATACIÓN", "APRENDE DE LOS EXPERTOS", "BIENVENIDO A LA CIENCIA", "EL MUNDO INTERNO DE TU CUERPO", "CONOCIMIENTO QUE RINDE"],
      QuickTip: ["TRUCO EN 15 SEGUNDOS", "AHORA MISMO: PRUEBA ESTO", "EL SECRETO RÁPIDO", "TIP DE EXPERTO", "CAMBIA TU HOY"],
      Trending: ["POV: ESTÁS HACIÉNDOLO MAL", "TRANSFORMACIÓN EN 60 SEG", "ESTÁS VIENDO EL FUTURO", "LO QUE TODOS ESTÁN HACIENDO", "NO TE QUEDES AFUERA"]
    };
    
    return customTagline || hooks[videoType][parseInt(variant) - 1];
  };

  const tagline = getTagline();
  
  // Use your existing animation logic
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // ... rest of your existing BrandIntro code
  // Just replace the hardcoded tagline with the dynamic one above
};
```

### **Modify BrandOutro.tsx**
```tsx
// src/components/BrandOutro.tsx
interface BrandOutroProps {
  variant?: 'A' | 'B' | 'C' | 'D' | 'E';
  customCTA?: string;
}

export const BrandOutro: React.FC<BrandOutroProps> = ({
  variant = 'A',
  customCTA
}) => {
  const getCTAContent = () => {
    const variants = {
      A: { cta: "¡Síguenos para más tips!", handle: "@bilan.mx" },
      B: { cta: "TU CUERPO TE LO PEDIRÁ", handle: "Ordena ahora →" },
      C: { cta: "PRUÉBALO 7 DÍAS Y CUÉNTANOS", handle: "@bilan.mx #RetoBilan" },
      D: { cta: "COMPROBADO POR LA CIENCIA", handle: "Ver estudios →" },
      E: { cta: "20% DESCUENTO SOLO HOY", handle: "CÓDIGO: HIDRATA20" }
    };
    
    return variants[variant];
  };

  const { cta, handle } = customCTA ? { cta: customCTA, handle: "" } : getCTAContent();
  
  // ... rest of your existing BrandOutro code
};
```

## **Step 2: Update Video Templates**

### **Modify Your Template Components**
```tsx
// src/templates/MythbustingVideo.tsx (and others)
interface MythbustingVideoProps {
  contentProps: any;
  introVariant?: 'A' | 'B' | 'C' | 'D' | 'E';
  outroVariant?: 'A' | 'B' | 'C' | 'D' | 'E';
}

export const MythbustingVideo: React.FC<MythbustingVideoProps> = ({
  contentProps,
  introVariant = 'A',
  outroVariant = 'A'
}) => {
  return (
    <>
      <BrandIntro 
        variant={introVariant} 
        videoType="Mythbusting" 
      />
      {/* Your existing video content */}
      <BrandOutro variant={outroVariant} />
    </>
  );
};
```

## **Step 3: Update Composition.tsx**
```tsx
// src/Composition.tsx
import { MythbustingVideo, EducationalVideo, QuickTipVideo, TrendingVideo } from './templates';

export const MyComposition: React.FC<any> = ({ 
  contentProps, 
  template,
  introVariant = 'A',
  outroVariant = 'A'
}) => {
  const templates = {
    'Mythbusting': MythbustingVideo,
    'Educational': EducationalVideo, 
    'QuickTip': QuickTipVideo,
    'Trending': TrendingVideo
  };

  const VideoComponent = templates[template];

  return (
    <VideoComponent 
      contentProps={contentProps}
      introVariant={introVariant}
      outroVariant={outroVariant}
    />
  );
};
```

## **Step 4: Create Test Scripts**

### **Simple Test Script**
```bash
#!/bin/bash
# scripts/run-ab-test.sh

# Read configuration
TEST_CONFIG=$(cat data/ab-test-config.json)

# Generate videos for each test
echo "Running A/B tests..."

for test in test-01 test-02 test-03 test-04 test-05; do
  echo "Generating $test..."
  
  # Get variant info from config
  INTRO=$(echo $TEST_CONFIG | jq -r ".testMatrix[] | select(.id==\"$test\") | .introVariant")
  OUTRO=$(echo $TEST_CONFIG | jq -r ".testMatrix[] | select(.id==\"$test\") | .outroVariant")
  VIDEOS=$(echo $TEST_CONFIG | jq -r ".testMatrix[] | select(.id==\"$test\") | .videos[]")
  
  for video in $VIDEOS; do
    echo "  Rendering $video with intro $INTRO, outro $OUTRO"
    
    npx remotion render MyComposition "out/ab-test/${video}-${test}.mp4" \
      --props="{\"contentProps\": $(cat data/videos-batch-01.json | jq ".videos[] | select(.filename==\"$video\") | .props"), \"template\": \"Mythbusting\", \"introVariant\": \"$INTRO\", \"outroVariant\": \"$OUTRO\"}"
  done
done

echo "A/B test videos generated in out/ab-test/"
```

### **Make script executable**
```bash
chmod +x scripts/run-ab-test.sh
./scripts/run-ab-test.sh
```

## **Step 5: Run Specific Tests**

### **Quick Test One Video**
```bash
# Test single video with Variant B intro/outro
npx remotion render MyComposition "out/test/04-trampa-bebidas-B.mp4" \
  --props="{\"contentProps\": $(cat data/videos-batch-01.json | jq '.videos[] | select(.filename=="04-trampa-bebidas") | .props'), \"template\": \"Mythbusting\", \"introVariant\": \"B\", \"outroVariant\": \"B\"}"
```

### **Batch Generate All Variants for One Video**
```bash
# Create scripts/batch-generate.sh
VIDEO="04-trampa-bebidas"
TEMPLATE="Mythbusting"

for variant in A B C D E; do
  echo "Generating $VIDEO with variant $variant..."
  npx remotion render MyComposition "out/batch/${VIDEO}-${variant}.mp4" \
    --props="{\"contentProps\": $(cat data/videos-batch-01.json | jq ".videos[] | select(.filename==\"$VIDEO\") | .props"), \"template\": \"$TEMPLATE\", \"introVariant\": \"$variant\", \"outroVariant\": \"$variant\"}"
done
```

## **Step 6: Track Results**

### **Create Analytics Tracker**
```tsx
// src/components/AnalyticsTracker.tsx
interface AnalyticsTrackerProps {
  videoId: string;
  introVariant: string;
  outroVariant: string;
}

export const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({
  videoId,
  introVariant,
  outroVariant
}) => {
  // Add overlay for tracking (optional, remove for production)
  const frame = useCurrentFrame();
  
  if (frame < 30) { // Show only first second
    return (
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 12,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '4px 8px',
        borderRadius: 4
      }}>
        {videoId} | Intro: {introVariant} | Outro: {outroVariant}
      </div>
    );
  }
  
  return null;
};
```

### **Add to Templates**
```tsx
// Add to your video templates
<AnalyticsTracker 
  videoId={contentProps.filename}
  introVariant={introVariant}
  outroVariant={outroVariant}
/>
```

## **Step 7: Compare Results**

### **Create Results Tracker**
```json
// data/results.json
{
  "videos": [
    {
      "id": "04-trampa-bebidas",
      "variants": {
        "A": {
          "views": 0,
          "completionRate": 0,
          "engagement": 0,
          "conversions": 0
        },
        "B": {
          "views": 0, 
          "completionRate": 0,
          "engagement": 0,
          "conversions": 0
        }
      }
    }
  ]
}
```

## **Step 8: Production Workflow**

### **1. Test Phase (Week 1-2)**
```bash
# Generate test variants
./scripts/run-ab-test.sh

# Post on social media with different captions
# Track which performs better
```

### **2. Analysis Phase (Week 3)**
```bash
# Review analytics
# Pick winning variant for each video type
```

### **3. Implementation Phase (Week 4)**
```bash
# Update default variants in templates
# Generate final videos with winning variants
```

## **Quick Start Checklist**

- [ ] Update `BrandIntro.tsx` to accept variant props
- [ ] Update `BrandOutro.tsx` to accept variant props  
- [ ] Update video templates to pass variant props
- [ ] Create `scripts/run-ab-test.sh`
- [ ] Run: `./scripts/run-ab-test.sh`
- [ ] Upload test videos to social media
- [ ] Track performance for 1 week
- [ ] Choose winning variants
- [ ] Update defaults and regenerate final videos

## **Tips for Success**

1. **Start Small**: Test 1-2 videos first
2. **Use Analytics**: Track views, completion, engagement
3. **Wait 7 Days**: Get meaningful data before deciding
4. **Document Results**: Keep track of what works
5. **Iterate**: Use learnings to create new variants

This framework lets you scientifically test which hooks and CTAs convert best for your hydration education videos!