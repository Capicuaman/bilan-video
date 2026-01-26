import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { brand, getFontStack } from '../brand';

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

  // Timing (30 seconds total)
  const titleEnd = fps * 4;
  const mythStart = fps * 4;
  const mythEnd = fps * 10;
  const truthStart = fps * 10;
  const truthEnd = fps * 18;
  const explanationStart = fps * 18;
  const explanationEnd = fps * 24;
  const ctaStart = fps * 24;

  // Animations
  const titleOpacity = interpolate(frame, [0, 10, titleEnd - 10, titleEnd], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const titleScale = spring({ frame, fps, config: brand.animation.spring });

  const mythOpacity = interpolate(frame, [mythStart, mythStart + 10, mythEnd - 10, mythEnd], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const mythX = interpolate(frame, [mythStart, mythStart + 15], [-100, 0], { extrapolateRight: 'clamp' });

  const truthOpacity = interpolate(frame, [truthStart, truthStart + 10, truthEnd - 10, truthEnd], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const truthScale = spring({ frame: frame - truthStart, fps, config: { damping: 10 } });

  const explainOpacity = interpolate(frame, [explanationStart, explanationStart + 10, explanationEnd - 10, explanationEnd], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  const ctaOpacity = interpolate(frame, [ctaStart, ctaStart + 10], [0, 1], { extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - ctaStart, fps, config: { damping: 10 } });

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

      {/* Title */}
      {frame < titleEnd && (
        <div
          style={{
            position: 'absolute',
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
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
            🔍 MITO VS REALIDAD
          </div>
          <div
            style={{
              fontSize: brand.typography.title,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              lineHeight: 1.1,
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
            position: 'absolute',
            opacity: mythOpacity,
            transform: `translateX(${mythX}px)`,
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          <div
            style={{
              fontSize: brand.typography.body,
              color: brand.colors.error,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              marginBottom: 24,
              textTransform: 'uppercase',
              letterSpacing: 3,
            }}
          >
            ❌ EL MITO
          </div>
          <div
            style={{
              fontSize: brand.typography.subtitle,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              lineHeight: 1.2,
              padding: '36px 44px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              borderRadius: 20,
              border: '3px solid rgba(239, 68, 68, 0.4)',
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
            position: 'absolute',
            opacity: truthOpacity,
            transform: `scale(${truthScale})`,
            textAlign: 'center',
            padding: '0 40px',
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
            ✅ LA VERDAD
          </div>
          <div
            style={{
              fontSize: brand.typography.subtitle,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              lineHeight: 1.2,
              padding: '36px 44px',
              backgroundColor: `${brandColor}22`,
              borderRadius: 20,
              border: `3px solid ${brandColor}55`,
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
            position: 'absolute',
            opacity: explainOpacity,
            textAlign: 'center',
            padding: '0 50px',
          }}
        >
          <div
            style={{
              fontSize: brand.typography.subtitle,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {explanation}
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
