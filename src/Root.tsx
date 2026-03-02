import "./index.css";
import { Composition } from "remotion";
import {
  QuickTipVideo,
  QuickTipSquare,
  EducationalLandscape,
} from "./templates";
import { MasterVideo, getMasterVideoDuration } from "./templates/MasterVideo";
import { BrandIntroPerfected } from "./components/BrandIntroPerfected";
import { BrandOutroPerfected } from "./components/BrandOutroPerfected";

// TikTok vertical format
const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ============================================ */}
      {/* PLATFORM-SPECIFIC RAW COMPOSITIONS          */}
      {/* ============================================ */}

      {/* QuickTip - TikTok vertical (1080×1920) */}
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

      {/* WhatsApp Square Format - QuickTip (1080×1080) */}
      <Composition
        id="QuickTipWhatsApp"
        component={QuickTipSquare}
        durationInFrames={FPS * 12}
        fps={FPS}
        width={1080}
        height={1080}
        defaultProps={{
          tip: "Los electrolitos no son solo sal",
          reason: "Son minerales esenciales: sodio, potasio y magnesio que tu cuerpo necesita para funcionar",
          cta: "Hidrátate con ciencia",
        }}
      />

      {/* Instagram Square Format - QuickTip (1080×1080) */}
      <Composition
        id="QuickTipInstagram"
        component={QuickTipSquare}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={1080}
        height={1080}
        defaultProps={{
          tip: "MITO: La sal es mala",
          reason: "REALIDAD: Tu cuerpo NECESITA sodio para hidratarse correctamente y mantener la función muscular",
          cta: "Hidrátate inteligentemente",
        }}
      />

      {/* Twitter/X Landscape Format - Educational (1920×1080) */}
      <Composition
        id="EducationalTwitter"
        component={EducationalLandscape}
        durationInFrames={FPS * 15}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{
          title: "3 Electrolitos Esenciales",
          subtitle: "Lo que tu cuerpo realmente necesita",
          keyPoint1: "SODIO\nBalance de líquidos y función nerviosa",
          keyPoint2: "POTASIO\nContracción muscular y presión arterial",
          keyPoint3: "MAGNESIO\nRecuperación y relajación muscular",
          conclusion: "Por eso bilan tiene los 3 en proporción científica",
        }}
      />

      {/* ============================================ */}
      {/* MASTER VIDEOS (with branded intro/outro)    */}
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
        durationInFrames={getMasterVideoDuration("Mythbusting", true, true, FPS)}
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
        durationInFrames={getMasterVideoDuration("Educational", true, true, FPS)}
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

      {/* ============================================ */}
      {/* STUDIO PREVIEW ONLY                         */}
      {/* ============================================ */}

      {/* Preview: BrandIntroPerfected - standalone studio preview */}
      <Composition
        id="PreviewBrandIntroPerfected"
        component={BrandIntroPerfected}
        durationInFrames={FPS * 3}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          tagline: "hidratación inteligente",
        }}
      />

      {/* Preview: BrandOutroPerfected - standalone studio preview */}
      <Composition
        id="PreviewBrandOutroPerfected"
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
    </>
  );
};
