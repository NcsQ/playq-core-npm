/**
 * Preprocesses a feature file using all transformation steps:
 * - Variable replacement
 * - Step group expansion
 * - SmartIQ data injection
 * - Tag injection
 *
 * @param srcFeaturePath Path to the source .feature file
 * @returns Path to the preprocessed file (under _Temp/execution)
 */
export declare function preprocessFeatureFile(srcFeaturePath: string): string | undefined;
export declare function expandStepGroups(featureText: string): string;
//# sourceMappingURL=featureFilePreProcess.d.ts.map