# BILAN Video Props Guide

## QuickTip (15 seconds)
Fast, punchy tip videos.

```json
{
  "tip": "Main tip text (keep short, ~10 words)",
  "reason": "Why this matters (1-2 sentences)",
  "cta": "Call to action (2-4 words)"
}
```

**Example:**
```json
{
  "tip": "Toma electrolitos 30 min antes de entrenar",
  "reason": "Prepara tus músculos y evita calambres",
  "cta": "Entrena mejor"
}
```

---

## Mythbusting (30 seconds)
Debunk a common myth.

```json
{
  "title": "Topic being debunked",
  "myth": "The false belief (in quotes)",
  "truth": "The actual fact",
  "explanation": "Brief explanation why",
  "cta": "Call to action"
}
```

**Example:**
```json
{
  "title": "La sal es tu enemiga",
  "myth": "La sal siempre es mala para la salud",
  "truth": "El sodio es ESENCIAL para tu cuerpo",
  "explanation": "Sin sodio no puedes retener agua ni contraer músculos",
  "cta": "Entiende la ciencia"
}
```

---

## Educational (60 seconds)
Deep dive with multiple points.

```json
{
  "title": "Topic name (short)",
  "hook": "Opening question or hook",
  "mainPoints": [
    "Point 1",
    "Point 2", 
    "Point 3"
  ],
  "conclusion": "Summary statement",
  "cta": "Call to action"
}
```

**Example:**
```json
{
  "title": "Beneficios del Magnesio",
  "hook": "¿Sabías que el 75% de los mexicanos no consume suficiente magnesio?",
  "mainPoints": [
    "Reduce calambres musculares",
    "Mejora la calidad del sueño",
    "Acelera la recuperación post-entreno"
  ],
  "conclusion": "Por eso BILAN usa glicinato de magnesio",
  "cta": "Prueba BILAN"
}
```

---

## Trending (40 seconds)
Transformation/POV/Challenge format.

```json
{
  "title": "Video title",
  "hook": "Opening hook text",
  "scenes": [
    "Scene 1 (before/problem)",
    "Scene 2 (discovery)",
    "Scene 3 (change)",
    "Scene 4 (after/result)"
  ],
  "trendingFormat": "transformation",
  "cta": "Call to action"
}
```

**Formats:** `transformation`, `pov`, `challenge`, `duet`

**Example:**
```json
{
  "title": "Mi transformación BILAN",
  "hook": "POV: Descubres que llevas años hidratándote mal",
  "scenes": [
    "Siempre cansado aunque tomaba mucha agua",
    "Investigué sobre electrolitos",
    "Empecé a usar BILAN diario",
    "Ahora tengo energía todo el día"
  ],
  "trendingFormat": "transformation",
  "cta": "Tu turno de cambiar"
}
```

---

## Batch Rendering Workflow

### Step 1: Create a props folder
```bash
mkdir -p ~/Documents/bilan-video/content
```

### Step 2: Create JSON files for each video
```bash
# content/tip_001.json
# content/tip_002.json
# etc.
```

### Step 3: Render batch with a loop
```bash
cd ~/Documents/bilan-video

for f in content/tip_*.json; do
  name=$(basename "$f" .json)
  npx remotion render QuickTip "out/${name}.mp4" --props="$f"
done
```

---

## Tips for Good Props

1. **Keep text short** - TikTok moves fast
2. **One idea per video** - Don't overload
3. **Strong hooks** - First 3 seconds matter
4. **Clear CTAs** - Tell them what to do
5. **Use questions** - Engages viewers

---

## Quick Render Commands

```bash
# Preview in browser (live reload)
npm run dev

# Render single video with default props
npx remotion render QuickTip out/quicktip.mp4

# Render with inline props
npx remotion render QuickTip out/custom.mp4 --props='{"tip":"Tu tip","reason":"Tu razón","cta":"CTA"}'

# Render from JSON file
npx remotion render QuickTip out/from_file.mp4 --props=content/tip_001.json

# Render all compositions
npx remotion render
```
