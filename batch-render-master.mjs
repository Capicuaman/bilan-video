#!/usr/bin/env node
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
} from "fs";
import { resolve, dirname, basename } from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to ask user for confirmation
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim().toLowerCase());
    });
  });
}

// Progress bar utility
function createProgressBar(current, total, width = 30) {
  const percentage = Math.round((current / total) * 100);
  const filled = Math.round((current / total) * width);
  const empty = width - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);
  return `[${bar}] ${percentage}%`;
}

// Format duration in human-readable format
function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

// Calculate ETA
function calculateETA(completedCount, totalCount, elapsedMs) {
  if (completedCount === 0) return "calculating...";
  const avgTimePerVideo = elapsedMs / completedCount;
  const remainingVideos = totalCount - completedCount;
  const etaMs = avgTimePerVideo * remainingVideos;
  return formatDuration(etaMs);
}

// Configuration
const CONTENT_DIR = process.env.CONTENT_DIR || "content";
const OUTPUT_DIR = process.env.OUTPUT_DIR || "out/batch-01";
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "2", 10);

// Template to Master composition mapping
const TEMPLATE_TO_MASTER = {
  QuickTip: "MasterQuickTip",
  Mythbusting: "MasterMythbusting",
  Educational: "MasterEducational",
  Trending: "MasterTrending",
};

// Default outro CTAs (to avoid repetition with content CTA)
const DEFAULT_OUTRO_CTAS = [
  "¡Guarda este video!",
  "¡Síguenos para más!",
  "Comenta tu experiencia",
  "¡Comparte con un amigo!",
  "Dime qué te pareció",
];

// Load all JSON content files
function loadContentFiles(contentDir) {
  const files = readdirSync(resolve(contentDir)).filter((f) =>
    f.endsWith(".json"),
  );

  const videos = [];

  for (const file of files) {
    try {
      const content = JSON.parse(
        readFileSync(resolve(contentDir, file), "utf-8"),
      );

      // Extract template type from content
      const template = content.template;
      if (!template || !TEMPLATE_TO_MASTER[template]) {
        console.log(`⚠️  Unknown template "${template}" in ${file}, skipping`);
        continue;
      }

      videos.push({
        id: content.id || basename(file, ".json"),
        template: template,
        contentProps: content.contentProps,
        outroCta:
          content.outroCta ||
          DEFAULT_OUTRO_CTAS[videos.length % DEFAULT_OUTRO_CTAS.length],
        audioTrack: content.audioTrack || "ambient-loop.mp3",
        tiktokCaption: content.tiktok?.caption || "",
        file: file,
      });
    } catch (error) {
      console.log(`⚠️  Failed to parse ${file}: ${error.message}`);
    }
  }

  return videos;
}

