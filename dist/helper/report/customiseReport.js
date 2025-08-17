"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const inputPath = 'test-results/cucumber-report.json';
const outputPath = 'test-results/cucumber-report-custom.json';
function extractReplacements(embeddings) {
    const replacements = {};
    embeddings === null || embeddings === void 0 ? void 0 : embeddings.forEach(embed => {
        const data = embed === null || embed === void 0 ? void 0 : embed.data;
        const match = data === null || data === void 0 ? void 0 : data.match(/Replaced: \|\\?"(.*?)\\?"\|-with-\|(.*?)\|/);
        if (match) {
            const original = match[1];
            const replaced = match[2];
            replacements[original] = replaced;
        }
    });
    return replacements;
}
function updateStepName(step) {
    const replacements = extractReplacements(step.embeddings || []);
    for (const [original, replaced] of Object.entries(replacements)) {
        const quotedOriginal = `"${original}"`;
        const quotedReplaced = `"${replaced}"`;
        step.name = step.name.replace(quotedOriginal, quotedReplaced);
    }
}
function processReport() {
    const raw = fs_1.default.readFileSync(inputPath, 'utf-8');
    if (!raw || !raw.trim()) {
        console.warn("⚠️ customiseReport: Empty or invalid JSON input. Skipping processing.");
        return;
    }
    const report = JSON.parse(raw);
    for (const feature of report) {
        for (const scenario of feature.elements || []) {
            for (const step of scenario.steps || []) {
                updateStepName(step);
                // Check for soft assertion failures in embeddings
                if (Array.isArray(step.embeddings) &&
                    step.embeddings.some((embed) => typeof embed.data === "string" &&
                        embed.data.includes("Soft Assertion: [Failed]"))) {
                    if (!step.result)
                        step.result = {};
                    step.result.status = "failed";
                }
            }
        }
    }
    fs_1.default.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`✅ Updated report written to ${outputPath}`);
}
processReport();
//# sourceMappingURL=customiseReport.js.map