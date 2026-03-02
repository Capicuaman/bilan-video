import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { brand, getFontStack } from '../brand';

interface BrandIntroProps {
  tagline?: string;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({
  tagline = 'HIDRATACIÓN INTELIGENTE'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation - scale up with bounce
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  // Logo glow pulse
  const glowIntensity = interpolate(
    frame,
    [0, fps * 1, fps * 2],
    [0, 1, 0.6],
    { extrapolateRight: 'clamp' }
  );

  // Tagline fade in after logo
  const taglineOpacity = interpolate(
    frame,
    [fps * 0.8, fps * 1.2],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  const taglineY = interpolate(
    frame,
    [fps * 0.8, fps * 1.3],
    [30, 0],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: getFontStack('body'),
      }}
    >
      {/* Radial gradient background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${brand.colors.primary}33 0%, transparent 60%)`,
          opacity: glowIntensity,
        }}
      />

      {/* Logo with glow */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Img
          src={staticFile(brand.logo.path)}
          style={{
            width: 600,
            height: 'auto',
            filter: `drop-shadow(0 0 ${40 * glowIntensity}px ${brand.colors.primary}88) drop-shadow(0 8px 24px rgba(0,0,0,0.4))`,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            marginTop: 40,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 36,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              letterSpacing: 8,
              textShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            {tagline}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          width: interpolate(frame, [fps * 0.5, fps * 1.5], [0, 300], { extrapolateRight: 'clamp' }),
          height: 4,
          backgroundColor: brand.colors.white,
          borderRadius: 2,
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
