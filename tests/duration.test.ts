import { vi, describe, it, expect } from 'vitest';

// Mock Remotion and all component/template imports before importing MasterVideo
vi.mock('remotion', () => ({
  AbsoluteFill: 'div',
  Sequence: 'div',
  useVideoConfig: () => ({ fps: 30 }),
  Audio: 'audio',
  staticFile: (x: string) => x,
}));

vi.mock('../src/components/BrandIntroPerfected', () => ({
  BrandIntroPerfected: () => null,
}));

vi.mock('../src/components/BrandOutroPerfected', () => ({
  BrandOutroPerfected: () => null,
}));

vi.mock('../src/templates/QuickTipVideo', () => ({
  QuickTipVideo: () => null,
}));

vi.mock('../src/templates/MythbustingVideo', () => ({
  MythbustingVideo: () => null,
}));

vi.mock('../src/templates/EducationalVideo', () => ({
  EducationalVideo: () => null,
}));

vi.mock('../src/templates/TrendingVideo', () => ({
  TrendingVideo: () => null,
}));

import { getMasterVideoDuration } from '../src/templates/MasterVideo';

// Expected values based on MasterVideo.tsx constants:
//   INTRO_DURATION = 2.5s, OUTRO_DURATION = 4s
//   CONTENT_DURATIONS: QuickTip=15, Mythbusting=30, Educational=60, Trending=40
//   Formula: Math.round((intro + content + outro) * fps)

describe('getMasterVideoDuration', () => {
  describe('QuickTip (15s content)', () => {
    it('no intro, no outro: 15 × 30 = 450 frames', () => {
      expect(getMasterVideoDuration('QuickTip', false, false)).toBe(450);
    });

    it('with intro+outro: (2.5 + 15 + 4) × 30 = 645 frames', () => {
      expect(getMasterVideoDuration('QuickTip', true, true)).toBe(645);
    });
  });

  describe('Mythbusting (30s content)', () => {
    it('with intro+outro: (2.5 + 30 + 4) × 30 = 1095 frames', () => {
      expect(getMasterVideoDuration('Mythbusting', true, true)).toBe(1095);
    });
  });

  describe('Educational (60s content)', () => {
    it('with intro+outro: (2.5 + 60 + 4) × 30 = 1995 frames', () => {
      expect(getMasterVideoDuration('Educational', true, true)).toBe(1995);
    });
  });

  describe('Trending (40s content)', () => {
    it('with intro+outro: (2.5 + 40 + 4) × 30 = 1395 frames', () => {
      expect(getMasterVideoDuration('Trending', true, true)).toBe(1395);
    });
  });

  it('defaults to fps=30 when not specified', () => {
    expect(getMasterVideoDuration('QuickTip')).toBe(getMasterVideoDuration('QuickTip', true, true, 30));
  });
});
