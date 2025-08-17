type DataFormat = 'json' | 'excel' | 'csv';
/**
 * Reads test data from .json, .xlsx, or .csv
 *
 * @param file - Filename (without extension), e.g., "login"
 * @param format - File format: "json" | "excel" | "csv"
 * @param sheetName - (optional) Sheet name for Excel files
 */
export declare function getTestData(file: string, format?: DataFormat, sheetName?: string): any[];
export {};
//# sourceMappingURL=dataLoader.d.ts.map