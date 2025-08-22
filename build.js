#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔨 Building Figma Plugin...');

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
  }

  // Check if we have TypeScript files
  const hasTypeScript = fs.existsSync('code.ts') && fs.existsSync('tsconfig.json');
  
  if (hasTypeScript) {
    // Compile TypeScript
    console.log('📦 Compiling TypeScript...');
    execSync('npx tsc', { stdio: 'inherit' });

    // Copy compiled JS to root as code.js (required by Figma)
    console.log('📋 Copying compiled code to code.js...');
    const compiledCode = fs.readFileSync('dist/code.js', 'utf8');
    fs.writeFileSync('code.js', compiledCode);
  } else {
    console.log('📋 Using existing code.js file...');
  }

  // Skip asset generation - using custom user assets
  console.log('🎨 Using custom user assets (no auto-generation)...');

  console.log('✅ Build completed successfully!');
  console.log('📁 Files ready:');
  console.log('   - code.js (main plugin file)');
  if (hasTypeScript) {
    console.log('   - dist/ (TypeScript compilation output)');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}