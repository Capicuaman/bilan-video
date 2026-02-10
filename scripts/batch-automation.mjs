#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Batch Automation for Multi-Platform Video Generation
 * Process multiple JSON files and generate videos for all platforms
 */

class BatchAutomation {
  constructor() {
    this.results = [];
  }

  async processDirectory(inputDir, outputReport = true) {
    if (!fs.existsSync(inputDir)) {
      throw new Error(`Input directory not found: ${inputDir}`);
    }

    const jsonFiles = fs.readdirSync(inputDir)
      .filter(file => file.endsWith('.json'))
      .sort();

    if (jsonFiles.length === 0) {
      console.log(`⚠️  No JSON files found in ${inputDir}`);
      return [];
    }

    console.log(`🚀 Processing ${jsonFiles.length} content files from ${inputDir}`);
    console.log(`📁 Files: ${jsonFiles.join(', ')}`);

    const startTime = Date.now();

    for (const file of jsonFiles) {
      const filePath = path.join(inputDir, file);
      const contentId = path.basename(file, '.json');
      
      console.log(`\\n🎬 Processing: ${contentId}`);
      
      try {
        const command = [
          'node scripts/multi-platform-generator.mjs',
          contentId,
          `--from-file ${filePath}`
        ].join(' ');

        const result = execSync(command, { 
          stdio: 'pipe', 
          encoding: 'utf8',
          cwd: process.cwd()
        });

        this.results.push({
          contentId,
          file,
          status: 'success',
          output: result
        });

        console.log(`✅ ${contentId} completed successfully`);

      } catch (error) {
        console.error(`❌ ${contentId} failed:`, error.message);
        
        this.results.push({
          contentId, 
          file,
          status: 'failed',
          error: error.message
        });
      }
    }

    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    const successful = this.results.filter(r => r.status === 'success').length;

    console.log(`\\n📊 BATCH SUMMARY`);
    console.log(`⏱️  Total time: ${totalTime}s`);
    console.log(`✅ Success: ${successful}/${jsonFiles.length} files`);
    console.log(`❌ Failed: ${jsonFiles.length - successful}/${jsonFiles.length} files`);

    if (outputReport) {
      this.generateReport();
    }

    return this.results;
  }

  generateReport() {
    const reportPath = `batch-report-${new Date().toISOString().split('T')[0]}.json`;
    const report = {
      timestamp: new Date().toISOString(),
      total: this.results.length,
      successful: this.results.filter(r => r.status === 'success').length,
      failed: this.results.filter(r => r.status === 'failed').length,
      results: this.results,
      platformSummary: this.getPlatformSummary()
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Batch report saved: ${reportPath}`);
  }

  getPlatformSummary() {
    const summary = {
      tiktok: 0,
      whatsapp: 0,
      instagram: 0, 
      twitter: 0
    };

    this.results.forEach(result => {
      if (result.status === 'success') {
        // Count generated platform videos
        Object.keys(summary).forEach(platform => {
          const videoPath = `out/${platform}/${result.contentId}_${platform}.mp4`;
          if (fs.existsSync(videoPath)) {
            summary[platform]++;
          }
        });
      }
    });

    return summary;
  }

  async processCSV(csvPath) {
    // TODO: Implement CSV processing
    // Convert CSV rows to JSON format and process
    console.log(`📊 CSV processing not implemented yet: ${csvPath}`);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🤖 Batch Automation for Multi-Platform Video Generation

Usage:
  node scripts/batch-automation.mjs <input-directory>
  node scripts/batch-automation.mjs content/batch/
  node scripts/batch-automation.mjs content/examples/

Options:
  --no-report     Skip generating batch report
  --csv <file>    Process CSV file instead of directory (coming soon)

Examples:
  # Process all JSON files in a directory  
  node scripts/batch-automation.mjs content/examples/

  # Process without generating report
  node scripts/batch-automation.mjs content/batch/ --no-report

Expected JSON format:
  {
    "contentId": "BILAN_001",
    "tip": "Your tip text", 
    "reason": "Explanation text",
    "cta": "Call to action",
    "title": "Title for educational format",
    "keyPoint1": "First key point",
    "keyPoint2": "Second key point", 
    "keyPoint3": "Third key point",
    "conclusion": "Conclusion text"
  }
    `);
    return;
  }

  const inputDir = args[0];
  const outputReport = !args.includes('--no-report');
  
  try {
    const automation = new BatchAutomation();
    await automation.processDirectory(inputDir, outputReport);
    
    console.log(`\\n🎉 Batch processing complete!`);
    console.log(`📁 Check out/ directory for generated videos`);
    console.log(`📋 Check content/ready/ for content records`);
    
  } catch (error) {
    console.error(`❌ Batch processing failed:`, error.message);
    process.exit(1);
  }
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}