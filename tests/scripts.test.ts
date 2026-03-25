import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { resolve } from 'path';

const root = resolve(__dirname, '..');

describe('Production scripts exist', () => {
  it('scripts/multi-platform-generator.mjs', () => {
    expect(existsSync(resolve(root, 'scripts/multi-platform-generator.mjs'))).toBe(true);
  });

  it('scripts/batch-automation.mjs', () => {
    expect(existsSync(resolve(root, 'scripts/batch-automation.mjs'))).toBe(true);
  });

  it('scripts/content-manager.mjs', () => {
    expect(existsSync(resolve(root, 'scripts/content-manager.mjs'))).toBe(true);
  });
});

describe('Broken scripts are gone (regressions)', () => {
  it('batch-render.mjs at project root does NOT exist', () => {
    expect(existsSync(resolve(root, 'batch-render.mjs'))).toBe(false);
  });
});
