#!/usr/bin/env node
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { parse } from 'csv-parse/sync';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const CSV_FILE = process.env.CSV_FILE || 'src/data/videos.csv';
const OUTPUT_DIR = process.env.OUTPUT_DIR || 'out';
const CONCURRENCY = parseInt(process.env.CONCURRENCY || '2', 10);

// Type to composition mapping
const TYPE_TO_COMPOSITION = {
  Educational: 'Educational',
  Mythbusting: 'Mythbusting',
  QuickTip: 'QuickTip',
  Trending: 'Trending',
};

// Parse CSV and transform to props
function parseVideoCSV(csvPath) {
  const content = readFileSync(resolve(csvPath), 'utf-8');
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return records.map((record) => {
    const base = {
      id: record.id,
      type: record.type,
      title: record.title,
      cta: record.cta,
      brandColor: record.brandColor || '#00a86b',
    };

    switch (record.type) {
      case 'Educational':
        return {
          ...base,
          hook: record.hook,
          mainPoints: record.mainPoints?.split('|').map((p) => p.trim()) || [],
          conclusion: record.conclusion,
        };
      case 'Mythbusting':
        return {
          ...base,
          myth: record.myth,
          truth: record.truth,
          explanation: record.explanation,
        };
      case 'QuickTip':
        return {
          ...base,
          tip: record.tip,
          reason: record.reason,
        };
      case 'Trending':
        return {
          ...base,
          hook: record.hook,
          scenes: record.scenes?.split('|').map((s) => s.trim()) || [],
          trendingFormat: record.trendingFormat || 'transformation',
        };
      default:
        return base;
    }
  });
}

async function main() {
  console.log('🎬 BILAN Video Batch Renderer');
  console.log('============================');
  console.log(`CSV File: ${CSV_FILE}`);
  console.log(`Output Dir: ${OUTPUT_DIR}`);
  console.log(`Concurrency: ${CONCURRENCY}`);
  console.log('');

  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Parse videos from CSV
  const videos = parseVideoCSV(CSV_FILE);
  console.log(`📋 Found ${videos.length} videos to render`);
  console.log('');

  // Bundle the project
  console.log('📦 Bundling project...');
  const bundleLocation = await bundle({
    entryPoint: resolve(__dirname, 'src/index.ts'),
    webpackOverride: (config) => config,
  });
  console.log('✅ Bundle complete');
  console.log('');

  // Render each video
  let completed = 0;
  let failed = 0;

  for (const video of videos) {
    const compositionId = TYPE_TO_COMPOSITION[video.type];
    if (!compositionId) {
      console.log(`⚠️  Unknown type "${video.type}" for video ${video.id}, skipping`);
      failed++;
      continue;
    }

    const outputPath = resolve(OUTPUT_DIR, `${video.id}_${video.type.toLowerCase()}.mp4`);
    console.log(`🎥 Rendering: ${video.id} (${video.type})`);

    try {
      // Get composition
      const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: compositionId,
        inputProps: video,
      });

      // Render
      await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: 'h264',
        outputLocation: outputPath,
        inputProps: video,
        concurrency: CONCURRENCY,
      });

      console.log(`✅ Saved: ${outputPath}`);
      completed++;
    } catch (error) {
      console.error(`❌ Failed to render ${video.id}:`, error.message);
      failed++;
    }
  }

  console.log('');
  console.log('============================');
  console.log(`🎉 Batch complete!`);
  console.log(`   ✅ Completed: ${completed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📁 Output: ${resolve(OUTPUT_DIR)}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
