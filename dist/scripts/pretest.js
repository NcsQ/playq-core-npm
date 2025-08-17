"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEnvironment = setupEnvironment;
const env_1 = require("../helper/bundle/env");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
function setupEnvironment() {
    (0, env_1.loadEnv)();
    // If running in Cucumber mode, we need to handle pre-processing differently
    if (process.env.PLAYQ_RUNNER === 'cucumber') {
        // CUCUMBER RUNNER
        // Remove allure-report directory in the project folder for cucumber runner
        try {
            (0, fs_1.rmSync)(path_1.default.resolve(process.env['PLAYQ_PROJECT_ROOT'], 'test-results'), { recursive: true, force: true });
        }
        catch (err) {
            console.warn('Warning: Failed to remove allure-report', err);
        }
        require(path_1.default.resolve(process.env['PLAYQ_CORE_ROOT'], 'exec/preProcessEntry.ts'));
    }
    else {
        // PLAYWRIGHT RUNNER
        // Remove allure-report and allure-results directories
        try {
            (0, fs_1.rmSync)(path_1.default.resolve(process.env['PLAYQ_PROJECT_ROOT'], 'allure-report'), { recursive: true, force: true });
        }
        catch (err) {
            console.warn('Warning: Failed to remove ./allure-report', err);
        }
        try {
            (0, fs_1.rmSync)(path_1.default.resolve(process.env['PLAYQ_PROJECT_ROOT'], 'allure-results'), { recursive: true, force: true });
        }
        catch (err) {
            console.warn('Warning: Failed to remove ./allure-results', err);
        }
    }
    // General directory cleanup
    try {
        (0, fs_1.rmSync)(path_1.default.resolve(process.env['PLAYQ_PROJECT_ROOT'], '_Temp/sessions'), { recursive: true, force: true });
    }
    catch (err) {
        console.warn('Warning: Failed to remove _Temp/sessions folder', err);
    }
    try {
        (0, fs_1.rmSync)(path_1.default.resolve(process.env['PLAYQ_PROJECT_ROOT'], '_Temp/smartAI'), { recursive: true, force: true });
    }
    catch (err) {
        console.warn('Warning: Failed to remove _Temp/smartAI folder', err);
    }
}
// If called directly (not imported)
if (require.main === module) {
    setupEnvironment();
}
//# sourceMappingURL=pretest.js.map