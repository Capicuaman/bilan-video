#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/**
 * Content Manager
 * Organize and track content across all platforms
 */

class ContentManager {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    const dirs = [
      'content',
      'content/drafts', 
      'content/ready',
      'content/scheduled',
      'content/posted',
      'content/posted/2026-02'
    ];
    
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  generateId() {
    const now = new Date();
    const datePart = now.toISOString().split('T')[0].replace(/-/g, '');
    const timePart = now.toTimeString().split(':').slice(0, 2).join('');
    return `BILAN_${datePart}_${timePart}`;
  }

  async createContent(sourceData) {
    const contentId = this.generateId();
    const content = {
      contentId,
      createdAt: new Date().toISOString(),
      status: 'draft',
      topic: sourceData.topic || 'general',
      category: sourceData.category || 'educational',
      ...sourceData
    };

    const draftPath = `content/drafts/${contentId}.json`;
    fs.writeFileSync(draftPath, JSON.stringify(content, null, 2));
    
    console.log(`📝 Created content: ${contentId}`);
    console.log(`📁 Draft saved: ${draftPath}`);
    
    return content;
  }

  moveContent(contentId, fromStatus, toStatus) {
    const fromPath = `content/${fromStatus}/${contentId}.json`;
    const toPath = `content/${toStatus}/${contentId}.json`;
    
    if (!fs.existsSync(fromPath)) {
      throw new Error(`Content not found: ${fromPath}`);
    }
    
    const content = JSON.parse(fs.readFileSync(fromPath, 'utf8'));
    content.status = toStatus;
    content.updatedAt = new Date().toISOString();
    
    fs.writeFileSync(toPath, JSON.stringify(content, null, 2));
    fs.unlinkSync(fromPath);
    
    console.log(`📦 Moved ${contentId}: ${fromStatus} → ${toStatus}`);
  }

  updatePlatformStatus(contentId, platform, updates) {
    const statusDirs = ['ready', 'scheduled', 'posted'];
    let contentPath = null;
    
    // Find the content file
    for (const status of statusDirs) {
      const path = `content/${status}/${contentId}.json`;
      if (fs.existsSync(path)) {
        contentPath = path;
        break;
      }
    }
    
    if (!contentPath) {
      throw new Error(`Content not found: ${contentId}`);
    }
    
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    
    if (!content.platforms) {
      content.platforms = {};
    }
    
    if (!content.platforms[platform]) {
      content.platforms[platform] = {};
    }
    
    Object.assign(content.platforms[platform], updates);
    content.updatedAt = new Date().toISOString();
    
    fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
    
    console.log(`🔄 Updated ${contentId} - ${platform}:`, updates);
  }

