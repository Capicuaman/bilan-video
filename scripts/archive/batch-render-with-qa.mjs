#!/usr/bin/env node
/**
 * Batch Render with Quality Control
 * Producer + Technical + QA Agent Workflow
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PLATFORMS = ['tiktok', 'instagram', 'whatsapp', 'twitter'];
const CONTENT_DIR = 'content/scheduled';
const QA_LOG = 'qa-report.json';

// QA Specifications
const PLATFORM_SPECS = {
  tiktok: {
    format: '9:16',
    resolution: '1080x1920',
    maxSize: 50 * 1024 * 1024, // 50MB
    duration: 15
  },
  instagram: {
    format: '1:1',
    resolution: '1080x1080',
    maxSize: 30 * 1024 * 1024, // 30MB
    duration: 15
  },
  whatsapp: {
    format: '1:1',
    resolution: '1080x1080',
    maxSize: 16 * 1024 * 1024, // 16MB
    duration: 12
  },
  twitter: {
    format: '16:9',
    resolution: '1920x1080',
    maxSize: 512 * 1024 * 1024, // 512MB
    duration: 15
  }
};

class BatchRenderer {
  constructor() {
    this.results = [];
    this.qaReport = {
      timestamp: new Date().toISOString(),
      totalContent: 0,
      totalVideos: 0,
      passed: 0,
      failed: 0,
      details: []
    };
  }

  log(message, type = 'INFO') {
    const timestamp = new Date().toLocaleTimeString('es-MX');
    const icon = {
      'INFO': '📝',
      'SUCCESS': '✅',
      'ERROR': '❌',
      'WARNING': '⚠️',
      'QA': '🔍'
    }[type] || '•';
    console.log(`${icon} [${timestamp}] ${message}`);
  }

  async getContentFiles() {
    const files = fs.readdirSync(CONTENT_DIR)
      .filter(f => f.endsWith('.json'))
      .sort();
    this.log(`Found ${files.length} content files to render`);
    return files;
  }

  async renderContent(contentId, filePath) {
    this.log(`Starting render for ${contentId}`, 'INFO');

    const startTime = Date.now();
    const platformResults = {
      contentId,
      platforms: {},
      startTime: new Date().toISOString(),
      status: 'in_progress'
    };

    try {
      // Render all platforms
      const command = `node scripts/multi-platform-generator.mjs ${contentId} --from-file ${filePath} --platforms ${PLATFORMS.join(',')}`;

      this.log(`Executing: ${command}`);
      execSync(command, { stdio: 'inherit' });

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      this.log(`Render completed in ${duration}s`, 'SUCCESS');

      platformResults.status = 'completed';
      platformResults.renderTime = parseFloat(duration);
      platformResults.endTime = new Date().toISOString();

      return platformResults;

    } catch (error) {
      this.log(`Render failed: ${error.message}`, 'ERROR');
      platformResults.status = 'failed';
      platformResults.error = error.message;
      return platformResults;
    }
  }

  async performQA(contentId) {
    this.log(`QA: Inspecting ${contentId}`, 'QA');

    const qaResults = {
      contentId,
      timestamp: new Date().toISOString(),
      platforms: {}
    };

    for (const platform of PLATFORMS) {
      const videoPath = `out/${platform}/${contentId}_${platform}.mp4`;

      if (!fs.existsSync(videoPath)) {
        qaResults.platforms[platform] = {
          status: 'missing',
          issues: ['Video file not found']
        };
        continue;
      }

      const checks = {
        fileExists: true,
        hasAudio: false,
        correctSize: false,
        audioLevel: null,
        fileSize: 0,
        issues: []
      };

      try {
        // Check file size
        const stats = fs.statSync(videoPath);
        checks.fileSize = stats.size;
        const maxSize = PLATFORM_SPECS[platform].maxSize;
        checks.correctSize = stats.size <= maxSize;

        if (!checks.correctSize) {
          checks.issues.push(`File too large: ${(stats.size / 1024 / 1024).toFixed(1)}MB > ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
        }

        // Check audio stream
        try {
          const audioCheck = execSync(
            `ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`,
            { encoding: 'utf-8' }
          ).trim();

          checks.hasAudio = audioCheck === 'aac';

          if (!checks.hasAudio) {
            checks.issues.push('Missing or invalid audio codec');
          }

          // Check audio volume
          const volumeOutput = execSync(
            `ffmpeg -i "${videoPath}" -af "volumedetect" -f null /dev/null 2>&1 | grep "max_volume"`,
            { encoding: 'utf-8' }
          );

          const volumeMatch = volumeOutput.match(/max_volume: ([-\d.]+) dB/);
          if (volumeMatch) {
            checks.audioLevel = parseFloat(volumeMatch[1]);

            // Audio should be between -50 dB and 0 dB to be audible
            if (checks.audioLevel < -50) {
              checks.issues.push(`Audio too quiet: ${checks.audioLevel} dB`);
            }
          }
        } catch (error) {
          checks.hasAudio = false;
          checks.issues.push('Audio check failed');
        }

        // Determine pass/fail
        checks.status = checks.issues.length === 0 ? 'passed' : 'failed';

        if (checks.status === 'passed') {
          this.log(`${platform}: PASSED ✓`, 'SUCCESS');
        } else {
          this.log(`${platform}: FAILED - ${checks.issues.join(', ')}`, 'WARNING');
        }

      } catch (error) {
        checks.status = 'error';
        checks.issues.push(error.message);
        this.log(`${platform}: ERROR - ${error.message}`, 'ERROR');
      }

      qaResults.platforms[platform] = checks;
    }

    return qaResults;
  }

  async processBatch() {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║        🎬 BATCH RENDER WITH QUALITY CONTROL                   ║
║        Producer + Technical + QA Agent Workflow               ║
╚═══════════════════════════════════════════════════════════════╝
`);

    const contentFiles = await this.getContentFiles();
    this.qaReport.totalContent = contentFiles.length;
    this.qaReport.totalVideos = contentFiles.length * PLATFORMS.length;

    let processedCount = 0;

    for (const file of contentFiles) {
      processedCount++;
      const contentId = path.basename(file, '.json');
      const filePath = path.join(CONTENT_DIR, file);

      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      this.log(`Processing ${processedCount}/${contentFiles.length}: ${contentId}`, 'INFO');
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

      // [PRODUCER] → [TECHNICAL SPECIALIST]: Render
      const renderResult = await this.renderContent(contentId, filePath);

      // [TECHNICAL SPECIALIST] → [QA]: Quality check
      const qaResult = await this.performQA(contentId);

      // Combine results
      const contentReport = {
        ...renderResult,
        qa: qaResult
      };

      // Count passed/failed
      for (const platform of PLATFORMS) {
        if (qaResult.platforms[platform]?.status === 'passed') {
          this.qaReport.passed++;
        } else {
          this.qaReport.failed++;
        }
      }

      this.qaReport.details.push(contentReport);
      this.results.push(contentReport);
    }

    // Save QA report
    fs.writeFileSync(QA_LOG, JSON.stringify(this.qaReport, null, 2));

    this.printSummary();
  }

  printSummary() {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                    📊 FINAL REPORT                            ║
╚═══════════════════════════════════════════════════════════════╝

📦 Content Processed: ${this.qaReport.totalContent} pieces
🎥 Videos Generated: ${this.qaReport.totalVideos} videos
✅ QA Passed: ${this.qaReport.passed} videos
❌ QA Failed: ${this.qaReport.failed} videos
📈 Success Rate: ${((this.qaReport.passed / this.qaReport.totalVideos) * 100).toFixed(1)}%

📄 Detailed QA Report: ${QA_LOG}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎬 Agent Team Performance:
  👔 Producer: Orchestrated ${this.qaReport.totalContent} content pieces
  🔧 Technical Specialist: Rendered ${this.qaReport.totalVideos} videos
  ✅ QA Agent: Verified ${this.qaReport.totalVideos} videos

${this.qaReport.failed > 0 ? '⚠️  Some videos failed QA. Check qa-report.json for details.' : '🎉 All videos passed quality control!'}
`);
  }
}

// Run batch renderer
const renderer = new BatchRenderer();
renderer.processBatch().catch(error => {
  console.error('❌ Batch rendering failed:', error);
  process.exit(1);
});
