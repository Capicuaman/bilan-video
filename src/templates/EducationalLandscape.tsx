import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
  Audio,
} from "remotion";
import { brand, getFontStack } from "../brand";

interface EducationalLandscapeProps {
  title: string;
  subtitle: string;
  keyPoint1: string;
  keyPoint2: string;
  keyPoint3: string;
  conclusion: string;
  brandColor?: string;
  showLogo?: boolean;
}

export const EducationalLandscape: React.FC<EducationalLandscapeProps> = ({
  title,
  subtitle,
  keyPoint1,
  keyPoint2,
  keyPoint3,
  conclusion,
  brandColor = brand.colors.primary,
  showLogo = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Timing for landscape format (slightly longer for education)
  const titleStart = 0;
  const titleEnd = fps * 3;
  const subtitleStart = fps * 2;
  const subtitleEnd = fps * 5;
  const keyPointsStart = fps * 4;
  const keyPointsEnd = fps * 12;
  const conclusionStart = fps * 11;

  // Title animations
  const titleOpacity = interpolate(
    frame,
    [titleStart, titleStart + 15, titleEnd - 10, titleEnd],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const titleScale = spring({
    frame: frame - titleStart,
    fps,
    config: brand.animation.spring,
  });

  // Subtitle animations
  const subtitleOpacity = interpolate(
    frame,
    [subtitleStart, subtitleStart + 15, subtitleEnd - 10, subtitleEnd],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );

  // Key points animations (staggered)
  const keyPoint1Opacity = interpolate(
    frame,
    [keyPointsStart, keyPointsStart + 15, keyPointsEnd - 20, keyPointsEnd - 10],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const keyPoint1Slide = interpolate(
    frame,
    [keyPointsStart, keyPointsStart + 20],
    [-100, 0],
    { extrapolateRight: "clamp" },
  );

  const keyPoint2Opacity = interpolate(
    frame,
    [keyPointsStart + 20, keyPointsStart + 35, keyPointsEnd - 15, keyPointsEnd - 5],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const keyPoint2Slide = interpolate(
    frame,
    [keyPointsStart + 20, keyPointsStart + 40],
    [-100, 0],
    { extrapolateRight: "clamp" },
  );

  const keyPoint3Opacity = interpolate(
    frame,
    [keyPointsStart + 40, keyPointsStart + 55, keyPointsEnd - 10, keyPointsEnd],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const keyPoint3Slide = interpolate(
    frame,
    [keyPointsStart + 40, keyPointsStart + 60],
    [-100, 0],
    { extrapolateRight: "clamp" },
  );

  // Conclusion animations
  const conclusionOpacity = interpolate(
    frame,
    [conclusionStart, conclusionStart + 15],
    [0, 1],
    { extrapolateRight: "clamp" },
  );
  const conclusionScale = spring({
    frame: frame - conclusionStart,
    fps,
    config: brand.animation.spring,
  });

  // Logo timing - visible from frame 0 for thumbnails, fade out COMPLETELY before conclusion
  const logoOpacity = interpolate(
    frame,
    [0, 1, conclusionStart - 35, conclusionStart - 15],
    [1, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: brandColor }}>
      {/* Background Music */}
      <Audio
        src={staticFile("audio/music/ambient-quick-start.mp3")}
        volume={0.3}
        startFrom={0}
      />

      {/* Background with subtle gradient for landscape */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(45deg, ${brandColor} 0%, ${brand.colors.backgroundAlt} 100%)`,
        }}
      />

      {/* Logo - Top left for landscape format */}
      {showLogo && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: 60,
            opacity: logoOpacity,
          }}
        >
          <Img
            src={staticFile("logo-white.png")}
            style={{
              width: 300, // Smaller in landscape for more content space
              height: "auto",
              filter: "drop-shadow(2px 2px 8px rgba(0,0,0,0.3))",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Title Section */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 200, // Leave space for logo
          paddingLeft: 60,
          paddingRight: 60,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <div
          style={{
            fontFamily: getFontStack("heading"),
            fontSize: 72, // Large for landscape format
            fontWeight: "bold",
            color: brand.colors.white,
            textAlign: "center",
            lineHeight: 1.1,
            textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
            maxWidth: "90%",
          }}
        >
          {title}
        </div>
      </AbsoluteFill>

      {/* Subtitle Section */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 100,
          paddingLeft: 60,
          paddingRight: 60,
          opacity: subtitleOpacity,
        }}
      >
        <div
          style={{
            fontFamily: getFontStack("heading"),
            fontSize: 48,
            fontWeight: "bold",
            color: brand.colors.white,
            textAlign: "center",
            lineHeight: 1.2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
            maxWidth: "85%",
          }}
        >
          {subtitle}
        </div>
      </AbsoluteFill>

      {/* Key Points Section - Horizontal layout for landscape */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Key Point 1 */}
          <div
            style={{
              fontFamily: getFontStack("heading"),
              fontSize: 36,
              fontWeight: "bold",
              color: brand.colors.white,
              textAlign: "center",
              lineHeight: 1.3,
              padding: 30,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 20,
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              flex: 1,
              opacity: keyPoint1Opacity,
              transform: `translateX(${keyPoint1Slide}px)`,
              minHeight: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {keyPoint1}
          </div>

          {/* Key Point 2 */}
          <div
            style={{
              fontFamily: getFontStack("heading"),
              fontSize: 36,
              fontWeight: "bold",
              color: brand.colors.white,
              textAlign: "center",
              lineHeight: 1.3,
              padding: 30,
              backgroundColor: "rgba(34, 197, 94, 0.2)", // Green tint
              borderRadius: 20,
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(34, 197, 94, 0.4)",
              flex: 1,
              opacity: keyPoint2Opacity,
              transform: `translateX(${keyPoint2Slide}px)`,
              minHeight: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {keyPoint2}
          </div>

          {/* Key Point 3 */}
          <div
            style={{
              fontFamily: getFontStack("heading"),
              fontSize: 36,
              fontWeight: "bold",
              color: brand.colors.white,
              textAlign: "center",
              lineHeight: 1.3,
              padding: 30,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 20,
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              flex: 1,
              opacity: keyPoint3Opacity,
              transform: `translateX(${keyPoint3Slide}px)`,
              minHeight: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {keyPoint3}
          </div>
        </div>
      </AbsoluteFill>

      {/* Conclusion/CTA Section */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: conclusionOpacity,
          transform: `scale(${conclusionScale})`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "90%",
          }}
        >
          {/* Large logo for conclusion */}
          <Img
            src={staticFile("logo-white.png")}
            style={{
              width: 500,
              height: "auto",
              filter: "drop-shadow(3px 3px 12px rgba(0,0,0,0.4))",
              marginBottom: 30,
            }}
          />
          
          <div
            style={{
              fontFamily: getFontStack("heading"),
              fontSize: 64,
              fontWeight: "bold",
              color: brand.colors.white,
              textAlign: "center",
              textShadow: "3px 3px 8px rgba(0,0,0,0.6)",
              textTransform: "lowercase",
              marginBottom: 40,
              letterSpacing: 2,
            }}
          >
            hidratación inteligente
          </div>

          <div
            style={{
              fontFamily: getFontStack("heading"),
              fontSize: 42,
              fontWeight: "bold",
              color: brand.colors.white,
              textAlign: "center",
              lineHeight: 1.2,
              textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
              padding: 40,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 20,
              border: "3px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {conclusion}
          </div>
        </div>
      </AbsoluteFill>

      {/* Decorative elements for landscape */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: 60,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            backgroundColor: brand.colors.accentGreen,
            borderRadius: "50%",
            opacity: 0.5,
            transform: `rotate(${frame * 0.3}deg)`,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-end",
          padding: 60,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: brand.colors.accentGreen,
            borderRadius: "50%",
            opacity: 0.4,
            transform: `rotate(${-frame * 0.2}deg)`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};