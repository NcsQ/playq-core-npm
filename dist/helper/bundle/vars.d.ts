declare function getValue(key: string, ifEmpty?: boolean): string;
declare function getConfigValue(key: string, ifEmpty?: boolean): string;
declare function setValue(key: string, value: string): void;
declare function replaceVariables(input: any): string;
declare function debugVars(): void;
declare function loadFileEntries(file: string, constName: string, prefix?: string): void;
declare function parseLooseJson(str: string): Record<string, any>;
declare function initVars(vars?: Record<string, string>): void;
export { getValue, getConfigValue, setValue, replaceVariables, debugVars, parseLooseJson, loadFileEntries, initVars };
//# sourceMappingURL=vars.d.ts.map