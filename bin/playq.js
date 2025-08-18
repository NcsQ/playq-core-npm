#!/usr/bin/env node
// CLI wrapper that resolves the runner relative to this package, not the cwd
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function run() {
  const args = process.argv.slice(2);
  const runnerJs = path.resolve(__dirname, '..', 'dist', 'exec', 'runner.js');
  if (fs.existsSync(runnerJs)) {
    const child = spawn(process.execPath, [runnerJs, ...args], {
      stdio: 'inherit',
      env: { ...process.env },
    });
    child.on('close', (code) => process.exit(code || 0));
  } else {
    // Fallback to ts-node if dist isn't present (e.g., local dev)
    const runnerTs = path.resolve(__dirname, '..', 'src', 'exec', 'runner.ts');
    const cmd = `npx ts-node -r tsconfig-paths/register "${runnerTs}" ${args.join(' ')}`.trim();
    const child = spawn(cmd, { stdio: 'inherit', shell: true, env: { ...process.env } });
    child.on('close', (code) => process.exit(code || 0));
  }
}

run();
