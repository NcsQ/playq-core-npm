import * as fs from "fs";
import * as os from "os";

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
export function generateCucumberHtmlReport(options: GenerateOptions = {}) {
  // Lazily require reporter only when needed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const report = require("multiple-cucumber-html-reporter");

  const jsonDir = options.jsonDir ?? "test-results";
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
    } catch {
      console.warn("⚠️ Unable to read test results directory.");
    }
  } else {
    // 💡 Load JSON, patch paths, save back
    const raw = fs.readFileSync(jsonPath, "utf-8");
    const data = JSON.parse(raw);
    data.forEach((feature: any) => {
      if (feature.uri?.startsWith("_TEMP/execution/")) {
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
    } catch {
      // ignore
    }
  }

  if (fs.existsSync(jsonPath)) {
    try {
      fs.unlinkSync(jsonPath);
      console.log(`🗑️ Removed existing ${jsonPath}`);
    } catch {
      // ignore
    }
  }

  // Fetching the system details
  const platformName = os.platform();
  const platformVersion = os.release();
  const deviceName = os.hostname();

  report.generate({
    jsonDir,
    reportPath: options.reportPath ?? `${jsonDir}/reports/`,
    reportName: options.reportName ?? "Playwright Automation Report",
    pageTitle: options.pageTitle ?? "BookCart App test report",
    displayDuration: false,
    metadata: {
      browser: {
        name: options.browserName ?? "chrome",
        version: options.browserVersion ?? "112",
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
