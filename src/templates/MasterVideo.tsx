import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  Audio,
  staticFile,
} from "remotion";
import { BrandIntroPerfected } from "../components/BrandIntroPerfected";
import { BrandOutroPerfected } from "../components/BrandOutroPerfected";
import { QuickTipVideo } from "./QuickTipVideo";
import { MythbustingVideo } from "./MythbustingVideo";
import { EducationalVideo } from "./EducationalVideo";
import { TrendingVideo } from "./TrendingVideo";

type TemplateType = "QuickTip" | "Mythbusting" | "Educational" | "Trending";

interface MasterVideoProps {
  template: TemplateType;
  contentProps: Record<string, any>;
  showIntro?: boolean;
  showOutro?: boolean;
  introTagline?: string;
  outroCta?: string;
  outroHandle?: string;
  outroWebsite?: string;
  showActionPrompts?: boolean;
  audioTrack?: string;
}

// Content duration mapping (in seconds)
const CONTENT_DURATIONS: Record<TemplateType, number> = {
  QuickTip: 15,
  Mythbusting: 30,
  Educational: 60,
  Trending: 40,
};

const INTRO_DURATION = 2.5; // seconds
const OUTRO_DURATION = 4; // seconds

export const MasterVideo: React.FC<MasterVideoProps> = ({
  template,
  contentProps,
  showIntro = true,
  showOutro = true,
  introTagline = "hidratación inteligente",
  outroCta = "¡Guarda este video!",
  outroHandle = "@bilan.electrolitos",
  outroWebsite = "www.bilan.mx",
  showActionPrompts = true,
  audioTrack = "ambient-loop.mp3",
}) => {
  const { fps } = useVideoConfig();

  const introDurationFrames = showIntro ? Math.round(INTRO_DURATION * fps) : 0;
  const outroDurationFrames = showOutro ? Math.round(OUTRO_DURATION * fps) : 0;
  const contentDurationFrames = Math.round(CONTENT_DURATIONS[template] * fps);

  // Get the right component
  const ContentComponent = {
    QuickTip: QuickTipVideo,
    Mythbusting: MythbustingVideo,
    Educational: EducationalVideo,
    Trending: TrendingVideo,
  }[template];

  // Override showLogo in content when we have intro/outro
  const modifiedContentProps = {
    ...contentProps,
    // Don't show logo in content if we have intro (intro has the logo)
    showLogo: !showIntro,
  };

  return (
    <AbsoluteFill>
      {/* Background Music - Phase 1 Audio Implementation */}
      <Audio
        src={staticFile(`audio/music/${audioTrack}`)}
        loop={true}
        volume={0.6}
      />

      {/* INTRO */}
      {showIntro && (
        <Sequence from={0} durationInFrames={introDurationFrames}>
          <BrandIntroPerfected tagline={introTagline} />
        </Sequence>
      )}

      {/* MAIN CONTENT */}
      <Sequence
        from={introDurationFrames}
        durationInFrames={contentDurationFrames}
      >
        <ContentComponent {...modifiedContentProps} />
      </Sequence>

      {/* OUTRO */}
      {showOutro && (
        <Sequence
          from={introDurationFrames + contentDurationFrames}
          durationInFrames={outroDurationFrames}
        >
          <BrandOutroPerfected
            cta={outroCta}
            handle={outroHandle}
            website={outroWebsite}
            showActionPrompts={showActionPrompts}
          />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

// Calculate total duration for a video
export const getMasterVideoDuration = (
  template: TemplateType,
  showIntro: boolean = true,
  showOutro: boolean = true,
  fps: number = 30,
): number => {
  const intro = showIntro ? INTRO_DURATION : 0;
  const outro = showOutro ? OUTRO_DURATION : 0;
  const content = CONTENT_DURATIONS[template];
  return Math.round((intro + content + outro) * fps);
};

// Export durations for use in Root.tsx
export { INTRO_DURATION, OUTRO_DURATION, CONTENT_DURATIONS };
