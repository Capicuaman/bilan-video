# 📋 Data Input Format for Multi-Platform Video Generation

*Complete JSON schema for automated video creation across all social platforms*

---

## 🎯 Standard Input Format

### Basic Content Schema
```json
{
  "contentId": "BILAN_001", 
  "topic": "electrolitos-basics",
  "category": "educational",
  "tip": "Los electrolitos no son solo sal",
  "reason": "Son minerales esenciales: sodio, potasio y magnesio que tu cuerpo necesita para funcionar correctamente",
  "cta": "Hidrátate con ciencia",
  "title": "3 Electrolitos Esenciales", 
  "subtitle": "Lo que tu cuerpo realmente necesita",
  "keyPoint1": "SODIO\nBalance de líquidos y función nerviosa",
  "keyPoint2": "POTASIO\nContracción muscular y presión arterial", 
  "keyPoint3": "MAGNESIO\nRecuperación y relajación muscular",
  "conclusion": "Por eso bilan tiene los 3 en proporción científica",
  "hashtags": {
    "tiktok": ["#electrolitos", "#hidratacion", "#bilan", "#ciencia", "#salud"],
    "instagram": ["#ElectrolitosReales", "#HidratacionInteligente", "#Bilan"],
    "twitter": ["#electrolitos", "#hidratacion", "#salud"],
    "whatsapp": []
  }
}
```

---

## 🎨 Content Type Variations

### 1. Quick Tip Format
```json
{
  "contentId": "BILAN_TIP_001",
  "type": "quicktip",
  "topic": "hidratacion-post-ejercicio",
  "category": "tips",
  "tip": "Toma electrolitos 30 minutos después de entrenar",
  "reason": "Tu cuerpo pierde sodio y potasio a través del sudor y necesita reponerlos para recuperarse correctamente",
  "cta": "Optimiza tu recuperación",
  "targetAudience": "deportistas"
}
```

### 2. Myth-Busting Format  
```json
{
  "contentId": "BILAN_MYTH_001", 
  "type": "mythbusting",
  "topic": "sodio-mitos",
  "category": "educacion",
  "tip": "MITO: La sal es mala para ti",
  "reason": "REALIDAD: Tu cuerpo NECESITA sodio para mantener el equilibrio de líquidos y la función muscular correcta",
  "cta": "Aprende la ciencia real",
  "myth": "Debes evitar la sal completamente",
  "truth": "El sodio es esencial para tu salud",
  "explanation": "Sin sodio adecuado, puedes sufrir calambres, fatiga y deshidratación"
}
```

### 3. Educational Format (For Twitter Landscape)
```json
{
  "contentId": "BILAN_EDU_001",
  "type": "educational", 
  "topic": "electrolitos-esenciales",
  "category": "ciencia",
  "title": "3 Electrolitos Que Debes Conocer",
  "subtitle": "La ciencia detrás de la hidratación perfecta",
  "keyPoint1": "SODIO (Na+)\nRegula el balance de líquidos\nPreviene calambres musculares",
  "keyPoint2": "POTASIO (K+)\nEsencial para contracciones musculares\nMantiene la presión arterial",
  "keyPoint3": "MAGNESIO (Mg++)\nAyuda en la recuperación muscular\nMejora la calidad del sueño",
  "conclusion": "bilan combina los 3 en las proporciones científicamente probadas",
  "cta": "Hidrátate inteligentemente"
}
```

---

## 📱 Platform Mapping

| Field | TikTok | WhatsApp | Instagram | Twitter |
|-------|--------|----------|-----------|---------|
| **Primary** | `tip` | `tip` | `tip` | `title` |
| **Secondary** | `reason` | `reason` | `reason` | `subtitle` |
| **Call-to-Action** | `cta` | `cta` | `cta` | `conclusion` |
| **Format** | Vertical 9:16 | Square 1:1 | Square 1:1 | Landscape 16:9 |
| **Duration** | 15s | 12s | 15s | 15s |
| **Template** | QuickTip | QuickTipSquare | QuickTipSquare | EducationalLandscape |

---

## 🚀 Usage Commands

### Single Content Generation
```bash
# From JSON file
node scripts/multi-platform-generator.mjs BILAN_001 --from-file content/input.json

# All platforms
node scripts/multi-platform-generator.mjs BILAN_001 --from-file content/input.json

# Specific platforms
node scripts/multi-platform-generator.mjs BILAN_001 --from-file content/input.json --platforms tiktok,instagram

# Inline (quick test)
node scripts/multi-platform-generator.mjs BILAN_002 \
  --tip "Los electrolitos mejoran tu rendimiento" \
  --reason "Mantienen el equilibrio de líquidos" \
  --cta "Hidrátate con ciencia"
```

