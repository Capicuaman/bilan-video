import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { brand, getFontStack } from '../brand';

interface EducationalProps {
  title: string;
  hook: string;
  mainPoints: string[];
  conclusion: string;
  cta: string;
  brandColor?: string;
  showLogo?: boolean;
}

export const EducationalVideo: React.FC<EducationalProps> = ({
  title,
  hook,
  mainPoints,
  conclusion,
  cta,
  brandColor = brand.colors.primary,
  showLogo = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing (60 seconds total)
  const hookEnd = fps * 6;
  const pointDuration = fps * 10;
  const pointsStart = fps * 6;
  const conclusionStart = pointsStart + (mainPoints.length * pointDuration);
  const conclusionEnd = conclusionStart + (fps * 8);
  const ctaStart = conclusionEnd;

  // Animations
  const hookOpacity = interpolate(frame, [0, 10, hookEnd - 10, hookEnd], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const hookScale = spring({ frame, fps, config: brand.animation.spring });

  const ctaOpacity = interpolate(frame, [ctaStart, ctaStart + 10], [0, 1], { extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - ctaStart, fps, config: { damping: 10 } });

  const conclusionOpacity = interpolate(
    frame, 
    [conclusionStart, conclusionStart + 10, conclusionEnd - 10, conclusionEnd], 
    [0, 1, 1, 0], 
    { extrapolateRight: 'clamp' }
  );

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Current point
  const getCurrentPoint = () => {
    if (frame < pointsStart) return -1;
    const pointFrame = frame - pointsStart;
    const pointIndex = Math.floor(pointFrame / pointDuration);
    if (pointIndex >= mainPoints.length) return -1;
    return pointIndex;
  };

  const currentPoint = getCurrentPoint();
  const pointLocalFrame = frame - (pointsStart + currentPoint * pointDuration);
  const pointOpacity = interpolate(
    pointLocalFrame, 
    [0, 10, pointDuration - 10, pointDuration], 
    [0, 1, 1, 0], 
    { extrapolateRight: 'clamp' }
  );
  const pointY = interpolate(pointLocalFrame, [0, 15], [40, 0], { extrapolateRight: 'clamp' });

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

      {/* Hook */}
      {frame < hookEnd && (
        <div
          style={{
            position: 'absolute',
            opacity: hookOpacity,
            transform: `scale(${hookScale})`,
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
              letterSpacing: 4,
            }}
          >
            📚 {title}
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
            {hook}
          </div>
        </div>
      )}

      {/* Main Points */}
      {currentPoint >= 0 && currentPoint < mainPoints.length && (
        <div
          style={{
            position: 'absolute',
            opacity: pointOpacity,
            transform: `translateY(${pointY}px)`,
            textAlign: 'center',
            padding: '0 40px',
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
              letterSpacing: 3,
            }}
          >
            PUNTO {currentPoint + 1} DE {mainPoints.length}
          </div>
          <div
            style={{
              fontSize: brand.typography.subtitle,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              lineHeight: 1.2,
              padding: '36px 44px',
              backgroundColor: `${brandColor}15`,
              borderRadius: 20,
              borderLeft: `6px solid ${brandColor}`,
            }}
          >
            {mainPoints[currentPoint]}
          </div>
        </div>
      )}

      {/* Conclusion */}
      {frame >= conclusionStart && frame < conclusionEnd && (
        <div
          style={{
            position: 'absolute',
            opacity: conclusionOpacity,
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
              letterSpacing: 3,
            }}
          >
            ✨ EN RESUMEN
          </div>
          <div
            style={{
              fontSize: brand.typography.subtitle,
              color: brand.colors.white,
              fontFamily: getFontStack('heading'),
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {conclusion}
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

      {/* Progress indicator */}
      {currentPoint >= 0 && currentPoint < mainPoints.length && (
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            display: 'flex',
            gap: 12,
          }}
        >
          {mainPoints.map((_, i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: i <= currentPoint ? brandColor : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
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
