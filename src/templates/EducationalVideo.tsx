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

interface EducationalProps {
  title: string;
  hook: string;
  mainPoints: string[];
  conclusion: string;
  cta: string;
  brandColor?: string;
  showLogo?: boolean;
}

export const EducationalVideo: React.FC<EducationalProps> = ({
  title,
  hook,
  mainPoints,
  conclusion,
  cta,
  brandColor = brand.colors.primary,
  showLogo = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing (60 seconds total)
  const hookEnd = fps * 6;
  const pointDuration = fps * 10;
  const pointsStart = fps * 6;
  const conclusionStart = pointsStart + mainPoints.length * pointDuration;
  const conclusionEnd = conclusionStart + fps * 8;
  const ctaStart = conclusionEnd;

  // Animations
  const hookOpacity = interpolate(
    frame,
    [0, 10, hookEnd - 10, hookEnd],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const hookScale = spring({ frame, fps, config: brand.animation.spring });

  const ctaOpacity = interpolate(frame, [ctaStart - 10, ctaStart], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaScale = spring({
    frame: frame - ctaStart,
    fps,
    config: { damping: 10 },
  });

  const conclusionOpacity = interpolate(
    frame,
    [
      conclusionStart,
      conclusionStart + 10,
      conclusionEnd - 15,
      conclusionEnd - 5,
    ],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );

  // Logo fades out before CTA so only one logo shows at a time
  const logoOpacity = interpolate(
    frame,
    [0, 15, ctaStart - 15, ctaStart],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );

  // Current point
  const getCurrentPoint = () => {
    if (frame < pointsStart) return -1;
    const pointFrame = frame - pointsStart;
    const pointIndex = Math.floor(pointFrame / pointDuration);
    if (pointIndex >= mainPoints.length) return -1;
    return pointIndex;
  };

  const currentPoint = getCurrentPoint();
  const pointLocalFrame = frame - (pointsStart + currentPoint * pointDuration);
  const pointOpacity = interpolate(
    pointLocalFrame,
    [0, 10, pointDuration - 10, pointDuration],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const pointY = interpolate(pointLocalFrame, [0, 15], [40, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.background,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: getFontStack("body"),
      }}
    >
      {/* Background Music - Phase 1 Audio Implementation */}
      <Audio
        src={staticFile("audio/music/ambient-loop.mp3")}
        loop={true}
        volume={0.3}
      />
      {/* Logo - centered, large with shadow */}
      {showLogo && (
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: logoOpacity,
          }}
        >
          <Img
            src={staticFile(brand.logo.path)}
            style={{
              width: brand.logo.width,
              height: "auto",
              filter:
                "drop-shadow(0 8px 24px rgba(0,0,0,0.4)) drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
            }}
          />
        </div>
      )}

      {/* Hook */}
      {frame < hookEnd && (
        <div
          style={{
            position: "absolute",
            opacity: hookOpacity,
            transform: `scale(${hookScale})`,
            textAlign: "center",
            padding: "0 50px",
          }}
        >
          {/* CHUNKY LABEL - GREEN for contrast */}
          <div
            style={{
              display: "inline-block",
              fontSize: 52,
              color: "#FFFFFF",
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              marginBottom: 36,
              textTransform: "uppercase",
              letterSpacing: 5,
              padding: "16px 36px",
              backgroundColor: brand.colors.accentGreen,
              borderRadius: 14,
              textShadow: "0 4px 12px rgba(0,0,0,0.4)",
              boxShadow: `0 8px 32px ${brand.colors.accentGreen}88, 0 4px 16px rgba(0,0,0,0.3)`,
            }}
          >
            📚 {title}
          </div>
          <div
            style={{
              fontSize: brand.typography.title,
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              lineHeight: 1.1,
              textShadow: "0 6px 20px rgba(0,0,0,0.4)",
            }}
          >
            {hook}
          </div>
        </div>
      )}

      {/* Main Points */}
      {currentPoint >= 0 && currentPoint < mainPoints.length && (
        <div
          style={{
            position: "absolute",
            opacity: pointOpacity,
            transform: `translateY(${pointY}px)`,
            textAlign: "center",
            padding: "0 40px",
          }}
        >
          {/* CHUNKY POINT LABEL - GREEN for contrast */}
          <div
            style={{
              display: "inline-block",
              fontSize: 48,
              color: "#FFFFFF",
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              marginBottom: 36,
              textTransform: "uppercase",
              letterSpacing: 4,
              padding: "14px 32px",
              backgroundColor: brand.colors.accentGreen,
              borderRadius: 12,
              textShadow: "0 4px 12px rgba(0,0,0,0.4)",
              boxShadow: `0 8px 32px ${brand.colors.accentGreen}88, 0 4px 16px rgba(0,0,0,0.3)`,
            }}
          >
            PUNTO {currentPoint + 1} DE {mainPoints.length}
          </div>
          <div
            style={{
              fontSize: brand.typography.subtitle,
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              lineHeight: 1.2,
              padding: "36px 44px",
              backgroundColor: `${brandColor}15`,
              borderRadius: 20,
              borderLeft: `6px solid ${brandColor}`,
              textShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {mainPoints[currentPoint]}
          </div>
        </div>
      )}

      {/* Conclusion */}
      {frame >= conclusionStart && frame < conclusionEnd && (
        <div
          style={{
            position: "absolute",
            opacity: conclusionOpacity,
            textAlign: "center",
            padding: "0 50px",
          }}
        >
          {/* CHUNKY LABEL - GREEN for contrast */}
          <div
            style={{
              display: "inline-block",
              fontSize: 52,
              color: "#FFFFFF",
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              marginBottom: 36,
              textTransform: "uppercase",
              letterSpacing: 5,
              padding: "16px 36px",
              backgroundColor: brand.colors.accentGreen,
              borderRadius: 14,
              textShadow: "0 4px 12px rgba(0,0,0,0.4)",
              boxShadow: `0 8px 32px ${brand.colors.accentGreen}88, 0 4px 16px rgba(0,0,0,0.3)`,
            }}
          >
            ✨ EN RESUMEN
          </div>
          <div
            style={{
              fontSize: brand.typography.subtitle,
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              lineHeight: 1.2,
              textShadow: "0 6px 20px rgba(0,0,0,0.4)",
            }}
          >
            {conclusion}
          </div>
        </div>
      )}

      {/* CTA */}
      {frame >= ctaStart && (
        <div
          style={{
            position: "absolute",
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: brand.typography.title,
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              marginBottom: 40,
              textShadow: "0 6px 20px rgba(0,0,0,0.4)",
            }}
          >
            {cta}
          </div>
          {showLogo && (
            <Img
              src={staticFile(brand.logo.path)}
              style={{
                width: brand.logo.widthCTA,
                height: "auto",
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.3))",
              }}
            />
          )}
        </div>
      )}

      {/* Progress indicator */}
      {currentPoint >= 0 && currentPoint < mainPoints.length && (
        <div
          style={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            gap: 12,
          }}
        >
          {mainPoints.map((_, i) => (
            <div
              key={i}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor:
                  i <= currentPoint ? brandColor : "rgba(255,255,255,0.3)",
                boxShadow:
                  i <= currentPoint ? `0 4px 12px ${brandColor}66` : "none",
              }}
            />
          ))}
        </div>
      )}

      {/* Brand bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 12,
          backgroundColor: brandColor,
        }}
      />
    </AbsoluteFill>
  );
};
