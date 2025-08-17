#!/usr/bin/env node

// Thin CLI to execute the util script from the installed package location.
// Tries compiled JS first (dist), falls back to ts-node for local dev.

const path = require('path');
const fs = require('fs');

function resolveFromPackage(relative) {
  return path.resolve(__dirname, '..', relative);
}

(async () => {
  const distEntry = resolveFromPackage('dist/scripts/util.js');
  const tsEntry = resolveFromPackage('src/scripts/util.ts');

  if (fs.existsSync(distEntry)) {
    // Register minimal path aliases for runtime (compiled JS)
    try {
      const tsconfigPaths = require('tsconfig-paths');
      tsconfigPaths.register({
        baseUrl: resolveFromPackage('.'),
        paths: {
          '@playq': ['dist/global'],
          '@src/*': ['dist/*'],
          '@config/runner': ['dist/helper/util/runnerType']
        }
      });
    } catch (e) {
      // If tsconfig-paths is unavailable, proceed; relative imports will still work.
    }
    const mod = require(distEntry);
    if (mod && typeof mod.encryptUserInput === 'function') {
      await Promise.resolve(mod.encryptUserInput());
    }
    return;
  }

  // Fallback to ts-node when running from source checkout
  try {
    require('ts-node/register');
    require('tsconfig-paths/register');
  } catch (e) {
    console.error('[playq-util] Unable to load ts-node. Ensure dev deps are installed or build the package.');
    console.error(e && e.message ? e.message : e);
    process.exit(1);
  }

  const tsMod = require(tsEntry);
  if (tsMod && typeof tsMod.encryptUserInput === 'function') {
    await Promise.resolve(tsMod.encryptUserInput());
  }
})();
