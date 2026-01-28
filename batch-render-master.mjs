#!/usr/bin/env node
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { readFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const CONTENT_DIR = process.env.CONTENT_DIR || 'content';
const OUTPUT_DIR = process.env.OUTPUT_DIR || 'out/batch-01';
const CONCURRENCY = parseInt(process.env.CONCURRENCY || '2', 10);

// Template to Master composition mapping
const TEMPLATE_TO_MASTER = {
  QuickTip: 'MasterQuickTip',
  Mythbusting: 'MasterMythbusting',
  Educational: 'MasterEducational',
  Trending: 'MasterTrending',
};

// Default outro CTAs (to avoid repetition with content CTA)
const DEFAULT_OUTRO_CTAS = [
  '¡Guarda este video!',
  '¡Síguenos para más!',
  'Comenta tu experiencia',
  '¡Comparte con un amigo!',
  'Dime qué te pareció',
];

// Load all JSON content files
function loadContentFiles(contentDir) {
  const files = readdirSync(resolve(contentDir))
    .filter(f => f.endsWith('.json'));

  const videos = [];

  for (const file of files) {
    try {
      const content = JSON.parse(readFileSync(resolve(contentDir, file), 'utf-8'));

      // Extract template type from content
      const template = content.template;
      if (!template || !TEMPLATE_TO_MASTER[template]) {
        console.log(`⚠️  Unknown template "${template}" in ${file}, skipping`);
        continue;
      }

      videos.push({
        id: content.id || basename(file, '.json'),
        template: template,
        contentProps: content.contentProps,
        outroCta: content.outroCta || DEFAULT_OUTRO_CTAS[videos.length % DEFAULT_OUTRO_CTAS.length],
        file: file,
      });
    } catch (error) {
      console.log(`⚠️  Failed to parse ${file}: ${error.message}`);
    }
  }

  return videos;
}

async function main() {
  console.log('🎬 BILAN Master Video Batch Renderer');
  console.log('====================================');
  console.log(`Content Dir: ${CONTENT_DIR}`);
  console.log(`Output Dir: ${OUTPUT_DIR}`);
  console.log(`Concurrency: ${CONCURRENCY}`);
  console.log('');

  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load videos from JSON files
  const videos = loadContentFiles(CONTENT_DIR);
  console.log(`📋 Found ${videos.length} videos to render`);

  if (videos.length === 0) {
    console.log('❌ No valid JSON files found in content directory');
    process.exit(1);
  }

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
    const compositionId = TEMPLATE_TO_MASTER[video.template];
    const outputPath = resolve(OUTPUT_DIR, `${video.id}.mp4`);

    console.log(`🎥 Rendering: ${video.id} (${video.template})`);
    console.log(`   Outro CTA: "${video.outroCta}"`);

    try {
      // Prepare props for MasterVideo
      const inputProps = {
        template: video.template,
        contentProps: video.contentProps,
        showIntro: true,
        showOutro: true,
        introTagline: 'hidratación inteligente',
        outroCta: video.outroCta,
        outroHandle: '@bilan.mx',
      };

      // Get composition
      const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: compositionId,
        inputProps: inputProps,
      });

      // Render
      await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: 'h264',
        outputLocation: outputPath,
        inputProps: inputProps,
        concurrency: CONCURRENCY,
      });

      console.log(`✅ Saved: ${outputPath}`);
      console.log('');
      completed++;
    } catch (error) {
      console.error(`❌ Failed to render ${video.id}:`, error.message);
      console.log('');
      failed++;
    }
  }

  console.log('====================================');
  console.log(`🎉 Batch complete!`);
  console.log(`   ✅ Completed: ${completed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📁 Output: ${resolve(OUTPUT_DIR)}`);
  console.log('');
  console.log('📊 Rendered videos:');
  videos.forEach((v, i) => {
    const status = i < completed ? '✅' : '❌';
    console.log(`   ${status} ${v.id} (${v.template})`);
  });
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
