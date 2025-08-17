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
exports.generateCucumberHtmlReport = generateCucumberHtmlReport;
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
/**
 * Generate Cucumber HTML report if test-results are present.
 * This function is safe to import; it only touches the filesystem when invoked.
 */
function generateCucumberHtmlReport(options = {}) {
    var _a, _b, _c, _d, _e, _f;
    // Lazily require reporter only when needed
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const report = require("multiple-cucumber-html-reporter");
    const jsonDir = (_a = options.jsonDir) !== null && _a !== void 0 ? _a : "test-results";
    const jsonPath = `${jsonDir}/cucumber-report.json`;
    const htmlReportPath = `${jsonDir}/cucumber-report.html`;
    // Ensure directory exists before scanning
    if (!fs.existsSync(jsonDir)) {
        console.warn(`⚠️ Report directory not found: ${jsonDir}`);
        return;
    }
    if (!fs.existsSync(jsonPath)) {
        console.warn("⚠️ cucumber-report.json not found.");
        try {
            const files = fs.readdirSync(jsonDir);
            console.warn("📁 test-results folder contains:", files);
        }
        catch {
            console.warn("⚠️ Unable to read test results directory.");
        }
    }
    else {
        // 💡 Load JSON, patch paths, save back
        const raw = fs.readFileSync(jsonPath, "utf-8");
        const data = JSON.parse(raw);
        data.forEach((feature) => {
            var _a;
            if ((_a = feature.uri) === null || _a === void 0 ? void 0 : _a.startsWith("_TEMP/execution/")) {
                feature.uri = feature.uri.replace("_TEMP/execution/", "");
            }
        });
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2)); // Save the cleaned version
    }
    // Removing "_TEMP/execution/" from cucumber-report.html
    if (fs.existsSync(htmlReportPath)) {
        try {
            let html = fs.readFileSync(htmlReportPath, "utf-8");
            const updatedHtml = html.replaceAll("_TEMP/execution/", "");
            fs.writeFileSync(htmlReportPath, updatedHtml, "utf-8");
            console.log("🧼 Cleaned cucumber-report.html by removing '_TEMP/execution/'");
        }
        catch {
            // ignore
        }
    }
    if (fs.existsSync(jsonPath)) {
        try {
            fs.unlinkSync(jsonPath);
            console.log(`🗑️ Removed existing ${jsonPath}`);
        }
        catch {
            // ignore
        }
    }
    // Fetching the system details
    const platformName = os.platform();
    const platformVersion = os.release();
    const deviceName = os.hostname();
    report.generate({
        jsonDir,
        reportPath: (_b = options.reportPath) !== null && _b !== void 0 ? _b : `${jsonDir}/reports/`,
        reportName: (_c = options.reportName) !== null && _c !== void 0 ? _c : "Playwright Automation Report",
        pageTitle: (_d = options.pageTitle) !== null && _d !== void 0 ? _d : "BookCart App test report",
        displayDuration: false,
        metadata: {
            browser: {
                name: (_e = options.browserName) !== null && _e !== void 0 ? _e : "chrome",
                version: (_f = options.browserVersion) !== null && _f !== void 0 ? _f : "112",
            },
            device: deviceName,
            platform: {
                name: platformName,
                version: platformVersion,
            },
        },
        customData: {
            title: "Test Info",
            data: [
                { label: "Project", value: "Book Cart Application" },
                { label: "Release", value: "1.2.3" },
                { label: "Cycle", value: "Smoke-1" },
            ],
        },
    });
}
//# sourceMappingURL=report.js.map