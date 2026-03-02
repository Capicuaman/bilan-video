#!/usr/bin/env node
/**
 * Complete Caption Generator
 * Generates full, platform-optimized captions for all content files
 */

const fs = require("fs");
const path = require("path");

const CONTENT_DIR = "/home/capicuaman/Documents/bilan-video/content/ready";
const OUT_DIR = "/home/capicuaman/Documents/bilan-video/out";

// Platform configurations
const platforms = {
  tiktok: {
    emoji: "🔥",
    style: "trendy",
    maxLength: 2200,
    format: (content, hashtags) => {
      return `${content.tip}\n\n${content.reason}\n\n${content.cta}\n\n${hashtags}`;
    },
  },
  instagram: {
    emoji: "💡",
    style: "polished",
    maxLength: 2200,
    format: (content, hashtags) => {
      return `${content.tip}\n\n✨ ${content.reason}\n\n${content.cta}\n\n${hashtags}`;
    },
  },
  whatsapp: {
    emoji: "📱",
    style: "personal",
    maxLength: 4096,
    format: (content, hashtags) => {
      return `${content.tip}\n\n${content.reason}\n\n${content.cta}`;
    },
  },
  twitter: {
    emoji: "🧵",
    style: "thread",
    maxLength: 280,
    format: (content, hashtags) => {
      return `${content.tip}\n\nHilo 👇\n\n${content.reason}\n\n${content.cta}\n\n${hashtags}`;
    },
  },
};

function formatHashtags(hashtags, platform) {
  if (!hashtags || hashtags.length === 0) return "";
  return hashtags.join(" ");
}

function generateCaption(content, platform) {
  const config = platforms[platform];
  const hashtags = content.hashtags?.[platform] || [];
  const hashtagStr = formatHashtags(hashtags, platform);

  let caption = config.format(content, hashtagStr);

  // Add platform-specific emoji at start
  caption = `${config.emoji} ${caption}`;

  return caption;
}

function processContentFile(filePath) {
  const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const contentId = content.contentId;

  console.log(`Processing ${contentId}...`);

  // Generate captions for each platform
  for (const [platform, platformData] of Object.entries(
    content.platforms || {},
  )) {
    if (!platforms[platform]) continue;

    const caption = generateCaption(content.content, platform);
    const captionFile = path.join(
      OUT_DIR,
      platform,
      `${contentId}_${platform}_caption.txt`,
    );

    // Write the complete caption
    fs.writeFileSync(captionFile, caption, "utf8");
    console.log(`  ✓ ${platform}: ${caption.length} chars`);

    // Update the content JSON with complete caption
    content.platforms[platform].caption = caption;
  }

  // Update the content file with complete captions
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf8");
}

function main() {
  console.log("🚀 Starting caption completion...\n");

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  console.log(`Found ${files.length} content files\n`);

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    try {
      processContentFile(filePath);
      console.log("");
    } catch (err) {
      console.error(`  ✗ Error processing ${file}: ${err.message}\n`);
    }
  }

  console.log("✅ Caption generation complete!");
}

main();
