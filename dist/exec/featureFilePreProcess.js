"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessFeatureFile = preprocessFeatureFile;
exports.expandStepGroups = expandStepGroups;
const _playq_1 = require("@playq");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const xlsx_1 = __importDefault(require("@e965/xlsx"));
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
function preprocessFeatureFile(srcFeaturePath) {
    try {
        const rawContent = fs_1.default.readFileSync(srcFeaturePath, "utf-8");
        // Step 1: Replace variables like ${url}, ${user}
        let processedContent = replaceVariablesInString(rawContent);
        // Step 2: Replacing examples with data file and filter
        processedContent = processExamplesWithFilter(processedContent); // <-- Add this
        // Step 3: Expand Step Groups
        processedContent = expandStepGroups(processedContent);
        // Step 4: Inject SmartIQ data or resolve special steps
        processedContent = processSmartData(processedContent);
        // Step 5: Inject scenario-level tags if needed
        processedContent = injectScenarioTag(processedContent, srcFeaturePath);
        // Write processed file
        const outputDir = path_1.default.join("_Temp/execution");
        const relativePath = path_1.default.relative("test/features", srcFeaturePath);
        const outputPath = path_1.default.join(outputDir, relativePath);
        fs_1.default.mkdirSync(path_1.default.dirname(outputPath), { recursive: true });
        fs_1.default.writeFileSync(outputPath, processedContent, "utf-8");
        if (_playq_1.vars.getConfigValue('cucumber.featureFileCache')) {
            const { updateFeatureCacheMeta } = require("./featureFileCache");
            updateFeatureCacheMeta(srcFeaturePath, outputPath);
        }
        return outputPath;
    }
    catch (err) {
        console.error(`❌ Error preprocessing feature file: ${err}`);
        return undefined;
    }
}
// 🔁 Placeholder replacement
function replaceVariablesInString(content) {
    return content.replace(/Examples\s*:\s*({[^}]*})/g, (match, jsonPart) => {
        const replaced = jsonPart.replace(/\${env\.([\w]+)}/g, (_, key) => {
            const val = process.env[key] || "";
            console.log(`🔄 Replacing variable env.${key} -> ${val}`);
            return val;
        });
        return `Examples:${replaced}`;
    });
}
// 🔁 Expand Step Groups
function expandStepGroups(featureText) {
    const cachePath = path_1.default.join("_Temp", ".cache", "stepGroup_cache.json");
    if (!fs_1.default.existsSync(cachePath)) {
        console.warn(`⚠️ Step group cache not found at ${cachePath}`);
        return featureText;
    }
    const stepGroupCache = JSON.parse(fs_1.default.readFileSync(cachePath, "utf8"));
    const stepGroupRegex = /^\s*\*\s*Step\s*Group:\s*-(.+?)-\s*-(.+?)-\s*$/gm;
    const updatedText = featureText.replace(stepGroupRegex, (_match, groupIdRaw, groupDescRaw) => {
        const groupId = groupIdRaw.trim();
        const groupDesc = groupDescRaw.trim();
        const cachedGroup = stepGroupCache[groupId];
        if (!cachedGroup || !Array.isArray(cachedGroup.steps)) {
            console.warn(`❌ Step group "${groupId}" not found or steps invalid`);
            return _match;
        }
        const steps = cachedGroup.steps.join("\n");
        const replacement = [
            `\n* - Step Group - START: "${groupId}" Desc: "${groupDesc}"`,
            steps,
            `* - Step Group - END: "${groupId}"`,
        ].join("\n");
        return replacement;
    });
    return updatedText;
}
// 🔁 Process Smart Data (e.g., inject data-driven values or SmartIQ rules)
function processSmartData(content) {
    // Example: Replace [[SMART:...]] with resolved steps
    return content.replace(/\[\[SMART:(.*?)\]\]/g, (_, expr) => {
        console.log(`🧠 Processing SMART: ${expr}`);
        return `# Processed SMART step: ${expr}`;
    });
}
// 🔁 Inject scenario-level tags
function injectScenarioTag(content, filePath) {
    const tag = `@file(${path_1.default.basename(filePath)})`;
    const lines = content.split("\n");
    const processedLines = lines.map((line, i) => {
        if (line.trim().startsWith("Scenario") &&
            (i === 0 || !lines[i - 1].trim().startsWith("@"))) {
            return `${tag}\n${line}`;
        }
        return line;
    });
    return processedLines.join("\n");
}
function processExamplesWithFilter(content, dataDir = "test-data") {
    return content.replace(/(^|\n)\s*Examples\s*:?\s*({[^}]*})/g, (match, prefix, jsonStr) => {
        console.log(`🔄 FOUND Examples block: [${jsonStr}]`);
        console.log(`🔄 Preprocessing feature == MATCH == file: ${match}`);
        console.log(`🔄 Preprocessing feature == MATCH END == file:`);
        console.log(`🔄 Preprocessing feature == PREFIX == file: ${prefix}`);
        console.log(`🔄 Preprocessing feature == jsonStr == file: ${jsonStr}`);
        const obj = JSON.parse(jsonStr.replace(/'/g, '"'));
        const normalized = {};
        for (const [k, v] of Object.entries(obj)) {
            normalized[k.toLowerCase()] = v;
        }
        const dataFile = normalized["datafile"];
        const filter = normalized["filter"];
        const sheetName = normalized["sheetname"];
        console.log(`🔄 Preprocessing feature == dataFile == file: ${dataFile}`);
        console.log(`🔄 Preprocessing feature == filter == file: ${filter}`);
        console.log(`🔄 Preprocessing feature == sheetName == file: ${sheetName}`);
        const fullPath = path_1.default.join(dataDir, path_1.default.basename(dataFile || ""));
        const ext = path_1.default.extname(fullPath).toLowerCase();
        console.log(`🔄 Preprocessing feature == FULL PATH == file: ${fullPath}`);
        console.log(`🔄 Preprocessing feature == EXT == file: ${ext}`);
        if (!fs_1.default.existsSync(fullPath))
            return match;
        const isNumeric = (val) => typeof val === "string" && val.trim() !== "" && !isNaN(Number(val));
        const substituteFilter = (filter, row) => filter.replace(/\b[_a-zA-Z][_a-zA-Z0-9]*\b/g, (key) => {
            var _a;
            const raw = (_a = row[key]) !== null && _a !== void 0 ? _a : row[`_${key}`];
            if (raw === undefined)
                return key;
            return isNumeric(raw) ? raw.trim() : JSON.stringify(raw);
        });
        let rows = [];
        console.log(`🔍 Checking file existence: fullPath='${fullPath}'`);
        if (!fs_1.default.existsSync(fullPath)) {
            console.error(`❌ File not found: ${fullPath}`);
            return match;
        }
        if (ext === ".xlsx") {
            console.log(`✔️ File found: ${fullPath}, now reading with xlsx`);
            const workbook = xlsx_1.default.readFile(fullPath);
            console.log(`📄 Workbook sheets: ${workbook.SheetNames.join(", ")}`);
            const sheet = sheetName || workbook.SheetNames[0];
            console.log(`📋 Using sheet: ${sheet}`);
            const sheetData = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet]);
            console.log(`🔢 Read ${sheetData.length} rows from sheet`);
            rows = sheetData.filter((row) => {
                try {
                    console.log("🔍 Row raw:", row);
                    return eval(substituteFilter(filter, row));
                }
                catch {
                    console.warn("⚠️ Row filter error, skipping.");
                    return false;
                }
            });
        }
        else if (ext === ".csv") {
            console.log(`📋 ENTER CSV:`);
            const csvData = fs_1.default.readFileSync(fullPath, "utf-8").split("\n");
            console.log(`📋 Using csvData: ${csvData}`);
            const headers = csvData[0].split(",").map((h) => h.trim());
            console.log(`📋 Using headers: ${headers}`);
            for (let i = 1; i < csvData.length; i++) {
                const values = csvData[i].split(",");
                if (values.length !== headers.length)
                    continue;
                const row = {};
                headers.forEach((h, j) => {
                    var _a;
                    row[h] = (_a = values[j]) === null || _a === void 0 ? void 0 : _a.trim();
                });
                try {
                    if (eval(substituteFilter(filter, row)))
                        rows.push(row);
                }
                catch { }
            }
        }
        else {
            return match; // unsupported file
        }
        console.log(`🔍 Filtered row count: ${rows.length}`);
        if (!rows.length) {
            console.error(`❌ No matching rows found. Returning fallback Examples block.`);
            throw new Error(`❌ No matching rows found. Returning fallback Examples block.`);
        }
        const headers = Object.keys(rows[0]);
        const lines = ["\n\nExamples:", `  | ${headers.join(" | ")} |`];
        for (const r of rows) {
            const rowLine = `  | ${headers.map((h) => r[h] || "").join(" | ")} |`;
            lines.push(rowLine);
        }
        return lines.join("\n");
    });
}
//# sourceMappingURL=featureFilePreProcess.js.map