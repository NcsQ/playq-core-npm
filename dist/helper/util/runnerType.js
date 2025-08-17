"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlaywrightRunner = isPlaywrightRunner;
exports.isCucumberRunner = isCucumberRunner;
function isPlaywrightRunner() {
    return process.env.TEST_RUNNER === 'playwright';
}
function isCucumberRunner() {
    return process.env.TEST_RUNNER === 'cucumber';
}
//# sourceMappingURL=runnerType.js.map