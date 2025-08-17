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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestData = getTestData;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const XLSX = __importStar(require("@e965/xlsx"));
/**
 * Reads test data from .json, .xlsx, or .csv
 *
 * @param file - Filename (without extension), e.g., "login"
 * @param format - File format: "json" | "excel" | "csv"
 * @param sheetName - (optional) Sheet name for Excel files
 */
function getTestData(file, format = 'json', sheetName) {
    const basePath = path_1.default.resolve(`resources/test-data`);
    switch (format) {
        case 'json': {
            const jsonPath = path_1.default.join(basePath, `${file}.json`);
            const raw = fs_1.default.readFileSync(jsonPath, 'utf-8');
            return JSON.parse(raw);
        }
        case 'excel': {
            const xlsxPath = path_1.default.join(basePath, `${file}.xlsx`);
            const workbook = XLSX.readFile(xlsxPath);
            const sheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
            return XLSX.utils.sheet_to_json(sheet);
        }
        case 'csv': {
            const csvPath = path_1.default.join(basePath, `${file}.csv`);
            const fileData = fs_1.default.readFileSync(csvPath, 'utf-8');
            const worksheet = XLSX.read(fileData, { type: 'string' }).Sheets['Sheet1'];
            return XLSX.utils.sheet_to_json(worksheet);
        }
        default:
            throw new Error(`Unsupported format: ${format}`);
    }
}
//# sourceMappingURL=dataLoader.js.map