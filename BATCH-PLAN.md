# Batch Video Generation Plan
## bilan TikTok Campaign - January 2026

**Source:** `/home/capicuaman/Documents/textDump/01_PROJECTS/BILAN/MARKETING/SOCIAL-MEDIA/TikTok/testing/`
**Output:** `~/Documents/bilan-video/out/batch-01/`

---

## 📋 Video Mapping

| # | Title | Template | Duration | Format |
|---|-------|----------|----------|--------|
| 1 | La Verdad sobre la Sal | Educational | 60s | Standard |
| 2 | 3 Señales de Deshidratación | QuickTip | 30s | List |
| 3 | El Mito de los 8 Vasos | Mythbusting | 45s | Standard |
| 4 | Trampa de Bebidas Deportivas | Mythbusting | 45s | Standard |
| 5 | Cómo Me Curé de los Calambres | Trending | 60s | Transformation |
| 6 | Transformación en el Gym | Trending | 60s | Transformation |
| 7 | Tip de Hidratación 15s | QuickTip | 15s | Demo |
| 8 | Secreto de los Atletas | QuickTip | 30s | Standard |
| 9 | POV Olvidas Electrolitos | Trending | 30s | POV |
| 10 | Tutorial Hidratación Perfecta | Trending | 45s | Tutorial |

---

## 🎬 Template Distribution

```
Educational (1 video)  → #1
QuickTip (3 videos)    → #2, #7, #8  
Mythbusting (2 videos) → #3, #4
Trending (4 videos)    → #5, #6, #9, #10
```

---

## 📊 Content Summary

### Video #1: La Verdad sobre la Sal
- **Template:** Educational
- **Duration:** 60s (1800 frames @ 30fps)
- **Hook:** "¿Por qué nos dijeron que la sal es mala pero los atletas profesionales la consumen a montones?"
- **Points:**
  - Pierdes 500-1000mg de sodio por litro de sudor
  - Durante ejercicio intenso pierdes hasta 2L por hora
  - La mayoría de bebidas deportivas solo tienen 20-50mg
- **Conclusion:** bilan tiene 1000mg de sodio por porción
- **CTA:** Dime en los comentarios si ya sabías esto

### Video #2: 3 Señales de Deshidratación  
- **Template:** QuickTip
- **Duration:** 30s (900 frames @ 30fps)
- **Hook:** "El 75% de los mexicanos están deshidratados ahora mismo"
- **Tips:**
  - Orina amarillo oscuro significa modo emergencia
  - Cansancio que no se va ni con café
  - Antojos locos de sal o azúcar
- **CTA:** Guarda este video y chécate

### Video #3: El Mito de los 8 Vasos
- **Template:** Mythbusting
- **Duration:** 45s (1350 frames @ 30fps)
- **Hook:** "Los 8 vasos de agua al día son un mito"
- **Myth:** Este consejo viene de un estudio de los años 40 mal interpretado
- **Truth:** Tu necesidad de agua depende de tu peso, actividad y clima
- **CTA:** Dime cuánta agua tomas tú al día

### Video #4: Trampa de Bebidas Deportivas
- **Template:** Mythbusting
- **Duration:** 45s (1350 frames @ 30fps)
- **Hook:** "Me gasté cientos de pesos en bebidas deportivas antes de darme cuenta que me estaban viendo la cara"
- **Myth:** Las bebidas deportivas del súper tienen solo 20-50mg de sodio
- **Truth:** Necesitas 500-1000mg por litro de sudor
- **CTA:** Lee la etiqueta la próxima vez

### Video #5: Cómo Me Curé de los Calambres
- **Template:** Trending (transformation)
- **Duration:** 60s (1800 frames @ 30fps)
- **Hook:** "Durante 3 años no pude terminar un partido de futbol completo por los calambres"
- **Scenes:**
  - Calambres cada partido minuto 60-70
  - Probé plátanos, agua, pastillas - nada funcionó
  - Descubrí que necesitaba SODIO no solo potasio
  - Ahora juego 90 minutos completos sin calambres
- **CTA:** Dime dónde te dan calambres a ti

### Video #6: Transformación en el Gym
- **Template:** Trending (transformation)
- **Duration:** 60s (1800 frames @ 30fps)
- **Hook:** "Aumenté 15% mi rendimiento en el gym sin cambiar mi rutina ni mi dieta"
- **Scenes:**
  - Antes: Cansancio, dolores de cabeza, DOMS de 3-4 días
  - El cambio: Agregué electrolitos a mi hidratación
  - Después: Más energía, pesos subieron 10-15%
  - Solo agregué bilan
- **CTA:** Comenta tu ejercicio principal

