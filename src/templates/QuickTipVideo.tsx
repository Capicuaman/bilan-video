import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { brand, getFontStack } from '../brand';

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
  const tipOpacity = interpolate(frame, [tipStart, tipStart + 10, tipEnd - 10, tipEnd], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const tipScale = spring({ frame: frame - tipStart, fps, config: brand.animation.spring });

  const reasonOpacity = interpolate(frame, [reasonStart, reasonStart + 10, reasonEnd - 10, reasonEnd], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const reasonY = interpolate(frame, [reasonStart, reasonStart + 15], [50, 0], { extrapolateRight: 'clamp' });

  const ctaOpacity = interpolate(frame, [ctaStart, ctaStart + 10], [0, 1], { extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - ctaStart, fps, config: { damping: 10 } });

  // Logo animation
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: getFontStack('body'),
      }}
    >
      {/* Logo - centered, large */}
      {showLogo && (
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: logoOpacity,
          }}
        >
          <Img
            src={staticFile(brand.logo.path)}
            style={{ width: brand.logo.width, height: 'auto' }}
          />
        </div>
      )}

      {/* Tip */}
      {frame >= tipStart && frame < tipEnd && (
        <div
          style={{
            position: 'absolute',
            opacity: tipOpacity,
            transform: `scale(${tipScale})`,
            textAlign: 'center',
            padding: '0 50px',
          }}
        >
          <div
            style={{
              fontSize: brand.typography.caption,
              color: brandColor,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              marginBottom: 24,
              textTransform: 'uppercase',
              letterSpacing: 4,
            }}
          >
            💡 TIP RÁPIDO
          </div>
          <div
            style={{
              fontSize: brand.typography.hero,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              lineHeight: 1.1,
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
            position: 'absolute',
            opacity: reasonOpacity,
            transform: `translateY(${reasonY}px)`,
            textAlign: 'center',
            padding: '0 50px',
          }}
        >
          <div
            style={{
              fontSize: brand.typography.body,
              color: brandColor,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              marginBottom: 24,
              textTransform: 'uppercase',
              letterSpacing: 3,
            }}
          >
            ¿POR QUÉ?
          </div>
          <div
            style={{
              fontSize: brand.typography.title,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              lineHeight: 1.2,
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
            position: 'absolute',
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: brand.typography.title,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              marginBottom: 40,
            }}
          >
            {cta}
          </div>
          {showLogo && (
            <Img
              src={staticFile(brand.logo.path)}
              style={{ width: brand.logo.widthCTA, height: 'auto' }}
            />
          )}
        </div>
      )}

      {/* Brand bar */}
      <div
        style={{
          position: 'absolute',
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
