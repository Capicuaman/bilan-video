import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';

const root = resolve(__dirname, '..');
const contentDir = resolve(root, 'content');

function collectJsonFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...collectJsonFiles(fullPath));
    } else if (entry.endsWith('.json')) {
      results.push(fullPath);
    }
  }
  return results;
}

const jsonFiles = collectJsonFiles(contentDir);

describe('Content JSON files', () => {
  it('finds at least one content file', () => {
    expect(jsonFiles.length).toBeGreaterThan(0);
  });

  for (const filePath of jsonFiles) {
    const relativePath = filePath.replace(root + '/', '');

    it(`${relativePath} — parses as valid JSON`, () => {
      const raw = readFileSync(filePath, 'utf-8');
      expect(() => JSON.parse(raw)).not.toThrow();
    });

    it(`${relativePath} — is a non-null object`, () => {
      const parsed: unknown = JSON.parse(readFileSync(filePath, 'utf-8'));
      expect(parsed).not.toBeNull();
      expect(typeof parsed).toBe('object');
      expect(Array.isArray(parsed)).toBe(false);
    });
  }
});
