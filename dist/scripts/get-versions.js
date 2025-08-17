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
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function getVersion(command) {
    try {
        return (0, child_process_1.execSync)(command, { encoding: 'utf8' }).trim();
    }
    catch (error) {
        return 'Not installed';
    }
}
function getPackageVersion(packageName) {
    try {
        const packageJsonPath = path.join(process.cwd(), 'node_modules', packageName, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            return packageJson.version;
        }
        return 'Not found';
    }
    catch (error) {
        return 'Error reading version';
    }
}
function getInstalledVersion(packageName) {
    try {
        const output = (0, child_process_1.execSync)(`npm list ${packageName} --depth=0`, { encoding: 'utf8' });
        const match = output.match(new RegExp(`${packageName}@([\\d\\.]+)`));
        return match ? match[1] : 'Not found';
    }
    catch (error) {
        return 'Not installed';
    }
}
function getPackageInfo() {
    try {
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        }
        return { name: 'Unknown', version: 'Unknown' };
    }
    catch (error) {
        return { name: 'Error reading package.json', version: 'Error' };
    }
}
console.log('🔍 PlayQ Framework Version Information\n');
console.log('| Component | Version |');
console.log('|-----------|---------|');
console.log(`| Programming Language (TypeScript) | ${getVersion('npx tsc --version').replace('Version ', '')} |`);
console.log(`| Runtime Environment (Node.js) | ${getVersion('node --version').replace('v', '')} |`);
console.log(`| Automation Framework (Playwright) | ${getInstalledVersion('@playwright/test')} |`);
console.log(`| Test Runner (Playwright Test Runner) | ${getInstalledVersion('@playwright/test')} |`);
console.log(`| BDD Framework (Cucumber) | ${getInstalledVersion('@cucumber/cucumber')} |`);
console.log(`| Reporting (Allure Playwright) | ${getInstalledVersion('allure-playwright')} |`);
console.log(`| Data Generation Utility (Faker.js) | ${getInstalledVersion('@faker-js/faker')} |`);
console.log(`| Cross Platform (cross-env) | ${getInstalledVersion('cross-env')} |`);
console.log(`| File Operations (rimraf) | ${getInstalledVersion('rimraf')} |`);
console.log('\n📦 Package Manager Information:');
console.log(`| npm | ${getVersion('npm --version')} |`);
const packageInfo = getPackageInfo();
console.log(`| Package Name | ${packageInfo.name || 'play-ts-cucumber'} |`);
console.log(`| Package Version | ${packageInfo.version || '1.0.0'} |`);
//# sourceMappingURL=get-versions.js.map