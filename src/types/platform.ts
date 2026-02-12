/**
 * Platform-specific type definitions and mappings for video generation
 * Used to route intro/outro components based on target platform
 */

export type Platform = 'tiktok' | 'whatsapp' | 'instagram' | 'twitter';

export type IntroVariant = 'whatsapp' | 'instagram' | 'standard';

/**
 * Maps each platform to its optimal intro variant
 * - WhatsApp: Short 2-second intro for quick consumption
 * - Instagram: Short 2-second intro similar to WhatsApp
 * - TikTok/Twitter: Standard 2.5-second intro with more breathing room
 */
export const PLATFORM_INTRO_MAP: Record<Platform, IntroVariant> = {
  tiktok: 'standard',
  whatsapp: 'whatsapp',
  instagram: 'instagram',
  twitter: 'standard',
};

/**
 * Duration in seconds for each intro variant
 */
export const INTRO_DURATIONS: Record<IntroVariant, number> = {
  whatsapp: 2.0,    // Shorter for WhatsApp - faster content consumption
  instagram: 2.0,   // Same as WhatsApp for consistency
  standard: 2.5,    // Standard for TikTok/Twitter - allows for more brand presence
};

/**
 * Get the intro duration for a specific platform
 */
export function getIntroDuration(platform: Platform): number {
  const variant = PLATFORM_INTRO_MAP[platform];
  return INTRO_DURATIONS[variant];
}

/**
 * Get the intro duration in frames for a specific platform
 */
export function getIntroDurationFrames(platform: Platform, fps: number): number {
  return Math.round(getIntroDuration(platform) * fps);
}
