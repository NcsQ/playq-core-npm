type GenerateOptions = {
    jsonDir?: string;
    reportPath?: string;
    reportName?: string;
    pageTitle?: string;
    browserName?: string;
    browserVersion?: string;
};
/**
 * Generate Cucumber HTML report if test-results are present.
 * This function is safe to import; it only touches the filesystem when invoked.
 */
export declare function generateCucumberHtmlReport(options?: GenerateOptions): void;
export {};
//# sourceMappingURL=report.d.ts.map