### Batch Processing
```bash
# Process multiple JSON files
for file in content/batch/*.json; do
  filename=$(basename "$file" .json)
  node scripts/multi-platform-generator.mjs "$filename" --from-file "$file"
done
```

---

## 📤 Output Structure

After processing, you get:

### File Structure
```
out/
├── tiktok/
│   ├── BILAN_001_tiktok.mp4
│   └── BILAN_001_tiktok_caption.txt
├── whatsapp/  
│   ├── BILAN_001_whatsapp.mp4
│   └── BILAN_001_whatsapp_caption.txt
├── instagram/
│   ├── BILAN_001_instagram.mp4 
│   └── BILAN_001_instagram_caption.txt
└── twitter/
    ├── BILAN_001_twitter.mp4
    └── BILAN_001_twitter_caption.txt

content/ready/
└── BILAN_001.json  # Complete record with metadata
```

### Generated Content Record
```json
{
  "contentId": "BILAN_001",
  "createdAt": "2026-02-09T14:21:00Z",
  "status": "ready",
  "content": {
    "tip": "Los electrolitos no son solo sal",
    "reason": "Son minerales esenciales...",
    "cta": "Hidrátate con ciencia"
  },
  "platforms": {
    "tiktok": {
      "videoFile": "out/tiktok/BILAN_001_tiktok.mp4",
      "captionFile": "out/tiktok/BILAN_001_tiktok_caption.txt", 
      "caption": "🔥 Los electrolitos no son solo sal\n\nSon minerales esenciales... #electrolitos #bilan",
      "status": "ready",
      "generatedAt": "2026-02-09T14:21:15Z",
      "renderTime": 24.6,
      "fileSize": "2.1MB",
      "duration": "15s",
      "dimensions": "1080x1920"
    },
    "whatsapp": {
      "videoFile": "out/whatsapp/BILAN_001_whatsapp.mp4",
      "captionFile": "out/whatsapp/BILAN_001_whatsapp_caption.txt",
      "caption": "📱 Los electrolitos no son solo sal\n\nSon minerales esenciales...",
      "status": "ready", 
      "generatedAt": "2026-02-09T14:21:45Z",
      "renderTime": 22.3,
      "fileSize": "1.3MB",
      "duration": "12s", 
      "dimensions": "1080x1080"
    },
    "instagram": {
      "videoFile": "out/instagram/BILAN_001_instagram.mp4",
      "captionFile": "out/instagram/BILAN_001_instagram_caption.txt",
      "caption": "💡 Los electrolitos no son solo sal\n\n✨ Son minerales esenciales... #ElectrolitosReales #Bilan",
      "status": "ready",
      "generatedAt": "2026-02-09T14:22:12Z", 
      "renderTime": 25.1,
      "fileSize": "1.8MB",
      "duration": "15s",
      "dimensions": "1080x1080"
    },
    "twitter": {
      "videoFile": "out/twitter/BILAN_001_twitter.mp4", 
      "captionFile": "out/twitter/BILAN_001_twitter_caption.txt",
      "caption": "🧵 3 Electrolitos Esenciales\n\nHilo 👇\n\nLo que tu cuerpo realmente necesita... #electrolitos",
      "status": "ready",
      "generatedAt": "2026-02-09T14:22:45Z",
      "renderTime": 28.7,
      "fileSize": "3.2MB", 
      "duration": "15s",
      "dimensions": "1920x1080"
    }
  }
}
```

---

## 📋 Content Templates

### Template 1: Daily Tips
```json
{
  "contentId": "DAILY_TIP_{{DATE}}",
  "type": "quicktip",
  "tip": "{{TIP_TEXT}}",
  "reason": "{{EXPLANATION}}", 
  "cta": "{{CALL_TO_ACTION}}",
  "topic": "{{CATEGORY}}",
  "category": "tips"
}
```

### Template 2: Scientific Facts
```json
{
  "contentId": "SCIENCE_{{NUMBER}}",
  "type": "educational",
  "title": "{{FACT_TITLE}}",
  "subtitle": "{{FACT_SUBTITLE}}", 
  "keyPoint1": "{{POINT_1}}",
  "keyPoint2": "{{POINT_2}}",
  "keyPoint3": "{{POINT_3}}",
  "conclusion": "{{CONCLUSION}}",
  "topic": "ciencia",
  "category": "educational"
}