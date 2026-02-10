#!/usr/bin/env node
/**
 * Team Status Dashboard - View current pipeline status for all agents
 * Usage: node agents/team-status.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

function getContentCounts() {
  const contentDir = path.join(projectRoot, 'content');
  const counts = {
    drafts: 0,
    ready: 0,
    scheduled: 0,
    posted: 0
  };

  ['drafts', 'ready', 'scheduled', 'posted'].forEach(stage => {
    const dir = path.join(contentDir, stage);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
      counts[stage] = files.length;
    }
  });

  return counts;
}

function getRenderedVideos() {
  const outDir = path.join(projectRoot, 'out');
  const platforms = ['tiktok', 'instagram', 'twitter', 'whatsapp'];
  const counts = {};

  platforms.forEach(platform => {
    const dir = path.join(outDir, platform);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));
      counts[platform] = files.length;
    } else {
      counts[platform] = 0;
    }
  });

  return counts;
}

function getRecentActivity() {
  const outDir = path.join(projectRoot, 'out');
  try {
    // Get 5 most recently modified videos
    const command = `find ${outDir} -name "*.mp4" -type f -printf "%T@ %p\\n" | sort -rn | head -5 | cut -d' ' -f2-`;
    const result = execSync(command, { encoding: 'utf-8' });
    return result.trim().split('\n').filter(Boolean).map(p => path.basename(p));
  } catch (error) {
    return [];
  }
}

function displayStatus() {
  const contentCounts = getContentCounts();
  const videoCounts = getRenderedVideos();
  const recentVideos = getRecentActivity();
  const now = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║          🎬 BILAN AGENT TEAM STATUS DASHBOARD               ║
╚══════════════════════════════════════════════════════════════╝

📅 ${now}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 CONTENT PIPELINE STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📁 Drafts:      ${contentCounts.drafts.toString().padStart(3)} pieces (awaiting Director approval)
  ✅ Ready:        ${contentCounts.ready.toString().padStart(3)} pieces (approved for render)
  📅 Scheduled:    ${contentCounts.scheduled.toString().padStart(3)} pieces (rendered, ready to post)
  📤 Posted:       ${contentCounts.posted.toString().padStart(3)} pieces (published & archived)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎥 RENDERED VIDEOS BY PLATFORM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📱 TikTok:       ${videoCounts.tiktok.toString().padStart(3)} videos (9:16 vertical)
  📸 Instagram:    ${videoCounts.instagram.toString().padStart(3)} videos (1:1 square)
  🐦 Twitter:      ${videoCounts.twitter.toString().padStart(3)} videos (16:9 landscape)
  💬 WhatsApp:     ${videoCounts.whatsapp.toString().padStart(3)} videos (1:1 square)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 RECENT ACTIVITY (Last 5 Videos)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  if (recentVideos.length > 0) {
    recentVideos.forEach((video, i) => {
      console.log(`  ${i + 1}. ${video}`);
    });
  } else {
    console.log('  No recent videos found');
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 AGENT RESPONSIBILITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  🎬 Director:        Review drafts (${contentCounts.drafts} pending)
  ✍️  Content Writer:  Create new content for pipeline
  📊 Producer:         Move ${contentCounts.ready} ready items to scheduled
  🔧 Technical:        Render ${contentCounts.ready} approved pieces
  ✅ QA:               Review ${contentCounts.scheduled} scheduled videos

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 QUICK ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  View pipeline details:
    node scripts/content-manager.mjs status

  Load agent persona:
    node agents/agent-launcher.mjs [director|producer|writer|technical|qa]

  Create new content:
    node scripts/content-manager.mjs create "[tip]" "[reason]" "[cta]" "[topic]" "[category]"

  Render video:
    node scripts/multi-platform-generator.mjs [ID] --from-file content/drafts/[file].json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

// Main execution
displayStatus();
