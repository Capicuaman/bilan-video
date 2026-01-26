import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import { brand, getFontStack } from '../brand';

interface TrendingProps {
  title: string;
  hook: string;
  scenes: string[];
  cta: string;
  trendingFormat?: 'transformation' | 'pov' | 'challenge' | 'duet';
  brandColor?: string;
  showLogo?: boolean;
}

export const TrendingVideo: React.FC<TrendingProps> = ({
  title,
  hook,
  scenes,
  cta,
  trendingFormat = 'transformation',
  brandColor = brand.colors.primary,
  showLogo = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing (40 seconds total)
  const hookEnd = fps * 5;
  const sceneDuration = fps * 7;
  const scenesStart = fps * 5;
  const ctaStart = scenesStart + (scenes.length * sceneDuration);

  // Animations
  const hookOpacity = interpolate(frame, [0, 10, hookEnd - 10, hookEnd], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const hookScale = spring({ frame, fps, config: brand.animation.spring });

  const ctaOpacity = interpolate(frame, [ctaStart, ctaStart + 10], [0, 1], { extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - ctaStart, fps, config: { damping: 10 } });

  // Logo fades in at start, fades out before CTA (so only one logo shows at a time)
  const logoOpacity = interpolate(
    frame, 
    [0, 15, ctaStart - 15, ctaStart], 
    [0, 1, 1, 0], 
    { extrapolateRight: 'clamp' }
  );

  // Current scene
  const getCurrentScene = () => {
    if (frame < scenesStart) return -1;
    const sceneFrame = frame - scenesStart;
    const sceneIndex = Math.floor(sceneFrame / sceneDuration);
    if (sceneIndex >= scenes.length) return -1;
    return sceneIndex;
  };

  const currentScene = getCurrentScene();
  const sceneLocalFrame = frame - (scenesStart + currentScene * sceneDuration);
  const sceneOpacity = interpolate(
    sceneLocalFrame, 
    [0, 10, sceneDuration - 10, sceneDuration], 
    [0, 1, 1, 0], 
    { extrapolateRight: 'clamp' }
  );

  const getSceneAnimation = () => {
    switch (trendingFormat) {
      case 'transformation':
        const scaleVal = spring({ frame: sceneLocalFrame, fps, config: { damping: 8, mass: 0.5 } });
        return { transform: `scale(${scaleVal})` };
      case 'pov':
        const shakeX = Math.sin(sceneLocalFrame * 0.5) * 3;
        return { transform: `translateX(${shakeX}px)` };
      case 'challenge':
        const bounce = spring({ frame: sceneLocalFrame, fps, config: { damping: 5, stiffness: 100 } });
        return { transform: `translateY(${(1 - bounce) * 30}px)` };
      default:
        return { transform: 'none' };
    }
  };

  const getFormatLabel = () => {
    switch (trendingFormat) {
      case 'transformation': return '✨ TRANSFORMACIÓN';
      case 'pov': return '👀 POV';
      case 'challenge': return '🔥 CHALLENGE';
      case 'duet': return '🎭 DUET';
      default: return '🎬 TRENDING';
    }
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: getFontStack('body'),
      }}
    >
      {/* Subtle white gradient overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)',
          pointerEvents: 'none',
        }}
      />
      
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
            {getFormatLabel()}
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

      {/* Scenes */}
      {currentScene >= 0 && currentScene < scenes.length && (
        <div
          style={{
            position: 'absolute',
            opacity: sceneOpacity,
            ...getSceneAnimation(),
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          {trendingFormat === 'transformation' && (
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
              {currentScene === 0 ? '❌ ANTES' : currentScene === scenes.length - 1 ? '✅ DESPUÉS' : `PASO ${currentScene}`}
            </div>
          )}
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
            }}
          >
            {scenes[currentScene]}
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

      {/* Scene indicator */}
      {currentScene >= 0 && currentScene < scenes.length && (
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            display: 'flex',
            gap: 12,
          }}
        >
          {scenes.map((_, i) => (
            <div
              key={i}
              style={{
                width: 50,
                height: 8,
                borderRadius: 4,
                backgroundColor: i <= currentScene ? brandColor : 'rgba(255,255,255,0.3)',
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
