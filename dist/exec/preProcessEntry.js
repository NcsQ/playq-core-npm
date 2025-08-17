"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = require("glob");
// import { config } from '../../resources/config';
const _playq_1 = require("@playq");
const sgGenerator_1 = require("./sgGenerator");
const featureFileCache_1 = require("./featureFileCache");
const featureFilePreProcess_1 = require("./featureFilePreProcess");
const featureFileCache = _playq_1.vars.getConfigValue('cucumber.featureFileCache');
const isForce = process.argv.includes('--force');
console.log('🚀 Running preProcessEntry.ts...');
console.log(`⚙️ featureFileCache enabled: ${featureFileCache}`);
console.log(`⚙️ Force flag: ${isForce}`);
(0, sgGenerator_1.generateStepGroupsIfNeeded)(isForce);
const featureFiles = (0, glob_1.sync)('test/features/**/*.feature');
if (!featureFiles.length) {
    console.warn('⚠️ No feature files found under features/**/*.feature');
}
// Clean up execution folder before generating new feature files
const executionDir = path_1.default.join('_Temp', 'execution');
if (fs_1.default.existsSync(executionDir)) {
    fs_1.default.rmSync(executionDir, { recursive: true, force: true });
    console.log(`🧹 Cleaned up execution folder: ${executionDir}`);
}
for (const originalPath of featureFiles) {
    console.log(`🔧 Processing: ${originalPath}`);
    const cachedPath = (0, featureFileCache_1.getCachedFeatureFilePath)(originalPath);
    console.log(`📄 Cached path: ${cachedPath}`);
    if (featureFileCache && !isForce && (0, featureFileCache_1.shouldUseCachedFeature)(originalPath, cachedPath)) {
        console.log(`✅ Using cached feature file: ${cachedPath}`);
        continue;
    }
    const updatedContent = (0, featureFilePreProcess_1.preprocessFeatureFile)(originalPath);
    if (!updatedContent || !updatedContent.trim().startsWith('Feature')) {
        console.warn(`❌ Skipping cache write for ${originalPath}: Invalid content. Preview:\n${(updatedContent || '').substring(0, 100)}`);
        continue;
    }
    fs_1.default.mkdirSync(path_1.default.dirname(cachedPath), { recursive: true });
    fs_1.default.writeFileSync(cachedPath, updatedContent, 'utf-8');
    console.log(`📥 Updated cached feature file: ${cachedPath}`);
    if (featureFileCache) {
        (0, featureFileCache_1.updateFeatureCacheMeta)(originalPath, cachedPath);
    }
}
//# sourceMappingURL=preProcessEntry.js.map