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
exports.dataTest = dataTest;
// dataTest.ts
const test_1 = require("@playwright/test");
const dataLoader_1 = require("./dataLoader");
const vars = __importStar(require("../../bundle/vars"));
function dataTest(label, dataSource, callback) {
    let dataset = [];
    const { testType = "UI", suffix = "" } = typeof dataSource === "object" && !Array.isArray(dataSource) ? dataSource : {};
    if (Array.isArray(dataSource)) {
        dataset = dataSource;
    }
    else {
        let { file, filter, sheet } = dataSource;
        file = vars.replaceVariables(file);
        sheet = (sheet) ? vars.replaceVariables(sheet) : undefined;
        filter = vars.replaceVariables(filter);
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
            vars.setValue('playq.iteration.count', `${index + 1}`);
            const name = `${label} ${vars.replaceVariables(replaceIterationDataVars(suffix, row))} [-${index + 1}-]`;
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