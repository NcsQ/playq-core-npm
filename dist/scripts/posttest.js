"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executePostTest = executePostTest;
const env_1 = require("../helper/bundle/env");
const path_1 = __importDefault(require("path"));
const { execSync } = require('child_process');
const _playq_1 = require("@playq");
function executePostTest() {
    (0, env_1.loadEnv)();
    if (process.env.PLAYQ_RUNNER === 'cucumber') {
        // CUCUMBER RUNNER
    }
    else {
        // PLAYWRIGHT RUNNER
        let allureSingleFile = (_playq_1.vars.getConfigValue('report.allure.singleFile') == 'true') ? '--single-file' : '';
        execSync(`npx allure generate ${allureSingleFile} ./allure-results --output ./allure-report`, { stdio: 'inherit', cwd: path_1.default.resolve(__dirname, '../../') });
        if (process.env.PLAYQ_REPORT_OPEN.toLowerCase() !== 'false' && _playq_1.vars.getConfigValue('testExecution.autoReportOpen') !== 'false') {
            console.log('- [INFO] Report open disabled using PLAYQ_REPORT_OPEN');
            execSync('npx allure open ./allure-report', { stdio: 'inherit', cwd: path_1.default.resolve(__dirname, '../../') });
        }
    }
}
// If called directly (not imported)
if (require.main === module) {
    executePostTest();
}
//# sourceMappingURL=posttest.js.map