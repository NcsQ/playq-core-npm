/**
 * Returns the path to the cached feature file inside _Temp/execution/
 */
export declare function getCachedFeatureFilePath(originalPath: string): string;
/**
 * Determines if the cached feature should be used.
 * Checks:
 *  - config.cucumber.featureFileCache is enabled
 *  - cached file and metadata exist
 *  - cached timestamp is newer than original file
 */
export declare function shouldUseCachedFeature(originalPath: string, cachedPath: string): boolean;
/**
 * Updates the feature cache metadata file.
 * Ensures _Temp/.cache/featureMeta.json exists, and writes { filePath, updatedAt }.
 */
export declare function updateFeatureCacheMeta(originalPath: string, cachedPath: string): void;
/**
 * Writes feature content to cache if valid.
 */
export declare function writeFeatureToCache(cachedPath: string, content: string): void;
//# sourceMappingURL=featureFileCache.d.ts.map