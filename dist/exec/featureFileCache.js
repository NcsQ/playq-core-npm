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
exports.getCachedFeatureFilePath = getCachedFeatureFilePath;
exports.shouldUseCachedFeature = shouldUseCachedFeature;
exports.updateFeatureCacheMeta = updateFeatureCacheMeta;
exports.writeFeatureToCache = writeFeatureToCache;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import { config } from '../../resources/config';
const vars = __importStar(require("../helper/bundle/vars"));
const FEATURE_META_PATH = path_1.default.resolve('_Temp/.cache/featureMeta.json');
/**
 * Returns the path to the cached feature file inside _Temp/execution/
 */
function getCachedFeatureFilePath(originalPath) {
    const filename = path_1.default.basename(originalPath);
    return path_1.default.resolve('_Temp/execution', filename);
}
/**
 * Determines if the cached feature should be used.
 * Checks:
 *  - config.cucumber.featureFileCache is enabled
 *  - cached file and metadata exist
 *  - cached timestamp is newer than original file
 */
function shouldUseCachedFeature(originalPath, cachedPath) {
    // Logging for cache check
    console.log(`🔍 Cache check started for: ${originalPath}`);
    if (!vars.getConfigValue('cucumber.featureFileCache'))
        return false;
    if (!fs_1.default.existsSync(cachedPath))
        return false;
    if (!fs_1.default.existsSync(FEATURE_META_PATH))
        return false;
    try {
        const meta = JSON.parse(fs_1.default.readFileSync(FEATURE_META_PATH, 'utf-8'));
        const originalStats = fs_1.default.statSync(originalPath);
        const cachedMeta = meta[originalPath];
        console.log(`📄 Cached Meta:`, cachedMeta);
        if (!cachedMeta)
            return false;
        const originalTime = originalStats.mtimeMs;
        const metaTime = new Date(cachedMeta.updatedAt).getTime();
        console.log(`📆 Original mtime: ${originalTime} | Cached updatedAt: ${metaTime}`);
        console.log(`✅ Should use cache: ${metaTime >= originalTime}`);
        return metaTime >= originalTime;
    }
    catch (err) {
        console.warn(`⚠️ Cache check failed. Proceeding without cache.`, err);
        return false;
    }
}
/**
 * Updates the feature cache metadata file.
 * Ensures _Temp/.cache/featureMeta.json exists, and writes { filePath, updatedAt }.
 */
function updateFeatureCacheMeta(originalPath, cachedPath) {
    const dir = path_1.default.dirname(FEATURE_META_PATH);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    let meta = {};
    if (fs_1.default.existsSync(FEATURE_META_PATH)) {
        try {
            meta = JSON.parse(fs_1.default.readFileSync(FEATURE_META_PATH, 'utf-8'));
        }
        catch {
            console.warn('⚠️ Failed to parse featureMeta.json. Overwriting.');
        }
    }
    meta[originalPath] = {
        filePath: cachedPath,
        updatedAt: new Date().toISOString()
    };
    fs_1.default.writeFileSync(FEATURE_META_PATH, JSON.stringify(meta, null, 2), 'utf-8');
    console.log(`💾 Feature cache metadata updated for: ${originalPath}`);
}
/**
 * Writes feature content to cache if valid.
 */
function writeFeatureToCache(cachedPath, content) {
    if (!content.trim().startsWith('Feature')) {
        console.warn(`❌ Skipping cache write: Content does not start with "Feature". Content preview:\n${content.substring(0, 100)}`);
        return;
    }
    fs_1.default.writeFileSync(cachedPath, content, 'utf8');
}
//# sourceMappingURL=featureFileCache.js.map