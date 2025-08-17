"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const child_process_2 = require("child_process");
const yargs_1 = __importDefault(require("yargs"));
const args = (0, yargs_1.default)(process.argv).argv;
const runnerName = args.runner;
if (!runnerName) {
    console.error('❌ Missing --runner=<name>');
    process.exit(1);
}
const runnerPath = path_1.default.resolve(`./resources/runners/${runnerName}.run.json`);
if (!fs_1.default.existsSync(runnerPath)) {
    console.error(`❌ Runner file not found: ${runnerPath}`);
    process.exit(1);
}
const runnerConfig = JSON.parse(fs_1.default.readFileSync(runnerPath, 'utf-8'));
const { runType, runs } = runnerConfig;
(0, child_process_2.execSync)('npm run pretest:playwright', { stdio: 'inherit' });
async function runOneTest(config) {
    const env = config.env ? config.env : '';
    const grep = config.grep ? `--grep="${config.grep}"` : '';
    //   const env = config.env ? `--env="${config.env}"` : '';
    const prj = config.project ? `--project=${config.project}"` : '';
    const command = `npx playwright test --config=config/playwright/playwright.config.ts ${grep} ${prj}`;
    console.log(`🔹 Running: ${command}`);
    const result = (0, child_process_1.spawnSync)(command, {
        stdio: 'inherit',
        shell: true,
        env: { ...process.env, TEST_RUNNER: "playwright", RUN_ENV: env }
        // env: { ...process.env }
    });
    if (result.status !== 0) {
        console.error(`❌ Test failed: ${grep}`);
        process.exit(result.status);
    }
}
async function runTests() {
    if (runType === 'sequential') {
        for (const run of runs) {
            await runOneTest(run);
        }
    }
    else if (runType === 'parallel') {
        const promises = runs.map(run => new Promise((resolve, reject) => {
            const env = run.env ? run.env : '';
            const grep = run.grep ? `--grep="${run.grep}"` : '';
            // const env = run.env ? `--env="${run.env}"` : '';
            const prj = run.project ? `--project=${run.project}"` : '';
            const command = `npx playwright test --config=config/playwright/playwright.config.ts ${grep} ${prj}`;
            const proc = (0, child_process_1.spawnSync)(command, {
                stdio: 'inherit',
                shell: true,
                env: { ...process.env, TEST_RUNNER: "playwright", RUN_ENV: env }
            });
            if (proc.status !== 0) {
                reject(new Error(`Failed: ${command}`));
            }
            else {
                resolve(true);
            }
        }));
        try {
            await Promise.all(promises);
        }
        catch (err) {
            console.error('❌ One or more test batches failed.');
            process.exit(1);
        }
    }
    else {
        console.error(`❌ Unknown runType: ${runType}`);
        process.exit(1);
    }
}
runTests().then(() => {
    (0, child_process_2.execSync)('npm run posttest:playwright', { stdio: 'inherit' });
    console.log('✅ All test runs completed.');
    process.exit(0);
});
//# sourceMappingURL=runner_orchestrator.js.map