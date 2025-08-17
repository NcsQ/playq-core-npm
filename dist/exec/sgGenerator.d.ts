type StepGroup = {
    name: string;
    description: string;
    steps: string[];
};
export declare function extractStepGroups(fileContent: string, filename: string): StepGroup[];
declare function generateStepGroups(options?: {
    force?: boolean;
}): void;
export { generateStepGroups };
export declare function generateStepGroupsIfNeeded(force?: boolean): void;
//# sourceMappingURL=sgGenerator.d.ts.map