// Pre-render checklist - displays all text elements for verification
async function showPreRenderChecklist(videos) {
  console.log("\n" + "=".repeat(70));
  console.log("📋 PRE-RENDER CHECKLIST - Please verify all text elements");
  console.log("=".repeat(70));
  console.log("");

  // Default settings
  const introSettings = {
    tagline: "hidratación inteligente",
    duration: "2.5s",
  };

  const outroSettings = {
    handle: "@bilan.electrolitos",
    website: "www.bilan.mx",
    duration: "4s",
    showActionPrompts: true,
  };

  console.log("🎬 INTRO ELEMENTS:");
  console.log("   ├─ Tagline: " + introSettings.tagline);
  console.log("   └─ Duration: " + introSettings.duration);
  console.log("");

  console.log("🎬 OUTRO ELEMENTS:");
  console.log("   ├─ Handle: " + outroSettings.handle);
  console.log("   ├─ Website: " + outroSettings.website);
  console.log("   ├─ Duration: " + outroSettings.duration);
  console.log(
    "   └─ Action Prompts: " +
      (outroSettings.showActionPrompts
        ? "✅ Yes (❤️ Like 💬 Comenta 📤 Comparte)"
        : "❌ No"),
  );
  console.log("");

  console.log("🎬 VIDEOS TO RENDER:");
  videos.forEach((video, i) => {
    console.log(`\n   ${i + 1}. ${video.id} (${video.template})`);
    console.log(`      └─ Outro CTA: "${video.outroCta}"`);
  });

  console.log("\n" + "=".repeat(70));
  console.log("");

  // Ask user to confirm or customize
  const answer = await askQuestion(
    "Do you want to customize any elements? (yes/no): ",
  );

  if (answer === "yes" || answer === "y") {
    console.log("\n📝 CUSTOMIZATION OPTIONS:");

    // Ask about action prompts
    const actionPrompts = await askQuestion(
      "   Show action prompts (Like/Comment/Share)? (yes/no) [default: yes]: ",
    );
    outroSettings.showActionPrompts =
      actionPrompts !== "no" && actionPrompts !== "n";

    // Ask about handle
    const handleAnswer = await askQuestion(
      `   Handle [default: ${outroSettings.handle}]: `,
    );
    if (handleAnswer) outroSettings.handle = handleAnswer;

    // Ask about website
    const websiteAnswer = await askQuestion(
      `   Website [default: ${outroSettings.website}]: `,
    );
    if (websiteAnswer) outroSettings.website = websiteAnswer;

    console.log("\n✅ Updated settings:");
    console.log("   Handle: " + outroSettings.handle);
    console.log("   Website: " + outroSettings.website);
    console.log(
      "   Action Prompts: " + (outroSettings.showActionPrompts ? "Yes" : "No"),
    );
  }

  console.log("\n" + "=".repeat(70));
  const proceed = await askQuestion("\nProceed with rendering? (yes/no): ");
  console.log("=".repeat(70) + "\n");

  return {
    proceed: proceed === "yes" || proceed === "y",
    settings: { intro: introSettings, outro: outroSettings },
  };
}

