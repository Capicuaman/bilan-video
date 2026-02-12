#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Multi-Platform Video Generator
 * Generate videos for all social media platforms from single content source
 */

// Platform configurations
const PLATFORMS = {
  tiktok: {
    composition: 'QuickTip', // Use existing for vertical
    dimensions: { width: 1080, height: 1920 },
    duration: 15, // seconds
    outputDir: 'out/tiktok'
  },
  whatsapp: {
    composition: 'QuickTipWhatsApp',
    dimensions: { width: 1080, height: 1080 },
    duration: 12,
    outputDir: 'out/whatsapp'
  },
  twitter: {
    composition: 'EducationalTwitter', 
    dimensions: { width: 1920, height: 1080 },
    duration: 15,
    outputDir: 'out/twitter'
  },
  instagram: {
    composition: 'QuickTipInstagram', // Square version
    dimensions: { width: 1080, height: 1080 },
    duration: 15,
    outputDir: 'out/instagram'
  }
};

// Caption templates for each platform
const CAPTION_TEMPLATES = {
  tiktok: {
    prefix: "🔥",
    style: "casual",
    hashtags: ["#electrolitos", "#hidratacion", "#bilan", "#ciencia", "#salud"],
    maxLength: 150
  },
  instagram: {
    prefix: "💡",
    style: "educational",
    hashtags: ["#ElectrolitosReales", "#HidratacionInteligente", "#bilan", "#SaludBasadaEnCiencia"],
    maxLength: 300
  },
  whatsapp: {
    prefix: "📱",
    style: "direct",
    hashtags: [],
    maxLength: 100
  },
  twitter: {
    prefix: "🧵",
    style: "thread",
    hashtags: ["#electrolitos", "#hidratacion", "#salud"],
    maxLength: 240
  }
};