  getContentByStatus(status) {
    const dir = `content/${status}`;
    if (!fs.existsSync(dir)) {
      return [];
    }
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    return files.map(file => {
      const content = JSON.parse(fs.readFileSync(`${dir}/${file}`, 'utf8'));
      return content;
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getContentById(contentId) {
    const statusDirs = ['drafts', 'ready', 'scheduled', 'posted', 'posted/2026-02'];
    
    for (const status of statusDirs) {
      const path = `content/${status}/${contentId}.json`;
      if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
      }
    }
    
    return null;
  }

  getPipelineStatus() {
    const stats = {
      drafts: this.getContentByStatus('drafts').length,
      ready: this.getContentByStatus('ready').length,  
      scheduled: this.getContentByStatus('scheduled').length,
      posted: this.getContentByStatus('posted').length,
    };
    
    const ready = this.getContentByStatus('ready');
    const scheduled = this.getContentByStatus('scheduled');
    
    return {
      stats,
      ready: ready.slice(0, 5), // Show 5 most recent
      scheduled: scheduled.slice(0, 5),
      totalContent: Object.values(stats).reduce((a, b) => a + b, 0)
    };
  }

  archivePostedContent() {
    const postedDir = 'content/posted';
    const now = new Date();
    const monthDir = `content/posted/${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    if (!fs.existsSync(monthDir)) {
      fs.mkdirSync(monthDir, { recursive: true });
    }
    
    const files = fs.readdirSync(postedDir).filter(f => f.endsWith('.json'));
    let archived = 0;
    
    files.forEach(file => {
      const filePath = `${postedDir}/${file}`;
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const postedDate = new Date(content.updatedAt || content.createdAt);
      
      // Archive if older than 7 days
      if (now - postedDate > 7 * 24 * 60 * 60 * 1000) {
        fs.renameSync(filePath, `${monthDir}/${file}`);
        archived++;
      }
    });
    
    console.log(`📦 Archived ${archived} files to ${monthDir}`);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const manager = new ContentManager();
  
  if (!command) {
    console.log(`
📊 Content Manager

Commands:
  status                    Show pipeline status
  create                    Create new content from prompts
  move <id> <from> <to>     Move content between statuses
  update <id> <platform>    Update platform status
  list <status>             List content by status
  get <id>                  Get specific content
  archive                   Archive old posted content

Examples:
  node scripts/content-manager.mjs status
  node scripts/content-manager.mjs create
  node scripts/content-manager.mjs move BILAN_001 ready scheduled
  node scripts/content-manager.mjs list ready
    `);
    return;
  }
  
  try {
    switch (command) {
      case 'status':
        const status = manager.getPipelineStatus();
        console.log('\\n📊 CONTENT PIPELINE STATUS');
        console.log('════════════════════════════');
        console.log(`📝 Drafts: ${status.stats.drafts}`);
        console.log(`✅ Ready: ${status.stats.ready}`);
        console.log(`⏰ Scheduled: ${status.stats.scheduled}`);
        console.log(`📤 Posted: ${status.stats.posted}`);
        console.log(`📊 Total: ${status.totalContent}`);
        
        if (status.ready.length > 0) {
          console.log('\\n🎬 READY FOR POSTING:');
          status.ready.forEach(content => {
            const platforms = Object.keys(content.platforms || {}).join(', ') || 'none';
            console.log(`  • ${content.contentId}: "${content.tip || content.title}" [${platforms}]`);
          });
        }
        
        if (status.scheduled.length > 0) {
          console.log('\\n⏰ SCHEDULED:');
          status.scheduled.forEach(content => {
            console.log(`  • ${content.contentId}: "${content.tip || content.title}"`);
          });
        }
        break;
        
      case 'create':
        console.log('📝 Creating new content...');
        console.log('Enter content details:');
        
        // Simple prompts (in real implementation, use readline)
        const newContent = await manager.createContent({
          tip: args[1] || 'Los electrolitos mejoran tu rendimiento',
          reason: args[2] || 'Mantienen el equilibrio de líquidos y función muscular',
          cta: args[3] || 'Hidrátate con ciencia',
          topic: args[4] || 'electrolitos',
          category: args[5] || 'educational'
        });
        break;
        
      case 'move':
        if (args.length < 4) {
          console.error('❌ Usage: move <id> <from> <to>');
          return;
        }
        manager.moveContent(args[1], args[2], args[3]);
        break;
        
      case 'update':
        if (args.length < 3) {
          console.error('❌ Usage: update <id> <platform> [status] [url]');
          return;
        }
        const updates = {};
        if (args[3]) updates.status = args[3];
        if (args[4]) updates.postUrl = args[4];
        if (args[3] === 'posted') updates.postedAt = new Date().toISOString();
        
        manager.updatePlatformStatus(args[1], args[2], updates);
        break;
        
      case 'list':
        const listStatus = args[1] || 'ready';
        const contents = manager.getContentByStatus(listStatus);
        console.log(`\\n📋 ${listStatus.toUpperCase()} CONTENT (${contents.length})`);
        console.log('══════════════════════════════');
        contents.forEach(content => {
          const platforms = Object.keys(content.platforms || {}).length;
          console.log(`🎬 ${content.contentId}`);
          console.log(`   "${content.tip || content.title}"`);
          console.log(`   📅 ${new Date(content.createdAt).toLocaleDateString()}`);
          console.log(`   📱 ${platforms} platforms`);
          console.log('');
        });
        break;
        
      case 'get':
        if (!args[1]) {
          console.error('❌ Usage: get <id>');
          return;
        }
        const foundContent = manager.getContentById(args[1]);
        if (!foundContent) {
          console.log(`❌ Content not found: ${args[1]}`);
          return;
        }
        console.log(JSON.stringify(foundContent, null, 2));
        break;
        
      case 'archive':
        manager.archivePostedContent();
        break;
        
      default:
        console.error(`❌ Unknown command: ${command}`);
        console.log('Run without arguments to see available commands.');
    }
    
  } catch (error) {
    console.error(`❌ Command failed:`, error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}