async function main() {
  const batchStartTime = Date.now();

  console.log("🎬 BILAN Master Video Batch Renderer");
  console.log("====================================");
  console.log(`Content Dir: ${CONTENT_DIR}`);
  console.log(`Output Dir: ${OUTPUT_DIR}`);
  console.log(`Concurrency: ${CONCURRENCY}`);
  console.log("");

  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load videos from JSON files
  const videos = loadContentFiles(CONTENT_DIR);
  console.log(`📋 Found ${videos.length} videos to render`);

  if (videos.length === 0) {
    console.log("❌ No valid JSON files found in content directory");
    process.exit(1);
  }

  console.log("");

  // Show pre-render checklist and get user confirmation
  const checklist = await showPreRenderChecklist(videos);

  if (!checklist.proceed) {
    console.log("\n❌ Rendering cancelled by user");
    rl.close();
    process.exit(0);
  }

  // Store settings for use during rendering
  const renderSettings = checklist.settings;

  // Bundle the project
  console.log("📦 Bundling project...");
  const bundleStartTime = Date.now();
  const bundleLocation = await bundle({
    entryPoint: resolve(__dirname, "src/index.ts"),
    webpackOverride: (config) => config,
  });
  const bundleTime = Date.now() - bundleStartTime;
  console.log(`✅ Bundle complete (${formatDuration(bundleTime)})`);
  console.log("");

  // Render tracking
  const renderResults = [];
  let completed = 0;
  let failed = 0;

  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const videoStartTime = Date.now();
    const compositionId = TEMPLATE_TO_MASTER[video.template];
    const outputPath = resolve(OUTPUT_DIR, `${video.id}.mp4`);

    // Progress header
    const progress = createProgressBar(i, videos.length);
    const eta = calculateETA(
      i,
      videos.length,
      Date.now() - batchStartTime - bundleTime,
    );

    console.log(`\n${progress} Video ${i + 1}/${videos.length} • ETA: ${eta}`);
    console.log(`🎥 Rendering: ${video.id} (${video.template})`);
    console.log(`   Outro CTA: "${video.outroCta}"`);
    console.log(`   Audio: "${video.audioTrack}"`);

    const result = {
      id: video.id,
      template: video.template,
      file: video.file,
      outputPath: outputPath,
      startTime: new Date(videoStartTime).toISOString(),
      status: "pending",
    };

    try {
      // Prepare props for MasterVideo
      const inputProps = {
        template: video.template,
        contentProps: video.contentProps,
        showIntro: true,
        showOutro: true,
        introTagline: renderSettings.intro.tagline,
        outroCta: video.outroCta,
        outroHandle: renderSettings.outro.handle,
        outroWebsite: renderSettings.outro.website,
        showActionPrompts: renderSettings.outro.showActionPrompts,
        audioTrack: video.audioTrack,
      };

      // Get composition
      const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: compositionId,
        inputProps: inputProps,
      });

      // Render with progress callback
      let lastLoggedProgress = 0;
      await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: "h264",
        outputLocation: outputPath,
        inputProps: inputProps,
        concurrency: CONCURRENCY,
        onProgress: ({ progress, renderedFrames, encodedFrames }) => {
          const percentage = Math.round(progress * 100);
          // Log every 10% to avoid spam
          if (percentage >= lastLoggedProgress + 10) {
            const bar = createProgressBar(progress * 100, 100, 20);
            console.log(
              `   ${bar} • Frame ${renderedFrames}/${composition.durationInFrames}`,
            );
            lastLoggedProgress = percentage;
          }
        },
      });

      const renderTime = Date.now() - videoStartTime;
      result.status = "success";
      result.durationMs = renderTime;
      result.endTime = new Date().toISOString();

      console.log(`✅ Saved: ${outputPath}`);
      console.log(`   ⏱️  Render time: ${formatDuration(renderTime)}`);

      // Display TikTok caption for easy copying
      if (video.tiktokCaption) {
        console.log("");
        console.log("   📱 TikTok Caption:");
        console.log("   " + "─".repeat(60));
        video.tiktokCaption.split("\n").forEach((line) => {
          console.log("   " + line);
        });
        console.log("   " + "─".repeat(60));
      }

      completed++;
    } catch (error) {
      const renderTime = Date.now() - videoStartTime;
      result.status = "failed";
      result.durationMs = renderTime;
      result.endTime = new Date().toISOString();
      result.error = {
        message: error.message,
        stack: error.stack,
        frame: error.frame || null,
      };

      console.error(`❌ Failed to render ${video.id}`);
      console.error(`   Error: ${error.message}`);
      if (error.frame) {
        console.error(`   Failed at frame: ${error.frame}`);
      }
      failed++;
    }

    renderResults.push(result);
  }

  const totalTime = Date.now() - batchStartTime;

  // Final summary
  console.log("\n====================================");
  console.log(`🎉 Batch complete!`);
  console.log(`   ⏱️  Total time: ${formatDuration(totalTime)}`);
  console.log(`   📦 Bundle time: ${formatDuration(bundleTime)}`);
  console.log(`   🎬 Render time: ${formatDuration(totalTime - bundleTime)}`);
  console.log(`   ✅ Completed: ${completed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📁 Output: ${resolve(OUTPUT_DIR)}`);

  if (completed > 0) {
    const avgRenderTime =
      renderResults
        .filter((r) => r.status === "success")
        .reduce((sum, r) => sum + r.durationMs, 0) / completed;
    console.log(`   📊 Avg render time: ${formatDuration(avgRenderTime)}`);
  }

  console.log("\n📊 Detailed results:");
  renderResults.forEach((result) => {
    const icon = result.status === "success" ? "✅" : "❌";
    const time = result.durationMs
      ? ` (${formatDuration(result.durationMs)})`
      : "";
    console.log(`   ${icon} ${result.id} (${result.template})${time}`);
    if (result.error) {
      console.log(`      └─ ${result.error.message}`);
    }
  });

  // Save detailed log to JSON
  const logPath = resolve(OUTPUT_DIR, "render-log.json");
  const logData = {
    batchStartTime: new Date(batchStartTime).toISOString(),
    batchEndTime: new Date().toISOString(),
    totalDurationMs: totalTime,
    bundleDurationMs: bundleTime,
    renderDurationMs: totalTime - bundleTime,
    totalVideos: videos.length,
    completed: completed,
    failed: failed,
    concurrency: CONCURRENCY,
    results: renderResults,
  };

  writeFileSync(logPath, JSON.stringify(logData, null, 2));
  console.log(`\n💾 Detailed log saved: ${logPath}`);

  // Close readline interface
  rl.close();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  rl.close();
  process.exit(1);
});
