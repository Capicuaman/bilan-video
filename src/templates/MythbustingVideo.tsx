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

interface MythbustingProps {
  title: string;
  myth: string;
  truth: string;
  explanation: string;
  cta: string;
  brandColor?: string;
  showLogo?: boolean;
}

export const MythbustingVideo: React.FC<MythbustingProps> = ({
  title,
  myth,
  truth,
  explanation,
  cta,
  brandColor = brand.colors.primary,
  showLogo = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing (30 seconds total) - NO GAPS!
  const titleEnd = fps * 4;
  const mythStart = fps * 4;
  const mythEnd = fps * 10;
  const truthStart = fps * 10;
  const truthEnd = fps * 18;
  const explanationStart = fps * 18;
  const explanationEnd = fps * 25; // Ends at 25s to make room for CTA
  const ctaStart = fps * 25; // CTA starts exactly when explanation ends

  // Animations
  const titleOpacity = interpolate(
    frame,
    [0, 10, titleEnd - 10, titleEnd],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const titleScale = spring({ frame, fps, config: brand.animation.spring });

  const mythOpacity = interpolate(
    frame,
    [mythStart, mythStart + 10, mythEnd - 10, mythEnd],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const mythX = interpolate(frame, [mythStart, mythStart + 15], [-100, 0], {
    extrapolateRight: "clamp",
  });

  const truthOpacity = interpolate(
    frame,
    [truthStart, truthStart + 10, truthEnd - 10, truthEnd],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const truthScale = spring({
    frame: frame - truthStart,
    fps,
    config: { damping: 10 },
  });

  const explainOpacity = interpolate(
    frame,
    [
      explanationStart,
      explanationStart + 10,
      explanationEnd - 15,
      explanationEnd - 5,
    ],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );

  const ctaOpacity = interpolate(
    frame,
    [ctaStart - 10, ctaStart, fps * 30],
    [0, 1, 1],
    { extrapolateRight: "clamp" },
  );
  const ctaScale = spring({
    frame: frame - ctaStart,
    fps,
    config: { damping: 10 },
  });

  // Logo fades out before CTA so only one logo shows at a time
  const logoOpacity = interpolate(
    frame,
    [0, 15, ctaStart - 15, ctaStart],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );

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

      {/* Title */}
      {frame < titleEnd && (
        <div
          style={{
            position: "absolute",
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textAlign: "center",
            padding: "0 50px",
          }}
        >
          {/* CHUNKY LABEL - GREEN for contrast */}
          <div
            style={{
              display: "inline-block",
              fontSize: 58, // Increased from 52
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
            🔍 MITO VS REALIDAD
          </div>
          <div
            style={{
              fontSize: 72, // Increased from brand.typography.title (64)
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              lineHeight: 1.1,
              textShadow: "0 6px 20px rgba(0,0,0,0.4)",
            }}
          >
            {title}
          </div>
        </div>
      )}

      {/* Myth */}
      {frame >= mythStart && frame < mythEnd && (
        <div
          style={{
            position: "absolute",
            opacity: mythOpacity,
            transform: `translateX(${mythX}px)`,
            textAlign: "center",
            padding: "0 40px",
          }}
        >
          {/* CHUNKY RED LABEL */}
          <div
            style={{
              display: "inline-block",
              fontSize: 58, // Increased from 52
              color: "#FFFFFF",
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              marginBottom: 36,
              textTransform: "uppercase",
              letterSpacing: 5,
              padding: "16px 36px",
              backgroundColor: brand.colors.error,
              borderRadius: 14,
              textShadow: "0 4px 12px rgba(0,0,0,0.4)",
              boxShadow: `0 8px 32px ${brand.colors.error}88, 0 4px 16px rgba(0,0,0,0.3)`,
            }}
          >
            ❌ EL MITO
          </div>
          <div
            style={{
              fontSize: 58, // Increased from brand.typography.subtitle (52)
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              lineHeight: 1.2,
              padding: "36px 44px",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              borderRadius: 20,
              border: "3px solid rgba(239, 68, 68, 0.4)",
              textShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            "{myth}"
          </div>
        </div>
      )}

      {/* Truth */}
      {frame >= truthStart && frame < truthEnd && (
        <div
          style={{
            position: "absolute",
            opacity: truthOpacity,
            transform: `scale(${truthScale})`,
            textAlign: "center",
            padding: "0 40px",
          }}
        >
          {/* CHUNKY GREEN LABEL */}
          <div
            style={{
              display: "inline-block",
              fontSize: 58, // Increased from 52
              color: "#FFFFFF",
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              marginBottom: 36,
              textTransform: "uppercase",
              letterSpacing: 5,
              padding: "16px 36px",
              backgroundColor: brand.colors.success,
              borderRadius: 14,
              textShadow: "0 4px 12px rgba(0,0,0,0.4)",
              boxShadow: `0 8px 32px ${brand.colors.success}88, 0 4px 16px rgba(0,0,0,0.3)`,
            }}
          >
            ✅ LA VERDAD
          </div>
          <div
            style={{
              fontSize: 58, // Increased from brand.typography.subtitle (52)
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              lineHeight: 1.2,
              padding: "36px 44px",
              backgroundColor: `${brand.colors.success}22`,
              borderRadius: 20,
              border: `3px solid ${brand.colors.success}55`,
              textShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {truth}
          </div>
        </div>
      )}

      {/* Explanation */}
      {frame >= explanationStart && frame < explanationEnd && (
        <div
          style={{
            position: "absolute",
            opacity: explainOpacity,
            textAlign: "center",
            padding: "0 50px",
          }}
        >
          <div
            style={{
              fontSize: 58, // Increased from brand.typography.subtitle (52)
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              lineHeight: 1.3,
              textShadow: "0 6px 20px rgba(0,0,0,0.4)",
            }}
          >
            {explanation}
          </div>
        </div>
      )}

      {/* CTA - Brand Outro Style */}
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
          {showLogo && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Img
                src={staticFile(brand.logo.path)}
                style={{
                  width: brand.logo.widthCTA,
                  height: "auto",
                  filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.3))",
                }}
              />
              {/* Tagline below logo */}
              <div
                style={{
                  marginTop: 20,
                  fontSize: 38, // Increased for accessibility
                  color: brand.colors.white,
                  fontFamily: getFontStack("heading"),
                  fontWeight: 700,
                  letterSpacing: 6,
                  textTransform: "lowercase",
                  textShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  opacity: 0.9,
                }}
              >
                hidratación inteligente
              </div>
            </div>
          )}
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
