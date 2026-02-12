import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';
import { brand, getFontStack } from '../brand';

interface BrandIntroInstagramProps {
  tagline?: string;
}

/**
 * Instagram-optimized intro with 2-second duration
 * Currently mirrors WhatsApp intro for consistency
 * Key features:
 * - Logo visible from frame 0 (critical for Instagram thumbnails)
 * - Faster animations for quick content consumption
 * - Optimized for 1080x1080 square format
 */
export const BrandIntroInstagram: React.FC<BrandIntroInstagramProps> = ({
  tagline = 'hidratación inteligente'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo - VISIBLE from frame 0, no fade-in animation
  // This ensures Instagram thumbnail shows the logo
  const logoOpacity = 1; // Static visibility
  const logoScale = 1.0; // No spring animation for faster intro

  // Background glow - adjusted for 2-second duration
  const backgroundGlow = interpolate(
    frame,
    [0, fps * 0.3, fps * 1.5],
    [0, 0.6, 0.4],
    { extrapolateRight: 'clamp' }
  );

  // Tagline - faster timing for 2-second intro
  const taglineOpacity = interpolate(
    frame,
    [fps * 0.5, fps * 0.8],  // Faster: 0.5s-0.8s instead of 0.8s-1.2s
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  const taglineY = interpolate(
    frame,
    [fps * 0.5, fps * 0.9],  // Faster animation
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
      {/* Subtle background glow */}
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

      {/* Logo with glow - visible from frame 0 */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Img
          src={staticFile(brand.logo.path)}
          style={{
            width: brand.logo.width,
            height: 'auto',
            filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.3))',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            marginTop: 15,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          <div
            style={{
              fontSize: brand.typography.title,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'lowercase',
              textShadow: '0 4px 12px rgba(0,0,0,0.4)',
              textAlign: 'center',
            }}
          >
            {tagline}
          </div>
        </div>
      </div>

      {/* Brand bar at bottom */}
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
