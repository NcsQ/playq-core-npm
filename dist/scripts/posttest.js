"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executePostTest = executePostTest;
const env_1 = require("../helper/bundle/env");
const path_1 = __importDefault(require("path"));
const { execSync } = require('child_process');
const vars = __importStar(require("../helper/bundle/vars"));
function executePostTest() {
    (0, env_1.loadEnv)();
    if (process.env.PLAYQ_RUNNER === 'cucumber') {
        // CUCUMBER RUNNER
    }
    else {
        // PLAYWRIGHT RUNNER
        let allureSingleFile = (vars.getConfigValue('report.allure.singleFile') == 'true') ? '--single-file' : '';
        execSync(`npx allure generate ${allureSingleFile} ./allure-results --output ./allure-report`, { stdio: 'inherit', cwd: path_1.default.resolve(__dirname, '../../') });
        if (process.env.PLAYQ_REPORT_OPEN.toLowerCase() !== 'false' && vars.getConfigValue('testExecution.autoReportOpen') !== 'false') {
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