#!/usr/bin/env node
// Thin CLI wrapper that runs the compiled runner
const { spawn } = require('child_process');

function run() {
  const args = process.argv.slice(2);
  const nodeCmd = `node dist/exec/runner.js ${args.join(' ')}`.trim();
  const child = spawn(nodeCmd, { stdio: 'inherit', shell: true, env: { ...process.env } });
  child.on('close', (code) => process.exit(code || 0));
}

run();
