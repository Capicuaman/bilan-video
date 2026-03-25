import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const root = resolve(__dirname, '..');
const rootContent = readFileSync(resolve(root, 'src/Root.tsx'), 'utf-8');
const generatorContent = readFileSync(
  resolve(root, 'scripts/multi-platform-generator.mjs'),
  'utf-8',
);

function extractCompositionIds(source: string): string[] {
  return [...source.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
}

function extractGeneratorCompositions(source: string): string[] {
  return [...source.matchAll(/composition:\s*'([^']+)'/g)].map((m) => m[1]);
}

describe('Root.tsx composition IDs', () => {
  const ids = extractCompositionIds(rootContent);

  it('has exactly 10 compositions', () => {
    expect(ids).toHaveLength(10);
  });

  it('has all 4 platform compositions', () => {
    expect(ids).toContain('QuickTip');
    expect(ids).toContain('QuickTipWhatsApp');
    expect(ids).toContain('QuickTipInstagram');
    expect(ids).toContain('EducationalTwitter');
  });

  it('has all 4 master compositions', () => {
    expect(ids).toContain('MasterQuickTip');
    expect(ids).toContain('MasterMythbusting');
    expect(ids).toContain('MasterEducational');
    expect(ids).toContain('MasterTrending');
  });

  it('has 2 preview compositions', () => {
    expect(ids).toContain('PreviewBrandIntroPerfected');
    expect(ids).toContain('PreviewBrandOutroPerfected');
  });

  it('all composition IDs in multi-platform-generator PLATFORMS config exist in Root.tsx', () => {
    const generatorCompositions = extractGeneratorCompositions(generatorContent);
    expect(generatorCompositions.length).toBeGreaterThan(0);
    for (const compId of generatorCompositions) {
      expect(ids, `"${compId}" from generator not found in Root.tsx`).toContain(compId);
    }
  });
});