### Video #7: Tip de Hidratación 15s
- **Template:** QuickTip
- **Duration:** 15s (450 frames @ 30fps)
- **Hook:** "Este truco de hidratación te puede salvar"
- **Tip:** Pellizca tu piel en el dorso de la mano
- **Reason:** Si vuelve lento = deshidratado, si vuelve rápido = bien
- **CTA:** Guarda esto y usa bilan

### Video #8: Secreto de los Atletas
- **Template:** QuickTip
- **Duration:** 30s (900 frames @ 30fps)
- **Hook:** "Los atletas profesionales no toman agua durante entrenamientos. Toman esto"
- **Tip:** Cuando sudas intensamente el agua sola no te rehidrata
- **Reason:** Los atletas reponen 1000mg de sodio por hora
- **CTA:** Sígueme para más secretos

### Video #9: POV Olvidas Electrolitos
- **Template:** Trending (pov)
- **Duration:** 30s (900 frames @ 30fps)
- **Hook:** "POV: Olvidaste tus electrolitos y ya vas en el minuto 45 de cardio"
- **Scenes:**
  - Minuto 15: Todo bien, estoy bien
  - Minuto 30: ¿Por qué me siento mareado?
  - Minuto 45: Chale, me está dando calambre
  - Minuto 60: ¿Por qué me odia mi cuerpo?
- **CTA:** No seas payaso, trae tu bilan

### Video #10: Tutorial Hidratación Perfecta
- **Template:** Trending (tutorial format, but using transformation style)
- **Duration:** 45s (1350 frames @ 30fps)
- **Hook:** "Tutorial: Cómo hidratarte como los atletas profesionales en 3 pasos"
- **Scenes:**
  - PASO 1: Pre-entrenamiento - 500ml con bilan 2h antes
  - PASO 2: Durante - 250ml cada 15-20min
  - PASO 3: Post - 500-750ml en la siguiente hora
- **CTA:** Guarda este tutorial

---

## 🛠️ Render Commands

### Individual Renders
```bash
# Video 1: Educational
npx remotion render src/index.ts Educational out/batch-01/01-verdad-sal.mp4 \
  --props="$(cat data/video-01.json)"

# Video 2: QuickTip  
npx remotion render src/index.ts QuickTip out/batch-01/02-senales-deshidratacion.mp4 \
  --props="$(cat data/video-02.json)"

# etc...
```

### Batch Render
```bash
./scripts/render-batch.sh
```

---

## 📁 Output Structure

```
out/
  batch-01/
    01-verdad-sal.mp4
    02-senales-deshidratacion.mp4
    03-mito-8-vasos.mp4
    04-trampa-bebidas.mp4
    05-cure-calambres.mp4
    06-transformacion-gym.mp4
    07-tip-hidratacion.mp4
    08-secreto-atletas.mp4
    09-pov-olvidas.mp4
    10-tutorial-hidratacion.mp4
```

---

## ⏱️ Estimated Render Time

| Video | Frames | Est. Time |
|-------|--------|-----------|
| #1 | 1800 | ~2 min |
| #2 | 900 | ~1 min |
| #3 | 1350 | ~1.5 min |
| #4 | 1350 | ~1.5 min |
| #5 | 1800 | ~2 min |
| #6 | 1800 | ~2 min |
| #7 | 450 | ~30 sec |
| #8 | 900 | ~1 min |
| #9 | 900 | ~1 min |
| #10 | 1350 | ~1.5 min |
| **Total** | **12,600** | **~14 min** |

---

## 📈 Expected Performance

| Video | Category | Expected Views (24h) | Engagement |
|-------|----------|---------------------|------------|
| #1 | Educational | 3,000-8,000 | 6-8% |
| #2 | QuickTip | 15,000-50,000 | 14-18% |
| #3 | Mythbusting | 4,000-12,000 | 9-12% |
| #4 | Mythbusting | 6,000-20,000 | 10-14% |
| #5 | Transformation | 8,000-25,000 | 11-15% |
| #6 | Transformation | 10,000-30,000 | 12-16% |
| #7 | QuickTip | 15,000-50,000 | 14-18% |
| #8 | QuickTip | 8,000-25,000 | 10-13% |
| #9 | POV | 20,000-70,000 | 15-20% |
| #10 | Tutorial | 6,000-18,000 | 9-12% |

**Top performers predicted:** #9 (POV), #2, #7 (QuickTips)

---

## 🚀 Next Steps

1. [ ] Review and adjust props in `data/videos-batch-01.json`
2. [ ] Run batch render: `./scripts/render-batch.sh`
3. [ ] Review rendered videos
4. [ ] Export to TikTok testing folder
5. [ ] Create captions for each video
6. [ ] Schedule publishing (Week 1-4 rollout)
7. [ ] Track engagement using template

---

**Created:** 2026-01-26
**Status:** Ready to render
