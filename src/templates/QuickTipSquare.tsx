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

interface QuickTipSquareProps {
  tip: string;
  reason: string;
  cta: string;
  brandColor?: string;
  showLogo?: boolean;
}

export const QuickTipSquare: React.FC<QuickTipSquareProps> = ({
  tip,
  reason,
  cta,
  brandColor = brand.colors.primary,
  showLogo = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Timing for square format (shorter, punchier)
  const tipStart = 0;
  const tipEnd = fps * 4;
  const reasonStart = fps * 4;
  const reasonEnd = fps * 8;
  const ctaStart = fps * 8;

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
    [reasonStart, reasonStart + 10, reasonEnd - 10, reasonEnd],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );
  const reasonSlide = interpolate(
    frame,
    [reasonStart, reasonStart + 15],
    [50, 0],
    { extrapolateRight: "clamp" },
  );

  const ctaOpacity = interpolate(
    frame,
    [ctaStart, ctaStart + 10],
    [0, 1],
    { extrapolateRight: "clamp" },
  );
  const ctaScale = spring({
    frame: frame - ctaStart,
    fps,
    config: brand.animation.spring,
  });

  // Logo timing - show at beginning, fade out COMPLETELY before CTA
  const logoOpacity = interpolate(
    frame,
    [0, 10, ctaStart - 30, ctaStart - 15],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: brandColor }}>
      {/* Background gradient for visual interest */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${brandColor} 0%, ${brand.colors.backgroundAlt} 100%)`,
        }}
      />

      {/* Logo - Positioned for square format */}
      {showLogo && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 60,
            opacity: logoOpacity,
          }}
        >
          <Img
            src={staticFile("logo-white.png")}
            style={{
              width: 400, // Smaller for square format
              height: "auto",
              filter: "drop-shadow(2px 2px 8px rgba(0,0,0,0.3))",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Tip Section */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 60, // More padding for square
          opacity: tipOpacity,
          transform: `scale(${tipScale})`,
        }}
      >
        <div
          style={{
            fontFamily: getFontStack("heading"),
            fontSize: 56, // Larger for readability in square
            fontWeight: "bold",
            color: brand.colors.white,
            textAlign: "center",
            lineHeight: 1.2,
            textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
            maxWidth: "100%",
          }}
        >
          {tip}
        </div>
      </AbsoluteFill>

      {/* Reason Section */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
          opacity: reasonOpacity,
          transform: `translateY(${reasonSlide}px)`,
        }}
      >
        <div
          style={{
            fontFamily: getFontStack("body"),
            fontSize: 42, // Adjusted for square format
            fontWeight: "bold",
            color: brand.colors.white,
            textAlign: "center",
            lineHeight: 1.3,
            textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
            padding: 40,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 20,
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            maxWidth: "90%",
          }}
        >
          {reason}
        </div>
      </AbsoluteFill>

      {/* CTA Section */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
        }}
      >
        {/* Logo for CTA screen - larger and centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("logo-white.png")}
            style={{
              width: 500, // Larger for CTA in square
              height: "auto",
              filter: "drop-shadow(3px 3px 12px rgba(0,0,0,0.4))",
              marginBottom: 30,
            }}
          />
          
          <div
            style={{
              fontFamily: getFontStack("heading"),
              fontSize: 68,
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
              fontSize: 48, // CTA text size for square
              fontWeight: "bold",
              color: brand.colors.white,
              textAlign: "center",
              lineHeight: 1.2,
              textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
              padding: 30,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 15,
              border: "3px solid rgba(255, 255, 255, 0.3)",
              maxWidth: "85%",
            }}
          >
            {cta}
          </div>
        </div>
      </AbsoluteFill>

      {/* Accent elements for visual interest */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: 30,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            backgroundColor: brand.colors.accentGreen,
            borderRadius: "50%",
            opacity: 0.6,
            transform: `rotate(${frame * 0.5}deg)`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};