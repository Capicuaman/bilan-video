#!/usr/bin/env node
/**
 * Agent Launcher - Load agent personas and display their guidelines
 * Usage: node agents/agent-launcher.mjs [agent-role]
 * Available roles: director, producer, writer, technical, qa
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AGENTS = {
  director: {
    name: '🎬 Director Agent',
    file: 'director.md',
    description: 'Creative Lead - Set vision and approve content'
  },
  producer: {
    name: '📊 Producer Agent',
    file: 'producer.md',
    description: 'Operations Manager - Orchestrate the pipeline'
  },
  writer: {
    name: '✍️ Content Writer Agent',
    file: 'writer.md',
    description: 'Copywriter - Craft compelling Spanish content'
  },
  technical: {
    name: '🔧 Technical Specialist Agent',
    file: 'technical.md',
    description: 'Render Engineer - Execute and troubleshoot renders'
  },
  qa: {
    name: '✅ Quality Control Agent',
    file: 'qa.md',
    description: 'QA Specialist - Ensure quality standards'
  }
};

function displayHelp() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║          🎬 BILAN AGENT TEAM LAUNCHER                       ║
╚══════════════════════════════════════════════════════════════╝

Usage: node agents/agent-launcher.mjs [agent-role]

Available Agents:
`);

  Object.entries(AGENTS).forEach(([role, info]) => {
    console.log(`  ${info.name}`);
    console.log(`    Role: ${role}`);
    console.log(`    Description: ${info.description}`);
    console.log('');
  });

  console.log(`Examples:
  node agents/agent-launcher.mjs director
  node agents/agent-launcher.mjs producer
  node agents/agent-launcher.mjs writer

To view all agents: node agents/agent-launcher.mjs all
`);
}

function loadAgent(role) {
  const agent = AGENTS[role];
  if (!agent) {
    console.error(`❌ Unknown agent role: ${role}`);
    console.log('Available roles:', Object.keys(AGENTS).join(', '));
    process.exit(1);
  }

  const agentPath = path.join(__dirname, agent.file);

  try {
    const content = fs.readFileSync(agentPath, 'utf-8');
    console.log('\n' + '='.repeat(80));
    console.log(`🎯 Loading: ${agent.name}`);
    console.log('='.repeat(80) + '\n');
    console.log(content);
  } catch (error) {
    console.error(`❌ Error loading agent file: ${error.message}`);
    process.exit(1);
  }
}

function loadAllAgents() {
  console.log('\n' + '='.repeat(80));
  console.log('📚 LOADING ALL AGENT PERSONAS');
  console.log('='.repeat(80) + '\n');

  Object.keys(AGENTS).forEach(role => {
    loadAgent(role);
    console.log('\n' + '─'.repeat(80) + '\n');
  });
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  displayHelp();
  process.exit(0);
}

const role = args[0].toLowerCase();

if (role === 'all') {
  loadAllAgents();
} else if (role === 'help' || role === '-h' || role === '--help') {
  displayHelp();
} else {
  loadAgent(role);
}
