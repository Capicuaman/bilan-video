# Bilan Multi-Platform Video Generation: Comprehensive Study Guide

This study guide provides a detailed overview of the "bilan" video creation system, covering brand identity, technical workflows, platform-specific requirements, and compliance guidelines for automated social media content production.

---

## I. Key Concepts and Brand Identity

### 1. Brand Fundamentals
The brand identity for **bilan** is defined by strict stylistic and typographic rules to ensure consistency across all platforms.
*   **Naming Convention:** The brand name is always written in lowercase: **bilan**. Incorrect forms include BILAN, Bilan, or BiLan.
*   **Tagline:** The official tagline is "hidratación inteligente" (lowercase, including the accent).
*   **Handle:** The official social media handle is **@bilan.mx**.
*   **Visual Palette:** 
    *   **Background:** Blue (#0066CC).
    *   **Accents/Success/Truth:** Green (#22c55e).
    *   **Errors/Myths:** Red (#ef4444).
    *   **Text:** White (#FFFFFF).
*   **Typography:** The system exclusively uses **Montserrat Bold**. Font sizes are maximized for accessibility, ranging from 72px (Hero) to 36px (Caption).

### 2. Video Architecture: The MasterVideo Wrapper
Every video follows a standardized three-part structure to maintain brand authority:
1.  **BrandIntro (2.5s):** Features an animated logo entrance and the tagline "HIDRATACIÓN INTELIGENTE" in uppercase.
2.  **Content (Variable):** The duration depends on the format (QuickTip: 15s, Mythbusting: 30s, Educational: 60s, Trending: 40s).
3.  **BrandOutro (4s):** Includes a Call-to-Action (CTA), a larger 750px logo, the lowercase tagline, the @bilan.mx handle in a blue pill, and social prompts (Like, Comment, Share).

**The Critical Rule:** There must be **NO BLANK SCREENS**. Every second of the video must contain visual content, animations, or text to maintain audience engagement.

### 3. The 4-Stage Technical Pipeline
The system operates on a "Separation of Concerns" model where content is decoupled from layout.
*   **Stage 1: Content (JSON):** The manual "source of truth." Users author a JSON file defining the text, platform, and template.
*   **Stage 2: Script (Render):** A multi-platform generator reads the JSON and executes Remotion commands.
*   **Stage 3: Templates (React):** Define the visual layout. These are React components (QuickTip, Educational, etc.) registered as compositions in `Root.tsx`.
*   **Stage 4: Output (MP4):** Organized by platform in the `out/` directory.

---

## II. Short-Answer Practice Questions

**1. What is the specific rule regarding logo visibility during the transition to the outro?**
*Answer: Only one logo may be visible at a time. The top logo must fade out before the CTA/Outro logo appears.*

**2. How do the aspect ratios and durations differ between WhatsApp and Twitter outputs?**
*Answer: WhatsApp uses a Square (1:1) format with a 12-second duration. Twitter uses a Landscape (16:9) format with a 15-second duration.*

**3. What specific words must be avoided to remain compliant with TikTok health guidelines?**
*Answer: Words such as "cures," "treats," "heals," or making specific promises like "lose 10kg."*

**4. Describe the "Safe Language" alternative for the phrase "Cures dehydration."**
*Answer: The preferred alternative is "Supports hydration."*

**5. What is the difference between "Preview" mode and "Production" mode in the workflow?**
*Answer: "Preview" mode (`npm run dev`) is used for designing and iterating with hot-reloading in a visual studio UI. "Production" mode (`npm run render`) is used to generate the final MP4 files once the content is ready.*

**6. Which label badge color is used for "Myth" or "Antes" (Before) screens?**
*Answer: Red (#ef4444).*

---

## III. Essay Prompts for Deeper Exploration

### 1. The Strategy of Platform Optimization
Analyze how the bilan pipeline adapts content for different social environments. In your response, compare the WhatsApp strategy (short duration, direct messaging style) against the Twitter strategy (landscape, professional tone, 3-point educational format). Why is it necessary to vary the "Primary" and "Secondary" JSON fields for different platforms?

### 2. Compliance and Ethical Content Creation
Discuss the importance of the TikTok Compliance guidelines within the bilan system. Explain why the system mandates a shift from "scientifically proven" to "studies suggest," and the role of the required disclaimer: *"Consulta a un profesional de salud para consejos personalizados."* How does this protect the brand while maintaining its "intelligent hydration" authority?

### 3. Separation of Concerns in Video Production
Explain the "Mental Model" of the bilan workflow. How does the decoupling of content (JSON), layout (React templates), and rendering (scripts) create a "content factory"? What are the advantages of this approach for batch processing and multi-platform scaling?

---

## IV. Glossary of Important Terms

*   **BrandIntroPerfected / BrandOutroPerfected:** The production-ready React components used as brand bookends for all videos, superseding earlier experimental versions.
*   **Composition:** A named render target in Remotion with specific dimensions and duration (e.g., QuickTipSquare).
*   **Label Badges:** Visual elements (usually rounded pills with shadows) used to highlight tips or categories. They are typically Green (#22c55e) for success/truth.
*   **MasterVideo:** The wrapper component that ensures every video generated includes the required Intro, Content, and Outro sections.
*   **Multi-Platform Generator:** The `.mjs` script that reads JSON input and automates the rendering process for TikTok, WhatsApp, Instagram, and Twitter simultaneously.
*   **QuickTip:** A specific content format designed for 12–15 second engagement, focusing on a single primary tip and a supporting reason.
*   **Remotion:** The framework used to turn animated React components into video frames and MP4 files via ffmpeg.
*   **Source of Truth:** In this workflow, it refers to the JSON file in the `content/` folder, which is the only file authored manually to generate a video.