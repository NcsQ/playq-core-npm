"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataTest = dataTest;
// dataTest.ts
const test_1 = require("@playwright/test");
const dataLoader_1 = require("./dataLoader");
const _playq_1 = require("@playq");
function dataTest(label, dataSource, callback) {
    let dataset = [];
    const { testType = "UI", suffix = "" } = typeof dataSource === "object" && !Array.isArray(dataSource) ? dataSource : {};
    if (Array.isArray(dataSource)) {
        dataset = dataSource;
    }
    else {
        let { file, filter, sheet } = dataSource;
        file = _playq_1.vars.replaceVariables(file);
        sheet = (sheet) ? _playq_1.vars.replaceVariables(sheet) : undefined;
        filter = _playq_1.vars.replaceVariables(filter);
        const raw = (0, dataLoader_1.getTestData)(file, sheet);
        dataset = filter
            ? raw.filter(row => {
                try {
                    // Create a scoped function where row keys are destructured
                    const fn = new Function("row", `
              const { ${Object.keys(row).join(", ")} } = row;
              return ${filter};
            `);
                    return fn(row);
                }
                catch (err) {
                    console.warn(`⚠️ Filter failed: ${filter}`, err);
                    return false;
                }
            })
            : raw;
    }
    test_1.test.describe(label, () => {
        dataset.forEach((row, index) => {
            _playq_1.vars.setValue('playq.iteration.count', `${index + 1}`);
            const name = `${label} ${_playq_1.vars.replaceVariables(replaceIterationDataVars(suffix, row))} [-${index + 1}-]`;
            if (testType.toUpperCase() === "API") {
                (0, test_1.test)(name, async () => {
                    test_1.test.info().annotations.push({ type: "tag", description: label });
                    await callback({ row });
                });
            }
            else {
                (0, test_1.test)(name, async ({ page }) => {
                    test_1.test.info().annotations.push({ type: "tag", description: label });
                    await callback({ row, page });
                });
            }
        });
    });
}
/**
 * Replaces all #{playq.iteration.data.KEY} in the input string with the value from the row object.
 * @param input The string containing placeholders.
 * @param row The row object with data.
 * @returns The string with placeholders replaced.
 */
function replaceIterationDataVars(input, row) {
    return input.replace(/#\{playq\.iteration\.data\.([a-zA-Z0-9_]+)\}/g, (_, key) => {
        return row[key] !== undefined ? String(row[key]) : '';
    });
}
//# sourceMappingURL=dataTest.js.map