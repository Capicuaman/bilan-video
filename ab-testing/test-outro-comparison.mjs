#!/usr/bin/env node

// Quick test render to compare original vs perfected outro
import { execSync } from 'child_process';

const testOutros = [
  {
    name: 'original',
    component: 'BrandOutro',
    output: 'outro-original.mp4',
    cta: '¡Síguenos para más tips!'
  },
  {
    name: 'perfected', 
    component: 'BrandOutroPerfected',
    output: 'outro-perfected.mp4',
    cta: '¡Guarda este video!'
  }
];

console.log('🎬 Testing Outro Versions...\n');

testOutros.forEach(test => {
  console.log(`Rendering ${test.name} outro...`);
  
  try {
    execSync(`npx remotion render src/index.ts ${test.component} out/test/${test.output} --props='{"cta": "${test.cta}"}' --overwrite`, 
      { stdio: 'pipe' }
    );
    console.log(`✅ ${test.name}: out/test/${test.output}`);
  } catch (error) {
    console.log(`❌ ${test.name}: Failed to render`);
  }
});

console.log('\n🎯 Compare the outputs to choose the better version!');
console.log('📁 Check: out/test/ directory');