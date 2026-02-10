import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";
import { brand, getFontStack } from "../brand";

interface QuickTipProps {
  tip: string;
  reason: string;
  cta: string;
  brandColor?: string;
  showLogo?: boolean;
}

export const QuickTipVideo: React.FC<QuickTipProps> = ({
  tip,
  reason,
  cta,
  brandColor = brand.colors.primary,
  showLogo = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing
  const tipStart = 0;
  const tipEnd = fps * 5;
  const reasonStart = fps * 5;
  const reasonEnd = fps * 10;
  const ctaStart = fps * 10;

  // Animations
  const tipOpacity = interpolate(
    frame,
    [tipStart, tipStart + 10, tipEnd - 10, tipEnd],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const tipScale = spring({
    frame: frame - tipStart,
    fps,
    config: brand.animation.spring,
  });

  const reasonOpacity = interpolate(
    frame,
    [reasonStart, reasonStart + 10, reasonEnd - 15, reasonEnd - 5],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const reasonY = interpolate(frame, [reasonStart, reasonStart + 15], [50, 0], {
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [ctaStart - 10, ctaStart], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaScale = spring({
    frame: frame - ctaStart,
    fps,
    config: { damping: 10 },
  });

  // Logo animation - fade out COMPLETELY before CTA so only one logo shows at a time
  const logoOpacity = interpolate(
    frame,
    [0, 15, ctaStart - 30, ctaStart - 15],
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

      {/* Tip */}
      {frame >= tipStart && frame < tipEnd && (
        <div
          style={{
            position: "absolute",
            opacity: tipOpacity,
            transform: `scale(${tipScale})`,
            textAlign: "center",
            padding: "0 50px",
          }}
        >
          {/* CHUNKY LABEL with glow - GREEN for contrast on blue bg */}
          <div
            style={{
              display: "inline-block",
              fontSize: 56,
              color: "#FFFFFF",
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              marginBottom: 36,
              textTransform: "uppercase",
              letterSpacing: 6,
              padding: "18px 40px",
              backgroundColor: brand.colors.accentGreen,
              borderRadius: 16,
              textShadow: "0 4px 12px rgba(0,0,0,0.4)",
              boxShadow: `0 8px 32px ${brand.colors.accentGreen}88, 0 4px 16px rgba(0,0,0,0.3)`,
            }}
          >
            💡 TIP RÁPIDO
          </div>
          <div
            style={{
              fontSize: brand.typography.hero,
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              lineHeight: 1.1,
              textShadow: "0 6px 20px rgba(0,0,0,0.4)",
            }}
          >
            {tip}
          </div>
        </div>
      )}

      {/* Reason */}
      {frame >= reasonStart && frame < reasonEnd && (
        <div
          style={{
            position: "absolute",
            opacity: reasonOpacity,
            transform: `translateY(${reasonY}px)`,
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
            ¿POR QUÉ?
          </div>
          <div
            style={{
              fontSize: brand.typography.title,
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              lineHeight: 1.2,
              textShadow: "0 6px 20px rgba(0,0,0,0.4)",
            }}
          >
            {reason}
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
