import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { brand, getFontStack } from '../brand';

interface BrandOutroProps {
  cta?: string;
  handle?: string;
}

export const BrandOutro: React.FC<BrandOutroProps> = ({
  cta = '¡Síguenos para más tips!',
  handle = '@bilan.mx'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // CTA text animation
  const ctaOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame, fps, config: { damping: 10 } });

  // Logo animation - comes in after CTA
  const logoOpacity = interpolate(frame, [fps * 0.5, fps * 0.8], [0, 1], { extrapolateRight: 'clamp' });
  const logoScale = spring({ 
    frame: frame - fps * 0.5, 
    fps, 
    config: { damping: 8, stiffness: 80 } 
  });

  // Handle animation
  const handleOpacity = interpolate(frame, [fps * 1, fps * 1.3], [0, 1], { extrapolateRight: 'clamp' });
  const handleY = interpolate(frame, [fps * 1, fps * 1.5], [20, 0], { extrapolateRight: 'clamp' });

  // Pulsing glow on logo
  const pulsePhase = (frame / fps) * Math.PI * 2;
  const glowIntensity = 0.5 + Math.sin(pulsePhase) * 0.3;

  // Bottom buttons animation
  const buttonsOpacity = interpolate(frame, [fps * 1.5, fps * 2], [0, 1], { extrapolateRight: 'clamp' });
  const buttonsY = interpolate(frame, [fps * 1.5, fps * 2], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: getFontStack('body'),
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% 40%, ${brand.colors.primary}22 0%, transparent 50%)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
      >
        {/* CTA Text */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          <div
            style={{
              fontSize: 56,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              textAlign: 'center',
              textShadow: '0 6px 20px rgba(0,0,0,0.4)',
              padding: '0 60px',
              lineHeight: 1.2,
            }}
          >
            {cta}
          </div>
        </div>

        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${Math.max(0, logoScale)})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Img
            src={staticFile(brand.logo.path)}
            style={{
              width: brand.logo.widthCTA,
              height: 'auto',
              filter: `drop-shadow(0 0 ${30 * glowIntensity}px ${brand.colors.primary}66) drop-shadow(0 8px 24px rgba(0,0,0,0.3))`,
            }}
          />
          {/* Tagline below logo */}
          <div
            style={{
              marginTop: 20,
              fontSize: 32,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'lowercase',
              textShadow: '0 4px 12px rgba(0,0,0,0.4)',
              opacity: 0.9,
            }}
          >
            hidratación inteligente
          </div>
        </div>

        {/* Handle */}
        <div
          style={{
            opacity: handleOpacity,
            transform: `translateY(${handleY}px)`,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              fontSize: 42,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              padding: '14px 36px',
              backgroundColor: `${brand.colors.primary}`,
              borderRadius: 50,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              boxShadow: `0 8px 32px ${brand.colors.primary}66`,
            }}
          >
            {handle}
          </div>
        </div>

        {/* Action buttons hint */}
        <div
          style={{
            opacity: buttonsOpacity,
            transform: `translateY(${buttonsY}px)`,
            display: 'flex',
            gap: 30,
            marginTop: 20,
          }}
        >
          {['❤️ Like', '💬 Comenta', '📤 Comparte'].map((action, i) => (
            <div
              key={i}
              style={{
                fontSize: 28,
                color: brand.colors.white,
                fontFamily: getFontStack('heading'),
                fontWeight: 600,
                opacity: 0.9,
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              {action}
            </div>
          ))}
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