class MultiPlatformGenerator {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    Object.values(PLATFORMS).forEach(platform => {
      const dir = platform.outputDir;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      }
    });
  }

  generateCaption(content, platform) {
    const template = CAPTION_TEMPLATES[platform];
    const { tip, reason, cta } = content;
    
    let caption = `${template.prefix} ${tip}\\n\\n`;
    
    if (template.style === 'educational') {
      caption += `✨ ${reason}\\n\\n`;
    } else if (template.style === 'casual') {
      caption += `${reason} 💪\\n\\n`;
    } else if (template.style === 'thread') {
      caption += `Hilo 👇\\n\\n${reason}\\n\\n`;
    } else {
      caption += `${reason}\\n\\n`;
    }
    
    caption += `${cta}`;
    
    // Add hashtags if platform uses them
    if (template.hashtags.length > 0) {
      caption += `\\n\\n${template.hashtags.join(' ')}`;
    }
    
    // Truncate if too long
    if (caption.length > template.maxLength) {
      caption = caption.substring(0, template.maxLength - 3) + '...';
    }
    
    return caption;
  }

  async generatePlatformVideo(contentId, content, platform) {
    const platformConfig = PLATFORMS[platform];
    const outputPath = `${platformConfig.outputDir}/${contentId}_${platform}.mp4`;
    
    console.log(`\\n🎬 Generating ${platform} video for ${contentId}...`);
    
    // Prepare props based on platform and content type
    let props = {};
    if (platform === 'twitter') {
      // Educational format for Twitter
      props = {
        title: content.title || content.tip,
        subtitle: content.subtitle || "Lo que necesitas saber",
        keyPoint1: content.keyPoint1 || "PUNTO 1\\nInformación relevante",
        keyPoint2: content.keyPoint2 || "PUNTO 2\\nDatos importantes", 
        keyPoint3: content.keyPoint3 || "PUNTO 3\\nConclusión clave",
        conclusion: content.conclusion || content.cta
      };
    } else {
      // QuickTip format for others
      props = {
        tip: content.tip,
        reason: content.reason,
        cta: content.cta
      };
    }
    
    // Build Remotion render command
    // Save props to temp file to avoid JSON escaping issues
    const tempPropsFile = `temp_props_${contentId}_${platform}.json`;
    fs.writeFileSync(tempPropsFile, JSON.stringify(props, null, 2));
    
    const command = [
      'npx remotion render',
      platformConfig.composition,
      outputPath,
      `--props=${tempPropsFile}`,
      '--overwrite'
    ].join(' ');
    
    try {
      const startTime = Date.now();
      execSync(command, { stdio: 'inherit', cwd: process.cwd() });
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      
      // Generate caption
      const caption = this.generateCaption(content, platform);
      
      // Save caption to file
      const captionPath = `${platformConfig.outputDir}/${contentId}_${platform}_caption.txt`;
      fs.writeFileSync(captionPath, caption);
      
      console.log(`✅ ${platform} video completed in ${duration}s`);
      console.log(`📁 Video: ${outputPath}`);
      console.log(`📝 Caption: ${captionPath}`);
      
      // Cleanup temp file
      if (fs.existsSync(tempPropsFile)) {
        fs.unlinkSync(tempPropsFile);
      }
      
      return {
        platform,
        videoPath: outputPath,
        captionPath,
        caption,
        duration: parseFloat(duration),
        status: 'success'
      };
      
    } catch (error) {
      // Cleanup temp file on error too
      if (fs.existsSync(tempPropsFile)) {
        fs.unlinkSync(tempPropsFile);
      }
      
      console.error(`❌ Failed to generate ${platform} video:`, error.message);
      return {
        platform,
        status: 'failed',
        error: error.message
      };
    }
  }

  async generateAllPlatforms(contentId, content, platforms = null) {
    const targetPlatforms = platforms || Object.keys(PLATFORMS);
    
    console.log(`\\n🚀 Generating videos for: ${targetPlatforms.join(', ')}`);
    console.log(`📝 Content: "${content.tip}"`);
    
    const results = [];
    const startTime = Date.now();
    
    for (const platform of targetPlatforms) {
      const result = await this.generatePlatformVideo(contentId, content, platform);
      results.push(result);
    }
    
    const totalDuration = ((Date.now() - startTime) / 1000).toFixed(1);
    const successful = results.filter(r => r.status === 'success').length;
    
    console.log(`\\n📊 SUMMARY`);
    console.log(`⏱️  Total time: ${totalDuration}s`);
    console.log(`✅ Success: ${successful}/${results.length} platforms`);
    
    // Create content record
    const contentRecord = {
      contentId,
      createdAt: new Date().toISOString(),
      status: 'ready',
      content,
      platforms: {}
    };
    
    results.forEach(result => {
      if (result.status === 'success') {
        contentRecord.platforms[result.platform] = {
          videoFile: result.videoPath,
          captionFile: result.captionPath,
          caption: result.caption,
          status: 'ready',
          generatedAt: new Date().toISOString(),
          renderTime: result.duration
        };
      }
    });
    
    // Save content record
    const recordPath = `content/ready/${contentId}.json`;
    if (!fs.existsSync('content/ready')) {
      fs.mkdirSync('content/ready', { recursive: true });
    }
    fs.writeFileSync(recordPath, JSON.stringify(contentRecord, null, 2));
    
    console.log(`📄 Content record saved: ${recordPath}`);
    
    return results;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🚀 Multi-Platform Video Generator

Usage:
  node scripts/multi-platform-generator.mjs <contentId> [options]

Examples:
  # Generate from content file
  node scripts/multi-platform-generator.mjs BILAN_001 --from-file content/drafts/example.json
  
  # Generate with inline content
  node scripts/multi-platform-generator.mjs BILAN_002 \\
    --tip "Los electrolitos mejoran tu rendimiento" \\
    --reason "Mantienen el equilibrio de líquidos en tu cuerpo" \\
    --cta "Prueba bilan hoy"
  
  # Generate for specific platforms only
  node scripts/multi-platform-generator.mjs BILAN_003 --platforms tiktok,instagram --from-file content/drafts/example.json

Options:
  --from-file <path>     Load content from JSON file
  --platforms <list>     Comma-separated platforms (tiktok,instagram,whatsapp,twitter)
  --tip <text>          Tip text for inline content
  --reason <text>       Reason text for inline content  
  --cta <text>          CTA text for inline content
    `);
    process.exit(1);
  }
  
  const contentId = args[0];
  const generator = new MultiPlatformGenerator();
  
  let content = {};
  let platforms = null;
  
  // Parse arguments
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--from-file' && args[i + 1]) {
      const filePath = args[i + 1];
      if (fs.existsSync(filePath)) {
        content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        i++; // skip next arg
      } else {
        console.error(`❌ File not found: ${filePath}`);
        process.exit(1);
      }
    }
    else if (arg === '--platforms' && args[i + 1]) {
      platforms = args[i + 1].split(',').map(p => p.trim());
      i++; // skip next arg
    }
    else if (arg === '--tip' && args[i + 1]) {
      content.tip = args[i + 1];
      i++; // skip next arg
    }
    else if (arg === '--reason' && args[i + 1]) {
      content.reason = args[i + 1];
      i++; // skip next arg
    }
    else if (arg === '--cta' && args[i + 1]) {
      content.cta = args[i + 1];
      i++; // skip next arg
    }
  }
  
  // Validate content
  if (!content.tip && !content.title) {
    console.error(`❌ Content must have 'tip' or 'title' field`);
    process.exit(1);
  }
  
  // Default values for missing fields
  content.tip = content.tip || content.title || "Dato importante";
  content.reason = content.reason || content.subtitle || "Información relevante para tu salud";
  content.cta = content.cta || content.conclusion || "Aprende más con bilan";
  
  // Validate platforms
  if (platforms) {
    const validPlatforms = Object.keys(PLATFORMS);
    const invalidPlatforms = platforms.filter(p => !validPlatforms.includes(p));
    if (invalidPlatforms.length > 0) {
      console.error(`❌ Invalid platforms: ${invalidPlatforms.join(', ')}`);
      console.error(`✅ Valid platforms: ${validPlatforms.join(', ')}`);
      process.exit(1);
    }
  }
  
  // Generate videos
  try {
    await generator.generateAllPlatforms(contentId, content, platforms);
    console.log(`\\n🎉 Multi-platform generation complete for ${contentId}!`);
  } catch (error) {
    console.error(`❌ Generation failed:`, error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}
