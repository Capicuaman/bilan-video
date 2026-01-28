import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { brand, getFontStack } from '../brand';

interface BrandIntroPerfectedProps {
  tagline?: string;
}

export const BrandIntroPerfected: React.FC<BrandIntroPerfectedProps> = ({
  tagline = 'hidratación inteligente'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation - scale up with bounce (same config as outro)
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  // Static background glow - no pulsing distraction
  const backgroundGlow = interpolate(
    frame,
    [0, fps * 0.5, fps * 2],
    [0, 0.6, 0.4],
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
      {/* Subtle background glow - no pulsing */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${brand.colors.primary}33 0%, transparent 60%)`,
          opacity: backgroundGlow,
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
            width: brand.logo.width, // Use brand constant: 550px
            height: 'auto',
            filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.3))', // Static shadow - no pulsing
          }}
        />

        {/* Tagline - matches outro style */}
        <div
          style={{
            marginTop: 15, // Tight spacing to match outro
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          <div
            style={{
              fontSize: brand.typography.title, // 64px for maximum visibility
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              letterSpacing: 6, // Match outro
              textTransform: 'lowercase', // Consistent with outro
              textShadow: '0 4px 12px rgba(0,0,0,0.4)',
              textAlign: 'center',
            }}
          >
            {tagline}
          </div>
        </div>
      </div>

      {/* Brand bar at bottom - consistent with outro */}
      <div
        style={{
          position: 'absolute',
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
