import { loadEnv } from '../helper/bundle/env';
import path from 'path';
import { rmSync } from 'fs';

export function setupEnvironment() {
  loadEnv();

  // If running in Cucumber mode, we need to handle pre-processing differently
  if (process.env.PLAYQ_RUNNER === 'cucumber') {
    // CUCUMBER RUNNER
    // Remove allure-report directory in the project folder for cucumber runner
    const proj = process.env['PLAYQ_PROJECT_ROOT'];
    if (proj) {
      try {
        rmSync(path.resolve(proj, 'test-results'), { recursive: true, force: true });
      } catch (err) {
        console.warn('Warning: Failed to remove test-results', err);
      }
    }
    require(path.resolve(process.env['PLAYQ_CORE_ROOT'], 'exec/preProcessEntry.ts'));
    } else {
    // PLAYWRIGHT RUNNER
    // Remove allure-report and allure-results directories
    const proj = process.env['PLAYQ_PROJECT_ROOT'];
    if (proj) {
      try {
        rmSync(path.resolve(proj, 'allure-report'), { recursive: true, force: true });
      } catch (err) {
        console.warn('Warning: Failed to remove ./allure-report', err);
      }
      try {
        rmSync(path.resolve(proj, 'allure-results'), { recursive: true, force: true });
      } catch (err) {
        console.warn('Warning: Failed to remove ./allure-results', err);
      }
    }
  }
    // General directory cleanup
    const proj2 = process.env['PLAYQ_PROJECT_ROOT'];
    if (proj2) {
      try {
        rmSync(path.resolve(proj2, '_Temp/sessions'), { recursive: true, force: true });
      } catch (err) {
        console.warn('Warning: Failed to remove _Temp/sessions folder', err);
      }
      try {
        rmSync(path.resolve(proj2, '_Temp/smartAI'), { recursive: true, force: true });
      } catch (err) {
        console.warn('Warning: Failed to remove _Temp/smartAI folder', err);
      }
    }
}

// If called directly (not imported)
if (require.main === module) {
  setupEnvironment();
}
