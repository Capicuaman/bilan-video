// BILAN Brand Guidelines for Remotion Videos
// Updated: Montserrat Bold, Blue color, Large fonts for accessibility

export const brand = {
  // Colors - BLUE brand color
  colors: {
    primary: '#0066CC',      // Brand blue
    primaryLight: '#3388DD', // Lighter blue for accents
    secondary: '#04414d',    // Dark teal
    background: '#0066CC',   // BLUE background
    backgroundAlt: '#004499', // Darker blue
    white: '#ffffff',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.7)',
    accent: '#0066CC',
    success: '#22c55e',
    error: '#ef4444',
  },

  // Fonts - Montserrat Bold as primary
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
    fallback: 'system-ui, -apple-system, sans-serif',
  },

  // Font paths
  fontFiles: {
    montserratBold: 'fonts/Montserrat-Bold.woff2',
  },

  // Logo - MUCH LARGER and centered
  logo: {
    path: 'logo.png',
    width: 400,       // Big logo at top
    widthCTA: 750,    // CTA screen - HUGE for TikTok visibility
  },

  // Video dimensions (TikTok vertical)
  video: {
    width: 1080,
    height: 1920,
    fps: 30,
  },

  // Animation defaults
  animation: {
    spring: { damping: 12, stiffness: 200 },
    springBouncy: { damping: 8, stiffness: 150 },
    fadeDuration: 10,
  },

  // Typography scale - MAXIMUM SIZE for accessibility
  typography: {
    hero: 72,      // Was 56
    title: 64,     // Was 48
    subtitle: 52,  // Was 36
    body: 44,      // Was 28
    caption: 36,   // Was 22
    label: 28,     // Was 18
  },
} as const;

// Utility function to get full font stack
export const getFontStack = (type: 'heading' | 'body') => {
  return `${brand.fonts[type]}, ${brand.fonts.fallback}`;
};
