import "./index.css";
import { Composition } from "remotion";
import {
  QuickTipVideo,
  MythbustingVideo,
  EducationalVideo,
  TrendingVideo,
} from "./templates";
import { QuickTipVideo as QuickTipVideoTest1 } from "./templates/QuickTipVideo-test1";
import { QuickTipVideo as QuickTipVideoTest2 } from "./templates/QuickTipVideo-test2";
import { QuickTipVideo as QuickTipVideoTest3 } from "./templates/QuickTipVideo-test3";
import { QuickTipVideo as QuickTipVideoTest4 } from "./templates/QuickTipVideo-test4";
import { QuickTipVideo as QuickTipVideoTest5 } from "./templates/QuickTipVideo-test5";
import { MasterVideo, getMasterVideoDuration } from "./templates/MasterVideo";
import { BrandIntro } from "./components/BrandIntro";
import { BrandIntroPerfected } from "./components/BrandIntroPerfected";
import { BrandOutro } from "./components/BrandOutro";
import { BrandOutroPerfected } from "./components/BrandOutroPerfected";

// TikTok vertical format
const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ============================================ */}
      {/* STANDALONE COMPONENTS (for preview/testing) */}
      {/* ============================================ */}

      {/* Brand Intro - standalone */}
      <Composition
        id="BrandIntro"
        component={BrandIntro}
        durationInFrames={FPS * 3}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          tagline: "HIDRATACIÓN INTELIGENTE",
        }}
      />

      {/* Brand Intro Perfected - standalone */}
      <Composition
        id="BrandIntroPerfected"
        component={BrandIntroPerfected}
        durationInFrames={FPS * 3}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          tagline: "hidratación inteligente",
        }}
      />

      {/* Brand Outro - standalone */}
      <Composition
        id="BrandOutro"
        component={BrandOutro}
        durationInFrames={FPS * 5}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          cta: "¡Síguenos para más tips!",
          handle: "@bilan.mx",
        }}
      />

      {/* Brand Outro Perfected - standalone */}
      <Composition
        id="BrandOutroPerfected"
        component={BrandOutroPerfected}
        durationInFrames={FPS * 5}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          cta: "¡Guarda este video!",
          handle: "@bilan.mx",
        }}
      />

      {/* ============================================ */}
      {/* RAW TEMPLATES (without intro/outro) */}
      {/* ============================================ */}

      {/* QuickTip - 15 seconds */}
      <Composition
        id="QuickTip"
        component={QuickTipVideo}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          tip: "Toma agua con electrolitos después de entrenar",
          reason: "Repone el sodio y potasio que pierdes en el sudor",
          cta: "Hidrátate mejor",
          brandColor: "#00a86b",
        }}
      />

      {/* ============================================ */}
      {/* AUDIO TESTING COMPOSITIONS */}
      {/* ============================================ */}

      {/* QuickTip Test 1 - Flashlight Ambient */}
      <Composition
        id="QuickTipTest1"
        component={QuickTipVideoTest1}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          tip: "Toma agua con electrolitos después de entrenar",
          reason: "Repone el sodio y potasio que pierdes en el sudor",
          cta: "Hidrátate mejor",
          brandColor: "#00a86b",
        }}
      />

      {/* QuickTip Test 2 - Electro Drone */}
      <Composition
        id="QuickTipTest2"
        component={QuickTipVideoTest2}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          tip: "Toma agua con electrolitos después de entrenar",
          reason: "Repone el sodio y potasio que pierdes en el sudor",
          cta: "Hidrátate mejor",
          brandColor: "#00a86b",
        }}
      />

      {/* QuickTip Test 3 - Dreamy Ambient */}
      <Composition
        id="QuickTipTest3"
        component={QuickTipVideoTest3}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          tip: "Toma agua con electrolitos después de entrenar",
          reason: "Repone el sodio y potasio que pierdes en el sudor",
          cta: "Hidrátate mejor",
          brandColor: "#00a86b",
        }}
      />

      {/* QuickTip Test 4 - 118 BPM Ambient */}
      <Composition
        id="QuickTipTest4"
        component={QuickTipVideoTest4}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          tip: "Toma agua con electrolitos después de entrenar",
          reason: "Repone el sodio y potasio que pierdes en el sudor",
          cta: "Hidrátate mejor",
          brandColor: "#00a86b",
        }}
      />

      {/* QuickTip Test 5 - Quick Start Ambient */}
      <Composition
        id="QuickTipTest5"
        component={QuickTipVideoTest5}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          tip: "Toma agua con electrolitos después de entrenar",
          reason: "Repone el sodio y potasio que pierdes en el sudor",
          cta: "Hidrátate mejor",
          brandColor: "#00a86b",
        }}
      />

      {/* Mythbusting - 30 seconds */}
      <Composition
        id="Mythbusting"
        component={MythbustingVideo}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          title: "La sal es mala para ti",
          myth: "Debes evitar la sal a toda costa",
          truth: "Tu cuerpo NECESITA sodio para funcionar",
          explanation:
            "El sodio regula la hidratación, la presión arterial y la función muscular",
          cta: "Hidrátate con ciencia",
          brandColor: "#00a86b",
        }}
      />

      {/* Educational - 60 seconds */}
      <Composition
        id="Educational"
        component={EducationalVideo}
        durationInFrames={FPS * 60}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          title: "Electrolitos Esenciales",
          hook: "¿Sabías que los electrolitos hacen más que hidratarte?",
          mainPoints: [
            "El sodio mantiene el balance de líquidos en tu cuerpo",
            "El potasio es esencial para la función muscular",
            "El magnesio ayuda con la recuperación y el sueño",
          ],
          conclusion:
            "Por eso bilan tiene los 3 electrolitos en proporciones óptimas",
          cta: "Prueba bilan hoy",
          brandColor: "#00a86b",
        }}
      />

      {/* Trending - 40 seconds */}
      <Composition
        id="Trending"
        component={TrendingVideo}
        durationInFrames={FPS * 40}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          title: "Mi transformación de hidratación",
          hook: "POV: Descubres que el agua sola no te hidrata bien",
          scenes: [
            "Tomando solo agua, siempre cansado",
            "Investigando sobre electrolitos",
            "Probando bilan por primera vez",
            "3 semanas después: energía todo el día",
          ],
          cta: "Tu turno de transformarte",
          trendingFormat: "transformation",
          brandColor: "#00a86b",
        }}
      />

      {/* ============================================ */}
      {/* MASTER VIDEOS (with intro/outro) */}
      {/* ============================================ */}

      {/* Master QuickTip - 15s content + intro + outro */}
      <Composition
        id="MasterQuickTip"
        component={MasterVideo}
        durationInFrames={getMasterVideoDuration("QuickTip", true, true, FPS)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          template: "QuickTip",
          contentProps: {
            tip: "Toma agua con electrolitos después de entrenar",
            reason: "Repone el sodio y potasio que pierdes en el sudor",
            cta: "Hidrátate mejor",
            brandColor: "#00a86b",
          },
          showIntro: true,
          showOutro: true,
          introTagline: "HIDRATACIÓN INTELIGENTE",
          outroHandle: "@bilan.electrolitos",
        }}
      />

      {/* Master Mythbusting - 30s content + intro + outro */}
      <Composition
        id="MasterMythbusting"
        component={MasterVideo}
        durationInFrames={getMasterVideoDuration(
          "Mythbusting",
          true,
          true,
          FPS,
        )}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          template: "Mythbusting",
          contentProps: {
            title: "La sal es mala para ti",
            myth: "Debes evitar la sal a toda costa",
            truth: "Tu cuerpo NECESITA sodio para funcionar",
            explanation: "El sodio regula la hidratación y la función muscular",
            cta: "Hidrátate con ciencia",
            brandColor: "#00a86b",
          },
          showIntro: true,
          showOutro: true,
        }}
      />

      {/* Master Educational - 60s content + intro + outro */}
      <Composition
        id="MasterEducational"
        component={MasterVideo}
        durationInFrames={getMasterVideoDuration(
          "Educational",
          true,
          true,
          FPS,
        )}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          template: "Educational",
          contentProps: {
            title: "Electrolitos Esenciales",
            hook: "¿Sabías que los electrolitos hacen más que hidratarte?",
            mainPoints: [
              "El sodio mantiene el balance de líquidos en tu cuerpo",
              "El potasio es esencial para la función muscular",
              "El magnesio ayuda con la recuperación y el sueño",
            ],
            conclusion:
              "Por eso bilan tiene los 3 electrolitos en proporciones óptimas",
            cta: "Prueba bilan hoy",
            brandColor: "#00a86b",
          },
          showIntro: true,
          showOutro: true,
        }}
      />

      {/* Master Trending - 40s content + intro + outro */}
      <Composition
        id="MasterTrending"
        component={MasterVideo}
        durationInFrames={getMasterVideoDuration("Trending", true, true, FPS)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          template: "Trending",
          contentProps: {
            title: "Mi transformación",
            hook: "POV: Descubres que el agua sola no te hidrata bien",
            scenes: [
              "Tomando solo agua, siempre cansado",
              "Investigando sobre electrolitos",
              "Probando bilan por primera vez",
              "3 semanas después: energía todo el día",
            ],
            cta: "Tu turno de transformarte",
            trendingFormat: "transformation",
            brandColor: "#00a86b",
          },
          showIntro: true,
          showOutro: true,
        }}
      />
    </>
  );
};
