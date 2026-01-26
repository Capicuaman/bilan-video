import "./index.css";
import { Composition } from "remotion";
import { QuickTipVideo, MythbustingVideo, EducationalVideo, TrendingVideo } from "./templates";

// TikTok vertical format
const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
          explanation: "El sodio regula la hidratación, la presión arterial y la función muscular",
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
          conclusion: "Por eso BILAN tiene los 3 electrolitos en proporciones óptimas",
          cta: "Prueba BILAN hoy",
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
            "Probando BILAN por primera vez",
            "3 semanas después: energía todo el día",
          ],
          cta: "Tu turno de transformarte",
          trendingFormat: "transformation",
          brandColor: "#00a86b",
        }}
      />
    </>
  );
};
