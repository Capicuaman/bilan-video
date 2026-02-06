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

interface BrandOutroPerfectedProps {
  cta?: string;
  handle?: string;
  website?: string;
}

export const BrandOutroPerfected: React.FC<BrandOutroPerfectedProps> = ({
  cta = "¡Guarda este video!",
  handle = "@bilan.electrolitos",
  website = "www.bilan.mx",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Simplified 2-stage animation for maximum impact

  // Stage 1: Logo & Tagline (0-1s) - Mirror intro timing
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  const logoOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [fps * 0.3, fps * 0.7], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [fps * 0.3, fps * 0.8], [20, 0], {
    extrapolateRight: "clamp",
  });

  // Stage 2: CTA & Handle (1-2s) - Simultaneous for impact
  const ctaOpacity = interpolate(frame, [fps * 1, fps * 1.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaScale = spring({
    frame: frame - fps * 1,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const handleOpacity = interpolate(frame, [fps * 1.2, fps * 1.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  const handleY = interpolate(frame, [fps * 1.2, fps * 1.6], [20, 0], {
    extrapolateRight: "clamp",
  });

  // Action buttons appear with handle
  const actionsOpacity = interpolate(frame, [fps * 1.4, fps * 1.7], [0, 1], {
    extrapolateRight: "clamp",
  });

  const actionsY = interpolate(frame, [fps * 1.4, fps * 1.8], [15, 0], {
    extrapolateRight: "clamp",
  });

  // Subtle background glow - no pulsing distraction
  const backgroundGlow = interpolate(
    frame,
    [0, fps * 0.5, fps * 2],
    [0, 0.6, 0.4],
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
      {/* Subtle background glow - no pulsing */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% 40%, ${brand.colors.primary}22 0%, transparent 50%)`,
          opacity: backgroundGlow,
        }}
      />

      {/* Main content - organized in clear hierarchy */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50, // Increased gap for better hierarchy
        }}
      >
        {/* Logo Section - Stage 1 */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Img
            src={staticFile(brand.logo.path)}
            style={{
              width: brand.logo.widthCTA,
              height: "auto",
              filter: `drop-shadow(0 8px 32px rgba(0,0,0,0.3))`, // Removed pulsing glow
            }}
          />

          {/* Tagline - Maximum accessibility font size */}
          <div
            style={{
              marginTop: 15,
              opacity: taglineOpacity,
              transform: `translateY(${taglineY}px)`,
            }}
          >
            <div
              style={{
                fontSize: brand.typography.title, // Increased to 64px for maximum visibility
                color: brand.colors.white,
                fontFamily: getFontStack("heading"),
                fontWeight: 700,
                letterSpacing: 6,
                textTransform: "lowercase",
                textShadow: "0 4px 12px rgba(0,0,0,0.4)",
                textAlign: "center",
              }}
            >
              hidratación inteligente
            </div>
          </div>
        </div>

        {/* CTA Section - Stage 2 */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${Math.max(0, ctaScale)})`,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: brand.typography.subtitle, // 52px - balanced size
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              textShadow: "0 6px 20px rgba(0,0,0,0.4)",
              lineHeight: 1.1,
              padding: "0 40px",
            }}
          >
            {cta}
          </div>
        </div>

        {/* Handle - Appears with CTA */}
        <div
          style={{
            opacity: handleOpacity,
            transform: `translateY(${handleY}px)`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: brand.typography.subtitle, // Increased from 42px to 52px
              color: brand.colors.white,
              fontFamily: getFontStack("heading"),
              fontWeight: 700,
              padding: "18px 45px", // Increased padding for larger text
              backgroundColor: brand.colors.primary,
              borderRadius: 50,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              boxShadow: `0 8px 32px ${brand.colors.primary}66, 0 4px 16px rgba(0,0,0,0.2)`,
            }}
          >
            {handle}
          </div>
        </div>

        {/* Website URL */}
        <div
          style={{
            opacity: handleOpacity,
            transform: `translateY(${handleY}px)`,
            marginTop: 15,
          }}
        >
          <div
            style={{
              fontSize: brand.typography.body,
              color: brand.colors.white,
              fontFamily: getFontStack("body"),
              fontWeight: 600,
              letterSpacing: 2,
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            {website}
          </div>
        </div>

        {/* Action Buttons - Maximum visibility */}
        <div
          style={{
            opacity: actionsOpacity,
            transform: `translateY(${actionsY}px)`,
            display: "flex",
            gap: 45, // Increased gap for larger text
            marginTop: 15,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { emoji: "❤️", text: "Like", color: "#ff4458" },
            { emoji: "💬", text: "Comenta", color: "#4CAF50" },
            { emoji: "📤", text: "Comparte", color: "#2196F3" },
          ].map((action, i) => (
            <div
              key={i}
              style={{
                fontSize: brand.typography.caption, // Increased from 28px to 36px
                color: brand.colors.white,
                fontFamily: getFontStack("heading"),
                fontWeight: 700, // Bolder for better visibility
                textShadow: `0 3px 12px ${action.color}44, 0 2px 8px rgba(0,0,0,0.4)`,
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "1.2em" }}>{action.emoji}</span>{" "}
              {action.text}
            </div>
          ))}
        </div>
      </div>

      {/* Brand bar - consistent with intro */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 12,
          backgroundColor: brand.colors.primary,
        }}
      />
    </AbsoluteFill>
  );
};
